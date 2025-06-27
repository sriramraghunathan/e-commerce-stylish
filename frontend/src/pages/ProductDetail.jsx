import { useLocation } from "react-router-dom";
import NewArrivals from "./NewArrivals";
import { useState, useEffect } from "react";

const ProductDetail = ({ cart, setCart }) => {
  const location = useLocation();
  const product = location.state;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Check if product already in cart to set quantity
    const existingItem = cart.find((item) => item.id === product?.id);
    if (existingItem) {
      setQuantity(existingItem.quantity || 1);
    }
  }, [product, cart]);

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-600">Product not found!</div>
    );
  }

  const handleAdd = () => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setQuantity((prev) => prev + 1);
  };

  const handleRemove = () => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      setQuantity((prev) => prev - 1);
    } else {
      setCart(cart.filter((item) => item.id !== product.id));
      setQuantity(0);
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-auto md:w-80 h-auto object-cover mb-4 md:mb-0 rounded"
            />
            <div className="ml-0 md:ml-8">
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-xl font-semibold mb-4">₹{product.price}</p>

              {quantity > 0 && (
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={handleRemove}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="font-medium">{quantity}</span>
                  <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                onClick={handleAdd}
                className="mt-4 w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>

              <div>
                <h2 className="text-xl font-bold mt-10">Descriptions</h2>
                <p className="mt-5 text-gray-700 leading-relaxed">
                  Classic Denim Jacket: Rugged and timeless, this denim jacket
                  adds an effortless edge to any look. <br />
                  Slim Fit Chinos: Crafted for comfort and style, perfect for
                  both work and weekend wear. <br />
                  Basic Crew Neck Tee: Ultra-soft cotton tee with a perfect fit
                  — your everyday essential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewArrivals />
    </>
  );
};

export default ProductDetail;
