import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import {api} from '../../../config'
const AddCardItems = ({ fun,them,libelle,ap,openSnackbar,update  }) => {
    const [valus,setValus] = useState("")
    const [error, setError] = useState('');
    const handleChange = (event) => {
        setValus(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (valus === "") {
            setError('Please fill in the field.');
            return;
        }
        try {
            const req=`${api}/api/${ap}`;
            console.log(req);
            const response = await fetch(`${api}api/${ap}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [libelle]: valus }),
        
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            openSnackbar(`${them} added successfully`);
            setValus('');
            update(prev => prev + 1);
            fun();


        } 
        catch (error) {
            setError('Failed to add the item. Please try again later.');

        }
       
    };
    return (
        <div className='AddTraining4787' >
            <div className='AddTraining'>
                <div className='header78787'>
                    <h2>Add {them}</h2>
                    <AiOutlineClose onClick={fun} className='uiiuhiu'/>
                </div>
                <div className='bady7898'>
                    <div className='col'>
                        <p>Please enter the {them}.</p>
                        <TextField value={valus} onChange={handleChange} required className='input' id="outlined-basic" label={them} variant="outlined" />
                   </div>
                    {error && <p className='error'>{error}</p>}
                   <button onClick={handleSubmit}  className='btn'>Add {them}</button>
                 </div> 
                 
              
                </div>
            </div>
        
       
    );
};

export default AddCardItems;