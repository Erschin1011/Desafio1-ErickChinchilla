"use client";
import { useState } from "react";
import { getSession, logoutUser } from "@/app/utils/auth";

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const session = getSession();
  const [active, setActive] = useState(false);

  const handleLogout = () => {
    showConfirm("¿Estás seguro de que quieres cerrar sesión?", (confirmed) => {
      if (!confirmed) return;
      logoutUser();
      window.location.href = "/login";
    });
  };

  const showConfirm = (message, callback) => {
    const modal = document.getElementById("confirmModal");
    const msg = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");

    msg.textContent = message;
    modal.classList.remove("hidden");

    const closeModal = () => modal.classList.add("hidden");

    yesBtn.onclick = () => {
      closeModal();
      callback(true);
    };

    noBtn.onclick = () => {
      closeModal();
      callback(false);
    };
  };

  const onDeleteProduct = (product) => {
    showConfirm(`¿Eliminar "${product.title}" del carrito?`, (confirmed) => {
      if (!confirmed) return;
      const results = allProducts.filter((item) => item.id !== product.id);
      setTotal(total - product.price * product.quantity);
      setCountProducts(countProducts - product.quantity);
      setAllProducts(results);
      localStorage.setItem("carrito", JSON.stringify(results));
    });
  };

  const onCleanCart = () => {
    showConfirm("¿Vaciar todo el carrito?", (confirmed) => {
      if (!confirmed) return;
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
      localStorage.removeItem("carrito");
    });
  };

  return (
    <header>
      <h1>Farmacia Chinchilla</h1>

      {session && (
        <button onClick={handleLogout} className="btn-close-session">
          Cerrar sesión
        </button>
      )}

      <div
        className="container-icon"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div
          className="container-cart-icon"
          onClick={() => setActive(!active)}
        >
          <img
            src="https://e7.pngegg.com/pngimages/833/426/png-clipart-shopping-cart-shopping-cart.png"
            alt="carrito"
            className="icon-cart"
          />
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>

        <div
          className={`container-cart-products ${active ? "" : "hidden-cart"}`}
        >
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">
                        {product.quantity}:  
                      </span>
                      <p className="titulo-producto-carrito">
                        {product.title}
                      </p>
                      <span className="precio-producto-carrito">
                        ${product.price}
                      </span>
                      <figure>
                        <img src={product.urlImage} alt={product.title} />
                      </figure>
                    </div>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png"
                      alt="cerrar"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    />
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>

              <button className="btn-clear-all" onClick={onCleanCart}>
                Vaciar Carrito
              </button>

              <a href="/factura">
                <button className="btn-factura">Generar Factura</button>
              </a>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      <div id="confirmModal" className="modal hidden">
        <div className="modal-content">
          <p id="confirmMessage">¿Estás seguro?</p>
          <div className="modal-actions">
            <button id="confirmYes" className="btn-confirm">Sí</button>
            <button id="confirmNo" className="btn-cancel">No</button>
          </div>
        </div>
      </div>
    </header>
  );
};
