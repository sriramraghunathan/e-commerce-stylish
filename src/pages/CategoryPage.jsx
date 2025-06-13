import { useNavigate } from "react-router-dom";

const CategoryPage = ({ category, products }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">{category} Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-3 rounded cursor-pointer"
                onClick={() =>
                  navigate(`/products/${category.toLowerCase()}/${item.id}`, {state: item,})
                }
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
       <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-3 rounded cursor-pointer"
                onClick={() =>
                  navigate(`/products/${category.toLowerCase()}/${item._id}`, {
                    state: item,
                  })
                }
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
          ))}
        </div>
        </div>
    </>
  );
};

export default CategoryPage;
