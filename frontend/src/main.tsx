import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import User from './pages/User';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<User />} />
            </Route>

            {/* Default redirect to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <ToastContainer /> {/* Add ToastContainer to render notifications */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
