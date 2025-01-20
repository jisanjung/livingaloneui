import './App.css'
import Groceries from './pages/Groceries'
import Gas from './pages/Gas'
import AccumulatedSpending from './pages/AccumulatedSpending'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/groceries' element={<Groceries/>}/>
          <Route path='/gas' element={<Gas/>}/>
          <Route path='/' element={<AccumulatedSpending/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
