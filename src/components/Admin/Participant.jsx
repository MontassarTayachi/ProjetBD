import React, { useState } from 'react';
import Nav from './utils/Nav';
import AddParticipant from './utils/AddParticipant';

const Participant = ({ onAddUser }) => {
    const[open,setOpen]=useState(false);
   

    return (
        <>
       <div>
        <Nav name="List of Participant" fun={()=>{setOpen(true)}} namefunction="Add Participant " />

       </div>
       {open&&<AddParticipant fun={()=>{setOpen(false)}}/>}
       </>
    );
};

export default Participant;