import { Route, Routes } from "react-router-dom";
import Login from "./component/Login/Login";
import Dashboard from "./component/Dashboard/Dashboard";
import ProtectedRoute from "./component/ProtectedRoutes/Protectedroutes";
import { AuthProvider } from "./component/Context/Authcontext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Other routes */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
