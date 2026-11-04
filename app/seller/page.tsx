"use client";
import { useState, useEffect } from "react";

export default function SellerPage() {
  const [shopCode, setShopCode] = useState("SHOP-01");
  const [shopName, setShopName] = useState("Gausia");
  const [owner, setOwner] = useState("01111111111");
  const [pName, setPName] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [retail, setRetail] = useState("");
  const [comment, setComment] = useState("");
  const [remark, setRemark] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [editId, setEditId] = useState<any>(null);

  // ১. মোবাইল নাম্বার + দোকান সেভ থাকবে - রিফ্রেশ দিলেও যাবে না
  useEffect(() => {
    const saved = localStorage.getItem("gausia_shop_info");
    if (saved) {
      const s = JSON.parse(saved);
      setShopCode(s.shopCode || "SHOP-01");
      setShopName(s.shopName || "Gausia");
      setOwner(s.owner || "01111111111");
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("gausia_shop_info", JSON.stringify({ shopCode, shopName, owner }));
  }, [shopCode, shopName, owner]);

  // ২. ছবি যোগ হবে - আগেরটা মুছবে না, ৬টা পর্যন্ত
  const handleImage = (e: any) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f: any) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls].slice(0, 6));
    e.target.value = "";
  };

  // ৪. একটা করে ছবি ডিলিট
  const deleteOneImage = (idx: number) => {
    setImages(images.filter((_: any, i: number) => i !== idx));
  };

  const addDraft = () => {
    if (!pName) return alert("পণ্যের নাম দিন");
    if (images.length === 0) return alert("অন্তত ১টা ছবি দিন");
    if (editId) {
      setDrafts(drafts.map((d: any) => d.id === editId ? { ...d, pName, wholesale, retail, comment, remark, images: [...images] } : d));
      setEditId(null); alert("Save হয়ে গেছে");
    } else {
      setDrafts([{ id: Date.now(), pName, wholesale, retail, comment, remark, images: [...images] }, ...drafts]);
      alert("Draft-এ যোগ হয়েছে - " + images.length + " টা ছবি");
    }
    setPName(""); setWholesale(""); setRetail(""); setComment(""); setRemark(""); setImages([]);
  };

  const editDraft = (item: any) => {
    setEditId(item.id); setPName(item.pName); setWholesale(item.wholesale); setRetail(item.retail);
    setComment(item.comment); setRemark(item.remark); setImages([...(item.images || [])]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteDraft = (id: any) => {
    if (!confirm("ডিলিট করবেন?")) return;
    setDrafts(drafts.filter((d: any) => d.id !== id));
  };

  const sendAdmin = () => {
    if (drafts.length === 0) return alert("Draft খালি");
    const all = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    const toSend = drafts.map((d: any) => ({ id: `${shopCode}-${String(all.length + 1).padStart(3, "0")}`, title: d.pName, wholesale: d.wholesale, retail: d.retail, comment: d.comment, remark: d.remark, images: d.images, shop: shopCode, owner, approveStatus: "pending" }));
    localStorage.setItem("gausia_all_products", JSON.stringify([...toSend, ...all]));
    setDrafts([]); alert("Admin-এ পাঠানো হয়েছে");
  };

  return (
    <div style={{ background: "#fdfbf7", minHeight: "100vh", margin: 0, padding: 0 }}>
      {/* ===== ৩. হেডার ডিজাইন - ফুল ডিজাইন ===== */}
      <div style={{ background: "linear-gradient(90deg,#111,#333)", color: "white", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "4px solid #f59e0b", position: "sticky", top: 0, zIndex: 99 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ background: "#f59e0b", color: "black", width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "22px", border: "2px solid white" }}>G</div>
          <div><div style={{ fontWeight: 800, fontSize: "22px", lineHeight: 1 }}>Gausia</div><div style={{ fontSize: "11px", color: "#fbbf24" }}>পাইকারি বাজার • Seller Panel • {shopCode}</div></div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <a href="/" style={topBtnWhite}>🏠 Home</a>
          <a href="/seller" style={{ ...topBtnWhite, background: "#f59e0b", color: "black" }}>Seller</a>
          <a href="/admin" style={topBtnWhite}>⚙️ Admin</a>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", padding: "20px", flexWrap: "wrap" }}>
        <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "420px", height: "fit-content" }}>
          <h2>🛍️ দোকান + পণ্য</h2>
          <input value={shopCode} onChange={(e) => setShopCode(e.target.value)} placeholder="SHOP-01" style={inputStyle} />
          <input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Gausia" style={inputStyle} />
          <label style={labelStyle}>📱 মোবাইল নাম্বার - সেভ থাকবে</label>
          <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="01XXXXXXXXX" style={{ ...inputStyle, border: "2px solid #111", fontWeight: 700 }} />
          <label style={labelStyle}>পণ্যের নাম - যেমন: বোরকা / শাড়ি / থ্রি-পিস</label>
          <input value={pName} onChange={(e) => setPName(e.target.value)} placeholder="এখানে পণ্যের নাম লিখুন" style={inputStyle} />
          <label style={labelStyle}>পাইকারি মূল্য</label>
          <input value={wholesale} onChange={(e) => setWholesale(e.target.value)} type="number" placeholder="পাইকারি মূল্য: ৫০০" style={inputStyle} />
          <label style={labelStyle}>খুচরা মূল্য</label>
          <input value={retail} onChange={(e) => setRetail(e.target.value)} type="number" placeholder="খুচরা মূল্য: ৮০০" style={inputStyle} />
          <label style={labelStyle}>📷 ছবি - একসাথে সর্বোচ্চ ৬টা - বার বার যোগ করা যাবে</label>
          <input type="file" multiple accept="image/*" onChange={handleImage} style={inputStyle} />
          <p style={{ fontSize: "12px", fontWeight: 700 }}>ছবি {images.length} / 6 টা - ❌ চাপলে একটা করে ডিলিট হবে</p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {images.map((img: any, i: number) => (
              <div key={i} style={{ position: "relative", width: "70px", height: "70px" }}>
                <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", border: "1px solid #ddd" }} />
                <button onClick={() => deleteOneImage(i)} style={{ position: "absolute", top: "-8px", right: "-8px", background: "red", color: "white", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", fontWeight: 800 }}>×</button>
              </div>
            ))}
          </div>
          <label style={labelStyle}>মন্তব্য</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="মন্তব্য লিখুন" style={{ ...inputStyle, height: "60px" }} />
          <label style={labelStyle}>রিমার্ক</label>
          <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="রিমার্ক লিখুন" style={{ ...inputStyle, height: "60px" }} />
          <button onClick={addDraft} style={{ width: "100%", background: "black", color: "white", padding: "12px", borderRadius: "20px", border: "none", fontWeight: 700, marginTop: "10px", cursor: "pointer" }}>{editId ? "✅ Save - আপডেট করুন" : `+ Draft-এ যোগ করুন (${images.length} ছবি)`}</button>
        </div>

        <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "420px", height: "fit-content" }}>
          <h3>👁️ প্রিভিউ - Draft</h3>
          <p>{drafts.length} টা পণ্য</p>
          {drafts.map((d: any) => (
            <div key={d.id} style={{ border: "2px solid #eee", padding: "10px", borderRadius: "12px", marginTop: "10px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {(d.images || []).map((img: any, ii: number) => (
                  <img key={ii} src={img} style={{ width: "100%", height: ii === 0 ? "160px" : "90px", objectFit: "cover", borderRadius: "10px", gridColumn: ii === 0 ? "span 2" : "span 1" }} />
                ))}
              </div>
              <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{d.images?.length} টা ছবি • মোবাইল: {owner}</div>
              <b style={{ marginTop: "4px", display: "block" }}>{d.pName}</b>
              <div>পাইকারি: {d.wholesale}৳ | খুচরা: {d.retail}৳</div>
              <div>মন্তব্য: {d.comment} | রিমার্ক: {d.remark}</div>
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
const topBtnWhite: any = { textDecoration: "none", color: "white", background: "rgba(255,255,255,0.15)", padding: "9px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 700, border: "1px solid rgba(255,255,255,0.3)", display: "inline-block" };
const smallBtn = (bg: string): any => ({ flex: 1, background: bg, color: "white", padding: "7px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 700 });
