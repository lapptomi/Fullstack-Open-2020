const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    const uniqueError = 'expected `username` to be unique'
    if (error.message.includes(uniqueError)) {
      return response.status(400).json({error: 'Username must be unique'})
    }
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError:') {
    return response.status(401).send({
      error: 'unvalid jwt token'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}