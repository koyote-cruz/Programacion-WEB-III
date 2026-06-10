import "./Cart.css";

function Cart({ carrito, total, finalizarCompra, aumentarCantidad,
  disminuirCantidad,
  eliminarProducto, inventory }) {


    const cantidadEnCarrito = (id) => {
    const item = carrito.find(p => p.id === id);
    return item ? item.cantidad : 0;
    };

    const getStock = (id) => {
    const prod = inventory.find(p => p.id === id);
    return prod ? prod.cantidad : 0;
    };

  return (
  <div className="cart-container">

    <h2 className="cart-title">
      CARRITO
    </h2>

    {carrito.map((item) => (
      <div key={item.id} className="cart-item">

        <p className="cart-product">
          {item.nombre} - ${item.precio} x {item.cantidad} =
          ${(item.precio * item.cantidad).toFixed(2)}
        </p>

        <div className="cart-actions">

          <button
            className="btn-minus"
            onClick={() => disminuirCantidad(item.id)}
          >
            ➖
          </button>

          <button
            className="btn-plus"
            onClick={() => aumentarCantidad(item.id)}
            disabled={item.cantidad >= getStock(item.id)}
          >
            ➕
          </button>

          <button
            className="btn-delete"
            onClick={() => eliminarProducto(item.id)}
          >
            🗑 Eliminar
          </button>

        </div>

      </div>
    ))}

    <h3 className="cart-total">
      Total: ${total.toFixed(2)}
    </h3>

    <button
      className="btn-buy"
      onClick={finalizarCompra}
    >
      Finalizar Compra
    </button>

  </div>
);
}

export default Cart;