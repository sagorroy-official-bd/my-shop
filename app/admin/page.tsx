"use client";
import { useState, useEffect } from "react";

function openDB(): Promise<any> {
  return new Promise((res, rej) => {
    const r = indexedDB.open("shopDB", 1);
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains("kv")) r.result.createObjectStore("kv"); };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
async function get(k: string) {
  const db = await openDB();
  return new Promise((res) => {
    const q = db.transaction("kv", "readonly").objectStore("kv").get(k);
    q.onsuccess = () => res(q.result || null); q.onerror = () => res(null);
  });
}
async function set(k: string, v: any) {
  const db = await openDB();
  return new Promise((res) => {
    const tx = db.transaction("kv", "readwrite"); tx.objectStore("kv").put(v, k);
    tx.oncomplete = () => res(true); tx.onerror = () => res(true);
  });
}

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editId, setEditId] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [stock, setStock] = useState("");
  const [freeDel, setFreeDel] = useState(false);
  const [desc, setDesc] = useState("");
  const [offer, setOffer] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => { load(); }, []);

  async function load() {
    let data: any = await get("products");
    if (!data) data = await get("admin_products");
    if (!data) data = await get("pending");
    if (!data) {
      try { const l = localStorage.getItem("products"); if (l) data = JSON.parse(l); } catch {}
    }
    if (Array.isArray(data)) setProducts(data);
    else if (data && Array.isArray(data.products)) setProducts(data.products);
    else if (data && Array.isArray(data.pending)) setProducts(data.pending);
  }

  async function save(next: any[]) {
    setProducts(next);
    await set("products", next);
    try { localStorage.setItem("products", JSON.stringify(next)); } catch {}
  }

  async function deleteProduct(id: any) {
    if (!confirm("এই প্রোডাক্টটা ডিলিট করবেন?")) return;
    const next = products.filter((x: any) => x.id !== id);
    await save(next);
    alert("ডিলিট হয়ে গেছে ✅");
  }

  function deleteImageFromList(pId: any, i: number, from: string) {
    if (from === "edit") {
      const next = images.filter((_, idx) => idx !== i);
      setImages(next);
      return;
    }
    const next = products.map((p: any) => {
      if (p.id === pId) {
        const imgs = (p.images || [p.img]).filter(Boolean).filter((_: any, idx: number) => idx !== i);
        return { ...p, images: imgs, img: imgs[0] || "" };
      }
      return p;
    });
    save(next);
  }

  function startEdit(p: any) {
    setEditId(p.id);
    setTitle(p.title || "");
    setPrice(String(p.price || ""));
    setOldPrice(String(p.oldPrice || p.old_price || ""));
    setColors(Array.isArray(p.colors) ? p.colors.join(", ") : (p.colors || ""));
    setSizes(Array.isArray(p.sizes) ? p.sizes.join(", ") : (p.sizes || ""));
    setStock(String(p.stock ?? ""));
    setFreeDel(!!p.freeDel);
    setDesc(p.desc || "");
    setOffer(p.offer || "");
    setImages(p.images || (p.img ? [p.img] : []));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveEdit() {
    if (!title) { alert("টাইটেল দেন"); return; }
    const next = products.map((p: any) => p.id === editId ? {
      ...p,
      title, price: Number(price) || 0, oldPrice: Number(oldPrice) || 0,
      colors: colors.split(",").map((s: string) => s.trim()).filter(Boolean),
      sizes: sizes.split(",").map((s: string) => s.trim()).filter(Boolean),
      stock: Number(stock) || 0, freeDel, desc, offer,
      images, img: images[0] || p.img || ""
    } : p);
    await save(next);
    setEditId(null);
    alert("সেভ হয়ে গেছে ✅");
  }

  function onFile(e: any) {
    const f = e.target.files?.[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { if (rd.result) setImages([...images, String(rd.result)]); };
    rd.readAsDataURL(f);
  }

  const pending = products.filter((p: any) => p.status === "pending" || !p.approved);
  const approved = products.filter((p: any) => p.status === "approved" || p.approved);
  const shown = filter === "pending" ? pending : filter === "approved" ? approved : products;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <div style={{ background: "#111", color: "#fff", padding: 16, borderRadius: 12 }}>
        <h2 style={{ margin: 0 }}>Admin Panel v1000 - Gawsia</h2>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Seller - Pending - Edit (ছবি ডিলিট) - Approve - Customer - ছবি ডিলিট সহ</div>
        <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => setFilter("all")} style={{ padding: "6px 12px", borderRadius: 8 }}>All - {products.length} টি</button>
          <button onClick={() => setFilter("pending")} style={{ padding: "6px 12px", borderRadius: 8 }}>Pending - {pending.length} টি</button>
          <button onClick={() => setFilter("approved")} style={{ padding: "6px 12px", borderRadius: 8 }}>Approved - {approved.length} টি</button>
        </div>
      </div>

      {editId && (
        <div style={{ background: "#FFF7ED", border: "2px solid #FACC15", padding: 16, borderRadius: 12, marginTop: 12 }}>
          <h3>Admin Edit - Customer দেখবে যেভাবে (ছবি ডিলিট সহ)</h3>
          <div style={{ background: "#fff", padding: 12, borderRadius: 10, border: "1px solid #FDBA74" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}><label>টাইটেল</label><br /><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="টাইটেল" style={{ width: "100%", padding: 8 }} /></div>
                <div><label>দাম</label><br /><input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="দাম" style={{ padding: 8, width: 120 }} /></div>
                <div><label>পুরনো দাম</label><br /><input value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="পুরনো দাম" style={{ padding: 8, width: 120 }} /></div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}><label>কালার (কমা দিয়ে)</label><br /><input value={colors} onChange={(e) => setColors(e.target.value)} placeholder="লাল, নীল" style={{ width: "100%", padding: 8 }} /></div>
                <div style={{ flex: 1 }}><label>সাইজ</label><br /><input value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="S, M, L" style={{ width: "100%", padding: 8 }} /></div>
                <div><label>স্টক</label><br /><input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="স্টক" style={{ padding: 8, width: 100 }} /></div>
              </div>
              <label><input type="checkbox" checked={freeDel} onChange={(e) => setFreeDel(e.target.checked)} /> ফ্রি ডেলিভারি</label>
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="বিবরণ" rows={3} style={{ padding: 8 }} />
              <input value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="অফার লিখুন" style={{ padding: 8 }} />
              <div>
                <b>ছবি ({images.length} টি) - ছবির উপরে ❌ চাপ দিলে ডিলিট হবে</b>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                  {images.map((im: string, i: number) => (
                    <div key={i} style={{ position: "relative", flexShrink: 0 }}>
                      <img src={im} style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 8 }} />
                      <button onClick={() => deleteImageFromList(editId, i, "edit")} title="ছবি ডিলিট" style={{ position: "absolute", top: 4, right: 4, background: "#DC2626", color: "#fff", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer" }}>❌</button>
                      <div style={{ position: "absolute", bottom: 4, left: 4, background: "#000", color: "#fff", fontSize: 11, padding: "2px 6px", borderRadius: 6 }}>ছবি {i + 1}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  <input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder="ছবির লিংক পেস্ট করেন" style={{ flex: 1, padding: 8, minWidth: 200 }} />
                  <button onClick={() => { if (imgUrl) { setImages([...images, imgUrl]); setImgUrl(""); } }} style={{ padding: "8px 14px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 8 }}>+ লিংক যোগ</button>
                  <label style={{ padding: "8px 14px", background: "#16A34A", color: "#fff", borderRadius: 8, cursor: "pointer" }}>+ ফাইল থেকে <input type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} /></label>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={saveEdit} style={{ background: "#16A34A", color: "#fff", padding: "10px 18px", border: "none", borderRadius: 8, cursor: "pointer" }}>Edit সেভ ✅</button>
                <button onClick={() => setEditId(null)} style={{ padding: "10px 18px", borderRadius: 8 }}>বাতিল</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
        {shown.length === 0 && <div style={{ padding: 20, textAlign: "center", background: "#fff", borderRadius: 12 }}>কোনো প্রোডাক্ট নাই</div>}
        {shown.map((p: any) => (
          <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", padding: 12, borderRadius: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(p.images || [p.img]).filter(Boolean).map((im: string, i: number) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={im} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8 }} />
                  <button onClick={() => deleteImageFromList(p.id, i, "list")} title="এই ছবি ডিলিট" style={{ position: "absolute", top: 2, right: 2, background: "#DC2626", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, padding: "2px 6px", cursor: "pointer" }}>🗑️ {i + 1}</button>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <b>{p.title}</b>
              <div>৳{p.price} {p.oldPrice ? <s style={{ opacity: 0.5 }}>৳{p.oldPrice}</s> : ""} {p.offer ? `- ${p.offer}` : ""}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{p.status || (p.approved ? "approved" : "pending")} | স্টক: {p.stock ?? "-"} {p.freeDel ? "| ফ্রি ডেলিভারি" : ""}</div>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "flex-start", flexWrap: "wrap" }}>
              <button onClick={() => startEdit(p)} style={{ background: "#F59E0B", color: "#fff", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer" }}>Edit</button>
              <button onClick={() => save(products.map((x: any) => x.id === p.id ? { ...x, status: "approved", approved: true } : x))} style={{ background: "#16A34A", color: "#fff", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer" }}>Approve</button>
              <button onClick={() => deleteProduct(p.id)} style={{ background: "#DC2626", color: "#fff", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer" }}>🗑️ ডিলিট</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
