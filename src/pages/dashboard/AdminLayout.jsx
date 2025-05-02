import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { LayoutDashboard, User, BookMarked, GraduationCap, UserCog } from 'lucide-react';

const adminMenu = [
  { icon: <LayoutDashboard size={20} />, text: "Tableau de Bord", path: "/admin/dash" },
  { icon: <User size={20} />, text: "Utilisateurs", path: "/admin/users" },
  { icon: <BookMarked size={20} />, text: "Referentiels", path: "/admin/references" },
  { icon: <GraduationCap size={20} />, text: "Formation", path: "/admin/formation" },
  { icon: <UserCog size={20} />, text: "Personnel", path: "/admin/personnel" }
];

export default function AdminLayout() {
  return (
    <div className=" bg-gray-50">
          <div class="">  

      <Sidebar menuItems={adminMenu} />
      </div>
      <div className="flex-1 overflow-hidden">
        <Header />
        <div class="min-h-screen bg-gray-50 flex ml-54">
        <Outlet /> {/* This will render the matched child route */}
        </div>
      </div>
    </div>
  );
}