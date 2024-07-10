const express = require('express');
const http = require('http');
const path = require('path'); // Import path module for resolving paths
const socketIo = require('socket.io');
const { stocks, stockPrices } = require('./randomStockPrices');
const app = require('./app');
require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000; // Use port from .env or fallback to 5000

const server = http.createServer(app);
console.log(__dirname);

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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
