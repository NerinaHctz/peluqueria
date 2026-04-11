import { useCallback, useEffect, useMemo, useState } from 'react'
import '../../styles/Booking.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const SERVICES = ['Corte', 'Color', 'Peinado', 'Mechas', 'Tratamiento']
const TIME_OPTIONS = Array.from({ length: 19 }, (_, index) => {
  const totalMinutes = 10 * 60 + index * 30
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
  const minutes = String(totalMinutes % 60).padStart(2, '0')
  return `${hours}:${minutes}`
})


function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

function getMonthDays(currentMonth) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const leading = firstDay.getDay()
  const days = []

  for (let i = 0; i < leading; i += 1) {
    days.push(null)
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day))
  }

  return days
}

export default function Booking() {
  const [month, setMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [slots, setSlots] = useState([])
  const [appointments, setAppointments] = useState([])
  const [blockedSlot, setBlockedSlot] = useState('10:00')
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: SERVICES[0],
    time: '',
    notes: '',
  })

  const monthDays = useMemo(() => getMonthDays(month), [month])

  const loadCalendar = useCallback(async () => {
    const from = formatDate(new Date(month.getFullYear(), month.getMonth(), 1))
    const to = formatDate(new Date(month.getFullYear(), month.getMonth() + 1, 0))

    const res = await fetch(`${API_URL}/api/calendar?from=${from}&to=${to}`)
    const data = await res.json()
    setAppointments(data.appointments)
  }, [month])

  const loadSlots = useCallback(async (date) => {
    const res = await fetch(`${API_URL}/api/availability?date=${date}`)
    const data = await res.json()
    setSlots(data.slots || [])
    setForm((prev) => ({ ...prev, time: data.slots?.[0] || '' }))
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCalendar()
  }, [loadCalendar])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSlots(selectedDate)
  }, [selectedDate, loadSlots])

  function appointmentsCountByDate(date) {
    return appointments.filter((item) => item.date === date).length
  }

  async function reserveAppointment(event) {
    event.preventDefault()
    setMessage('')

    const res = await fetch(`${API_URL}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, date: selectedDate }),
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error || 'No se pudo guardar la cita')
      return
    }

    setMessage(
      data.email?.sent
        ? '✅ Cita reservada y email enviado.'
        : '✅ Cita reservada. Configura RESEND_API_KEY en el backend para enviar emails automáticos.',
    )
    setForm((prev) => ({ ...prev, name: '', email: '', phone: '', notes: '' }))
    await loadCalendar()
    await loadSlots(selectedDate)
  }

  async function updateAvailability(action) {
    const res = await fetch(`${API_URL}/api/availability/${selectedDate}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, slot: blockedSlot }),
    })

    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || 'No se pudo actualizar disponibilidad')
      return
    }

    setMessage(`Disponibilidad actualizada: ${action} ${blockedSlot}`)
    await loadSlots(selectedDate)
  }

  async function deleteAppointment(id) {
    const res = await fetch(`${API_URL}/api/appointments/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      setMessage('No se pudo eliminar la cita')
      return
    }

    setMessage('Cita eliminada')
    await loadCalendar()
    await loadSlots(selectedDate)
  }

  return (
    <div className="container booking-page">
      <h1>Calendario y gestión de citas</h1>
      <p className="booking-help">Selecciona un día para ver sus horas disponibles y reservar.</p>

      <div className="booking-layout">
        <section className="calendar-card">
          <div className="month-controls">
            <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>
              ←
            </button>
            <h2>
              {month.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>
              →
            </button>
          </div>

          <div className="weekdays">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="days-grid">
            {monthDays.map((day, index) => {
              if (!day) return <div key={`empty-${index}`} className="day-cell empty" />

              const dayISO = formatDate(day)
              const isSelected = selectedDate === dayISO
              const count = appointmentsCountByDate(dayISO)

              return (
                <button
                  key={dayISO}
                  className={`day-cell ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedDate(dayISO)}
                >
                  <strong>{day.getDate()}</strong>
                  <small>{count} citas</small>
                </button>
              )
            })}
          </div>
        </section>

        <section className="slots-card">
          <h3>Disponibilidad del {selectedDate}</h3>
          <div className="slots-list">
            {slots.length === 0 ? <p>No hay huecos disponibles.</p> : slots.map((slot) => <span key={slot}>{slot}</span>)}
          </div>

          <form onSubmit={reserveAppointment} className="booking-form">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nombre"
              required
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              required
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Teléfono"
            />
            <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
              {SERVICES.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
            <select
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
            >
              {slots.map((slot) => (
                <option key={slot}>{slot}</option>
              ))}
            </select>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Notas"
            />
            <button type="submit">Reservar cita</button>
          </form>
        </section>
      </div>

      <section className="admin-card">
        <h3>Panel rápido (modificar disponibilidad)</h3>
        <div className="admin-actions">
          <select value={blockedSlot} onChange={(e) => setBlockedSlot(e.target.value)}>
            {TIME_OPTIONS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <button onClick={() => updateAvailability('block')}>Bloquear hora</button>
          <button onClick={() => updateAvailability('unblock')}>Desbloquear hora</button>
        </div>

        <h4>Citas del día</h4>
        <ul>
          {appointments
            .filter((item) => item.date === selectedDate)
            .map((item) => (
              <li key={item.id}>
                <span>
                  {item.time} · {item.name} · {item.service}
                </span>
                <button onClick={() => deleteAppointment(item.id)}>Eliminar</button>
              </li>
            ))}
        </ul>
      </section>

      {message ? <p className="booking-message">{message}</p> : null}
    </div>
  )
}
