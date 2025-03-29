import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {api} from '../../../config';

export default function UsersList({data,openSnackbar,update}) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'login', headerName: 'Login', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      width: 200,
      renderCell: (params) => params.row.role?.name || '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <div>
          <button
          className='logo8455565654645 green'
            onClick={() => handleEdit(params.row)}
          >
           <CiEdit/>
          </button>
          <button className='logo8455565654645 red' 
          onClick={(event) => handlDelete(params.row.id,event)}
          ><MdDelete/></button>
        </div>
      ),
    }
  ];
  
const handlDelete = async (id,event) => {  
  event.preventDefault();
  event.stopPropagation();
    try {
      const response = await fetch(`${api}api/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        openSnackbar("User deleted successfully");
        update(prev => prev + 1);
      } else {
        throw new Error('Network response was not ok');
      }
      
    } catch (error) {
      openSnackbar("Error deleting user");
    }
  }
  return (
    <Box sx={{ height: 500, width: '100%'}}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
    slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}