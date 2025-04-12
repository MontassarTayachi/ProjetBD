import Card from '../DashboardLayout/Card';
import { FaUsers } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import Overview from '../DashboardLayout/Overview';
import RecentParticipants from '../DashboardLayout/RecentParticipants';
import UniqueVisitorCard from '../DashboardLayout/UniqueVisitorCard';
import ThemeCustomization from '../DashboardLayout/themes';
import PieActiveArc from '../DashboardLayout/PieActiveArc';
import SalesChart from '../DashboardLayout/SalesChart';

export default function AdminDashboard() {
  const recentUsers = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", joined: "2023-10-15" },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", role: "Manager", joined: "2023-10-10" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Trainer", joined: "2023-10-05" }
  ];
  
  return (
    
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
           <Card
            color="#4CAF50"
            title="Total Users"
            value={recentUsers.length}
            icon={<FaUsers/>} // Replace with your desired icon
          />
          <Card
            color="#2196F3"
            title="Total Trainers"
            value={recentUsers.filter(user => user.role === "Trainer").length}
            icon={<FaChalkboardTeacher/>} // Replace with your desired icon
          />
          <Card
            color="#FF9800"
            title="Total Managers"
            value={recentUsers.filter(user => user.role === "Manager").length}
            icon={<GrUserManager/>} // Replace with your desired icon
          />
          <Card
            color="#F44336"
            title="Total Admins"
            value={recentUsers.filter(user => user.role === "Admin").length}
            icon={<RiAdminFill/>} // Replace with your desired icon
          /> 
          
          </div>
          
          
          <div className="flex justify-between p-4">
          <UniqueVisitorCard />
          <RecentParticipants/>
          </div>
          <ThemeCustomization><SalesChart /></ThemeCustomization>
          <div className="flex justify-between p-4">
          <Overview />
          <PieActiveArc/>
         
          </div>
          

          </>
       
  );
}