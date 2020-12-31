const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const rfs = require('rotating-file-stream')
const debug = require('debug')('virtual_sales_api')

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'
const app = express()
let server = require('http').Server(app)
const port = process.env.PORT || 3333
let io = require('socket.io')(server)

server.listen(port, () => console.log('Server running in port ' + port))

server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    console.log('server listenting on port ' + port)
    const addr = server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

    debug('Listening on ' + bind)
}

io.on('connection', function (socket) {
    console.log(socket.id + ': connected')
    socket.emit('id', socket.id)

    socket.on('disconnect', function () {
        console.log(socket.id + ': disconnected')
    })

    socket.on('pushScenario', (data) => {
        io.sockets.emit('pushScenario', { data: data, id: socket.id })
        console.log('pushScenario socket hearing ', data)
    })
    socket.on('playInitialMovie', (data) => {
        io.sockets.emit('playInitialMovie', { data: data, id: socket.id })
        console.log('playInitialMovie socket hearing ', data)
    })
    socket.on('actionUser', (data) => {
        io.sockets.emit('actionUser', { data: data, id: socket.id })
        console.log('actionUser socket hearing ', data)
    })
    socket.on('joinZoomRoom', (data) => {
        io.sockets.emit('joinZoomRoom', { data: data, id: socket.id })
        console.log('joinZoomRoom socket hearing ', data)
    })
    socket.on('joinKVSRom', (data) => {
        io.sockets.emit('joinKVSRom', { data: data, id: socket.id })
        console.log('joinKVSRom socket hearing ', data)
    })
    socket.on('pressNode', (data) => {
        io.sockets.emit('pressNode', { data: data, id: socket.id })
        console.log('user press on a node ', data)
    })
    socket.on('sendMasterNotify', (data) => {
        io.sockets.emit('sendMasterNotify', { data: data, id: socket.id })
        console.log('sendMasterNotify socket hearing ', data)
    })
})

app.use(helmet())
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
})

app.use(
    isProduction
        ? morgan('combined', { stream: accessLogStream })
        : morgan('dev')
)
app.use(cors())
app.use(express.json())

app.use('', require('./src/routes/router.js'))

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, Piala !'
    })
})

app.get('*', (req, res) => {
    res.json({
        message: 'Hello, Piala !'
    })
})
