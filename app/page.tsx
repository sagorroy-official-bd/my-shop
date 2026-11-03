"use client";
import { useState, useEffect } from "react";
export default function Page(){
  const [products,setProducts]=useState<any[]>([]); 
  const [banners,setBanners]=useState<any[]>([]); 
  const [cur,setCur]=useState(0);
  
  useEffect(()=>{
    const load=()=>{
      try{
        setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]"));
        setBanners(JSON.parse(localStorage.getItem("gausia_special_banners")||"[]"));
      }catch{}
    };
    load();
    const id=setInterval(load,1000);
    return()=>clearInterval(id);
  },[]);
  
  useEffect(()=>{
    const t=setInterval(()=>setCur(c=>c+1),4000);
    return()=>clearInterval(t);
  },[]);

  return(
    <div className="min-h-screen bg-[#fffaf5]">
      <div className="bg-white border-b px-6 py-3 font-black sticky top-0 z-10">
        GAUSIA COLLECTION - PUBLIC - {products.length} পণ্য - শুধু দেখার জন্য
      </div>

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl font-black leading-tight">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/><span className="text-orange-600">আধুনিকতার ছোঁয়া</span></h1>
          <p className="text-sm text-gray-600 mt-3">পাবলিক পেজ - কোনো Edit/Admin নাই - Admin থেকে পাঠালে এখানে আসবে</p>
        </div>

        <div className="h-[380px] rounded-[20px] border-2 border-black overflow-hidden relative bg-white shadow-[6px_6px_0px_black]">
          {banners.length>0 ? (
            <>
              <img src={banners[cur % banners.length]?.image} className="w-full h-full object-cover" alt=""/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
              <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                🔥 {banners[cur % banners.length]?.code} - {banners[cur % banners.length]?.discountPercent}% OFF
              </div>
              <div className="absolute bottom-0 p-4 text-white w-full">
                <div className="font-bold">{banners[cur % banners.length]?.title} - {banners[cur % banners.length]?.price}৳</div>
                <div className="text-xs">📏 {banners[cur % banners.length]?.size} | {banners[cur % banners.length]?.quantity} পিস | {banners[cur % banners.length]?.quality}</div>
              </div>
            </>
          ) : (
            <>
              <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800" className="w-full h-full object-cover" alt=""/>
              <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 ঈদের 80% OFF - Admin থেকে Special পাঠান</div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.map((p:any)=>(
          <div key={p.id} className="bg-white border rounded-xl overflow-hidden">
            <img src={p.image} className="w-full h-44 object-cover" alt=""/>
            <div className="p-2 text-xs">
              <div className="font-bold">{p.code} - {p.title}</div>
              <div>📏 {p.size} | {p.quantity} পিস | {p.quality} | {p.comment}</div>
              <div className="font-black">{p.price}৳ <span className="line-through text-gray-400 font-normal">{p.originalPrice}৳</span> -{p.discountPercent}%</div>
            </div>
          </div>
        ))}
        {products.length===0 && <div className="col-span-4 text-center py-16 bg-white rounded-xl border-2 border-dashed">Admin থেকে Confirm করলে এখানে পণ্য আসবে</div>}
      </div>
    </div>
  );
}
