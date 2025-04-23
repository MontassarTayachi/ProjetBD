import { ArrowRight } from 'lucide-react';
import image from '../assets/home.png';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const { user, isAuthenticated, loading } = useAuth();
  const [distnation, setDistnation] = useState("/login");

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) {
      const role = user.role;
      if (role === "ROLE_ADMIN") setDistnation("/admin/dash");
      else if (role === "ROLE_RESPONSABLE") setDistnation("/manager");
      else if (role === "ROLE_USER") setDistnation("/user/formation");
    }
  }, [isAuthenticated, user, loading]);

  return (
    <>
      <div className="flex items-center space-x-4 rtl:space-x-reverse bg-gray-50 pl-24 pt-12">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12" alt="logo" />
        </a>
      </div>

      <div className="h-screen bg-gray-50 overflow-hidden">
        <main className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left side image */}
          <motion.div
            className="relative mb-12 md:mb-0 md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-96 h-96 sm:w-[650px] sm:h-[650px]">
              <div className="absolute inset-4 flex items-center justify-center">
                <motion.img
                  src={image}
                  alt="Featured"
                  className="w-full h-full object-cover"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right side slogan */}
          <motion.div
            className="md:w-1/2 space-y-8 text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
              Transform Your Skills <br />
              <span className="text-[#947ebc]">With Our Platform</span>
            </h1>

            <p className="text-xl text-gray-600">
              Join thousands of professionals enhancing their careers through our innovative training solutions.
            </p>

            <div className="flex justify-center md:justify-start">
              <motion.a
                href={distnation}
                className="flex items-center space-x-2 text-[#c1b5db] hover:text-indigo-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg font-medium">Get Started</span>
                <ArrowRight className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
