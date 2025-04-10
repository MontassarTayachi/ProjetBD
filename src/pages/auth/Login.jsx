import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import image from '../../assets/calender.png' ;
import logo from '../../assets/logo.png' ;
import Card from '../../components/Card';

const Login = () => {
    const [formData, setFormData] = useState({ login: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            console.log(response)
            console.log(response.role)
            if (response.data.role === 'ROLE_ADMIN') {
                navigate('/admin/dash');
            } else if (response.data.role === 'ROLE_RESPONSABLE') {
                navigate('/manager');
            } else if (response.data.role === 'ROLE_USER') {
              navigate('/user/formation');
            }else {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            setError(error.message || 'Something went wrong');
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (


//-----------
<>
<div class="flex items-center space-x-4 rtl:space-x-reverse bg-gray-50 pl-24 pt-12 ">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse" >
          <img src={logo} class="h-8" alt="logo"/>
        </a>
      </div>
<div className="h-screen bg-gray-50">
{/* Header with logo - matches homepage */}


{/* Main content */}
<main className="container mx-auto  flex flex-col md:flex-row items-center ">
  {/* Left side - Image in colored circle (same as homepage) */}
  <div className="relative mb-12 md:mb-0 md:w-1/2 flex justify-center">
    <div className="relative w-64 h-64 sm:w-[650px] sm:h-[650px]">
        <img 
          src={image}
          alt="Login"
          className="w-full h-full object-cover"
        />
    </div>
  </div>

  {/* Right side - Login form */}
  <div className="md:w-1/2 max-w-md ">
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h1>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="space-y-2">
          <label className="text-gray-600 font-medium flex items-center">
            Email Address
          </label>
          <input
            value={formData.login}
            name='login'
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="your@email.com"
            required
          />
        </div>

        {/* Password input */}
        <div className="space-y-2">
          <label className="text-gray-600 font-medium flex items-center">
            Password
          </label>
          <input
           value={formData.password}
           name='password'
           onChange={handleChange}
          
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Remember me & forgot password */}
        

        {/* Login button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
        >
          Sign In
        </button>
      </form>

      {/* Sign up link */}
      <div className="mt-6 text-center">
        
      </div>
    </div>
  </div>
</main>
</div>
<Card />
</>
    );
};

export default Login;
