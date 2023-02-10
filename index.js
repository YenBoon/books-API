// Dependencies
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

app.use(cors());
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true, useUnifiedTopology: true
  }, () => {
    console.log('connected to mongo: ', process.env.MONGO_URI)
  }
)

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// books
const booksController = require('./controllers/book_controller.js')
app.use('/books', booksController)

app.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page</h1>')
})

app.listen(process.env.PORT)
console.log('listening on port:', PORT)