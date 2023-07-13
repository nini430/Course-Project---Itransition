import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import 'react-phone-input-2/lib/style.css'


import App from './App.tsx';
import store from './store/store.ts';
import 'react-quill/dist/quill.snow.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <Provider store={store}>
        <App />
      </Provider>
      </LocalizationProvider>
      
    
  </BrowserRouter>
);
