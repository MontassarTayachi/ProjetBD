import { Alert, Box, Snackbar } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from 'react-icons/md';
import AddCardItems from './AddCardItems';
import {api} from '../../../config'
 const CardItems = ({them,data,libelle,ap,update}) => {
  const [open, setOpen] = React.useState(false);
  const[opensnackbar,setOpensnackbar]=React.useState(false)
  const[snackbarmessage,setSnackbarmessage]=React.useState('')
  const handchange = () => {
    setOpen(!open);
  } 
  const openSnackbar = (message) => {
    setSnackbarmessage(message);
    setOpensnackbar(true);
  };
  const handelDelete = async (id,event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const req=`${api}api/${ap}/${id}`;
      const response = await fetch(req, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      openSnackbar(`${them} deleted successfully`);
      update(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
 
    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: libelle, headerName: them, width: 200 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <div>
            <button
            className='logo8455565654645 green'
              style={{ marginRight: 8 }}

            >
             <CiEdit/>
            </button>
            <button
             onClick={(event) => handelDelete(params.row.id, event)}
            className='logo8455565654645 red' ><MdDelete/></button>
          </div>
        ),
      }
    ];
   
    return (
      <>
        <div className='CardItems878754'>
          <div className='header98498'>
          <h1>List of {them}</h1>
         <div className='btn' onClick={handchange}> <IoIosAdd className='logo'  /></div>
        </div>
       {data.length>0&&
        <Box sx={{ height: 400}}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>}
    
        </div>
        {open && <AddCardItems update={update} openSnackbar={openSnackbar} them={them} libelle={libelle} fun={handchange} ap={ap}/>}
         <Snackbar open={opensnackbar} autoHideDuration={6000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}  >
            <Alert onClose={() => setOpensnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
              {snackbarmessage}
            </Alert>
        </Snackbar>

        </>
    );
}
export default CardItems;