import { useNavigate } from "react-router-dom";
import NewArrivals from "./NewArrivals";


const Accessories = () => {
  const navigate = useNavigate();
  const accessories = [
    {
      id: 1,
      name: "Stylish Backpack",
      price: 2000,
      image:
        "https://static.nike.com/a/images/t_default/fdbd25ab-6566-4024-96f5-68c732061922/NK+UTILITY+POWER+BKPK+-+2.0.png",
      description: "Durable backpack perfect for travel or school.",
    },
    {
      id: 2,
      name: "Fashion Sunglasses",
      price: 1100,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdo7tAVYb09i-hRKGxoXM8tCkd9VC0U6mc3w&s",
      description: "Sleek sunglasses for sunny days.",
    },
  ];

  return (
    <>
      <div className="p-6 ">
        <h2 className="text-3xl font-bold mb-6">Accessories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {accessories.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-3 rounded cursor-pointer"
                onClick={() =>
                  navigate(`/products/accessories/${item.id}`, { state: item })
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

export default Accessories;
