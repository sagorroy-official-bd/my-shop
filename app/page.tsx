"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [products,setProducts]=useState<any[]>([]); const [banners,setBanners]=useState<any[]>([]); const [cur,setCur]=useState(0);
  useEffect(()=>{ 
    try{ setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]")); setBanners(JSON.parse(localStorage.getItem("gausia_special_banners")||"[]")); }catch{}
    const id=setInterval(()=>{ try{ setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]")); setBanners(JSON.parse(localStorage.getItem("gausia_special_banners")||"[]")); }catch{} },1000);
    return()=>clearInterval(id);
  },[]);
  useEffect(()=>{ const t=setInterval(()=>setCur(c=>c+1),4000); return()=>clearInterval(t); },[]);
  return(
    <div className="min-h-screen bg-[#fffaf5]"><div className="bg-white border-b px-6 py-3 flex justify-between sticky top-0"><div className="font-black">GAUSIA COLLECTION - {products.length} পণ্য</div></div>
    <div className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-2 gap-6"><div><h1 className="text-4xl font-black">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/><span className="text-orange-600">আধুনিকতার ছোঁয়া</span></h1></div>
    <div className="h-[380px] rounded-[20px] border-2 border-black overflow-hidden relative bg-white shadow-[6px_6px_0px_black]">{banners.length>0?<><img src={banners[cur % banners.length]?.image} className="w-full h-full object-cover"/><div className="absolute bottom-0 p-4 bg-black/60 text-white w-full"><div className="font-bold">{banners[cur % banners.length]?.code} - {banners[cur % banners.length]?.title}</div><div>{banners[cur % banners.length]?.price}৳ - 📏 {banners[cur % banners.length]?.size} | {banners[cur % banners.length]?.quantity} পিস</div></div></>:<img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800" className="w-full h-full object-cover"/>}</div></div>
    <div className="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-2 md:grid-cols-4 gap-3">{products.map((p:any)=><div key={p.id} className="bg-white border rounded-xl overflow-hidden"><img src={p.image} className="w-full h-48 object-cover"/><div className="p-2 text-xs"><div className="font-bold">{p.code} - {p.title}</div><div>📏 {p.size} | {p.quantity} পিস | {p.quality} | {p.comment} | -{p.discountPercent}% {p.price}৳</div></div></div>)}</div></div>
  );
}
