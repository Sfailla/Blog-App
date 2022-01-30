import { setupWorker } from 'msw'
import { handlers } from './server-handlers'

export const worker = setupWorker(...handlers)

// { quiet: true, serviceWorker: { url: '/' } }
worker.start()
