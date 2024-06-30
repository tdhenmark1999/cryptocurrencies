import { useState, useEffect } from 'react';
import axios from 'axios';

interface CurrentPriceData {
  latest: number;
  average: number;
  history: number[];
  count: number;
}

export const useCryptoCurrentPrice = (symbol: string) => {
  const [data, setData] = useState<CurrentPriceData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<CurrentPriceData>(`/price/${symbol}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching current price:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every 60 seconds
    return () => clearInterval(interval);
  }, [symbol]);

  return { data, loading, fetchData };
};
