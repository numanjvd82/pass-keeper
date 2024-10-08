import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./lib/AuthProvider";
import { UserProvider } from "./lib/UserProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Layout />}>
              {ROUTES.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
