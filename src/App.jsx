import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import { testBackend } from "./services/api";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Applications from "./Components/Applications";
import AddApplication from "./Components/AddApplication";
import EditApplication from "./Components/EditApplication";
import Interviews from "./Components/Interviews";
import ApplicationDetails from "./Components/ApplicationDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              <ApplicationDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/add"
          element={
            <ProtectedRoute>
              <AddApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/edit/:id"
          element={
            <ProtectedRoute>
              <EditApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/:applicationId/interviews"
          element={
            <ProtectedRoute>
              <Interviews />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
