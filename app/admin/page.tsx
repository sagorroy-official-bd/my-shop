"use client";
import { useState, useEffect } from "react";

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
  const [approved, setApproved] = useState<any[]>([]); // ✅ Approve-এর পর এখানে থাকবে, Customer-এ যাবে না
  const [live, setLive] = useState<any[]>([]); // Customer দেখে
  const [edit, setEdit] = useState<any>(null);
  const [editFrom, setEditFrom] = useState<"pending" | "approved" | "live">("pending");
  const [eShop, setEShop] = useState(""); const [eShopName, setEShopName] = useState(""); const [ePhone, setEPhone] = useState("");
  const [eName, setEName] = useState(""); const [ePrice, setEPrice] = useState(""); const [eOld, setEOld] = useState("");
  const [eDesc, setEDesc] = useState(""); const [eRemark, setERemark] = useState(""); const [eImages, setEImages] = useState<string[]>([]);

  const load = async () => {
    let p = (await idbGet("admin_pending")) || [];
    let a = (await idbGet("admin_approved")) || [];
    let l = (await idbGet("admin_products")) || [];
    // আগের Live Sari-টা যাতে হারায় না - ওইটা Approved-এও কপি রাখা
    if (l.length > 0 && a.length === 0) { a = l.map((x: any) => ({ ...x, approvedAt: new Date().toLocaleString("bn-BD") })); await idbSet("admin_approved", a); }
    setPending(p); setApproved(a); setLive(l);
  };
  useEffect(() => { load(); }, []);

  const startEdit = (p: any, from: any) => {
    setEdit(p); setEditFrom(from);
    setEShop(p.shop || ""); setEShopName(p.shopName || ""); setEPhone(p.phone || "");
    setEName(p.name); setEPrice(p.price); setEOld(p.oldPrice);
    setEDesc(p.desc || ""); setERemark(p.remark || ""); setEImages(p.images || (p.img ? [p.img] : []));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditFiles = async (e: any) => {
    const files: File[] = Array.from(e.target.files || []);
    if (eImages.length + files.length > 4) { alert("সর্বোচ্চ ৪টা ছবি"); return; }
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

  // ✅ Edit সেভ - যেই সেকশন থেকে Edit করছেন, ওইখানেই আপডেট + Admin-এ সংরক্ষিত থাকবে
  const saveEdit = async () => {
    if (!edit) return;
    const updated = { ...edit, shop: eShop, shopName: eShopName, phone: ePhone, name: eName, price: ePrice, oldPrice: eOld, desc: eDesc, remark: eRemark, images: eImages, img: eImages[0] || "", adminEditedAt: new Date().toLocaleString("bn-BD") };
    if (editFrom === "pending") { const n = pending.map((p) => (p.id === edit.id ? updated : p)); await idbSet("admin_pending", n); setPending(n); }
    if (editFrom === "approved") { const n = approved.map((p) => (p.id === edit.id ? updated : p)); await idbSet("admin_approved", n); setApproved(n); }
    if (editFrom === "live") {
      const n = live.map((p) => (p.id === edit.id ? updated : p)); await idbSet("admin_products", n); setLive(n);
      const na = approved.map((p) => (p.id === edit.id ? updated : p)); await idbSet("admin_approved", na); setApproved(na);
    }
    setEdit(null); alert("✅ Edit সেভ হয়েছে - Admin-এ সংরক্ষিত থাকবে");
  };

  // ১ম Approve - Pending -> Approved (Customer-এ যাবে না এখনো)
  const approve = async (p: any) => {
    await idbSet("admin_pending", pending.filter((x) => x.id !== p.id)); setPending(pending.filter((x) => x.id !== p.id));
    const item = { ...p, approvedAt: new Date().toLocaleString("bn-BD") };
    const n = approved.some((x) => x.id === p.id) ? approved.map((x) => (x.id === p.id ? item : x)) : [...approved, item];
    await idbSet("admin_approved", n); setApproved(n);
    alert("✅ Approve হয়েছে! এখন Approved-এ আছে। Edit করে Customer-এ পাঠান।");
  };

  // ২য় ধাপ - Approved -> Customer Live
  const sendCustomer = async (p: any) => {
    const item = { ...p, sentToCustomerAt: new Date().toLocaleString("bn-BD") };
    const n = live.some((x) => x.id === p.id) ? live.map((x) => (x.id === p.id ? item : x)) : [...live, item];
    await idbSet("admin_products", n); setLive(n);
    alert("✅ Customer-এ পাঠানো হয়ে গেছে! Customer এখন দেখবে। Admin-এ কপি রয়ে গেছে।");
  };

  const backToPending = async (p: any) => {
    await idbSet("admin_approved", approved.filter((x) => x.id !== p.id)); setApproved(approved.filter((x) => x.id !== p.id));
    await idbSet("admin_pending", [...pending, p]); setPending([...pending, p]);
  };
  const rejectPending = async (id: number) => { if (!confirm("Reject করবো?")) return; await idbSet("admin_pending", pending.filter((x) => x.id !== id)); load(); };
  const delApproved = async (id: number) => { if (!confirm("Approved থেকে মুছবো?")) return; await idbSet("admin_approved", approved.filter((x) => x.id !== id)); load(); };
  const delLive = async (id: number) => { if (!confirm("Customer থেকে সরাবো? Approved-এ থাকবে")) return; await idbSet("admin_products", live.filter((x) => x.id !== id)); load(); };

  const Card = ({ p, from }: any) => (
    <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ display: "flex", overflowX: "auto" }}>{(p.images || [p.img]).filter(Boolean).map((im: string, i: number) => (<img key={i} src={im} style={{ width: 150, height: 150, objectFit: "cover" }} />))}</div>
      <div style={{ padding: 12 }}>
        <b style={{ fontSize: 18 }}>{p.name}</b> <span style={{ fontSize: 12, color: "#666" }}>• {p.shop} - {p.shopName} - {p.phone}</span><br />
        <span>পাইকারি: {p.price}৳</span> <span style={{ color: "#666" }}>• খুচরা: {p.oldPrice}৳</span> <span>• {p.images?.length || 1} / ৪ টা ছবি</span><br />
        <span style={{ fontSize: 13, color: "#555" }}>মন্তব্য: {p.desc} | Remark: {p.remark}</span><br />
        {p.adminEditedAt && <span style={{ fontSize: 12, color: "green" }}>✏️ Admin Edit: {p.adminEditedAt}</span>}
        {p.approvedAt && <span style={{ fontSize: 12, color: "#666" }}> • ✅ Approve: {p.approvedAt}</span>}
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          <button onClick={() => startEdit(p, from)} style={btnYellow}>✏️ Edit</button>
          {from === "pending" && (<><button onClick={() => approve(p)} style={btnGreen}>✅ Approve</button><button onClick={() => rejectPending(p.id)} style={btnWhite}>🗑️ Reject</button></>)}
          {from === "approved" && (<><button onClick={() => sendCustomer(p)} style={btnGreen}>📤 Customer-এ পাঠান</button><button onClick={() => backToPending(p)} style={btnWhite}>↩️ Pending-এ ফেরত</button><button onClick={() => delApproved(p.id)} style={btnWhite}>🗑️ মুছুন</button></>)}
          {from === "live" && (<><button onClick={() => sendCustomer(p)} style={btnGreen}>🔄 আবার Customer-এ পাঠান</button><button onClick={() => delLive(p.id)} style={btnWhite}>Customer থেকে সরান</button></>)}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <div style={{ background: "#111", color: "#fff", padding: 16, borderRadius: 12 }}>
        <h2 style={{ margin: 0 }}>👑 Admin Panel - Gawsia</h2>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Seller → Pending → Edit → Approve → Customer</div>
      </div>

      {edit && (
        <div style={{ background: "#FFFBEB", border: "2px solid #FACC15", padding: 16, borderRadius: 12, marginTop: 12 }}>
          <h3>✏️ Admin Edit করতেছেন - {edit.name} ({editFrom === "pending" ? "Pending" : editFrom === "approved" ? "Approved" : "Live"} থেকে)</h3>
          <input value={eShop} onChange={(e) => setEShop(e.target.value)} placeholder="SHOP-01" style={inp} />
          <input value={eShopName} onChange={(e) => setEShopName(e.target.value)} placeholder="দোকানের নাম" style={inp} />
          <input value={ePhone} onChange={(e) => setEPhone(e.target.value)} placeholder="মোবাইল" style={inp} />
          <input value={eName} onChange={(e) => setEName(e.target.value)} placeholder="পণ্যের নাম" style={inp} />
          <input value={ePrice} onChange={(e) => setEPrice(e.target.value)} placeholder="পাইকারি মূল্য - যেমন: 500" style={inp} />
          <input value={eOld} onChange={(e) => setEOld(e.target.value)} placeholder="খুচরা মূল্য - যেমন: 800" style={inp} />
          <input type="file" accept="image/*" multiple onChange={handleEditFiles} style={{ ...inp, padding: 8 }} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            {eImages.map((im, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img src={im} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: i === 0 ? "3px solid green" : "1px solid #ddd" }} />
                <button onClick={() => setEImages(eImages.filter((_, x) => x !== i))} style={{ position: "absolute", top: -6, right: -6, background: "red", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20 }}>×</button>
                {i === 0 && <div style={{ fontSize: 10, textAlign: "center", color: "green", fontWeight: 800 }}>MAIN</div>}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12 }}>ছবি: {eImages.length} / ৪ টা - প্রথম ছবিটা MAIN</div>
          <textarea value={eDesc} onChange={(e) => setEDesc(e.target.value)} placeholder="মন্তব্য" style={{ ...inp, height: 50 }} />
          <textarea value={eRemark} onChange={(e) => setERemark(e.target.value)} placeholder="Remark" style={{ ...inp, height: 50 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveEdit} style={{ flex: 1, background: "#16A34A", color: "#fff", padding: 12, border: "none", borderRadius: 10, fontWeight: 800 }}>✅ Edit সেভ - সংরক্ষিত থাকবে</button>
            <button onClick={() => setEdit(null)} style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid #ddd", background: "#fff" }}>❌ বাতিল</button>
          </div>
        </div>
      )}

      <h3>📥 Pending ({pending.length}টি) - Seller থেকে নতুন আসা</h3>
      {pending.length === 0 && <div style={{ background: "#FEF3C7", padding: 12, borderRadius: 10 }}>Pending খালি - Seller থেকে Send করলে এখানে আসবে</div>}
      {pending.map((p) => (<Card key={p.id} p={p} from="pending" />))}

      <h3>✅ Approved ({approved.length}টি) - Admin Edit + Approve হয়েছে, Customer-এ যায় নাই এখনো</h3>
      {approved.length === 0 && <div style={{ background: "#E0F2FE", padding: 12, borderRadius: 10 }}>Approved খালি - Pending থেকে Approve করলে এখানে আসবে</div>}
      {approved.map((p) => (<Card key={p.id} p={p} from="approved" />))}

      <h3>🛍️ Customer-এ লাইভ ({live.length}টি) - Customer এগুলা দেখতেছে</h3>
      {live.length === 0 && <div style={{ background: "#F0FDF4", padding: 12, borderRadius: 10 }}>Live খালি</div>}
      {live.map((p) => (<Card key={p.id} p={p} from="live" />))}
    </div>
  );
}
const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 6, outline: "none", boxSizing: "border-box" };
const btnGreen: any = { flex: 1, background: "#16A34A", color: "#fff", border: "none", padding: 11, borderRadius: 8, fontWeight: 800 };
const btnYellow: any = { flex: 1, background: "#FACC15", border: "none", padding: 11, borderRadius: 8, fontWeight: 800 };
const btnWhite: any = { padding: "11px 14px", background: "#fff", border: "1px solid #ddd", borderRadius: 8 };
