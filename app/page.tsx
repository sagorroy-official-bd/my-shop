"use client";
import { useState } from "react";

const SHOPS = [
  { code: "SHOP-01", name: "মা ফ্যাশন হাউজ" },
  { code: "SHOP-02", name: "বোরকা কালেকশন" },
  { code: "SHOP-03", name: "পুরুষ ফ্যাশন" },
  { code: "SHOP-04", name: "বাচ্চাদের দুনিয়া" },
  { code: "SHOP-05", name: "সিটি গোল্ড হাউজ" },
  { code: "SHOP-06", name: "থ্রি পিস কর্নার" },
  { code: "SHOP-07", name: "ছেলেদের পাঞ্জাবি" },
  { code: "SHOP-08", name: "বেনারসি কালেকশন" },
  { code: "SHOP-09", name: "মেয়েদের পার্টি ড্রেস" },
  { code: "SHOP-10", name: "ফ্যামিলি কালেকশন" },
];

const CATEGORIES = [
  { id: "All", name: "সব (100)" },
  { id: "Women", name: "👩 মহিলা" },
  { id: "Men", name: "👨 পুরুষ" },
  { id: "Girls", name: "👧 মেয়ে বাচ্চা" },
  { id: "Boys", name: "👦 ছেলে বাচ্চা" },
  { id: "Baby", name: "👶 বেবি" },
];

const PRODUCT_TEMPLATES = [
  { cat: "Women", name: "জর্জেট শাড়ি", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400" },
  { cat: "Women", name: "কাতান বোরকা", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400" },
  { cat: "Men", name: "প্রিমিয়াম পাঞ্জাবি", img: "https://images.unsplash.com/photo-1594938291221-94f1991fd6a8?w=400" },
  { cat: "Women", name: "পার্টি লেহেঙ্গা", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
  { cat: "Women", name: "সিটি গোল্ড সেট", img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
  { cat: "Women", name: "থ্রি পিস", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
  { cat: "Men", name: "ক্যাজুয়াল শার্ট", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400" },
  { cat: "Women", name: "বেনারসি শাড়ি", img: "https://images.unsplash.com/photo-1609357605129-97a9c4a2cf25?w=400" },
  { cat: "Girls", name: "পার্টি ফ্রক", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400" },
  { cat: "Boys", name: "বয়স পাঞ্জাবি", img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400" },
  { cat: "Baby", name: "বেবি ড্রেস", img: "https://images.unsplash.com/photo-1522771930-78848d9293e?w=400" },
  { cat: "Men", name: "লুঙ্গি + গেঞ্জি", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400" },
  { cat: "Girls", name: "হিজাব বোরকা", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400" },
];

const PRODUCTS = Array.from({ length: 100 }, (_, i) => {
  const shop = SHOPS[Math.floor(i / 10)];
  const tpl = PRODUCT_TEMPLATES[i % PRODUCT_TEMPLATES.length];
  const n = (i % 10) + 1;
  return {
    id: i + 1,
    code: `${shop.code}-${String(n).padStart(3, "0")}`,
    name: `${tpl.name} - ${n}`,
    category: tpl.cat,
    shop: shop.name,
    shopCode: shop.code,
    price: 850 + i * 42,
    quality: i % 4 === 0 ? "negative" : "positive",
    img: tpl.img,
  };
});

export default function Home() {
  const [activeShop, setActiveShop] = useState("All");
  const [activeCat, setActiveCat] = useState("All");

  let filtered = PRODUCTS;
  if (activeShop !== "All") filtered = filtered.filter(p => p.shopCode === activeShop);
  if (activeCat !== "All") filtered = filtered.filter(p => p.category === activeCat);

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{background:"linear-gradient(135deg,#ff6a00,#ee0979)"}}>G</div>
            <div><div className="font-black leading-none">GAUSIA COLLECTION</div><div className="text-[11px] font-bold text-pink-600">ছেলে | মেয়ে | বাচ্চা | ফ্যামিলি</div></div>
          </div>
          <div className="text-xs bg-black text-white px-3 py-1 rounded-full">{filtered.length} টি</div>
        </div>
        <div className="bg-black text-white text-center text-[10px] py-1.5">১০ দোকান x ১০ পণ্য = ১০০ টি | ছেলে, মেয়ে, বাচ্চা সব ক্যাটাগরি - ভার্চুয়াল টেস্ট</div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-auto pb-2">
          {CATEGORIES.map(c=>(
            <button key={c.id} onClick={()=>setActiveCat(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap ${activeCat===c.id?"bg-black text-white":"bg-white"}`}>{c.name}</button>
          ))}
        </div>
        <div className="flex gap-2 overflow-auto pb-3 mt-2">
          <button onClick={()=>setActiveShop("All")} className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap ${activeShop==="All"?"bg-pink-600 text-white":"bg-white"}`}>সব দোকান</button>
          {SHOPS.map(s=>(
            <button key={s.code} onClick={()=>setActiveShop(s.code)} className={`px-3 py-2 rounded-full text-[11px] font-bold border whitespace-nowrap ${activeShop===s.code?"bg-black text-white":"bg-white"}`}>{s.code}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-[20px] border shadow-sm overflow-hidden">
              <img src={p.img} className="w-full h-36 object-cover" alt={p.name}/>
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono bg-gray-100 px-2 py-0.5 rounded-full">{p.code}</span>
                  <span className="text-[10px]">{p.quality==="positive"?"✅":"⚠️"}</span>
                </div>
                <div className="font-bold text-[13px] mt-1 leading-tight">{p.name}</div>
                <div className="text-[10px] mt-0.5 text-gray-500">{p.shop} | {p.category}</div>
                <div className="text-[10px] mt-1">{p.quality==="positive"?"✅ পজিটিভ - অরিজিনাল":"⚠️ নেগেটিভ - এভারেজ"}</div>
                <div className="flex justify-between items-center mt-2">
                  <b className="text-sm">{p.price}৳</b>
                  <a href={`https://wa.me/8801913129137?text=${encodeURIComponent(`আমি ${p.code} ${p.name} কিনতে চাই`)}`} target="_blank" className="bg-black text-white text-[11px] px-3 py-1 rounded-full font-bold">অর্ডার</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white border rounded-2xl p-4 text-center">
          <b className="text-sm">ভার্চুয়াল টেস্ট - ফ্যামিলি টেস্ট</b>
          <div className="text-xs text-gray-500 mt-1">এখন 👩 মহিলা, 👨 পুরুষ, 👧 মেয়ে বাচ্চা, 👦 ছেলে বাচ্চা, 👶 বেবি - ৫টা বাটনে ক্লিক করে দেখুন। আপনার ল্যাপটপ + ফোন + ফ্যামিলির ফোনে একই লিংক: <span className="font-mono bg-gray-100 px-2 py-1 rounded">my-shop-17lh.vercel.app</span> খুলুন।</div>
        </div>
      </main>
    </div>
  );
}
