import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-800 text-center hover:underline p-2  text-2xl">
        <a href="#top">
          <span className="material-icons" style={{ fontSize: "50px",color:"white" }}>
            keyboard_arrow_up
          </span>
        </a>
      </div>
      <div className="bg-gray-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Accessories</li>
              <li>Shoes</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <p className="text-sm">
              We are a modern fashion e-commerce platform offering top brands
              and styles at unbeatable prices.
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping & Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Stay in the Loop</h3>
            <p className="text-sm mb-2">Sign up for our newsletter:</p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded text-black mb-2"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm rounded">
              Subscribe
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 py-4 border-t border-gray-700">
          © {new Date().getFullYear()} SimpleShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
