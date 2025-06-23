import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NewArrivals from "./NewArrivals";
import Sample from "./Sample";
const Home = () => {
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

  return (
    <>
      <div>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
        >
          {slides.map((slide) => (
            <div key={slide.id}>
              <img src={slide.image} alt={slide.caption} />
              <p className="legend">{slide.caption}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <Sample />
      <NewArrivals />
    </>
  );
};

export default Home;
