import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (inputCaptcha.toUpperCase() !== captcha) {
    alert("Captcha incorrecto");
    generarCaptcha();
    return;
    }

    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {

      console.log(data);

      if (data.message === "Login correcto") {

        // guardar usuario
        localStorage.setItem("user", JSON.stringify(data.user));

        // redirección por rol
        navigate("/home");

      } else {
        alert(data.message);
      }
    });

  };

  const generarCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  setCaptcha(code);
};

useEffect(() => {
    generarCaptcha();
  }, []);
  

  return (
  <div className="login-container">

    <div className="login-card">

      <h2>Iniciar Sesión</h2>

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

      <div className="captcha-box">
        <p><strong>{captcha}</strong></p>

        <input
          type="text"
          placeholder="Ingresa el código"
          value={inputCaptcha}
          onChange={(e) => setInputCaptcha(e.target.value)}
        />

        <button type="button" onClick={generarCaptcha}>
          🔄 Nuevo
        </button>
      </div>

      <button onClick={handleLogin}>
        Ingresar
      </button>

      <Link to="/register">
        Registrarse
      </Link>

    </div>

  </div>
);
}

export default Login;
