const express = require('express');
const cors = require('cors')
const path = require('path')

const app = express();

app.use(express.json())
app.use(cors()) 

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/css', (req,res) => {
    res.sendFile(path.join(__dirname, '/style.css'));
});

app.get('/js', (req,res) => {
    res.sendFile(path.join(__dirname, '/calapp.js'));
});


app.listen(2500, () => {
    console.log('Listening on https://localhost:2500'); 
});  




// app.get('/', (req, res) => {
//     res.send('Hello, World!'); // Response to display
//   });
  
//   // Start the server
//   app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });