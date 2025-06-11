import { useNavigate } from "react-router-dom";
import NewArrivals from "./NewArrivals";

const Women = () => {
  const navigate = useNavigate();
  const womenProducts = [
    {
      id: 1,
      name: "Women's Party Dress",
      price: 3200,
      image:
        "https://westernera.com/cdn/shop/files/wine-red-party-wear-dress-with-front-pleats-dresses-for-women-570855.jpg?v=1741974208",
      description: "Elegant dress for special occasions.",
    },
    {
      id: 2,
      name: "Women's Kurti",
      price: 1200,
      image:
        "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dwd65cc227/images/aw23/skdafreen8845aw23tercta_1-1.jpg?sw=502&sh=753",
      description: "Traditional yet modern stylish kurti.",
    },
  ];

  return (
    <>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Women's Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {womenProducts.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-3 rounded cursor-pointer"
                onClick={() =>
                  navigate(`/products/women/${item.id}`, { state: item })
                }
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <NewArrivals />
    </>
  );
};

export default Women;
