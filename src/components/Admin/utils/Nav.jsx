import React from 'react';
import './utils.css';
import { IoAddOutline } from "react-icons/io5";

const Nav = ({name,namefunction,fun}) => {
    
    return (
       <>
       <div className='nav7984'>
        <h1>{name}</h1>
        <button onClick={fun}><IoAddOutline color='white' className='logo' />{namefunction}</button>
       </div>
       
       </>
    );
};

export default Nav;