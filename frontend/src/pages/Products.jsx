import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = ({ cart, setCart }) => {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://e-commerce-stylish-1.onrender.com/api/products"
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const item = cart.find((item) => item._id === productId);
    if (item.quantity > 1) {
      setCart(
        cart.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item._id !== productId));
    }
  };

  const getQuantity = (productId) => {
    const item = cart.find((item) => item._id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {products.map((product, idx) => {
          const quantity = getQuantity(product._id);
          return (
            <div
              key={`${product._id}-${idx}`}
              className="border bg-white shadow-sm p-4 rounded-lg flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate(`/products/men/${product._id}`, { state: product });
                }}
              />

              <Link to={`/products/${product._id}`}>
                <h3 className="text-lg font-medium text-center">
                  {product.name}
                </h3>
              </Link>

              <p className="mt-2 text-green-700 font-semibold">
                ₹{product.price}
              </p>

              {quantity > 0 ? (
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="font-medium">{quantity}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
