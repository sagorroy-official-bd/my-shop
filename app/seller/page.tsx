"use client";
import { useState, useEffect } from "react";

export default function SellerPage() {
  const [shopCode, setShopCode] = useState("SHOP-01");
  const [shopName, setShopName] = useState("Gausia");
  const [owner, setOwner] = useState("11111");
  const [pName, setPName] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [retail, setRetail] = useState("");
  const [comment, setComment] = useState("");
  const [remark, setRemark] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [editId, setEditId] = useState<any>(null);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("gausia_shop_info") || "{}");
    if (s.owner) setOwner(s.owner);
    if (s.shopCode) setShopCode(s.shopCode);
    if (s.shopName) setShopName(s.shopName);
  }, []);
  useEffect(() => { localStorage.setItem("gausia_shop_info", JSON.stringify({ shopCode, shopName, owner })); }, [shopCode, shopName, owner]);

  const handleImage = (e: any) => {
    const urls = Array.from(e.target.files).map((f: any) => URL.createObjectURL(f));
    setImages((p) => [...p, ...urls].slice(0, 6));
    e.target.value = "";
  };

  const addDraft = () => {
    if (!pName) return alert("পণ্যের নাম দিন");
    if (editId) { setDrafts(drafts.map((d: any) => d.id === editId ? { ...d, pName, wholesale, retail, comment, remark, images: [...images] } : d)); setEditId(null); alert("Save হয়ে গেছে"); }
    else { setDrafts([{ id: Date.now(), pName, wholesale, retail, comment, remark, images: [...images] }, ...drafts]); alert(images.length + " টা ছবি Draft-এ গেছে"); }
    setPName(""); setWholesale(""); setRetail(""); setComment(""); setRemark(""); setImages([]);
  };

  const editDraft = (item: any) => { setEditId(item.id); setPName(item.pName); setWholesale(item.wholesale); setRetail(item.retail); setComment(item.comment); setRemark(item.remark); setImages([...(item.images || [])]); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const deleteDraft = (id: any) => { if (confirm("ডিলিট করবেন?")) setDrafts(drafts.filter((d: any) => d.id !== id)); };
  const sendAdmin = () => {
    if (!drafts.length) return alert("Draft খালি");
    const all = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    const toSend = drafts.map((d: any) => ({ id: `${shopCode}-${all.length + 1}`, title: d.pName, wholesale: d.wholesale, retail: d.retail, comment: d.comment, remark: d.remark, images: d.images, shop: shopCode, owner, approveStatus: "pending" }));
    localStorage.setItem("gausia_all_products", JSON.stringify([...toSend, ...all])); setDrafts([]); alert("Admin-এ পাঠানো হয়েছে");
  };

  return (
    <div style={{ background: "#fdfbf7", minHeight: "100vh" }}>
      {/* ===== বর্ডার কালার সহ হেডার - কালো + মোটা হলুদ বর্ডার ===== */}
      <div style={{ background: "#111111", color: "white", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "6px solid #FF9900", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", position: "sticky", top: 0, zIndex: 99 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ background: "#FF9900", color: "black", width: "46px", height: "46px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "24px", border: "3px solid white" }}>G</div>
          <div><div style={{ fontWeight: 800, fontSize: "24px" }}>Gausia</div><div style={{ fontSize: "12px", color: "#FFCC00" }}>পাইকারি বাজার • Seller Panel</div></div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <a href="/" style={{ textDecoration: "none", color: "white", background: "#333", padding: "10px 16px", borderRadius: "20px", fontWeight: 700, border: "1px solid #555" }}>🏠 Home</a>
          <a href="/seller" style={{ textDecoration: "none", color: "black", background: "#FF9900", padding: "10px 16px", borderRadius: "20px", fontWeight: 800, border: "2px solid white" }}>Seller</a>
          <a href="/admin" style={{ textDecoration: "none", color: "white", background: "#333", padding: "10px 16px", borderRadius: "20px", fontWeight: 700, border: "1px solid #555" }}>⚙️ Admin</a>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", padding: "20px", flexWrap: "wrap" }}>
        <div style={{ background: "white", border: "3px solid #FF9900", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "420px", height: "fit-content" }}>
          <h2>🛍️ দোকান + পণ্য</h2>
          <input value={shopCode} onChange={(e) => setShopCode(e.target.value)} placeholder="SHOP-01" style={inp} />
          <input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Gausia" style={inp} />
          <label style={lab}>📱 মোবাইল - সেভ থাকবে</label>
          <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="01XXXXXXXXX" style={{ ...inp, border: "2px solid #111", fontWeight: 700 }} />
          <label style={lab}>পণ্যের নাম</label>
          <input value={pName} onChange={(e) => setPName(e.target.value)} placeholder="Test Sari" style={inp} />
          <label style={lab}>পাইকারি মূল্য</label>
          <input value={wholesale} onChange={(e) => setWholesale(e.target.value)} type="number" placeholder="500" style={inp} />
          <label style={lab}>খুচরা মূল্য</label>
          <input value={retail} onChange={(e) => setRetail(e.target.value)} type="number" placeholder="800" style={inp} />
          <label style={lab}>📷 ছবি - সর্বোচ্চ ৬টা</label>
          <input type="file" multiple accept="image/*" onChange={handleImage} style={inp} />
          <p style={{ fontWeight: 800 }}>ছবি {images.length} / 6 টা</p>

          {/* ===== আলাদা আলাদা ডিলিট - এখন বড় বাটন, চোখে পড়বে ===== */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {images.map((img: any, i: number) => (
              <div key={i} style={{ border: "2px solid #ddd", borderRadius: "12px", padding: "6px", background: "#fafafa" }}>
                <img src={img} style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "8px" }} />
                <div style={{ fontSize: "12px", fontWeight: 700, textAlign: "center", margin: "4px 0" }}>ছবি {i + 1}</div>
                <button onClick={() => setImages(images.filter((_: any, idx: number) => idx !== i))} style={{ width: "100%", background: "red", color: "white", border: "none", padding: "8px", borderRadius: "8px", fontWeight: 800, cursor: "pointer" }}>🗑️ এই ছবি ডিলিট</button>
              </div>
            ))}
          </div>

          <label style={lab}>মন্তব্য</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="মন্তব্য লিখুন" style={{ ...inp, height: "60px" }} />
          <label style={lab}>রিমার্ক</label>
          <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="রিমার্ক লিখুন" style={{ ...inp, height: "60px" }} />
          <button onClick={addDraft} style={{ width: "100%", background: "black", color: "white", padding: "13px", borderRadius: "20px", border: "none", fontWeight: 800, marginTop: "10px", cursor: "pointer" }}>{editId ? "✅ Save - আপডেট করুন" : `+ Draft-এ যোগ করুন (${images.length} ছবি)`}</button>
        </div>

        <div style={{ background: "white", border: "3px solid #111", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "430px", height: "fit-content" }}>
          <h3>👁️ প্রিভিউ - Draft</h3>
          <p>{drafts.length} টা পণ্য</p>
          {drafts.map((d: any) => (
            <div key={d.id} style={{ border: "2px solid #FF9900", padding: "10px", borderRadius: "12px", marginTop: "10px" }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: "green" }}>✅ এই ড্রাফটে {d.images?.length} টা ছবি আছে</div>
              {/* এখন সব ছবি দেখাবে */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "6px" }}>
                {(d.images || []).map((im: any, ii: number) => (<img key={ii} src={im} style={{ width: "100%", height: ii === 0 ? "170px" : "100px", objectFit: "cover", borderRadius: "10px", gridColumn: ii === 0 ? "span 2" : "span 1", border: "1px solid #ddd" }} />))}
              </div>
              <b style={{ display: "block", marginTop: "6px" }}>{d.pName}</b>
              <div>পাইকারি: {d.wholesale}৳ | খুচরা: {d.retail}৳</div><div>মন্তব্য: {d.comment} | রিমার্ক: {d.remark}</div>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button onClick={() => editDraft(d)} style={{ flex: 1, background: "#f59e0b", color: "white", padding: "8px", borderRadius: "8px", border: "none", fontWeight: 800 }}>✏️ Edit</button>
                <button onClick={() => deleteDraft(d.id)} style={{ flex: 1, background: "red", color: "white", padding: "8px", borderRadius: "8px", border: "none", fontWeight: 800 }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
          <button onClick={sendAdmin} style={{ width: "100%", background: "green", color: "white", padding: "12px", borderRadius: "10px", border: "none", fontWeight: 800, marginTop: "12px" }}>📤 Send Admin - {drafts.length} টা পণ্য</button>
        </div>
      </div>
    </div>
  );
}
const inp: any = { width: "100%", border: "1px solid #ddd", borderRadius: "12px", padding: "10px 12px", marginBottom: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box" };
const lab: any = { fontSize: "13px", fontWeight: 800, display: "block", marginBottom: "5px" };
