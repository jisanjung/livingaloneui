import { createStore, StoreProvider } from 'easy-peasy';
import { BrowserRouter, Routes, Route } from 'react-router';
import globalState, { GlobalStateModel } from './model';
import ExpenseAppWrapper from './components/ExpenseAppWrapper';
import PurchaseHistory from './components/PurchaseHistory';

// Created once at module scope - building it inside the component would hand
// back a fresh, empty store on every re-render and drop any loaded purchases.
const store = createStore<GlobalStateModel>(globalState);

function App() {

  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExpenseAppWrapper/>}/>
          <Route path="/history" element={<PurchaseHistory/>}/>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
