import React, { useState } from 'react';
import Nav from './utils/Nav';

const Trainers = () => {
    const [trainer, setTrainer] = useState({
        name: '',
        email: '',
        phone: '',
        expertise: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainer((prevTrainer) => ({
            ...prevTrainer,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Trainer added:', trainer);
        // Add logic to save trainer data to the backend or state management
        setTrainer({
            name: '',
            email: '',
            phone: '',
            expertise: '',
        });
    };

    return (
        <div>
           <Nav name="List of trainers" namefunction="Add trainers " />
        </div>
    );
};

export default Trainers;