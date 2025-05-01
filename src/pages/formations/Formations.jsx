import React, { useEffect, useState } from "react";
import { Album, Plus, Edit2, Trash2, X } from "lucide-react";
import { formationService } from "./formationService";
import { refService } from "../Referentiels/refService";
import { personnelService } from "../personnel/personnelService";
import { useOutletContext } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useToast } from "../../contexts/ToastContext";

export default function Formations() {
    const { addToast } = useToast();
  const [formations, setFormations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentFormation, setCurrentFormation] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [domaines, setDomaines] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    titre: "",
    nbHeures: 0,
    nbHeuresRestantes: 0,
    budget: 0,
    domaine: { id: "" },
    formateur: { id: "" },
    image: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const [errors, setErrors] = useState({});
  // Add these state variables at the top of your component
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // Calculate pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = formations.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(formations.length / cardsPerPage);

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    fetchFormations();
    fetchDomainesAndFormateurs();
  }, []);

  const fetchFormations = async () => {
    try {
      setLoading(true);
      const data = await formationService.getAllFormation();
      setFormations(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching formations:", error);
    } finally {
      setLoading(false);
    }
  };

  const { setCountLabel } = useOutletContext();
  useEffect(() => {
    setCountLabel(`${formations.length} formations trouvés`);
  }, [formations]);

  const { setHeaderAddHandler } = useOutletContext();
  useEffect(() => {
    setHeaderAddHandler(() => () => setShowModal(true));
  }, [setHeaderAddHandler]);

  const fetchDomainesAndFormateurs = async () => {
    try {
      setLoading(true);
      const domainesData = await refService.getAllDomaine();
      const formateursData = await personnelService.getAllFormateurs();
      setDomaines(domainesData);
      setFormateurs(formateursData);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching domaines or formateurs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: { id: parseInt(value) },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titre) newErrors.titre = "Title is required";
    if (!formData.nbHeures || formData.nbHeures <= 0)
      newErrors.nbHeures = "Duration must be positive";
    if (!formData.budget || formData.budget < 0)
      newErrors.budget = "Budget cannot be negative";
    if (!formData.domaine.id) newErrors.domaine = "Domain is required";
    if (!formData.formateur.id) newErrors.formateur = "Trainer is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formPayload = new FormData();
      const formationObject = {
        titre: formData.titre,
        nbHeures: formData.nbHeures,
        nbHeuresRestantes: formData.nbHeures,
        budget: formData.budget,
        domaine: { id: formData.domaine.id },
        formateur: { id: formData.formateur.id },
      };

      formPayload.append("formation", JSON.stringify(formationObject));

      if (formData.image) {
        formPayload.append("image", formData.image);
      }
      if (currentFormation) {
        await formationService.updateFormation(
            currentFormation.id,
            formPayload
        );
        addToast({
            type: 'success',
            title: 'Success',
            message: 'Formation updated successfully'
        });
    } else {
        await formationService.createFormation(formPayload);
        addToast({
            type: 'success',
            title: 'Success',
            message: 'Formation created successfully'
        });
    }

      setShowModal(false);
      fetchFormations();
      resetForm();
    } catch (error) {
      console.error("Error saving formation:", error);
      setError(error.message);
    }
  };

  const handleEdit = (formation) => {
    setCurrentFormation(formation);
    setFormData({
      titre: formation.titre,
      nbHeures: formation.nbHeures,
      budget: formation.budget,
      domaine: formation.domaine,
      formateur: formation.formateur,
      image: null, // Reset image when editing
    });
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await formationService.deleteFormation(deleteId);
      addToast({
        type: "success",
        title: "Succès",
        message: `Formation supprimé avec succès`,
      });
      fetchFormations();
      
    } catch (error) {
      console.error("Error deleting formation:", error);
      setError(error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const resetForm = () => {
    setFormData({
      titre: "",
      nbHeures: 0,
      budget: 0,
      domaine: { id: "" },
      formateur: { id: "" },
      image: null,
    });
    setCurrentFormation(null);
    setErrors({});
    setSelectedFile(null);
  };

  return (
    <div className="flex-1 px-8 pt-8 bg-white rounded-[20px] shadow-md overflow-hidden">
      {/* Loading and error states remain the same */}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          message="formation"
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
                  {currentFormation ? "Edit Formation" : "Add New Formation"}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title<span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="titre"
                      value={formData.titre}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.titre ? "border-red-500" : "border-gray-300"
                      } shadow-sm p-2`}
                    />
                    {errors.titre && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.titre}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                   
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Durée (heurs)<span class="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="nbHeures"
                        value={formData.nbHeures}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.nbHeures ? "border-red-500" : "border-gray-300"
                        } shadow-sm p-2`}
                      />
                      {errors.nbHeures && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.nbHeures}
                        </p>
                      )}
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Budget (€)<span class="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      step="0.01"
                      className={`mt-1 block w-full rounded-md border ${
                        errors.budget ? "border-red-500" : "border-gray-300"
                      } shadow-sm p-2`}
                    />
                    {errors.budget && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.budget}
                      </p>
                    )}
                  </div>
                  </div>

                  

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Domaine <span class="text-red-500">*</span>
                      </label>
                      <select
                        name="domaine"
                        value={formData.domaine.id}
                        onChange={handleSelectChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.domaine ? "border-red-500" : "border-gray-300"
                        } shadow-sm p-2`}
                      >
                        <option value="">Select a domain</option>
                        {domaines.map((domaine) => (
                          <option key={domaine.id} value={domaine.id}>
                            {domaine.libelle}
                          </option>
                        ))}
                      </select>
                      {errors.domaine && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.domaine}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Formateur <span class="text-red-500">*</span>
                      </label>
                      <select
                        name="formateur"
                        value={formData.formateur.id}
                        onChange={handleSelectChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.formateur
                            ? "border-red-500"
                            : "border-gray-300"
                        } shadow-sm p-2`}
                      >
                        <option value="">Select a trainer</option>
                        {formateurs.map((formateur) => (
                          <option key={formateur.id} value={formateur.id}>
                            {formateur.nom}
                          </option>
                        ))}
                      </select>
                      {errors.formateur && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.formateur}
                        </p>
                      )}
                    </div>
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
                        Choisissez une <span className="text-[#7a6699]">image</span>{" "}
                        pour telecharger
                      </p>

                      <input
                        type="file"
                        id="uploadFile1"
                        name="image"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setSelectedFile(file);
                          setFormData({
                            ...formData,
                            image: e.target.files[0],
                          });
                        }}
                        className="hidden"
                      />

                      <p className="text-xs text-gray-400 mt-2">
                        Svg, png sont autorisés.
                      </p>
                      {selectedFile && (
                        <p className="text-sm text-gray-600 mt-1 truncate max-w-xs">
                          {selectedFile.name}
                        </p>
                      )}
                    </label>
                  </div>
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
                    {currentFormation ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Pagination */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCards.map((formation) => (
            <FormationCard
              key={formation.id}
              formation={formation}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {formations.length > cardsPerPage && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#7a6699] hover:bg-[#f3f0f7]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-1">
                <span className="px-3 py-1 text-sm font-medium text-gray-600">
                  Page{" "}
                  <span className="font-semibold text-[#7a6699]">
                    {currentPage}
                  </span>{" "}
                  of {totalPages}
                </span>
              </div>

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#7a6699] hover:bg-[#f3f0f7]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

function FormationCard({ formation, onEdit, onDelete }) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        {formation.imageUrl ? (
          <img
            src={formation.imageUrl}
            alt={formation.titre}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#947ebc] flex items-center justify-center">
              <Album className="w-5 h-5 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
          </div>
        )}
        <div className="ml-4">
          <h5 className="text-xl font-semibold text-gray-900">
            {formation.titre || "No title"}
          </h5>
          <p className="text-sm text-gray-500">
            {formation.nbHeures} hours • {formation.année}
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <button
          onClick={() => onEdit(formation)}
          className="p-2 text-gray-500 hover:text-[#947ebc] transition-colors"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(formation.id)}
          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
