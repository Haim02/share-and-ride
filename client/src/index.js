import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'; 
import './index.css';
import App from './App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/UI/ErrorBoundary';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}
disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <ErrorBoundary fallback="שגיעה">
    <App />
    </ErrorBoundary>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

// reportWebVitals();
