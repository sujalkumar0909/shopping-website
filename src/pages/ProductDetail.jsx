import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <Loader />;

  return (
    <motion.div className="detail" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      <div className="detail-card">
        <img src={product.image} alt={product.title} />
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <button onClick={handleAdd}>Add to Cart</button>
          {added && <span className="added-msg">✔️ Added to cart</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
