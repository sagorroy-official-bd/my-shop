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

  useEffect(() => { load(); }, []);

  async function load() {
    let all: any[] = [];
    const keys = ["products", "admin_products", "pending", "approved_products", "approved", "seller_products", "sellerProducts"];
    for (const k of keys) {
      try {
        const d: any = await get(k);
        if (Array.isArray(d)) all = [...all, ...d];
        else if (d && Array.isArray(d.products)) all = [...all, ...d.products];
        else if (d && Array.isArray(d.pending)) all = [...all, ...d.pending];
      } catch {}
    }
    try {
      const l1 = localStorage.getItem("products"); if (l1) all = [...all, ...JSON.parse(l1)];
      const l2 = localStorage.getItem("pending"); if (l2) all = [...all, ...JSON.parse(l2)];
      const l3 = localStorage.getItem("approved_products"); if (l3) all = [...all, ...JSON.parse(l3)];
    } catch {}
    const seen = new Set(); const clean: any[] = [];
    for (const p of all) {
      if (!p || !p.id) continue;
      if (seen.has(String(p.id))) continue;
      seen.add(String(p.id));
      if (!p.isCustom) { p.isOriginal = true; p.isCustom = false; }
      clean.push(p);
    }
    if (clean.length > 0) setProducts(clean);
  }

  async function save(next: any[]) {
    setProducts(next);
    await set("products", next);
    await set("admin_products", next);
    await set("pending", next.filter((x: any) => !x.isCustom));
    const approved = next.filter((x: any) => x.status === "approved" || x.approved);
    await set("approved_products", approved);
    await set("approved", approved);
    try {
      localStorage.setItem("products", JSON.stringify(next));
      localStorage.setItem("approved_products", JSON.stringify(approved));
    } catch {}
  }

  async function deleteProduct(id: any) {
    if (!confirm("এই কপিটা ডিলিট করবেন?")) return;
    await save(products.filter((x: any) => x.id !== id));
  }

  async function makeCustomCopy(p: any) {
    const copy = {
      ...p,
      id: p.id + "-custom-" + Date.now(),
      originalId: p.id,
      isCustom: true,
      isOriginal: false,
      status: "custom",
      approved: false,
      title: p.title,
    };
    await save([...products, copy]);
    alert("কাস্টমাইজ কপি বানানো হয়ে গেছে ✅ এখন নিচে ২ নম্বরে Edit করেন");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  function addLink() {
    const url = imgUrl.trim();
    if (!url) { alert("আগে 'ছবির লিংক পেস্ট করেন' বক্সে লিংক পেস্ট করেন"); return; }
    if (!url.startsWith("http") && !url.startsWith("data:")) { alert("সঠিক লিংক দেন - https:// দিয়ে শুরু হতে হবে"); return; }
    const next = [...images, url];
    setImages(next);
    setImgUrl("");
    alert("ছবি যোগ হয়ে গেছে ✅ এখন Edit সেভ দেন - ছবি এখন " + next.length + " টি");
  }

  function deleteImageFromList(pId: any, i: number, from: string) {
    if (from === "edit") { setImages(images.filter((_, idx) => idx !== i)); return; }
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
    if (p.isOriginal) { alert("এইটা অরিজিনাল কপি - এটা এডিট করা যাবে না। 'কাস্টমাইজ কপি বানান' চাপ দেন, ওই কপিটা এডিট করেন"); return; }
    setEditId(p.id);
    setTitle(p.title || "");
    setPrice(String(p.price || ""));
    setOldPrice(String(p.oldPrice || ""));
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
      ...p, title, price: Number(price) || 0, oldPrice: Number(oldPrice) || 0,
      colors: colors.split(",").map((s: string) => s.trim()).filter(Boolean),
      sizes: sizes.split(",").map((s: string) => s.trim()).filter(Boolean),
      stock: Number(stock) || 0, freeDel, desc, offer,
      images, img: images[0] || p.img || ""
    } : p);
    await save(next);
    setEditId(null);
    alert("কাস্টমাইজ কপি সেভ হয়ে গেছে ✅ এখন Approve দিলে কাস্টমার দেখবে");
  }

  async function approveCustom(p: any) {
    if (!confirm("এই কাস্টমাইজ কপিটা কাস্টমার পেজে পাঠাবেন?")) return;
    const next = products.map((x: any) => x.id === p.id ? { ...x, status: "approved", approved: true } : x);
    await save(next);
    alert("কাস্টমার পেজে পাঠানো হয়ে গেছে ✅ এখন কাস্টমার লিংক খুলে দেখেন");
  }

  function onFile(e: any) {
    const f = e.target.files?.[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { if (rd.result) setImages([...images, String(rd.result)]); };
    rd.readAsDataURL(f);
  }

  const originals = products.filter((p: any) => p.isOriginal && !p.isCustom);
  const customs = products.filter((p: any) => p.isCustom);
  const approved = products.filter((p: any) => p.status === "approved" || p.approved);

  function Card({ p }: { p: any }) {
    return (
      <div style={{ background: "#fff", border: "1px solid #eee", padding: 12, borderRadius: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(p.images || [p.img]).filter(Boolean).map((im: string, i: number) => (
            <div key={i} style={{ position: "relative" }}>
              <img src={im} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8 }} />
              {!p.isOriginal && <button onClick={() => deleteImageFromList(p.id, i, "list")} style={{ position: "absolute", top: 2, right: 2, background: "#DC2626", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, padding: "2px 6px", cursor: "pointer" }}>🗑️ {i + 1}</button>}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <b>{p.title}</b> {p.isOriginal ? <span style={{ background: "#FEF3C7", padding: "2px 8px", borderRadius: 20, fontSize: 11 }}>ORIGINAL - সেলারেরটা</span> : <span style={{ background: "#DBEAFE", padding: "2px 8px", borderRadius: 20, fontSize: 11 }}>CUSTOM - আমারটা</span>}
          <div>৳{p.price} {p.oldPrice ? <s style={{ opacity: 0.5 }}>৳{p.oldPrice}</s> : ""} {p.offer ? `- ${p.offer}` : ""}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{p.status} | স্টক: {p.stock ?? "-"}</div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "flex-start", flexWrap: "wrap" }}>
          {p.isOriginal && <button onClick={() => makeCustomCopy(p)} style={{ background: "#2563EB", color: "#fff", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer" }}>📋 কাস্টমাইজ কপি বানান</button>}
          {!p.isOriginal && <button onClick={() => startEdit(p)} style={{ background: "#F59E0B", color: "#fff", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer" }}>Edit</button>}
          {!p.isOriginal && !(p.status === "approved" || p.approved) && <button onClick={() => approveCustom(p)} style={{ background: "#16A34A", color: "#fff", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer" }}>✅ Approve - কাস্টমারে পাঠান</button>}
          {(p.status === "approved" || p.approved) && <span style={{ background: "#DCFCE7", padding: "8px 12px", borderRadius: 8, fontSize: 12 }}>✅ কাস্টমার পেজে আছে</span>}
          <button onClick={() => deleteProduct(p.id)} style={{ background: "#DC2626", color: "#fff", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer" }}>🗑️ ডিলিট</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <div style={{ background: "#111", color: "#fff", padding: 16, borderRadius: 12 }}>
        <h2 style={{ margin: 0 }}>Admin Panel v1002 - Gawsia</h2>
        <div style={{ fontSize: 13, opacity: 0.8 }}>১. সেলার অরিজিনাল সংরক্ষণ → ২. কাস্টমাইজ কপি → ৩. Approve দিয়ে কাস্টমারে পাঠান</div>
        <div style={{ marginTop: 8, fontSize: 13 }}>অরিজিনাল: {originals.length} টি | কাস্টমাইজ: {customs.length} টি | কাস্টমারে গেছে: {approved.length} টি</div>
      </div>

      {editId && (
        <div style={{ background: "#FFF7ED", border: "2px solid #FACC15", padding: 16, borderRadius: 12, marginTop: 12 }}>
          <h3>কাস্টমাইজ Edit - শুধু আমার কপিটা বদলাচ্ছেন, অরিজিনাল বদলাবে না</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}><label>টাইটেল</label><br /><input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: 8 }} /></div>
              <div><label>দাম</label><br /><input value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: 8, width: 120 }} /></div>
              <div><label>পুরনো দাম</label><br /><input value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} style={{ padding: 8, width: 120 }} /></div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}><label>কালার (কমা দিয়ে)</label><br /><input value={colors} onChange={(e) => setColors(e.target.value)} style={{ width: "100%", padding: 8 }} /></div>
              <div style={{ flex: 1 }}><label>সাইজ</label><br /><input value={sizes} onChange={(e) => setSizes(e.target.value)} style={{ width: "100%", padding: 8 }} /></div>
              <div><label>স্টক</label><br /><input value={stock} onChange={(e) => setStock(e.target.value)} style={{ padding: 8, width: 100 }} /></div>
            </div>
            <label><input type="checkbox" checked={freeDel} onChange={(e) => setFreeDel(e.target.checked)} /> ফ্রি ডেলিভারি</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="বিবরণ" rows={3} style={{ padding: 8 }} />
            <input value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="অফার লিখুন - যেমন ২০% ছাড়" style={{ padding: 8 }} />
            <div>
              <b>ছবি ({images.length} টি) - ছবির উপরে ❌ চাপ দিলে ডিলিট হবে</b>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                {images.map((im: string, i: number) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={im} style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 8 }} />
                    <button onClick={() => deleteImageFromList(editId, i, "edit")} style={{ position: "absolute", top: 4, right: 4, background: "#DC2626", color: "#fff", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer" }}>❌</button>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder="ছবির লিংক পেস্ট করেন - https://..." style={{ flex: 1, padding: 8, minWidth: 220 }} />
                <button onClick={addLink} style={{ padding: "8px 14px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>+ লিংক যোগ</button>
                <label style={{ padding: "8px 14px", background: "#16A34A", color: "#fff", borderRadius: 8, cursor: "pointer" }}>+ ফাইল থেকে <input type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} /></label>
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>নিয়ম: লিংক পেস্ট → + লিংক যোগ → ছবি বাড়বে → Edit সেভ ✅</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={saveEdit} style={{ background: "#16A34A", color: "#fff", padding: "10px 18px", border: "none", borderRadius: 8 }}>Edit সেভ ✅</button>
              <button onClick={() => setEditId(null)} style={{ padding: "10px 18px", borderRadius: 8 }}>বাতিল</button>
            </div>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: 20 }}>📦 ১. সেলারের দেওয়া পেজ - অরিজিনাল ১ কপি সংরক্ষণ (এটা এডিট হবে না)</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {originals.length === 0 && <div style={{ padding: 20, background: "#fff", borderRadius: 12 }}>কোনো অরিজিনাল নাই</div>}
        {originals.map((p: any) => <Card key={p.id} p={p} />)}
      </div>

      <h3 style={{ marginTop: 20 }}>✏️ ২. আমার কাস্টমাইজ কপি - মার্কেটিং-এর জন্য এটা এডিট করবেন</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {customs.length === 0 && <div style={{ padding: 20, background: "#FEF3C7", borderRadius: 12 }}>এখনো কাস্টমাইজ কপি নাই। উপরে অরিজিনালে <b>📋 কাস্টমাইজ কপি বানান</b> চাপ দেন।</div>}
        {customs.map((p: any) => <Card key={p.id} p={p} />)}
      </div>

      <h3 style={{ marginTop: 20 }}>✅ ৩. কাস্টমার পেজে গেছে</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {approved.length === 0 && <div style={{ padding: 20, background: "#fff", borderRadius: 12 }}>এখনো কিছু কাস্টমারে যায় নাই</div>}
        {approved.map((p: any) => <Card key={p.id} p={p} />)}
      </div>
    </div>
  );
}
