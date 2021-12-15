import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import path from 'path'
import connectDB from './config/db.js'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

// import routers
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import teacherRouter from './routes/teacherRouter.js'
import parentRouter from './routes/parentRouter.js'
import studentRouter from './routes/studentRouter.js'
import classroomRouter from './routes/classroomRouter.js'

import passportConfig from './config/passport.js'
import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'

const __dirname = path.resolve()

dotenv.config({ path: '../.env' })

connectDB()

passportConfig(passport)

const PORT = process.env.PORT || 8000
const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
)

app.use(express.json())

// ROUTES

// middleware to log routes
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname, '/frontend/public')))
  app.use(express.static(path.join(__dirname, 'frontend', 'build')))

  app.get(
    '*',
    (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    // res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
  app.get('/test', (req, res) => {
    res.status(200).json({ message: 'are you working now' })
  })
}

// sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // proxy: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/teachers', teacherRouter)
app.use('/api/v1/parents', parentRouter)
app.use('/api/v1/students', studentRouter)
app.use('/api/v1/classrooms', classroomRouter)
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
// })

app.use(globalErrorHandler)

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})

io.on('connection', (socket) => {
  console.log(`New socket connected: ${socket.id}`)
})
