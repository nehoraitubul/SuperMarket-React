import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { Layout } from './Layout';
import { ProductCard } from './Products/ProductCard';

function App() {
  return (
      <AppProvider>
          <Routes>

            <Route path='/' element={<Layout />}>
              
              <Route path="products/:category/" element={<ProductCard />} />

            </Route>
          </Routes>
      </AppProvider>
  );
}

export default App;
