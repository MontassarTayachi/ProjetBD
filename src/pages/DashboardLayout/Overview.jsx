import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Overview = () => {
    const recentActions = [
        { id: 1, date: "15/08/2014", user: "montassar50", action: "Ajouté un participant" },
        { id: 2, date: "15/08/2014", user: "montassar50", action: "Ajouté un participant" },
        { id: 3, date: "15/08/2014", user: "montassar50", action: "Ajouté un participant" },
        { id: 4, date: "16/08/2014", user: "johndoe", action: "Supprimé un fichier" },
        { id: 5, date: "17/08/2014", user: "janedoe", action: "Mis à jour un document" },
        { id: 6, date: "18/08/2014", user: "alexsmith", action: "Ajouté un participant" },
        { id: 7, date: "19/08/2014", user: "sarahconnor", action: "Supprimé un fichier" },
    ];

    const columns = [
        { field: "id", headerName: "ID", width: 60, headerClassName: "super-app-theme--header" },
        { field: "date", headerName: "Date", width: 120, headerClassName: "super-app-theme--header" },
        { field: "user", headerName: "Utilisateur", width: 150, headerClassName: "super-app-theme--header" },
        { field: "action", headerName: "Action", flex: 1, headerClassName: "super-app-theme--header" },
    ];

    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "#ffffff",
                color: "#1f2937",
                padding: 2,
                borderRadius: 1,
                width: 850,
                height: 570,
                border: "1px solid #e5e7eb",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#947ebc" }}>
                Actions Récentes
            </Typography>
            <Typography variant="body2" sx={{ color: "#4b5563", mb: 2 }}>
                {recentActions.length} actions effectuées récemment.
            </Typography>

            <Box sx={{ width: '100%' ,height: 480}}>
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
                    }}
                />
            </Box>
        </Paper>
    );
};

export default Overview;
