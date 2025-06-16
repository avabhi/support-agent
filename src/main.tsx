import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import CheckAuth from "./components/checkAuth.tsx";
import Tickets from "./pages/tickets.tsx";
import Ticket from "./pages/ticket.tsx";
import Login from "./pages/login.tsx";
import Signup from "./pages/signup.tsx";
import Admin from "./pages/admin.tsx";
import CreateTicket from "./pages/create.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth protectedRoute={true}>
              <Tickets />
            </CheckAuth>
          }
        />
        <Route
          path="/ticket/:id"
          element={
            <CheckAuth protectedRoute={true}>
              <Ticket />
            </CheckAuth>
          }
        />
        <Route
          path="/create-ticket"
          element={
            <CheckAuth protectedRoute={true}>
              <CreateTicket />
            </CheckAuth>
          }
        />
        <Route
          path="/login"
          element={
            <CheckAuth protectedRoute={false}>
              <Login />
            </CheckAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <CheckAuth protectedRoute={false}>
              <Signup />
            </CheckAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <CheckAuth protectedRoute={true}>
              <Admin />
            </CheckAuth>
          }
        />
      </Routes>
    </HashRouter>
  </StrictMode>
);
