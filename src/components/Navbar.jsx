import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true); // <-- for closing the banner
  const navigate = useNavigate();
  const [log, setLog] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("User logged In");
        setLog(true);
      } else {
        console.log("User Logged Out");
        setLog(false);
      }
    });
  }, []);

  function logout() {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  return (
    <>
      {showBanner && (
        <div className="flex gap-10 justify-center items-center bg-black text-red-600 p-1">
          <h1 className="text-sm md:text-lg ml-4">
            New offers arriving soon!!!
          </h1>
          <button
            onClick={() => setShowBanner(false)}
            className="text-white mr-4 text-2xl"
          >
            ×
          </button>
        </div>
      )}
      <nav className="bg-white p-4 flex items-center justify-between">
        <div className="w-10 sm:w-20 flex-shrink-0">
          <img
            src="https://png.pngtree.com/template/20200623/ourmid/pngtree-f-logo-vector-geometric-stylish-simple-designs-black-color-white-background-image_385210.jpg"
            alt="Logo"
            className="border-white rounded-full"
          />
        </div>

        <div className="hidden md:flex flex-1 mx-10"></div>

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
          {log ? (
            <button
              onClick={logout}
              className="hover:underline rounded-full bg-red-600 p-2 text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:underline border-black text-white bg-black p-1 rounded-full"
            >
              <span className="material-icons">person</span>
            </Link>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-black text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div   className="md:hidden text-center  bg-white text-black p-4 space-y-6">
          <Link to="/" className="block hover:underline">
            Home
          </Link>
          <Link to="/products" className="block hover:underline">
            Products
          </Link>
          <Link to="/cart" className="block hover:underline">
            Cart({cartCount})
          </Link>
          {log ? (
            <button
              onClick={logout}
              className="hover:underline rounded-full bg-red-600 p-2 text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:underline border-black text-white bg-black p-1 rounded-full"
            >
              <span className="material-icons">person</span>
            </Link>)}
        </div>
      )}

      {/* Categories */}
      <nav className="bg-gray-800 text-white p-2 md:p-4 flex flex-wrap justify-around text-sm md:text-lg font-medium">
        {["men", "women", "kids", "accessories", "shoes"].map((cat) => (
          <Link
            key={cat}
            to={`/${cat}`}
            className="text-white px-3 py-2 hover:bg-green-300 hover:text-black  hover:rounded-full hover:underline"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
