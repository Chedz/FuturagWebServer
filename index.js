
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

// Serve the websocket-client.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/websocket-client.html');
});

// Create a WebSocket server
const sockserver = new WebSocket.Server({ port: 443 });

sockserver.on('connection', (ws) => {
    //   // Handle WebSocket connection
    console.log('New client connected!');

    ws.send(JSON.stringify({"message":'connection established'}));

    ws.on('close', () => console.log('Client has disconnected!'))

    ws.on('message', data => {
        sockserver.clients.forEach(client => {
            console.log(`distributing message: ${data}`)
            client.send(`${data}`)
        })
    });
    
    ws.onerror = function () {
    console.log('websocket error')
    }
});

// Start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});