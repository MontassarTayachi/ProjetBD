import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Home from './pages/Home';
import AdminLayout from './pages/dashboard/AdminLayout';
import Utilisateurs from './pages/utilisateurs/Utilisateurs';
import ManagerLayout from './pages/dashboard/MangerLayout';
import Personnel from "./pages/personnel/Personnel";
import Formations from './pages/formations/formations';
import Referentiels from './pages/Referentiels/Referentiels';
import UserLayout from './pages/dashboard/UserLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          
          {/* Admin Routes */}
          <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
            <Route path="/admin" element={<AdminLayout />} >
            <Route path="dash" element={<AdminDashboard />} />
            <Route path="users" element={<Utilisateurs />} />
            <Route path="references" element={<Referentiels />} />
            <Route path="formation" element={<Formations />} />
            <Route path="personnel" element={<Personnel />} />

            </Route>
          </Route>
          
          {/* Manager Routes */}
          <Route element={<ProtectedRoute roles={['ROLE_RESPONSABLE']} />}>
          <Route path="/manager" element={<ManagerLayout />} >
          <Route index element={<AdminDashboard />} />
          </Route>
          </Route>
          
          {/* User Routes */}
          <Route element={<ProtectedRoute roles={['ROLE_USER']} />}>
          <Route path="/user" element={<UserLayout />} >
            <Route path='formation' element ={<Formations/>}/>
            <Route path="personnel" element={<Personnel />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;