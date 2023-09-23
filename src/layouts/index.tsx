import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SearchAppBar from "../components/appBar";

export default function DefaultLayout() {
  return (
    <Box>
      <SearchAppBar />
      <Outlet />
    </Box>
  );
}
