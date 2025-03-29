import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Autocomplete from '@mui/material/Autocomplete';
import {api} from '../../../config'
const AddUser = ({ fun,openSnackbar }) => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        Idrole: '',
    });
    const[error,setError]=useState('')
    const role = [
            { label: 'Administrator', id: 1 },
            { label: 'Simple User', id: 2 },
            { label: 'Manager', id: 3 },
    ]
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const Verifier=() => {
        if (formData.login === '') {
            setError('Please enter the login of the user.');
            return false;
        }
        if (formData.password === '') {
            setError('Please enter the password of the user.');
            return false;
        }
        if (formData.Idrole === '') {
            setError('Please enter the role of the user.');
            return false;
        }
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Verifier()) {
            return;
        }
        const data =JSON.stringify({
            login: formData.login,
            password: formData.password,
            role: {id: formData.Idrole},
        });
      try {
        const response = await fetch(`${api}api/user/addUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: data,
            });
            if (response.ok) {
                setFormData
                ({
                    login: '',
                    password: '',
                    Idrole: '',
                });
                setError('')
                openSnackbar('User added successfully');
                fun()
            } else {
               throw new Error('Failed to add user');
            }

      } catch (error) {
        setError('Failed to add user. Please try again.');
      }
    };

    return (
        <div className='AddTraining4787' >
            <div className='AddTraining'>
                <div className='header78787'>
                    <h2>Add User</h2>
                    <AiOutlineClose onClick={fun} className='uiiuhiu'/>
                </div>
                <div className='bady7898'>
                 <div className='row'>
                    <div className='col'>
                        <p>Please enter the login of the user.</p>
                          <TextField 
                              required 
                              className='input'  
                              label="Login" 
                              variant="outlined" 
                              name="login"
                              value={formData.login}
                              onChange={handleChange}
                          />
                   </div>
                   <div className='col'>
                      <p>Please enter the password of the user.</p>
                      <TextField 
                          required 
                          type='password' 
                          className='input' 
                          label="Password" 
                          variant="outlined" 
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                      />
                    </div>
                 </div>   
                <p>Please enter the role of the user.</p>
                <Autocomplete
                    disablePortal
                    options={role}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={role.find(r => r.id === formData.Idrole) || null}
                    onChange={(event, newValue) => {
                        setFormData({ ...formData, Idrole: newValue ? newValue.id : '' });
                    }}
                    renderInput={(params) => (
                        <TextField 
                            className='input' 
                            {...params} 
                            label="Role" 
                            required 
                        />
                    )}
                />     
               {error.length > 0 && <p className='error'>{error}</p>}
                <button onClick={handleSubmit} className='btn'>Add User</button>
                </div>
            </div>
        
        </div>
    );
};

export default AddUser;