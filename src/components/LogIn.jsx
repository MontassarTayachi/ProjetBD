import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {api} from '../config';
const LogIn = () => {
    const [formData, setFormData] = useState({ login: '', password: '' });
     const navigate = useNavigate();
     const [error, setError] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
       const req = await fetch(api+'api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
            const res = await req.json();
            if(req.ok === false){
                setError('Invalid login or password');
                return;
            }
            localStorage.setItem('token', res.token);
            navigate('/admin');
    
        }catch (error) {
            setError('Invalid login or password');
        }
    
    
    };
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      const handleMouseUpPassword = (event) => {
        event.preventDefault();
      };

    return (
        
       <div className='login '>
         <section className="container">
            <div className="login-container">
                <div className="circle circle-one" />
                <div className="form-container">
                <img
                    src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                    alt="illustration"
                    className="illustration"
                />
                <h1 className="opacity">LOGIN</h1>
                <form>
                    <input value={formData.login} name='login'  onChange={handleChange} type="text" placeholder="EMAIL" />
                    <input value={formData.password} name='password' onChange={handleChange} type="password" placeholder="PASSWORD" >
                    </input>
                    {error.length > 0 && <p className='error5555555'>{error}</p>}
         
                    <button onClick={handleSubmit} className="opacity">SUBMIT</button>
                </form>
               
                </div>
                <div className="circle circle-two" />
            </div>
            <div className="theme-btn-container" />
        </section>
       </div>
    );
};

export default LogIn;