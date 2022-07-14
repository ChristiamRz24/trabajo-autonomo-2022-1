import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './Home'
import { Login } from './Login'
import { Registro } from './Registro'
import { Contratista } from './Contratista'
import { Estudiante } from './Estudiante'
import { NotFound } from './NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/login' element={ <Login /> }></Route>
        <Route path='/registro' element={ <Registro /> }></Route>
        <Route path='/contratista' element={ <Contratista /> }></Route>
        <Route path='/estudiante' element={ <Estudiante /> }></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
  )
}

export default App
