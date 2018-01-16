const Koa = require('koa')
const log = require('emojifylogs').log
const Router = require('koa-router');
const createReadStream = require('fs').createReadStream
let router = new Router();
const app = new Koa()
app.use(router.routes()).use(router.allowedMethods());
const http = require('http').createServer(app.callback())
const io = require('socket.io')(http)

router.get('/', async (ctx,next) => {
    ctx.type = 'html'
    ctx.body = createReadStream('index.html')
})
const port  = 4000

io.on('connection',socket =>{
    log.info(`user Connected ${socket.id} `)
})

http.listen(port,_=>log(`running on port ${port}`))

