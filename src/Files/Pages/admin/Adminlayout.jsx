import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Constants } from "../../api/env";


/* ===================== LAYOUT ===================== */

function Layout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-gray-100">
      <aside className="bg-indigo-600 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `p-2 rounded ${
                isActive ? "bg-indigo-800" : "hover:bg-indigo-500"
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `p-2 rounded ${
                isActive ? "bg-indigo-800" : "hover:bg-indigo-500"
              }`
            }
          >
            Products
          </NavLink>
        </nav>
      </aside>

      <main className="p-6">{children}</main>
    </div>
  );
}

/* ===================== CATEGORIES ===================== */

function CategoriesAdmin() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "", imageUrl: "" });

  const load = async () => {
    const res = await fetch(`${Constants.base}/api/categories.php`);
    setList(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    await fetch(`${Constants.base}/api/categories.php`, {
      method: "POST",
      body: fd,
    });
    setForm({ name: "", slug: "", imageUrl: "" });
    load();
  };

  const del = async (id) => {
    await fetch(`${Constants.base}/api/categories.php`, {
      method: "DELETE",
      body: new URLSearchParams({ _id: id }),
    });
    load();
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Categories</h1>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <input
            className="border p-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
          <input
            className="border p-2"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>

        <button onClick={add} className="bg-black text-white px-4 py-2 mb-6">
          Add
        </button>

        {list.map((c) => (
          <div key={c._id} className="flex items-center gap-3 border p-3 mb-2">
            <img src={c.imageUrl} className="w-14 h-14 rounded" />
            <div className="flex-1">
              <p>ID:- {c._id}</p>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-500">{c.slug}</p>
            </div>
            <button onClick={() => del(c._id)} className="text-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

/* ===================== PRODUCTS ===================== */

export { CategoriesAdmin , Layout };
