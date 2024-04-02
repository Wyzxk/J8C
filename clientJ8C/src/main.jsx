import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Layout from "./hocs/Layout";
import Home from "./pages/Home.jsx";
import PagRangos from "./pages/PagRangos.jsx";
import PagMiembros from "./pages/PagMiembros.jsx";
import PagPelotones from "./pages/PagPelotones.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/rangos" Component={PagRangos} />
          <Route exact path="/rangos/:id" Component={PagRangos} />
          <Route exact path="/miembros" Component={PagMiembros} />
          <Route exact path="/miembros/:id" Component={PagMiembros} />
          <Route exact path="/pelotones" Component={PagPelotones} />
          <Route exact path="/pelotones/:id" Component={PagPelotones} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
