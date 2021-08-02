import {createServer} from 'http';
import { Server } from 'socket.io';
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import passport from 'passport'
import path from 'path';
import connectDB from './config/db.js'

// import routers
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import passportConfig from './config/passport.js';

const __dirname = path.resolve()

dotenv.config({ path: '../.env' })

connectDB()


passportConfig(passport);

const PORT =  process.env.PORT || 8000
const app = express()


app.use(cors())
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
    res.send('what the fuck')
    console.log('what the fuck?')
  })
}



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});



app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})






io.on('connection', (socket) => {
  console.log(`New socket connected: ${socket.id}`)
})


