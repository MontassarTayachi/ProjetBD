import { ArrowRight } from 'lucide-react'; // For the arrow icon
import image from '../assets/home.png'
import logo from '../assets/logo.png'
import {useAuth} from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
export default function Home() {

  const { user, isAuthenticated,loading } = useAuth();
  const [distnation, setDistnation] = useState("/login");
   console.log(user);
   console.log(isAuthenticated);
  useEffect(() => {
    if (loading) {
      return; // Ne rien faire pendant le chargement
    }
    if (isAuthenticated) {
      const role = user.role;
      console.log(role);
      if (role === "ROLE_ADMIN") {
        setDistnation("/admin/dash");
      } else if (role === "ROLE_RESPONSABLE") {
        setDistnation("/manager");
      } else if (role === "ROLE_USER") {
        setDistnation("/user/formation");
      }
    }
  }
  , [isAuthenticated, user,loading]);
    return (
      <> 
      <div class="flex items-center space-x-4 rtl:space-x-reverse bg-gray-50 pl-24 pt-12">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse"  >
          <img src={logo} class="h-12" alt="logo"/>
        </a>
      </div>
      <div className="h-screen bg-gray-50 overflow-hidden">
              {/* Header with logo */}
                          
        
              {/* Main content */}
              <main className="container mx-auto  flex flex-col md:flex-row items-center justify-between  pt-0 mt-0">
                {/* Left side - Image in colored circle */}
                <div className="relative mb-12 md:mb-0 md:w-1/2 flex justify-center">
                  <div className="relative w-96 h-96 sm:w-[650px] sm:h-[650px]">
                    {/* Colored circle */}
                    
                    {/* Image inside circle */}
                    <div className="absolute inset-4 flex items-center justify-center  ">
                      <img 
                        src={image} // Replace with your image path
                        alt="Featured"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
        
                {/* Right side - Slogan and arrow */}
                <div className="md:w-1/2 space-y-8 text-center md:text-left">
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
                    Transform Your Skills <br />
                    <span className="text-[#947ebc]">With Our Platform</span>
                  </h1>
                  
                  <p className="text-xl text-gray-600">
                    Join thousands of professionals enhancing their careers through our innovative training solutions.
                  </p>
        
                  {/* Arrow button to login */}
                  <div className="flex justify-center md:justify-start">
                    <a 
                      href={distnation} 
                      className="flex items-center space-x-2 text-[#c1b5db] hover:text-indigo-800 transition-colors"
                    >
                      <span className="text-lg font-medium">Get Started</span>
                      <ArrowRight className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </main>
            </div>
      </>
            
          );
  }