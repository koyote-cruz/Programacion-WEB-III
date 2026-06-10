// index.js
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

// Middleware
app.use(express.json());

// Conexión a MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'basededatos'
});


// Rutas
// pool.query() -> [[{},{}],[objetos y atributos]] = [resultado, [objetos y atributos]] 
// resultado = [{},{}],  resultado[0] = {}
app.post('/categorias', async (req, res) => {

  try {

    const { nombre, descripcion } = req.body;
    const [resultado] = await pool.query('INSERT INTO categorias(nombre, descripcion) VALUES (?, ?)',[nombre, descripcion]);

    res.status(201).json({
      mensaje: 'Categoría insertada correctamente',
      id: resultado.insertId
    });

  } catch (error) {

    res.status(500).json({
      mensaje: 'Error al insertar categoría',
      error
    });

  }

});

app.get('/categorias', async (req, res) => {
  const [resultado] = await pool.query('SELECT * FROM categorias');
  res.status(200).json(resultado);
});

app.get('/categorias/:id', async (req, res) => {
  const id = req.params.id;
  const [resultado] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
  //res.status(200).json(resultado[0]);

  const [productos] = await pool.query('SELECT * FROM productos2 WHERE categoria_id = ?',[id]);

    res.json({resultado: resultado[0],productos: productos});

});

app.patch('/categorias/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion } = req.body;
  const [resultado] = await pool.query('UPDATE categorias SET nombre = ?, descripcion = ?, updatedAt = NOW() WHERE id = ?', [nombre, descripcion, id]);
  res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
  //res.status(200).json(resultado);
});

app.delete('/categorias/:id', async (req, res) => {
  const id = req.params.id;
  const [resultado] = await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
  res.status(200).json({ mensaje: 'Categoria y sus productos eliminados correctamente' });
  //res.status(204).end(); // Se procesó la solicitud correctamente, pero no devuelve ningún contenido.
});

/*
app.get('/productos', async (req, res) => {
  const [resultado] = await pool.query('SELECT * FROM productos');
  res.status(200).json(resultado);
});

app.get('/productos/:id', async (req, res) => {
  const id = req.params.id;
  const [resultado] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  res.status(200).json(resultado[0]);
});

app.post('/productos', async (req, res) => {
  const { nombre, precio } = req.body;
  const [resultado] = await pool.query('INSERT INTO productos(nombre, precio) VALUES (?,?)', [nombre, precio]);
  //res.status(201).json({ mensaje: 'Producto insertado correctamente' });
  res.status(201).json(resultado);
});

app.patch('/productos/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, precio } = req.body;
  const [resultado] = await pool.query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, id]);
  //res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
  res.status(200).json(resultado);
});
 
app.delete('/productos/:id', async (req, res) => {
  const id = req.params.id;
  const [resultado] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  //res.status(204).end(); // Se procesó la solicitud correctamente, pero no devuelve ningún contenido.
});
*/

// Iniciar servidor
const PUERTO = 3001;
app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});
