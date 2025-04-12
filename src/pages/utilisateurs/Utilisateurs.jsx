import React, { useState, useEffect } from 'react';
import { userService } from './userService';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Edit2, Trash2 } from 'lucide-react';
const Utilisateurs = () => {
const [users, setUsers] = useState([]);
const [roles, setRoles] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [showModal, setShowModal] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
const [searchTerm, setSearchTerm] = useState('');

// Form state
const [formData, setFormData] = useState({
  login: '',
  password: '',
  role: ''
});

// Fetch users and roles
useEffect(() => {
  const fetchData = async () => {
    try {
      const [usersData, rolesData] = await Promise.all([
        userService.getAllUsers(),
        userService.getAllRoles()
      ]);
      setUsers(usersData);
      setRoles(rolesData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  fetchData();
}, [showModal]);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (currentUser) {
      // Prepare the data for update
      const updatePayload = {
        login: formData.login,
        roleId: formData.role
      };

      // Only include password if user entered a new one
      if (formData.password.trim() !== '') {
        updatePayload.password = formData.password;
      }

      const updatedUser = await userService.updateUser(currentUser.id, updatePayload);

      setUsers(users.map(u =>
        u.id === currentUser.id ? updatedUser : u
      ));
    } else {
      // Create new user
      const newUser = await userService.createUser({
        login: formData.login,
        password: formData.password,
        role: {
          id: parseInt(formData.role)
        }
      });
    }

    setShowModal(false);
    resetForm();
  } catch (err) {
    setError(err.message);
  }
};


const handleEdit = (user) => {
  setCurrentUser(user);
  setFormData({
    login: user.login,
    password: '', // Don't pre-fill password for security
    role: user.role.id
  });
  setShowModal(true);
};

const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    try {
      await userService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }
};

const resetForm = () => {
  setFormData({
    login: '',
    password: '',
    role: ''
  });
  setCurrentUser(null);
};



if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;
const columns = [
  { field: 'id', headerName: 'ID', width: 90 , headerClassName: 'super-app-theme--header',},
  { field: 'login', headerName: 'Login', width: 200, headerClassName: 'super-app-theme--header', },
  {
    field: 'role',
    headerName: 'Role',
    width: 200,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => params.row.role?.name || '',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <div className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(params.row)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(params.row.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
         </div>
    ),
  },

];
  
return (
  <div className="flex-1 p-8 bg-white rounded-xl shadow-md overflow-hidden mx-8 ">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-xl font-bold text-[#7a6699]">
        Users Management
      </h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#947ebc] hover:bg-[#7a6699] text-white py-2 px-4 rounded-lg flex items-center transition-colors"
      >
        Add User
      </button>
    </div>

    {/* Search Bar */}
    

    {/* Users Table */}
    <div className="">
      <Box sx={{ height: 500, width: '100%'}}>
      <DataGrid
        rows={users}
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
    </div>

    {/* Add/Edit User Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#7a6699] mb-4">
              {currentUser ? 'Edit User' : 'Add New User'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
                  Login
                </label>
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={formData.login}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#947ebc] focus:border-[#947ebc] outline-none transition-all"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {currentUser ? 'New Password (leave blank to keep current)' : 'Password'}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#947ebc] focus:border-[#947ebc] outline-none transition-all"
                  required={!currentUser}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#947ebc] focus:border-[#947ebc] outline-none transition-all"
                  required
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#947ebc] hover:bg-[#7a6699] text-white rounded-lg transition-colors"
                >
                  {currentUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Utilisateurs; 