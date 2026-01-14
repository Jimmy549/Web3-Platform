import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#73FDAA',
    },
    secondary: {
      main: '#22c55e',
    },
    background: {
      default: '#000000',
      paper: '#0a0a0a',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

export const metadata = {
  title: 'Web3 Platform - Your Gateway to Crypto',
  description: 'Web3 platform for crypto enthusiasts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
