import { useEffect, useState } from "react";
import { Constants } from "../../api/env";
import { Layout } from "./Adminlayout";

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);

  const [form, setForm] = useState({
    brand: "",
    name: "",
    mrp: "",
    sellingPrice: "",
    stock: 0,
    material_care: "",
    categoryId: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  /* ================= LOAD ================= */
  const load = async () => {
    const p = await fetch(`${Constants.base}/api/products.php`).then(r => r.json());
    const c = await fetch(`${Constants.base}/api/categories.php`).then(r => r.json());

    setProducts(p.sort((a, b) => (a.position ?? 0) - (b.position ?? 0)));
    setCategories(c);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= DRAG & DROP ================= */
  const onDragStart = (index) => setDragIndex(index);
  const onDragOver = (e) => e.preventDefault();

  const onDrop = async (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    const updated = [...products];
    const dragged = updated[dragIndex];

    updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, dragged);

    const reordered = updated.map((p, i) => ({
      ...p,
      position: i + 1,
    }));

    setProducts(reordered);
    setDragIndex(null);

    const fd = new FormData();
    fd.append("action", "reorder");
    fd.append(
      "order",
      JSON.stringify(
        reordered.map(p => ({
          id: p.id,
          position: p.position,
        }))
      )
    );

    await fetch(`${Constants.base}/api/products.php`, {
      method: "POST",
      body: fd,
    });
  };

  /* ================= IMAGES ================= */
  const handleImages = (files) => {
    const arr = Array.from(files);
    setImages(arr);
    setPreviews(arr.map(f => URL.createObjectURL(f)));
  };

  const removePreview = (i) => {
    URL.revokeObjectURL(previews[i]);
    setImages(prev => prev.filter((_, x) => x !== i));
    setPreviews(prev => prev.filter((_, x) => x !== i));
  };

  /* ================= RESET ================= */
  const reset = () => {
    setEditingId(null);
    setForm({
      brand: "",
      name: "",
      mrp: "",
      sellingPrice: "",
      stock: 0,
      material_care: "",
      categoryId: "",
    });
    setImages([]);
    setPreviews([]);
  };

  /* ================= ADD ================= */
  const add = async () => {
    const fd = new FormData();
    fd.append("action", "create");

    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    images.forEach(img => fd.append("images[]", img));

    await fetch(`${Constants.base}/api/products.php`, {
      method: "POST",
      body: fd,
    });

    reset();
    load();
  };

  /* ================= EDIT ================= */
  const edit = (p) => {
    setEditingId(p.id);
    setForm({
      brand: p.brand,
      name: p.name,
      mrp: p.priceObj.mrp,
      sellingPrice: p.priceObj.selling_price,
      stock: p.stock,
      material_care: p.material_care || "",
      categoryId: p.categoryId,
    });
    setImages([]);
    setPreviews([]);
  };

  /* ================= UPDATE ================= */
  const update = async () => {
    const fd = new FormData();
    fd.append("action", "update");
    fd.append("id", editingId);

    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    images.forEach(img => fd.append("images[]", img));

    await fetch(`${Constants.base}/api/products.php`, {
      method: "POST",
      body: fd,
    });

    reset();
    load();
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    if (!confirm("Delete product?")) return;

    const fd = new FormData();
    fd.append("action", "delete");
    fd.append("id", id);

    await fetch(`${Constants.base}/api/products.php`, {
      method: "POST",
      body: fd,
    });

    load();
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="font-bold text-xl mb-4">
          {editingId ? "Edit Product" : "Add Product"}
        </h1>

        {/* ================= FORM ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-4 rounded shadow">
          <input className="border p-2" placeholder="Brand"
            value={form.brand}
            onChange={e => setForm({ ...form, brand: e.target.value })}
          />

          <input className="border p-2" placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input className="border p-2" placeholder="MRP" type="number"
            value={form.mrp}
            onChange={e => setForm({ ...form, mrp: e.target.value })}
          />

          <input className="border p-2" placeholder="Selling Price" type="number"
            value={form.sellingPrice}
            onChange={e => setForm({ ...form, sellingPrice: e.target.value })}
          />

          <input className="border p-2" placeholder="Stock" type="number"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })}
          />

          <select className="border p-2"
            value={form.categoryId}
            onChange={e => setForm({ ...form, categoryId: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <input type="file" multiple className="border p-2"
            onChange={e => handleImages(e.target.files)}
          />

          {previews.map((src, i) => (
            <div key={i} className="relative w-20 h-20">
              <img src={src} className="w-full h-full object-cover" />
              <button
                onClick={() => removePreview(i)}
                className="absolute top-0 right-0 bg-black text-white px-1"
              >
                ×
              </button>
            </div>
          ))}

          <textarea className="border p-2 md:col-span-3"
            placeholder="Material / Description"
            value={form.material_care}
            onChange={e => setForm({ ...form, material_care: e.target.value })}
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={editingId ? update : add}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          )}
        </div>

        {/* ================= LIST ================= */}
        <div className="mt-6 space-y-3">
          {products.map((p, index) => (
            <div
              key={p.id}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(index)}
              className={`border p-3 bg-white rounded shadow flex justify-between items-center cursor-move
                ${dragIndex === index ? "opacity-50" : ""}`}
            >
              <div>
                <p className="font-bold">{p.position}. {p.name}</p>
                <p>₹{p.priceObj.selling_price}</p>
              </div>

              <div className="flex gap-1">
                {p.imgdata?.images?.slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    className="w-16 h-16 object-cover"
                    src={Constants.base + img.src}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => edit(p)}
                  className="bg-indigo-600 text-white px-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="bg-red-600 text-white px-3"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductsAdmin;
