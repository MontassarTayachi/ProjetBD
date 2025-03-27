import React, { useState } from 'react';
import Nav from './utils/Nav';
import AddParticipant from './utils/AddParticipant';
import ParticipantList from './utils/ParticipantList';

const Participant = ({ onAddUser }) => {
    const[open,setOpen]=useState(false);
   

    return (
        <>
       <div>
        <Nav name="List of Participant" fun={()=>{setOpen(true)}} namefunction="Add Participant " />
        <div className='qq989498'><ParticipantList/></div>
       </div>
       {open&&<AddParticipant fun={()=>{setOpen(false)}}/>}
       </>
    );
};

export default Participant;