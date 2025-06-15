import { useNavigate } from "react-router-dom";
import NewArrivals from "./NewArrivals";


const Shoes = () => {
  const navigate = useNavigate();
  const shoes = [
    {
      id: 1,
      name: "Nike Sneakers",
      price: 2999,
      image:
        "https://static.nike.com/a/images/t_default/fdbd25ab-6566-4024-96f5-68c732061922/NK+UTILITY+POWER+BKPK+-+2.0.png",
      description: "Stylish and comfortable sneakers.",
    },
    {
      id: 2,
      name: "Slip-on Shoes",
      price: 1600,
      image:
        "https://yoholife.in/cdn/shop/files/IMG_6254.jpg?v=1742803097&width=1080",
      description: "Easy to wear slip-on shoes for casual use.",
    },
  ];

  return (
    <>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Shoes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {shoes.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-3 rounded cursor-pointer"
                onClick={() =>
                  navigate(`/products/shoes/${item.id}`, { state: item })
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

export default Shoes;
