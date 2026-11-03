"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [p,setP]=useState<any[]>([]); const [b,setB]=useState<any[]>([]); const [c,setC]=useState(0);
  useEffect(()=>{
    const load=()=>{ try{ setP(JSON.parse(localStorage.getItem("gausia_all_products")||"[]")); setB(JSON.parse(localStorage.getItem("gausia_special_banners")||"[]")); }catch{} };
    load(); const id=setInterval(load,1000); return()=>clearInterval(id);
  },[]);
  useEffect(()=>{ const t=setInterval(()=>setC(x=>x+1),4000); return()=>clearInterval(t); },[]);
  return(
    <div className="min-h-screen bg-white">
      <div className="bg-green-600 text-white p-3 text-center font-black text-lg">✅ CUSTOMER v7 - PUBLIC - {p.length} পণ্য</div>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-black">নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতার ছোঁয়া - CUSTOMER</h1>
        <div className="mt-6 h-[380px] border-2 border-black rounded-xl overflow-hidden relative bg-gray-100">
          {b.length>0 ? <><img src={b[c % b.length]?.image} className="w-full h-full object-cover"/><div className="absolute bottom-0 bg-black/70 text-white p-3 w-full text-sm">{b[c % b.length]?.code} - {b[c % b.length]?.title} - {b[c % b.length]?.price}৳ | 📏 {b[c % b.length]?.size} | {b[c % b.length]?.quantity} পিস</div></> : <div className="h-full flex items-center justify-center">Admin থেকে Special আসবে</div>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {p.map((x:any)=><div key={x.id} className="border rounded-xl overflow-hidden"><img src={x.image} className="w-full h-40 object-cover"/><div className="p-2 text-xs font-bold">{x.code} - {x.title} - {x.price}৳</div></div>)}
        </div>
      </div>
    </div>
  );
}
