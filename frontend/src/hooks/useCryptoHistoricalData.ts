import { useState, useEffect } from 'react';
import axios from 'axios';

interface HistoricalData {
  index: number;
  price: number;
}

export const useCryptoHistoricalData = (symbol: string, minutes: number) => {
  const [data, setData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/price/${symbol}?minutes=${minutes}`);

      const historicalData = response.data.history.map((price: number, index: number) => ({
        index,
        price,
      }));

      setData(historicalData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every 60 seconds
    return () => clearInterval(interval);
  }, [symbol, minutes]);

  return { data, loading, fetchData };
};
