"use client";
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "8801913129137";
const CATEGORIES = [
  { id: "সব", idEn: "All" },
  { id: "শাড়ি", idEn: "Saree" },
  { id: "থ্রি পিস", idEn: "3 Pcs" },
  { id: "লেহেঙ্গা", idEn: "Lehenga" },
  { id: "বোরকা", idEn: "Borka" },
  { id: "সিটি গোল্ড", idEn: "City Gold" },
  { id: "হিজাব", idEn: "Hijab" },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [active, setActive] = useState("সব");

  useEffect(()=>{
    const saved = localStorage.getItem("gausia_products");
    if(saved){
      setProducts(JSON.parse(saved));
    } else {
      setProducts([
        { id: 1, code: "SHOP-01-001", name: "জর্জেট পার্টি শাড়ি", finalPrice: 1650, shop: "SHOP-01", quality: "positive" },
        { id: 2, code: "SHOP-02-001", name: "কাতান বোরকা", finalPrice: 2200, shop: "SHOP-02", quality: "negative" },
      ]);
    }
  },[]);

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* HEADER - GAUSIA COLLECTION + অনলাইন প্লাটফর্ম */}
      <header className="sticky top-0 bg-white/90 backdrop-blur border-b z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{background:"linear-gradient(135deg,#ff6a00,#ee0979)"}}>G</div>
            <div>
              <div className="font-black leading-none">GAUSIA COLLECTION</div>
              <div className="text-[11px] font-bold text-pink-600 tracking-widest">অনলাইন প্লাটফর্ম</div>
            </div>
          </div>
          <a href="/admin" className="text-xs bg-black text-white px-4 py-1.5 rounded-full">Admin</a>
        </div>
        <div className="text-center py-1 bg-black text-white text-[11px]">নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতা - ১০০% যাচাইকৃত পণ্য</div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-auto pb-2">
          {CATEGORIES.map(c=>(
            <button key={c.id} onClick={()=>setActive(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border ${active===c.id?"bg-black text-white":"bg-white"}`}>{c.id}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {products.map(p=>(
            <div key={p.id} className="bg-white rounded-[20px] border p-3 shadow-sm">
              <div className="w-full h-28 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">{p.quality==="positive"?"✅":"⚠️"}</div>
              <div className="mt-2 text-[11px] font-mono bg-gray-100 inline-block px-2 py-0.5 rounded-full">{p.code}</div>
              <div className="font-bold text-sm mt-1">{p.name}</div>
              <div className="text-xs mt-1">{p.quality==="positive"? "✅ পজিটিভ - ১০০% অরিজিনাল" : "⚠️ নেগেটিভ - কপি/এভারেজ কোয়ালিটি"}</div>
              <div className="flex justify-between items-center mt-2">
                <div className="font-black">{p.finalPrice}৳</div>
                <div className="text-[10px] text-gray-500">{p.shop}</div>
              </div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`আমি ${p.code} - ${p.name} (${p.quality==="positive"?"✅":"⚠️"} ${p.quality}) কিনতে চাই`)}`} target="_blank" className="block w-full text-center bg-black text-white rounded-full py-2 mt-3 text-xs font-bold">অর্ডার করুন</a>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          দোকানদার লিংক: <span className="font-mono bg-white border px-2 py-1 rounded">/seller</span> | এডমিন লিংক: <span className="font-mono bg-white border px-2 py-1 rounded">/admin</span>
        </div>
      </main>
    </div>
  );
}
