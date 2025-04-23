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
  const [DeletedName, setDeletedName] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    console.log("errors",errors);

   setFormErrors(errors);
   setIsSubmit(true);
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
//-------------validation ------------------
useEffect(() => {
  if (Object.keys(formErrors).length === 0 && isSubmit) {
    console.log (formData)
  }
}, [formErrors])


const validate = (values) =>{
  const errors ={} ;
  if (!values.login){
    errors.login = "Login is required";
  }
  if (!values.password){
    errors.password = "Password is required";
  }
  if (!values.role){
    errors.role = "Role is required";
  }
  return errors
}

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
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.row.role?.name || "",
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
    <div className="flex-1 p-8 bg-white rounded-[20px] shadow-md overflow-hidden  ">
      {/* Search Bar */}

      {/* Users Table */}
      <div className="">
        <Box sx={{ height: 360, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 4,
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
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  />
                  
                </div>
                <p class="mt-2 text-sm text-red-600 ">{formErrors.login}</p>

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
                    required={!currentUser}
                  />
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
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Profile Image (optional)
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.files[0],
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#947ebc] focus:border-[#947ebc] outline-none transition-all"
                  />
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
