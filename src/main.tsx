import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Loader from "./components/ui/Loader.tsx";
import "./index.css";
import Root from "./Root.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <ThemeProvider defaultTheme="dark" storageKey="pass-keeper-ui-theme">
        <Root />
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>
);
