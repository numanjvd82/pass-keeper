import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const Layout = React.lazy(() => import("./components/ui/Layout"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
