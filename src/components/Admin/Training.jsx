import React, { useState } from 'react';
import Nav from './utils/Nav';
import ItemCour from './utils/itemCour';
import AddTraining from './utils/AddTraining';

const Training = () => {
    const[open,setOpen]=useState(false);
    const [training, setTraining] = useState({
        title: '',
        description: '',
        date: '',
        duration: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTraining({ ...training, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Training added:', training);
        // Add your logic to save the training data here
        setTraining({ title: '', description: '', date: '', duration: '' });
    };

    return (
        <>
        <div className='training'>
          <Nav name="List of training courses" namefunction="Add training courses " fun={()=>{setOpen(true)}} />  
          <div className='main'>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
          <ItemCour/>
            </div>     
        </div>
        {open&&<AddTraining fun={()=>{setOpen(false)}}/>}
        </>
    );
};

export default Training;