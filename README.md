# Peluquería - Sistema de Gestión de Citas

Aplicación web para una peluquería con sistema de reservas de citas integrado con n8n.

## Características

- Página de servicios con precios
- Galería de trabajos
- Sistema de reservas de citas
- Integración con n8n para backend de citas

## Configuración del Backend con n8n

Para el sistema de citas, necesitas configurar un workflow en n8n:

1. **Instalar n8n**: Si no tienes n8n instalado, puedes instalarlo con Docker:
   ```bash
   docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
   ```

2. **Crear un workflow**:
   - Agrega un nodo "Webhook" como trigger
   - Configura el método HTTP como POST
   - El webhook recibirá los datos de la cita en formato JSON con campos: name, email, phone, service, date, time, notes

3. **Procesar los datos**:
   - Conecta el webhook a nodos para guardar en base de datos (ej: MySQL, PostgreSQL)
   - Agrega envío de email de confirmación usando nodos de email
   - Opcionalmente, integra con calendario (Google Calendar, etc.)

4. **Configurar la URL del webhook**:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega: `VITE_N8N_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/tu-webhook-id`

## Instalación y Ejecución

```bash
npm install
npm run dev
```

## Estructura del Proyecto

- `src/assets/pages/`: Páginas principales (Home, Services, Booking, etc.)
- `src/assets/components/`: Componentes reutilizables (Header, Footer)
- `src/styles/`: Estilos CSS para cada página

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
