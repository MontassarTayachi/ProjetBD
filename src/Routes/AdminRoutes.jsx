import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Trainers from '../components/Admin/Trainers';
import Training from '../components/Admin/Training';
import Participant from '../components/Admin/Participant';
import Home from '../components/Admin/Home';
import Settings from '../components/Admin/Settings';
import ThemeCustomization from '../components/Admin/dashboard/themes';
import Loadable from '../components/Admin/dashboard/Loadable';
import { lazy } from 'react';
const DashboardDefault = Loadable(lazy(() => import('../components/Admin/dashboard')));

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<Home />}>
                <Route index element={<Trainers />} />
                <Route path="Dashboard" element={<ThemeCustomization><DashboardDefault /></ThemeCustomization>} />
                <Route path="trainers" element={<Trainers />} />
                <Route path="training" element={<Training />} />
                <Route path="Participant" element={<Participant />} />
                <Route path="settings" element={<Settings/>} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;