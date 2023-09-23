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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllData } from "./Slices/userSlice";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/create" element={<FormComponent />} />
      </Route>
    )
  );

  const { user, message, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);

  // Load user data
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  return (
    <Box width={"100%"}>
      <RouterProvider router={router} />
    </Box>
  );
}
