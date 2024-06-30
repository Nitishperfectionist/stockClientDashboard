const stocks = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];
const stockPrices = {};

stocks.forEach(stock => {
    stockPrices[stock] = Math.floor(Math.random() * 1000);
});

function getRandomPrice() {
    return Math.floor(Math.random() * 1000);
}

function updateStockPrices() {
    stocks.forEach(stock => {
        stockPrices[stock] = getRandomPrice();
    });
}

setInterval(updateStockPrices, 1000);

module.exports = {
    stocks,
    stockPrices,
};
