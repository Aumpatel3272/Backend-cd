// import http from 'http'
// import dotenv from 'dotenv'
// dotenv.config({})
// import express from 'express'
// import cors from 'cors'
// import { Server, LobbyRoom } from 'colyseus'
// import { monitor } from '@colyseus/monitor'
// import { RoomType } from '../types/Rooms'
// import { SkyOffice } from './rooms/SkyOffice'

// // import socialRoutes from "@colyseus/social/express"


// const port = Number(process.env.PORT || 2567)
// const app = express()

// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello from Node.js on Render!')
// })

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server running on http://localhost:${port}`)
// })

// // app.use(cors())
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://virtual-desk.vercel.app"],
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true, // Allow cookies if needed
//   })
// );
// app.use(express.json())
// // app.use(express.static('dist'))

// const server = http.createServer(app)
// const gameServer = new Server({
//   server,
// })

// // register room handlers
// gameServer.define(RoomType.LOBBY, LobbyRoom)
// gameServer.define(RoomType.PUBLIC, SkyOffice, {
//   name: 'Public Lobby',
//   description: 'For making friends and familiarizing yourself with the controls',
//   password: null,
//   autoDispose: false,
// })
// gameServer.define(RoomType.CUSTOM, SkyOffice).enableRealtimeListing()

// /**
//  * Register @colyseus/social routes
//  *
//  * - uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
//  * - also uncomment the import statement
//  */
// // app.use("/", socialRoutes);

// // register colyseus monitor AFTER registering your room handlers
// app.use('/colyseus', monitor())

// gameServer.listen(port)
// console.log(`Listening on ws://localhost:${port}`)

import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { Server, LobbyRoom } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { RoomType } from '../types/Rooms'
import { SkyOffice } from './rooms/SkyOffice'

const port = Number(process.env.PORT || 3000)
const app = express()

app.use(
     cors({
      origin: ["http://localhost:5173", "https://virtual-desk-eta.vercel.app"],
      methods: "GET,POST,PUT,DELETE",
      credentials: true, // Allow cookies if needed
    })
   );

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello from Node.js on Render!')
})

// ✅ Let Colyseus handle the server setup (remove app.listen)
const server = http.createServer(app)

const gameServer = new Server({
  server,
})

// register room handlers
gameServer.define(RoomType.LOBBY, LobbyRoom)
gameServer.define(RoomType.PUBLIC, SkyOffice, {
  name: 'Public Lobby',
  description: 'For making friends and familiarizing yourself with the controls',
  password: null,
  autoDispose: false,
})
gameServer.define(RoomType.CUSTOM, SkyOffice).enableRealtimeListing()

// register colyseus monitor AFTER registering your room handlers
app.use('/colyseus', monitor())

// ✅ Start the server with Colyseus
server.listen(port, '0.0.0.0', () => {
  console.log(`Listening on ws://localhost:${port}`)
})
