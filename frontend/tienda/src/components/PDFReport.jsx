import jsPDF from "jspdf";
import "./PDFReport.css";
import autoTable from "jspdf-autotable";

function PDFReport() {

  const generarPDF = async () => {

  const res = await fetch("http://localhost:3001/reportes/completo");
  const data = await res.json();

  const {
    productos = [],
    ventas = [],
    detalles = [],
    usuarios = [],
    logs = []
  } = data;

  const doc = new jsPDF();

  let y = 20;

  // =====================
  // PRODUCTOS
  // =====================
  doc.text("REPORTE PRODUCTOS", 20, y);
  y += 10;

  autoTable(doc, {
    startY: y,
    head: [["ID", "Nombre", "Categoria", "Cantidad", "Precio"]],
    body: productos.map(p => [
      p.id,
      p.nombre,
      p.categoria,
      p.cantidad,
      p.precio
    ])
  });

  y = doc.lastAutoTable.finalY + 20;

  // =====================
  // VENTAS
  // =====================
  doc.text("VENTAS", 20, y);
  y += 10;

  autoTable(doc, {
    startY: y,
    head: [["ID", "Usuario", "Total"]],
    body: ventas.map(v => [
      v.id,
      v.usuario,
      v.total
    ])
  });

  y = doc.lastAutoTable.finalY + 20;

  // =====================
  // DETALLE VENTAS
  // =====================
  doc.text("DETALLE VENTAS", 20, y);
  y += 10;

  autoTable(doc, {
    startY: y,
    head: [["ID", "Venta", "Producto", "Cantidad", "Precio", "Subtotal"]],
    body: detalles.map(d => [
      d.id,
      d.ventumId,
      d.producto,
      d.cantidad,
      d.precio,
      d.subtotal
    ])
  });

  y = doc.lastAutoTable.finalY + 20;

  // =====================
  // USUARIOS
  // =====================
  doc.text("USUARIOS", 20, y);
  y += 10;

  autoTable(doc, {
    startY: y,
    head: [["ID", "Nombre", "Email", "Rol"]],
    body: usuarios.map(u => [
      u.id,
      u.nombre,
      u.email,
      u.rol
    ])
  });

  y = doc.lastAutoTable.finalY + 20;

  // =====================
  // LOGS
  // =====================
  doc.text("LOGS DEL SISTEMA", 20, y);
  y += 10;

  autoTable(doc, {
    startY: y,
    head: [["Usuario", "Evento", "IP", "Fecha"]],
    body: logs.map(l => [
      l.usuario,
      l.evento,
      l.ip,
      l.fecha
    ])
  });

  doc.save("reporte_completo.pdf");
};

  return (
    <button className="pdf-btn" onClick={generarPDF}>
      📄 Generar PDF
    </button>
  );
}

export default PDFReport;