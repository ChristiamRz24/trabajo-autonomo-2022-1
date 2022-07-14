import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Login } from './Login'
import { Registro } from './Registro'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={ <Login /> }></Route>
        <Route path='/registro' element={ <Registro /> }></Route>
      </Routes>
    </Router>
  )
}

export default App