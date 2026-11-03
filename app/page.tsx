"use client";
import { useState, useEffect } from "react";

export default function CustomerPage(){
  const [products,setProducts]=useState<any[]>([]);
  const [banners,setBanners]=useState<any[]>([]);
  const [current,setCurrent]=useState(0);
  const [shopFilter,setShopFilter]=useState("All");

  useEffect(()=>{
    setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]"));
    setBanners(JSON.parse(localStorage.getItem("gausia_special_banners")||"[]"));
  },[]);

  useEffect(()=>{
    if(banners.length===0) return;
    const t=setInterval(()=>setCurrent(p=>(p+1)%banners.length),3500);
    return()=>clearInterval(t);
  },[banners]);

  const shops=["All",...Array.from(new Set(products.map((p:any)=>p.shop)))];
  const filtered=shopFilter==="All"?products:products.filter((p:any)=>p.shop===shopFilter);
  const normalOnly=filtered.filter((p:any)=>p.type!=="special" || shopFilter!=="All");
  const specialForDisplay=banners; // টপে শুধু Special

  return(
    <div className="min-h-screen bg-[#fff8f0]">
      {/* 🔥 SPECIAL DISPLAY - কাস্টমার পেজের টপে - মার্কেটিং এর জন্য সবার নজরে */}
      {specialForDisplay.length>0 && (
        <div className="relative w-full bg-black overflow-hidden border-b-4 border-black">
          <div className="relative h-[300px] md:h-[420px]">
            {specialForDisplay.map((b:any,i:number)=>(
              <div key={b.id} className={`absolute inset-0 transition-all duration-700 ${i===current?"opacity-100 translate-x-0":"opacity-0 translate-x-full"}`}>
                <img src={b.image} alt="" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"/>
                <div className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 max-w-lg">
                  <div className="flex gap-2">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-black animate-pulse">🔥 {b.badge||"SPECIAL"}</span>
                    {b.discountPercent>0 && <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-black">-{b.discountPercent}% OFF</span>}
                    <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-black">🏪 {b.shop}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white mt-3 leading-none drop-shadow-xl">{b.offerTitle}</h1>
                  <p className="text-white text-lg md:text-xl mt-2">{b.title} - <span className="line-through text-gray-300">{b.originalPrice}৳</span> <span className="text-yellow-400 font-black text-2xl md:text-3xl">{b.price}৳</span></p>
                  <p className="text-white/80 text-xs mt-2">📦 {b.quantity||1} পিস আছে | ⏰ সীমিত সময়ের অফার - সবার নজরে পড়ার জন্য</p>
                  <button className="mt-4 bg-white text-black px-6 py-2.5 rounded-full font-black text-sm border-2 border-black shadow-[4px_4px_0px_#000]">এখনই কিনুন - {b.shop}</button>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {specialForDisplay.map((_:any,i:number)=><div key={i} className={`h-2 rounded-full transition-all ${i===current?"bg-white w-8":"bg-white/40 w-2"}`}/>)}
          </div>
        </div>
      )}

      {/* SHOP FILTER - Normal দোকানগুলো */}
      <div className="bg-white border-b-2 border-black sticky top-0 z-20 p-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="font-black text-sm">GAUSIA MARKET • Normal: {filtered.length} • Special Top: {banners.length}</div>
          <div className="flex gap-1.5 overflow-auto">
            {shops.map(s=><button key={s} onClick={()=>setShopFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-black border-2 border-black whitespace-nowrap ${shopFilter===s?"bg-black text-white":"bg-white"}`}>{s}</button>)}
          </div>
        </div>
      </div>

      {/* NORMAL দোকানের লিস্ট - এগুলো নরমাল দোকানে চলে যাবে */}
      <div className="max-w-7xl mx-auto p-3">
        <div className="bg-yellow-100 border-2 border-black rounded-full px-4 py-2 text-xs font-black w-fit">📦 নরমাল দোকানের লিস্ট - {shopFilter} - দোকানের অধীনেই থাকবে</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {filtered.map((p:any)=>(
            <div key={p.id} className="bg-white border-2 border-black rounded-[16px] overflow-hidden shadow-[3px_3px_0px_black]">
              <div className="relative"><img src={p.image} alt="" className="w-full h-40 object-cover"/><div className="absolute top-2 left-2 flex gap-1 flex-wrap"><span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-black">{p.shop}</span>{p.discountPercent>0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">-{p.discountPercent}%</span>}{p.badge&&<span className="bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded-full font-black">{p.badge}</span>}</div>{p.type==="special"&&<span className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-black animate-bounce">🔥 TOP</span>}</div>
              <div className="p-2"><div className="font-black text-xs truncate">{p.title}</div><div className="text-xs mt-1">{p.discountPercent>0?<><span className="line-through text-gray-400">{p.originalPrice}৳</span> <span className="text-green-600 font-black">{p.price}৳</span></>:<span className="font-black">{p.price}৳</span>}{p.quantity&&<span className="text-[10px] ml-1">({p.quantity} পিস)</span>}{p.offerTitle&&<div className="text-[10px] bg-yellow-100 border px-1.5 py-0.5 rounded-full w-fit mt-1 truncate">🎉 {p.offerTitle}</div>}</div></div>
            </div>
          ))}
        </div>
        {filtered.length===0 && <div className="text-center py-16 bg-white border-2 border-dashed border-black rounded-[16px] mt-4">📭 {shopFilter} দোকানে কোনো পণ্য নেই - Admin থেকে Normal পাঠান</div>}
      </div>

      {banners.length>0 && <div className="max-w-7xl mx-auto p-3"><div className="bg-gradient-to-r from-pink-100 to-yellow-100 border-2 border-black rounded-[14px] p-3 text-xs font-bold">🔥 SPECIAL DISPLAY - মার্কেটিং এর জন্য টপে বড় করে দেখাচ্ছে - যাতে সবার নজরে পড়ে - Admin থেকে Special টপে পাঠালে এখানে আসবে</div></div>}
    </div>
  );
}
