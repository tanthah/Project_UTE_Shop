import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './src/routes/auth.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Có lỗi xảy ra trên server!' })
})

async function start() {
  try {
    const uri = process.env.MONGO_URI
    if (!uri) {
      throw new Error('MONGO_URI chưa được cấu hình trong .env')
    }

    await mongoose.connect(uri)
    console.log('Đã kết nối MongoDB')

    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`)
      console.log(`API Base URL: http://localhost:${PORT}/api`)
    })
  } catch (err) {
    console.error('Lỗi khi khởi động server:', err)
    process.exit(1)
  }
}

start()
