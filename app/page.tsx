"use client";
import { useState } from "react";

const SHOPS = [
  { code: "SHOP-01", name: "মা ফ্যাশন" }, { code: "SHOP-02", name: "বোরকা" },
  { code: "SHOP-03", name: "পুরুষ ফ্যাশন" }, { code: "SHOP-04", name: "বাচ্চা দুনিয়া" },
  { code: "SHOP-05", name: "সিটি গোল্ড" }, { code: "SHOP-06", name: "থ্রি পিস" },
  { code: "SHOP-07", name: "পাঞ্জাবি" }, { code: "SHOP-08", name: "বেনারসি" },
  { code: "SHOP-09", name: "পার্টি ড্রেস" }, { code: "SHOP-10", name: "ফ্যামিলি" },
];

const CATS = [
  { id: "All", label: "সব (100)", icon: "🛍️" },
  { id: "Women", label: "মহিলা", icon: "👩" },
  { id: "Men", label: "পুরুষ", icon: "👨" },
  { id: "Girls", label: "মেয়ে বাচ্চা", icon: "👧" },
  { id: "Boys", label: "ছেলে বাচ্চা", icon: "👦" },
  { id: "Baby", label: "বেবি", icon: "👶" },
];

const TEMPLATES = [
  { cat: "Women", name: "জর্জেট শাড়ি", color: "from-pink-400 to-rose-500" },
  { cat: "Women", name: "কাতান বোরকা", color: "from-violet-400 to-purple-500" },
  { cat: "Men", name: "প্রিমিয়াম পাঞ্জাবি", color: "from-blue-400 to-indigo-500" },
  { cat: "Women", name: "পার্টি লেহেঙ্গা", color: "from-red-400 to-pink-500" },
  { cat: "Women", name: "সিটি গোল্ড সেট", color: "from-yellow-400 to-amber-500" },
  { cat: "Women", name: "থ্রি পিস", color: "from-emerald-400 to-teal-500" },
  { cat: "Men", name: "ক্যাজুয়াল শার্ট", color: "from-slate-400 to-gray-600" },
  { cat: "Women", name: "বেনারসি শাড়ি", color: "from-orange-400 to-red-500" },
  { cat: "Girls", name: "পার্টি ফ্রক", color: "from-pink-300 to-purple-400" },
  { cat: "Boys", name: "বয়স পাঞ্জাবি", color: "from-cyan-400 to-blue-500" },
  { cat: "Baby", name: "বেবি ড্রেস", color: "from-yellow-200 to-pink-300" },
];

const PRODUCTS = Array.from({ length: 100 }, (_, i) => {
  const shop = SHOPS[Math.floor(i / 10)];
  const tpl = TEMPLATES[i % TEMPLATES.length];
  const n = (i % 10) + 1;
  return {
    id: i + 1,
    code: `${shop.code}-${String(n).padStart(3, "0")}`,
    name: `${tpl.name} - ${n}`,
    cat: tpl.cat,
    shop: shop.name,
    shopCode: shop.code,
    price: 850 + i * 42,
    quality: i % 4 === 0 ? "negative" : "positive",
    color: tpl.color,
    // ১০০% লোড হবে এমন ছবি - picsum reliable
    img: `https://picsum.photos/seed/gausia${i}F/500/600`,
  };
});

export default function Home() {
  const [activeShop, setActiveShop] = useState("All");
  const [activeCat, setActiveCat] = useState("All");
  let filtered = PRODUCTS;
  if (activeShop !== "All") filtered = filtered.filter(p => p.shopCode === activeShop);
  if (activeCat !== "All") filtered = filtered.filter(p => p.cat === activeCat);

  return (
    <div className="min-h-screen bg-[#fff8f0]">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow" style={{background:"linear-gradient(135deg,#ff6a00,#ee0979)"}}>G</div>
            <div><div className="font-black text-[17px] leading-none tracking-tight">GAUSIA COLLECTION</div><div className="text-[11px] font-bold text-pink-600 mt-1">ছেলে • মেয়ে • বাচ্চা • ফ্যামিলি কালেকশন</div></div>
          </div>
          <div className="bg-black text-white text-xs px-4 py-2 rounded-full font-bold">{filtered.length} টি পণ্য</div>
        </div>
        <div className="h-1 w-full" style={{background:"linear-gradient(90deg,#ff6a00,#ee0979,#ff6a00)"}}></div>
        <div className="bg-[#111] text-white text-center text-[11px] py-2 tracking-wide">✨ ১০ দোকান x ১০ পণ্য = ১০০% ভার্চুয়াল টেস্ট | নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতা ✨</div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-[20px] p-3 shadow-sm border">
          <div className="text-[11px] font-black mb-2 opacity-60">ক্যাটাগরি অনুযায়ী দেখুন:</div>
          <div className="flex gap-2 overflow-auto pb-1">
            {CATS.map(c=>(
              <button key={c.id} onClick={()=>setActiveCat(c.id)} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black border transition-all whitespace-nowrap ${activeCat===c.id?"bg-black text-white border-black shadow-lg scale-105":"bg-gray-50 hover:bg-white"}`}><span>{c.icon}</span>{c.label}</button>
            ))}
          </div>
          <div className="text-[11px] font-black mb-2 mt-3 opacity-60">দোকান অনুযায়ী:</div>
          <div className="flex gap-2 overflow-auto">
            <button onClick={()=>setActiveShop("All")} className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap ${activeShop==="All"?"bg-gradient-to-r from-pink-600 to-orange-500 text-white border-transparent":"bg-white"}`}>সব দোকান</button>
            {SHOPS.map(s=>(
              <button key={s.code} onClick={()=>setActiveShop(s.code)} className={`px-3 py-2 rounded-full text-[11px] font-bold border whitespace-nowrap ${activeShop===s.code?"bg-black text-white":"bg-white"}`}>{s.code}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-[22px] border shadow-[0_8px_20px_rgba(0,0,0,0.06)] overflow-hidden group hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all">
              <div className="relative">
                <img src={p.img} className="w-full h-44 object-cover" alt={p.name}/>
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${p.color}`}></div>
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-mono font-bold shadow">{p.code}</div>
                <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-[13px] shadow">{p.quality==="positive"?"✅":"⚠️"}</div>
                <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded-full text-[10px] font-bold">{p.cat}</div>
              </div>
              <div className="p-3.5">
                <div className="font-black text-[13px] leading-tight line-clamp-1">{p.name}</div>
                <div className="text-[11px] text-gray-500 mt-1">{p.shop} • {p.cat}</div>
                <div className={`text-[11px] mt-1.5 px-2 py-1 rounded-full inline-block font-bold ${p.quality==="positive"?"bg-green-50 text-green-700":"bg-amber-50 text-amber-700"}`}>{p.quality==="positive"?"✅ পজিটিভ - অরিজিনাল":"⚠️ নেগেটিভ - এভারেজ"}</div>
                <div className="flex justify-between items-center mt-3">
                  <div><div className="text-[10px] text-gray-400 line-through">{p.price+300}৳</div><div className="font-black text-[16px] -mt-1">{p.price}৳</div></div>
                  <a href={`https://wa.me/8801913129137?text=${encodeURIComponent(`আমি ${p.code} ${p.name} কিনতে চাই`)}`} target="_blank" className="bg-black text-white text-[11px] px-4 py-2 rounded-full font-black hover:bg-gray-800">অর্ডার</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
