import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./styles/Dark.ts";
import { QueryClientProvider, QueryClient } from "react-query";
import AppQueryProvider from "./Contexts/useQueryContext.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppQueryProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </AppQueryProvider>
  </React.StrictMode>
);
