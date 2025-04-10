import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { refService } from './refService';

const Referentiels = () => {
  // State for each referentiel type
  const [domaines, setDomaines] = useState([]);
  const [structures, setStructures] = useState([]);
  const [profils, setProfils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [activeTab, setActiveTab] = useState('domaines');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    libelle: ''
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [domainesRes, structuresRes, profilsRes] = await Promise.all([
          refService.getAllDomaine(),
          refService.getAllStructure(),
          refService.getAllProfil()
        ]);
        setDomaines(domainesRes);
        setStructures(structuresRes);
        setProfils(profilsRes);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
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
      const data = { libelle: formData.libelle };
  
      if (currentItem) {
        // Update
        if (activeTab === 'domaines') {
          await refService.updateDomaine(currentItem.id, data);
          const updated = await refService.getAllDomaine();
          setDomaines(updated.data);
        } else if (activeTab === 'structures') {
          await refService.updateStructure(currentItem.id, data);
          const updated = await refService.getAllStructure();
          setStructures(updated.data);
        } else {
          await refService.updateProfil(currentItem.id, data);
          const updated = await refService.getAllProfil();
          setProfils(updated.data);
        }
      } else {
        // Create
        if (activeTab === 'domaines') {
          await refService.createDomaine(data);
          const updated = await refService.getAllDomaine();
          setDomaines(updated.data);
        } else if (activeTab === 'structures') {
          await refService.createStructure(data);
          const updated = await refService.getAllStructure();
          setStructures(updated.data);
        } else {
          await refService.createProfil(data);
          const updated = await refService.getAllProfil();
          setProfils(updated.data);
        }
      }
  
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.message || 'Operation failed');
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (activeTab === 'domaines') {
          await refService.deleteDomaine(id);
          const updated = await refService.getAllDomaine();
          setDomaines(updated.data);
        } else if (activeTab === 'structures') {
          await refService.deleteStructure(id);
          const updated = await refService.getAllStructure();
          setStructures(updated.data);
        } else {
          await refService.deleteProfil(id);
          const updated = await refService.getAllProfil();
          setProfils(updated.data);
        }
      } catch (err) {
        setError(err.message || 'Delete failed');
      }
    }
  };
  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({ libelle: item.libelle });
    setShowModal(true);
  };
  

  const resetForm = () => {
    setFormData({
      libelle: ''
    });
    setCurrentItem(null);
  };

  const getActiveData = () => {
    switch (activeTab) {
      case 'domaines': return domaines || [];
      case 'structures': return structures || [];
      case 'profils': return profils || [];
      default: return [];
    }
  };

  const getActiveTitle = () => {
    switch (activeTab) {
      case 'domaines': return 'Domaines';
      case 'structures': return 'Structures';
      case 'profils': return 'Profils';
      default: return '';
    }
  };

  const filteredData = getActiveData().filter(item =>
    item.libelle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="flex-1  p-8 bg-white rounded-xl shadow-md overflow-hidden mx-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#7a6699]">
          Référentiels Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#947ebc] hover:bg-[#7a6699] text-white py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <Plus className="w-5 h-5 mr-2 text-[#c1b5db]" />
          Ajouter
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('domaines')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'domaines'
                ? 'border-[#947ebc] text-[#7a6699]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Domaines
          </button>
          <button
            onClick={() => setActiveTab('structures')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'structures'
                ? 'border-[#947ebc] text-[#7a6699]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Structures
          </button>
          <button
            onClick={() => setActiveTab('profils')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profils'
                ? 'border-[#947ebc] text-[#7a6699]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profils
          </button>
        </nav>
      </div>

      {/* Search Bar */}
      

      {/* Data Table */}
      <div className="">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#7a6699] uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#7a6699] uppercase tracking-wider">Libellé</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#7a6699] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.libelle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-[#947ebc] hover:text-[#7a6699] mr-4"
                    >
                      <Edit2 className="w-5 h-5 inline mr-1" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5 inline mr-1" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  No {getActiveTitle().toLowerCase()} found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#7a6699] mb-4">
                {currentItem ? `Edit ${getActiveTitle().slice(0, -1)}` : `Add New ${getActiveTitle().slice(0, -1)}`}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="libelle" className="block text-sm font-medium text-gray-700 mb-1">
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
                    {currentItem ? 'Update' : 'Create'}
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