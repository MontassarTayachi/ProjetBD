import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { formationService } from "../../formations/formationService"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";

const Formation = () => {
  const [formation, setFormation] = useState([]);
  const [particpantsNumber, setParticpantsNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentParticipation, setCurrentParticipation] = useState(null);
  


 

  // Fetch users and roles
  const fetchFormations = async () => {
     try {
       setLoading(true);
       const data = await formationService.getAllFormation();
       setFormation(data);
     } catch (error) {
       setError(error.message);
       console.error("Error fetching formations:", error);
     } finally {
       setLoading(false);
     }
   };

    useEffect(() => {
       fetchFormations();
     }, []);

   
     const navigate = useNavigate();

     const handleView = (id) => {
       navigate(`/formateur/participations/${id}`);
     };
  
  





  if (loading)
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  if (error)
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  const columns = [
 
    {
      field: "titre",
      headerName: "Titre",
      width: 250,
      headerClassName: "super-app-theme--header",
      
    },
    
    {
      field: "domaine",
      headerName: "Domaine",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return params.row.domaine ? params.row.domaine.libelle : "N/A";
      },
      
    },
    {
        field: "nbHeures",
        headerName: "Nombre d'heures",
        width: 90,
        headerClassName: "super-app-theme--header",
        
      },
      {
        field: "nbHeuresRestantes",
        headerName: "Nombre d'heures restantes",
        width: 90,
        headerClassName: "super-app-theme--header",
        
      },
      {
        field: "Participants",
        headerName: "Participants",
        width: 120,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
            // Counting the number of participants
            const participantsCount = params.row.participations ? params.row.participations.length : 0;
            return participantsCount;
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
        onClick={() => handleView(params.row.id)} // Navigate to the new route
        className="text-[#9ca3af] hover:text-indigo-900 mr-3"
          >  voir
          </button>
          
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px] shadow-md overflow-hidden  " >

      {/* Formation Table */}
      <div className="">
        <Box sx={{ height: 450, width: "100%" }}>
          <DataGrid
            rows={formation}
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
      
    </div>
  );
};

export default Formation;
