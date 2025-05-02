import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Overview = ({ recentActions }) => {
  const getRandomColor = () => {
    const colors = [
      "linear-gradient(135deg, #6366f1, #8b5cf6)",
      "linear-gradient(135deg, #ec4899, #f43f5e)",
      "linear-gradient(135deg, #10b981, #14b8a6)",
      "linear-gradient(135deg, #f59e0b, #f97316)",
      "linear-gradient(135deg, #3b82f6, #0ea5e9)",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Format date to day/month/year
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "utilisateur",
      headerName: "Utilisateur",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.row.utilisateur || "N/A",
    },
    {
      field: "action",
      headerName: "Action",
      width: 270,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Box
          sx={{
            background: getRandomColor(),
            color: 'white',
            px: 1.5,
            py: 0.25,
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            minWidth: 70,
            textAlign: 'center',
            lineHeight: '1.25'

          }}
        >
          {formatDate(params.row.date)}
        </Box>
      ),
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#ffffff",
        padding: 3,
        borderRadius: 4,
        width: 850,
        height: "auto",
        overflow: "hidden",
        border: "1px solid #f3f4f6",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#1f2937",
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        Actions Récentes
      </Typography>
      <Typography variant="body2" sx={{ color: "#4b5563", mb: 2 }}>
        {recentActions.length} actions effectuées récemment.
      </Typography>

      <Box sx={{ width: "100%", height: 480 }}>
        <DataGrid
          rows={recentActions}
          columns={columns}
          pageSizeOptions={[5]}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
          disableColumnSelector
          disableColumnFilter
          disableColumnMenu
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          sx={{
            border: "none",
            fontSize: 14,
            color: "#1f2937",
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              color: "#374151",
              fontWeight: "bold",
            },
            ".MuiDataGrid-cell": {
              borderBottom: "1px solid #f3f4f6",
            },
            ".MuiDataGrid-footerContainer": {
              borderTop: "1px solid #e5e7eb",
            },
            ".MuiDataGrid-selectedRowCount": {
              visibility: "hidden",
            },
            // Align cell content vertically center
            ".MuiDataGrid-cell--textLeft": {
              display: "flex",
              alignItems: "center",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default Overview;