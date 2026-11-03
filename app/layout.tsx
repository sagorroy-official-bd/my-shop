"use client";
import { useState, useEffect } from "react";
export default function CustomerPage(){
  const [products,setProducts]=useState<any[]>([]); 
  const [banners,setBanners]=useState<any[]>([]);
  const [cur,setCur]=useState(0);

  useEffect(()=>{
    try{
      const all = JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
      const sp = JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
      setProducts(all);
      setBanners(sp);
    }catch(e){ console.log(e); }
  },[]);

  useEffect(()=>{
    if(banners.length===0) return;
    const t = setInterval(()=>setCur(p=>(p+1)%banners.length),3500);
    return ()=>clearInterval(t);
  },[banners]);

  return(
    <div className="min-h-screen bg-[#fffaf5]">
      {/* Header */}
      <div className="bg-white border-b border-orange-100 px-4 md:px-10 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black">G</div>
          <div><div className="font-black text-sm">GAUSIA COLLECTION</div><div className="text-[10px] text-gray-500">অনলাইন প্ল্যাটফর্ম - নতুন টেস্ট - {products.length} পণ্য</div></div>
        </div>
        <div className="text-xs bg-black text-white px-3 py-1 rounded-full">Cart (0)</div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center text-[11px] py-1.5">ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ২০,০০০+ খুশি কাস্টমার | ৭ দিনের রিটার্ন</div>

      {/* Hero - আপনার ছবির মতো, কিন্তু এখন Display থাকলে Display দেখাবে */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-8 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="text-[11px] text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1 w-fit">● ২০,০০০+ খুশি কাস্টমার</div>
          <h1 className="text-3xl md:text-5xl font-black mt-4 leading-tight">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/><span className="text-orange-600">আধুনিকতার ছোঁয়া</span></h1>
          <p className="text-xs md:text-sm text-gray-600 mt-3">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
          <div className="flex gap-2 mt-5"><a href="#products" className="bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-bold">✨ কালেকশন দেখুন</a><div className="border px-5 py-2.5 rounded-full text-sm">💬 হোয়াটসঅ্যাপ</div></div>
          {banners.length>0&&<div className="mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-4 py-2 text-xs font-bold w-fit">🔥 Display তে {banners.length} টি স্পেশাল অফার - ওপরে দেখুন</div>}
        </div>

        {/* ডান পাশ - আগে সাদা ছিল, এখন ছবি আসবে */}
        <div className="relative rounded-[20px] overflow-hidden border-2 border-black shadow-[6px_6px_0px_black] h-[380px] md:h-[420px] bg-white">
          {banners.length>0?(
            <div className="h-full relative">
              {banners.map((b:any,i:number)=>(
                <div key={b.id} className={`absolute inset-0 transition-all duration-700 ${i===cur?"opacity-100":"opacity-0"}`}>
                  <img src={b.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black">🔥 {b.badge} -{b.discountPercent}%</span>
                      <span className="bg-white text-black px-2.5 py-1 rounded-full text-[10px] font-black">{b.code}</span>
                      <span className="bg-yellow-400 text-black px-2.5 py-1 rounded-full text-[10px] font-bold">📏 {b.size} | {b.quantity} পিস</span>
                    </div>
                    <div className="text-white font-black text-xl mt-2">{b.offerTitle}</div>
                    <div className="text-white text-sm mt-1">{b.title} - <span className="line-through text-white/60">{b.originalPrice}৳</span> <span className="text-yellow-300 font-black text-lg">{b.price}৳</span></div>
                    <div className="text-white/80 text-[11px] mt-1">✨ {b.quality} | 💬 {b.comment}</div>
                  </div>
                </div>
              ))}
              <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">🔥 ঈদের {banners[0]?.discountPercent||80}% OFF - Display</div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">{banners.map((_:any,i:number)=><div key={i} className={`h-2 rounded-full transition-all ${i===cur?"bg-white w-6":"bg-white/40 w-2"}`}/>)}</div>
            </div>
          ):(
            <div className="h-full relative">
              <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3c67ae?w=800" alt="" className="w-full h-full object-cover"/>
              <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 ঈদের 80% OFF - কোনো Display নেই, Admin থেকে Special এ পাঠান</div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-orange-500 text-white text-center text-xs py-2">১০ দোকান x ১০ পণ্য = ১০০% ভেরিফাইড | শাড়ি ও বোরকার নির্ভরযোগ্য গন্তব্য</div>
      <div className="bg-black text-white text-center text-[11px] py-2">সব পণ্য এক জায়গায় - CODE নাম্বার অনুযায়ী - {products.length}টি পণ্য ভেরিফাইড</div>

      {/* Product Grid - আপনার ছবির নিচের অংশ */}
      <div id="products" className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex gap-2 overflow-auto"><div className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap">সব ({products.length}) - সব এক জায়গায়</div><div className="bg-white border px-5 py-2 rounded-full text-xs whitespace-nowrap">Display ({banners.length})</div></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {products.map((p:any)=>(
            <div key={p.id} className="bg-white border rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={p.image} alt="" className="w-full h-52 object-cover"/>
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{p.code}</span>
                  {p.discountPercent>0&&<span className="bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">⚠️ {p.discountPercent}%</span>}
                </div>
                {p.type==="special"&&<span className="absolute top-2 right-2 bg-pink-500 text-white text-[9px] px-2 py-0.5 rounded-full animate-pulse font-black">🔥 Display</span>}
                <span className="absolute bottom-2 left-2 bg-white/90 text-black text-[9px] px-2 py-0.5 rounded-full border">📏 {p.size} | {p.quantity} পিস</span>
              </div>
              <div className="p-2.5">
                <div className="text-[11px] text-gray-500">{p.code} - {p.badge}</div>
                <div className="text-sm font-bold truncate">{p.title}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">✨ {p.quality} | 💬 {p.comment}</div>
                <div className="flex justify-between items-center mt-2"><div><span className="text-[11px] line-through text-gray-400">{p.originalPrice}৳</span> <span className="font-black text-sm text-green-600">{p.price}৳</span></div><span className="bg-black text-white text-[10px] px-3 py-1 rounded-full">অর্ডার</span></div>
                {p.offerTitle&&<div className="text-[10px] bg-yellow-50 border rounded-full px-2 py-0.5 mt-1.5 truncate">🎉 {p.offerTitle}</div>}
              </div>
            </div>
          ))}
          {products.length===0&&(
            <div className="col-span-2 md:col-span-4 text-center py-16 bg-white rounded-[20px] border border-dashed border-orange-200">
              <div className="text-4xl">📭</div><div className="font-bold mt-2">কোনো পণ্য নেই</div><div className="text-xs text-gray-500 mt-1">Admin Panel থেকে Edit করে Normal বা Special Display তে পাঠান - তারপর এখানে দেখাবে</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
