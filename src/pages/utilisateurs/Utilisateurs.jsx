import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from './userService';

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
}, []);

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
      setUsers([...users, newUser]);
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

const filteredUsers = users.filter(user =>
  user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.role.name.toLowerCase().includes(searchTerm.toLowerCase())
);

if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#7a6699] uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#7a6699] uppercase tracking-wider">Login</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#7a6699] uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#7a6699] uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.login}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role.name === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role.name === 'Manager' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {user.role.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-[#947ebc] hover:text-[#7a6699] mr-4"
                  > edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  > delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
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