import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { Layout } from './Layout';
import { ProductCard } from './Products/ProductCard';
import { LoginPage } from './LoginRegister/LoginPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {


  const theme = createTheme({
    typography: {
      fontFamily: ['"Segoe UI"'],
    },
    
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1450,
        xl: 1536,
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      
        <AppProvider>
            <Routes>

              <Route path='/' element={<Layout />}>
                
                <Route path="/" element={<ProductCard />} />
                <Route path="products/:category/" element={<ProductCard />} />

              </Route>

              <Route path="login/" element={<LoginPage />} />

            </Routes>
        </AppProvider>
        
    </ThemeProvider>
  );
}

export default App;
