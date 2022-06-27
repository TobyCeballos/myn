const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Contenedor = require('./src/controllers/contenedorMsg.js')
const Container = require('./src/controllers/contenedorProd.js')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const fakerProd = require('./src/faker/faker')
const norm = require('./src/normalizr/desnormalizr')

const util = require('util')

function print(objecto) {
  console.log(util.inspect(objecto, false, 12, true));
}

app.use(express.static('./src/public'))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    res.render('index.ejs', { root: __dirname })
})

app.get('/productos-test', async (req, res) => {

    for (let i = 0; i < 5; i++) {
        const productos = fakerProd()
        const add = await Container.saveProd(productos)
    }
    res.redirect('/')
})


io.on('connection', async (sockets) => {
    console.log('Un cliente se ha conectado!: ' + sockets.id)

        // denormalizar acá
    const normalized = await norm.normalizedList()
    console.log(normalized)
    await norm.denormalizedList(normalized)

    sockets.emit('product', await Container.getProds())
    sockets.emit('messages', await Contenedor.getMsg())
    sockets.on('new-product', async data => {
        await Container.saveProd(data)
        console.log(data)
        io.sockets.emit('product', await Container.getProds())
    })
    sockets.on('new-message', async dato => {
        const author = dato.author
        const messageText = dato.message
        const fecha = dato.fecha
        const hora = dato.hora
        await Contenedor.saveMsj(author, messageText, fecha, hora)
        console.log(dato)

        io.sockets.emit('messages', await Contenedor.getMsg())
    })
})





const PORT = 8080
httpServer.listen(PORT, () => console.log('Iniciando en el puerto: ' + PORT))