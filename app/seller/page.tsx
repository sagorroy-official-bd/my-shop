"use client";
import { useEffect, useState } from "react";

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
  const [editId, setEditId] = useState<any>(null);

  useEffect(() => {
    try { setProducts(JSON.parse(localStorage.getItem("seller_drafts") || "[]")); } catch { setProducts([]); }
  }, []);

  const saveAll = (list: any[]) => {
    localStorage.setItem("seller_drafts", JSON.stringify(list));
    setProducts(list);
  };

  // ছবি ছোট করা - 800px + 0.7 quality, তাহলে Send আটকাবে না
  const compress = (file: File): Promise<string> => {
    return new Promise((res) => {
      const r = new FileReader();
      r.onload = () => {
        const im = new Image();
        im.onload = () => {
          const c = document.createElement("canvas");
          const max = 800;
          let w = im.width, h = im.height;
          if (w > max) { h = h * max / w; w = max; }
          c.width = w; c.height = h;
          c.getContext("2d")!.drawImage(im, 0, 0, w, h);
          res(c.toDataURL("image/jpeg", 0.7));
        };
        im.src = String(r.result);
      };
      r.readAsDataURL(file);
    });
  };

  // ✅ একাধিক ছবি নেওয়া
  const onFiles = async (e: any) => {
    const files = Array.from(e.target.files || []) as File[];
    if (images.length + files.length > 4) { alert("সর্বোচ্চ ৪টা ছবি দিতে পারবেন"); return; }
    const done: string[] = [];
    for (const f of files) done.push(await compress(f));
    setImages([...images, ...done]);
  };

  const saveDraft = () => {
    if (!name || !price) { alert("নাম আর দাম দেন"); return; }
    const item = { id: editId || Date.now(), shop, shopName, phone, name, price, oldPrice, desc, remark, images, img: images[0] || "", tag: "NEW" };
    if (editId) saveAll(products.map(p => p.id === editId ? item : p));
    else saveAll([...products, item]);
    alert(editId ? "✅ Edit সেভ হয়েছে" : "✅ Draft-এ যোগ হয়েছে");
    setEditId(null); setImages([]); setName("Borka");
  };

  const startEdit = (p: any) => {
    setEditId(p.id); setShop(p.shop); setShopName(p.shopName); setPhone(p.phone);
    setName(p.name); setPrice(p.price); setOldPrice(p.oldPrice);
    setImages(p.images || [p.img].filter(Boolean)); setDesc(p.desc || ""); setRemark(p.remark || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = (id: any) => {
    if (!confirm("মুছে ফেলবো?")) return;
    saveAll(products.filter(p => p.id !== id));
  };

  // ✅ SEND ADMIN - পাঠানোর পর Seller থেকে মুছে যাবে
  const sendToAdmin = () => {
    if (products.length === 0) { alert("আগে Draft-এ যোগ করেন"); return; }
    try {
      const pending = JSON.parse(localStorage.getItem("admin_pending") || "[]");
      const toSend = products.map(p => ({ ...p, sentAt: new Date().toLocaleString("bn-BD") }));
      localStorage.setItem("admin_pending", JSON.stringify([...pending, ...toSend]));
      // Seller Draft খালি করে দেওয়া
      localStorage.setItem("seller_drafts", JSON.stringify([]));
      setProducts([]);
      alert(`✅ ${toSend.length} টা পণ্য Admin-এ চলে গেছে! Seller Draft এখন খালি। Admin Approve করলে Customer দেখবে`);
    } catch (e) {
      alert("❌ ছবি অনেক বড় হয়ে গেছে। ১-২টা ছবি দিয়ে আবার চেষ্টা করেন");
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "Hind Siliguri", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 16, border: "1px solid #eee" }}>
        <h3 style={{ marginTop: 0 }}>{editId ? "✏️ Edit করতেছেন..." : "🏪 দোকানের ঠিকানা + পণ্য"}</h3>
        <input value={shop} onChange={e => setShop(e.target.value)} placeholder="SHOP-01" style={inp} />
        <input value={shopName} onChange={e => setShopName(e.target.value)} placeholder="Gawsia" style={inp} />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="মোবাইল" style={inp} />
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Borka" style={inp} />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="500" style={inp} />
        <input value={oldPrice} onChange={e => setOldPrice(e.target.value)} placeholder="900" style={inp} />

        <label style={{ fontSize: 13, fontWeight: 800 }}>📸 ছবি - একসাথে ৪টা পর্যন্ত (ফাইল থেকে)</label>
        <input type="file" accept="image/*" multiple onChange={onFiles} style={{ ...inp, padding: 8 }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          {images.map((im, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img src={im} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: i === 0 ? "3px solid #16A34A" : "1px solid #ddd" }} />
              <button onClick={() => setImages(images.filter((_, x) => x !== i))} style={{ position: "absolute", top: -6, right: -6, background: "red", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer" }}>×</button>
              {i === 0 && <div style={{ fontSize: 9, textAlign: "center", color: "#16A34A", fontWeight: 800 }}>MAIN</div>}
            </div>
          ))}
        </div>
        {images.length > 0 && <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>প্রথম ছবিটাই Main ছবি হবে।</div>}

        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="মন্তব্য / Comment" style={{ ...inp, height: 50 }} />
        <textarea value={remark} onChange={e => setRemark(e.target.value)} placeholder="Remark / অ্যাডমিনের জন্য নোট" style={{ ...inp, height: 50 }} />
        <button onClick={saveDraft} style={{ width: "100%", background: editId ? "#FACC15" : "#111", color: editId ? "#111" : "#fff", padding: 13, borderRadius: 10, border: "none", fontWeight: 900, cursor: "pointer" }}>
          {editId ? "✅ Edit সেভ করুন" : "+ Draft-এ যোগ করুন"}
        </button>
      </div>

      <div>
        <h3>👁️ প্রিভিউ + Edit / Delete / Send</h3>
        {products.map(p => (
          <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ display: "flex", overflowX: "auto" }}>
              {(p.images || [p.img]).filter(Boolean).map((im: string, i: number) => (
                <img key={i} src={im} style={{ width: 150, height: 150, objectFit: "cover", flexShrink: 0 }} />
              ))}
            </div>
            <div style={{ padding: 12 }}>
              <b>{p.name} - {p.price}৳</b> <del style={{ color: "#999" }}>{p.oldPrice}৳</del> <span style={{ fontSize: 12 }}>• {p.images?.length || 1}টি ছবি</span>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button onClick={() => startEdit(p)} style={{ flex: 1, background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>✏️ Edit</button>
                <button onClick={() => del(p.id)} style={{ flex: 1, background: "#fff", border: "1px solid #ddd", padding: 10, borderRadius: 8, cursor: "pointer" }}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={sendToAdmin} style={{ width: "100%", background: "#16A34A", color: "#fff", padding: 14, border: "none", borderRadius: 12, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>📤 Send Admin - {products.length} টা পণ্য</button>
        <p style={{ fontSize: 12, color: "#666", textAlign: "center" }}>Send করলেই Seller Draft খালি হয়ে Admin Pending-এ চলে যাবে</p>
      </div>
    </div>
  );
}
const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 10, outline: "none", boxSizing: "border-box" };
