const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

// Статическая страница для отображения подключений
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Отслеживание подключений и отключений
io.on('connection', (socket) => {
    console.log('Пользователь подключен: ' + socket.id);
    
    // Отправка сообщения на клиент при подключении
    io.emit('user-connected', socket.id);

    socket.on('disconnect', () => {
        console.log('Пользователь отключен: ' + socket.id);
        
        // Отправка сообщения на клиент при отключении
        io.emit('user-disconnected', socket.id);
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
});
