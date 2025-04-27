import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Make sure to import BrowserRouter
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { AuthProvider } from "./component/Context/Authcontext.tsx"; // Ensure you have this AuthContext set up

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Ensure this is defined in your .env file

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <BrowserRouter> {/* Wrapping everything inside BrowserRouter */}
        {/* <AuthProvider> Wrapping App with AuthProvider for authentication context */}
          <App />
        {/* </AuthProvider> */}
      </BrowserRouter>
    </StrictMode>
  </GoogleOAuthProvider>
);
