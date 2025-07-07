import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.slice(-8)); // get the last 8 products as "new arrivals"
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow p-4 bg-white cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: -1, behavior: "smooth" });
              navigate(`/products/men/${product._id}`, { state: product });
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-3 rounded"
            />
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
              New
            </span>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
