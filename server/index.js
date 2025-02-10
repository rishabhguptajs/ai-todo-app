import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import chatRoutes from './routes/chatRoutes.js'

dotenv.config();

const app = express()

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/llm', chatRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})