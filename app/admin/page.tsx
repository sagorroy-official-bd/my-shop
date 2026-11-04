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
  const [fShop, setFShop] = useState(""); const [fShopName, setFShopName] = useState(""); const [fPhone, setFPhone] = useState("");
  const [fName, setFName] = useState(""); const [fPrice, setFPrice] = useState(""); const [fOld, setFOld] = useState("");
  const [fDesc, setFDesc] = useState(""); const [fRemark, setFRemark] = useState(""); const [fImgs, setFImgs] = useState<any[]>([]);
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
    setFShop(p.shop || ""); setFShopName(p.shopName || ""); setFPhone(p.phone || "");
    setFName(p.name); setFPrice(p.price); setFOld(p.oldPrice);
    setFDesc(p.desc || ""); setFRemark(p.remark || ""); setFImgs(p.images || (p.img ? [p.img] : []));
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
  const saveEdit = async () => {
    if (!editId) return;
    const mk = (list: any[]) => list.map((x) => x.id === editId ? { ...x, shop: fShop, shopName: fShopName, phone: fPhone, name: fName, price: fPrice, oldPrice: fOld, desc: fDesc, remark: fRemark, images: fImgs, img: fImgs[0] || "", adminEditedAt: new Date().toLocaleString("bn-BD") } : x);
    if (editFrom === "pending") { const n = mk(pending); await setK("admin_pending", n); setPending(n); }
    if (editFrom === "approved") { const n = mk(approved); await setK("admin_approved", n); setApproved(n); }
    if (editFrom === "live") { const n = mk(live); await setK("admin_products", n); setLive(n); const na = mk(approved); await setK("admin_approved", na); setApproved(na); }
    setEditId(null); alert("Edit সেভ হয়েছে");
  };
  const doApprove = async (p: any) => {
    const nP = pending.filter((x) => x.id !== p.id); await setK("admin_pending", nP); setPending(nP);
    const item = { ...p, approvedAt: new Date().toLocaleString("bn-BD") };
    const nA = approved.some((x) => x.id === p.id) ? approved.map((x) => x.id === p.id ? item : x) : [...approved, item];
    await setK("admin_approved", nA); setApproved(nA);
    alert("Approve হয়েছে - এখন Approved-এ আছে, Customer-এ যায় নাই");
  };
  const doSendCustomer = async (p: any) => {
    const item = { ...p, sentToCustomerAt: new Date().toLocaleString("bn-BD") };
    const nL = live.some((x) => x.id === p.id) ? live.map((x) => x.id === p.id ? item : x) : [...live, item];
    await setK("admin_products", nL); setLive(nL);
    alert("Customer-এ পাঠানো হয়েছে");
  };
  const inp: any = { width: "100%", padding: 11, borderRadius: 10, border: "1px solid #ddd", marginBottom: 6, outline: "none", boxSizing: "border-box" };
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <div style={{ background: "#111", color: "#fff", padding: 16, borderRadius: 12 }}>
        <h2 style={{ margin: 0 }}>Admin Panel v999 - Gawsia</h2>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Seller - Pending - Edit - Approve - Customer</div>
      </div>
      {editId && (
        <div style={{ background: "#FFFBEB", border: "2px solid #FACC15", padding: 16, borderRadius: 12, marginTop: 12 }}>
          <h3>Edit করতেছেন - {editFrom}</h3>
          <input value={fShop} onChange={(e) => setFShop(e.target.value)} placeholder="SHOP-01" style={inp} />
          <input value={fShopName} onChange={(e) => setFShopName(e.target.value)} placeholder="দোকানের নাম" style={inp} />
          <input value={fPhone} onChange={(e) => setFPhone(e.target.value)} placeholder="মোবাইল" style={inp} />
          <input value={fName} onChange={(e) => setFName(e.target.value)} placeholder="পণ্যের নাম" style={inp} />
          <input value={fPrice} onChange={(e) => setFPrice(e.target.value)} placeholder="পাইকারি মূল্য" style={inp} />
          <input value={fOld} onChange={(e) => setFOld(e.target.value)} placeholder="খুচরা মূল্য" style={inp} />
          <input type="file" accept="image/*" multiple onChange={onFiles} style={{ ...inp, padding: 8 }} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {fImgs.map((im: any, i: number) => (
              <div key={i} style={{ position: "relative" }}>
                <img src={im} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
                <button onClick={() => setFImgs(fImgs.filter((_: any, x: number) => x !== i))} style={{ position: "absolute", top: -6, right: -6, background: "red", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20 }}>x</button>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, margin: "6px 0" }}>ছবি: {fImgs.length} / ৪ টা</div>
          <textarea value={fDesc} onChange={(e) => setFDesc(e.target.value)} placeholder="মন্তব্য" style={{ ...inp, height: 50 }} />
          <textarea value={fRemark} onChange={(e) => setFRemark(e.target.value)} placeholder="Remark" style={{ ...inp, height: 50 }} />
          <button onClick={saveEdit} style={{ width: "100%", background: "#16A34A", color: "#fff", padding: 12, border: "none", borderRadius: 10, fontWeight: 800 }}>Edit সেভ করুন</button>
          <button onClick={() => setEditId(null)} style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 10, border: "1px solid #ddd", background: "#fff" }}>বাতিল</button>
        </div>
      )}
      <h3>Pending - {pending.length} টি</h3>
      {pending.map((p: any) => (
        <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ display: "flex", overflowX: "auto" }}>{(p.images || [p.img]).filter(Boolean).map((im: any, i: number) => (<img key={i} src={im} style={{ width: 150, height: 150, objectFit: "cover" }} />))}</div>
          <div style={{ padding: 12 }}><b>{p.name}</b> - পাইকারি {p.price}৳ - খুচরা {p.oldPrice}৳ - {p.images?.length || 1} টা ছবি<br />
            <button onClick={() => startEdit(p, "pending")} style={{ background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, marginRight: 8, marginTop: 8 }}>Edit</button>
            <button onClick={() => doApprove(p)} style={{ background: "#16A34A", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: 800 }}>Approve</button>
          </div>
        </div>
      ))}
      <h3>Approved - {approved.length} টি - Edit করা যাবে, Customer-এ যায় নাই</h3>
      {approved.map((p: any) => (
        <div key={p.id} style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ display: "flex", overflowX: "auto" }}>{(p.images || [p.img]).filter(Boolean).map((im: any, i: number) => (<img key={i} src={im} style={{ width: 150, height: 150, objectFit: "cover" }} />))}</div>
          <div style={{ padding: 12 }}><b>{p.name}</b> - পাইকারি {p.price}৳ - খুচরা {p.oldPrice}৳<br />
            <button onClick={() => startEdit(p, "approved")} style={{ background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, marginRight: 8, marginTop: 8 }}>Edit</button>
            <button onClick={() => doSendCustomer(p)} style={{ background: "#16A34A", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: 800 }}>Customer-এ পাঠান</button>
          </div>
        </div>
      ))}
      <h3>Customer-এ লাইভ - {live.length} টি</h3>
      {live.map((p: any) => (
        <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ display: "flex", overflowX: "auto" }}>{(p.images || [p.img]).filter(Boolean).map((im: any, i: number) => (<img key={i} src={im} style={{ width: 120, height: 120, objectFit: "cover" }} />))}</div>
          <div style={{ padding: 12 }}><b>{p.name}</b> - পাইকারি {p.price}৳ - খুচরা {p.oldPrice}৳<br />
            <button onClick={() => startEdit(p, "live")} style={{ background: "#FACC15", border: "none", padding: 10, borderRadius: 8, fontWeight: 800, marginRight: 8, marginTop: 8 }}>Edit</button>
            <button onClick={() => doSendCustomer(p)} style={{ background: "#16A34A", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: 800 }}>আবার Customer-এ পাঠান</button>
          </div>
        </div>
      ))}
    </div>
  );
}
