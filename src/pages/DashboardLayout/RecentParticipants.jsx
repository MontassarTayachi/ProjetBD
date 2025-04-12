import React from "react";
import { Avatar, Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";

const RecentParticipants = () => {
    const recentParticipants = [
        { id: 1, name: "Montassar", email: "montassar50@example.com", dateJoined: "15/08/2014" },
        { id: 2, name: "John Doe", email: "johndoe@example.com", dateJoined: "16/08/2014" },
        { id: 3, name: "Jane Doe", email: "janedoe@example.com", dateJoined: "17/08/2014" },
        { id: 4, name: "Alex Smith", email: "alexsmith@example.com", dateJoined: "18/08/2014" },
        { id: 5, name: "Sarah Connor", email: "sarahconnor@example.com", dateJoined: "19/08/2014" },
        { id: 6, name: "Emily Davis", email: "emilydavis@example.com", dateJoined: "20/08/2014" },
    ];

    const getInitials = (name) => {
        const parts = name.trim().split(" ");
        return parts.map(p => p[0].toUpperCase()).join("").substring(0, 2);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "#ffffff", // Fond clair
                color: "#1f2937", // Texte foncé
                padding: 2,
                borderRadius: 1,
                width: 450,
                height: 585,
                overflow: "auto",
                border: "1px solid #e5e7eb", // Légère bordure
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#947ebc" }}>
                Participants Récents
            </Typography>
            <Typography variant="body2" sx={{ color: "#4b5563", mb: 2 }}>
                {recentParticipants.length} participants ont rejoint récemment.
            </Typography>

            <List>
                {recentParticipants.map((participant) => (
                    <ListItem key={participant.id} sx={{ paddingLeft: 0, paddingRight: 0 }}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "#947ebc", color: "#ffffff", fontWeight: "500", fontFamily: "cursive" }}>
                                {getInitials(participant.name)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography sx={{ color: "#1f2937", fontWeight: 600,fontFamily: "Poppins" }}>
                                    {participant.name}
                                </Typography>
                            }
                            secondary={
                                <Typography sx={{ color: "#6b7280", fontFamily: "Poppins" }}>
                                    {participant.email}
                                </Typography>
                            }
                        />
                        <Typography variant="body2" sx={{ color: "#947ebc", fontWeight: "bold" }}>
                            {participant.dateJoined}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default RecentParticipants;
