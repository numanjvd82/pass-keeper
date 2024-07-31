import React, { Suspense } from "react";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Loader from "./components/ui/Loader.tsx";

const Root = () => {
  const App = React.lazy(() => import("./App.tsx"));
  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider defaultTheme="dark" storageKey="pass-keeper-ui-theme">
        <App />
      </ThemeProvider>
    </Suspense>
  );
};

export default Root;
