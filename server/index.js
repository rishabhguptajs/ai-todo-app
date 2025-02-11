import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimiter from 'express-rate-limit'
import chatRoutes from './routes/chatRoutes.js'

dotenv.config();

const app = express()

const PORT = process.env.PORT || 8080;

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})

app.use(express.json());
app.use(cors());
app.use(limiter);

app.use('/llm', chatRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})