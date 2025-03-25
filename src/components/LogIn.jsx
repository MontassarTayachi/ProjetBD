import React, { useState } from 'react';

const LogIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Data:', formData);
        // Add your login logic here
    };

    return (
        
        <div className="container">
            <h1>
                login
            </h1>
        </div>
    );
};

export default LogIn;