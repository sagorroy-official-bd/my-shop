"use client";
import { useState, useEffect } from "react";
export default function Customer(){
  const [products,setProducts]=useState<any[]>([]); const [banners,setBanners]=useState<any[]>([]); const [cur,setCur]=useState(0);
  useEffect(()=>{ setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]")); setBanners(JSON.parse(localStorage.getItem("gausia_special_banners")||"[]")); },[]);
  useEffect(()=>{ if(banners.length===0) return; const t=setInterval(()=>setCur(p=>(p+1)%banners.length),4000); return()=>clearInterval(t); },[banners]);

  return(<div className="min-h-screen bg-[#fffaf5]">
    {/* Header - আপনার ছবির মতো */}
    <div className="bg-white border-b px-4 md:px-10 py-3 flex justify-between items-center"><div className="flex items-center gap-2"><div className="bg-orange-500 text-white w-7 h-7 rounded flex items-center justify-center font-black text-sm">G</div><div><div className="font-black text-sm">GAUSIA COLLECTION</div><div className="text-[10px] text-gray-500">অনলাইন প্ল্যাটফর্ম - নতুন টেস্ট</div></div></div><div className="text-[11px] text-gray-500 hidden md:block">শাড়ি, বোরকা, লেহেঙ্গা বুটিক</div><div className="flex gap-2 text-xs"><span className="border rounded-full px-3 py-1">Edit Banner</span><span className="border rounded-full px-3 py-1">Admin</span><span className="bg-black text-white rounded-full px-3 py-1">(0)</span></div></div>

    {/* Orange strip - আপনার ছবির মতো */}
    <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center text-[11px] py-1.5">ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি - ২০,০০০+ খুশি কাস্টমার - ৭ দিনের রিটার্ন</div>

    {/* Hero - আপনার ছবির মতো, শুধু Display থাকলে Display দেখাবে */}
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10 grid md:grid-cols-2 gap-6 items-center">
      <div>
        <div className="text-[11px] text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1 w-fit">● ২০,০০০+ খুশি কাস্টমার</div>
        <h1 className="text-3xl md:text-5xl font-black mt-4 leading-tight">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/><span className="text-red-500">আধুনিকতার ছোঁয়া</span></h1>
        <p className="text-xs md:text-sm text-gray-500 mt-3">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
        <div className="flex gap-2 mt-5"><button className="bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-bold">✨ কালেকশন দেখুন</button><button className="border px-5 py-2.5 rounded-full text-sm">💬 হোয়াটসঅ্যাপ</button></div>
      </div>
      <div className="relative rounded-[20px] overflow-hidden border-2 border-black shadow-[6px_6px_0px_black] h-[380px] md:h-[440px]">
        {banners.length>0?(
          <div className="h-full relative">{banners.map((b:any,i:number)=><div key={b.id} className={`absolute inset-0 transition-all duration-700 ${i===cur?"opacity-100":"opacity-0"}`}><img src={b.image} className="w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><div className="absolute bottom-0 left-0 right-0 p-4"><div className="flex gap-2"><span className="bg-red-500 text-white px-2 py-1 rounded-full text-[10px] font-black">🔥 {b.badge} -{b.discountPercent}%</span><span className="bg-white text-black px-2 py-1 rounded-full text-[10px] font-black">{b.code}</span></div><div className="text-white font-black text-xl mt-1">{b.offerTitle}</div><div className="text-white text-sm">{b.title} - {b.price}৳</div><div className="text-[11px] text-white/70">📢 Display পেজ - শুধু অফার ডিক্লেয়ার</div></div></div>)}<div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 Display ({banners.length})</div></div>
        ):(
          <div className="h-full"><img src="https://images.unsplash.com/photo-1515372039744-b8f02a3c67ae?w=800" className="w-full h-full object-cover"/><div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 ঈদের 80% OFF</div></div>
        )}
      </div>
    </div>

    <div className="bg-orange-500 text-white text-center text-xs py-2">১০ দোকান x ১০ পণ্য = ১০০% ভেরিফাইড | শাড়ি ও বোরকার নির্ভরযোগ্য গন্তব্য আধুনিকতার ছোঁয়া</div>

    {/* Product Grid - আপনার ২য় ছবির মতো, শুধু CODE */}
    <div className="bg-black text-white text-center text-[11px] py-2">১০ দোকান x ১০ পণ্য = ১০০% ভেরিফাইড | নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতা - {products.length}টি পণ্য</div>
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex gap-2 overflow-auto pb-2"><div className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold">সব ({products.length}) - সব এক জায়গায়</div></div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
        {products.map((p:any)=><div key={p.id} className="bg-white border rounded-[16px] overflow-hidden shadow-sm">
          <div className="relative"><img src={p.image} className="w-full h-48 object-cover"/><div className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-0.5 rounded-full">{p.code}</div>{p.discountPercent>0&&<div className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">⚠️ {p.discountPercent}%</div>}{p.type==="special"&&<div className="absolute bottom-2 right-2 bg-pink-500 text-white text-[9px] px-2 py-0.5 rounded-full animate-pulse">🔥 Display</div>}</div>
          <div className="p-2.5"><div className="text-[11px] text-gray-500">{p.code}</div><div className="text-sm font-bold truncate">{p.title} - {p.quantity} পিস</div><div className="text-[11px] text-gray-500 mt-1">☑️ পজিটিভ - অরিজিনাল</div><div className="flex justify-between items-center mt-1"><span className="font-black text-sm">{p.price}৳</span><span className="bg-black text-white text-[10px] px-3 py-1 rounded-full">অর্ডার</span></div></div>
        </div>)}
        {products.length===0&&<div className="col-span-5 text-center py-16 text-gray-400">📭 কোনো পণ্য নেই - Admin থেকে Normal এ পাঠান</div>}
      </div>
    </div>
  </div>);
}
