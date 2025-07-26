"use client";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";

export default function FacturaPage() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const productos = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalPagar = productos.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCarrito(productos);
    setTotal(totalPagar);
  }, []);

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Factura - Farmacia Chinchilla", 20, 20);

    doc.setFontSize(12);
    let y = 40;
    carrito.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.title} - Cant: ${item.quantity} - $${item.price} c/u`,
        20,
        y
      );
      y += 10;
    });

    doc.setFontSize(14);
    doc.text(`Total a pagar: $${total}`, 20, y + 10);

    doc.save("factura.pdf");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Resumen de Factura</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {carrito.map((item, i) => (
              <li key={i}>
                {item.title} x {item.quantity} — ${item.price}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${total}</p>
          <button onClick={generarPDF} className="btn-factura">Generar PDF</button>
        </>
      )}
    </div>
  );
}
