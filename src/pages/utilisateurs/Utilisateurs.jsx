import React, { useState, useEffect } from "react";
import { userService } from "./userService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Edit2, Trash2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";

const Utilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [usersNumber, setUsersNumber] = useState(0);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  // Form state
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    role: "",
    image: null,
  });
  const [backendError, setBackendError] = useState("");

  // Fetch users and roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, rolesData] = await Promise.all([
          userService.getAllUsers(),
          userService.getAllRoles(),
        ]);
        setUsers(usersData);
        setUsersNumber(usersData.length);
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
      [name]: value,
    });
    // Clear the error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.login.trim()) {
        errors.login = 'Login est requis';
    }

     // Only validate password when creating new user
  if (!currentUser && !formData.password.trim()) {
    errors.password = 'Mot de passe est requis';
  }
    if (!formData.role) {
      errors.role = 'Role est requis';
  }

    return errors;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({}); // clear errors if valid
    // Reset errors
    try {
      if (currentUser) {
        // Prepare the data for update
        const updatePayload = {
          login: formData.login,
          roleId: formData.role,
        };

        // Only include password if user entered a new one
        if (formData.password.trim() !== "") {
          updatePayload.password = formData.password;
        }

        const updatedUser = await userService.updateUser(
          currentUser.id,
          updatePayload
        );

        setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
      } else {
        // Create new user
        
        const formPayload = new FormData();

        // Create the user object
        const userObject = {
          login: formData.login,
          password: formData.password,
          role: {
            id: parseInt(formData.role),
          },
        };

        // Important: Stringify the user object
        formPayload.append("user", JSON.stringify(userObject));

        // Add image if exists
        if (formData.image) {
          formPayload.append("image", formData.image);
        }

        // Debug: Log what we're sending
        console.log("Sending form data:", {
          user: userObject,
          hasImage: !!formData.image,
        });
        console.log("Form data:", formPayload);
        const newUser = await userService.createUser(formPayload);
        setUsers([...users, newUser]); // Add the new user to state
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      console.log(err);
      console.log("status", err.status);
      console.log("response", err.response.data);

      if (err.status === 400) {
        setBackendError("Ce login est déjà utilisé.");
      } else {
        setBackendError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };




  //-------------edit user ------------------

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      login: user.login,
      password: "", // Don't pre-fill password for security
      role: user.role.id,
    });
    setShowModal(true);
  };
  //-------------delete user ------------------

  const handleDeleteClick = (id) => {
    console.log("Id", id)
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const handleDelete = async () => {
    try {
      console.log("deletedID", deleteId)
      await userService.deleteUser(deleteId);
      const updated = await userService.getAllUsers();
      setUsers(updated);
    } catch (err) {
      setError(err.message);
    }finally {
      setShowDeleteModal(false);
    }
  };

  //---------------------set header numbers  -----------------
  const { setCountLabel } = useOutletContext();

  useEffect(() => {
    setCountLabel(`${users.length} utilisateurs trouvés`);
  }, [users]);
  //------------------ set header ajouter  handler 
  const { setHeaderAddHandler } = useOutletContext();
  useEffect(() => {
    // Pass the custom button click function to the header
    setHeaderAddHandler(() => () => setShowModal(true));
  }, [setHeaderAddHandler]);

  const resetForm = () => {
    setFormData({
      login: "",
      password: "",
      role: "",
    });
    setCurrentUser(null);
    setFormErrors({});
    setSelectedFile(null);


  };
 

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  if (error)
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
      border: "none",
    },
    {
      field: "login",
      headerName: "Login",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex items-center space-x-3">
          {params.row.image && (
            <img
              src={params.row.image}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span>{params.row.login}</span>
        </div>
      ),
    },
    
    {
      field: "role",
      headerName: "Role",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const roleName = params.row.role?.name;
        let bgColor, textColor, displayName;
  
        // Determine colors and display name based on role
        if (roleName === 'ROLE_ADMIN') {
          bgColor = 'bg-purple-100';
          textColor = 'text-purple-800';
          displayName = 'Admin';
        } else if (roleName === 'ROLE_RESPONSABLE') {
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-800';
          displayName = 'Responsable';
        } else {
          bgColor = 'bg-green-100';
          textColor = 'text-green-800';
          displayName = 'Utilisateur';
        }
  
        return (
          <div className="flex items-center h-full">
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
              {displayName}
            </span>
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button
            onClick={() => handleEdit(params.row)}
            className="text-indigo-600 hover:text-indigo-900 mr-3"
          >
            <Edit2 className="w-4 h-4 inline" />
          </button>
          <button
            onClick={() => handleDeleteClick(params.row.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="w-4 h-4 inline" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px] shadow-md overflow-hidden  " >
      {/* Search Bar */}

      {/* Users Table */}
      <div className="">
        <Box sx={{ height: 450, width: "100%" }}>
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
            pageSizeOptions={[6]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          message= "utilisateur"
          itemId={deleteId}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50  p-4 z-50">
          <div class="flex items-center justify-center min-h-screen">
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-8">
              <div className=" mb-4  text-2xl montserrat-700 text-center montserrat-extra text-[#1d2736] ">
                {currentUser ? "Edit User" : "Add New User"}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="login"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Login
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="login"
                    name="login"
                    value={formData.login}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#947ebc] focus:border-[#947ebc] outline-none transition-all"
                  />
                 {formErrors.login && <p className="text-red-500 text-sm mt-2">{formErrors.login}</p>}
                  
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {currentUser
                      ? "New Password (leave blank to keep current)"
                      : "Password"}
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#947ebc] focus:border-[#947ebc] outline-none transition-all"
                  />
                {formErrors.password && <p className="text-red-500 text-sm mt-2">{formErrors.password}</p>}

                </div>

                <div className="mb-6">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Role <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#947ebc] focus:border-[#947ebc] outline-none transition-all"
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name.replace('ROLE_', '').toLowerCase()}
                      </option>
                    ))}
                  </select>
                  {formErrors.role && <p className="text-red-500 text-sm mt-2">{formErrors.role}</p>}

                </div>
                <div className="mb-4">
                <label
                      htmlFor="uploadFile1"
                      className="bg-white text-center rounded w-auto py-2 px-2 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 mx-auto font-[sans-serif] m-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 mb-6 fill-gray-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z" />
                        <path d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z" />
                      </svg>
                      <p className="text-gray-400 font-semibold text-sm">
                        Choose an <span className="text-[#7a6699]">image</span> to
                        upload
                      </p>

                      <input
      type="file"
      id="uploadFile1"
      className="hidden"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFormData({
          ...formData,
          image: file
        });
      }}
    />

                      <p className="text-xs text-gray-400 mt-2">
                        Svg, png is allowed.
                      </p>
                      {selectedFile && (
      <p className="text-sm text-gray-600 mt-1 truncate max-w-xs">
        {selectedFile.name}
      </p>
    )}

    
                    </label>
                  
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
                    {currentUser ? "Update" : "Create"}
                  </button>
                  {backendError && (
                    <div className="text-red-500 text-sm text-center mb-4">
                      {backendError}
                    </div>
                  )}
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
