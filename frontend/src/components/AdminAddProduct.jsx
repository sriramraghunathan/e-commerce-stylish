import { useEffect, useState } from "react";
import axios from "axios"

const AdminAddProduct = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const backendUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api/products"
      : "https://e-commerce-stylish-1.onrender.com/api/products";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!token || !isAdmin) {
      window.location.href = "/admin-login";
    } else {
      fetchProducts()
    }
  },)

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(backendUrl);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          isadmin: localStorage.getItem("isAdmin"),
        },
      };
      

      if (isEditing) {
        await axios.put(`${backendUrl}/${editingProductId}`, formData, config);
        setIsEditing(false);
        setEditingProductId(null);
      } else {
        await axios.post(`${backendUrl}/add`, formData, config);
      }

      setFormData({ name: "", price: "", image: "", category: "" });
      fetchProducts();
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error saving product:", error.message);
      }
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingProductId(product._id);
    setFormData({
      name: product.name,
      price: Number(product.price),
      image: product.image,
      category: product.category || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          isadmin: localStorage.getItem("isAdmin"),
        },
      };
      await axios.delete(`${backendUrl}/${id}`, config);
      fetchProducts();
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error deleting product:", error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin-login";
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleAddOrUpdate}
        className="bg-white shadow p-6 rounded mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category (optional)"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white border shadow rounded p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">₹{product.price}</p>
            <p className="text-sm text-gray-400">{product.category}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAddProduct;
