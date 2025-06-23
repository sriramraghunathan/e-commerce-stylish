import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [log, setLog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLog(!!user);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout failed:", error));
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white w-full p-5 flex items-center justify-between fixed z-50 top-0 shadow-xl">
        {/* Logo */}
        <Link to="/">
          <div className="w-10 sm:w-12">
            <img
              src="https://thumbs.dreamstime.com/b/awesome-knight-logo-vector-illustration-design-ready-to-use-144418705.jpg"
              alt="Logo"
              className="rounded-full"
            />
          </div>
        </Link>
        <h1 className="text-4xl font-serif font-medium ml-5">STYLISH</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-end gap-16 font-bold text-black text-lg items-center mx-16">
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
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-400 text-white px-2 py-1 rounded-full "
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

      {/* Mobile Sidebar Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg p-6 space-y-6">
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

      {/* Category Navbar */}
      <nav className="bg-white text-black  p-3 mt-[90px] md:mt-[100px] flex flex-wrap justify-around text-sm md:text-lg shadow-md font-medium z-30 relative">
        {["men", "women", "kids", "accessories", "shoes"].map((cat) => (
          <Link
            key={cat}
            to={`/${cat}`}
            className="px-3 py-2 hover:bg-green-300 hover:text-black hover:rounded-full hover:underline"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
