import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";


function Register() {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {

    fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre,
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {

      console.log(data);

      if (data.message === "Usuario creado") {
        alert("Registro exitoso");
      } else {
        alert(data.message || "Error al registrar");
      }

    });

  };

  return (

  <div className="login-container">

    <div className="login-card">

      <h2>Registrarse</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Registrarse
      </button>

      <Link to="/">
        Iniciar Sesión
      </Link>

    </div>

  </div>

);
}

export default Register;