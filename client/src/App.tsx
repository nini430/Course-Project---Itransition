import {Routes,Route} from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import './utils/i18next';


function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App;
