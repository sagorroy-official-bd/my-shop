"use client";
import { useState } from "react";

export default function SellerApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [shopCode, setShopCode] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", price: "", quality: "positive" });

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] p-4">
        <div className="bg-white p-8 rounded-[24px] w-full max-w-sm border shadow-xl">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black mx-auto" style={{background:"linear-gradient(135deg,#ff6a00,#ee0979)"}}>G</div>
          <h1 className="font-black text-center mt-3">GAUSIA COLLECTION</h1>
          <p className="text-center text-[11px] font-bold text-pink-600">দোকানদার অ্যাপ - ১০০ পণ্য আপলোড</p>
          <input value={shopCode} onChange={e=>setShopCode(e.target.value)} placeholder="দোকান কোড: SHOP-01" className="w-full border-2 rounded-full px-5 py-3 mt-6 text-sm outline-none focus:border-black" />
          <input type="password" defaultValue="1234" placeholder="পাসওয়ার্ড" className="w-full border-2 rounded-full px-5 py-3 mt-3 text-sm outline-none" />
          <button onClick={()=>shopCode && setLoggedIn(true)} className="w-full bg-black text-white rounded-full py-3 mt-4 font-bold">লগইন করুন</button>
          <p className="text-[10px] text-center text-gray-400 mt-3">এই লিংকটি আপনার মোবাইলে সেভ করে রাখুন</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-4 rounded-[16px] border flex justify-between items-center">
          <div><div className="font-black text-sm">দোকান: {shopCode.toUpperCase()}</div><div className="text-xs text-gray-500">আজ: {products.length}/100</div></div>
          <button onClick={()=>setLoggedIn(false)} className="text-xs bg-gray-100 px-3 py-1 rounded-full">Logout</button>
        </div>

        <div className="bg-white p-5 rounded-[20px] border mt-4">
          <h3 className="font-bold text-sm">নতুন পণ্য যোগ করুন</h3>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="পণ্যের নাম" className="w-full border rounded-full px-4 py-2.5 mt-3 text-sm" />
          <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="আপনার কেনা দাম" type="number" className="w-full border rounded-full px-4 py-2.5 mt-2 text-sm" />
          <select value={form.quality} onChange={e=>setForm({...form, quality:e.target.value})} className="w-full border rounded-full px-4 py-2.5 mt-2 text-sm font-bold">
            <option value="positive">✅ পজিটিভ - অরিজিনাল / ভালো</option>
            <option value="negative">⚠️ নেগেটিভ - কপি / এভারেজ</option>
          </select>
          <button onClick={()=>{
            if(!form.name || !form.price) return alert("নাম ও দাম লিখুন");
            if(products.length>=100) return alert("আজ ১০০টা হয়ে গেছে!");
            const code = `${shopCode.toUpperCase()}-${String(products.length+1).padStart(3,'0')}`;
            setProducts([...products, {...form, code, id: Date.now()}]);
            setForm({name:"", price:"", quality:"positive"});
          }} className="w-full bg-black text-white rounded-full py-3 mt-3 font-bold text-sm">+ যোগ করুন</button>
        </div>

        <div className="mt-4 space-y-2">
          {products.map(p=>(
            <div key={p.id} className="bg-white p-3 rounded-xl border text-sm flex justify-between"><span>{p.code} {p.quality==='positive'?'✅':'⚠️'} {p.name}</span><b>{p.price}৳</b></div>
          ))}
        </div>

        <button onClick={()=>alert(`${products.length} টি পণ্য এডমিনের কাছে পাঠানো হলো!`)} className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full py-3.5 mt-6 font-bold">এডমিনের কাছে পাঠান ({products.length})</button>
      </div>
    </div>
  );
}
