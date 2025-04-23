import { NavLink } from 'react-router-dom';
import logo from '../assets/puzzle.png';
import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';


export default function Sidebar({ menuItems }) {
  const { logout } = useAuth();
  const navigate = useNavigate(); // ✅ Also top level

  const handleLogout = async () => {
    await logout(); // Even if it's not async, using `await` ensures timing
    navigate('/login');
  };
  

  return (
   /* <aside className="w-64 min-h-screen bg-gray-50 p-6 flex flex-col "> 
      <div className="mb-10 flex items-center justify-center ">
        <img src={logo} alt="Company Logo" className="w-24 h-24 object-contain"/>
      </div>
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
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="text-[#7a6699] text-sm">
          <p>© 2025 SavoirX</p>
          <p className="text-xs opacity-70">v2.4.1</p>
        </div>
      </div>
    </aside> */
    <div class="fixed flex flex-col  left-0 w-14  md:w-56 bg-gray-50 h-full text-white transition-all duration-300 border-none z-10 sidebar poppins-medium">
    <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
            <li class=" hidden md:block">
                <div id="logo" class="my-4 px-6 py-10">
                    <img src={logo} alt="Company Logo" className="w-10 h-10 object-contain"/>
                    <p class="text-slate-500 text-sm">Manage your actions and activities</p>
                </div>
            </li>
            {menuItems.map((item, index) => (
  <li key={index}>
    <NavLink
      to={item.path}
      className={({ isActive }) => `
      text-[#1d2736] relative flex flex-row items-center h-11 focus:outline-none 
      md:p-4 pr-6 border-l-4 
      ${isActive ? 'border-[#947ebc] text-[#947ebc]' : 'border-transparent hover:text-[#947ebc] hover:border-[#947ebc]'}
    `}
  >
      <span className="inline-flex justify-center items-center ml-4">
        {item.icon}
      </span>
      <span className="ml-2 text-sm tracking-wide truncate">
        {item.text}
      </span>
    </NavLink>
  </li>
))}
 <li class="px-5 hidden md:block">
                <div class="flex flex-row items-center mt-5 h-8">
                    <div class="text-sm font-light tracking-wide text-gray-400 uppercase">Settings</div>
                </div>
            </li>
            <li>
                <a 
                class="text-[#1d2736] relative flex flex-row items-center h-11 focus:outline-none hover:text-[#947ebc]    border-l-4 border-transparent hover:border-[#947ebc]  pr-6 md:p-4 "
                routerLink="/dashboard/profile" routerLinkActive="text-[#d97a07] border-[#d97a07]">
                <span class="inline-flex justify-center items-center ml-4 ">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </span>
                    <span class="ml-2 text-sm tracking-wide truncate">Profile</span>
                </a>
            </li>
            <li>
            <button
    onClick={handleLogout}
    className="w-full text-left text-[#1d2736] relative flex flex-row items-center h-11 focus:outline-none hover:text-[#947ebc] border-l-4 border-transparent hover:border-[#947ebc] pr-6 md:p-4"
  >
    <span className="inline-flex justify-center items-center ml-4">
      <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" clipRule="evenodd" />
      </svg>
    </span>
    <span className="ml-2 text-sm tracking-wide truncate">Log out</span>
  </button>
            </li>
        
        </ul>
        <p class="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright 2021</p>
    </div>
</div>
  );
}