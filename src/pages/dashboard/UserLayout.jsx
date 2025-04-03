import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { LayoutDashboard, User, BookMarked, GraduationCap, UserCog } from 'lucide-react';

const userMenu = [
  { icon: <GraduationCap size={20} />, text: "Formation", path: "/user/formation" },
  { icon: <UserCog size={20} />, text: "Personnel", path: "/user/personnel" }
];

export default function UserLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={userMenu} />
      
      <div className="flex-1 overflow-hidden">
        <Header />
        <main className="p-6">
          <Outlet /> {/* This will render the matched child route */}
        </main>
      </div>
    </div>
  );
}