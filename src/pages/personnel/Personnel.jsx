import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Briefcase,
  UserCheck,
  Users,
} from "lucide-react";
import { personnelService } from "./personnelService";
import { formationService } from "../formations/formationService";
import Box from "@mui/material/Box";
import ConfirmationModal from "../../components/ConfirmationModal";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useOutletContext } from "react-router-dom";

export default function Personnel() {
  const [activeTab, setActiveTab] = useState("employeurs");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  // Data states
  const [employeurs, setEmployeurs] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [formations, setFormations] = useState([]);

  // Form states
  const [formData, setFormData] = useState({
    // Common fields
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    // Participant specific
    formations: [],
    // Formateur specific
    type: "Indépendant",
    employeur: { id: "" },
    // Employeur specific
    nomemployeur: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
    console.log(employeurs);
    console.log(formateurs);
    console.log(participants);
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      switch (activeTab) {
        case "employeurs":
          const employeursData = await personnelService.getAllEmployeurs();
          setEmployeurs(employeursData);
          break;
        case "formateurs":
          const formateursData = await personnelService.getAllFormateurs();
          setFormateurs(formateursData);
          // Load employeurs for formateur's employer dropdown
          const empData = await personnelService.getAllEmployeurs();
          setEmployeurs(empData);
          break;
        case "participants":
          const participantsData = await personnelService.getAllParticipants();
          const formationdata = await formationService.getAllFormation(); // Create this in your service
          setFormations(formationdata);
          setParticipants(participantsData);
          break;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  //--------------------------------------
  const { setCountLabel } = useOutletContext();

  useEffect(() => {
    let count = 0;
    let title = "";

    if (activeTab === "employeurs") {
      count = employeurs.length;
      title = "Employeurs";
    } else if (activeTab === "formateurs") {
      count = formateurs.length;
      title = "Formateurs";
    } else if (activeTab === "participants") {
      count = participants.length;
      title = "Participants";
    }

    setCountLabel(`${count} ${title} trouvés`);
  }, [activeTab, employeurs, formateurs, participants, setCountLabel]);
  const { setHeaderAddHandler } = useOutletContext();
  useEffect(() => {
    // Pass the custom button click function to the header
    setHeaderAddHandler(() => () => setShowModal(true));
  }, [setHeaderAddHandler]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: { id: parseInt(value) },
    });
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      formations: [],
      type: "Indépendant",
      employeur: { id: "" },
      nomemployeur: "",
    });
    setCurrentItem(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      let response;
      if (currentItem) {
        // Update existing
        switch (activeTab) {
          case "employeurs":
            response = await personnelService.updateEmployeur(
              currentItem.id,
              formData
            );
            break;
          case "formateurs":
            response = await personnelService.updateFormateur(
              currentItem.id,
              formData
            );
            break;
          case "participants":
            response = await personnelService.updateParticipant(
              currentItem.id,
              formData
            );
            console.log(formData);
            break;
        }
      } else {
        // Create new
        console.log(formData);
        switch (activeTab) {
          case "employeurs":
            response = await personnelService.createEmployeur(formData);
            break;
          case "formateurs":
            response = await personnelService.createFormateur(formData);
            break;
          case "participants":
            response = await personnelService.createParticipant(formData);
            break;
        }
      }
      setShowModal(false);
      fetchData();
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      nom: item.nom || "",
      prenom: item.prenom || "",
      email: item.email || "",
      tel: item.tel || "",
      formations: item.formations || [],
      type: item.type || "Indépendant",
      employeur: item.employeur || { id: "" },
      nomemployeur: item.nomemployeur || "",
    });
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      switch (activeTab) {
        case "employeurs":
          await personnelService.deleteEmployeur(deleteId);
          break;
        case "formateurs":
          await personnelService.deleteFormateur(deleteId);
          break;
        case "participants":
          await personnelService.deleteParticipant(deleteId);
          break;
      }
      fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case "employeurs":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Employer Name*
              </label>
              <input
                type="text"
                name="nomemployeur"
                value={formData?.nomemployeur}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.nomemployeur ? "border-red-500" : "border-gray-300"
                } shadow-sm p-2`}
              />
              {errors.nomemployeur && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.nomemployeur}
                </p>
              )}
            </div>
          </div>
        );
      case "formateurs":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Type*
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.type ? "border-red-500" : "border-gray-300"
                } shadow-sm p-2`}
              >
                <option value="Indépendant">Indépendant</option>
                <option value="Salarié">Salarié</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Employer
              </label>
              <select
                name="employeur"
                value={formData.employeur.id}
                onChange={handleSelectChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              >
                <option value="">Select Employer</option>
                {employeurs.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nomemployeur}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      case "participants":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Formations (IDs comma separated)
              </label>
              <select
                name="formations"
                value={formData.formations.id}
                onChange={handleSelectChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              >
                <option value="">Select Formation</option>
                {formations.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.titre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const columnsformateurs = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      width: 90,
    },
    {
      field: "prenom",
      headerName: "First name",
      width: 120,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "nom",
      headerName: "Last name",
      width: 120,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "tel",
      headerName: "Phone",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "employeur",
      headerName: "nomemployeur",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) =>
        params.row.employeur ? params.row.employeur.nomemployeur : "N/A",
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
  const columnsemployeurs = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "nomemployeur",
      headerName: "Employer Name",
      width: 250,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      width: 150,
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
  const columnsparticipants = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "nom",
      headerName: "First name",
      headerClassName: "super-app-theme--header",
      width: 120,
      editable: true,
    },
    {
      field: "prenom",
      headerName: "Last name",
      headerClassName: "super-app-theme--header",
      width: 120,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "tel",
      headerName: "Phone",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "formations",
      headerName: "Formations",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      width: 150,
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
    <div className="flex-1 px-8 py-4 bg-white rounded-[20px] shadow-md overflow-hidden  ">
      {/* Loading state */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Loading...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setError(null)}
            className="absolute top-0 right-0 px-2 py-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          message={activeTab.slice(0, -1)} // Remove 's' from end
          itemId={deleteId}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#7a6699]">
                  {currentItem
                    ? `Edit ${activeTab.slice(0, -1)}`
                    : `Add New ${activeTab.slice(0, -1)}`}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {activeTab !== "employeurs" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            First Name*
                          </label>
                          <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Last Name*
                          </label>
                          <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${
                              errors.nom ? "border-red-500" : "border-gray-300"
                            } shadow-sm p-2`}
                          />
                          {errors.nom && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.nom}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email*
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } shadow-sm p-2`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="tel"
                          value={formData.tel}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                        />
                      </div>
                    </>
                  )}

                  {renderFormFields()}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#7a6699] rounded-md hover:bg-[#947ebc]"
                  >
                    {currentItem ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 mt-0">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("employeurs")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === "employeurs"
                ? "border-[#947ebc] text-[#7a6699]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Employeurs
          </button>
          <button
            onClick={() => setActiveTab("formateurs")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === "formateurs"
                ? "border-[#947ebc] text-[#7a6699]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Formateurs
          </button>
          <button
            onClick={() => setActiveTab("participants")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === "participants"
                ? "border-[#947ebc] text-[#7a6699]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Participants
          </button>
        </nav>
      </div>

      {/* Content */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={
            activeTab === "employeurs"
              ? employeurs
              : activeTab === "formateurs"
              ? formateurs
              : participants
          }
          columns={
            activeTab === "employeurs"
              ? columnsemployeurs
              : activeTab === "formateurs"
              ? columnsformateurs
              : columnsparticipants
          }
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
  );
}
