# Peluquería - Front + Backend de citas

Proyecto de peluquería con:

- Frontend en React (Vite)
- Backend sencillo en Node.js (http nativo)
- Calendario de disponibilidad y gestión de citas
- Envío de confirmación por email con enlace para añadir la cita a Google Calendar

## 1) Instalación

```bash
npm install
```

## 2) Ejecutar frontend y backend

En una terminal (frontend):

```bash
npm run dev
```

En otra terminal (backend):

```bash
npm run server
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## 3) Variables de entorno

### Frontend (`.env`)

```bash
VITE_API_URL=http://localhost:4000
```

### Backend (opcional, para enviar email real)

Si no configuras Resend, la cita se guarda igual y el backend devuelve un fallback mailto.

```bash
PORT=4000
FRONTEND_URL=http://localhost:5173

RESEND_API_KEY=re_xxxxxxxxxxxxx
MAIL_FROM="Peluquería <onboarding@resend.dev>"
```

## 4) Funcionalidades implementadas

### Frontend (`/Booking`)

- Calendario mensual de citas
- Visualización de citas por día
- Horas disponibles dinámicas
- Formulario de reserva
- Panel para bloquear/desbloquear horas
- Eliminación de citas del día

### Backend (`server/`)

- `GET /api/availability?date=YYYY-MM-DD` → horas disponibles
- `GET /api/calendar?from=YYYY-MM-DD&to=YYYY-MM-DD` → citas y bloqueos
- `POST /api/appointments` → crea cita, genera enlace Google Calendar y archivo `.ics`, y envía email
- `PATCH /api/availability/:date` → bloquear/desbloquear una hora
- `DELETE /api/appointments/:id` → elimina cita

Persistencia sencilla en `server/data/store.json`.

## 5) Flujo de confirmación de calendario

Cuando creas una cita:

1. Se guarda en el backend.
2. Se genera un enlace de Google Calendar.
3. Se intenta enviar email automático mediante Resend (si está configurado).
4. El cliente puede añadir la cita a Google Calendar desde el enlace generado.
