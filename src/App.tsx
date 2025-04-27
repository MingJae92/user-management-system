import {  Routes, Route } from "react-router-dom";
import Protectedroutes from "./component/ProtectedRoutes/Protectedroutes"; // Import Protectedroutes component
import Login from "./component/Login/Login"
import Dashboard from "./component/Dashboard/Dashboard";

function App() {
  return (
    
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<Protectedroutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

  );
}

export default App;
