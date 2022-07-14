import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Login } from './Login'
import { Registro } from './Registro'
import { NotFound } from './NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={ <Login /> }></Route>
        <Route path='/registro' element={ <Registro /> }></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
  )
}

export default App
