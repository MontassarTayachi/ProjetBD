import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserGraduate } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa6";
import { MdModelTraining } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import image from "../../assets/img/logo.png";
import { MdDashboard } from "react-icons/md";
const SidBar = () => {

        return (
            <div className="SidBar">
                <img src={image} alt="logo" className="logo"/>
                <NavLink activeClassName='active' className='Link' to="trainers"><MdDashboard className='logo'/> Dashboard</NavLink>
                <NavLink activeClassName='active' className='Link'  to="training">< FaBookOpen className='logo'/> Training</NavLink>
                <NavLink activeClassName='active'  className='Link' to="Participant"><FaUserGraduate  className='logo'/> Participant</NavLink>
                <NavLink  activeClassName='active' className='Link' to="trainers"><MdModelTraining  className='logo'/> Trainers</NavLink>
                <NavLink  activeClassName='active' className='Link' to="settings"><IoIosSettings  className='logo'/> Settings</NavLink>
            </div>
        );
}

export default SidBar;