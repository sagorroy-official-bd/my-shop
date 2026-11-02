"use client";
import { useState, useEffect } from "react";

export default function AdminPage(){
  const [sellers, setSellers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [pass, setPass] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(()=>{
    try {
      const s = localStorage.getItem("gausia_sellers");
      const p = localStorage.getItem("gausia_products");
      if(s) setSellers(JSON.parse(s));
      if(p) setProducts(JSON.parse(p));
      // যদি আগে লগইন করা থাকে
      if(localStorage.getItem("gausia_admin_ok")==="yes") setOk(true);
    } catch{}
  },[]);

  const check = () => {
    if(pass==="1234" || pass==="admin"){
      setOk(true);
      localStorage.setItem("gausia_admin_ok","yes");
    } else {
      alert("ভুল পাসওয়ার্ড - পাসওয়ার্ড হলো: 1234");
    }
  };

  if(!ok){
    return (
      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center p-4">
        <div className="bg-white rounded-[24px] border shadow-xl p-6 w-full max-w-sm text-center">
          <h1 className="font-black text-lg">GAUSIA - এডমিন</h1>
          <p className="text-xs text-gray-500 mt-1">পাসওয়ার্ড দিন</p>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="পাসওয়ার্ড: 1234" className="w-full mt-4 border rounded-full px-4 py-3 text-sm text-center tracking-widest" />
          <button onClick={check} className="w-full mt-3 bg-black text-white rounded-full py-3 font-black text-sm">লগইন</button>
          <p className="text-[10px] text-gray-400 mt-3">পাসওয়ার্ড: 1234</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-black text-xl">👑 অ্যাডমিন প্যানেল - দোকানদার রেকর্ড</h1>
        <p className="text-sm text-gray-500 mt-1">মোট দোকান: {sellers.length} টি | মোট প্রোডাক্ট: {products.length} টি | পাসওয়ার্ড: 1234</p>
        <button onClick={()=>{localStorage.removeItem("gausia_admin_ok"); setOk(false);}} className="mt-2 text-xs bg-black text-white px-3 py-1 rounded-full">লগআউট</button>
        
        <div className="grid gap-3 mt-5">
          {sellers.map((s:any)=>(
            <div key={s.phone} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="font-black text-base">{s.name} ({s.code})</div>
              <div className="text-sm mt-2">📞 ফোন: <b>{s.phone}</b></div>
              <div className="text-sm">📍 ঠিকানা: {s.address}</div>
              <div className="text-xs text-gray-500 mt-1">🕒 রেজিস্ট্রেশন: {s.createdAt}</div>
              <div className="text-xs mt-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 inline-block font-bold">এই দোকানের প্রোডাক্ট: {products.filter((p:any)=>p.shopCode===s.code).length} টি</div>
              <div className="mt-2 text-[11px] grid grid-cols-1 gap-1">
                {products.filter((p:any)=>p.shopCode===s.code).map((p:any)=><div key={p.id} className="bg-gray-50 rounded px-2 py-1">▪️ {p.code} - {p.name} - {p.price}৳</div>)}
              </div>
            </div>
          ))}
          {sellers.length===0 && <div className="bg-white border rounded-xl p-8 text-center text-gray-400">এখনো কোনো দোকানদার রেজিস্ট্রেশন করেনি<br/><span className="text-[11px]">নোট: রেকর্ড একই ব্রাউজারে থাকে, যে ব্রাউজারে দোকানদার রেজিস্ট্রেশন করেছে ওই ব্রাউজারেই দেখতে পাবেন</span></div>}
        </div>
      </div>
    </div>
  );
}
