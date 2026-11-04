"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    setPending(JSON.parse(localStorage.getItem("admin_pending") || "[]"));
    setSaved(JSON.parse(localStorage.getItem("admin_saved") || "[]"));
  }, []);

  const approve = (item: any) => {
    const newSaved = [...saved, { ...item, status: "APPROVED", approvedAt: new Date().toLocaleString("bn-BD") }];
    const newPending = pending.filter((p) => p.id !== item.id);
    const customer = JSON.parse(localStorage.getItem("customer_products") || "[]");
    localStorage.setItem("admin_saved", JSON.stringify(newSaved));
    localStorage.setItem("admin_pending", JSON.stringify(newPending));
    localStorage.setItem("customer_products", JSON.stringify([...customer, item]));
    setSaved(newSaved); setPending(newPending);
    alert("✅ Approved! এখন Customer দেখতে পাবে");
  };

  const reject = (id: any) => {
    const np = pending.filter((p) => p.id !== id);
    localStorage.setItem("admin_pending", JSON.stringify(np)); setPending(np);
  };

  const removeSaved = (id: any) => {
    const ns = saved.filter((p) => p.id !== id);
    const cust = JSON.parse(localStorage.getItem("customer_products") || "[]").filter((p: any) => p.id !== id);
    localStorage.setItem("admin_saved", JSON.stringify(ns));
    localStorage.setItem("customer_products", JSON.stringify(cust));
    setSaved(ns);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16, fontFamily: "Hind Siliguri" }}>
      <div style={{ background: "#111", color: "#fff", padding: 20, borderRadius: 16 }}>
        <h1 style={{ margin: 0 }}>🛡️ Admin Panel - Gawsia</h1>
        <p style={{ opacity: 0.7 }}>Seller থেকে আসা পণ্য যাচাই করে Customer-কে পাঠান</p>
      </div>

      <h2 style={{ marginTop: 24 }}>📥 নতুন আসা - Pending ({pending.length}টি)</h2>
      {pending.length === 0 && <div style={{ background: "#FEF3C7", padding: 14, borderRadius: 12 }}>এখনো Seller থেকে কোনো পণ্য আসে নাই।</div>}
      {pending.map((p) => (
        <div key={p.id} style={{ display: "flex", gap: 12, background: "#fff", border: "1px solid #eee", padding: 12, borderRadius: 14, marginTop: 10, alignItems: "center" }}>
          <img src={p.img || p.image} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10 }} />
          <div style={{ flex: 1 }}>
            <b>{p.name} - {p.price}৳</b><br /><small>{p.shop} • {p.desc}</small>
          </div>
          <button onClick={() => approve(p)} style={{ background: "#16A34A", color: "#fff", border: "none", padding: "10px 14px", borderRadius: 10, fontWeight: 800 }}>✅ Approve</button>
          <button onClick={() => reject(p.id)} style={{ background: "#FEE2E2", border: "none", padding: "10px", borderRadius: 10 }}>❌</button>
        </div>
      ))}

      <h2 style={{ marginTop: 30 }}>💾 সংরক্ষিত - Approved ({saved.length}টি) - Customer এ লাইভ</h2>
      {saved.map((p) => (
        <div key={p.id} style={{ display: "flex", gap: 12, background: "#F0FDF4", border: "1px solid #BBF7D0", padding: 12, borderRadius: 14, marginTop: 10, alignItems: "center" }}>
          <img src={p.img || p.image} style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 10 }} />
          <div style={{ flex: 1 }}><b>{p.name} - {p.price}৳</b><br /><small>✅ Approved • {p.approvedAt}</small></div>
          <button onClick={() => removeSaved(p.id)} style={{ background: "#fff", border: "1px solid #ddd", padding: "8px 12px", borderRadius: 8 }}>Customer থেকে সরান</button>
        </div>
      ))}
    </div>
  );
}
