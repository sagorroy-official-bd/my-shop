"use client";
import { useState, useEffect } from "react";

const DB = "shopDB";
function idb(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains("kv")) r.result.createObjectStore("kv"); };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
async function idbGet(key: string): Promise<any> {
  const db = await idb();
  return new Promise((res) => {
    const tx = db.transaction("kv", "readonly"); const q = tx.objectStore("kv").get(key);
    q.onsuccess = () => res(q.result || null); q.onerror = () => res(null);
  });
}
async function idbSet(key: string, val: any) {
  const db = await idb();
  return new Promise<void>((res) => {
    const tx = db.transaction("kv", "readwrite"); tx.objectStore("kv").put(val, key);
    tx.oncomplete = () => res(); tx.onerror = () => res();
  });
}

export default function AdminPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const load = async () => {
    setPending((await idbGet("admin_pending")) || []);
    setProducts((await idbGet("admin_products")) || []);
  };
  useEffect(() => { load(); }, []);

  const approve = async (p: any) => {
    await idbSet("admin_pending", pending.filter((x) => x.id !== p.id));
    await idbSet("admin_products", [...products, { ...p, approvedAt: new Date().toLocaleString("bn-BD") }]);
    alert("✅ Approve হয়ে গেছে - Customer এখন দেখবে");
    load();
  };
  const reject = async (id: number) => {
    if (!confirm("Reject / Delete করবো?")) return;
    await idbSet("admin_pending", pending.filter((x) => x.id !== id));
    load();
  };
  const delProduct = async (id: number) => {
    if (!confirm("Product মুছে ফেলবো?")) return;
    await idbSet("admin_products", products.filter((x) => x.id !== id));
    load();
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <h2>👑 Admin Panel</h2>
      <h3>⏳ Pending - {pending.length} টা</h3>
      {pending.length === 0 && <div style={{ background: "#FEF3C7", padding: 12, borderRadius: 10 }}>Pending খালি - Seller থেকে Send করলে এখানে আসবে</div>}
      {pending.map((p) => (
        <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ display: "flex", overflowX: "auto" }}>
            {(p.images || [p.img]).filter(Boolean).map((im: string, i: number) => (
              <img key={i} src={im} style={{ width: 160, height: 160, objectFit: "cover" }} />
            ))}
          </div>
          <div style={{ padding: 12 }}>
            <b style={{ fontSize: 18 }}>{p.name}</b> <span style={{ fontSize: 12, color: "#666" }}>• {p.shop} - {p.shopName} - {p.phone}</span><br />
            <span>পাইকারি: {p.price}৳</span> <span style={{ color: "#666" }}>• খুচরা: {p.oldPrice}৳</span> <span>• {p.images?.length || 1} / ৪ টা ছবি</span><br />
            <span style={{ fontSize: 13, color: "#555" }}>মন্তব্য: {p.desc} | Remark: {p.remark}</span>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={() => approve(p)} style={{ flex: 1, background: "#16A34A", color: "#fff", border: "none", padding: 11, borderRadius: 8, fontWeight: 800 }}>✅ Approve</button>
              <button onClick={() => reject(p.id)} style={{ flex: 1, background: "#fff", border: "1px solid #ddd", padding: 11, borderRadius: 8 }}>🗑️ Reject</button>
            </div>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 30 }}>🛍️ Live Product - {products.length} টা</h3>
      {products.map((p) => (
        <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ display: "flex", overflowX: "auto" }}>
            {(p.images || [p.img]).filter(Boolean).map((im: string, i: number) => (
              <img key={i} src={im} style={{ width: 120, height: 120, objectFit: "cover" }} />
            ))}
          </div>
          <div style={{ padding: 12 }}><b>{p.name}</b> - পাইকারি {p.price}৳ • খুচরা {p.oldPrice}৳
            <button onClick={() => delProduct(p.id)} style={{ float: "right", background: "#fff", border: "1px solid #ddd", padding: "6px 10px", borderRadius: 8 }}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}
