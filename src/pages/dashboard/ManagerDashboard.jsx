import { ClipboardList, Users, BarChart2, Calendar } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import StatisticsCard from '../../components/StatisticsCard';
import DataTable from '../../components/DataTable';

export default function ManagerDashboard() {
  const managerLinks = [
    { icon: <ClipboardList className="w-5 h-5" />, text: "Training Plans", path: "/manager/plans" },
    { icon: <Calendar className="w-5 h-5" />, text: "Schedules", path: "/manager/schedules" },
    { icon: <BarChart2 className="w-5 h-5" />, text: "Performance", path: "/manager/performance" }
  ];

  const stats = [
    { title: "Ongoing Formations", value: "8", icon: "📊", color: "bg-[#947ebc]" },
    { title: "Participants This Month", value: "47", icon: "👥", color: "bg-[#c1b5db]" },
    { title: "Completion Rate", value: "92%", icon: "✅", color: "bg-[#d8d4af]" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar additionalLinks={managerLinks} />
      
      <div className="flex-1 overflow-hidden">
        <Header />
        
        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <ClipboardList className="w-6 h-6 mr-2 text-[#947ebc]" />
            Manager Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatisticsCard 
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-[#c1b5db]" />
                Team Progress
              </h2>
              <div className="h-64 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                Team Progress Chart Placeholder
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#d8d4af]" />
                Upcoming Sessions
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map(item => (
                  <div key={item} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition border-b border-gray-100 last:border-0">
                    <div className="w-10 h-10 rounded-full bg-[#947ebc]/10 flex items-center justify-center mr-4">
                      <span className="text-[#947ebc]">📅</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Advanced React Training</p>
                      <p className="text-sm text-gray-500">Oct {15 + item}, 2023 • 10:00 AM</p>
                    </div>
                    <button className="text-[#947ebc] hover:text-[#7a6699]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}