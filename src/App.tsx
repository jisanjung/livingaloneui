import { createStore, StoreProvider } from 'easy-peasy';
import globalState, { GlobalStateModel } from './model';
import ExpenseAppWrapper from './components/ExpenseAppWrapper';

function App() {

  const store = createStore<GlobalStateModel>(globalState);

  return (
    <StoreProvider store={store}>
      <ExpenseAppWrapper/>
    </StoreProvider>
  )
}

export default App
