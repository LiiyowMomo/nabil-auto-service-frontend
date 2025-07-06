import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './screens/LoginForm';
import AdminDashboard from './screens/AdminDashboard.jsx';
import SuperAdminDashboard from './screens/SuperAdminDashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin-login" element={<LoginForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
        {/* Add more routes as needed */}
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)