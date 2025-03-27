import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegUser,FaUserGraduate } from "react-icons/fa6";
import { MdModelTraining } from "react-icons/md";
import image from "../../assets/img/logo.png";
const SidBar = () => {

        return (
            <div className="SidBar">
                <img src={image} alt="logo" className="logo"/>
                <NavLink activeClassName='active'  className='Link' to="Participant"><FaUserGraduate  className='logo'/> Participant</NavLink>
                <NavLink activeClassName='active' className='Link'  to="training">< FaRegUser className='logo'/> Training</NavLink>
                <NavLink  activeClassName='active' className='Link' to="trainers"><MdModelTraining  className='logo'/> Trainers</NavLink>
            </div>
        );
}

export default SidBar;