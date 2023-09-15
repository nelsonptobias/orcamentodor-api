const { Router } = require('express')

const {
  getDadosLink
} = require('./controller')

const orcamentadorRoutes = Router()

orcamentadorRoutes.get('/v1/user', getDadosLink)

module.exports = {
  orcamentadorRoutes
}
