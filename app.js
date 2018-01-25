const log = require('emojifylogs').log
const ss = require('socket.io-stream')
const express = require('express')
const app = express()
app.use(express.static('client/public'))
var server = require('http').createServer(app)
const port = 3000
const io = require('socket.io')(server)
var path = require('path')
var fs = require('fs')

server.listen(port, _ => log(`running on port ${port}`))
io.on('connection', socket => {
  // userSockets.push(socket)
  ss(socket).on('file', (stream, data) => {
    stream.pipe(fs.createWriteStream('client/public/assets/lol1.mp3'))
    ss(socket).on('song',()=>{
      io.emit('loaded',{});
      console.log('done')
    })

    })

  log.info(`user Connected ${socket.id} `)
})

