"use client";
import { useState, useEffect } from "react";
function openDb(): Promise<any> {
  return new Promise((res, rej) => {
    const r = indexedDB.open("shopDB", 1);
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains("kv")) r.result.createObjectStore("kv"); };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
async function getK(k: string) {
  const db = await openDb();
  return new Promise((res) => {
    const q = db.transaction("kv", "readonly").objectStore("kv").get(k);
    q.onsuccess = () => res(q.result || null); q.onerror = () => res(null);
  });
}
async function setK(k: string, v: any) {
  const db = await openDb();
  return new Promise((res) => {
    const tx = db.transaction("kv", "readwrite"); tx.objectStore("kv").put(v, k);
    tx.oncomplete = () => res(true); tx.onerror = () => res(true);
  });
}
export default function AdminPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [approved, setApproved] = useState<any[]>([]);
  const [live, setLive] = useState<any[]>([]);
  const [editId, setEditId] = useState<any>(null);
  const [editFrom, setEditFrom] = useState("pending");
  const [fShop, setFShop] = useState(""); const [fShopName, setFShopName] = useState(""); const [fPhone, setFPhone] = useState(""); const [fPrice, setFPrice] = useState("");
  const [mTitle, setMTitle] = useState(""); const [mSale, setMSale] = useState(""); const [mMrp, setMMrp] = useState("");
  const [mColors, setMColors] = useState(""); const [mSizes, setMSizes] = useState(""); const [mStock, setMStock] = useState("");
  const [mBadge, setMBadge] = useState(""); const [mFreeDel, setMFreeDel] = useState(true); const [mDelCharge, setMDelCharge] = useState("60");
  const [mDesc, setMDesc] = useState(""); const [mOffer, setMOffer] = useState("");
  const [fImgs, setFImgs] = useState<any[]>([]);
  const load = async () => {
    const p: any = (await getK("admin_pending")) || [];
    let a: any = (await getK("admin_approved")) || [];
    const l: any = (await getK("admin_products")) || [];
    if (l.length > 0 && a.length === 0) { a = l; await setK("admin_approved", a); }
    setPending(p); setApproved(a); setLive(l);
  };
  useEffect(() => { load(); }, []);
  const startEdit = (p: any, from: string) => {
    setEditId(p.id); setEditFrom(from);
    setFShop(p.shop || ""); setFShopName(p.shopName || ""); setFPhone(p.phone || ""); setFPrice(p.price || "");
    setMTitle(p.mTitle || p.name || ""); setMSale(p.mSale || p.oldPrice || ""); setMMrp(p.mMrp || "");
    setMColors((p.mColors || []).join(", ")); setMSizes((p.mSizes || []).join(", ")); setMStock(p.mStock || "10");
    setMBadge(p.mBadge || "🔥 Best Seller"); setMFreeDel(p.mFreeDel !== false); setMDelCharge(p.mDelCharge || "60");
    setMDesc(p.mDesc || p.desc || ""); setMOffer(p.mOffer || "ক্যাশ অন ডেলিভারি - প্রোডাক্ট দেখে টাকা দিবেন");
    setFImgs(p.images || (p.img ? [p.img] : []));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const onFiles = async (e: any) => {
    const files: any[] = Array.from(e.target.files || []);
    if (fImgs.length + files.length > 4) { alert("সর্বোচ্চ ৪টা"); return; }
    const out: string[] = [];
    for (const f of files) {
      out.push(await new Promise<string>((resolve) => {
        const rd = new FileReader(); rd.onload = () => {
          const img = new Image(); img.onload = () => {
            const c = document.createElement("canvas");
            let w: number = img.width, h: number = img.height; const M = 800;
            if (w > M) { h = (h * M) / w; w = M; }
            c.width = w; c.height = h; c.getContext("2d")?.drawImage(img, 0, 0, w, h);
            resolve(c.toDataURL("image/jpeg", 0.75));
          }; img.src = String(rd.result);
        }; rd.readAsDataURL(f);
      }));
    }
    setFImgs([...fImgs, ...out]); e.target.value = "";
  };
  const disc = mMrp && mSale ? Math.round((1 - Number(mSale) / Number(mMrp)) * 100) : 0;
  const saveEdit = async () => {
    if (!editId) return;
    if (fImgs.length === 0) { alert("কমপক্ষে ১টা ছবি রাখতে হবে"); return; }
    const mk = (list: any[]) => list.map((x) => x.id === editId ? { ...x, shop: fShop, shopName: fShopName, phone: fPhone, price: fPrice, oldPrice: mSale, name: mTitle, mTitle, mSale, mMrp, mDiscount: disc, mColors: mColors.split(",").map((s: string) => s.trim()).filter(Boolean), mSizes: mSizes.split(",").map((s: string) => s.trim()).filter(Boolean), mStock, mBadge, mFreeDel, mDelCharge, mDesc, mOffer, images: fImgs, img: fImgs[0] || "", adminEditedAt: new Date().toLocaleString("bn-BD") } : x);
    if (editFrom === "pending") { const n = mk(pending); await setK("admin_pending", n); setPending(n); }
    if (editFrom === "approved") { const n = mk(approved); await setK("admin_approved", n); setApproved(n); }
    if (editFrom === "live") { const n = mk(live); await setK("admin_products", n); setLive(n); const na = mk(approved); await setK("admin_approved", na); setApproved(na); }
    setEditId(null); alert("✅ Edit সেভ হয়েছে");
  };
  // ✅ নতুন - লিস্ট থেকেই যেকোনো ছবি ডিলিট
  const deleteImageFromList = async (productId: any, imgIndex: number, from: string) => {
    if (!confirm("এই ছবিটা ডিলিট করবেন?")) return;
    const fix = (list: any[]) => list.map((x) => {
      if (x.id !== productId) return x;
      const imgs = (x.images || [x.img]).filter((_: any, i: number) => i !== imgIndex);
      return { ...x, images: imgs, img: imgs[0] || "" };
    });
    if (from === "pending") { const n = fix(pending); await setK("admin_pending", n); setPending(n); }
    if (from === "approved") { const n = fix(approved); await setK("admin_approved", n); setApproved(n); }
    if (from === "live") { const n = fix(live); await setK("admin_products", n); setLive(n); const na = fix(approved); await setK("admin_approved", na); setApproved(na); }
    alert("🗑️ ছবি ডিলিট হয়েছে");
  };
  // ✅ নতুন - পুরা পণ্য ডিলিট
  const deleteProduct = async (productId: any, from: string) => {
    if (!confirm("পুরা পণ্যটা ডিলিট করবেন? এইটা ফেরত আসবে না।")) return;
    if (from === "pending") { const n = pending.filter((x) => x.id !== productId); await setK("admin_pending", n); setPending(n); }
    if (from === "approved") { const n = approved.filter((x) => x.id !== productId); await setK("admin_approved", n); setApproved(n); }
    if (from === "live") { const n = live.filter((x) => x.id !== productId); await setK("admin_products", n); setLive(n); }
    alert("🗑️ পণ্য ডিলিট হয়েছে");
  };
  const doApprove = async (p: any) => {
    const nP = pending.filter((x) => x.id !== p.id); await setK("admin_pending", nP); setPending(nP);
    const item = { ...p, approvedAt: new Date().toLocaleString("bn-BD") };
    const nA = approved.some((x) => x.id === p.id) ? approved.map((x) => x.id === p.id ? item : x) : [...approved, item];
    await setK("admin_approved", nA); setApproved(nA);
    alert("Approve হয়েছে");
  };
  const doSendCustomer = async (p: any) => {
    const item = { ...p, sentToCustomerAt: new Date().toLocaleString("bn-BD") };
    const nL = live.some((x) => x.id === p.id) ? live.map((x) => x.id === p.id ? item : x) : [...live, item];
    await setK("admin_products", nL); setLive(nL);
    alert("Customer-এ পাঠানো হয়েছে");
  };
  const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 6, outline: "none", boxSizing: "border-box" };
  const label: any = { fontSize: 13, fontWeight: 800, margin: "10px 0 4px" };
  const renderImgsWithDelete = (p: any, from: string) => (
    <div style={{ display: "flex", overflowX: "auto", gap: 4 }}>
      {(p.images || [p.img]).filter(Boolean).map((im: any, i: number) => (
        <div key={i} style={{ position: "relative", flexShrink: 0 }}>
          <img src={im} style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 8 }} />
          <button onClick={() => deleteImageFromList(p.id, i, from)} title="এই ছবি ডিলিট" style={{ position: "absolute", top: 4, right: 4, background: "#DC2626", color: "#fff", border: "none", borderRadius: 6, padding: "6px 8px", fontWeight: 900, cursor: "pointer" }}>🗑️ {i + 1}</button>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <div style={{ background: "#111", color: "#fff", padding: 16, borderRadius: 12 }}>
        <h2 style={{ margin: 0 }}>Admin Panel v1000 - Gawsia</h2>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Seller - Pending - Edit (মার্কেটিং) - Approve - Customer - ছবি ডিলিট</div>
      </div>
      {editId && (
        <div style={{ background: "#FFFBEB", border: "2px solid #FACC15", padding: 16, borderRadius: 12, marginTop: 12 }}>
          <h3>✏️ Admin Edit - Customer যেভাবে দেখবে সেভাবে সাজান</h3>
          <div style={{ background: "#fff", padding: 12, borderRadius: 10, border: "1px solid #FDE68A" }}>
            <div style={{ fontWeight: 900, color: "#DC2626" }}>🛍️ CUSTOMER দেখবে - মার্কেটিং</div>
            <div style={label}>পণ্যের সুন্দর নাম</div><input value={mTitle} onChange={(e) => setMTitle(e.target.value)} placeholder="প্রিমিয়াম জামদানি শাড়ি - লাল" style={inp} />
            <div style={{ display: "flex", gap: 8 }}><div style={{ flex: 1 }}><div style={label}>বিক্রয় মূল্য</div><input value={mSale} onChange={(e) => setMSale(e.target.value)} placeholder="900" style={inp} /></div><div style={{ flex: 1 }}><div style={label}>আগের মূল্য</div><input value={mMrp} onChange={(e) => setMMrp(e.target.value)} placeholder="1500" style={inp} /></div></div>
            {disc > 0 && <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "8px 12px", borderRadius: 8, fontWeight: 800 }}>🔥 Customer দেখবে: {disc}% ছাড়!</div>}
            <div style={label}>কালার (কমা দিয়ে)</div><input value={mColors} onChange={(e) => setMColors(e.target.value)} placeholder="লাল, কালো, নীল" style={inp} />
            <div style={label}>সাইজ / লম্বা</div><input value={mSizes} onChange={(e) => setMSizes(e.target.value)} placeholder="১২ হাত, ব্লাউজ পিস সহ" style={inp} />
            <div style={{ display: "flex", gap: 8 }}><div style={{ flex: 1 }}><div style={label}>স্টক</div><input value={mStock} onChange={(e) => setMStock(e.target.value)} placeholder="10" style={inp} /></div><div style={{ flex: 1 }}><div style={label}>ব্যাজ</div><select value={mBadge} onChange={(e) => setMBadge(e.target.value)} style={inp}><option>🔥 Best Seller</option><option>✨ New Arrival</option><option>⏰ Limited Stock</option><option>💎 Premium</option><option>🎁 অফার</option><option></option></select></div></div>
            <div style={label}>ডেলিভারি</div><label><input type="checkbox" checked={mFreeDel} onChange={(e) => setMFreeDel(e.target.checked)} /> 🚚 ফ্রি ডেলিভারি</label>
            {!mFreeDel && <input value={mDelCharge} onChange={(e) => setMDelCharge(e.target.value)} placeholder="ডেলিভারি চার্জ - 60" style={{ ...inp, marginTop: 6 }} />}
            <div style={label}>মার্কেটিং বর্ণনা</div><textarea value={mDesc} onChange={(e) => setMDesc(e.target.value)} placeholder="সুতি জামদানি, নরম আর আরামদায়ক..." style={{ ...inp, height: 60 }} />
            <div style={label}>অফার লাইন</div><input value={mOffer} onChange={(e) => setMOffer(e.target.value)} placeholder="ক্যাশ অন ডেলিভারি" style={inp} />
          </div>
          <div style={{ background: "#F3F4F6", padding: 12, borderRadius: 10, marginTop: 10 }}>
            <div style={{ fontWeight: 900, color: "#666" }}>🔒 শুধু ADMIN দেখবে - Customer দেখবে না</div>
            <div style={label}>পাইকারি মূল্য</div><input value={fPrice} onChange={(e) => setFPrice(e.target.value)} placeholder="700" style={inp} />
            <input value={fShop} onChange={(e) => setFShop(e.target.value)} placeholder="SHOP-01" style={inp} />
            <input value={fShopName} onChange={(e) => setFShopName(e.target.value)} placeholder="দোকানের নাম" style={inp} />
            <input value={fPhone} onChange={(e) => setFPhone(e.target.value)} placeholder="মোবাইল" style={inp} />
          </div>
          <div style={label}>ছবি (৪টা) - যেকোনো ছবির নিচে 🗑️ চাপ দিলে ডিলিট হবে</div>
          <input type="file" accept="image/*" multiple onChange={onFiles} style={{ ...inp, padding: 8 }} />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {fImgs.map((im: any, i: number) => (
              <div key={i} style={{ border: "1px solid #ddd", padding: 6, borderRadius: 10, background: "#fff", textAlign: "center" }}>
                <img src={im} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8 }} />
                <div style={{ fontSize: 12, margin: "4px 0" }}>ছবি {i + 1}</div>
                <button onClick={() => setFImgs(fImgs.filter((_: any, x: number) => x !== i))} style={{ background: "#DC2626", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 8, fontWeight: 800, width: "100%" }}>🗑️ ডিলিট</button>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, marginTop: 6 }}>ছবি: {fImgs.length} / ৪ টা - কমপক্ষে ১টা রাখতে হবে</div>
          <button onClick={saveEdit} style={{ width: "100%", background: "#16A34A", color: "#fff", padding: 12, border: "none", borderRadius: 10, fontWeight: 800, marginTop: 10 }}>✅ Edit সেভ করুন</button>
          <button onClick={() => setEditId(null)} style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 10, border: "1px solid #ddd", background: "#fff" }}>বাতিল</button>
        </div>
      )}
      <h3>Pending - {pending.length} টি</h3>
      {pending.map((p: any) => (
        <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          {renderImgsWithDelete(p, "pending")}
          <div style={{ padding: 12 }}><b>{p.mTitle || p.name}</b> - Customer দাম {p.mSale || p.oldPrice}৳ {p.mDiscount ? `(-${p.mDiscount}%)` : ""}<br />
            <button onClick={() => startEdit(p, "pending")} style={{ background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, marginRight: 8, marginTop: 8 }}>Edit</button>
            <button onClick={() => doApprove(p)} style={{ background: "#16A34A", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, marginRight: 8 }}>Approve</button>
            <button onClick={() => deleteProduct(p.id, "pending")} style={{ background: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA", padding: 10, borderRadius: 8, fontWeight: 800 }}>🗑️ পণ্য ডিলিট</button>
          </div>
        </div>
      ))}
      <h3>Approved - {approved.length} টি</h3>
      {approved.map((p: any) => (
        <div key={p.id} style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          {renderImgsWithDelete(p, "approved")}
          <div style={{ padding: 12 }}><b>{p.mTitle || p.name}</b> - {p.mSale || p.oldPrice}৳ {p.mDiscount ? `(-${p.mDiscount}%)` : ""} • {p.mBadge}<br />
            <button onClick={() => startEdit(p, "approved")} style={{ background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, marginRight: 8, marginTop: 8 }}>Edit</button>
            <button onClick={() => doSendCustomer(p)} style={{ background: "#16A34A", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, marginRight: 8 }}>Customer-এ পাঠান</button>
            <button onClick={() => deleteProduct(p.id, "approved")} style={{ background: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA", padding: 10, borderRadius: 8, fontWeight: 800 }}>🗑️ পণ্য ডিলিট</button>
          </div>
        </div>
      ))}
      <h3>Customer-এ লাইভ - {live.length} টি</h3>
      {live.map((p: any) => (
        <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          {renderImgsWithDelete(p, "live")}
          <div style={{ padding: 12 }}><b>{p.mTitle || p.name}</b> - {p.mSale || p.oldPrice}৳<br />
            <button onClick={() => startEdit(p, "live")} style={{ background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, marginRight: 8, marginTop: 8 }}>Edit</button>
            <button onClick={() => doSendCustomer(p)} style={{ background: "#16A34A", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, marginRight: 8 }}>আবার Customer-এ পাঠান</button>
            <button onClick={() => deleteProduct(p.id, "live")} style={{ background: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA", padding: 10, borderRadius: 8, fontWeight: 800 }}>🗑️ পণ্য ডিলিট</button>
          </div>
        </div>
      ))}
    </div>
  );
}
