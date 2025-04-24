import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "642635175316-1uofbd5lppp698le4d64bnahljuqbqlk.apps.googleusercontent.com"

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
);
