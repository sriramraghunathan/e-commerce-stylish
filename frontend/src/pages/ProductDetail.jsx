import { useLocation } from "react-router-dom";
import NewArrivals from "./NewArrivals";

const ProductDetail = ({ cart, setCart }) => {
  const location = useLocation();
  
  const product = location.state;

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-600">Product not found!</div>
    );
  }

  const addToCart = () => {
    setCart([...cart, product]);
  };

  return (
    <>
      <div className="p-6 ">
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

              <button
                className="w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <div>
                <h2 className="text-xl font-bold mt-10">Descriptions</h2>
                <p className=" mt-5">
                  Classic Denim Jacket Rugged and timeless, this denim jacket
                  adds an effortless edge to any look. Slim Fit Chinos Crafted
                  for comfort and style, perfect for both work and weekend wear.
                  Basic Crew Neck Tee Ultra-soft cotton tee with a perfect fit —
                  your everyday essential.
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
