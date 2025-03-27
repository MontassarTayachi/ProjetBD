import React, { useState } from 'react';

const LogIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       const req = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    const res = await req.json();
    
    
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
                    <input value={formData.email} name='email'  onChange={handleChange} type="text" placeholder="EMAIL" />
                    <input value={formData.password} name='password' onChange={handleChange} type="password" placeholder="PASSWORD" >
                    </input>
                    <button onClick={handleSubmit} className="opacity">SUBMIT</button>
                </form>
                <div className="register-forget opacity">
                    <a href="">FORGOT PASSWORD</a>
                </div>
                </div>
                <div className="circle circle-two" />
            </div>
            <div className="theme-btn-container" />
        </section>
       </div>
    );
};

export default LogIn;