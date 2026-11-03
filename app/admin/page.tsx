"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [passOk,setPassOk]=useState(false); const [pass,setPass]=useState("");
  const [sellerRecords,setSellerRecords]=useState<any[]>([]); const [adminEdited,setAdminEdited]=useState<any[]>([]);
  const [active,setActive]=useState<"seller"|"admin">("admin"); const [editItem,setEditItem]=useState<any>(null);
  const [reviewItem,setReviewItem]=useState<any>(null); // Customer এ পাঠানোর আগে রিভিউ

  useEffect(()=>{
    try{
      if(localStorage.getItem("gausia_admin_ok")==="yes") setPassOk(true);
      const rec=JSON.parse(localStorage.getItem("gausia_seller_records")||"[]");
      const pend=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
      setSellerRecords(rec.length>0?rec:pend);
      setAdminEdited(JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]"));
    }catch(e){ console.log(e); }
  },[]);

  const saveEdited=(up:any[])=>{ setAdminEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up)); };
  const saveSeller=(up:any[])=>{ setSellerRecords(up); localStorage.setItem("gausia_seller_records",JSON.stringify(up)); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); };

  const moveSellerToAdmin=(item:any)=>{
    const code="CODE-"+String(1001+adminEdited.length).padStart(4,"0");
    const n={editId:Date.now(),code,sellerName:item.shopName||item.sellerName||item.shop||"দোকানদার",sellerPhone:item.phone||"01XXXXXXXXX",sellerAddress:item.address||"গাউছিয়া",sellerDate:item.createdAt||new Date().toLocaleString(),originalPrice:String(item.price),discountPercent:"25",offerPrice:String(Math.round(parseInt(item.price||"1000")*0.85)),offerTitle:"Eid Dhamaka Offer, Buy 1 Get 1, Free Delivery",editedTitle:item.title,editedImages:item.images||[item.image],badge:"New",size:"L",quantity:item.quantity||"1",stock:"In Stock",extraDesc:"Premium Quality"};
    const up=[n,...adminEdited]; saveEdited(up); setEditItem(n); setActive("admin");
  };

  const handleSave=()=>{ if(!editItem) return; const up=adminEdited.map((e:any)=> e.editId===editItem.editId?editItem:e); saveEdited(up); alert("✅ Save - সংরক্ষণ হয়েছে - "+editItem.code); setEditItem(null); };
  const handleCancel=()=>{ setEditItem(null); };
  const handleDeleteAdmin=(id:number)=>{ if(!confirm("এই কোড ডিলিট করবেন?")) return; saveEdited(adminEdited.filter((e:any)=>e.editId!==id)); alert("✅ Delete হয়েছে"); };
  const handleDeleteSeller=(id:number)=>{ if(!confirm("সেলার রেকর্ড ডিলিট?")) return; saveSeller(sellerRecords.filter((e:any)=>e.id!==id)); alert("✅ Delete হয়েছে"); };

  const handlePreview=(item:any)=>{ setReviewItem(item); }; // রিভিউ দেখা যাবে

  const confirmNormal=()=>{
    if(!reviewItem) return;
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const f={id:Date.now(),code:reviewItem.code,title:reviewItem.editedTitle,price:parseInt(reviewItem.offerPrice),originalPrice:parseInt(reviewItem.originalPrice),image:reviewItem.editedImages?.[0],images:reviewItem.editedImages,offerTitle:reviewItem.offerTitle,discountPercent:parseInt(reviewItem.discountPercent)||0,badge:reviewItem.badge,quantity:reviewItem.quantity,sellerName:reviewItem.sellerName,sellerPhone:reviewItem.sellerPhone,sellerAddress:reviewItem.sellerAddress,type:"normal"};
    localStorage.setItem("gausia_all_products",JSON.stringify([f,...all])); setReviewItem(null); alert("✅ Customer পেজে পাঠানো হয়েছে - সব পণ্যের সাথে জমা - "+f.code);
  };
  const confirmSpecial=()=>{
    if(!reviewItem) return;
    const banners=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
    const f={id:Date.now(),code:reviewItem.code,title:reviewItem.editedTitle,price:parseInt(reviewItem.offerPrice),originalPrice:parseInt(reviewItem.originalPrice),image:reviewItem.editedImages?.[0],images:reviewItem.editedImages,offerTitle:reviewItem.offerTitle||"Special Offer",discountPercent:parseInt(reviewItem.discountPercent)||0,badge:reviewItem.badge,quantity:reviewItem.quantity,sellerName:reviewItem.sellerName,type:"special"};
    localStorage.setItem("gausia_special_banners",JSON.stringify([f,...banners].slice(0,12))); setReviewItem(null); alert("🔥 Display তে পাঠানো হয়েছে - ওপরে অফার হিসেবে - "+f.code);
  };

  if(!passOk) return(<div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4"><div className="bg-white rounded-[24px] p-8 w-full max-w-sm shadow-xl border border-orange-100"><div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-xl mx-auto">G</div><div className="text-center font-black mt-3">GAUSIA ADMIN</div><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="1234" className="w-full mt-6 border border-gray-200 rounded-full px-5 py-3.5 text-sm bg-gray-50"/><button type="button" onClick={()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setPassOk(true);} }} className="w-full mt-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-full font-black">Login</button></div></div>);

  return(
    <div className="min-h-screen bg-[#fcf8f5]">
      <div className="bg-white border-b border-orange-100 sticky top-0 z-10"><div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black">G</div><div><div className="font-black text-sm">GAUSIA ADMIN PANEL</div><div className="text-[11px] text-gray-500">Edit/Delete/সংরক্ষণ স্ট্যান্ডার্ড + রিভিউ + Customer Send</div></div></div><div className="flex gap-2"><button type="button" onClick={()=>setActive("seller")} className={`px-5 py-2 rounded-full text-xs font-bold border ${active==="seller"?"bg-orange-500 text-white border-orange-500":"bg-white border-gray-200"}`}>📦 সেলার ({sellerRecords.length})</button><button type="button" onClick={()=>setActive("admin")} className={`px-5 py-2 rounded-full text-xs font-bold border ${active==="admin"?"bg-emerald-500 text-white border-emerald-500":"bg-white border-gray-200"}`}>✏️ কোড ({adminEdited.length})</button></div></div></div>

      <div className="max-w-5xl mx-auto px-3 py-4">
        {editItem&&active==="admin"&&(
          <div className="bg-white rounded-[20px] p-5 shadow border border-orange-100 mb-5">
            <div className="bg-orange-50 rounded-[12px] p-2.5 border border-orange-100 mb-3"><div className="text-[11px] font-black text-orange-700">👤 দোকানদারের সকল তথ্য সংরক্ষিত</div><div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-[11px]"><div className="bg-white rounded-full px-3 py-1.5 border">👤 {editItem.sellerName}</div><div className="bg-white rounded-full px-3 py-1.5 border">📞 {editItem.sellerPhone}</div><div className="bg-white rounded-full px-3 py-1.5 border">📍 {editItem.sellerAddress}</div></div></div>
            <input value={editItem.code} onChange={e=>setEditItem({...editItem,code:e.target.value})} className="w-full border-2 border-black rounded-full px-4 py-3 text-sm font-black bg-yellow-50"/>
            <div className="grid grid-cols-3 gap-2 mt-2"><input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} type="number" className="border rounded-full px-3 py-2 text-sm"/><input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} type="number" className="border rounded-full px-3 py-2 text-sm"/><input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} type="number" className="border rounded-full px-3 py-2 text-sm bg-green-50 font-bold"/></div>
            <input value={editItem.offerTitle} onChange={e=>setEditItem({...editItem,offerTitle:e.target.value})} className="w-full mt-2 border rounded-full px-4 py-2 text-sm bg-yellow-50"/><input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} className="w-full mt-2 border rounded-full px-4 py-2 text-sm"/>
            <div className="grid grid-cols-3 gap-2 mt-2"><input value={editItem.quantity} onChange={e=>setEditItem({...editItem,quantity:e.target.value})} type="number" className="border-2 border-blue-300 rounded-full px-3 py-2 text-sm bg-blue-50 font-black"/><input value={editItem.badge} onChange={e=>setEditItem({...editItem,badge:e.target.value})} className="border rounded-full px-3 py-2 text-sm"/><input value={editItem.size} onChange={e=>setEditItem({...editItem,size:e.target.value})} className="border rounded-full px-3 py-2 text-sm"/></div>
            <div className="grid grid-cols-2 gap-2 mt-3"><button type="button" onClick={handleSave} className="bg-yellow-400 border-2 border-black rounded-full py-3 text-sm font-black">💾 Save - সংরক্ষণ</button><button type="button" onClick={handleCancel} className="bg-white border-2 border-black rounded-full py-3 text-sm font-bold">Cancel</button></div>
            <button type="button" onClick={()=>handlePreview(editItem)} className="w-full mt-2 bg-black text-white rounded-full py-3 text-sm font-bold">👁️ রিভিউ দেখুন - তারপর Customer এ পাঠান</button>
          </div>
        )}

        {active==="seller"&&<div className="grid md:grid-cols-2 gap-4">{sellerRecords.map((p:any)=><div key={p.id} className="bg-white rounded-[18px] p-3 border shadow"><div className="text-xs font-bold">👤 {p.shopName||p.shop} - {p.title} - {p.price}৳</div><div className="text-[10px] text-gray-500">📞 {p.phone||"01XXXXXXXXX"} | 📍 {p.address||"গাউছিয়া"} | 🕒 {p.createdAt||"আজ"}</div><img src={p.images?.[0]||p.image} className="w-full h-44 object-cover mt-2 rounded-[14px] border"/><div className="grid grid-cols-2 gap-2 mt-2"><button type="button" onClick={()=>moveSellerToAdmin(p)} className="bg-orange-500 text-white rounded-full py-2.5 text-xs font-black">✏️ Edit করে কোড দিন</button><button type="button" onClick={()=>handleDeleteSeller(p.id)} className="bg-white border border-gray-300 rounded-full py-2.5 text-xs font-bold">🗑️ Delete</button></div></div>)}</div>}

        {active==="admin"&&<div className="grid md:grid-cols-2 gap-4">{adminEdited.map((p:any)=><div key={p.editId} className="bg-white rounded-[18px] p-3 border-2 border-black shadow-[3px_3px_0px_black]"><div className="flex justify-between"><span className="text-xs font-bold">{p.code} - {p.editedTitle} - {p.offerPrice}৳ - {p.quantity} পিস - {p.badge}</span><button type="button" onClick={()=>handleDeleteAdmin(p.editId)} className="bg-red-500 text-white w-6 h-6 rounded-full text-xs">X</button></div><div className="text-[10px] text-gray-500">👤 {p.sellerName} | 📞 {p.sellerPhone}</div><img src={p.editedImages?.[0]} className="w-full h-44 object-cover mt-2 rounded-[14px] border-2 border-black"/><div className="grid grid-cols-4 gap-1.5 mt-2"><button type="button" onClick={()=>{ setEditItem(p); window.scrollTo({top:0,behavior:"smooth"}); }} className="bg-yellow-400 border-2 border-black rounded-full py-2 text-xs font-black">✏️ Edit</button><button type="button" onClick={()=>handleDeleteAdmin(p.editId)} className="bg-white border-2 border-black rounded-full py-2 text-xs font-bold">🗑️ Delete</button><button type="button" onClick={()=>handlePreview(p)} className="bg-black text-white border-2 border-black rounded-full py-2 text-xs font-bold">👁️ রিভিউ</button><button type="button" onClick={()=>handlePreview(p)} className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-black rounded-full py-2 text-[10px] font-black">📤 Send</button></div><div className="grid grid-cols-2 gap-1.5 mt-1.5"><button type="button" onClick={()=>{ setReviewItem(p); }} className="bg-black text-white border-2 border-black rounded-full py-2 text-[11px] font-black">📦 Normal - সব জমা</button><button type="button" onClick={()=>{ setReviewItem(p); }} className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-black rounded-full py-2 text-[11px] font-black">🔥 Special Display</button></div></div>)}</div>}

        {/* রিভিউ Modal - Customer এ পাঠানোর আগে অবশ্যই দেখা যাবে - স্ট্যান্ডার্ড */}
        {reviewItem&&(
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[20px] w-full max-w-md p-4 shadow-2xl border-2 border-black">
              <div className="flex justify-between items-center"><div className="font-black text-sm">👁️ রিভিউ - Customer এ যেমন দেখাবে</div><button type="button" onClick={()=>setReviewItem(null)} className="bg-red-500 text-white w-7 h-7 rounded-full">X</button></div>
              <div className="bg-orange-50 rounded-[12px] p-2 mt-3 border"><div className="text-[11px]">👤 দোকানদার: {reviewItem.sellerName} | 📞 {reviewItem.sellerPhone} | 📍 {reviewItem.sellerAddress}</div><div className="text-[11px] mt-1">🕒 {reviewItem.sellerDate}</div></div>
              <img src={reviewItem.editedImages?.[0]} className="w-full h-56 object-cover mt-3 rounded-[14px] border-2 border-black"/>
              <div className="mt-3"><div className="font-black text-sm">{reviewItem.code} - {reviewItem.editedTitle}</div><div className="text-xs mt-1"><span className="line-through text-gray-400">{reviewItem.originalPrice}৳</span> <span className="font-black text-green-600 text-lg">{reviewItem.offerPrice}৳</span> -{reviewItem.discountPercent}% | {reviewItem.quantity} পিস | {reviewItem.badge}</div><div className="text-xs bg-yellow-100 border rounded-full px-3 py-1 w-fit mt-2">🎉 {reviewItem.offerTitle}</div></div>
              <div className="text-[11px] text-gray-500 mt-3 text-center">✅ এই রিভিউ দেখে তারপর Customer এ পাঠান - Edit/Delete/সংরক্ষণ স্ট্যান্ডার্ড</div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button type="button" onClick={confirmNormal} className="bg-black text-white border-2 border-black rounded-full py-3 text-xs font-black">📦 Confirm Normal - সব জমা</button>
                <button type="button" onClick={confirmSpecial} className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-black rounded-full py-3 text-xs font-black">🔥 Confirm Special Display</button>
              </div>
              <button type="button" onClick={()=>setReviewItem(null)} className="w-full mt-2 bg-white border-2 border-black rounded-full py-2 text-xs font-bold">❌ Cancel - আবার Edit করুন</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
