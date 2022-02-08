if (process.env.NODE_ENV === 'development') {
  // const { worker } = require('./server')
  // worker.start()
} else if (process.env.NODE_ENV === 'test') {
  const { worker } = require('./server')
  worker.start()
}

export {}
