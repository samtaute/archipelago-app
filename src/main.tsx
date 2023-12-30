import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppProvider from './contexts/realm-context'
import atlasConfig from "./atlasConfig.json"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider appId={atlasConfig.appId}>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
