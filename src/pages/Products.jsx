import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const sampleProducts = [
  {
    id: 1,
    name: "T-Shirt",
    price: 520,
    image:
      "https://image.hm.com/assets/hm/ef/63/ef63794d5445c64edcbe462146a890dcfc3902a8.jpg?imwidth=2160",
  },

  {
    id: 2,
    name: "Pants",
    price: 1200,
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: 5,
    name: "Backpack",
    price: 3000,
    image:
      "https://static.nike.com/a/images/t_default/fdbd25ab-6566-4024-96f5-68c732061922/NK+UTILITY+POWER+BKPK+-+2.0.png",
  },
  {
    id: 3,
    name: "Shirts",
    price: 2300,
    image:
      "https://image.hm.com/assets/hm/29/f3/29f3f2cf9139e6d107a8f926ab4ecf8cb5be93e1.jpg?imwidth=768}",
  },
  {
    id: 4,
    name: "Sneakers",
    price: 850,
    image:
      "https://rukminim3.flixcart.com/image/850/1000/xif0q/shoe/s/y/9/8-rso2775-8-red-tape-white-original-imah2fskcnvn8qjh.jpeg?q=90&crop=false",
  },
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
    id: 6,
    name: "Kuruthas",
    price: 1000,
    image:
      "https://www.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dwd65cc227/images/aw23/skdafreen8845aw23tercta_1-1.jpg?sw=502&sh=753",
  },
  {
    id: 4,
    name: "Sneakers",
    price: 850,
    image:
      "https://rukminim3.flixcart.com/image/850/1000/xif0q/shoe/s/y/9/8-rso2775-8-red-tape-white-original-imah2fskcnvn8qjh.jpeg?q=90&crop=false",
  },

  {
    id: 7,
    name: "Party wears",
    price: 3500,
    image:
      "https://westernera.com/cdn/shop/files/wine-red-party-wear-dress-with-front-pleats-dresses-for-women-570855.jpg?v=1741974208",
  },
  {
    id: 8,
    name: "Slippers",
    price: 1600,
    image:
      "https://yoholife.in/cdn/shop/files/IMG_6254.jpg?v=1742803097&width=1080",
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
];

const Products = ({ cart, setCart }) => {
    const navigate = useNavigate();
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Products</h2>
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {sampleProducts.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            className="border bg-white shadow-sm p-4 rounded-lg flex flex-col items-center"
            onClick={() => {
              window.scrollTo({ top: -1, behavior: "smooth" });
              navigate(`/products/men/${product.id}`, { state: product });
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />

            <Link to={`/products/${product.id}`}>
              <h3 className="text-lg font-medium text-center">
                {product.name}
              </h3>
            </Link>

            <p className="mt-2 text-green-700 font-semibold">
              ₹{product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-auto bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
