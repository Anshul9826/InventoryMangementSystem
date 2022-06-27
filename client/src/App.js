import React from "react";
import { Container } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route exact path="/" element={!user ? <Navigate replace to="/auth" /> : <Navigate replace to="/products" />} />
          <Route exact path="/products" element={<Home />} />
          <Route
            exact
            path="/auth"
            element={!user ? <Auth /> : <Navigate replace to="/products" />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
