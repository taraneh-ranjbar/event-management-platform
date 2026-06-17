import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/shared.css";
import { ThemeProvider } from "./context/ThemeContext";
import {
  BookingProvider,
} from "./context/BookingContext";

import ErrorBoundary
  from "./components/ErrorBoundary";

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { Provider }
  from "react-redux";

import { store }
  from "./store/store";

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>

      <ErrorBoundary>

        <ThemeProvider>
          <Provider store={store}>
            <AuthProvider>

              <BookingProvider>

                <App />

              </BookingProvider>

            </AuthProvider>
          </Provider>
        </ThemeProvider>

      </ErrorBoundary>

    </QueryClientProvider>

  </React.StrictMode>
);