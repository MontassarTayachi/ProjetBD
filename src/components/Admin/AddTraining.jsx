import React, { useState } from 'react';

const AddTraining = () => {
    const [training, setTraining] = useState({
        title: '',
        description: '',
        date: '',
        duration: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTraining({ ...training, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Training added:', training);
        // Add your logic to save the training data here
        setTraining({ title: '', description: '', date: '', duration: '' });
    };

    return (
        <div>
            <h2>Add Training</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={training.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={training.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={training.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Duration (hours):</label>
                    <input
                        type="number"
                        name="duration"
                        value={training.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Training</button>
            </form>
        </div>
    );
};

export default AddTraining;