"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [products,setProducts]=useState<any[]>([]); const [banners,setBanners]=useState<any[]>([]); const [cur,setCur]=useState(0);
  useEffect(()=>{
    const load=()=>{ try{ setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]")); setBanners(JSON.parse(localStorage.getItem("gausia_special_banners")||"[]")); }catch{} };
    load(); const id=setInterval(load,1000); return()=>clearInterval(id);
  },[]);
  useEffect(()=>{ const t=setInterval(()=>setCur(c=>c+1),4000); return()=>clearInterval(t); },[]);
  return(
    <div className="min-h-screen bg-[#fffaf5]">
      <div className="bg-green-600 text-white px-6 py-3 font-black text-center">✅ CUSTOMER v5 - PUBLIC - {products.length} পণ্য - এই লেখা দেখলে বুঝবেন কাস্টমার পেজ ঠিক আছে</div>
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
        <div><h1 className="text-4xl font-black">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/><span className="text-orange-600">আধুনিকতার ছোঁয়া - CUSTOMER</span></h1></div>
        <div className="h-[380px] rounded-[20px] border-2 border-black overflow-hidden relative bg-white">
          {banners.length>0?<><img src={banners[cur % banners.length]?.image} className="w-full h-full object-cover"/><div className="absolute bottom-0 bg-black/70 text-white w-full p-3"><div className="font-bold">{banners[cur % banners.length]?.code} - {banners[cur % banners.length]?.title}</div><div className="text-xs">📏 {banners[cur % banners.length]?.size} | {banners[cur % banners.length]?.quantity} পিস</div></div></>:<div className="flex items-center justify-center h-full text-sm">Admin থেকে Special পাঠালে এখানে আসবে</div>}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-3 pb-10">
        {products.map((p:any)=><div key={p.id} className="bg-white border rounded-xl overflow-hidden"><img src={p.image} className="w-full h-44 object-cover"/><div className="p-2 text-xs font-bold">{p.code} - {p.title} - {p.price}৳<div className="font-normal">📏 {p.size} | {p.quantity} পিস</div></div></div>)}
        {products.length===0 && <div className="col-span-4 text-center py-16 bg-white rounded-xl border-2 border-dashed">Admin থেকে পাঠালে এখানে আসবে</div>}
      </div>
    </div>
  );
}
