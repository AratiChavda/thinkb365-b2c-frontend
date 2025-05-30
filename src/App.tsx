import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { useAuthVerify } from "./hooks/useAuthVerify";
import { Toaster } from "./components/ui/sonner";
import AppRoutes from "./routes/AppRoutes";
import { TooltipProvider } from "./components/ui/tooltip";

function AppContent() {
  useAuthVerify();

  return (
    <>
      <TooltipProvider>
        <Toaster />
        <AppRoutes />
      </TooltipProvider>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
