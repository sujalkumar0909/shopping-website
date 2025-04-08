import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [message, setMessage] = useState("");

  const handleCheckout = () => {
    clearCart();
    setMessage("✅ Order placed successfully!");
    setTimeout(() => setMessage(""), 4000);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div className="cart-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                  />
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
      {message && <div className="confirmation">{message}</div>}
    </motion.div>
  );
};

export default Cart;
