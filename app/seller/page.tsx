"use client";
import { useState } from "react";

export default function SellerPage() {
  const [shopCode, setShopCode] = useState("SHOP-02");
  const [shopName, setShopName] = useState("GAWSIA");
  const [owner, setOwner] = useState("1111111111");
  const [pName, setPName] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [retail, setRetail] = useState("");
  const [comment, setComment] = useState("");
  const [remark, setRemark] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [editId, setEditId] = useState<any>(null);

  // ছবি সিলেক্ট
  const handleImage = (e: any) => {
    const files = Array.from(e.target.files).slice(0, 6);
    const urls = files.map((f: any) => URL.createObjectURL(f));
    setImages(urls);
  };

  // Draft-এ যোগ / Save (Edit এর পর)
  const addDraft = () => {
    if (!pName) return alert("পণ্যের নাম দিন");

    if (editId) {
      // Edit Save
      const updated = drafts.map((d: any) =>
        d.id === editId
          ? { ...d, pName, wholesale, retail, comment, remark, images }
          : d
      );
      setDrafts(updated);
      setEditId(null);
      alert("Save হয়ে গেছে");
    } else {
      const newItem = {
        id: Date.now(),
        pName, wholesale, retail, comment, remark, images,
      };
      setDrafts([newItem, ...drafts]);
      alert("Draft-এ যোগ হয়েছে");
    }
    setPName(""); setWholesale(""); setRetail(""); setComment(""); setRemark(""); setImages([]);
  };

  // Edit বাটন - ফর্মে তুলবে
  const editDraft = (item: any) => {
    setEditId(item.id);
    setPName(item.pName);
    setWholesale(item.wholesale);
    setRetail(item.retail);
    setComment(item.comment);
    setRemark(item.remark);
    setImages(item.images);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete বাটন
  const deleteDraft = (id: any) => {
    if (!confirm("এই পণ্যটা ডিলিট করবেন?")) return;
    setDrafts(drafts.filter((d: any) => d.id !== id));
  };

  const sendAdmin = () => {
    if (drafts.length === 0) return alert("Draft খালি");
    const all = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    const toSend = drafts.map((d: any) => ({
      id: `${shopCode}-${String(all.length + 1).padStart(3, "0")}`,
      title: d.pName,
      wholesale: d.wholesale,
      retail: d.retail,
      comment: d.comment,
      remark: d.remark,
      images: d.images,
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
      <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "420px", height: "fit-content" }}>
        <h2 style={{ fontWeight: 800 }}>🛍️ দোকান + পণ্য</h2>

        <input value={shopCode} onChange={(e) => setShopCode(e.target.value)} placeholder="SHOP-02" style={inputStyle} />
        <input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="GAWSIA" style={inputStyle} />
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
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {images.map((img: any, i: number) => (
            <img key={i} src={img} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
          ))}
        </div>

        <label style={labelStyle}>মন্তব্য</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="মন্তব্য লিখুন" style={{ ...inputStyle, height: "60px" }} />

        <label style={labelStyle}>রিমার্ক</label>
        <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="রিমার্ক লিখুন" style={{ ...inputStyle, height: "60px" }} />

        <button onClick={addDraft} style={{ width: "100%", background: "black", color: "white", padding: "12px", borderRadius: "20px", border: "none", fontWeight: 700, marginTop: "10px", cursor: "pointer" }}>
          {editId ? "✅ Save - আপডেট করুন" : "+ Draft-এ যোগ করুন"}
        </button>
        {editId && (
          <button onClick={() => { setEditId(null); setPName(""); setWholesale(""); setRetail(""); setComment(""); setRemark(""); setImages([]); }} style={{ width: "100%", background: "#eee", padding: "10px", borderRadius: "20px", border: "none", marginTop: "8px", cursor: "pointer" }}>
            বাতিল করুন
          </button>
        )}
      </div>

      {/* ডান পাশ - প্রিভিউ Draft */}
      <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "420px", height: "fit-content" }}>
        <h3>👁️ প্রিভিউ - Draft</h3>
        <p>Draft খালি - {drafts.length} টা পণ্য</p>

        {drafts.map((d: any) => (
          <div key={d.id} style={{ border: "1px solid #eee", padding: "10px", borderRadius: "12px", marginTop: "10px" }}>
            {d.images && d.images[0] && (
              <img src={d.images[0]} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }} />
            )}
            <b style={{ fontSize: "16px" }}>{d.pName}</b>
            <div style={{ marginTop: "4px" }}>পাইকারি: {d.wholesale}৳ | খুচরা: {d.retail}৳</div>
            <div>মন্তব্য: {d.comment} | রিমার্ক: {d.remark}</div>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <button onClick={() => editDraft(d)} style={smallBtn("#f59e0b")}>✏️ Edit</button>
              <button onClick={() => deleteDraft(d.id)} style={smallBtn("#ef4444")}>🗑️ Delete</button>
            </div>
          </div>
        ))}

        <button onClick={sendAdmin} style={{ width: "100%", background: "green", color: "white", padding: "12px", borderRadius: "10px", border: "none", fontWeight: 700, marginTop: "12px", cursor: "pointer" }}>
          📤 Send Admin - {drafts.length} টা পণ্য
        </button>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder { color: #bbbbbb; }
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

const smallBtn = (bg: string): any => ({
  flex: 1, background: bg, color: "white", padding: "7px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 700,
});
