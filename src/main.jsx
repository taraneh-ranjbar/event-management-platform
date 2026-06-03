import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import {
  BookingProvider,
} from "./context/BookingContext";

import ErrorBoundary
  from "./components/ErrorBoundary";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ErrorBoundary>

      <ThemeProvider>

        <BookingProvider>

          <App />

        </BookingProvider>

      </ThemeProvider>

    </ErrorBoundary>
  </React.StrictMode>
);