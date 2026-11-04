"use client";
import { useState, useEffect } from "react";

export default function SellerPage() {
  const [shop, setShop] = useState("SHOP-01");
  const [shopName, setShopName] = useState("Gawsia");
  const [phone, setPhone] = useState("1111111");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [desc, setDesc] = useState("");
  const [remark, setRemark] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ রিসাইজ অপশন - এটাই নতুন
  const [resize, setResize] = useState("500"); // 500 = সবচেয়ে ছোট, সবচেয়ে ফাস্ট
  const [status, setStatus] = useState("");

  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem("seller_drafts") || "[]"); setProducts(Array.isArray(d) ? d : []); }
    catch { setProducts([]); }
  }, []);

  const saveDrafts = (list: any[]) => {
    try { localStorage.setItem("seller_drafts", JSON.stringify(list)); setProducts(list); return true; }
    catch { alert("❌ এখনো ছবি বড় আছে। উপরে 'ছোট - 500px' সিলেক্ট করে আবার ছবি নেন"); return false; }
  };

  // রিসাইজ - অপশন অনুযায়ী সাইজ হবে
  const resizeOne = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let w = img.width, h = img.height;
          const MAX = Number(resize); // 400 / 500 / 700
          const Q = MAX <= 500 ? 0.55 : 0.7; // ছোট হলে কোয়ালিটিও কমবে, জায়গা বাঁচবে
          if (w > MAX) { h = (h * MAX) / w; w = MAX; }
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", Q));
        };
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (e: any) => {
    const files: File[] = Array.from(e.target.files || []);
    if (files.length === 0) return;
    if (images.length + files.length > 4) { alert("সর্বোচ্চ ৪টা ছবি"); return; }
    setStatus("⏳ " + files.length + " টা ছবি " + resize + "px-এ রিসাইজ হচ্ছে...");
    const out: string[] = [];
    for (const f of files) { out.push(await resizeOne(f)); }
    setImages([...images, ...out]);
    // কত KB হলো দেখানো
    const kb = Math.round(JSON.stringify(out).length / 1024);
    setStatus("✅ রিসাইজ শেষ! এখন ছবি মোট " + kb + " KB - " + resize + "px");
    e.target.value = "";
  };

  const addOrUpdate = () => {
    if (!name || !price) { alert("পণ্যের নাম আর পাইকারি মূল্য লাগবে"); return; }
    const item = { id: editId || Date.now(), shop, shopName, phone, name, price, oldPrice, desc, remark, images, img: images[0] || "" };
    let ok = false;
    if (editId) { ok = saveDrafts(products.map((p) => (p.id === editId ? item : p))); if (ok) alert("✅ Edit সেভ হয়েছে"); }
    else { ok = saveDrafts([...products, item]); if (ok) alert("✅ Draft-এ যোগ হয়েছে"); }
    if (!ok) return;
    setEditId(null); setImages([]); setName(""); setPrice(""); setOldPrice(""); setDesc(""); setRemark(""); setStatus("");
  };

  const doEdit = (p: any) => {
    setEditId(p.id); setShop(p.shop); setShopName(p.shopName); setPhone(p.phone);
    setName(p.name); setPrice(p.price); setOldPrice(p.oldPrice);
    setDesc(p.desc || ""); setRemark(p.remark || ""); setImages(p.images || (p.img ? [p.img] : []));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const doDelete = (id: number) => { if (!confirm("মুছে ফেলবো?")) return; saveDrafts(products.filter((p) => p.id !== id)); };

  const sendAdmin = () => {
    if (products.length === 0) { alert("আগে Draft-এ যোগ করেন"); return; }
    if (editId) { alert("আগে Edit সেভ করুন"); return; }
    try {
      const old = JSON.parse(localStorage.getItem("admin_pending") || "[]");
      const toSend = products.map((p) => ({ ...p, sentAt: new Date().toLocaleString("bn-BD") }));
      localStorage.setItem("admin_pending", JSON.stringify([...old, ...toSend]));
      localStorage.setItem("seller_drafts", JSON.stringify([]));
      setProducts([]); setImages([]); setStatus("");
      alert("✅ " + toSend.length + " টা পণ্য Admin-এ চলে গেছে! Seller এখন খালি।");
    } catch { alert("❌ জায়গা শেষ। 'ছোট - 500px' দিয়ে আবার ছবি নেন"); }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #eee" }}>
        <h3>{editId ? "✏️ Edit করতেছেন" : "🏪 দোকান + পণ্য"}</h3>
        <input value={shop} onChange={(e) => setShop(e.target.value)} placeholder="SHOP-01" style={inp} />
        <input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="দোকানের নাম" style={inp} />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="মোবাইল নাম্বার" style={inp} />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="পণ্যের নাম - যেমন: বোরকা / শাড়ি / থ্রি-পিস" style={inp} />
        <div style={hint}>↑ এখানে পণ্যের নাম লিখবেন</div>
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="পাইকারি মূল্য - যেমন: 500" style={inp} />
        <div style={hint}>↑ পাইকারি মূল্য</div>
        <input value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="খুচরা মূল্য - যেমন: 800" style={inp} />
        <div style={hint}>↑ খুচরা মূল্য</div>

        {/* ✅ রিসাইজ অপশন - এখানে রাখা হলো */}
        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 12, marginTop: 8, marginBottom: 10 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>📐 ছবি রিসাইজ অপশন - আগে এটা বেছে নেন</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <button onClick={() => setResize("400")} style={resizeBtn(resize === "400")}>ছোট<br />400px<br /><span style={{ fontSize: 11 }}>⚡ সবচেয়ে ফাস্ট</span></button>
            <button onClick={() => setResize("500")} style={resizeBtn(resize === "500")}>মাঝারি<br />500px<br /><span style={{ fontSize: 11 }}>✅ ভালো হবে</span></button>
            <button onClick={() => setResize("700")} style={resizeBtn(resize === "700")}>বড়<br />700px<br /><span style={{ fontSize: 11 }}>HD কোয়ালিটি</span></button>
          </div>
          <div style={{ fontSize: 12, color: "#166534", marginTop: 6 }}>এখন সিলেক্ট আছে: <b>{resize}px</b> - ৪টা ছবি নিলে <b>ছোট / মাঝারি</b> নিবেন, বড় নিলে জায়গা শেষ হয়ে যাবে।</div>
        </div>

        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>📸 ছবি - একসাথে ৪টা পর্যন্ত</div>
        <input type="file" accept="image/*" multiple onChange={handleFiles} style={{ ...inp, padding: 8 }} />
        {status && <div style={{ fontSize: 13, color: "#16A34A", fontWeight: 700, marginBottom: 8 }}>{status}</div>}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          {images.map((im, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img src={im} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: i === 0 ? "3px solid green" : "1px solid #ddd" }} />
              <button onClick={() => setImages(images.filter((_, x) => x !== i))} style={{ position: "absolute", top: -7, right: -7, background: "red", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20 }}>×</button>
              {i === 0 && <div style={{ fontSize: 10, textAlign: "center", color: "green", fontWeight: 800 }}>MAIN</div>}
            </div>
          ))}
        </div>

        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="মন্তব্য" style={{ ...inp, height: 50 }} />
        <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Remark - অ্যাডমিনের জন্য নোট" style={{ ...inp, height: 50 }} />
        <button onClick={addOrUpdate} style={{ width: "100%", background: editId ? "#FACC15" : "#111", color: editId ? "#111" : "#fff", padding: 13, borderRadius: 10, border: "none", fontWeight: 900 }}>
          {editId ? "✅ Edit সেভ করুন" : "+ Draft-এ যোগ করুন"}
        </button>
      </div>

      <div>
        <h3>👁️ প্রিভিউ</h3>
        {products.length === 0 && <div style={{ background: "#FEF3C7", padding: 12, borderRadius: 10 }}>Draft খালি</div>}
        {products.map((p) => (
          <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ display: "flex", overflowX: "auto" }}>
              {(p.images || [p.img]).filter(Boolean).map((im: string, i: number) => (
                <img key={i} src={im} style={{ width: 140, height: 140, objectFit: "cover" }} />
              ))}
            </div>
            <div style={{ padding: 12 }}>
              <b>{p.name}</b><br />
              <span style={{ fontSize: 13 }}>পাইকারি: {p.price}৳</span> <span style={{ fontSize: 13, color: "#666" }}>• খুচরা: {p.oldPrice}৳</span>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button onClick={() => doEdit(p)} style={{ flex: 1, background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800 }}>✏️ Edit</button>
                <button onClick={() => doDelete(p.id)} style={{ flex: 1, background: "#fff", border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={sendAdmin} style={{ width: "100%", background: "#16A34A", color: "#fff", padding: 14, border: "none", borderRadius: 12, fontWeight: 900 }}>📤 Send Admin - {products.length} টা পণ্য</button>
      </div>
    </div>
  );
}
const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 4, outline: "none", boxSizing: "border-box" };
const hint: any = { fontSize: 12, color: "#888", marginBottom: 10, marginTop: -2 };
const resizeBtn = (on: boolean): any => ({ flex: 1, padding: 10, borderRadius: 10, border: on ? "2px solid #16A34A" : "1px solid #ddd", background: on ? "#fff" : "#fff", fontWeight: 800, cursor: "pointer", textAlign: "center" });
