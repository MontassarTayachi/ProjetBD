import React from "react";
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Paper, Button, Avatar ,Link } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

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

    const getRandomColor = () => {
        const colors = [
            "linear-gradient(135deg, #6366f1, #8b5cf6)",
            "linear-gradient(135deg, #ec4899, #f43f5e)",
            "linear-gradient(135deg, #10b981, #14b8a6)",
            "linear-gradient(135deg, #f59e0b, #f97316)",
            "linear-gradient(135deg, #3b82f6, #0ea5e9)"
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <Paper
            elevation={0}
            sx={{
                backgroundColor: "#ffffff",
                padding: 3,
                borderRadius: 4,
                width: "100%",
                maxWidth: 420,
                height: "auto",
                overflow: "hidden",
                border: "1px solid #f3f4f6",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    color: "#1f2937",
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: "0.5px"
                }}>
                    Recent Participants
                </Typography>
                <Link
                    href="#"
                    underline="none"
                    sx={{
                        color: "#9ca3af",
                        fontSize: "0.875rem",
                        "&:hover": { color: "#6b7280" }
                    }}
                >
                    View All
                </Link>
            </Box>

            

            <List sx={{ p: 0 }}>
                {recentParticipants.map((participant) => (
                    <ListItem 
                        key={participant.id} 
                        sx={{ 
                            p: 1, 
                            mb: 1, 
                            borderRadius: 3,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: '#f9fafb',
                                transform: 'translateX(4px)'
                            }
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar 
                                sx={{ 
                                    width: 48, 
                                    height: 48, 
                                    mr: 2,
                                    bgcolor: '#f3f4f6',
                                    color: '#1f2937',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                {getInitials(participant.name)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography sx={{ 
                                    color: "#1f2937", 
                                    fontWeight: 600,
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 15,
                                    mb: 0.5
                                }}>
                                    {participant.name}
                                </Typography>
                            }
                            secondary={
                                <Typography sx={{ 
                                    color: "#6b7280", 
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 13,
                                    fontWeight: 400
                                }}>
                                    {participant.email}
                                </Typography>
                            }
                        />
                        <Box sx={{
                            background: getRandomColor(),
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif",
                            minWidth: 70,
                            textAlign: 'center'
                        }}>
                            {participant.dateJoined}
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default RecentParticipants;