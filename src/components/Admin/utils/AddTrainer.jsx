import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Autocomplete from '@mui/material/Autocomplete';
import top100Films from './top100Films';
const AddTrainer = ({ fun }) => {
    const [participantData, setParticipantData] = useState({
        Nom: '',
        Prenom: '',
        Email: '',
        Tel: '',
        type: '',
        idemployeur: ''
    });
    const handleChange = (e) => {
        setParticipantData({ ...participantData, [e.target.name]: e.target.value });
    }

    
    return (
        <div className='AddTraining4787' >
            <div className='AddTraining'>
                <div className='header78787'>
                    <h2>Add Trainer</h2>
                    <AiOutlineClose onClick={fun} className='uiiuhiu'/>
                </div>
                <div className='bady7898'>
                 <div className='row'>
                    <div className='col'>
                        <p>Please enter the Trainers's name.</p>
                        <TextField name='Nom' required className='input' id="outlined-basic" label="First name" variant="outlined" />
                   </div>
                   <div className='col'>
                      <p>Please enter the Trainers's last name.</p>
                      <TextField name='Prenom' required className='input' id="outlined-basic" label="Last name" variant="outlined" />
                   </div>
                 </div> 
                 
                 <div className='row'>
                    <div className='col'>
                        <p>Please enter the Trainers's email.</p>
                        <TextField name='Email' type='email' required className='input' id="outlined-basic" label="Email" variant="outlined" />
                   </div>
                     <div className='col'>
                         <p>Please enter the Trainers's phone number.</p>
                         <TextField name='Tel' type='phone' required className='input' id="outlined-basic" label="Phone" variant="outlined" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p>Please enter the Trainers's employer.</p>
                            <Autocomplete
                                id="combo-box-demo"
                                options={top100Films}
                                renderInput={(params) => <TextField className='input' {...params} label="Participant's structure" variant="outlined" />}
                            />
                        </div>
                        <div className='col'>
                            <p>Please enter the Trainers's type.</p>
                            <Autocomplete
                                id="combo-box-demo"
                                options={top100Films}
                                renderInput={(params) => <TextField {...params} label="Participant's profile" className="input" variant="outlined" />}
                            />
                        </div>
                    </div>
                    <button  className='btn'>Add Trainer</button>
                </div>
            
                
                
                </div>
            </div>
        
       
    );
};

export default AddTrainer;