import { createStore, StoreProvider } from 'easy-peasy';
import { BrowserRouter, Routes, Route } from 'react-router';
import globalState, { GlobalStateModel } from './model';
import ExpenseAppWrapper from './components/ExpenseAppWrapper';
import PurchaseHistory from './components/PurchaseHistory';

// Created once at module scope - building it inside the component would hand
// back a fresh, empty store on every re-render and drop any loaded purchases.
const store = createStore<GlobalStateModel>(globalState);

// Fetch the balance and purchase history once per app load. Doing it here,
// rather than in a component effect, means route changes and StrictMode's
// double mount never trigger another request; pages read from the store.
store.getActions().balance.load();
store.getActions().purchases.load();

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
