"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [originals, setOriginals] = useState<any[]>([]);
  const [customs, setCustoms] = useState<any[]>([]);
  const [published, setPublished] = useState<any[]>([]);

  useEffect(() => {
    setOriginals(JSON.parse(localStorage.getItem("gausia_all_products") || "[]"));
    setCustoms(JSON.parse(localStorage.getItem("gausia_custom_products") || "[]"));
    setPublished(JSON.parse(localStorage.getItem("gausia_published") || "[]"));
  }, []);

  const makeCustomCopy = (item: any) => {
    const copy = { ...item, customId: Date.now(), customTitle: item.title, customPrice: item.retail, customComment: item.comment || "" };
    const next = [copy, ...customs];
    setCustoms(next); localStorage.setItem("gausia_custom_products", JSON.stringify(next));
    alert("কাস্টমাইজ কপি বানানো হয়েছে - এখন ২ নম্বর সেকশনে এডিট করেন");
  };

  const approve = (item: any) => {
    const nextPub = [{ ...item, approvedAt: new Date().toLocaleString() }, ...published];
    setPublished(nextPub); localStorage.setItem("gausia_published", JSON.stringify(nextPub));
    const nextCustom = customs.filter((c: any) => c.customId !== item.customId);
    setCustoms(nextCustom); localStorage.setItem("gausia_custom_products", JSON.stringify(nextCustom));
    alert("Approve হয়ে কাস্টমার পেজে চলে গেছে ✅");
  };

  const deleteOriginal = (id: any) => { if (!confirm("ডিলিট করবেন?")) return; const n = originals.filter((o: any) => o.id !== id); setOriginals(n); localStorage.setItem("gausia_all_products", JSON.stringify(n)); };
  const deleteCustom = (id: any) => { if (!confirm("ডিলিট করবেন?")) return; const n = customs.filter((c: any) => c.customId !== id); setCustoms(n); localStorage.setItem("gausia_custom_products", JSON.stringify(n)); };

  return (
    <div style={{ background: "#f6f6f4", minHeight: "100vh" }}>
      {/* ===== স্ট্যান্ডার্ড কালো হেডার - ২য় লাইন হেডারের ভেতরেই ===== */}
      <div style={{ background: "#111", color: "white", padding: "16px 22px 14px", borderBottom: "5px solid #FF9900", position: "sticky", top: 0, zIndex: 99 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ background: "#FF9900", color: "black", width: "46px", height: "46px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "24px", border: "2px solid white" }}>G</div>
            <div>
              <div style={{ fontSize: "20px", fontWeight: 800 }}>Admin Panel <span style={{ fontSize: "12px", background: "#FF9900", color: "black", padding: "2px 8px", borderRadius: "20px", marginLeft: "6px" }}>v1002</span> <span style={{ fontSize: "16px" }}>- Gausia</span></div>
              {/* ২য় লাইন - হেডারের ভেতরেই, বাইরে আর ডাবল লেখা নাই */}
              <div style={{ fontSize: "12px", color: "#FFCC00", marginTop: "3px" }}>১. সেলারের অরিজিনাল সংরক্ষণ → ২. কাস্টমাইজ কপি → ৩. Approve দিয়ে কাস্টমারে পাঠান</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <a href="/" style={hBtn}>🏠 Home</a>
            <a href="/seller" style={hBtn}>Seller</a>
            <a href="/admin" style={{ ...hBtn, background: "#FF9900", color: "black", border: "1px solid white" }}>⚙️ Admin</a>
          </div>
        </div>
        {/* কাউন্ট বার - হেডারের ভেতরেই */}
        <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
          <span style={countChip}>অরিজিনাল: {originals.length} টি</span>
          <span style={countChip}>কাস্টমাইজ: {customs.length} টি</span>
          <span style={{ ...countChip, background: "#22c55e", color: "white" }}>কাস্টমারে গেছে: {published.length} টি</span>
        </div>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px", margin: "0 auto" }}>
        {/* ১ নম্বর */}
        <div style={card}>
          <h3 style={{ margin: "0 0 4px" }}>📦 ১. সেলারের দেওয়া পেজ - অরিজিনাল <span style={{ fontSize: "12px", color: "#888" }}>(এটা এডিট হবে না)</span></h3>
          {originals.length === 0 ? <p style={{ color: "#888" }}>কোনো অরিজিনাল নাই - Seller থেকে Send Admin করলে এখানে আসবে</p> :
            originals.map((it: any) => (
              <div key={it.id} style={itemBox}>
                {it.images?.[0] && <img src={it.images[0]} style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "10px" }} />}
                <div style={{ flex: 1 }}><b>{it.title}</b><div style={{ fontSize: "13px" }}>পাইকারি: {it.wholesale}৳ | খুচরা: {it.retail}৳ | দোকান: {it.shop}</div><div style={{ fontSize: "12px", color: "#666" }}>ছবি: {it.images?.length || 0} টা | মন্তব্য: {it.comment}</div></div>
                <button onClick={() => makeCustomCopy(it)} style={btn("#111")}>📋 কাস্টমাইজ কপি বানান</button>
                <button onClick={() => deleteOriginal(it.id)} style={btn("red")}>🗑️</button>
              </div>
            ))}
        </div>

        {/* ২ নম্বর */}
        <div style={{ ...card, border: "2px solid #FF9900" }}>
          <h3 style={{ margin: "0 0 4px" }}>✏️ ২. আমার কাস্টমাইজ কপি - মার্কেটিং-এর জন্য এটা এডিট করবেন</h3>
          {customs.length === 0 ? <p style={{ color: "#888", background: "#fff7e6", padding: "10px", borderRadius: "10px" }}>এখনো কাস্টমাইজ কপি নাই। উপরে অরিজিনালে 📋 কাস্টমাইজ কপি বানান চাপ দেন।</p> :
            customs.map((it: any) => (
              <div key={it.customId} style={itemBox}>
                {it.images?.[0] && <img src={it.images[0]} style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "10px" }} />}
                <div style={{ flex: 1 }}>
                  <input value={it.customTitle} onChange={(e) => { const n = customs.map((c: any) => c.customId === it.customId ? { ...c, customTitle: e.target.value } : c); setCustoms(n); localStorage.setItem("gausia_custom_products", JSON.stringify(n)); }} style={{ width: "100%", padding: "7px", borderRadius: "8px", border: "1px solid #ddd", fontWeight: 700 }} />
                  <input value={it.customPrice} onChange={(e) => { const n = customs.map((c: any) => c.customId === it.customId ? { ...c, customPrice: e.target.value } : c); setCustoms(n); localStorage.setItem("gausia_custom_products", JSON.stringify(n)); }} style={{ width: "120px", padding: "7px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "6px" }} placeholder="দাম" />
                </div>
                <button onClick={() => approve(it)} style={btn("green")}>✅ Approve</button>
                <button onClick={() => deleteCustom(it.customId)} style={btn("red")}>🗑️</button>
              </div>
            ))}
        </div>

        {/* ৩ নম্বর */}
        <div style={{ ...card, border: "2px solid #22c55e" }}>
          <h3 style={{ margin: "0 0 4px" }}>✅ ৩. কাস্টমার পেজে গেছে</h3>
          {published.length === 0 ? <p style={{ color: "#888" }}>এখনো কিছু কাস্টমারে যায় নাই</p> :
            published.map((it: any, i: number) => (
              <div key={i} style={itemBox}>
                {it.images?.[0] && <img src={it.images[0]} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "10px" }} />}
                <div style={{ flex: 1 }}><b>{it.customTitle || it.title}</b><div>দাম: {it.customPrice || it.retail}৳</div><div style={{ fontSize: "12px", color: "green" }}>Approve: {it.approvedAt}</div></div>
                <a href="/" style={{ ...btn("black"), textDecoration: "none" }}>👁️ দেখুন</a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
const hBtn: any = { textDecoration: "none", color: "white", background: "#333", padding: "9px 16px", borderRadius: "20px", fontWeight: 700, fontSize: "13px", border: "1px solid #555" };
const countChip: any = { background: "#2a2a2a", border: "1px solid #444", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700 };
const card: any = { background: "white", border: "1px solid #e5e5e5", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" };
const itemBox: any = { display: "flex", gap: "10px", alignItems: "center", border: "1px solid #eee", padding: "10px", borderRadius: "12px", marginTop: "10px", flexWrap: "wrap" };
const btn = (bg: string): any => ({ background: bg, color: "white", border: "none", padding: "9px 14px", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "13px" });
