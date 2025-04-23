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

const Referentiels = () => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Validate the form
 /* const errors = validate(formData);
  console.log("Validation errors:", errors); // Add this line
  
  setFormErrors(errors);
  setIsSubmit(true);
  
  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    console.log("Form has errors, not submitting");
    return; // Stop the submission if there are errors
  }*/
    try {
      const data = { libelle: formData.libelle };

      if (currentItem) {
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
          await refService.createDomaine(data);
          const updated = await refService.getAllDomaine();
          setDomaines(updated);
        } else if (activeTab === "structures") {
          await refService.createStructure(data);
          const updated = await refService.getAllStructure();
          setStructures(updated);
        } else {
          await refService.createProfil(data);
          const updated = await refService.getAllProfil();
          setProfils(updated);
        }
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.message || "Operation failed");
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
    if (!values.libelle){
      errors.login = "Libelle is required";
    }
    return errors
  }
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
      } catch (err) {
        setError(err.message || "Delete failed");
      }finally {
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

  if (loading) return <Loading />;
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
                  ? `Edit ${getActiveTitle().slice(0, -1)}`
                  : `Add New ${getActiveTitle().slice(0, -1)}`}
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
                    required
                    autoFocus
                  />
                  <p className="mt-2 text-sm text-red-600">{formErrors.libelle}</p>
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
                    {currentItem ? "Update" : "Create"}
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
