const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const { stocks, stockPrices } = require('./randomStockPrices');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'https://stockclientdashboard-frontend3.onrender.com', // Allow requests from your frontend URL
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
