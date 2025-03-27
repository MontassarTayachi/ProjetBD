import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegUser,FaUserGraduate } from "react-icons/fa6";
import { MdModelTraining } from "react-icons/md";
const SidBar = () => {

        return (
            <div className="SidBar">
                <h2>SidBar</h2>
                <NavLink activeClassName='active'  className='Link' to="Participant"><FaUserGraduate  className='logo'/> Participant</NavLink>
                <NavLink activeClassName='active' className='Link'  to="training">< FaRegUser className='logo'/> Training</NavLink>
                <NavLink  activeClassName='active' className='Link' to="trainers"><MdModelTraining  className='logo'/> Trainers</NavLink>
            </div>
        );
}

export default SidBar;