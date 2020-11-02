const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')

const { orcamentadorRoutes } = require('./src/routes')

app.use(cors())
app.use(bodyParser.json())

app.use('/', orcamentadorRoutes)

app.listen(8000, function () {
  console.log('Api up on port 8000')
})

module.exports = {
  app
}
