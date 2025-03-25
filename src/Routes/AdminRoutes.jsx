import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddTrainers from '../components/Admin/AddTrainers';
import AddTraining from '../components/Admin/AddTraining';
import AddUser from '../components/Admin/AddUser';
import Dashbord from '../components/Admin/Dashbord';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<Dashbord />}>
                <Route index element={<AddTrainers />} />
                <Route path="add-trainers" element={<AddTrainers />} />
                <Route path="add-training" element={<AddTraining />} />
                <Route path="add-users" element={<AddUser />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;