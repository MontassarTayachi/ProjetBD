import React, { useState } from 'react';

const AddUser = ({ onAddUser }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onAddUser) {
            onAddUser(user);
        }
        setUser({ name: '', email: '', role: '' }); // Reset form
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Role:</label>
                <input
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add User</button>
        </form>
    );
};

export default AddUser;