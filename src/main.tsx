import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Splash from "./components/ui/Loader.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Splash />}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="pass-keeper-ui-theme">
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
