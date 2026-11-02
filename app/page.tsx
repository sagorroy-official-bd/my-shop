"use client";
import { useState } from "react";

const SHOPS = [
  { code: "SHOP-01", name: "মা ফ্যাশন হাউজ" },
  { code: "SHOP-02", name: "বোরকা কালেকশন" },
  { code: "SHOP-03", name: "শাড়ি ভিলা" },
  { code: "SHOP-04", name: "লেহেঙ্গা প্যালেস" },
  { code: "SHOP-05", name: "সিটি গোল্ড হাউজ" },
  { code: "SHOP-06", name: "থ্রি পিস কর্নার" },
  { code: "SHOP-07", name: "হিজাব পয়েন্ট" },
  { code: "SHOP-08", name: "বেনারসি কালেকশন" },
  { code: "SHOP-09", name: "পার্টি ড্রেস হাউজ" },
  { code: "SHOP-10", name: "ট্র্যাডিশনাল ওয়্যার" },
];

const PRODUCTS = Array.from({ length: 100 }, (_, i) => {
  const shop = SHOPS[Math.floor(i / 10)];
  const n = (i % 10) + 1;
  const positive = i % 3 !== 0;
  return {
    id: i + 1,
    code: `${shop.code}-${String(n).padStart(3, "0")}`,
    name: `${["জর্জেট শাড়ি","কাতান বোরকা","পার্টি লেহেঙ্গা","সিটি গোল্ড সেট","প্রিমিয়াম থ্রি পিস","বেনারসি শাড়ি","হিজাব কম্বো","পার্টি ড্রেস"][i%8]} - ${n}`,
    shop: shop.name,
    shopCode: shop.code,
    price: 1250 + i * 35,
    quality: positive ? "positive" : "negative",
    img: `https://picsum.photos/seed/gausia${i}/500/500`,
  };
});

export default function Home() {
  const [active, setActive] = useState("সব");

  const filtered = active === "সব" ? PRODUCTS : PRODUCTS.filter(p => p.shopCode === active);

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{background:"linear-gradient(135deg,#ff6a00,#ee0979)"}}>G</div>
            <div>
              <div className="font-black">GAUSIA COLLECTION</div>
              <div className="text-[11px] font-bold text-pink-600">অনলাইন প্লাটফর্ম - ভার্চুয়াল টেস্ট</div>
            </div>
          </div>
          <div className="text-xs bg-black text-white px-3 py-1 rounded-full">{filtered.length} টি</div>
        </div>
        <div className="bg-black text-white text-center text-[11px] py-1.5">১০ দোকান x ১০ পণ্য = ১০০% ভার্চুয়াল | নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতা</div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-auto pb-2">
          <button onClick={()=>setActive("সব")} className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap ${active==="সব"?"bg-black text-white":"bg-white"}`}>সব (100)</button>
          {SHOPS.map(s=>(
            <button key={s.code} onClick={()=>setActive(s.code)} className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap ${active===s.code?"bg-black text-white":"bg-white"}`}>{s.code}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-3">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-[20px] border overflow-hidden">
              <img src={p.img} className="w-full h-32 object-cover" alt={p.name}/>
              <div className="p-3">
                <div className="flex justify-between">
                  <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded-full">{p.code}</span>
                  <span className="text-[11px]">{p.quality==="positive"?"✅":"⚠️"}</span>
                </div>
                <div className="font-bold text-sm mt-1 leading-tight">{p.name}</div>
                <div className="text-[10px] text-gray-500 mt-1">{p.shop}</div>
                <div className="text-[11px] mt-1">{p.quality==="positive"?"✅ পজিটিভ - অরিজিনাল":"⚠️ নেগেটিভ - এভারেজ"}</div>
                <div className="flex justify-between items-center mt-2">
                  <b className="text-sm">{p.price}৳</b>
                  <a href={`https://wa.me/8801913129137?text=${encodeURIComponent(`আমি ${p.code} ${p.name} কিনতে চাই`)}`} target="_blank" className="bg-black text-white text-[11px] px-3 py-1 rounded-full font-bold">অর্ডার</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
