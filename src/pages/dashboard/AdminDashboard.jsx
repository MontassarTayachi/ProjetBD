import { Users, Settings, FileText, Shield, User } from 'lucide-react';
import DataTable from '../../components/DataTable';
export default function AdminDashboard() {
  const recentUsers = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", joined: "2023-10-15" },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", role: "Manager", joined: "2023-10-10" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Trainer", joined: "2023-10-05" }
  ];

  return (
    
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-[#c1b5db]" />
                Recent User Activity
              </h2>
              <DataTable 
                data={recentUsers}
                columns={[
                  { header: "Name", accessor: "name" },
                  { header: "Email", accessor: "email" },
                  { header: "Role", accessor: "role" },
                  { header: "Joined", accessor: "joined" }
                ]}
              />
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#d8d4af]" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-[#947ebc] hover:bg-[#7a6699] text-white py-2 px-4 rounded-lg transition flex items-center justify-center">
                  Add New User
                </button>
                <button className="w-full border border-[#947ebc] text-[#947ebc] hover:bg-[#947ebc]/10 py-2 px-4 rounded-lg transition flex items-center justify-center">
                  Generate Reports
                </button>
                <button className="w-full border border-[#c1b5db] text-[#c1b5db] hover:bg-[#c1b5db]/10 py-2 px-4 rounded-lg transition flex items-center justify-center">
                  System Audit
                </button>
              </div>
            </div>
          </div>
       
  );
}