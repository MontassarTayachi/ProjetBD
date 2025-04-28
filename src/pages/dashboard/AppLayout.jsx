import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useState } from "react";
import {
  LayoutDashboard,
  User,
  BookMarked,
  GraduationCap,
  UserCog,
} from "lucide-react";

// Define all menu configurations
const menuConfig = {
  admin: [
    {
      icon: <LayoutDashboard size={20} />,
      text: "Tableau de Bord",
      path: "/admin/dash",
    },
    { icon: <User size={20} />, text: "Utilisateurs", path: "/admin/users" },
    {
      icon: <BookMarked size={20} />,
      text: "Referentiels",
      path: "/admin/references",
    },
    {
      icon: <GraduationCap size={20} />,
      text: "Formation",
      path: "/admin/formation",
    },
    {
      icon: <UserCog size={20} />,
      text: "Personnel",
      path: "/admin/personnel",
    },
  ],
  responsable: [
    {
      icon: <LayoutDashboard size={20} />,
      text: "Tableau de Bord",
      path: "/manager",
    },
  ],
  user: [
    {
      icon: <GraduationCap size={20} />,
      text: "Formation",
      path: "/user/formation",
    },
    {
      icon: <UserCog size={20} />,
      text: "Personnel",
      path: "/user/personnel",
    },
  ],
  formateur: [
    {
      icon: <GraduationCap size={20} />,
      text: "Formation",
      path: "/formateur/formation",
    },
  ],
};

const routeTitles = {
  "/admin/users": "Gestion des Utilisateurs",
  "/admin/references": "Gestion des Referentiels",
  "/admin/formation": "Dashboard - Formations",
  "/admin/dash": "Dashboard",
  "/admin/personnel": "Dashboard - Personnel",
  // Add more routes as needed
  "/user/formation": "Dashboard - Formations",
  "/user/personnel": "Dashboard - Personnel",
  "/responsable": "Dashboard",
  "/formateur/formation": "Dashboard - Formations",
  "/formateur/participations": "Dashboard - Participations",


};

export default function AppLayout({ role = "user" }) {
  // Get the appropriate menu based on role
  const menuItems = menuConfig[role] || menuConfig.user;
  const location = useLocation();
  const [countLabel, setCountLabel] = useState("");
  const [headerAddHandler, setHeaderAddHandler] = useState(null);

  const path = location.pathname;
  const title = routeTitles[path] || "Dashboard";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} />

      <div className="flex-1 overflow-hidden">
        <main className={`px-6 md:px-12 mb-10 ml-14 md:ml-56`}>
          <Header subtitle="Overview" title={title} countLabel={countLabel} onAddClick={headerAddHandler} />{" "}
          <Outlet context={{ setCountLabel, setHeaderAddHandler }} />
          {/* This will render the matched child route */}
        </main>
      </div>
    </div>
  );
}
