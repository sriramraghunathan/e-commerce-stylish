import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [log, setLog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLog(true);
      } else {
        setLog(false);
      }
    });
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout failed:", error));
  };

  return (
    <>
      {showBanner && (
        <div className="flex animate-pulse gap-10 justify-center items-center bg-black text-red-600 p-1">
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
        {/* Logo */}
        <div className="w-10 sm:w-20 flex-shrink-0">
          <img
            src="https://png.pngtree.com/template/20200623/ourmid/pngtree-f-logo-vector-geometric-stylish-simple-designs-black-color-white-background-image_385210.jpg"
            alt="Logo"
            className="border-white rounded-full"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 mx-10 justify-end gap-10 font-bold text-black text-xl items-center">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg p-6 space-y-6 transition-transform transform translate-x-0">
            <button
              className="text-2xl text-black absolute top-4 right-4"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            <nav className="flex flex-col gap-4 mt-10 text-lg font-semibold">
              <Link
                to="/"
                className="hover:bg-gray-200 p-2 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="hover:bg-gray-200 p-2 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="hover:bg-gray-200 p-2 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Cart({cartCount})
              </Link>

              {log ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-600 text-white p-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-400 text-white p-2 rounded text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="material-icons">person</span>
                </Link>
              )}
            </nav>
          </div>
        </>
      )}

      {/* Category Nav */}
      <nav className="bg-gray-800 text-white p-2 md:p-4 flex flex-wrap justify-around text-sm md:text-lg font-medium">
        {["men", "women", "kids", "accessories", "shoes"].map((cat) => (
          <Link
            key={cat}
            to={`/${cat}`}
            className="text-white px-3 py-2 hover:bg-green-300 hover:text-black hover:rounded-full hover:underline"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
