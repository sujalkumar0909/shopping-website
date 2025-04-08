import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const categoryRes = await fetch("https://fakestoreapi.com/products/categories");
      const categoryData = await categoryRes.json();
      setCategories(["all", ...categoryData]);

      const productRes = await fetch("https://fakestoreapi.com/products");
      const productData = await productRes.json();
      setProducts(productData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) =>
    (selectedCategory === "all" || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div className="product-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductList;
