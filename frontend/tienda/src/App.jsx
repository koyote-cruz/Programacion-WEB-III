import {Routes,Route} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import "./App.css";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

    </Routes>

  );
}

export default App;