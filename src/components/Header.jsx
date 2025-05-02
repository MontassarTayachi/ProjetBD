import { Bell } from 'lucide-react'; 
import { useAuth } from '../contexts/AuthContext'; 
import React from 'react';
import {  useLocation } from "react-router-dom";


export default function Header({ title = "Dashboard", subtitle = "Overview", countLabel = "", onAddClick }) {
  const { user, loading } = useAuth();
  const [username, setUsername] = React.useState(null);
  const location = useLocation();
  const path = location.pathname;
  const hideHeader = path.startsWith('/formateur/participations/');

  React.useEffect(() => {
    if (!loading) {
      setUsername(user?.sub);
    }
  }, [loading, user]);

  return (
  <header className="bg-gray-50 py-4 px-0 sm:px-2">
  {/* Top Row: Bell Icon and User Circle on their own line (always top right) */}
  <div className="flex justify-end space-x-4 mb-4">
    <button className="p-2 rounded-full hover:bg-gray-100 relative">
      <Bell className="w-5 h-5 text-gray-600" />
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>

    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-[#d8d4af] flex items-center justify-center text-white font-medium">
        {username ? username.charAt(0).toUpperCase() : ''}
      </div>
    </div>
  </div>
  {!hideHeader && (
  <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
    <div className="flex flex-col space-y-1">
          {subtitle && (
            <div className="text-xl sm:text-2xl montserrat-semi text-gray-800">
              {subtitle}
            </div>
          )}
          <div className="text-2xl sm:text-4xl montserrat-extra text-[#1d2736]">
            {title}
          </div>
          {countLabel && (
            <div className="montserrat text-gray-800 text-sm sm:text-base">
              {countLabel}
            </div>
          )}
        </div>

    {onAddClick && (
    <div className="flex justify-end">
      <button
        onClick={onAddClick}
        className="bg-[#947ebc] hover:bg-[#7a6699] text-white py-2 px-4 rounded-lg flex items-center transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Ajouter
      </button>
    </div>
            )}

  </div> )}
</header>

  );
}
