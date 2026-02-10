import { useEffect, useState } from "react";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    brand: "",
    name: "",
    mrp: "",
    sellingPrice: "",
    stock: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchProducts = async () => {
    const res = await fetch("/api/products.php");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("action", editingId ? "update" : "create");
    if (editingId) fd.append("id", editingId);

    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    images.forEach((img) => fd.append("images[]", img));

    await fetch("/api/products.php", {
      method: "POST",
      body: fd,
    });

    resetForm();
    fetchProducts();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    const fd = new FormData();
    fd.append("action", "delete");
    fd.append("id", id);

    await fetch("/api/products.php", {
      method: "POST",
      body: fd,
    });

    fetchProducts();
  };

  /* ================= EDIT ================= */
  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      brand: p.brand,
      name: p.name,
      mrp: p.priceObj.mrp,
      sellingPrice: p.priceObj.selling_price,
      stock: p.stock,
      description: p.material_care || "",
    });
    setImages([]);
  };

  const resetForm = () => {
    setForm({
      brand: "",
      name: "",
      mrp: "",
      sellingPrice: "",
      stock: "",
      description: "",
    });
    setImages([]);
    setEditingId(null);
    setLoading(false);
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Product" : "Add Product"}
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          className="border rounded px-4 py-2"
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          required
        />

        <input
          className="border rounded px-4 py-2"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          className="border rounded px-4 py-2"
          placeholder="MRP"
          value={form.mrp}
          onChange={(e) => setForm({ ...form, mrp: e.target.value })}
          required
        />

        <input
          type="number"
          className="border rounded px-4 py-2"
          placeholder="Selling Price"
          value={form.sellingPrice}
          onChange={(e) =>
            setForm({ ...form, sellingPrice: e.target.value })
          }
          required
        />

        <input
          type="number"
          className="border rounded px-4 py-2"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />

        <textarea
          className="border rounded px-4 py-2 md:col-span-2"
          placeholder="Material / Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="file"
          multiple
          className="md:col-span-2"
          onChange={(e) => setImages([...e.target.files])}
          required={!editingId}
        />

        <button
          disabled={loading}
          className="md:col-span-2 bg-black text-white py-2 rounded"
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 text-sm">
                  <td className="p-3">
                    <img
                      src={p.imgdata?.images?.[0]?.src}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">
                    ₹{p.priceObj.selling_price}
                  </td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
