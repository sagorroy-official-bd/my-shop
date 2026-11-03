"use client";
import { useState, useEffect } from "react";
export default function Customer(){
  const [products,setProducts]=useState<any[]>([]); const [banners,setBanners]=useState<any[]>([]); const [cur,setCur]=useState(0); const [shopFilter,setShopFilter]=useState("সব");
  useEffect(()=>{ setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]")); setBanners(JSON.parse(localStorage.getItem("gausia_special_banners")||"[]")); },[]);
  useEffect(()=>{ if(banners.length===0) return; const t=setInterval(()=>setCur(p=>(p+1)%banners.length),4000); return()=>clearInterval(t); },[banners]);
  const shops=["সব",...Array.from(new Set(products.map((p:any)=>p.shop)))];
  const filtered=shopFilter==="সব"?products:products.filter((p:any)=>p.shop===shopFilter);
  
  return(<div className="min-h-screen bg-[#fffaf5]">
    {/* HEADER - আপনার ছবির মতো */}
    <div className="bg-white border-b px-4 md:px-10 py-3 flex justify-between items-center"><div className="flex items-center gap-2"><div className="bg-orange-500 text-white w-7 h-7 rounded flex items-center justify-center font-black text-sm">G</div><div><div className="font-black text-sm">GAUSIA COLLECTION</div><div className="text-[10px] text-gray-500">গাউছিয়া কালেকশন</div></div></div><div className="hidden md:block text-xs text-gray-500">শাড়ি, বোরকা, লেহেঙ্গা বুটিক</div><div className="flex gap-2 text-xs"><span className="border rounded-full px-3 py-1">Edit Banner</span><span className="border rounded-full px-3 py-1">Admin</span><span className="bg-black text-white rounded-full px-3 py-1">(0)</span></div></div>

    {/* HERO - আপনার ছবির মতো, শুধু মেয়ের জায়গায় Special Display */}
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10 grid md:grid-cols-2 gap-6 items-center">
      <div>
        <div className="text-[11px] text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1 w-fit">● ২০,০০০+ খুশি কাস্টমার</div>
        <h1 className="text-3xl md:text-5xl font-black mt-4 leading-tight">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/><span className="text-red-500">আধুনিকতার ছোঁয়া</span></h1>
        <p className="text-xs md:text-sm text-gray-500 mt-3">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও<br/>লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
        <div className="flex gap-2 mt-5"><button className="bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-bold">✨ কালেকশন দেখুন</button><button className="border px-5 py-2.5 rounded-full text-sm">💬 হোয়াটসঅ্যাপ</button></div>
        <div className="flex gap-3 mt-6"><div className="flex items-center gap-1.5 bg-orange-50 border rounded-full px-3 py-1.5 text-xs"><span className="bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center">✓</span><div><div className="font-bold">অরিজিনাল</div><div className="text-[10px] text-gray-500">গ্যারান্টি সহ</div></div></div><div className="flex items-center gap-1.5 bg-blue-50 border rounded-full px-3 py-1.5 text-xs"><span className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center">P</span><div><div className="font-bold">বিশ্বস্ত</div><div className="text-[10px] text-gray-500">২০০০+ রিভিউ</div></div></div><div className="flex items-center gap-1.5 bg-pink-50 border rounded-full px-3 py-1.5 text-xs"><span className="bg-pink-500 text-white w-5 h-5 rounded-full flex items-center justify-center">♡</span><div><div className="font-bold">বিশেষ অফার</div><div className="text-[10px] text-gray-500">সেরা দাম</div></div></div></div>
      </div>
      <div className="relative">
        {/* যদি Special Display থাকে তাহলে ওটা দেখাবে, না হলে আপনার ছবির মেয়েটা */}
        {banners.length>0?(
          <div className="relative rounded-[20px] overflow-hidden border-2 border-black shadow-[6px_6px_0px_black] h-[380px] md:h-[440px]">
            {banners.map((b:any,i:number)=><div key={b.id} className={`absolute inset-0 transition-all duration-700 ${i===cur?"opacity-100":"opacity-0"}`}><img src={b.image} alt="" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/><div className="absolute bottom-0 left-0 right-0 p-4"><div className="flex gap-2 mb-2"><span className="bg-red-500 text-white px-2 py-1 rounded-full text-[10px] font-black">🔥 {b.badge} -{b.discountPercent}%</span><span className="bg-white text-black px-2 py-1 rounded-full text-[10px] font-black">🏪 {b.shop}</span></div><div className="text-white font-black text-xl">{b.offerTitle}</div><div className="text-white text-sm">{b.title} - {b.originalPrice}৳ <span className="text-yellow-400 font-black">{b.price}৳</span> - {b.quantity} পিস</div><div className="text-[11px] text-white/80 mt-1">📢 মার্কেটিং Display - সবার নজরে পড়ার জন্য</div></div></div>)}
            <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 Special Display - {cur+1}/{banners.length}</div>
          </div>
        ):(
          <div className="rounded-[20px] overflow-hidden border-2 border-black shadow-[6px_6px_0px_black] h-[380px] md:h-[440px]"><img src="https://images.unsplash.com/photo-1515372039744-b8f02a3c67ae?w=800" alt="" className="w-full h-full object-cover"/><div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 ঈদ 80% OFF</div></div>
        )}
      </div>
    </div>

    <div className="bg-orange-500 text-white text-center text-xs py-2">100 দোকান x 1 পণ্য = ১০০% ভেরিফাইড | শাড়ি ও বোরকার নির্ভরযোগ্য গন্তব্য আধুনিকতার ছোঁয়া</div>

    <div className="bg-white border-b sticky top-0 z-10 px-4 md:px-10 py-2.5 flex gap-2 overflow-auto"><button onClick={()=>setShopFilter("সব")} className={`px-4 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap ${shopFilter==="সব"?"bg-orange-500 text-white border-orange-500":"bg-white border-gray-200"}`}>সব ({products.length})</button>{shops.filter((s:any)=>s!=="সব").map((s:any)=><button key={s} onClick={()=>setShopFilter(s)} className={`px-4 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap ${shopFilter===s?"bg-black text-white border-black":"bg-white border-gray-200"}`}>{s}</button>)}</div>

    <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">{filtered.map((p:any)=><div key={p.id} className="bg-white border rounded-[14px] overflow-hidden"><div className="relative"><img src={p.image} alt="" className="w-full h-40 object-cover"/><div className="absolute top-2 left-2 flex gap-1"><span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full">{p.shop}</span>{p.discountPercent>0&&<span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">-{p.discountPercent}%</span>}</div>{p.type==="special"&&<span className="absolute top-2 right-2 bg-pink-500 text-white text-[9px] px-2 py-0.5 rounded-full animate-pulse">🔥 DISPLAY</span>}</div><div className="p-2"><div className="text-xs font-bold truncate">{p.title}</div><div className="text-xs mt-1"><span className="line-through text-gray-400 text-[11px]">{p.originalPrice}৳</span> <span className="font-black text-green-600">{p.price}৳</span> <span className="text-[10px]">({p.quantity} পিস)</span></div>{p.offerTitle&&<div className="text-[10px] bg-yellow-50 border rounded-full px-2 py-0.5 w-fit mt-1 truncate">🎉 {p.offerTitle}</div>}</div></div>)}{filtered.length===0&&<div className="col-span-4 text-center py-16 text-gray-400 text-sm">📭 {shopFilter} এ কোনো পণ্য নেই</div>}</div>
  </div>);
}
