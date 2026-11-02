"use client";
import { useState } from "react";

const SHOPS = [
  { code: "SHOP-01", name: "মা ফ্যাশন" }, { code: "SHOP-02", name: "বোরকা" },
  { code: "SHOP-03", name: "পুরুষ ফ্যাশন" }, { code: "SHOP-04", name: "বাচ্চা দুনিয়া" },
  { code: "SHOP-05", name: "সিটি গোল্ড" }, { code: "SHOP-06", name: "থ্রি পিস" },
  { code: "SHOP-07", name: "পাঞ্জাবি" }, { code: "SHOP-08", name: "বেনারসি" },
  { code: "SHOP-09", name: "পার্টি ড্রেস" }, { code: "SHOP-10", name: "ফ্যামিলি" },
];

const FASHION_IMAGES = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop", // Saree
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop", // Hijab
  "https://images.unsplash.com/photo-1594938291221-94f1991fd6a8?w=500&auto=format&fit=crop", // Panjabi Men
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop", // Lehenga
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&auto=format&fit=crop", // Jewelry
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop", // Three Piece Women
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop", // Shirt Men
  "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&auto=format&fit=crop", // Girls Frock
  "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&auto=format&fit=crop", // Boys
  "https://images.unsplash.com/photo-1522771930-78848d9293e?w=500&auto=format&fit=crop", // Baby
];

const TEMPLATES = [
  { cat: "Women", name: "জর্জেট শাড়ি" }, { cat: "Women", name: "কাতান বোরকা" },
  { cat: "Men", name: "প্রিমিয়াম পাঞ্জাবি" }, { cat: "Women", name: "পার্টি লেহেঙ্গা" },
  { cat: "Women", name: "সিটি গোল্ড সেট" }, { cat: "Women", name: "থ্রি পিস" },
  { cat: "Men", name: "ক্যাজুয়াল শার্ট" }, { cat: "Girls", name: "পার্টি ফ্রক" },
  { cat: "Boys", name: "বয়স পাঞ্জাবি" }, { cat: "Baby", name: "বেবি ড্রেস" },
];

const PRODUCTS = Array.from({ length: 100 }, (_, i) => {
  const shop = SHOPS[Math.floor(i / 10)];
  const tpl = TEMPLATES[i % TEMPLATES.length];
  return {
    id: i + 1,
    code: `${shop.code}-${String((i%10)+1).padStart(3,"0")}`,
    name: `${tpl.name} - ${(i%10)+1}`,
    cat: tpl.cat,
    shop: shop.name,
    shopCode: shop.code,
    price: 850 + i*42,
    quality: i%4===0?"negative":"positive",
    img: FASHION_IMAGES[i % FASHION_IMAGES.length],
  };
});

export default function Home(){
  const [activeShop,setActiveShop]=useState("All");
  const [activeCat,setActiveCat]=useState("All");
  let filtered=PRODUCTS;
  if(activeShop!=="All") filtered=filtered.filter(p=>p.shopCode===activeShop);
  if(activeCat!=="All") filtered=filtered.filter(p=>p.cat===activeCat);

  return(
    <div className="min-h-screen bg-[#fff8f0]">
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-xl" style={{background:"linear-gradient(135deg,#ff6a00,#ee0979)"}}>G</div>
            <div><div className="font-black">GAUSIA COLLECTION</div><div className="text-[11px] font-bold text-pink-600">ছেলে • মেয়ে • বাচ্চা • ফ্যামিলি</div></div>
          </div>
          <div className="bg-black text-white text-xs px-4 py-2 rounded-full font-bold">{filtered.length} টি</div>
        </div>
        <div className="bg-black text-white text-center text-[11px] py-2">✨ ১০ দোকান x ১০ পণ্য = ১০০ টি | ভার্চুয়াল টেস্ট - ফাইনাল ✨</div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-[20px] p-3 border shadow-sm">
          <div className="flex gap-2 overflow-auto pb-1">
            <button onClick={()=>setActiveCat("All")} className={`px-4 py-2.5 rounded-full text-xs font-black border whitespace-nowrap ${activeCat==="All"?"bg-black text-white":"bg-gray-50"}`}>🛍️ সব (100)</button>
            <button onClick={()=>setActiveCat("Women")} className={`px-4 py-2.5 rounded-full text-xs font-black border whitespace-nowrap ${activeCat==="Women"?"bg-black text-white":"bg-gray-50"}`}>👩 মহিলা</button>
            <button onClick={()=>setActiveCat("Men")} className={`px-4 py-2.5 rounded-full text-xs font-black border whitespace-nowrap ${activeCat==="Men"?"bg-black text-white":"bg-gray-50"}`}>👨 পুরুষ</button>
            <button onClick={()=>setActiveCat("Girls")} className={`px-4 py-2.5 rounded-full text-xs font-black border whitespace-nowrap ${activeCat==="Girls"?"bg-black text-white":"bg-gray-50"}`}>👧 মেয়ে</button>
            <button onClick={()=>setActiveCat("Boys")} className={`px-4 py-2.5 rounded-full text-xs font-black border whitespace-nowrap ${activeCat==="Boys"?"bg-black text-white":"bg-gray-50"}`}>👦 ছেলে</button>
            <button onClick={()=>setActiveCat("Baby")} className={`px-4 py-2.5 rounded-full text-xs font-black border whitespace-nowrap ${activeCat==="Baby"?"bg-black text-white":"bg-gray-50"}`}>👶 বেবি</button>
          </div>
          <div className="flex gap-2 overflow-auto mt-3">
            <button onClick={()=>setActiveShop("All")} className={`px-3 py-2 rounded-full text-xs font-bold border ${activeShop==="All"?"bg-pink-600 text-white":"bg-white"}`}>সব দোকান</button>
            {SHOPS.map(s=><button key={s.code} onClick={()=>setActiveShop(s.code)} className={`px-3 py-2 rounded-full text-[11px] font-bold border whitespace-nowrap ${activeShop===s.code?"bg-black text-white":"bg-white"}`}>{s.code}</button>)}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-[22px] border overflow-hidden shadow-sm hover:shadow-lg transition">
              <div className="relative"><img src={p.img} className="w-full h-44 object-cover" alt={p.name}/><div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full text-[10px] font-mono font-bold">{p.code}</div><div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs">{p.quality==="positive"?"✅":"⚠️"}</div><div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-0.5 rounded-full text-[10px]">{p.cat}</div></div>
              <div className="p-3">
                <div className="font-black text-[13px]">{p.name}</div>
                <div className="text-[10px] text-gray-500">{p.shop}</div>
                <div className={`text-[10px] mt-1 font-bold px-2 py-1 rounded-full inline-block ${p.quality==="positive"?"bg-green-50 text-green-700":"bg-amber-50 text-amber-700"}`}>{p.quality==="positive"?"✅ পজিটিভ":"⚠️ নেগেটিভ"}</div>
                <div className="flex justify-between items-center mt-2"><b>{p.price}৳</b><a href={`https://wa.me/8801913129137?text=${p.code} কিনতে চাই`} target="_blank" className="bg-black text-white text-[11px] px-4 py-1.5 rounded-full font-black">অর্ডার</a></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
