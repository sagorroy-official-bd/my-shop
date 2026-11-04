"use client";
import { useState, useEffect } from "react";

// Seller-এর মতো একই IndexedDB - নাহলে Seller-এর পাঠানো দেখা যাবে না
const DB = "shopDB";
function idb(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains("kv")) r.result.createObjectStore("kv"); };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
async function idbGet(key: string): Promise<any> {
  const db = await idb();
  return new Promise((res) => {
    const tx = db.transaction("kv", "readonly"); const q = tx.objectStore("kv").get(key);
    q.onsuccess = () => res(q.result || null); q.onerror = () => res(null);
  });
}
async function idbSet(key: string, val: any) {
  const db = await idb();
  return new Promise<void>((res) => {
    const tx = db.transaction("kv", "readwrite"); tx.objectStore("kv").put(val, key);
    tx.oncomplete = () => res(); tx.onerror = () => res();
  });
}

export default function AdminPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [saved, setSaved] = useState<any[]>([]); // ✅ Admin-এ সংরক্ষিত - Edit করার পরও থাকবে
  const [live, setLive] = useState<any[]>([]); // Customer দেখে
  const [edit, setEdit] = useState<any>(null);
  const [eName, setEName] = useState("");
  const [ePrice, setEPrice] = useState("");
  const [eOld, setEOld] = useState("");
  const [eDesc, setEDesc] = useState("");
  const [eRemark, setERemark] = useState("");
  const [eImages, setEImages] = useState<string[]>([]);

  const load = async () => {
    // পুরনো localStorage থেকে থাকলে একবার IDB-তে নিয়ে আসা
    let p = (await idbGet("admin_pending")) || [];
    if (p.length === 0) {
      try { const old = JSON.parse(localStorage.getItem("admin_pending") || "[]"); if (old.length > 0) { p = old; await idbSet("admin_pending", p); } } catch {}
    }
    setPending(p);
    setSaved((await idbGet("admin_saved")) || []);
    setLive((await idbGet("admin_products")) || []);
  };
  useEffect(() => { load(); }, []);

  const startEdit = (p: any) => {
    setEdit(p); setEName(p.name); setEPrice(p.price); setEOld(p.oldPrice);
    setEDesc(p.desc || ""); setERemark(p.remark || ""); setEImages(p.images || (p.img ? [p.img] : []));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditFiles = async (e: any) => {
    const files: File[] = Array.from(e.target.files || []);
    if (eImages.length + files.length > 4) { alert("সর্বোচ্চ ৪টা"); return; }
    const out: string[] = [];
    for (const f of files) {
      out.push(await new Promise<string>((resolve) => {
        const rd = new FileReader(); rd.onload = () => {
          const img = new Image(); img.onload = () => {
            const c = document.createElement("canvas");
            let w = img.width, h = img.height; const MAX = 800;
            if (w > MAX) { h = (h * MAX) / w; w = MAX; }
            c.width = w; c.height = h; c.getContext("2d")?.drawImage(img, 0, 0, w, h);
            resolve(c.toDataURL("image/jpeg", 0.75));
          }; img.src = String(rd.result);
        }; rd.readAsDataURL(f);
      }));
    }
    setEImages([...eImages, ...out]); e.target.value = "";
  };

  // ✅ Admin Edit সেভ - Pending-এ আপডেট হবে + Admin Saved-এও সংরক্ষিত থাকবে
  const saveEdit = async () => {
    if (!edit) return;
    const updated = { ...edit, name: eName, price: ePrice, oldPrice: eOld, desc: eDesc, remark: eRemark, images: eImages, img: eImages[0] || "", adminEditedAt: new Date().toLocaleString("bn-BD") };
    const newPending = pending.map((p) => (p.id === edit.id ? updated : p));
    await idbSet("admin_pending", newPending); setPending(newPending);
    // Admin Saved-এ রাখা - পরে আবার দেখা যাবে
    const newSaved = saved.some((s) => s.id === edit.id) ? saved.map((s) => (s.id === edit.id ? updated : s)) : [...saved, updated];
    await idbSet("admin_saved", newSaved); setSaved(newSaved);
    // Live-এ থাকলে ওইটাও আপডেট
    if (live.some((l) => l.id === edit.id)) {
      const newLive = live.map((l) => (l.id === edit.id ? updated : l));
      await idbSet("admin_products", newLive); setLive(newLive);
    }
    setEdit(null); alert("✅ Admin Edit সেভ হয়েছে - Admin-এ সংরক্ষিত থাকবে");
  };

  // ✅ Customer-এ পাঠানো - Live-এ যাবে + Admin Saved-এ কপি থাকবে
  const sendCustomer = async (p: any) => {
    const item = { ...p, sentToCustomerAt: new Date().toLocaleString("bn-BD") };
    const newPending = pending.filter((x) => x.id !== p.id);
    await idbSet("admin_pending", newPending); setPending(newPending);
    const newLive = live.some((l) => l.id === p.id) ? live.map((l) => (l.id === p.id ? item : l)) : [...live, item];
    await idbSet("admin_products", newLive); setLive(newLive);
    const newSaved = saved.some((s) => s.id === p.id) ? saved.map((s) => (s.id === p.id ? item : s)) : [...saved, item];
    await idbSet("admin_saved", newSaved); setSaved(newSaved);
    alert("✅ Customer-এ পাঠানো হয়ে গেছে! Admin-এ সংরক্ষিত কপি রয়ে গেছে।");
  };

  const reject = async (id: number) => {
    if (!confirm("Reject করবো?")) return;
    await idbSet("admin_pending", pending.filter((x) => x.id !== id)); load();
  };
  const delLive = async (id: number) => {
    if (!confirm("Customer থেকে সরাবো? Admin Saved-এ থাকবে")) return;
    await idbSet("admin_products", live.filter((x) => x.id !== id)); load();
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <div style={{ background: "#111", color: "#fff", padding: 16, borderRadius: 12 }}>
        <h2 style={{ margin: 0 }}>👑 Admin Panel - Gawsia</h2>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Seller থেকে আসা পণ্য যাচাই করে Customer-কে পাঠান</div>
      </div>

      {/* ✅ Edit বক্স - Admin Edit করবে এখানে */}
      {edit && (
        <div style={{ background: "#FFFBEB", border: "2px solid #FACC15", padding: 16, borderRadius: 12, marginTop: 12 }}>
          <h3>✏️ Admin Edit করতেছেন - {edit.name}</h3>
          <input value={eName} onChange={(e) => setEName(e.target.value)} placeholder="পণ্যের নাম" style={inp} />
          <input value={ePrice} onChange={(e) => setEPrice(e.target.value)} placeholder="পাইকারি মূল্য - যেমন: 500" style={inp} />
          <input value={eOld} onChange={(e) => setEOld(e.target.value)} placeholder="খুচরা মূল্য - যেমন: 800" style={inp} />
          <input type="file" accept="image/*" multiple onChange={handleEditFiles} style={{ ...inp, padding: 8 }} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            {eImages.map((im, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img src={im} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
                <button onClick={() => setEImages(eImages.filter((_, x) => x !== i))} style={{ position: "absolute", top: -6, right: -6, background: "red", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20 }}>×</button>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12 }}>ছবি: {eImages.length} / ৪ টা</div>
          <textarea value={eDesc} onChange={(e) => setEDesc(e.target.value)} placeholder="মন্তব্য" style={{ ...inp, height: 50 }} />
          <textarea value={eRemark} onChange={(e) => setERemark(e.target.value)} placeholder="Remark" style={{ ...inp, height: 50 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveEdit} style={{ flex: 1, background: "#16A34A", color: "#fff", padding: 12, border: "none", borderRadius: 10, fontWeight: 800 }}>✅ Edit সেভ - Admin-এ সংরক্ষিত থাকবে</button>
            <button onClick={() => setEdit(null)} style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid #ddd", background: "#fff" }}>❌ বাতিল</button>
          </div>
        </div>
      )}

      <h3>📥 নতুন আসা - Pending ({pending.length}টি)</h3>
      {pending.length === 0 && <div style={{ background: "#FEF3C7", padding: 12, borderRadius: 10 }}>এখনো Seller থেকে কোনো পণ্য আসে নাই। Seller থেকে Send করলে এখানে আসবে।</div>}
      {pending.map((p) => (
        <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ display: "flex", overflowX: "auto" }}>{(p.images || [p.img]).filter(Boolean).map((im: string, i: number) => (<img key={i} src={im} style={{ width: 160, height: 160, objectFit: "cover" }} />))}</div>
          <div style={{ padding: 12 }}>
            <b style={{ fontSize: 18 }}>{p.name}</b> <span style={{ fontSize: 12, color: "#666" }}>• {p.shop} - {p.shopName} - {p.phone}</span><br />
            <span>পাইকারি: {p.price}৳</span> <span style={{ color: "#666" }}>• খুচরা: {p.oldPrice}৳</span> <span>• {p.images?.length || 1} / ৪ টা ছবি</span><br />
            <span style={{ fontSize: 13, color: "#555" }}>মন্তব্য: {p.desc} | Remark: {p.remark}</span>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={() => startEdit(p)} style={{ flex: 1, background: "#FACC15", border: "none", padding: 11, borderRadius: 8, fontWeight: 800 }}>✏️ Edit</button>
              <button onClick={() => sendCustomer(p)} style={{ flex: 1, background: "#16A34A", color: "#fff", border: "none", padding: 11, borderRadius: 8, fontWeight: 800 }}>📤 Customer-এ পাঠান</button>
              <button onClick={() => reject(p.id)} style={{ padding: "11px 14px", background: "#fff", border: "1px solid #ddd", borderRadius: 8 }}>🗑️ Reject</button>
            </div>
          </div>
        </div>
      ))}

      <h3>💾 Admin-এ সংরক্ষিত ({saved.length}টি) - Edit করার পরও এখানে থাকবে</h3>
      {saved.map((p) => (
        <div key={p.id} style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 12, marginBottom: 10 }}>
          <b>{p.name}</b> - পাইকারি {p.price}৳ • খুচরা {p.oldPrice}৳ • {p.images?.length || 1} টা ছবি
          <button onClick={() => startEdit(p)} style={{ float: "right", background: "#FACC15", border: "none", padding: "6px 12px", borderRadius: 8, fontWeight: 800 }}>✏️ আবার Edit</button>
          <div style={{ fontSize: 12, color: "#666" }}>Admin Edit: {p.adminEditedAt || p.sentToCustomerAt || "সংরক্ষিত"}</div>
        </div>
      ))}

      <h3>🛍️ Customer-এ লাইভ ({live.length}টি) - Customer এগুলা দেখতেছে</h3>
      {live.map((p) => (
        <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ display: "flex", overflowX: "auto" }}>{(p.images || [p.img]).filter(Boolean).map((im: string, i: number) => (<img key={i} src={im} style={{ width: 120, height: 120, objectFit: "cover" }} />))}</div>
          <div style={{ padding: 12 }}><b>{p.name}</b> - পাইকারি {p.price}৳ • খুচরা {p.oldPrice}৳
            <button onClick={() => startEdit(p)} style={{ float: "right", marginLeft: 8, background: "#FACC15", border: "none", padding: "6px 10px", borderRadius: 8 }}>✏️ Edit</button>
            <button onClick={() => delLive(p.id)} style={{ float: "right", background: "#fff", border: "1px solid #ddd", padding: "6px 10px", borderRadius: 8 }}>Customer থেকে সরান</button>
          </div>
        </div>
      ))}
    </div>
  );
}
const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 6, outline: "none", boxSizing: "border-box" };
