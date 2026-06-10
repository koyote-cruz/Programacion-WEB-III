import { useEffect, useState } from "react";
import "./Ventas.css";

function Ventas() {

  const [detalles, setDetalles] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3001/ventas/detalles")
      .then(res => res.json())
      .then(data => setDetalles(data))
      .catch(error => console.log(error));

  }, []);

  return (

  <div>

    <h1 className="ventas-title">
      Detalle de Ventas
    </h1>

    <div className="ventas-container">

      <table className="ventas-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Venta</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>

        </thead>

        <tbody>

          {detalles.map(detalle => (

            <tr key={detalle.id}>

              <td>{detalle.id}</td>
              <td>{detalle.ventumId}</td>
              <td>{detalle.producto}</td>
              <td>{detalle.cantidad}</td>
              <td>{detalle.precio}</td>
              <td>{detalle.subtotal}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

);

}

export default Ventas;