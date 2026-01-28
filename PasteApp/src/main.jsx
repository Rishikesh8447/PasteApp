import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* Updated Wrapper: 
          - bg-[#020617] is a deep "Midnight" blue/black.
          - selection:bg-indigo-500/30 makes text highlighting look cool.
      */}
      <div className="min-h-screen w-screen overflow-x-hidden bg-[#020617] selection:bg-indigo-500/30 text-slate-200">
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155'
            },
          }}
        />
      </div>
    </Provider>
  </StrictMode>
);
