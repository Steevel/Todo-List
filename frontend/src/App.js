import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
