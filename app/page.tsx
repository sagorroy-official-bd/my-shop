"use client";
import { useEffect, useState } from "react";

export default function CustomerPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("customer_products");
    if (saved) setProducts(JSON.parse(saved));
    else {
      // ডেমো পণ্য - Admin Approve না করা পর্যন্ত দেখাবে
      setProducts([
        { id: 1, name: "প্রিমিয়াম বোরকা", price: 1500, oldPrice: 2200, shop: "GAWSIA COLLECTION", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600", tag: "BEST SELLER" },
        { id: 2, name: "থ্রি-পিস কালেকশন", price: 1200, oldPrice: 1800, shop: "GAWSIA COLLECTION", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600", tag: "NEW" },
        { id: 3, name: "জামদানি শাড়ি", price: 2500, oldPrice: 3200, shop: "GAWSIA COLLECTION", img: "https://images.unsplash.com/photo-1610189844802-1c1a0b1e1b0a?w=600", tag: "PREMIUM" },
      ]);
    }
  }, []);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily: "Hind Siliguri, sans-serif", background: "#FFF9F5", minHeight: "100vh" }}>
      {/* TOP BAR */}
      <div style={{ background: "#111", color: "#fff", textAlign: "center", padding: "8px", fontSize: 13 }}>
        ✨ ক্যাশ অন ডেলিভারি • সারা বাংলাদেশে হোম ডেলিভারি • ১০০% অরিজিনাল ✨
      </div>

      {/* HEADER */}
      <header style={{ background: "#fff", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 1 }}>GAWSIA <span style={{ color: "#C026D3" }}>COLLECTION</span></div>
          <div style={{ fontSize: 11, color: "#666" }}>ভরসা • কোয়ালিটি • সেরা দাম</div>
        </div>
        <a href="https://wa.me/8801111111111" style={{ background: "#25D366", color: "#fff", padding: "9px 14px", borderRadius: 20, textDecoration: "none", fontWeight: 700, fontSize: 13 }}>WhatsApp অর্ডার</a>
      </header>

      {/* HERO BANNER */}
      <div style={{ margin: 16, background: "linear-gradient(135deg,#4A044E,#C026D3,#F97316)", borderRadius: 20, padding: 22, color: "#fff" }}>
        <div style={{ background: "#fff", color: "#C026D3", display: "inline-block", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>🔥 EID SPECIAL COLLECTION</div>
        <h1 style={{ fontSize: 30, lineHeight: 1.1, margin: "12px 0 8px" }}>সেরা কালেকশন<br />এখন হাতের মুঠোয়</h1>
        <p style={{ opacity: 0.9, fontSize: 14 }}>বোরকা • থ্রি-পিস • শাড়ি - সব এক জায়গায়</p>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 কি খুঁজছেন? বোরকা, থ্রি-পিস..." style={{ width: "100%", padding: 12, borderRadius: 12, border: "none", marginTop: 14, outline: "none" }} />
      </div>

      {/* CATEGORY */}
      <div style={{ display: "flex", gap: 10, padding: "0 16px", overflowX: "auto" }}>
        {["সবগুলো", "বোরকা", "থ্রি-পিস", "শাড়ি", "অফার"].map((c, i) => (
          <span key={i} style={{ background: i === 0 ? "#111" : "#fff", color: i === 0 ? "#fff" : "#111", padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", border: "1px solid #eee" }}>{c}</span>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800 }}>✨ আমাদের সেরা পণ্য <span style={{ color: "#C026D3" }}>({filtered.length}টি)</span></h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 12 }}>
          {filtered.map((p) => (
            <div key={p.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.06)" }}>
              <div style={{ position: "relative" }}>
                <img src={p.img} style={{ width: "100%", height: 190, objectFit: "cover" }} />
                <span style={{ position: "absolute", top: 8, left: 8, background: "#F97316", color: "#fff", fontSize: 11, padding: "3px 8px", borderRadius: 20, fontWeight: 800 }}>{p.tag}</span>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 10, color: "#888", letterSpacing: 1 }}>{p.shop}</div>
                <div style={{ fontWeight: 800, fontSize: 15, margin: "4px 0" }}>{p.name}</div>
                <div><span style={{ fontWeight: 900, color: "#C026D3", fontSize: 17 }}>{p.price}৳</span> <del style={{ color: "#999", fontSize: 12, marginLeft: 5 }}>{p.oldPrice}৳</del></div>
                <div style={{ color: "#22C55E", fontSize: 12, fontWeight: 700, margin: "4px 0" }}>⭐ 4.9 • স্টকে আছে</div>
                <a href={`https://wa.me/8801111111111?text=${encodeURIComponent("আমি এই পণ্যটি নিতে চাই: " + p.name + " - " + p.price + "৳")}`} style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", padding: "10px", borderRadius: 10, textDecoration: "none", fontWeight: 800, fontSize: 13, marginTop: 8 }}>🛒 এখনই অর্ডার করুন</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST */}
      <div style={{ margin: 16, background: "#fff", borderRadius: 16, padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center", gap: 10 }}>
        <div><div style={{ fontSize: 22 }}>🚚</div><b style={{ fontSize: 12 }}>দ্রুত ডেলিভারি</b></div>
        <div><div style={{ fontSize: 22 }}>💵</div><b style={{ fontSize: 12 }}>ক্যাশ অন ডেলিভারি</b></div>
        <div><div style={{ fontSize: 22 }}>↩️</div><b style={{ fontSize: 12 }}>সহজ রিটার্ন</b></div>
      </div>

      <footer style={{ textAlign: "center", padding: 20, fontSize: 12, color: "#888" }}>
        © 2026 Gawsia Collection • Bhulta, Rupganj, Narayanganj<br />ভালো পণ্য, সঠিক দাম - এটাই আমাদের প্রতিশ্রুতি
      </footer>
    </div>
  );
}
