"use client";
import { useEffect, useState } from "react";

export default function SellerPage() {
  const [shop, setShop] = useState("SHOP-01");
  const [shopName, setShopName] = useState("Gawsia");
  const [phone, setPhone] = useState("1111111");
  const [name, setName] = useState("Borka");
  const [price, setPrice] = useState("500");
  const [oldPrice, setOldPrice] = useState("900");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [remark, setRemark] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [editId, setEditId] = useState<any>(null);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("seller_drafts") || "[]"));
  }, []);

  const saveAll = (list: any[]) => {
    localStorage.setItem("seller_drafts", JSON.stringify(list));
    setProducts(list);
  };

  // ছবি ফাইল থেকে তোলা - লিংক লাগবে না
  const onFile = (e: any) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImg(String(r.result));
    r.readAsDataURL(f);
  };

  const saveDraft = () => {
    if (!name || !price) { alert("নাম আর দাম দেন"); return; }
    const item = { id: editId || Date.now(), shop, shopName, phone, name, price, oldPrice, desc, remark, img: img || "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600", tag: "NEW" };
    if (editId) {
      saveAll(products.map(p => p.id === editId ? item : p));
      alert("✅ Edit হয়ে গেছে!");
    } else {
      saveAll([...products, item]);
      alert("✅ Draft-এ যোগ হয়েছে!");
    }
    setEditId(null);
  };

  // ✅ EDIT - এখন কাজ করবে, ফর্মে সব তথ্য ফেরত আসবে
  const startEdit = (p: any) => {
    setEditId(p.id);
    setShop(p.shop); setShopName(p.shopName); setPhone(p.phone);
    setName(p.name); setPrice(p.price); setOldPrice(p.oldPrice);
    setImg(p.img); setDesc(p.desc || ""); setRemark(p.remark || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
    alert("এখন বামে Edit করেন, তারপর কালো বাটন চাপ দেন");
  };

  // ✅ DELETE - এখন কাজ করবে
  const del = (id: any) => {
    if (!confirm("এই পণ্যটা মুছে ফেলবো?")) return;
    saveAll(products.filter(p => p.id !== id));
  };

  // ✅ SEND ADMIN - এখন কাজ করবে
  const sendToAdmin = () => {
    if (products.length === 0) { alert("আগে Draft-এ যোগ করেন"); return; }
    const pending = JSON.parse(localStorage.getItem("admin_pending") || "[]");
    const toSend = products.map(p => ({ ...p, sentAt: new Date().toLocaleString("bn-BD") }));
    localStorage.setItem("admin_pending", JSON.stringify([...pending, ...toSend]));
    alert(`✅ ${toSend.length} টা পণ্য Admin-এর Pending-এ গেছে! এখন Admin পেজে গিয়ে Approve করেন`);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "Hind Siliguri", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #eee" }}>
        <h3 style={{ marginTop: 0 }}>{editId ? "✏️ Edit করতেছেন..." : "🏪 দোকানের স্থায়ী ঠিকানা (ফিক্সড)"}</h3>
        <input value={shop} onChange={e => setShop(e.target.value)} placeholder="SHOP-01" style={inp} />
        <input value={shopName} onChange={e => setShopName(e.target.value)} placeholder="Gawsia" style={inp} />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="মোবাইল" style={inp} />
        <h3>🛍️ পণ্য + ছবি এক জায়গায়</h3>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Borka" style={inp} />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="500" style={inp} />
        <input value={oldPrice} onChange={e => setOldPrice(e.target.value)} placeholder="900" style={inp} />

        {/* ছবির ২টা অপশন */}
        <label style={{ fontSize: 13, fontWeight: 700 }}>📸 ছবি - ফাইল থেকে নিন (সহজ)</label>
        <input type="file" accept="image/*" onChange={onFile} style={{ ...inp, padding: 8 }} />
        <input value={img} onChange={e => setImg(e.target.value)} placeholder="অথবা ছবির লিংক (Image URL) - https://..." style={inp} />
        {img && <img src={img} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 10 }} />}

        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="মন্তব্য / Comment" style={{ ...inp, height: 50 }} />
        <textarea value={remark} onChange={e => setRemark(e.target.value)} placeholder="Remark / অ্যাডমিনের জন্য নোট" style={{ ...inp, height: 50 }} />
        <button onClick={saveDraft} style={{ width: "100%", background: editId ? "#FACC15" : "#111", color: editId ? "#111" : "#fff", padding: 13, borderRadius: 10, border: "none", fontWeight: 900, cursor: "pointer" }}>
          {editId ? "✅ Edit সেভ করুন" : "+ Draft-এ যোগ করুন"}
        </button>
        {editId && <button onClick={() => setEditId(null)} style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 10, border: "1px solid #ddd", background: "#fff" }}>❌ Edit বাতিল</button>}
      </div>

      <div>
        <h3>👁️ প্রোডাক্ট প্রিভিউ + Edit/Delete/Send</h3>
        {products.length === 0 && <div style={{ background: "#FEF3C7", padding: 12, borderRadius: 10 }}>এখনো Draft খালি। বামে ফর্ম পূরণ করে Draft-এ যোগ করেন।</div>}
        {products.map(p => (
          <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
            <img src={p.img} style={{ width: "100%", height: 200, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
              <b>{p.name} - {p.price}৳</b> <del style={{ color: "#999" }}>{p.oldPrice}৳</del>
              <div style={{ fontSize: 12, color: "#666" }}>{p.shop} • {p.shopName}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button onClick={() => startEdit(p)} style={{ flex: 1, background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>✏️ Edit</button>
                <button onClick={() => del(p.id)} style={{ flex: 1, background: "#fff", border: "1px solid #ddd", padding: 10, borderRadius: 8, cursor: "pointer" }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={sendToAdmin} style={{ width: "100%", background: "#16A34A", color: "#fff", padding: 14, border: "none", borderRadius: 12, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>📤 Send Admin - {products.length} টা পণ্য</button>
      </div>
    </div>
  );
}
const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10, outline: "none", boxSizing: "border-box" };
