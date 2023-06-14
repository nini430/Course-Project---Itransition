import {useMemo} from 'react'
import {Routes,Route} from 'react-router-dom';
import {ThemeProvider} from '@mui/material'
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import './utils/i18next';
import { useAppSelector } from './store/store';
import { darkTheme, lightTheme } from './utils/theme';


function App() {
  const {mode}=useAppSelector(state=>state.common);
  const theme=useMemo(()=>mode==='dark'?darkTheme:lightTheme,[mode]);
  return (
    <ThemeProvider theme={theme}>
      <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </ThemeProvider>
    
  )
}

export default App;
