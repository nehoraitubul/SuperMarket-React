import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { Layout } from './Layout';

function App() {
  return (
      <AppProvider>
        <Routes>
          <Route path='/' element={<Layout />}>

          </Route>
        </Routes>
      </AppProvider>
  );
}

export default App;
