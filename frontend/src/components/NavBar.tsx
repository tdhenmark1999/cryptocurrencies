import React from 'react';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText } from '@mui/material';

interface NavBarProps {
  handleSymbolChange: (symbol: string) => void;
  activeSymbol: string;
}

const NavBar: React.FC<NavBarProps> = ({ handleSymbolChange, activeSymbol }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>Crypto Price Tracker</Typography>
        <List component="nav" style={{ display: 'flex' }}>
          <ListItem button onClick={() => handleSymbolChange('bitcoin')} selected={activeSymbol === 'bitcoin'}>
            <ListItemText primary="BTC" />
          </ListItem>
          <ListItem button onClick={() => handleSymbolChange('ethereum')} selected={activeSymbol === 'ethereum'}>
            <ListItemText primary="ETH" />
          </ListItem>
          <ListItem button onClick={() => handleSymbolChange('dogecoin')} selected={activeSymbol === 'dogecoin'}>
            <ListItemText primary="DOGE" />
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
