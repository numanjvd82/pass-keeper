import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const HomePage = React.lazy(() => import("./pages/Home"));
const SettingsPage = React.lazy(() => import("./pages/Settings"));

const ROUTES = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
];

function App() {
  return (
    <div>
      <Routes>
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
