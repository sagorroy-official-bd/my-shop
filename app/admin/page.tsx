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
    const next = [...customs, copy];
    setCustoms(next); localStorage.setItem("gausia_custom_products", JSON.stringify(next));
    alert("কাস্টমাইজড কপি বানানো হয়েছে - এখন ২ নম্বর সেকশনে এডিট করুন");
  };

  const approve = (item: any) => {
    const next = [...published, item];
    setPublished(next); localStorage.setItem("gausia_published", JSON.stringify(next));
    alert("Published হয়ে গেছে!");
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ background: "#000", color: "#fff", padding: 16, borderRadius: 10 }}>
        <h1>Admin Panel v1003 - Gawsia</h1>
        <p>Original: {originals.length} | Custom: {customs.length} | Published: {published.length}</p>
      </div>

      <h2 style={{ marginTop: 20 }}>1. Original Products (Seller থেকে আসা)</h2>
      {originals.length === 0 && <p>এখনো কোনো প্রোডাক্ট আসে নাই। Seller পেজ থেকে Send Admin দিতে হবে, একই Chrome এ।</p>}
      {originals.map((p: any) => (
        <div key={p.id} style={{ background: "#fff", padding: 12, margin: 8, borderRadius: 8, display: "flex", gap: 10 }}>
          <img src={p.image} alt="" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }} />
          <div style={{ flex: 1 }}><b>{p.title}</b><br />Retail: {p.retail} | Wholesale: {p.wholesale}</div>
          <button onClick={() => makeCustomCopy(p)} style={{ background: "#2563eb", color: "#fff", border: 0, padding: "8px 12px", borderRadius: 6 }}>Custom Copy বানান</button>
        </div>
      ))}

      <h2>2. Custom Products (এডিট করা যাবে)</h2>
      {customs.map((p: any) => (
        <div key={p.customId} style={{ background: "#fffbe6", padding: 12, margin: 8, borderRadius: 8 }}>
          <input value={p.customTitle} onChange={(e) => { const n = customs.map(x => x.customId === p.customId ? { ...x, customTitle: e.target.value } : x); setCustoms(n); localStorage.setItem("gausia_custom_products", JSON.stringify(n)); }} style={{ width: "100%", padding: 8, marginBottom: 6 }} />
          <input type="number" value={p.customPrice} onChange={(e) => { const n = customs.map(x => x.customId === p.customId ? { ...x, customPrice: e.target.value } : x); setCustoms(n); localStorage.setItem("gausia_custom_products", JSON.stringify(n)); }} style={{ width: "100%", padding: 8 }} />
          <button onClick={() => approve(p)} style={{ background: "#16a34a", color: "#fff", border: 0, padding: "8px 12px", borderRadius: 6, marginTop: 8 }}>Approve / Publish</button>
        </div>
      ))}

      <h2>3. Published Products</h2>
      {published.map((p: any, i: number) => (
        <div key={i} style={{ background: "#e6ffe6", padding: 10, margin: 8, borderRadius: 8 }}><b>{p.customTitle || p.title}</b> - {p.customPrice || p.retail} টাকা</div>
      ))}
    </div>
  );
}
