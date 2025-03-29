import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Trainers from '../components/Admin/Trainers';
import Training from '../components/Admin/Training';
import Participant from '../components/Admin/Participant';
import Home from '../components/Admin/Home';
import Settings from '../components/Admin/Settings';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<Home />}>
                <Route index element={<Trainers />} />
                <Route path="trainers" element={<Trainers />} />
                <Route path="training" element={<Training />} />
                <Route path="Participant" element={<Participant />} />
                <Route path="settings" element={<Settings/>} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;