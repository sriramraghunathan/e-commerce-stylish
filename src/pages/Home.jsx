import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [setNewArrivals] = useState([]); // for new products

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
        "https://image.hm.com/assets/hm/29/f3/29f3f2cf9139e6d107a8f926ab4ecf8cb5be93e1.jpg?imwidth=768}",
    },
  ];

  const slides = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-vector/flat-twitch-banner-template-fashion-flowers_23-2150407674.jpg?semt=ais_hybrid&w=740",
      caption: "Big Sale Today!",
    },
    {
      id: 2,
      image:
        "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/shark-new-collection-sale-clothing-banner-template-p3ztild89dffd0.webp",
      caption: "Check Out Our New Arrivals",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-vector/gradient-boutique-twitch-banner_23-2149334951.jpg",
      caption: "Free Shipping on Orders Over $50",
    },
  ];
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/new-arrivals"
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <>
      <div className="p-2 bg-orange-100 ">
        <div className="text-center mt-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Stylish</h1>
          <p className="text-lg mb-4">great deals!</p>
        </div>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={2000}
        >
          {slides.map((slide) => (
            <div key={slide.id}>
              <img src={slide.image} alt={slide.caption} />
              <p className="legend">{slide.caption}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow p-4 bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover mb-3 rounded"
              />
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                New
              </span>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
