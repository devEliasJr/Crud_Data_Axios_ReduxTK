// App.js
import { Box } from "@mui/material";
import FormComponent from "./components/form";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/Home";
import DefaultLayout from "./layouts";


export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/create" element={<FormComponent />} />
      </Route>
    )
  );

  return (
    <Box width={"100%"}>
      <RouterProvider router={router} />
    </Box>
  );
}
