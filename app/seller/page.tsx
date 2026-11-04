"use client";
import { useEffect, useState } from "react";

export default function SellerPage() {
  const [shop, setShop] = useState("SHOP-01");
  const [shopName, setShopName] = useState("Gawsia");
  const [phone, setPhone] = useState("1111111");
  const [name, setName] = useState("Borka");
  const [price, setPrice] = useState("500");
  const [oldPrice, setOldPrice] = useState("900");
  const [desc, setDesc] = useState("");
  const [remark, setRemark] = useState("");
  const [img, setImg] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("seller_drafts") || "[]"));
  }, []);

  const saveDraft = () => {
    const item = { id: Date.now(), shop, shopName, phone, name, price, oldPrice, desc, remark, img: img || "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600", tag: "NEW" };
    const next = [...products, item];
    localStorage.setItem("seller_drafts", JSON.stringify(next));
    setProducts(next);
    alert("✅ Draft সেভ হয়েছে");
  };

  const sendToAdmin = () => {
    if (products.length === 0) { alert("আগে Draft সেভ করেন"); return; }
    const pending = JSON.parse(localStorage.getItem("admin_pending") || "[]");
    // Seller এর সব Draft Admin এর Pending এ পাঠানো হবে
    const toSend = products.map(p => ({ ...p, sentAt: new Date().toLocaleString("bn-BD") }));
    localStorage.setItem("admin_pending", JSON.stringify([...pending, ...toSend]));
    alert(`✅ ${toSend.length} টা পণ্য Admin-এর কাছে পাঠানো হয়েছে! Admin Approve করলে Customer দেখবে`);
  };

  const del = (id: any) => {
    const next = products.filter(p => p.id !== id);
    localStorage.setItem("seller_drafts", JSON.stringify(next)); setProducts(next);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "Hind Siliguri", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #eee" }}>
        <h3 style={{ marginTop: 0 }}>🏪 দোকানের স্থায়ী ঠিকানা (ফিক্সড)</h3>
        <input value={shop} onChange={e => setShop(e.target.value)} placeholder="SHOP-01" style={inp} />
        <input value={shopName} onChange={e => setShopName(e.target.value)} placeholder="দোকানের নাম - Gawsia" style={inp} />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="মোবাইল নাম্বার" style={inp} />
        <h3>🛍️ পণ্য + ছবি এক জায়গায়</h3>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="পণ্যের নাম - Borka" style={inp} />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="দাম - 500" style={inp} />
        <input value={oldPrice} onChange={e => setOldPrice(e.target.value)} placeholder="আগের দাম - 900" style={inp} />
        <input value={img} onChange={e => setImg(e.target.value)} placeholder="ছবির লিংক (Image URL)" style={inp} />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="মন্তব্য / Comment" style={{ ...inp, height: 60 }} />
        <textarea value={remark} onChange={e => setRemark(e.target.value)} placeholder="Remark / অ্যাডমিনের জন্য নোট" style={{ ...inp, height: 60 }} />
        <button onClick={saveDraft} style={{ width: "100%", background: "#111", color: "#fff", padding: 12, borderRadius: 10, border: "none", fontWeight: 800, cursor: "pointer" }}>+ Draft-এ যোগ করুন</button>
      </div>

      <div>
        <h3>👁️ প্রোডাক্ট প্রিভিউ + Edit/Delete/Send</h3>
        {products.map(p => (
          <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
            <img src={p.img} style={{ width: "100%", height: 200, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
              <b>{p.name} - {p.price}৳</b> <del style={{ color: "#999" }}>{p.oldPrice}৳</del>
              <div style={{ fontSize: 12, color: "#666" }}>{p.shop} • {p.shopName}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button style={{ flex: 1, background: "#FACC15", border: "none", padding: 9, borderRadius: 8, fontWeight: 800 }}>✏️ Edit</button>
                <button onClick={() => del(p.id)} style={{ flex: 1, background: "#fff", border: "1px solid #ddd", padding: 9, borderRadius: 8 }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={sendToAdmin} style={{ width: "100%", background: "#16A34A", color: "#fff", padding: 14, border: "none", borderRadius: 12, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>📤 Send Admin - {products.length} টা পণ্য</button>
        <p style={{ fontSize: 12, color: "#666", textAlign: "center" }}>Send করলে পণ্য Admin-এর Pending-এ গিয়ে সংরক্ষণ হবে। Admin Approve করলেই Customer দেখবে।</p>
      </div>
    </div>
  );
}
const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10, outline: "none", boxSizing: "border-box" };
