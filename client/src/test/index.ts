if (process.env.NODE_ENV === 'test') {
  const { worker } = require('./server')
  worker.start()
}

export {}
