import React, { useState } from 'react';

const AddTrainers = () => {
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
            <h2>Add Trainer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={trainer.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={trainer.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={trainer.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Expertise:</label>
                    <input
                        type="text"
                        name="expertise"
                        value={trainer.expertise}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Trainer</button>
            </form>
        </div>
    );
};

export default AddTrainers;