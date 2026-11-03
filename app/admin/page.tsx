"use client";
import { useState, useEffect } from "react";
export default function Admin(){
  const [shops,setShops]=useState<string[]>([]);const [newShop,setNewShop]=useState("");
  useEffect(()=>{
    const s=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
    if(s.length>0) setShops(s); else setShops(["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"]);
  },[]);
  const add=()=>{
    if(!newShop.trim())return;
    let name=newShop.trim().toUpperCase().replace(/\s+/g,"-");
    if(!name.startsWith("SHOP-")) name="SHOP-"+name;
    if(shops.includes(name)){alert("আছে");return;}
    const updated=[...shops,name].sort();
    setShops(updated);localStorage.setItem("gausia_all_shops",JSON.stringify(updated));setNewShop("");
    alert(name+" Add হয়েছে! এখন Customer Page রিফ্রেশ দিন");
  };
  const make100=()=>{
    const h=Array.from({length:100}).map((_,i)=>`SHOP-${String(i+1).padStart(2,"0")}`);
    setShops(h);localStorage.setItem("gausia_all_shops",JSON.stringify(h));
    alert("100 টা দোকান বানানো হয়েছে!");
  };
  const clear=()=>{localStorage.removeItem("gausia_all_shops");setShops(["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"]);};

  return(
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto border-2 border-black rounded-2xl p-6">
        <h1 className="font-black text-2xl">ADMIN - দোকান কন্ট্রোল</h1>
        <p className="text-sm text-gray-600 mt-2">এখানে Add করলে Customer পেজে অটো বাড়বে - একই ব্রাউজারে করতে হবে</p>
        
        <div className="flex gap-2 mt-6">
          <input value={newShop} onChange={e=>setNewShop(e.target.value)} placeholder="11 লিখলেই SHOP-11 হবে" className="flex-1 border-2 border-orange-200 bg-orange-50 rounded-full px-5 py-3 text-sm outline-none"/>
          <button onClick={add} className="bg-black text-white px-8 py-3 rounded-full font-black">+ Add</button>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button onClick={make100} className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold">1 ক্লিকে 100 টা দোকান বানান</button>
          <button onClick={clear} className="border px-4 py-2 rounded-full text-xs">রিসেট</button>
          <a href="/" className="ml-auto bg-green-500 text-white px-5 py-2 rounded-full text-sm font-bold">Customer Page দেখুন →</a>
        </div>

        <div className="mt-6 font-bold">বর্তমান: {shops.length} টা দোকান {shops.length>=11 && "✅ বাড়ছে!"}</div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-3 max-h-[400px] overflow-auto border p-3 rounded-xl">
          {shops.map(s=><div key={s} className="border rounded-full px-2 py-1 text-xs text-center font-bold bg-gray-50">{s}</div>)}
        </div>
        <div className="mt-4 bg-yellow-100 border border-yellow-300 p-3 rounded-xl text-xs">
          <b>নিয়ম:</b> Admin এ Add করার পর একই Chrome এ Customer Page (my-shop-17lh.vercel.app) খুলে <b>Ctrl + F5</b> দিয়ে হার্ড রিফ্রেশ দিন। তাহলেই SHOP-11, SHOP-12 বাড়তে দেখবেন।
        </div>
      </div>
    </div>
  )
}
