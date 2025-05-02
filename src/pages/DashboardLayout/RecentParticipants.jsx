import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Avatar,
  Link,
} from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { dashService } from "../dashboard/dashService"; // Adjust the import path as needed

const RecentParticipants = () => {
  const [recentParticipants, setRecentParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentParticipants = async () => {
      try {
        const participants = await dashService.getRecentrParticipations();
        setRecentParticipants(participants.slice(0, 6));
      } catch (error) {
        console.error("Error fetching recent participants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentParticipants();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts
      .map((p) => p[0]?.toUpperCase() || "")
      .join("")
      .substring(0, 2);
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  if (loading) {
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
        <Typography>Loading participants...</Typography>
      </Paper>
    );
  }

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
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
          Recent Participations
        </Typography>
        <Link
          href="#"
          underline="none"
          sx={{
            color: "#9ca3af",
            fontSize: "0.875rem",
            "&:hover": { color: "#6b7280" },
          }}
        >
          View All
        </Link>
      </Box>

      <List sx={{ p: 0 }}>
        {recentParticipants.length > 0 ? (
          recentParticipants.map((participant) => (
            <ListItem
              key={participant._id || participant.id}
              sx={{
                p: 1,
                mb: 1,
                borderRadius: 3,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    mr: 2,
                    bgcolor: "#f3f4f6",
                    color: "#1f2937",
                    fontWeight: 600,
                    fontSize: 16,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {getInitials(participant.participant.nom + " " + participant.participant.prenom)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      color: "#1f2937",
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      mb: 0.5,
                    }}
                  >
                    {participant.participant.nom + " " + participant.participant.prenom}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{
                      color: "#6b7280",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 400,
                    }}
                  >
                    { participant.formation.titre.split(" ").slice(0, 3).join(" ") }
                  </Typography>
                }
              />
              <Box
                sx={{
                  background: getRandomColor(),
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  minWidth: 70,
                  textAlign: "center",
                }}
              >
                {formatDate(
                  participant.date_inscription 
                )}{" "}
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography sx={{ color: "#6b7280", textAlign: "center", py: 2 }}>
            No participants found
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default RecentParticipants;
