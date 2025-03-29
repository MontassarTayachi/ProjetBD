import React, { useState } from 'react';
import Nav from './utils/Nav';
import TrainersList from './utils/TrainersList';
import AddTrainer from './utils/AddTrainer';

const Trainers = () => {
    const [open, setOpen] = useState(false);
    
    return (
        <>
        <div>
           <Nav name="List of trainers" fun={()=>{setOpen(true)}} namefunction="Add trainers " />
           <div className='qq989498'><TrainersList/></div>
        </div>
        {open&&<AddTrainer fun={()=>{setOpen(false)}}/>}
        </>
    );
};

export default Trainers;