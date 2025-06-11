import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-400 text-white p-4 flex items-center justify-between">
        {/* Logo */}
        <div className="w-20 flex-shrink-0">
          <img
            src="https://png.pngtree.com/template/20200623/ourmid/pngtree-f-logo-vector-geometric-stylish-simple-designs-black-color-white-background-image_385210.jpg"
            alt="Logo"
            className="border-white rounded-full"
          />
        </div>

        {/* Search bar - hidden on small screens */}
        <div className="hidden md:flex flex-1 mx-10">
          
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-10 font-bold text-black text-xl items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart({cartCount})
          </Link>
          <Link
            to="/login"
            className="hover:underline border-white text-black bg-white p-1 w-8 rounded-full"
          >
            <span className="material-icons">person</span>
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 text-black p-4 space-y-3">
          
          <Link to="/" className="block hover:underline">
            Home
          </Link>
          <Link to="/products" className="block hover:underline">
            Products
          </Link>
          <Link to="/cart" className="block hover:underline">
            Cart({cartCount})
          </Link>
          <Link to="/login" className="block hover:underline">
            Login
          </Link>
        </div>
      )}

      {/* Category Navigation */}
      <nav className="bg-gray-100 text-black p-2 md:p-4 flex flex-wrap justify-around text-sm md:text-lg font-medium">
        {["men", "women", "kids", "accessories", "shoes"].map((cat) => (
          <Link
            key={cat}
            to={`/${cat}`}
            className="text-black px-3 py-2 hover:bg-black hover:text-white hover:rounded-full hover:underline"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
