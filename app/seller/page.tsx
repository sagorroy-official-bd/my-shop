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

  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem("seller_drafts") || "[]"); setProducts(Array.isArray(d) ? d : []); }
    catch { setProducts([]); }
  }, []);

  const saveDrafts = (list: any[]) => {
    try { localStorage.setItem("seller_drafts", JSON.stringify(list)); setProducts(list); return true; }
    catch { alert("❌ জায়গা শেষ। ১টা ছবি কমিয়ে আবার চেষ্টা করেন"); return false; }
  };

  // ছবি ছোট করার ফাংশন - সাইজ বলে দিলেই ওই সাইজে করে দিবে
  const shrink = (src: string, max: number, q: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        let w = img.width, h = img.height;
        if (w > max) { h = (h * max) / w; w = max; }
        c.width = w; c.height = h;
        c.getContext("2d")?.drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", q));
      };
      img.onerror = () => resolve(src);
      img.src = src;
    });
  };

  const resizeFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          let w = img.width, h = img.height;
          const MAX = 600;
          if (w > MAX) { h = (h * MAX) / w; w = MAX; }
          c.width = w; c.height = h;
          c.getContext("2d")?.drawImage(img, 0, 0, w, h);
          resolve(c.toDataURL("image/jpeg", 0.65));
        };
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (e: any) => {
    const files: File[] = Array.from(e.target.files || []);
    if (files.length === 0) return;
    if (images.length + files.length > 4) { alert("সর্বোচ্চ ৪টা ছবি দিতে পারবেন"); return; }
    setStatus("⏳ " + files.length + " টা ছবি নেওয়া হচ্ছে...");
    const out: string[] = [];
    for (const f of files) { out.push(await resizeFile(f)); }
    setImages([...images, ...out]);
    setStatus("✅ " + (images.length + out.length) + " / ৪ টা ছবি রেডি");
    e.target.value = "";
  };

  // ✅ Draft-এ যোগ - সব থাকবে
  const addOrUpdate = () => {
    if (!name || !price) { alert("পণ্যের নাম আর পাইকারি মূল্য লাগবে"); return; }
    if (images.length === 0) { alert("অন্তত ১টা ছবি নেন"); return; }
    const item = { id: editId || Date.now(), shop, shopName, phone, name, price, oldPrice, desc, remark, images, img: images[0] || "" };
    let ok = false;
    if (editId) { ok = saveDrafts(products.map((p) => (p.id === editId ? item : p))); if (ok) alert("✅ Edit সেভ হয়েছে"); }
    else { ok = saveDrafts([...products, item]); if (ok) alert("✅ Draft-এ যোগ হয়েছে - " + images.length + " টা ছবিসহ"); }
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

  // ✅ Send Admin - ৪টা ছবিই যাবে, আটকালে অটো ছোট করে আবার চেষ্টা করবে
  const sendAdmin = async () => {
    if (products.length === 0) { alert("আগে Draft-এ যোগ করেন"); return; }
    if (editId) { alert("আগে Edit সেভ করুন"); return; }
    setStatus("⏳ Admin-এ পাঠানো হচ্ছে... ৪টা ছবিসহ");
    let toSend = products.map((p) => ({ ...p, sentAt: new Date().toLocaleString("bn-BD") }));
    // ৩ বার চেষ্টা - 600px -> 400px -> 250px - যতক্ষণ না ঢুকে
    const tries: any = [[600, 0.65], [400, 0.55], [250, 0.5]];
    for (let t = 0; t < tries.length; t++) {
      try {
        const old = JSON.parse(localStorage.getItem("admin_pending") || "[]");
        localStorage.setItem("admin_pending", JSON.stringify([...old, ...toSend]));
        // ঢুকে গেছে - এখন Seller খালি
        localStorage.setItem("seller_drafts", JSON.stringify([]));
        setProducts([]); setImages([]); setStatus("");
        alert("✅ " + toSend.length + " টা পণ্য Admin-এ চলে গেছে! প্রতিটার ৪টা ছবিসহ।");
        return;
      } catch {
        // ঢুকে নাই - ছবি আরও ছোট করে আবার চেষ্টা
        if (t === tries.length - 1) {
          alert("❌ ব্রাউজার একদম ভরে গেছে। Admin থেকে পুরনো Pending Approve/Delete করেন, তারপর আবার Send দেন");
          return;
        }
        const [mx, q] = tries[t + 1];
        const newSend: any[] = [];
        for (const p of toSend) {
          const newImgs: string[] = [];
          for (const im of (p.images || [])) { newImgs.push(await shrink(im, mx, q)); }
          newSend.push({ ...p, images: newImgs, img: newImgs[0] || "" });
        }
        toSend = newSend;
        setStatus("⏳ জায়গা কম, ছবি অটো " + mx + "px করে আবার পাঠানো হচ্ছে...");
      }
    }
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

        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>📸 ছবি - একসাথে সর্বোচ্চ ৪টা</div>
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
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>ছবি: {images.length} / ৪ টা</div>

        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="মন্তব্য - যেমন: কাপড় ভালো..." style={{ ...inp, height: 50 }} />
        <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Remark - অ্যাডমিনের জন্য নোট" style={{ ...inp, height: 50 }} />
        <button onClick={addOrUpdate} style={{ width: "100%", background: editId ? "#FACC15" : "#111", color: editId ? "#111" : "#fff", padding: 13, borderRadius: 10, border: "none", fontWeight: 900 }}>
          {editId ? "✅ Edit সেভ করুন" : "+ Draft-এ যোগ করুন"}
        </button>
        {editId && <button onClick={() => { setEditId(null); setImages([]); }} style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 10, border: "1px solid #ddd", background: "#fff" }}>❌ Edit বাতিল</button>}
      </div>

      <div>
        <h3>👁️ প্রিভিউ - Draft</h3>
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
              <span style={{ fontSize: 13 }}>পাইকারি: {p.price}৳</span> <span style={{ fontSize: 13, color: "#666" }}>• খুচরা: {p.oldPrice}৳</span> <span style={{ fontSize: 12 }}>• {p.images?.length || 1} / ৪ টা ছবি</span>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button onClick={() => doEdit(p)} style={{ flex: 1, background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800 }}>✏️ Edit</button>
                <button onClick={() => doDelete(p.id)} style={{ flex: 1, background: "#fff", border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={sendAdmin} style={{ width: "100%", background: "#16A34A", color: "#fff", padding: 14, border: "none", borderRadius: 12, fontWeight: 900 }}>📤 Send Admin - {products.length} টা পণ্য (৪টা ছবিসহ যাবে)</button>
        <p style={{ fontSize: 12, color: "#666", textAlign: "center" }}>Send করলেই ৪টা ছবিসহ Admin Pending-এ চলে যাবে, Seller খালি হয়ে যাবে</p>
      </div>
    </div>
  );
}
const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 4, outline: "none", boxSizing: "border-box" };
const hint: any = { fontSize: 12, color: "#888", marginBottom: 10, marginTop: -2 };
