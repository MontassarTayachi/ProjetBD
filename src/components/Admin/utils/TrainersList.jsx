import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 120,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 120,
    editable: true,
  },
  {field: 'email', headerName: 'Email', width: 200},
  {field: 'phone', headerName: 'Phone', width: 150},
  {field: 'Type', headerName: 'Type', width: 150},
  {field: 'nomemployeur', headerName: 'nomemployeur', width: 150},
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <div>
        <button
        className='logo8455565654645 green'
          onClick={() => handleEdit(params.row)}
          style={{ marginRight: 8 }}
        >
         <CiEdit/>
        </button>
        <button className='logo8455565654645 red' onClick={() => handleDelete(params.row)}><MdDelete/></button>
      </div>
    ),
  }
];

const rows = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', Type: 'Internal', nomemployeur: 'Company A' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', Type: 'External', nomemployeur: 'Company B' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', phone: '456-789-1234', Type: 'Internal', nomemployeur: 'Company C' },
    { id: 4, firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', phone: '321-654-9870', Type: 'External', nomemployeur: 'Company D' },
    { id: 5, firstName: 'Charlie', lastName: 'Davis', email: 'charlie.davis@example.com', phone: '789-123-4567', Type: 'Internal', nomemployeur: 'Company E' },
    { id: 6, firstName: 'Emily', lastName: 'Clark', email: 'emily.clark@example.com', phone: '654-321-9870', Type: 'External', nomemployeur: 'Company F' },
    { id: 7, firstName: 'Frank', lastName: 'Miller', email: 'frank.miller@example.com', phone: '123-789-4560', Type: 'Internal', nomemployeur: 'Company G' },
    { id: 8, firstName: 'Grace', lastName: 'Wilson', email: 'grace.wilson@example.com', phone: '987-123-6540', Type: 'External', nomemployeur: 'Company H' },
    { id: 9, firstName: 'Henry', lastName: 'Moore', email: 'henry.moore@example.com', phone: '456-123-7890', Type: 'Internal', nomemployeur: 'Company I' },
    { id: 10, firstName: 'Isabella', lastName: 'Taylor', email: 'isabella.taylor@example.com', phone: '789-456-1230', Type: 'External', nomemployeur: 'Company J' },
];

export default function TrainersList() {
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