import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
const DeleteItems = ({ fun, onClose,data }) => {
   

    return (
        <div className='delete-items-backdrop' onClick={onClose}>
        <div className='delete-items9898498'>
            <div className='delete-items-header'>
                <h2>Are you sure you want to delete this item?</h2>
                <IoCloseSharp onClick={onClose} className='close'/>
            </div>
            <div className='delete-items-body'> 
                <button className='delete' onClick={(event) => fun(data.id,event)}>Delete</button>
                <button className='cancel' onClick={onClose}>Cancel</button>
            </div>
            {data.error&& <p>{data.error}</p>}
        </div>
        </div>
    );
};

export default DeleteItems;