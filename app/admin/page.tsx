"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [passOk,setPassOk]=useState(false); const [pass,setPass]=useState("");
  const [sellerRecords,setSellerRecords]=useState<any[]>([]); const [adminEdited,setAdminEdited]=useState<any[]>([]);
  const [active,setActive]=useState<"seller"|"admin">("admin"); const [editItem,setEditItem]=useState<any>(null);
  const [reviewItem,setReviewItem]=useState<any>(null);

  useEffect(()=>{
    try{
      if(localStorage.getItem("gausia_admin_ok")==="yes") setPassOk(true);
      const rec=JSON.parse(localStorage.getItem("gausia_seller_records")||"[]");
      const pend=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
      setSellerRecords(rec.length>0?rec:pend);
      setAdminEdited(JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]"));
    }catch(e){}
  },[]);

  const saveEdited=(up:any[])=>{ setAdminEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up)); };
  const saveSeller=(up:any[])=>{ setSellerRecords(up); localStorage.setItem("gausia_seller_records",JSON.stringify(up)); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); };

  const moveSellerToAdmin=(item:any)=>{
    const code="CODE-"+String(1001+adminEdited.length).padStart(4,"0");
    const n={editId:Date.now(),code,sellerName:item.shopName||item.sellerName||item.shop||"A",sellerPhone:item.phone||"1111111",sellerAddress:item.address||"Gawsia",sellerDate:item.createdAt||new Date().toLocaleString(),originalPrice:String(item.price||"1500"),discountPercent:"25",offerPrice:String(Math.round(parseInt(item.price||"1500")*0.85)),offerTitle:"Eid Dhamaka Offer, Buy 1 Get 1, Free Delivery",editedTitle:item.title||"Tree Pices",editedImages:item.images||[item.image],badge:"New",size:"L",quality:"Premium Cotton 100%",quantity:"1",comment:"Ind - ভালো কোয়ালিটি",stock:"In Stock"};
    const up=[n,...adminEdited]; saveEdited(up); setEditItem(n); setActive("admin"); window.scrollTo(0,0);
  };

  if(!passOk) return(<div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4"><div className="bg-white rounded-[24px] p-8 w-full max-w-sm shadow-xl border"><div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black mx-auto">G</div><div className="text-center font-black mt-3">GAUSIA ADMIN</div><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="1234" className="w-full mt-6 border rounded-full px-5 py-3.5 bg-gray-50"/><button type="button" onClick={()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setPassOk(true);} }} className="w-full mt-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-full font-black">Login</button></div></div>);

  return(
    <div className="min-h-screen bg-[#fcf8f5]">
      <div className="bg-white border-b sticky top-0 z-10"><div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black">G</div><div><div className="font-black text-sm">GAUSIA ADMIN PANEL</div><div className="text-[11px] text-gray-500">সব বাটন 100% Fix - রিভিউ + Send</div></div></div><div className="flex gap-2"><button type="button" onClick={()=>setActive("seller")} className={`px-5 py-2 rounded-full text-xs font-bold border ${active==="seller"?"bg-orange-500 text-white border-orange-500":"bg-white border-gray-200"}`}>📦 সেলার ({sellerRecords.length})</button><button type="button" onClick={()=>setActive("admin")} className={`px-5 py-2 rounded-full text-xs font-bold border ${active==="admin"?"bg-emerald-500 text-white border-emerald-500":"bg-white border-gray-200"}`}>✏️ কোড ({adminEdited.length})</button></div></div></div>

      <div className="max-w-5xl mx-auto px-3 py-4">
        {editItem&&active==="admin"&&(
          <div className="bg-white rounded-[20px] p-5 shadow border border-orange-100 mb-5">
            <input value={editItem.code} onChange={e=>setEditItem({...editItem,code:e.target.value})} className="w-full border-2 border-black rounded-full px-4 py-3 text-sm font-black bg-yellow-50"/>
            <div className="grid grid-cols-3 gap-2 mt-3"><input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} type="number" className="border rounded-full px-4 py-2.5 text-sm font-bold"/><input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} type="number" className="border rounded-full px-4 py-2.5 text-sm font-bold bg-orange-50"/><input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} type="number" className="border-2 border-green-300 rounded-full px-4 py-2.5 text-sm font-black bg-green-50"/></div>
            <input value={editItem.offerTitle} onChange={e=>setEditItem({...editItem,offerTitle:e.target.value})} className="w-full mt-2 border rounded-full px-4 py-2.5 text-sm bg-yellow-50"/><input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} className="w-full mt-2 border rounded-full px-4 py-2.5 text-sm"/>
            <div className="grid grid-cols-2 gap-2 mt-3"><input value={editItem.size} onChange={e=>setEditItem({...editItem,size:e.target.value})} placeholder="সাইজ L" className="border-2 border-orange-200 rounded-full px-4 py-2.5 text-sm font-bold bg-orange-50"/><input value={editItem.quality} onChange={e=>setEditItem({...editItem,quality:e.target.value})} placeholder="কোয়ালিটি" className="border-2 border-purple-200 rounded-full px-4 py-2.5 text-sm font-bold bg-purple-50"/></div>
            <div className="grid grid-cols-2 gap-2 mt-2"><input value={editItem.quantity} onChange={e=>setEditItem({...editItem,quantity:e.target.value})} type="number" placeholder="কোয়ান্টিটি" className="border-2 border-blue-300 rounded-full px-4 py-2.5 text-sm font-black bg-blue-50"/><input value={editItem.comment} onChange={e=>setEditItem({...editItem,comment:e.target.value})} placeholder="মন্তব্য" className="border-2 border-gray-300 rounded-full px-4 py-2.5 text-sm bg-gray-50"/><input value={editItem.badge} onChange={e=>setEditItem({...editItem,badge:e.target.value})} placeholder="New" className="border rounded-full px-4 py-2.5 text-sm col-span-2"/></div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button type="button" onClick={()=>{ const up=adminEdited.map((e:any)=>e.editId===editItem.editId?editItem:e); saveEdited(up); alert("✅ Save হয়েছে - "+editItem.code); setEditItem(null); }} className="bg-yellow-400 border-2 border-black rounded-full py-3 text-sm font-black">💾 Save - সংরক্ষণ</button>
              <button type="button" onClick={()=>setEditItem(null)} className="bg-white border-2 border-black rounded-full py-3 text-sm font-bold">Cancel</button>
            </div>
            <button type="button" onClick={()=>setReviewItem(editItem)} className="w-full mt-2 bg-black text-white rounded-full py-3 text-sm font-bold">👁️ সেন্ট প্রিভিউ - রিভিউ দেখুন</button>
          </div>
        )}

        {active==="seller"&&<div className="grid md:grid-cols-2 gap-4">{sellerRecords.map((p:any)=><div key={p.id} className="bg-white rounded-[18px] p-3 border shadow"><div className="text-xs font-bold">👤 {p.shopName||p.shop} - {p.title}</div><img src={p.images?.[0]||p.image} className="w-full h-44 object-cover mt-2 rounded-[14px] border"/><button type="button" onClick={()=>moveSellerToAdmin(p)} className="w-full mt-2 bg-orange-500 text-white rounded-full py-2.5 text-xs font-black">✏️ Edit</button></div>)}</div>}

        {active==="admin"&&<div className="grid md:grid-cols-2 gap-4">{adminEdited.map((p:any)=><div key={p.editId} className="bg-white rounded-[18px] p-3 border-2 border-black shadow-[3px_3px_0px_black]"><div className="flex justify-between"><span className="text-xs font-bold">{p.code} - {p.editedTitle} - {p.offerPrice}৳ - {p.quantity} পিস - {p.badge}</span><button type="button" onClick={()=>{ if(confirm("ডিলিট?")) saveEdited(adminEdited.filter((e:any)=>e.editId!==p.editId)); }} className="bg-red-500 text-white w-6 h-6 rounded-full text-xs">X</button></div><div className="text-[10px] text-gray-500">📏 {p.size} | ✨ {p.quality} | 📦 {p.quantity} | 💬 {p.comment} | -{p.discountPercent}%</div><img src={p.editedImages?.[0]} className="w-full h-44 object-cover mt-2 rounded-[14px] border-2 border-black"/><button type="button" onClick={()=>setReviewItem(p)} className="w-full mt-2 bg-black text-white border-2 border-black rounded-full py-2.5 text-xs font-bold">👁️ রিভিউ দেখুন তারপর Send করুন</button></div>)}</div>}

        {/* রিভিউ Modal - 3টা বাটন 100% Fix - সরাসরি localStorage */}
        {reviewItem&&(
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-3">
            <div className="bg-white rounded-[20px] w-full max-w-[380px] p-4 border-2 border-black shadow-2xl">
              <div className="flex justify-between items-center"><div className="font-black text-sm">👁️ রিভিউ - Customer এ যেমন দেখাবে</div><button type="button" onClick={()=>setReviewItem(null)} className="bg-red-500 text-white w-7 h-7 rounded-full font-black">X</button></div>
              <div className="bg-orange-50 border rounded-[10px] p-2 mt-2 text-[11px]">👤 দোকানদার: {reviewItem.sellerName} | 📞 {reviewItem.sellerPhone} | 📍 {reviewItem.sellerAddress}<br/>🕒 {reviewItem.sellerDate}</div>
              <img src={reviewItem.editedImages?.[0]} className="w-full h-64 object-cover mt-3 rounded-[14px] border-2 border-black"/>
              <div className="mt-3">
                <div className="font-black">{reviewItem.code} - {reviewItem.editedTitle}</div>
                <div className="text-xs mt-1">📏 {reviewItem.size} | ✨ {reviewItem.quality} | 📦 {reviewItem.quantity} পিস | 💬 {reviewItem.comment}</div>
                <div className="text-xs mt-1"><span className="line-through text-gray-400">{reviewItem.originalPrice}৳</span> -{reviewItem.discountPercent}% = <span className="font-black text-green-600 text-lg">{reviewItem.offerPrice}৳</span></div>
                <div className="text-xs bg-yellow-100 border rounded-full px-3 py-1 w-fit mt-2">🎉 {reviewItem.offerTitle}</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-[10px] p-2 mt-3 text-[11px] text-center font-bold">✅ এর রিভিউটি দেখে তারপর Customer এ পাঠান - Edit/Delete/সংরক্ষণ স্ট্যান্ডার্ড</div>
              
              {/* এই 3টা বাটন এখন 100% কাজ করবে - সরাসরি Inline */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  type="button"
                  onClick={(e)=>{
                    e.preventDefault(); e.stopPropagation();
                    try{
                      const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
                      const f={id:Date.now(),code:reviewItem.code,title:reviewItem.editedTitle,price:parseInt(reviewItem.offerPrice),originalPrice:parseInt(reviewItem.originalPrice),image:reviewItem.editedImages?.[0],images:reviewItem.editedImages,offerTitle:reviewItem.offerTitle,discountPercent:parseInt(reviewItem.discountPercent)||0,badge:reviewItem.badge,size:reviewItem.size,quality:reviewItem.quality,quantity:reviewItem.quantity,comment:reviewItem.comment,sellerName:reviewItem.sellerName,type:"normal"};
                      localStorage.setItem("gausia_all_products",JSON.stringify([f,...all]));
                      alert("✅ Normal অংশে পাঠানো হয়েছে - সব পণ্যের সাথে জমা - "+f.code);
                      setReviewItem(null);
                    }catch(err){ alert("Error: "+err); }
                  }}
                  className="bg-black text-white border-2 border-black rounded-full py-3 text-xs font-black"
                >
                  Confirm Normal - সব জমা
                </button>

                <button
                  type="button"
                  onClick={(e)=>{
                    e.preventDefault(); e.stopPropagation();
                    try{
                      const banners=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
                      const f={id:Date.now(),code:reviewItem.code,title:reviewItem.editedTitle,price:parseInt(reviewItem.offerPrice),originalPrice:parseInt(reviewItem.originalPrice),image:reviewItem.editedImages?.[0],images:reviewItem.editedImages,offerTitle:reviewItem.offerTitle,discountPercent:parseInt(reviewItem.discountPercent)||0,badge:reviewItem.badge,size:reviewItem.size,quality:reviewItem.quality,quantity:reviewItem.quantity,comment:reviewItem.comment,sellerName:reviewItem.sellerName,type:"special"};
                      localStorage.setItem("gausia_special_banners",JSON.stringify([f,...banners].slice(0,12)));
                      const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
                      localStorage.setItem("gausia_all_products",JSON.stringify([f,...all]));
                      alert("🔥 Special Display তে পাঠানো হয়েছে - ওপরে অফার - "+f.code);
                      setReviewItem(null);
                    }catch(err){ alert("Error: "+err); }
                  }}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-black rounded-full py-3 text-xs font-black"
                >
                  🔥 Confirm Special Display
                </button>
              </div>

              <button
                type="button"
                onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); setReviewItem(null); }}
                className="w-full mt-2 bg-white border-2 border-black rounded-full py-2.5 text-xs font-bold"
              >
                ❌ Cancel - আবার Edit করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
