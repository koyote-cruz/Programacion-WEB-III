import { useState, useEffect } from "react";

import "./Home.css";

import Menu from "../components/Menu";
import Header from "../components/Header";
import AddItemForm from "../components/AddItemForm";
import InventoryList from "../components/InventoryList";
import Summary from "../components/Summary";
import StockChart from "../components/StockChart";
import PDFReport from "../components/PDFReport";
import Cart from "../components/Cart";
import Ventas from "../components/Ventas";


function Home() {
  

  const user = JSON.parse(localStorage.getItem("user"));
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] =useState([]);

  const [pagina, setPagina] =useState("inicio");
  const [carrito, setCarrito] = useState([]);

// AÑADIR PRODUCTOS
  const addItem = (nuevoProducto) => {setInventory([...inventory,nuevoProducto]);

};




  // CARGAR PRODUCTOS
  useEffect(() => {

    fetch("http://localhost:3001/productos")

      .then(res => res.json())

      .then(data => {

        console.log(data);

        setInventory(data);

      })

      .catch(error => {console.log(error);

      });

  }, []);


  // ELIMINAR PRODUCTO
  const deleteItem = async (id) => {

    await fetch(
      `http://localhost:3001/productos/${id}`,
      {
        method: "DELETE"
      }
    );

    setInventory(

      inventory.filter(item => item.id !== id)

    );

  };


  // ACTUALIZAR CANTIDAD
  const updateQuantity = async (id,nuevaCantidad) => {

    const producto =inventory.find(item => item.id === id);

    await fetch(
      `http://localhost:3001/productos/${id}`,
      {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          ...producto,

          cantidad: nuevaCantidad

        })

      }
    );

    setInventory(inventory.map(item =>

        item.id === id? {
              ...item,
              cantidad: nuevaCantidad
            }

          : item

      ));



  };

  //CARRITO
  const agregarCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    const cantidadEnCarrito = existe ? existe.cantidad : 0;

  // VALIDAR STOCK
  if (producto.cantidad <= cantidadEnCarrito) {
    alert("Sin stock disponible");
    return;
  }


 if (existe) {
    setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  } else {
    setCarrito([...carrito,{...producto,cantidad: 1,
      stock: producto.cantidad}]);
  }
  };

  //FINALIZAR COMPRA
  const finalizarCompra = async () => {
    if (carrito.length === 0) {

      alert("El carrito está vacío");

       return;
    }

    console.log(carrito);

  try {

    const res = await fetch(
      "http://localhost:3001/ventas",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          usuario: user.nombre,

          carrito

        })

      }
    );

    const data = await res.json();

    console.log(data);

    alert("Compra realizada");

    // VACIAR CARRITO
    setCarrito([]);

    // RECARGAR PRODUCTOS
    fetch("http://localhost:3001/productos")

      .then(res => res.json())

      .then(data => {

        setInventory(data);

      });

  } catch (error) {

    console.log(error);

    alert("Error en compra");

  }

};


const productosFiltrados = inventory.filter(

  (item) =>

    item.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    item.categoria
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

);

const total = carrito.reduce(
  (sum, item) => sum + item.precio * item.cantidad,
  0
);

const aumentarCantidad = (id) => {
  setCarrito(
    carrito.map(item =>
      item.id === id
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    )
  );
};

const disminuirCantidad = (id) => {
  setCarrito(
    carrito.map(item =>
      item.id === id
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    ).filter(item => item.cantidad > 0)
  );
};

const eliminarProducto = (id) => {
  setCarrito(carrito.filter(item => item.id !== id));
};


  return (

    <div className="app">

      <Menu user={user} setPagina={setPagina}/>

      <div className="content">

        {
          pagina === "inicio" && (

            <div>

              <h1 className="home-title">
                MI TIENDA
              </h1>

              <h2 className="home-subtitle">
                Bienvenido {user.nombre}
              </h2>

              <p className="home-role">
                Rol: {user.rol}
              </p>

              <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <InventoryList

                inventory={productosFiltrados}

                deleteItem={deleteItem}

                updateQuantity={updateQuantity}

                user={user}

                agregarCarrito= {agregarCarrito}

              />
              {
                user.rol === "usuario" && (

                  <Cart
                    carrito={carrito}
                    inventory={inventory}
                    total={total}
                    finalizarCompra={finalizarCompra}
                    aumentarCantidad={aumentarCantidad}
                    disminuirCantidad={disminuirCantidad}
                    eliminarProducto={eliminarProducto}
                  />

                )
              }


            </div>

          )
        }

        {
          pagina === "agregar" && (

            <AddItemForm addItem={addItem} />

          )
        }

        {
          pagina === "ventas" && (
            <Ventas />
          )
        }

        {
        pagina === "reporte" && (

          <div>

            <h1>
              Reportes
            </h1>

            <Summary
              inventory={inventory}
            />
            <StockChart
              inventory={inventory}
            />
            <PDFReport
              inventory={inventory}
              
            />

          </div>

        )
      }

      </div>

    </div>

  );
}

export default Home;