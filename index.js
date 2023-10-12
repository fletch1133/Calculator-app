// const express = require('express');
// const cors = require('cors')
// const path = require('path')



// const http = require('http') 
// const fs = require('fs') 
// const port = 3000

// const server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     fs.readFile('index.html', function(error, data) {
//         if (error) {
//             res.writeHead(404) 
//             res.write('Error: File Not Found')
//         } else {
//             res.write(data) 
//         }
//         res.end() 
//     }) 
// })

// server.listen(port, function(error) {
//     if (error) {
//         console.log('Something went wrong', error)
//     } else {
//         console.log('Server is listening on port ' + port)
//     }
// }) 




// const app = express();

// app.use(express.json())
// app.use(cors()) 

// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

// app.get('/css', (req,res) => {
//     res.sendFile(path.join(__dirname, '/style.css'));
// });

// app.get('/js', (req,res) => {
//     res.sendFile(path.join(__dirname, '/calapp.js'));
// });


// app.listen(2500, () => {
//     console.log('Listening on https://localhost:2500'); 
// });  




// app.get('/', (req, res) => {
//     res.send('Hello, World!'); // Response to display
//   });
  
//   // Start the server
//   app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });


const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer(function(req, res) {
    let filePath;

    if (req.url === '/' || req.url === '/index.html') {
        filePath = 'index.html';
    } else if (req.url === '/style.css') {
        filePath = 'style.css';
    } else if (req.url === '/calapp.js') {
        filePath = 'calapp.js';
    } else {
        res.writeHead(404);
        res.write('Error: File Not Found');
        res.end();
        return;
    }

    fs.readFile(filePath, function(error, data) {
        if (error) {
            res.writeHost(404);
            res.write('Error: File Not Found')
        } else {
            const contentType = getContentType(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data); 
        }
        res.end()
    });
});

server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong'. error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});

function getContentType(filePath) {
    const extname = path.extname(filePath).toLowerCase();
    if (extname === '.html') {
        return 'text/html';
    } else if (extname === '.css') {
        return 'text/css';
    } else if (extname == '.js') {
        return 'text/javascript';
    }
    return 'text/plain';
}