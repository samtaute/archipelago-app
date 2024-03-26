import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AppProvider from "./contexts/realm-context";
import atlasConfig from "./atlasConfig.json";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="483507877066-8dptjptpr1q0m0rdhkpnre7g4vg6d294.apps.googleusercontent.com">
      <AppProvider appId={atlasConfig.appId}>
        <App />
      </AppProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
