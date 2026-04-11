import fs from 'node:fs/promises'
import path from 'node:path'

const DATA_DIR = path.resolve('server/data')
const STORE_FILE = path.join(DATA_DIR, 'store.json')

const DEFAULT_SLOTS = Array.from({ length: 19 }, (_, index) => {
  const totalMinutes = 10 * 60 + index * 30
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
  const minutes = String(totalMinutes % 60).padStart(2, '0')
  return `${hours}:${minutes}`
})

const DEFAULT_STORE = {
  appointments: [],
  blockedSlots: {},
}

export async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true })

  try {
    await fs.access(STORE_FILE)
  } catch {
    await saveStore(DEFAULT_STORE)
  }
}

export async function getStore() {
  const raw = await fs.readFile(STORE_FILE, 'utf8')
  return JSON.parse(raw)
}

export async function saveStore(store) {
  await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2), 'utf8')
}

export function listAvailableSlots(store, date) {
  const reserved = new Set(
    store.appointments.filter((item) => item.date === date).map((item) => item.time),
  )
  const blocked = new Set(store.blockedSlots[date] || [])

  return DEFAULT_SLOTS.filter((slot) => !reserved.has(slot) && !blocked.has(slot))
}

export function isSlotAvailable(store, date, time) {
  return listAvailableSlots(store, date).includes(time)
}

export function getDefaultSlots() {
  return DEFAULT_SLOTS
}
