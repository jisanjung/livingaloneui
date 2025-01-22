import ExpenseInput from './components/ExpenseInput'
import Header from './components/Header'
import { createStore, StoreProvider } from 'easy-peasy';
import globalState, { GlobalStateModel } from './model';

function App() {

  const store = createStore<GlobalStateModel>(globalState);

  return (
    <StoreProvider store={store}>
      <main className="p-3">
        <Header/>
        <ExpenseInput/>
      </main>
    </StoreProvider>
  )
}

export default App
