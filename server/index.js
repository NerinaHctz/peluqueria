import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { URL } from 'node:url'
import {
  createGoogleCalendarLink,
  createIcsEvent,
  sendAppointmentEmail,
} from './mailer.js'
import {
  ensureStore,
  getStore,
  saveStore,
  listAvailableSlots,
  isSlotAvailable,
} from './store.js'

const PORT = Number(globalThis.process?.env.PORT || 4000)
const FRONTEND_URL = globalThis.process?.env.FRONTEND_URL || 'http://localhost:5173'

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': FRONTEND_URL,
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(payload))
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 1e6) {
        reject(new Error('Body demasiado grande'))
      }
    })
    req.on('end', () => {
      if (!data) return resolve({})
      try {
        resolve(JSON.parse(data))
      } catch {
        reject(new Error('JSON inválido'))
      }
    })
    req.on('error', reject)
  })
}

function addHour(date, time) {
  const [h, m] = time.split(':').map(Number)
  const endHour = (h + 1).toString().padStart(2, '0')
  const endMin = m.toString().padStart(2, '0')
  return `${date}T${endHour}:${endMin}:00`
}

await ensureStore()

const server = http.createServer(async (req, res) => {
  if (!req.url || !req.method) return sendJson(res, 400, { error: 'Petición inválida' })

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': FRONTEND_URL,
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    return res.end()
  }

  const url = new URL(req.url, `http://localhost:${PORT}`)

  try {
    if (req.method === 'GET' && url.pathname === '/api/health') {
      return sendJson(res, 200, { ok: true, service: 'peluqueria-backend' })
    }

    if (req.method === 'GET' && url.pathname === '/api/availability') {
      const date = url.searchParams.get('date')
      if (!date) return sendJson(res, 400, { error: 'Debes enviar una fecha YYYY-MM-DD' })
      const store = await getStore()
      return sendJson(res, 200, { date, slots: listAvailableSlots(store, date) })
    }

    if (req.method === 'GET' && url.pathname === '/api/calendar') {
      const from = url.searchParams.get('from')
      const to = url.searchParams.get('to')
      const store = await getStore()
      const appointments = store.appointments.filter((item) => {
        if (!from || !to) return true
        return item.date >= from && item.date <= to
      })
      return sendJson(res, 200, { appointments, blockedSlots: store.blockedSlots })
    }

    if (req.method === 'PATCH' && url.pathname.startsWith('/api/availability/')) {
      const date = decodeURIComponent(url.pathname.split('/').pop())
      const body = await getBody(req)
      if (!body.slot || !['block', 'unblock'].includes(body.action)) {
        return sendJson(res, 400, { error: 'Usa action:block|unblock y slot:HH:mm' })
      }

      const store = await getStore()
      const current = new Set(store.blockedSlots[date] || [])
      if (body.action === 'block') current.add(body.slot)
      if (body.action === 'unblock') current.delete(body.slot)
      store.blockedSlots[date] = [...current].sort()
      await saveStore(store)
      return sendJson(res, 200, {
        date,
        blockedSlots: store.blockedSlots[date],
        availableSlots: listAvailableSlots(store, date),
      })
    }

    if (req.method === 'DELETE' && url.pathname.startsWith('/api/appointments/')) {
      const id = decodeURIComponent(url.pathname.split('/').pop())
      const store = await getStore()
      const before = store.appointments.length
      store.appointments = store.appointments.filter((item) => item.id !== id)
      if (before === store.appointments.length) {
        return sendJson(res, 404, { error: 'No existe la cita' })
      }
      await saveStore(store)
      return sendJson(res, 200, { ok: true })
    }

    if (req.method === 'POST' && url.pathname === '/api/appointments') {
      const body = await getBody(req)
      const { name, email, phone, service, date, time, notes = '' } = body
      if (!name || !email || !service || !date || !time) {
        return sendJson(res, 400, {
          error: 'Faltan campos: name, email, service, date, time',
        })
      }

      const store = await getStore()
      if (!isSlotAvailable(store, date, time)) {
        return sendJson(res, 409, { error: 'Ese horario ya no está disponible' })
      }

      const appointment = {
        id: randomUUID(),
        name,
        email,
        phone,
        service,
        date,
        time,
        notes,
        createdAt: new Date().toISOString(),
      }

      store.appointments.push(appointment)
      await saveStore(store)

      const start = `${date}T${time}:00`
      const end = addHour(date, time)

      const googleCalendarUrl = createGoogleCalendarLink({
        title: `Cita peluquería - ${service}`,
        details: `Cliente: ${name}. Teléfono: ${phone || 'No indicado'}. Notas: ${notes || 'Sin notas'}`,
        start,
        end,
      })

      const icsContent = createIcsEvent({
        uid: appointment.id,
        title: `Cita peluquería - ${service}`,
        description: `Cliente: ${name} | Tel: ${phone || 'No indicado'} | Notas: ${notes || 'Sin notas'}`,
        start,
        end,
      })

      const emailResult = await sendAppointmentEmail({
        to: email,
        name,
        service,
        date,
        time,
        googleCalendarUrl,
        icsContent,
      })

      return sendJson(res, 201, { appointment, googleCalendarUrl, email: emailResult })
    }

    return sendJson(res, 404, { error: 'Ruta no encontrada' })
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Error interno' })
  }
})

server.listen(PORT, () => {
  console.log(`✅ Backend listo en http://localhost:${PORT}`)
})
