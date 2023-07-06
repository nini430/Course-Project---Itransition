import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import NavBar from './components/NavBar/NavBar';

import './utils/i18next';
import { useAppSelector } from './store/store';
import { darkTheme, lightTheme } from './utils/theme';

import {
  MainPage,
  AddCollection,
  Profile,
  AddItem,
  CollectionDetails,
  ItemDetails,
  Search,
  DesktopMessenger,
  Admin,
  Settings,
  Register,
  Login
} from './pages/index';

import routesPath from './utils/routes';

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
          <Route path={routesPath.editItem} element={<AddItem />} />
          <Route path={routesPath.settings} element={<Settings />} />
          <Route path={routesPath.admin} element={<Admin />} />
          <Route
            path={routesPath.addUser}
            element={<Register admin={true} />}
          />
          <Route
            path={routesPath.editUser}
            element={<Register edit admin={true} />}
          />
          <Route
            path={routesPath.collectionDetails}
            element={<CollectionDetails />}
          />
          <Route path={routesPath.itemDetails} element={<ItemDetails />} />
          <Route path={routesPath.messenger} element={<DesktopMessenger />} />
          <Route path={routesPath.search} element={<Search />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
