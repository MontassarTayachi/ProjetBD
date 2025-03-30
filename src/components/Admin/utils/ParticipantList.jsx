import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function ParticipantList() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'Structure',
      headerName: 'Structure',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'Profile',
      headerName: 'Profile',
      sortable: false,
      width: 160,
    },
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'phone', headerName: 'Phone', width: 150},
  
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button
          className='logo8455565654645 green'
            onClick={() => handleEdit(params.row)}
          >
           <MdOutlineEdit/>
          </button>
          <button className='logo8455565654645 red' onClick={() => handleDelete(params.row)}><MdDelete/></button>
        </div>
      ),
    }
  ];
  
  const rows = [
  { id: 1, firstName: 'John', lastName: 'Doe', Structure: 'Company A', Profile: 'Manager', email: 'john.doe@example.com', phone: '123-456-7890' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', Structure: 'Company B', Profile: 'Developer', email: 'jane.smith@example.com', phone: '987-654-3210' },
  { id: 3, firstName: 'Alice', lastName: 'Johnson', Structure: 'Company C', Profile: 'Designer', email: 'alice.johnson@example.com', phone: '456-789-1234' },
  { id: 4, firstName: 'Bob', lastName: 'Brown', Structure: 'Company D', Profile: 'Analyst', email: 'bob.brown@example.com', phone: '321-654-9870' },
  { id: 5, firstName: 'Charlie', lastName: 'Davis', Structure: 'Company E', Profile: 'Consultant', email: 'charlie.davis@example.com', phone: '789-123-4567' },
  { id: 6, firstName: 'Emily', lastName: 'Wilson', Structure: 'Company F', Profile: 'Engineer', email: 'emily.wilson@example.com', phone: '654-321-7890' },
  { id: 7, firstName: 'Frank', lastName: 'Taylor', Structure: 'Company G', Profile: 'Technician', email: 'frank.taylor@example.com', phone: '123-789-4560' },
  { id: 8, firstName: 'Grace', lastName: 'Lee', Structure: 'Company H', Profile: 'Administrator', email: 'grace.lee@example.com', phone: '987-321-6540' },
  { id: 9, firstName: 'Henry', lastName: 'Walker', Structure: 'Company I', Profile: 'Specialist', email: 'henry.walker@example.com', phone: '456-123-7890' },
  { id: 10, firstName: 'Ivy', lastName: 'Martinez', Structure: 'Company J', Profile: 'Coordinator', email: 'ivy.martinez@example.com', phone: '321-987-6540' }
  ];
  
  return (
    <Box sx={{ height: 500, width: '100%'}}>
      <DataGrid
        rows={rows}
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