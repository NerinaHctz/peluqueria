function utcStamp(dateTime) {
  return new Date(dateTime).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function localStamp(dateTime) {
  return dateTime.replace(/[-:]/g, '')
}

export function createGoogleCalendarLink({ title, details, start, end }) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details,
    dates: `${utcStamp(start)}/${utcStamp(end)}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function createIcsEvent({ uid, title, description, start, end }) {
  const stamp = utcStamp(new Date().toISOString())

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Peluqueria//Citas//ES',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${localStamp(start)}`,
    `DTEND:${localStamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

async function sendWithResend({ to, subject, html }) {
  if (!globalThis.process?.env.RESEND_API_KEY) {
    return { sent: false, reason: 'Falta RESEND_API_KEY' }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${globalThis.process?.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: globalThis.process?.env.MAIL_FROM || 'Peluquería <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    return { sent: false, reason: `Resend error: ${message}` }
  }

  return { sent: true, provider: 'resend' }
}

export async function sendAppointmentEmail({ to, name, service, date, time, googleCalendarUrl }) {
  const subject = 'Confirmación de cita - Peluquería'
  const html = `
    <h2>Hola ${name}, tu cita está confirmada 💇‍♀️</h2>
    <p><strong>Servicio:</strong> ${service}</p>
    <p><strong>Fecha:</strong> ${date}</p>
    <p><strong>Hora:</strong> ${time}</p>
    <p><a href="${googleCalendarUrl}">Añadir a Google Calendar</a></p>
  `

  const resendResult = await sendWithResend({ to, subject, html })
  if (resendResult.sent) return resendResult

  console.log('⚠️ Email no enviado automáticamente:', resendResult.reason)
  return {
    sent: false,
    reason: resendResult.reason,
    fallback: `mailto:${to}?subject=${encodeURIComponent(subject)}`,
  }
}
