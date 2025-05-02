import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import StatisticsCard from '../../components/StatisticsCard';

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Header />

        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatisticsCard 
              title="Active Formations" 
              value="12" 
              icon="📚" 
              color="bg-[#c1b5db]"
            />
            <StatisticsCard 
              title="Participants" 
              value="143" 
              icon="👥" 
              color="bg-[#947ebc]"
            />
            <StatisticsCard 
              title="Completion Rate" 
              value="89%" 
              icon="📈" 
              color="bg-[#d8d4af]"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="w-10 h-10 rounded-full bg-[#947ebc]/10 flex items-center justify-center mr-4">
                    <span className="text-[#947ebc]">📅</span>
                  </div>
                  <div>
                    <p className="font-medium">New participant registered</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}