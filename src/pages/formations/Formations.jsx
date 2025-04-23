import React, { useEffect, useState } from 'react';
import { Album, Plus, Edit2, Trash2, X } from 'lucide-react';
import { formationService } from './formationService';
import { refService } from '../Referentiels/refService';
import { personnelService } from '../personnel/personnelService';
import { useOutletContext } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function Formations() {
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
    titre: '',
    année: new Date().getFullYear(),
    nbHeures: 0,
    budget: 0,
    domaine: { id: '' },
    formateur: { id: '' },
    image: null,
  });
  const [errors, setErrors] = useState({});

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
      console.error('Error fetching formations:', error);
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
      console.error('Error fetching domaines or formateurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: { id: parseInt(value) }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titre) newErrors.titre = 'Title is required';
    if (!formData.nbHeures || formData.nbHeures <= 0) newErrors.nbHeures = 'Duration must be positive';
    if (!formData.budget || formData.budget < 0) newErrors.budget = 'Budget cannot be negative';
    if (!formData.domaine.id) newErrors.domaine = 'Domain is required';
    if (!formData.formateur.id) newErrors.formateur = 'Trainer is required';

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
        année: formData.année,
        nbHeures: formData.nbHeures,
        budget: formData.budget,
        domaine: { id: formData.domaine.id },
        formateur: { id: formData.formateur.id }
      };

      formPayload.append("formation", JSON.stringify(formationObject));
      
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      if (currentFormation) {
        await formationService.updateFormation(currentFormation.id, formPayload);
      } else {
        await formationService.createFormation(formPayload);
      }

      setShowModal(false);
      fetchFormations();
      resetForm();
    } catch (error) {
      console.error('Error saving formation:', error);
      setError(error.message);
    }
  };

  const handleEdit = (formation) => {
    setCurrentFormation(formation);
    setFormData({
      titre: formation.titre,
      année: formation.année,
      nbHeures: formation.nbHeures,
      budget: formation.budget,
      domaine: formation.domaine,
      formateur: formation.formateur,
      image: null // Reset image when editing
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
      fetchFormations();
    } catch (error) {
      console.error('Error deleting formation:', error);
      setError(error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const resetForm = () => {
    setFormData({
      titre: '',
      année: new Date().getFullYear(),
      nbHeures: 0,
      budget: 0,
      domaine: { id: '' },
      formateur: { id: '' },
      image: null
    });
    setCurrentFormation(null);
    setErrors({});
  };

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px] shadow-md overflow-hidden">
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#7a6699]">
                  {currentFormation ? 'Edit Formation' : 'Add New Formation'}
                </h2>
                <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title*</label>
                    <input
                      type="text"
                      name="titre"
                      value={formData.titre}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border ${errors.titre ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                    />
                    {errors.titre && <p className="mt-1 text-sm text-red-600">{errors.titre}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year</label>
                      <input
                        type="number"
                        name="année"
                        value={formData.année}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration (hours)*</label>
                      <input
                        type="number"
                        name="nbHeures"
                        value={formData.nbHeures}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border ${errors.nbHeures ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                      />
                      {errors.nbHeures && <p className="mt-1 text-sm text-red-600">{errors.nbHeures}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Budget (€)</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      step="0.01"
                      className={`mt-1 block w-full rounded-md border ${errors.budget ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                    />
                    {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Domain*</label>
                      <select
                        name="domaine"
                        value={formData.domaine.id}
                        onChange={handleSelectChange}
                        className={`mt-1 block w-full rounded-md border ${errors.domaine ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                      >
                        <option value="">Select a domain</option>
                        {domaines.map((domaine) => (
                          <option key={domaine.id} value={domaine.id}>
                            {domaine.libelle}
                          </option>
                        ))}
                      </select>
                      {errors.domaine && <p className="mt-1 text-sm text-red-600">{errors.domaine}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Trainer*</label>
                      <select
                        name="formateur"
                        value={formData.formateur.id}
                        onChange={handleSelectChange}
                        className={`mt-1 block w-full rounded-md border ${errors.formateur ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
                      >
                        <option value="">Select a trainer</option>
                        {formateurs.map((formateur) => (
                          <option key={formateur.id} value={formateur.id}>
                            {formateur.nom}
                          </option>
                        ))}
                      </select>
                      {errors.formateur && <p className="mt-1 text-sm text-red-600">{errors.formateur}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Formation Image (optional)
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setFormData({
                        ...formData,
                        image: e.target.files[0]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#947ebc] focus:border-[#947ebc] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#7a6699] rounded-md hover:bg-[#947ebc]"
                  >
                    {currentFormation ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formations.map((formation) => (
          <FormationCard
            key={formation.id}
            formation={formation}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
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
            {formation.titre || 'No title'}
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