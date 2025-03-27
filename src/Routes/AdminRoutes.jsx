import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Trainers from '../components/Admin/Trainers';
import Training from '../components/Admin/Training';
import Participant from '../components/Admin/Participant';
import Dashbord from '../components/Admin/Dashbord';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<Dashbord />}>
                <Route index element={<Trainers />} />
                <Route path="trainers" element={<Trainers />} />
                <Route path="training" element={<Training />} />
                <Route path="Participant" element={<Participant />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;