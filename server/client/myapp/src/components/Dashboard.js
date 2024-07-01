import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const stocks = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

const Dashboard = ({ email }) => {
  const [subscribedStocks, setSubscribedStocks] = useState([]);
  const [stockPrices, setStockPrices] = useState({});
  const socket = io(process.env.REACT_APP_API_URL);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (subscribedStocks.length > 0) {
      socket.emit('subscribe', subscribedStocks);
      socket.on('stockPrices', (prices) => {
        setStockPrices(prices);
      });
    }
  }, [subscribedStocks, socket]);

  const handleSubscribe = (stock) => {
    if (!subscribedStocks.includes(stock)) {
      setSubscribedStocks([...subscribedStocks, stock]);
    }
  };

  return (
    <div>
      <h1>Dashboard for {email}</h1>
      <div>
        <h2>Subscribe to Stocks</h2>
        {stocks.map((stock) => (
          <button key={stock} onClick={() => handleSubscribe(stock)}>
            {stock}
          </button>
        ))}
      </div>
      <div>
        <h2>Subscribed Stocks</h2>
        {subscribedStocks.map((stock) => (
          <div key={stock}>
            {stock}: {stockPrices[stock]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
