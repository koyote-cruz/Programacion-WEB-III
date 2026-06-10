import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Menu.css";

function Menu({ user, setPagina }) {

  const [open, setOpen] = useState(false);
  

  const navigate = useNavigate();

  // CERRAR SESIÓN
  const cerrarSesion = async () => {

    await fetch(
      "http://localhost:3001/auth/logout",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          usuario: user.nombre
        })
      }
    );

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className="menu">

      <div className="menu-header">
        <span>MI TIENDA</span>

        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
     </div>

      {/* IZQUIERDA */}
      <div className={`menu-left ${open ? "show" : ""}`}>

        <button 
        
        onClick={() => setPagina("inicio")}>
          Inicio
        </button>

        {
          user.rol === "admin" && (

            <button
              onClick={() =>
                setPagina("agregar")
              }
            >
              Agregar Producto
            </button>

          )
        }

        {
          user.rol === "admin" && (

            <button
              onClick={() => setPagina("ventas")}
            >
              Ventas
            </button>

          )
        }

        {
          user.rol === "admin" && (

            <button
              onClick={() =>
                setPagina("reporte")
              }
            >
              Reporte
            </button>

          )
        }

      </div>

      {/* DERECHA */}
      <div className="menu-right">

        <span>
          👤 {user.nombre}
        </span>

        <button
          onClick={cerrarSesion}
          className="logout-btn"
        >
          Cerrar Sesión
        </button>

      </div>

    </div>

  );
}

export default Menu;