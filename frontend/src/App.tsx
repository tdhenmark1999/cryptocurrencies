import React, { useState } from 'react';
import { useCryptoCurrentPrice } from './hooks/useCryptoCurrentPrice';
import { useCryptoHistoricalData } from './hooks/useCryptoHistoricalData';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';
import NavBar from './components/NavBar';
import CryptoGraph from './components/CryptoGraph';

const App: React.FC = () => {
  const [symbol, setSymbol] = useState('bitcoin');
  const { data: currentPriceData, loading: currentPriceLoading, fetchData: fetchCurrentPrice } = useCryptoCurrentPrice(symbol);
  const { data: historicalData, loading: historicalLoading } = useCryptoHistoricalData(symbol, 60);

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
    fetchCurrentPrice();
  };

  const getColor = (symbol: string) => {
    switch (symbol) {
      case 'bitcoin':
        return '#F7931A';
      case 'ethereum':
        return '#3C3C3D';
      case 'dogecoin':
        return '#C2A633';
      default:
        return '#8884d8';
    }
  };

  return (
    <div className="App">
      <NavBar handleSymbolChange={handleSymbolChange} activeSymbol={symbol} />
      <Container>
        <Paper style={{ padding: 16, marginTop: 16 }}>
          {currentPriceLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <Typography variant="h6">Latest Price: {currentPriceData?.latest} EUR</Typography>
              <Typography variant="h6">Average Price: {currentPriceData?.average} EUR</Typography>
            </div>
          )}
          <CryptoGraph loading={historicalLoading} data={historicalData} color={getColor(symbol)} />
        </Paper>
      </Container>
    </div>
  );
};

export default App;
