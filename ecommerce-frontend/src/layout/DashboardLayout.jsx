import React from "react";
import Sidebar from "../components/Admin/Dashboards/Sidebar/Sidebar";
import { Box } from "@mui/material";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ marginLeft: 250, padding: 3, width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
