import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Drawer,
  Button,
  Typography,
  List,
  ListItem,
  Fab,
  Avatar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [monuments, setMonuments] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Unable to fetch user data", err);
    }
  }, [navigate]);

  const fetchMonuments = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/monuments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setMonuments(response.data);
    } catch (err) {
      console.error("Unable to fetch monuments data", err);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
    fetchMonuments();
  }, [fetchUserData, fetchMonuments]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/monuments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setMonuments((prev) => prev.filter((monument) => monument.id !== id));
    } catch (err) {
      console.error("Unable to delete monument", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
        variant="persistent"
        anchor="left"
        open
      >
        <div style={{ padding: "20px" }}>
          <h2>User Info</h2>
          {user ? (
            <div>
              <Typography variant="h6">Welcome, {user.username}!</Typography>
              <Button color="primary" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <Typography variant="body2">Loading...</Typography>
          )}
        </div>
      </Drawer>

      <div style={{ flex: 1, textAlign: "center" }}>
        <h2>Monuments List</h2>
        {monuments.length === 0 ? (
          <p>No monuments available.</p>
        ) : (
          <List
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {monuments.map((monument) => (
              <ListItem
                key={monument.id}
                style={{
                  position: "relative",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <IconButton
                  style={{ position: "absolute", top: 0, lef: 250 }}
                  color="secondary"
                  onClick={() => handleDelete(monument.id)}
                >
                  <DeleteIcon />
                </IconButton>
                {monument.image_filename ? (
                  <img
                    src={`http://localhost:5000/uploads/${monument.image_filename}`}
                    alt={monument.title}
                    style={{ maxWidth: "200px", marginTop: "10px" }}
                  />
                ) : (
                  <Avatar
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: "#3f51b5",
                      color: "#fff",
                      fontSize: "40px",
                      marginBottom: "10px",
                    }}
                  >
                    {monument.title.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <Typography variant="h6">{monument.title}</Typography>
                <Typography variant="body1">{monument.subtitle}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </div>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => navigate("/add-monument")}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default DashboardPage;
