import { useState } from "react";
import "./App.css";
import { Button } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/index.jsx";
import RegisterPage from "./pages/register/index.jsx";
import MovieDetailPage from "./pages/movie-detail/index.jsx";
import HomePage from "./pages/home/index.jsx";
import HomeTemplate from "./templates/HomeTemplate.jsx";
import AuthTemplate from "./templates/AuthTemplate.jsx";
import renderRoutes from "./routes/index.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="" element={<HomeTemplate />}>
            <Route path="" element={<HomePage />} />
            <Route path="/detail" element={<MovieDetailPage />} />
          </Route>
          <Route path="" element={<AuthTemplate />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route> */}
          {renderRoutes()}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
