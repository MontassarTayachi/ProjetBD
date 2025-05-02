import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { LayoutDashboard, User, BookMarked, GraduationCap, UserCog } from 'lucide-react';

const managerMenu = [
  { icon: <LayoutDashboard size={20} />, text: "Tableau de Bord", path: "/manager" }
];


export default function ManagerLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={managerMenu} />
      
      <div className="flex-1 overflow-hidden">
        <Header />
        <main className="p-6">
          <Outlet /> {/* This will render the matched child route */}
        </main>
      </div>
    </div>
  );
}