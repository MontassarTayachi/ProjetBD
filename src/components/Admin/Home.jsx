import React from 'react';
import { Outlet} from 'react-router-dom'
import SidBar from './SidBar';
import { IoIosMenu } from "react-icons/io";
const Home = () => {
    const [toggel, setToggle] = React.useState(true);
    const handleToggle = () => {
        setToggle(!toggel);
    };

    return (
        <>
       <div className='Home984545'>
       {toggel&&<SidBar></SidBar>}
       <div className='main84949894'
       style={
        {
            width: toggel ? '84%' : '100%',
           
            
       }   }
       >
        <div className='header'>
            <IoIosMenu onClick={handleToggle} className='logo77ijqj'/>
            <h1>Dashboard</h1>
        </div>
       <Outlet></Outlet>
        </div>
      
       </div>
       </>
    );
};

export default Home;