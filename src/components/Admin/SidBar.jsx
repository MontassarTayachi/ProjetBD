import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SidBar = () => {

        return (
            <div className="SidBar">
                <h2>SidBar</h2>
                <Link className='Link' to="add-training">add training</Link>
                <Link  className='Link' to="add-users">add-users</Link>
                <Link className='Link' to="add-trainers">add-trainers</Link>
            </div>
        );
}

export default SidBar;