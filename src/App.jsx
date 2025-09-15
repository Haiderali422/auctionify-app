import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/SignIn/SignIn';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout/Layout';
import LiveAuction from './Pages/LiveAuction/LiveAuction';
import ProductDetail from './Pages/AuctionDetail/AuctionDetail';
import PaymentSuccess from './Pages/Payment/PaymentSuccess';
import PaymentCancel from './Pages/Payment/PaymentCancel';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/item/:itemId" element={<ProductDetail />} />
            <Route
              path="/liveauction"
              element={
                <ProtectedRoute>
                  <LiveAuction />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
