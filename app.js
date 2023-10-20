const express = require('express')
const cors = require('cors')
const path = require('path') 

const app = express() 

app.use(express.json())  //configuring middleware, checkiong the content type
app.use(cors()) 

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
}) 


app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '/style.css'))
})


app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '/calapp.js')) 
})

app.listen(4000, ()=> {console.log('Listening on port 4000')})