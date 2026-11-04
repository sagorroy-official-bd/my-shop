"use client";
import { useState } from "react";

export default function SellerPage() {
  const [shopCode, setShopCode] = useState("SHOP-01");
  const [shopName, setShopName] = useState("Gausia");
  const [owner, setOwner] = useState("");
  const [pName, setPName] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [retail, setRetail] = useState("");
  const [stock, setStock] = useState("");
  const [remark, setRemark] = useState("");
  const [drafts, setDrafts] = useState<any[]>([]);

  const addDraft = () => {
    if (!pName) return alert("পণ্যের নাম দিন");
    const newItem = {
      id: Date.now(),
      pName, wholesale, retail, stock, remark
    };
    setDrafts([newItem, ...drafts]);
    setPName(""); setWholesale(""); setRetail(""); setStock(""); setRemark("");
    alert("Draft-এ যোগ হয়েছে");
  };

  const sendAdmin = () => {
    if (drafts.length === 0) return alert("Draft খালি");
    const all = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    const toSend = drafts.map((d: any) => ({
      id: `${shopCode}-${String(all.length + 1).padStart(3, "0")}`,
      title: d.pName,
      wholesale: d.wholesale,
      retail: d.retail,
      stock: d.stock,
      remark: d.remark,
      shop: shopCode,
      approveStatus: "pending",
    }));
    localStorage.setItem("gausia_all_products", JSON.stringify([...toSend, ...all]));
    setDrafts([]);
    alert("Admin-এ পাঠানো হয়েছে");
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", background: "#fdfbf7", minHeight: "100vh", flexWrap: "wrap" }}>
      {/* বাম পাশ - ফর্ম */}
      <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "420px" }}>
        <h2 style={{ fontWeight: 800 }}>🛍️ দোকান + পণ্য</h2>

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
        <input type="file" multiple accept="image/*" style={inputStyle} />
        <p style={{ fontSize: "11px", color: "#888" }}>ছবি 0 / 6 টা</p>

        <label style={labelStyle}>মজুদ</label>
        <textarea value={stock} onChange={(e) => setStock(e.target.value)} placeholder="মজুদ লিখুন" style={{ ...inputStyle, height: "60px" }} />

        <label style={labelStyle}>রিমার্ক</label>
        <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="রিমার্ক লিখুন" style={{ ...inputStyle, height: "60px" }} />

        <button onClick={addDraft} style={{ width: "100%", background: "black", color: "white", padding: "12px", borderRadius: "20px", border: "none", fontWeight: 700, marginTop: "10px", cursor: "pointer" }}>
          + Draft-এ যোগ করুন
        </button>
      </div>

      {/* ডান পাশ - প্রিভিউ */}
      <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "420px", height: "fit-content" }}>
        <h3>👁️ প্রিভিউ - Draft</h3>
        <p>Draft খালি - {drafts.length} টা পণ্য</p>
        {drafts.map((d: any) => (
          <div key={d.id} style={{ border: "1px solid #eee", padding: "10px", borderRadius: "10px", marginTop: "8px" }}>
            <b>{d.pName}</b>
            <div>পাইকারি: {d.wholesale}৳ | খুচরা: {d.retail}৳</div>
            <div>মজুদ: {d.stock} | রিমার্ক: {d.remark}</div>
          </div>
        ))}
        <button onClick={sendAdmin} style={{ width: "100%", background: "green", color: "white", padding: "12px", borderRadius: "10px", border: "none", fontWeight: 700, marginTop: "12px", cursor: "pointer" }}>
          📤 Send Admin - {drafts.length} টা পণ্য
        </button>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder {
          color: #bbbbbb;
        }
      `}</style>
    </div>
  );
}

const inputStyle: any = {
  width: "100%",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "10px 12px",
  marginBottom: "10px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: any = {
  fontSize: "13px",
  fontWeight: 700,
  display: "block",
  marginBottom: "5px",
};
