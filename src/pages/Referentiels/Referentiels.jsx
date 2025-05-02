import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { refService } from "./refService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { MdDelete } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import Loading from "../../components/Loading";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useToast } from "../../contexts/ToastContext";

const Referentiels = () => {
    const { addToast } = useToast();
  // State for each referentiel type
  const [domaines, setDomaines] = useState([]);
  const [structures, setStructures] = useState([]);
  const [profils, setProfils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [activeTab, setActiveTab] = useState("domaines");
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    libelle: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [domainesRes, structuresRes, profilsRes] = await Promise.all([
          refService.getAllDomaine(),
          refService.getAllStructure(),
          refService.getAllProfil(),
        ]);
        setDomaines(domainesRes);
        setStructures(structuresRes);
        setProfils(profilsRes);
        console.log(domainesRes);
        console.log(structuresRes);
        console.log(profilsRes);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [showModal]);
  //-----------------
  const validateForm = () => {
    const errors = {};
    const trimmedLibelle = formData.libelle ? formData.libelle.trim() : '';
    
    if (!trimmedLibelle) {
      errors.libelle = "Libelle est requis";
    } else if (trimmedLibelle.length < 2) {
      errors.libelle = "Libelle doit contenir au moins 2 caractères";
    }
    return errors;
  };

  //--------------------------
  const { setCountLabel } = useOutletContext();
  const { setHeaderAddHandler } = useOutletContext();
  useEffect(() => {
    // Pass the custom button click function to the header
    setHeaderAddHandler(() => () => setShowModal(true));
  }, [setHeaderAddHandler]);
  useEffect(() => {
    // Update the count label based on the active tab
    let count = 0;
    if (activeTab === "domaines") {
      count = domaines.length;
    } else if (activeTab === "structures") {
      count = structures.length;
    } else if (activeTab === "profils") {
      count = profils.length;
    }

    // Set the count label (e.g., "x Domaines found")
    setCountLabel(`${count} ${getActiveTitle()} trouvés`);
  }, [activeTab, domaines, structures, profils, setCountLabel]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear the error for this field when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({}); // clear errors if valid
    try {
      const data = { libelle: formData.libelle };
      const isUpdate = !!currentItem;
      const actionType = isUpdate ? 'updated' : 'created';
        if (isUpdate) {
        // Update
        if (activeTab === "domaines") {
          await refService.updateDomaine(currentItem.id, data);
          const updated = await refService.getAllDomaine();
          setDomaines(updated);
        } else if (activeTab === "structures") {
          await refService.updateStructure(currentItem.id, data);
          const updated = await refService.getAllStructure();
          setStructures(updated);
        } else {
          await refService.updateProfil(currentItem.id, data);
          const updated = await refService.getAllProfil();
          setProfils(updated);
        }
      } else {
        // Create
        if (activeTab === "domaines") {
          try {
          await refService.createDomaine(data);
          } catch (error) {
          if (error.response?.status === 409) {
            formErrors.libelle = "This domain already exists!";
        } else {
          setError('Error creating domain');
         }
    }
          const updated = await refService.getAllDomaine();
          
          setDomaines(updated);
        } else if (activeTab === "structures") {

          try {await refService.createStructure(data);
          } catch (error) {
            if (error.response?.status === 409) {
              formErrors.libelle = "This structure already exists!";
          } else {
            setError('Error creating structure');
          }}
          const updated = await refService.getAllStructure();
          setStructures(updated);
        } else {
          await refService.createProfil(data);
          const updated = await refService.getAllProfil();
          setProfils(updated);
        }
      }
      addToast({
        type: "success",
        title: "Succès",
        message: `${getTranslatedType()} ${isUpdate ? 'mis à jour' : 'créé'} avec succès`
      });
      setShowModal(false);
      resetForm();
    } catch (err) {
      addToast({
        type: "error",
        title: "Erreur",
        message: `Échec de ${
          currentItem ? "mise à jour" : "création"
        } ${getTranslatedType()}`,
      });
      setError(err.message || "Operation failed");
    }
  };
  const getTranslatedType = () => {
    switch (activeTab) {
      case "domaines":
        return "Domaine";
      case "structures":
        return "Structure";
      case "profils":
        return "Profil";
      default:
        return "";
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const handleDelete = async (id) => {
    try {
      if (activeTab === "domaines") {
        await refService.deleteDomaine(id);
        const updated = await refService.getAllDomaine();
        setDomaines(updated);
      } else if (activeTab === "structures") {
        await refService.deleteStructure(id);
        const updated = await refService.getAllStructure();
        setStructures(updated);
      } else {
        await refService.deleteProfil(id);
        const updated = await refService.getAllProfil();
        setProfils(updated);
      }
      addToast({
        type: "success",
        title: "Succès",
        message: `${getTranslatedType()} supprimé avec succès`,
      });
    } catch (err) {
      setError(err.message || "Delete failed");
    } finally {
      setShowDeleteModal(false);
    }
  };
  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({ libelle: item.libelle });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      libelle: "",
    });
    setCurrentItem(null);
    setFormErrors({}); // Clear all errors

  };

  const getActiveData = () => {
    switch (activeTab) {
      case "domaines":
        return domaines || [];
      case "structures":
        return structures || [];
      case "profils":
        return profils || [];
      default:
        return [];
    }
  };

  const getActiveTitle = () => {
    switch (activeTab) {
      case "domaines":
        return "Domaines";
      case "structures":
        return "Structures";
      case "profils":
        return "Profils";
      default:
        return "";
    }
  };

  const filteredData = getActiveData().filter((item) =>
    item.libelle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "libelle",
      headerName: "Libellé",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerClassName: "super-app-theme--header",
      editable: false,
      renderCell: (params) => (
        <div className="px-5 py-4  whitespace-nowrap text-sm font-medium">
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

  if (loading) return <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <p>Loading...</p>
  </div>
</div>;
  if (error)
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="flex-1 px-8 py-4 bg-white rounded-[20px] shadow-md overflow-hidden  ">
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 mt-0">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("domaines")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "domaines"
                ? "border-[#947ebc] text-[#7a6699]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Domaines
          </button>
          <button
            onClick={() => setActiveTab("structures")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "structures"
                ? "border-[#947ebc] text-[#7a6699]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Structures
          </button>
          <button
            onClick={() => setActiveTab("profils")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "profils"
                ? "border-[#947ebc] text-[#7a6699]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Profils
          </button>
        </nav>
      </div>

      {/* Search Bar */}

      {/* Data Table */}
      <div className="">
        <Box sx={{ height: 360, width: "100%" }}>
          <DataGrid
            rows={filteredData}
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
          message={activeTab.slice(0, -1)} // Remove 's' from end
          itemId={deleteId}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#7a6699] mb-4">
                {currentItem
                  ? `Mise à jour ${getActiveTitle().slice(0, -1)}`
                  : `Ajouter  ${getActiveTitle().slice(0, -1)}`}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="libelle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Libellé
                  </label>
                  <input
                    type="text"
                    id="libelle"
                    name="libelle"
                    value={formData.libelle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#947ebc] focus:border-[#947ebc] outline-none transition-all"
                    
                    autoFocus
                  />
                  {formErrors.libelle && (
                    <p className="text-red-500 text-sm mt-2">
                      {formErrors.libelle}
                    </p>
                  )}
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
                    {currentItem ? "Mettre à jour" : "Créer"}
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

export default Referentiels;
