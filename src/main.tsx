import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./styles/Dark.ts";
import { QueryClientProvider, QueryClient } from "react-query";
import AppQueryProvider from "./Contexts/useQueryContext.tsx";

const client = new QueryClient();

//Redux
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppQueryProvider>
        <QueryClientProvider client={client}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </AppQueryProvider>
    </Provider>
  </React.StrictMode>
);
