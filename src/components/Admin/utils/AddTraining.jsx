import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Autocomplete from '@mui/material/Autocomplete';
import top100Films from './top100Films';
const AddTraining = ({ onSubmit,fun }) => {
    const [formData, setFormData] = useState({
        budget: '',
        domaine: '',
        duree: '',
        annee: '',
        titre: '',
        image: null,
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
        setFormData({
            budget: '',
            domaine: '',
            duree: '',
            annee: '',
            titre: '',
        });
    };

    return (
        <div className='AddTraining4787' >
            <div className='AddTraining'>
                <div className='header78787'>
                    <h2>Add Training</h2>
                    <AiOutlineClose onClick={fun} className='uiiuhiu'/>
                </div>
                <div className='bady7898'>
                 <div className='row'>
                    <div className='col'>
                        <p>Please enter the title of the training.</p>
                        <TextField required className='input' id="outlined-basic" label="Title" variant="outlined" />
                   </div>
                   <div className='col'>
                      <p>Please enter the training date.</p>
                    <TextField required type='date' className='input' id="outlined-basic"  variant="outlined" />
                    </div>
                 </div> 
                 <p>Please enter the training description.</p>
                 <TextField type='rows' className='input' id="outlined-basic" label="Description" variant="outlined" />
                 <div className='row'>
                    <div className='col'>  
               <p>Please enter the training duration.</p>
                <TextField type='time' className='input'id="outlined-basic"  variant="outlined" />
                </div>
                <div className='col'>
                <p>Please enter the training budget.</p>
                <TextField className='input' id="outlined-basic" label="Budget" variant="outlined" />
                </div>
                </div>
                <div className='row'>
                    <div className='col'>
                <p>Please enter the training domain.</p>
                <Autocomplete
                    disablePortal
                    options={top100Films}
                    renderInput={(params) => <TextField className='input' {...params} label="Domaine" />}
    />      </div>
                <div className='col'>
                <p>Please enter the training image.</p>
                <TextField type='file' className='input' id="outlined-basic"  variant="outlined" />
                </div>
                </div>
                <button onClick={handleSubmit} className='btn'>Add Training</button>
                </div>
            </div>
        
        </div>
    );
};

export default AddTraining;