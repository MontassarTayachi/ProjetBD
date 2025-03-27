import React from 'react';
import { Outlet, useParams } from 'react-router-dom'
import SidBar from './SidBar';
const Dashboard = () => {
    return (
        <>
       <div className='Dashboard'>
       <SidBar></SidBar>
       <div className='main84949894'>
        <div className='header'>
            <h1>Dashboard</h1>
        </div>
       <Outlet></Outlet>
        </div>
      
       </div>
       </>
    );
};

export default Dashboard;