import {createServer} from 'http';
import { Server } from 'socket.io';
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path';
import connectDB from './config/db.js'

import userRouter from './routes/userRouter.js'

const __dirname = path.resolve()

dotenv.config({ path: '../.env' })

const PORT =  process.env.PORT || 8000
const app = express()

connectDB()

app.use(cors())
app.use(express.json())



// ROUTES
app.use('/', userRouter)

// middleware to log routes
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}




const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

httpServer.listen(3000, () => {
  console.log(`Server listening on ${PORT}`.yellow.bold)
})


io.on('connection', (socket) => {
  console.log(`New socket connected: ${socket.id}`)
})


