const express = require('express');
const http = require('http');
const path = require('path'); // Import path module for resolving paths
const socketIo = require('socket.io');
const { stocks, stockPrices } = require('./randomStockPrices');
const app = require('./app');

const server = http.createServer(app);
console.log(__dirname);

// Use the client app, resolving the path correctly
app.use(express.static(path.join(__dirname, '../client/myapp/build')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, '../client/myapp/build','index.html'))
})

const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});



io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('subscribe', (subscribedStocks) => {
    console.log('Subscribed to stocks:', subscribedStocks);
    setInterval(() => {
      const prices = {};
      subscribedStocks.forEach(stock => {
        prices[stock] = stockPrices[stock];
      });
      socket.emit('stockPrices', prices);
    }, 1000);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
