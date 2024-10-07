const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  // Отправляем простую HTML-страницу
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(
    `<!DOCTYPE html>
    <html>
    <head>
        <title>WebSocket Server</title>
    </head>
    <body>
        <h1>WebSocket Connection</h1>
        <div id="messages"></div>
        <script>
            const ws = new WebSocket('ws://localhost:8080');
            
            ws.onopen = () => {
                document.getElementById('messages').innerHTML += '<p>Connected to server</p>';
            };
            
            ws.onmessage = (event) => {
                document.getElementById('messages').innerHTML += '<p>' + event.data + '</p>';
            };
            
            ws.onclose = () => {
                document.getElementById('messages').innerHTML += '<p>Disconnected from server</p>';
            };
        </script>
    </body>
    </html>
  `);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send('Welcome to the WebSocket server!');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server is listening on http://localhost:8080');
});
