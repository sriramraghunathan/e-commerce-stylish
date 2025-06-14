import React from "react";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const navigate = useNavigate();
  const newArrivals = [
    {
      id: 1,
      name: "T-Shirt",
      price: 520,
      image:
        "https://image.hm.com/assets/hm/ef/63/ef63794d5445c64edcbe462146a890dcfc3902a8.jpg?imwidth=2160",
    },
    {
      id: 7,
      name: "Party wears",
      price: 3500,
      image:
        "https://westernera.com/cdn/shop/files/wine-red-party-wear-dress-with-front-pleats-dresses-for-women-570855.jpg?v=1741974208",
    },
    {
      id: 5,
      name: "Backpack",
      price: 3000,
      image:
        "https://static.nike.com/a/images/t_default/fdbd25ab-6566-4024-96f5-68c732061922/NK+UTILITY+POWER+BKPK+-+2.0.png",
    },
    {
      id: 4,
      name: "Sneakers",
      price: 850,
      image:
        "https://rukminim3.flixcart.com/image/850/1000/xif0q/shoe/s/y/9/8-rso2775-8-red-tape-white-original-imah2fskcnvn8qjh.jpeg?q=90&crop=false",
    },
    {
      id: 6,
      name: "Kuruthas",
      price: 1000,
      image:
        "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dwd65cc227/images/aw23/skdafreen8845aw23tercta_1-1.jpg?sw=502&sh=753",
    },
    {
      id: 9,
      name: "Pants",
      price: 2000,
      image:
        "https://assets.ajio.com/medias/sys_master/root/20240219/hkBu/65d380c905ac7d77bb644deb/-473Wx593H-467084915-taupe-MODEL.jpg",
    },
    {
      id: 8,
      name: "Slippers",
      price: 1600,
      image:
        "https://yoholife.in/cdn/shop/files/IMG_6254.jpg?v=1742803097&width=1080",
    },
    {
      id: 3,
      name: "Shirts",
      price: 2300,
      image:
        "https://image.hm.com/assets/hm/29/f3/29f3f2cf9139e6d107a8f926ab4ecf8cb5be93e1.jpg?imwidth=768",
    },
  ];

  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow p-4 bg-white"
            onClick={() => {
                window.scrollTo({ top: -1, behavior: "smooth" });
                navigate(`/products/men/${product.id}`, { state: product });
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
            <p className="text-gray-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
