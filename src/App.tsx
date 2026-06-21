import { createStore, StoreProvider } from 'easy-peasy';
import { BrowserRouter, Routes, Route } from 'react-router';
import globalState, { GlobalStateModel } from './model';
import ExpenseAppWrapper from './components/ExpenseAppWrapper';
import PurchaseHistory from './components/PurchaseHistory';

function App() {

  const store = createStore<GlobalStateModel>(globalState);

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
