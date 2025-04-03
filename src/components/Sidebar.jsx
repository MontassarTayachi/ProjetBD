import { NavLink } from 'react-router-dom';
import logo from '../assets/puzzle.png';

export default function Sidebar({ menuItems }) {
  return (
    <aside className="w-64 min-h-screen bg-gray-50 p-6 flex flex-col "> {/* Changed bg-gray-50 to bg-white */}
      {/* Logo Section */}
      <div className="mb-10 flex items-center justify-center ">
        <img src={logo} alt="Company Logo" className="w-24 h-24 object-contain"/>
        
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => `
                  flex items-center p-4 rounded-xl transition-all duration-300
                  ${isActive ? 
                    'bg-[#947ebc] text-white shadow-lg ' : 
                    ' text-[#7a6699]  hover:bg-[#f8f5ff]'
                  }
                  relative overflow-hidden group
                `}
              >
                {({ isActive }) => (
                  <>
                    {/* Removed gradient background for inactive items */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7a6699]/80 to-[#947ebc]/20 opacity-70"></span>
                    )}
                    
                    <span className="relative z-10 flex items-center">
                      <span className={`${isActive ? 'text-white' : 'text-[#7a6699]'} group-hover:text-[#7a6699]`}>
                        {item.icon}
                      </span>
                      <span className="ml-3 font-medium">{item.text}</span>
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="text-[#7a6699] text-sm">
          <p>© 2023 SavoirX</p>
          <p className="text-xs opacity-70">v2.4.1</p>
        </div>
      </div>
    </aside>
  );
}