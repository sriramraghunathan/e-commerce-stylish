import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { useState } from "react";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Accessories from "./pages/Accessories";
import Shoes from "./pages/Shoes";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import NewArrivals from "./pages/NewArrivals";


const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<Products cart={cart} setCart={setCart} />}
        />
        <Route
          path="/products/:category/:id"
          element={<ProductDetail cart={cart} setCart={setCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/newarraivals"
          element={<NewArrivals cart={cart} setCart={setCart} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
