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
import Formation from './pages/Formateur-dash/Formations/Formation';
import Participation from './pages/Formateur-dash/Participation/Participation';

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
        
        {/* responsable Routes */}
        <Route element={<ProtectedRoute roles={['ROLE_RESPONSABLE']} />}>
          <Route element={<AppLayout role="responsable" />}>
            <Route path="/responsable" element={<AdminDashboard />} />
          </Route>
        </Route>
        
        {/* User Routes */}
        <Route element={<ProtectedRoute roles={['ROLE_USER']} />}>
          <Route element={<AppLayout role="user" />}>
            <Route path="/user/formation" element={<Formations />} />
            <Route path="/user/personnel" element={<Personnel />} />
          </Route>
        </Route>

        {/* Formateur Routes */}
        <Route element={<ProtectedRoute roles={['ROLE_FORMATEUR']} />}>
          <Route element={<AppLayout role="formateur" />}>
          <Route path="/formateur/participations" element={<Formation />} />
          <Route path="/formateur/participations/:formationId" element={<Participation />} />
          </Route>
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;