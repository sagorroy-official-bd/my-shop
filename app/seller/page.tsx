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
  const [status, setStatus] = useState("");
  const [storage, setStorage] = useState("");

  const calcStorage = () => {
    try {
      const total = (localStorage.getItem("seller_drafts") || "").length + (localStorage.getItem("admin_pending") || "").length + (localStorage.getItem("admin_products") || "").length;
      setStorage("ব্রাউজারে জমা: " + Math.round(total / 1024) + " KB / 5000 KB");
    } catch {}
  };

  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem("seller_drafts") || "[]"); setProducts(Array.isArray(d) ? d : []); } catch { setProducts([]); }
    calcStorage();
  }, []);

  // ✅ এক চাপে জায়গা খালি - আর Console লাগবে না
  const clearStorage = () => {
    if (!confirm("পুরনো বড় ছবিগুলা মুছে জায়গা খালি করবো? Seller Draft আর Pending খালি হয়ে যাবে।")) return;
    localStorage.removeItem("seller_drafts");
    localStorage.removeItem("admin_pending");
    // admin_products রাখলাম না, কারণ ওইটাও বড় ছবি দিয়ে ভরে গেছে
    setProducts([]); setImages([]); setStatus("✅ জায়গা খালি হয়ে গেছে! এখন নতুন করে ৪টা ছবি নেন");
    calcStorage();
    alert("✅ জায়গা খালি! এখন নতুন করে চেষ্টা করেন");
  };

  const autoResize = (file: File, targetKB = 45): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const trySizes = [500, 350, 250, 180];
          const tryQual = [0.6, 0.5, 0.45, 0.4];
          for (let i = 0; i < trySizes.length; i++) {
            const MAX = trySizes[i];
            let w = img.width, h = img.height;
            if (w > MAX) { h = (h * MAX) / w; w = MAX; }
            const c = document.createElement("canvas");
            c.width = w; c.height = h;
            c.getContext("2d")?.drawImage(img, 0, 0, w, h);
            const out = c.toDataURL("image/jpeg", tryQual[i]);
            if (Math.round(out.length / 1024) <= targetKB || i === trySizes.length - 1) { resolve(out); return; }
          }
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
    setStatus("⏳ অটো রিসাইজ হচ্ছে...");
    const out: string[] = [];
    for (const f of files) { out.push(await autoResize(f, 45)); }
    setImages([...images, ...out]);
    setStatus("✅ অটো রিসাইজ শেষ! ৪টা ছবি মোট " + Math.round(JSON.stringify(out).length / 1024) + " KB");
    e.target.value = "";
  };

  const saveDrafts = (list: any[]) => {
    try { localStorage.setItem("seller_drafts", JSON.stringify(list)); setProducts(list); calcStorage(); return true; }
    catch { alert("❌ জায়গা শেষ! নিচে লাল 'জায়গা খালি করুন' বাটন চাপ দেন"); return false; }
  };

  const addOrUpdate = () => {
    if (!name || !price) { alert("পণ্যের নাম আর পাইকারি মূল্য লাগবে"); return; }
    if (images.length === 0) { alert("অন্তত ১টা ছবি নেন"); return; }
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
      setProducts([]); setImages([]); setStatus(""); calcStorage();
      alert("✅ " + toSend.length + " টা পণ্য Admin-এ চলে গেছে! Seller এখন খালি।");
    } catch {
      alert("❌ জায়গা শেষ! নিচে লাল 'জায়গা খালি করুন' বাটন চাপ দিয়ে আবার চেষ্টা করেন");
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #eee" }}>
        <h3>{editId ? "✏️ Edit করতেছেন" : "🏪 দোকান + পণ্য"}</h3>
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", padding: 10, borderRadius: 10, marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>📦 {storage}</div>
          <button onClick={clearStorage} style={{ width: "100%", marginTop: 8, background: "#DC2626", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>🗑️ জায়গা খালি করুন - পুরনো বড় ছবি মুছুন</button>
          <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>জায়গা শেষ হলে এই বাটন চাপ দিবেন, Console লাগবে না।</div>
        </div>

        <input value={shop} onChange={(e) => setShop(e.target.value)} placeholder="SHOP-01" style={inp} />
        <input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="দোকানের নাম" style={inp} />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="মোবাইল নাম্বার" style={inp} />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="পণ্যের নাম - যেমন: বোরকা / শাড়ি" style={inp} />
        <div style={hint}>↑ এখানে পণ্যের নাম লিখবেন</div>
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="পাইকারি মূল্য - যেমন: 500" style={inp} />
        <div style={hint}>↑ পাইকারি মূল্য</div>
        <input value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="খুচরা মূল্য - যেমন: 800" style={inp} />
        <div style={hint}>↑ খুচরা মূল্য</div>

        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: 10, marginBottom: 10, fontSize: 13 }}>
          <b>📐 অটো রিসাইজ ON</b> - ৪টা ছবি নিলেই অটো ৪৫ KB-এর নিচে চলে আসবে।
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
