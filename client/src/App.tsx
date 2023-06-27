import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import ItemDetails from './pages/item/ItemDetails';
import routesPath from './utils/routes';
import Settings from './pages/settings/Settings';

function App() {
  const { mode } = useAppSelector((state) => state.common);
  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode]
  );
  return (
    <div className={`theme-${mode} App`}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path={routesPath.main} element={<MainPage />} />
          <Route path={routesPath.register} element={<Register />} />
          <Route path={routesPath.profile} element={<Profile />} />
          <Route path={routesPath.login} element={<Login />} />
          <Route path={routesPath.addCollection} element={<AddCollection />} />
          <Route path={routesPath.addItem} element={<AddItem />} />
          <Route path={routesPath.editItem} element={<AddItem/>}/>
          <Route path={routesPath.settings} element={<Settings />} />
          <Route
            path={routesPath.collectionDetails}
            element={<CollectionDetails />}
          />
          <Route path={routesPath.itemDetails} element={<ItemDetails />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
