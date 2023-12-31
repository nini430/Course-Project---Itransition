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
  Admin,
  Settings,
  Register,
  Login,
  Expired,
  NotFound,
} from './pages/index';

import routesPath from './utils/routes';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import EmailVerificationSuccess from './pages/auth/EmailVerificationSuccess';
import { styled } from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar';
import CallbackPage from './pages/CallbackPage/CallbackPage';

function App() {
  const { mode } = useAppSelector((state) => state.common);
  const { authedUser } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode]
  );
  return (
    <div className={`theme-${mode} App`}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <AppContainer>
          <Sidebar />
          <Routes>
            <Route path={routesPath.main} element={<MainPage />} />
            <Route path={routesPath.register} element={<Register />} />
            <Route path={routesPath.profile} element={<Profile />} />
            <Route path={routesPath.login} element={<Login />} />
            <Route
              path={routesPath.addCollection}
              element={<AddCollection />}
            />
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
            <Route path={routesPath.editCollection} element={<AddCollection/>}/>
            <Route path={routesPath.itemDetails} element={<ItemDetails />} />
            <Route path={routesPath.search} element={<Search />} />
            <Route
              path={routesPath.forgotPassword}
              element={<ForgotPassword />}
            />
            <Route
              path={routesPath.resetPassword}
              element={<ResetPassword />}
            />
            <Route path={routesPath.expiredLink} element={<Expired />} />
            <Route path={routesPath.verifyEmail} element={<VerifyEmail />} />
            <Route
              path={routesPath.verifyEmailAction}
              element={<EmailVerificationSuccess />}
            />
            <Route path={routesPath.redirectPage} element={<CallbackPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContainer>
      </ThemeProvider>
    </div>
  );
}

const AppContainer = styled.div`
  display: flex;
`;

export default App;
