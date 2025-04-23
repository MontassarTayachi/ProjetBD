import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Home from './pages/Home';
import Utilisateurs from './pages/utilisateurs/Utilisateurs';
import Personnel from "./pages/personnel/Personnel";
import Formations from './pages/formations/Formations';
import Referentiels from './pages/Referentiels/Referentiels';
import AppLayout from './pages/dashboard/AppLayout'; // Import the unified layout
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
          <Route element={<AppLayout role="admin" />}>
            <Route path="/admin/dash" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Utilisateurs />} />
            <Route path="/admin/references" element={<Referentiels />} />
            <Route path="/admin/formation" element={<Formations />} />
            <Route path="/admin/personnel" element={<Personnel />} />
            
          </Route>
        </Route>
        
        {/* Manager Routes */}
        <Route element={<ProtectedRoute roles={['ROLE_RESPONSABLE']} />}>
          <Route element={<AppLayout role="manager" />}>
            <Route path="/manager" element={<AdminDashboard />} />
          </Route>
        </Route>
        
        {/* User Routes */}
        <Route element={<ProtectedRoute roles={['ROLE_USER']} />}>
          <Route element={<AppLayout role="user" />}>
            <Route path="/user/formation" element={<Formations />} />
            <Route path="/user/personnel" element={<Personnel />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;