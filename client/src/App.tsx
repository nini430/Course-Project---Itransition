import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ThemeProvider } from '@mui/material';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import './utils/i18next';
import { useAppSelector } from './store/store';
import { darkTheme, lightTheme } from './utils/theme';
import MainPage from './pages/MainPage';
import NavBar from './components/NavBar/NavBar';
import AddCollection from './pages/collection/AddCollection';
import AddItem from './pages/item/AddItem';
import Profile from './pages/profile/Profile';
import CollectionDetails from './pages/collection/CollectionDetails';

function App() {
  const { mode } = useAppSelector((state) => state.common);
  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode]
  );
  return (
    <div className={`theme-${mode}`}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path='/profile/:userId' element={<Profile/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/add-collection" element={<AddCollection />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/collection/:collectionId" element={<CollectionDetails/>}/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
