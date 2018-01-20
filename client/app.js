const express = require('express')
const app = express()
const log = require('emojifylogs').log
app.use(express.static('public'))
var server = require('http').createServer(app);
const port = 3000
const io = require('socket.io')(server)

server.listen(port, _ => log(`running on port ${port}`))
io.on('connection', socket => {
  log.info(`user Connected ${socket.id} `)
})