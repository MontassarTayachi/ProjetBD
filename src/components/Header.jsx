import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gray-50  p-4 flex items-center justify-between py-4">
      <div className="relative w-64">
       
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#d8d4af] flex items-center justify-center text-white font-medium">
            JD
          </div>
          <span className="text-sm font-medium">John Doe</span>
        </div>
      </div>
    </header>
  );
}