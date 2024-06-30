import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

interface PriceData {
  latest: number;
  history: number[];
}

const priceData: { [key: string]: PriceData } = {
  bitcoin: { latest: 0, history: [] },
  ethereum: { latest: 0, history: [] },
  dogecoin: { latest: 0, history: [] },
};

const fetchPrices = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,ethereum,dogecoin',
        vs_currencies: 'eur',
      },
    });

    const data = response.data;
    priceData.bitcoin.latest = data.bitcoin.eur;
    priceData.ethereum.latest = data.ethereum.eur;
    priceData.dogecoin.latest = data.dogecoin.eur;

    priceData.bitcoin.history.push(data.bitcoin.eur);
    priceData.ethereum.history.push(data.ethereum.eur);
    priceData.dogecoin.history.push(data.dogecoin.eur);

    // Limit history to 60 entries
    Object.keys(priceData).forEach((key) => {
      if (priceData[key].history.length > 60) {
        priceData[key].history.shift();
      }
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};

// Fetch prices every 60 seconds
setInterval(fetchPrices, 60000);
fetchPrices();

app.get('/price/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const minutes = parseInt(req.query.minutes as string) || 60;

  if (!priceData[symbol]) {
    return res.status(404).send('Symbol not found');
  }

  const history = priceData[symbol].history.slice(-minutes);
  const average = history.reduce((a, b) => a + b, 0) / history.length;

  res.json({
    latest: priceData[symbol].latest,
    average,
    history,
    count: history.length,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
