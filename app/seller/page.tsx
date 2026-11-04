"use client";
import { useState, useEffect } from "react";

export default function SellerPage() {
  const [shop, setShop] = useState("SHOP-01");
  const [shopName, setShopName] = useState("Gawsia");
  const [phone, setPhone] = useState("1111111");
  const [name, setName] = useState("Borka");
  const [price, setPrice] = useState("500");
  const [oldPrice, setOldPrice] = useState("900");
  const [images, setImages] = useState<string[]>([]);
  const [desc, setDesc] = useState("");
  const [remark, setRemark] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("seller_drafts") || "[]");
      setProducts(Array.isArray(d) ? d : []);
    } catch { setProducts([]); }
  }, []);

  const saveDrafts = (list: any[]) => {
    try {
      localStorage.setItem("seller_drafts", JSON.stringify(list));
      setProducts(list);
    } catch { alert("ছবি অনেক বড়! ২টার বেশি ছবি দিবেন না"); }
  };

  // ছবি অটো রিসাইজ - 700px
  const resizeOne = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let w = img.width, h = img.height;
          const MAX = 700;
          if (w > MAX) { h = (h * MAX) / w; w = MAX; }
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.65));
        };
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  // একাধিক ছবি চুজ করা
  const handleFiles = async (e: any) => {
    const files: File[] = Array.from(e.target.files || []);
    if (files.length === 0) return;
    if (images.length + files.length > 4) { alert("সর্বোচ্চ ৪টা ছবি"); return; }
    alert(files.length + " টা ছবি রিসাইজ হচ্ছে, একটু দাঁড়ান...");
    const out: string[] = [];
    for (const f of files) { out.push(await resizeOne(f)); }
    setImages([...images, ...out]);
    e.target.value = ""; // একই ছবি আবার চুজ করা যাবে
  };

  const addOrUpdate = () => {
    if (!name || !price) { alert("নাম আর দাম লাগবে"); return; }
    const item = {
      id: editId || Date.now(),
      shop, shopName, phone, name, price, oldPrice, desc, remark,
      images: images, img: images[0] || "",
    };
    if (editId) {
      saveDrafts(products.map((p) => (p.id === editId ? item : p)));
      alert("✅ Edit সেভ হয়েছে");
    } else {
      saveDrafts([...products, item]);
      alert("✅ Draft-এ যোগ হয়েছে");
    }
    setEditId(null); setImages([]); setDesc(""); setRemark("");
  };

  const doEdit = (p: any) => {
    setEditId(p.id);
    setShop(p.shop); setShopName(p.shopName); setPhone(p.phone);
    setName(p.name); setPrice(p.price); setOldPrice(p.oldPrice);
    setDesc(p.desc || ""); setRemark(p.remark || "");
    setImages(p.images || (p.img ? [p.img] : []));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const doDelete = (id: number) => {
    if (!confirm("মুছে ফেলবো?")) return;
    saveDrafts(products.filter((p) => p.id !== id));
  };

  // SEND ADMIN - পাঠানোর পর Seller থেকে মুছে যাবে
  const sendAdmin = () => {
    if (products.length === 0) { alert("আগে Draft-এ যোগ করেন"); return; }
    if (editId) { alert("আগে Edit সেভ করুন বা Edit বাতিল করুন"); return; }
    try {
      const old = JSON.parse(localStorage.getItem("admin_pending") || "[]");
      const toSend = products.map((p) => ({ ...p, sentAt: new Date().toLocaleString("bn-BD") }));
      localStorage.setItem("admin_pending", JSON.stringify([...old, ...toSend]));
      // Seller Draft খালি করা
      localStorage.setItem("seller_drafts", JSON.stringify([]));
      setProducts([]);
      setImages([]);
      alert("✅ " + toSend.length + " টা পণ্য Admin-এ চলে গেছে! Seller এখন খালি।");
    } catch (err) {
      alert("❌ জায়গা শেষ। ব্রাউজারে Ctrl+Shift+J চেপে localStorage.clear() লিখে Enter দেন, তারপর আবার চেষ্টা করেন");
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #eee" }}>
        <h3>{editId ? "✏️ Edit করতেছেন" : "🏪 দোকান + পণ্য"}</h3>
        <input value={shop} onChange={(e) => setShop(e.target.value)} placeholder="SHOP-01" style={inp} />
        <input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Gawsia" style={inp} />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="মোবাইল" style={inp} />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Borka" style={inp} />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="500" style={inp} />
        <input value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="900" style={inp} />

        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>📸 ছবি - একসাথে ৪টা পর্যন্ত নিতে পারবেন</div>
        <input type="file" accept="image/*" multiple onChange={handleFiles} style={{ ...inp, padding: 8 }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          {images.map((im, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img src={im} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: i === 0 ? "3px solid green" : "1px solid #ddd" }} />
              <button onClick={() => setImages(images.filter((_, x) => x !== i))} style={{ position: "absolute", top: -7, right: -7, background: "red", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20 }}>×</button>
              {i === 0 && <div style={{ fontSize: 10, textAlign: "center", color: "green", fontWeight: 800 }}>MAIN</div>}
            </div>
          ))}
        </div>
        {images.length === 0 && <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>এখনো ছবি নেওয়া হয় নাই</div>}

        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="মন্তব্য" style={{ ...inp, height: 50 }} />
        <textarea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Remark" style={{ ...inp, height: 50 }} />
        <button onClick={addOrUpdate} style={{ width: "100%", background: editId ? "#FACC15" : "#111", color: editId ? "#111" : "#fff", padding: 13, borderRadius: 10, border: "none", fontWeight: 900 }}>
          {editId ? "✅ Edit সেভ করুন" : "+ Draft-এ যোগ করুন"}
        </button>
        {editId && <button onClick={() => { setEditId(null); setImages([]); }} style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 10, border: "1px solid #ddd", background: "#fff" }}>❌ Edit বাতিল</button>}
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
              <b>{p.name} - {p.price}৳</b> <del>{p.oldPrice}৳</del> <span>• {p.images?.length || 1} টা ছবি</span>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button onClick={() => doEdit(p)} style={{ flex: 1, background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800 }}>✏️ Edit</button>
                <button onClick={() => doDelete(p.id)} style={{ flex: 1, background: "#fff", border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={sendAdmin} style={{ width: "100%", background: "#16A34A", color: "#fff", padding: 14, border: "none", borderRadius: 12, fontWeight: 900 }}>📤 Send Admin - {products.length} টা পণ্য</button>
        <p style={{ fontSize: 12, color: "#666", textAlign: "center" }}>Send করলেই Seller খালি হয়ে Admin Pending-এ চলে যাবে</p>
      </div>
    </div>
  );
}
const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10, outline: "none", boxSizing: "border-box" };
