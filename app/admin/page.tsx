"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [passOk,setPassOk]=useState(false); const [pass,setPass]=useState("");
  const [sellerRecords,setSellerRecords]=useState<any[]>([]); const [adminEdited,setAdminEdited]=useState<any[]>([]);
  const [active,setActive]=useState<"seller"|"admin">("admin"); const [editItem,setEditItem]=useState<any>(null);

  useEffect(()=>{
    if(localStorage.getItem("gausia_admin_ok")==="yes") setPassOk(true);
    const pending=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    const records=JSON.parse(localStorage.getItem("gausia_seller_records")||"[]");
    const allRecords=records.length>0?records:pending;
    setSellerRecords(allRecords);
    setAdminEdited(JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]"));
  },[]);

  const saveEdited=(up:any[])=>{ setAdminEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up)); };
  const saveSeller=(up:any[])=>{ setSellerRecords(up); localStorage.setItem("gausia_seller_records",JSON.stringify(up)); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); };

  const moveSellerToAdmin=(item:any)=>{
    const code="CODE-"+String(1001+adminEdited.length).padStart(4,"0");
    const n={
      editId:Date.now(),
      code, 
      sellerName:item.shopName||item.sellerName||"অজানা দোকানদার",
      sellerShop:item.shop||"SHOP",
      sellerPhone:item.phone||"01XXXXXXXXX",
      sellerAddress:item.address||"গাউছিয়া মার্কেট",
      sellerDate:item.createdAt||new Date().toLocaleString(),
      originalTitle:item.title,
      editedTitle:item.title,
      originalPrice:String(item.price),
      discountPercent:"25",
      offerPrice:String(Math.round(parseInt(item.price||"1000")*0.85)),
      offerTitle:"Eid Dhamaka Offer, Buy 1 Get 1, Free Delivery",
      editedImages:item.images||[item.image],
      badge:"New", size:"L", color:"Lal", quantity:item.quantity||"1",
      deliveryCharge:"60", stock:"In Stock", extraDesc:"100% Cotton, Premium Quality"
    };
    const up=[n,...adminEdited]; saveEdited(up); setEditItem(n); setActive("admin"); window.scrollTo({top:0,behavior:"smooth"});
  };

  const handleSave=()=>{ if(!editItem) return; saveEdited(adminEdited.map((e:any)=>e.editId===editItem.editId?editItem:e)); alert("✅ Save হয়েছে - "+editItem.code+" সংরক্ষিত"); setEditItem(null); };
  
  const sendNormal=(item:any)=>{
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const f={id:Date.now(),code:item.code,title:item.editedTitle,price:parseInt(item.offerPrice),originalPrice:parseInt(item.originalPrice),image:item.editedImages?.[0],images:item.editedImages,offerTitle:item.offerTitle,discountPercent:item.discountPercent?parseInt(item.discountPercent):0,badge:item.badge,quantity:item.quantity,sellerName:item.sellerName,sellerPhone:item.sellerPhone,sellerAddress:item.sellerAddress,type:"normal"};
    localStorage.setItem("gausia_all_products",JSON.stringify([f,...all])); alert("✅ Customer এ পাঠানো হয়েছে - সব পণ্যের সাথে জমা - "+f.code);
  };
  const sendSpecial=(item:any)=>{
    const banners=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
    const f={id:Date.now(),code:item.code,title:item.editedTitle,price:parseInt(item.offerPrice),originalPrice:parseInt(item.originalPrice),image:item.editedImages?.[0],images:item.editedImages,offerTitle:item.offerTitle||"Special Offer",discountPercent:item.discountPercent?parseInt(item.discountPercent):0,badge:item.badge,quantity:item.quantity,sellerName:item.sellerName,type:"special"};
    localStorage.setItem("gausia_special_banners",JSON.stringify([f,...banners].slice(0,12))); alert("🔥 Display তে পাঠানো হয়েছে - ওপরে অফার হিসেবে - "+f.code);
  };

  if(!passOk) return(<div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4"><div className="bg-white rounded-[24px] p-8 w-full max-w-sm shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-orange-100"><div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-xl mx-auto">G</div><div className="text-center font-black text-lg mt-3">GAUSIA ADMIN</div><div className="text-center text-xs text-gray-500 mt-1">দোকানদার তথ্য সংরক্ষণ + এডিট + Customer Send</div><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password: 1234" className="w-full mt-6 border border-gray-200 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-orange-400 bg-gray-50"/><button type="button" onClick={()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setPassOk(true);} else alert("Password 1234"); }} className="w-full mt-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-full font-black text-sm shadow-lg">Login</button></div></div>);

  return(
    <div className="min-h-screen bg-[#fcf8f5]">
      {/* Header - সুন্দর স্ট্যান্ডার্ড কালার */}
      <div className="bg-white border-b border-orange-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3"><div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black">G</div><div><div className="font-black text-sm">GAUSIA ADMIN PANEL</div><div className="text-[11px] text-gray-500">দোকানদারের সকল তথ্য সংরক্ষিত + Edit/Delete + Customer Send</div></div></div>
          <div className="flex gap-2">
            <button type="button" onClick={()=>setActive("seller")} className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${active==="seller"?"bg-gradient-to-r from-orange-500 to-pink-500 text-white border-orange-500 shadow-md":"bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>📦 সেলার ({sellerRecords.length})</button>
            <button type="button" onClick={()=>setActive("admin")} className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${active==="admin"?"bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-500 shadow-md":"bg-white text-gray-600 border-gray-200 hover:border-emerald-300"}`}>✏️ এডমিন কোড ({adminEdited.length})</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 md:px-4 py-4">
        {/* Edit Form - সুন্দর মার্জনীয় ডিজাইন */}
        {editItem&&active==="admin"&&(
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-orange-100 mb-5">
            {/* দোকানদারের তথ্য সংরক্ষিত - দেখানো */}
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-[14px] p-3 border border-orange-100 mb-4">
              <div className="text-[11px] font-black text-orange-700">👤 দোকানদারের সকল তথ্য সংরক্ষিত</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-[11px]">
                <div className="bg-white rounded-full px-3 py-1.5 border">👤 {editItem.sellerName}</div>
                <div className="bg-white rounded-full px-3 py-1.5 border">📞 {editItem.sellerPhone}</div>
                <div className="bg-white rounded-full px-3 py-1.5 border">📍 {editItem.sellerAddress}</div>
                <div className="bg-white rounded-full px-3 py-1.5 border">🕒 {editItem.sellerDate}</div>
              </div>
            </div>

            <div className="text-[11px] font-black text-gray-700">✏️ কোড নাম্বার + মার্কেটিং - আপনার ছবির ডিজাইন</div>
            <input value={editItem.code} onChange={e=>setEditItem({...editItem,code:e.target.value})} className="w-full mt-2.5 border border-gray-200 rounded-full px-4 py-3 text-sm font-black bg-gradient-to-r from-yellow-50 to-orange-50 focus:outline-none focus:border-orange-400"/>
            <div className="grid grid-cols-3 gap-2 mt-2.5">
              <div><div className="text-[10px] text-gray-500 ml-3 mb-1">আগের দাম</div><input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} type="number" className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"/></div>
              <div><div className="text-[10px] text-gray-500 ml-3 mb-1">% ছাড়</div><input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} type="number" className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"/></div>
              <div><div className="text-[10px] text-gray-500 ml-3 mb-1">অফার দাম</div><input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} type="number" className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm font-black bg-green-50 focus:outline-none focus:border-green-400"/></div>
            </div>
            <input value={editItem.offerTitle} onChange={e=>setEditItem({...editItem,offerTitle:e.target.value})} placeholder="Eid Dhamaka Offer, Buy 1 Get 1, Free Delivery" className="w-full mt-2.5 border border-gray-200 rounded-full px-4 py-2.5 text-sm bg-yellow-50 focus:outline-none focus:border-yellow-400"/>
            <input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} placeholder="Tree Pices" className="w-full mt-2.5 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"/>
            <div className="grid grid-cols-3 gap-2 mt-2.5">
              <input value={editItem.quantity} onChange={e=>setEditItem({...editItem,quantity:e.target.value})} type="number" placeholder="পরিমাণ" className="border-2 border-blue-200 rounded-full px-4 py-2.5 text-sm bg-blue-50 font-black focus:outline-none focus:border-blue-400"/>
              <input value={editItem.badge} onChange={e=>setEditItem({...editItem,badge:e.target.value})} placeholder="New" className="border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"/>
              <input value={editItem.size} onChange={e=>setEditItem({...editItem,size:e.target.value})} placeholder="L" className="border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"/>
            </div>
            <div className="flex gap-2 mt-3"><div className="flex gap-1.5 overflow-auto">{editItem.editedImages?.map((im:string,k:number)=><img key={k} src={im} className="w-12 h-12 rounded-full border-2 border-orange-100 object-cover"/> )}</div></div>
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <button type="button" onClick={handleSave} className="bg-gradient-to-r from-yellow-400 to-orange-400 border border-yellow-500 rounded-full py-3 text-sm font-black shadow-[0_2px_8px_rgba(251,191,36,0.4)]">💾 Save - সংরক্ষণ</button>
              <button type="button" onClick={()=>setEditItem(null)} className="bg-white border border-gray-200 rounded-full py-3 text-sm font-bold hover:border-gray-300">Cancel</button>
            </div>
          </div>
        )}

        {/* Seller অংশ - সুন্দর ডিজাইন + তথ্য সহ */}
        {active==="seller"&&(
          <div>
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-[14px] p-3 text-xs font-bold text-center shadow-md">📦 সেলার অংশ - দোকানদারের সকল তথ্য এখানে সংরক্ষিত থাকবে - এডমিন Edit/Delete করতে পারে</div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {sellerRecords.map((p:any)=><div key={p.id} className="bg-white rounded-[18px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-orange-100">
                <div className="bg-orange-50 rounded-[12px] p-2.5 border border-orange-100"><div className="text-[11px] font-black">👤 {p.shopName||p.sellerName||p.shop} - {p.title}</div><div className="text-[10px] text-gray-600 mt-1 grid grid-cols-2 gap-1"><span>📞 {p.phone||"01XXXXXXXXX"}</span><span>📍 {p.address||"গাউছিয়া"}</span><span>💰 {p.price}৳</span><span>🕒 {p.createdAt||"আজ"}</span></div></div>
                <img src={p.images?.[0]||p.image} alt="" className="w-full h-44 object-cover mt-3 rounded-[14px] border border-gray-100"/>
                <div className="grid grid-cols-2 gap-2 mt-3"><button type="button" onClick={()=>moveSellerToAdmin(p)} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full py-2.5 text-xs font-black shadow">✏️ Edit করে কোড দিন</button><button type="button" onClick={()=>{ if(confirm("ডিলিট করবেন?")) saveSeller(sellerRecords.filter((e:any)=>e.id!==p.id)); }} className="bg-white border border-gray-200 rounded-full py-2.5 text-xs font-bold hover:border-red-300">🗑️ Delete</button></div>
              </div>)}
              {sellerRecords.length===0&&<div className="col-span-2 text-center py-16 bg-white rounded-[18px] border border-dashed border-orange-200 text-gray-400 text-sm">📭 কোনো সেলার পণ্য নেই - Seller থেকে পাঠান</div>}
            </div>
          </div>
        )}

        {/* Admin অংশ - সুন্দর মার্জনীয় */}
        {active==="admin"&&(
          <div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-[14px] p-3 text-xs font-bold text-center shadow-md">✏️ এডমিন অংশ সংরক্ষিত - 2 দিকে: 1) Normal - সব পণ্যের সাথে জমা 2) Special Display - ওপরে অফার</div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {adminEdited.map((p:any)=><div key={p.editId} className="bg-white rounded-[18px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-emerald-100">
                <div className="flex justify-between items-start gap-2"><div className="flex-1"><div className="text-xs font-black">{p.code} - {p.editedTitle} - {p.offerPrice}৳ - {p.quantity} পিস - {p.badge}</div><div className="text-[10px] text-gray-500 mt-1">👤 {p.sellerName} | 📞 {p.sellerPhone} | {p.sellerAddress}</div></div><button type="button" onClick={()=>{ if(confirm("ডিলিট করবেন?")) saveEdited(adminEdited.filter((e:any)=>e.editId!==p.editId)); }} className="bg-red-50 text-red-500 w-7 h-7 rounded-full text-xs font-black border border-red-200">X</button></div>
                <img src={p.editedImages?.[0]} alt="" className="w-full h-44 object-cover mt-3 rounded-[14px] border border-gray-100"/>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <button type="button" onClick={()=>{ setEditItem(p); window.scrollTo({top:0,behavior:"smooth"}); }} className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full py-2.5 text-xs font-black border border-yellow-500 shadow">✏️ Edit</button>
                  <button type="button" onClick={()=>sendNormal(p)} className="bg-gradient-to-r from-gray-900 to-black text-white rounded-full py-2.5 text-[11px] font-black shadow">📦 Normal - সব জমা</button>
                  <button type="button" onClick={()=>sendSpecial(p)} className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full py-2.5 text-[11px] font-black shadow">🔥 Special Display</button>
                </div>
              </div>)}
              {adminEdited.length===0&&<div className="col-span-2 text-center py-16 bg-white rounded-[18px] border border-dashed border-emerald-200 text-gray-400 text-sm">📭 এডমিন কোড নেই - সেলার থেকে Edit করে আনুন</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
