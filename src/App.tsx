import ExpenseInput from './components/ExpenseInput'
import Header from './components/Header'
import { createStore, StoreProvider } from 'easy-peasy';
import globalState, { GlobalStateModel } from './model';
import Keypad from './components/Keypad';

function App() {

  const store = createStore<GlobalStateModel>(globalState);

  return (
    <StoreProvider store={store}>
      <main className="p-3 h-screen">
        <Header/>
        <ExpenseInput/>
        <Keypad/>
      </main>
    </StoreProvider>
  )
}

export default App
