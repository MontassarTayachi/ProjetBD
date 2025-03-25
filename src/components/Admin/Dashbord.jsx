import React from 'react';
import { Outlet, useParams } from 'react-router-dom'
import SidBar from './SidBar';
const Dashboard = () => {
    return (
        <>
       <div className='Dashboard'>
       <SidBar></SidBar>
       <Outlet></Outlet>
       </div>
       </>
    );
};

export default Dashboard;