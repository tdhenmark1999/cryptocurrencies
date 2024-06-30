import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'black',
            color: 'white',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'black',
            color: 'white',
          },
        },
      },
    },
  },
});

export default theme;
