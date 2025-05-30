import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId:
    "AeQt25gcK5wrFF9VkxmjDjWVfxTQCshGlrVgvnhoM3YvJykBYXoz21SENKOYGZ1Xw9CQKabbdo0U0b6y",
  currency: "USD",
};
createRoot(document.getElementById("root")!).render(
  <PayPalScriptProvider options={initialOptions}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </PayPalScriptProvider>
);
