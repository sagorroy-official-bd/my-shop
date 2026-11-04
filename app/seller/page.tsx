"use client";
import { useState } from "react";

export default function SellerPage() {
  const [shopCode, setShopCode] = useState("SHOP-01");
  const [shopName, setShopName] = useState("Gausia");
  const [owner, setOwner] = useState("");
  const [pName, setPName] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [retail, setRetail] = useState("");
  const [comment, setComment] = useState("");
  const [remark, setRemark] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [editId, setEditId] = useState<any>(null);

  const handleImage = (e: any) => {
    const files = Array.from(e.target.files).slice(0, 6);
    setImages(files.map((f: any) => URL.createObjectURL(f)));
  };

  const addDraft = () => {
    if (!pName) return alert("পণ্যের নাম দিন");
    if (editId) {
      setDrafts(drafts.map((d: any) => d.id === editId ? { ...d, pName, wholesale, retail, comment, remark, images } : d));
      setEditId(null); alert("Save হয়ে গেছে");
    } else {
      setDrafts([{ id: Date.now(), pName, wholesale, retail, comment, remark, images }, ...drafts]);
      alert("Draft-এ যোগ হয়েছে");
    }
    setPName(""); setWholesale(""); setRetail(""); setComment(""); setRemark(""); setImages([]);
  };

  const editDraft = (item: any) => {
    setEditId(item.id); setPName(item.pName); setWholesale(item.wholesale); setRetail(item.retail);
    setComment(item.comment); setRemark(item.remark); setImages(item.images || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteDraft = (id: any) => {
    if (!confirm("ডিলিট করবেন?")) return;
    setDrafts(drafts.filter((d: any) => d.id !== id));
  };

  const sendAdmin = () => {
    if (drafts.length === 0) return alert("Draft খালি");
    const all = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    const toSend = drafts.map((d: any) => ({ id: `${shopCode}-${String(all.length + 1).padStart(3, "0")}`, title: d.pName, wholesale: d.wholesale, retail: d.retail, comment: d.comment, remark: d.remark, images: d.images, shop: shopCode, approveStatus: "pending" }));
    localStorage.setItem("gausia_all_products", JSON.stringify([...toSend, ...all]));
    setDrafts([]); alert("Admin-এ পাঠানো হয়েছে");
  };

  return (
    <div style={{ background: "#fdfbf7", minHeight: "100vh" }}>
      {/* উপরের স্ট্যান্ডার্ড হেডার */}
      <div style={{ background: "white", borderBottom: "1px solid #eee", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ background: "black", color: "white", width: "38px", height: "38px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>G</div>
          <div><div style={{ fontWeight: 800, fontSize: "18px" }}>Gausia</div><div style={{ fontSize: "11px", color: "#888" }}>পাইকারি বাজার • Seller Panel</div></div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <a href="/" style={topBtn}>🏠 Home</a>
          <a href="/seller" style={{ ...topBtn, background: "black", color: "white" }}>Seller</a>
          <a href="/admin" style={topBtn}>Admin</a>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", padding: "20px", flexWrap: "wrap" }}>
        <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "420px", height: "fit-content" }}>
          <h2>🛍️ দোকান + পণ্য</h2>
          <input value={shopCode} onChange={(e) => setShopCode(e.target.value)} placeholder="SHOP-01" style={inputStyle} />
          <input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Gausia" style={inputStyle} />
          <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="মোবাইল" style={inputStyle} />
          <label style={labelStyle}>পণ্যের নাম - যেমন: বোরকা / শাড়ি / থ্রি-পিস</label>
          <input value={pName} onChange={(e) => setPName(e.target.value)} placeholder="এখানে পণ্যের নাম লিখুন" style={inputStyle} />
          <label style={labelStyle}>পাইকারি মূল্য</label>
          <input value={wholesale} onChange={(e) => setWholesale(e.target.value)} type="number" placeholder="পাইকারি মূল্য: ৫০০" style={inputStyle} />
          <label style={labelStyle}>খুচরা মূল্য</label>
          <input value={retail} onChange={(e) => setRetail(e.target.value)} type="number" placeholder="খুচরা মূল্য: ৮০০" style={inputStyle} />
          <label style={labelStyle}>📷 ছবি - একসাথে সর্বোচ্চ ৬টা</label>
          <input type="file" multiple accept="image/*" onChange={handleImage} style={inputStyle} />
          <p style={{ fontSize: "11px", color: "#888" }}>ছবি {images.length} / 6 টা</p>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>{images.map((img: any, i: number) => (<img key={i} src={img} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />))}</div>
          <label style={labelStyle}>মন্তব্য</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="মন্তব্য লিখুন" style={{ ...inputStyle, height: "60px" }} />
          <label style={labelStyle}>রিমার্ক</label>
          <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="রিমার্ক লিখুন" style={{ ...inputStyle, height: "60px" }} />
          <button onClick={addDraft} style={{ width: "100%", background: "black", color: "white", padding: "12px", borderRadius: "20px", border: "none", fontWeight: 700, marginTop: "10px", cursor: "pointer" }}>{editId ? "✅ Save - আপডেট করুন" : "+ Draft-এ যোগ করুন"}</button>
        </div>

        <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "420px", height: "fit-content" }}>
          <h3>👁️ প্রিভিউ - Draft</h3>
          <p>{drafts.length} টা পণ্য</p>
          {drafts.map((d: any) => (
            <div key={d.id} style={{ border: "1px solid #eee", padding: "10px", borderRadius: "12px", marginTop: "10px" }}>
              {d.images && d.images[0] && <img src={d.images[0]} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }} />}
              <b>{d.pName}</b><div>পাইকারি: {d.wholesale}৳ | খুচরা: {d.retail}৳</div><div>মন্তব্য: {d.comment} | রিমার্ক: {d.remark}</div>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button onClick={() => editDraft(d)} style={smallBtn("#f59e0b")}>✏️ Edit</button>
                <button onClick={() => deleteDraft(d.id)} style={smallBtn("#ef4444")}>🗑️ Delete</button>
              </div>
            </div>
          ))}
          <button onClick={sendAdmin} style={{ width: "100%", background: "green", color: "white", padding: "12px", borderRadius: "10px", border: "none", fontWeight: 700, marginTop: "12px", cursor: "pointer" }}>📤 Send Admin - {drafts.length} টা পণ্য</button>
        </div>
      </div>
    </div>
  );
}
const inputStyle: any = { width: "100%", border: "1px solid #ddd", borderRadius: "12px", padding: "10px 12px", marginBottom: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box" };
const labelStyle: any = { fontSize: "13px", fontWeight: 700, display: "block", marginBottom: "5px" };
const topBtn: any = { textDecoration: "none", color: "black", background: "#f3f3f3", padding: "8px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 700 };
const smallBtn = (bg: string): any => ({ flex: 1, background: bg, color: "white", padding: "7px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 700 });
