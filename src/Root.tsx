import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./App.css";
import { Sidebar } from "./components/ui/sidebar";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Sidebar />
              <App />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
