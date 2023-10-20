const express = require('express')
const cors = require('cors')
const path = require('path') 

const app = express() 

app.use(express.json())  //configuring middleware, checking the content type
app.use(cors()) 

app.get('/', (req,res) => {
    if (req.query.debug === 'true') {
        console.log('Debug mode is enabled.');
    }
    res.sendFile(path.join(__dirname, '/index.html'));  
}); 


app.get('/css', (req, res) => {
    if (req.query.debug === 'true') {
        console.log('Debug mode is enabled.');
    }
    res.sendFile(path.join(__dirname, '/style.css'));
});


app.get('/js', (req, res) => {
    if (req.query.debug === 'true') {
        console.log('Debug mode is enabled.');   
    }
    res.setHeader('Content-Type', 'text/javascript');   //in ?
    res.sendFile(path.join(__dirname, '/calapp.js')); 
});

app.listen(4000, ()=> {console.log('Listening on port 4000')}) 