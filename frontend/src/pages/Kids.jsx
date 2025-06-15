import { useNavigate } from "react-router-dom";
import NewArrivals from "./NewArrivals";

const Kids = () => {
  const navigate = useNavigate();
  const kidsProducts = [
    {
      id: 1,
      name: "Kids pant",
      price: 900,
      image:
        "https://assets.ajio.com/medias/sys_master/root/20240219/hkBu/65d380c905ac7d77bb644deb/-473Wx593H-467084915-taupe-MODEL.jpg",
      description: "Warm and comfy hoodie for kids.",
    },
    {
      id: 2,
      name: "Kids Sneakers",
      price: 1300,
      image:
        "https://rukminim3.flixcart.com/image/850/1000/xif0q/shoe/s/y/9/8-rso2775-8-red-tape-white-original-imah2fskcnvn8qjh.jpeg?q=90&crop=false",
      description: "Sporty sneakers for kids' adventures.",
    },
  ];

  return (
    <>
      <div className="p-6 ">
        <h2 className="text-3xl font-bold mb-6">Kids Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {kidsProducts.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-3 rounded cursor-pointer"
                onClick={() =>
                  navigate(`/products/kids/${item.id}`, { state: item })
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

export default Kids;
