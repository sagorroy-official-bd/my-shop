"use client";
import { useState, useEffect } from "react";
export default function PublicPage(){
  const [products,setProducts]=useState<any[]>([]); const [banners,setBanners]=useState<any[]>([]); const [cur,setCur]=useState(0); const [orderItem,setOrderItem]=useState<any>(null); const [info,setInfo]=useState({name:"",phone:"",address:"",condition:false});

  const load=()=>{
    try{
      setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]"));
      setBanners(JSON.parse(localStorage.getItem("gausia_special_banners")||"[]"));
    }catch{}
  };

  useEffect(()=>{
    load();
    const t1=setInterval(load,1000); // প্রতি 1 সেকেন্ডে চেক - Admin থেকে পাঠালে সাথে সাথে আসবে
    const t2=setInterval(()=>setCur(s=>s+1),4000);
    return()=>{ clearInterval(t1); clearInterval(t2); };
  },[]);

  useEffect(()=>{ if(banners.length>0) setCur(0); },[banners]);

  return(
    <div className="min-h-screen bg-[#fffaf5]">
      <div className="bg-white border-b px-4 md:px-10 py-3 flex justify-between items-center sticky top-0 z-20"><div className="flex items-center gap-2"><div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black">G</div><div><div className="font-black text-sm">GAUSIA COLLECTION</div><div className="text-[10px]">পাবলিক পেজ - শুধু দেখার জন্য - {products.length}টি পণ্য</div></div></div></div>
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 grid md:grid-cols-2 gap-6 items-center">
        <div><h1 className="text-3xl md:text-5xl font-black leading-tight">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/><span className="text-orange-600">আধুনিকতার ছোঁয়া</span></h1><p className="text-sm text-gray-600 mt-3">Admin থেকে পাঠালে এখানে দেখাবে - Edit/Admin কোনো অপশন নাই</p></div>
        <div className="relative rounded-[20px] overflow-hidden border-2 border-black shadow-[6px_6px_0px_black] h-[380px] bg-white">
          {banners.length>0 ? <div className="h-full"><img src={banners[cur % banners.length]?.image} className="w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 ঈদের {banners[cur % banners.length]?.discountPercent}% OFF - {banners[cur % banners.length]?.code}</div><div className="absolute bottom-0 p-4 text-white"><div className="font-black">{banners[cur % banners.length]?.title}</div><div className="text-sm"><span className="line-through opacity-60">{banners[cur % banners.length]?.originalPrice}৳</span> <span className="font-black text-yellow-300">{banners[cur % banners.length]?.price}৳</span> <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded-full ml-2">📏 {banners[cur % banners.length]?.size} | {banners[cur % banners.length]?.quantity} পিস</span></div><button onClick={()=>setOrderItem(banners[cur % banners.length])} className="mt-2 bg-white text-black px-4 py-1 rounded-full text-xs font-black">অর্ডার করুন</button></div></div> : <><img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800" className="w-full h-full object-cover"/><div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 ঈদের 80% OFF - Admin থেকে Special পাঠালে এখানে আসবে</div></>}
        </div>
      </div>
      <div id="products" className="max-w-7xl mx-auto px-4 pb-10"><div className="bg-black text-white px-5 py-2 rounded-full text-xs w-fit font-bold">সব ({products.length}) - সব এক জায়গায় - Admin থেকে আসছে</div><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">{products.map((p:any)=><div key={p.id} className="bg-white border rounded-[14px] overflow-hidden"><div className="relative"><img src={p.image} className="w-full h-52 object-cover"/><span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-0.5 rounded-full">{p.code}</span><span className="absolute bottom-2 left-2 bg-white/90 text-black text-[9px] px-2 py-0.5 rounded-full border">📏 {p.size} | {p.quantity} পিস</span></div><div className="p-2.5"><div className="text-xs font-bold truncate">{p.title}</div><div className="text-[10px] text-gray-500">✨ {p.quality} | 💬 {p.comment}</div><div className="mt-1"><span className="line-through text-[11px] text-gray-400">{p.originalPrice}৳</span> <span className="font-black">{p.price}৳</span> <span className="text-[10px] bg-yellow-100 rounded-full px-1">-{p.discountPercent}%</span></div><button onClick={()=>setOrderItem(p)} className="w-full mt-2 bg-black text-white rounded-full py-1.5 text-xs font-bold">অর্ডার - শর্ত সহ</button></div></div>)}{products.length===0 && <div className="col-span-2 md:col-span-4 text-center py-16 bg-white rounded-[20px] border-2 border-dashed">Admin থেকে Confirm করলে এখানে আসবে - এখন ফাঁকা</div>}</div></div>
      {orderItem && <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-[20px] w-full max-w-sm p-5 border-2 border-black"><div className="flex justify-between"><div className="font-black text-sm">{orderItem.code} - {orderItem.title}</div><button onClick={()=>setOrderItem(null)} className="bg-red-500 text-white w-7 h-7 rounded-full">X</button></div><img src={orderItem.image} className="w-full h-40 object-cover rounded-[12px] mt-3 border"/><div className="text-xs mt-2">📏 {orderItem.size} | ✨ {orderItem.quality} | 📦 {orderItem.quantity} | 💬 {orderItem.comment}</div><div className="mt-3 space-y-2"><input value={info.name} onChange={e=>setInfo({...info,name:e.target.value})} placeholder="নাম *" className="w-full border rounded-full px-4 py-2 text-sm"/><input value={info.phone} onChange={e=>setInfo({...info,phone:e.target.value})} placeholder="ফোন *" className="w-full border rounded-full px-4 py-2 text-sm"/><input value={info.address} onChange={e=>setInfo({...info,address:e.target.value})} placeholder="ঠিকানা *" className="w-full border rounded-full px-4 py-2 text-sm"/><label className="flex gap-2 text-[11px] font-bold"><input type="checkbox" checked={info.condition} onChange={e=>setInfo({...info,condition:e.target.checked})}/> শর্ত মেনে অর্ডার করছি - ক্যাশ অন ডেলিভারি</label><button onClick={()=>{ if(!info.name||!info.phone||!info.address||!info.condition){ alert("সব তথ্য + শর্ত দিন"); return; } const orders=JSON.parse(localStorage.getItem("gausia_orders")||"[]"); localStorage.setItem("gausia_orders",JSON.stringify([{id:Date.now(),product:orderItem,customer:info,date:new Date().toLocaleString()},...orders])); alert("✅ অর্ডার - "+orderItem.code); setOrderItem(null); }} className="w-full bg-black text-white rounded-full py-2.5 text-sm font-black">✅ অর্ডার কনফার্ম - {orderItem.price}৳</button></div></div></div>}
    </div>
  );
}
