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
    const n={
      editId:Date.now(), code,
      sellerName:item.shopName||item.sellerName||item.shop||"A",
      sellerPhone:item.phone||"1111111", sellerAddress:item.address||"Gawsia", sellerDate:item.createdAt||new Date().toLocaleString(),
      originalPrice:String(item.price||"1500"), discountPercent:"25", offerPrice:String(Math.round(parseInt(item.price||"1500")*0.85)),
      offerTitle:"Eid Dhamaka Offer, Buy 1 Get 1, Free Delivery", editedTitle:item.title||"Tree Pices",
      editedImages:item.images||[item.image], badge:"New",
      // আপনার চাওয়া সব ফিল্ড
      size:"L", quality:"Premium Cotton 100%", quantity:"1", comment:"Ind - ভালো কোয়ালিটি, ধোয়া যায়",
      stock:"In Stock", deliveryCharge:"60", extraDesc:"Best Quality"
    };
    const up=[n,...adminEdited]; saveEdited(up); setEditItem(n); setActive("admin"); window.scrollTo({top:0,behavior:"smooth"});
  };

  const handleSave=()=>{ if(!editItem) return; saveEdited(adminEdited.map((e:any)=>e.editId===editItem.editId?editItem:e)); alert("✅ Save - সংরক্ষণ - "+editItem.code); setEditItem(null); };
  const handleDeleteAdmin=(id:number)=>{ if(!confirm("ডিলিট করবেন?")) return; saveEdited(adminEdited.filter((e:any)=>e.editId!==id)); };
  const handleDeleteSeller=(id:number)=>{ if(!confirm("ডিলিট?")) return; saveSeller(sellerRecords.filter((e:any)=>e.id!==id)); };

  const confirmNormal=()=>{
    if(!reviewItem) return;
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const f={id:Date.now(),code:reviewItem.code,title:reviewItem.editedTitle,price:parseInt(reviewItem.offerPrice),originalPrice:parseInt(reviewItem.originalPrice),image:reviewItem.editedImages?.[0],images:reviewItem.editedImages,offerTitle:reviewItem.offerTitle,discountPercent:parseInt(reviewItem.discountPercent)||0,badge:reviewItem.badge,size:reviewItem.size,quality:reviewItem.quality,quantity:reviewItem.quantity,comment:reviewItem.comment,sellerName:reviewItem.sellerName,sellerPhone:reviewItem.sellerPhone,sellerAddress:reviewItem.sellerAddress,type:"normal"};
    localStorage.setItem("gausia_all_products",JSON.stringify([f,...all])); setReviewItem(null); alert("✅ Normal অংশে পাঠানো হয়েছে - সব পণ্যের সাথে জমা - "+f.code);
  };
  const confirmSpecial=()=>{
    if(!reviewItem) return;
    const banners=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
    const f={id:Date.now(),code:reviewItem.code,title:reviewItem.editedTitle,price:parseInt(reviewItem.offerPrice),originalPrice:parseInt(reviewItem.originalPrice),image:reviewItem.editedImages?.[0],images:reviewItem.editedImages,offerTitle:reviewItem.offerTitle,discountPercent:parseInt(reviewItem.discountPercent)||0,badge:reviewItem.badge,size:reviewItem.size,quality:reviewItem.quality,quantity:reviewItem.quantity,comment:reviewItem.comment,sellerName:reviewItem.sellerName,type:"special"};
    localStorage.setItem("gausia_special_banners",JSON.stringify([f,...banners].slice(0,12))); setReviewItem(null); alert("🔥 Special Display তে পাঠানো হয়েছে - ওপরে অফার - "+f.code);
  };

  if(!passOk) return(<div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4"><div className="bg-white rounded-[24px] p-8 w-full max-w-sm shadow-xl border"><div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black mx-auto">G</div><div className="text-center font-black mt-3">GAUSIA ADMIN</div><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="1234" className="w-full mt-6 border rounded-full px-5 py-3.5 bg-gray-50"/><button type="button" onClick={()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setPassOk(true);} }} className="w-full mt-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-full font-black">Login</button></div></div>);

  return(
    <div className="min-h-screen bg-[#fcf8f5]">
      <div className="bg-white border-b sticky top-0 z-10"><div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black">G</div><div><div className="font-black text-sm">GAUSIA ADMIN PANEL</div><div className="text-[11px] text-gray-500">সাইজ, কোয়ালিটি, কোয়ান্টিটি, মন্তব্য, ডিসকাউন্ট, প্রিভিউ, Send</div></div></div><div className="flex gap-2"><button type="button" onClick={()=>setActive("seller")} className={`px-5 py-2 rounded-full text-xs font-bold border ${active==="seller"?"bg-orange-500 text-white border-orange-500":"bg-white border-gray-200"}`}>📦 সেলার ({sellerRecords.length})</button><button type="button" onClick={()=>setActive("admin")} className={`px-5 py-2 rounded-full text-xs font-bold border ${active==="admin"?"bg-emerald-500 text-white border-emerald-500":"bg-white border-gray-200"}`}>✏️ কোড ({adminEdited.length})</button></div></div></div>

      <div className="max-w-5xl mx-auto px-3 py-4">
        {editItem&&active==="admin"&&(
          <div className="bg-white rounded-[20px] p-5 shadow border border-orange-100 mb-5">
            {/* দোকানদার তথ্য */}
            <div className="bg-orange-50 rounded-[12px] p-2.5 border border-orange-100 mb-3">
              <div className="text-[11px] font-black text-orange-700">👤 দোকানদারের সকল তথ্য সংরক্ষিত</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-[11px]">
                <div className="bg-white rounded-full px-3 py-1.5 border">👤 {editItem.sellerName}</div>
                <div className="bg-white rounded-full px-3 py-1.5 border">📞 {editItem.sellerPhone}</div>
                <div className="bg-white rounded-full px-3 py-1.5 border">📍 {editItem.sellerAddress}</div>
                <div className="bg-white rounded-full px-3 py-1.5 border">🕒 {editItem.sellerDate}</div>
              </div>
            </div>

            <div className="text-[11px] font-black">✏️ কোড নাম্বার + মার্কেটিং - আপনার ছবির ডিজাইন</div>
            <input value={editItem.code} onChange={e=>setEditItem({...editItem,code:e.target.value})} className="w-full mt-2 border-2 border-black rounded-full px-4 py-3 text-sm font-black bg-yellow-50"/>

            {/* আগের দাম, % ছাড়, অফার দাম */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div><div className="text-[10px] ml-3">আগের দাম</div><input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} type="number" className="w-full border rounded-full px-4 py-2.5 text-sm font-bold"/></div>
              <div><div className="text-[10px] ml-3">% ছাড়</div><input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} type="number" className="w-full border rounded-full px-4 py-2.5 text-sm font-bold bg-orange-50"/></div>
              <div><div className="text-[10px] ml-3">অফার দাম</div><input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} type="number" className="w-full border-2 border-green-300 rounded-full px-4 py-2.5 text-sm font-black bg-green-50"/></div>
            </div>

            <input value={editItem.offerTitle} onChange={e=>setEditItem({...editItem,offerTitle:e.target.value})} placeholder="Eid Dhamaka Offer, Buy 1 Get 1, Free Delivery" className="w-full mt-2 border rounded-full px-4 py-2.5 text-sm bg-yellow-50"/>
            <input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} placeholder="Tree Pices" className="w-full mt-2 border rounded-full px-4 py-2.5 text-sm"/>

            {/* সাইজ, কোয়ালিটি, কোয়ান্টিটি, মন্তব্য - আপনার চাওয়া */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div><div className="text-[10px] ml-3">📏 সাইজ</div><input value={editItem.size} onChange={e=>setEditItem({...editItem,size:e.target.value})} placeholder="L, XL, M - সাইজ টাইপ" className="w-full border-2 border-orange-200 rounded-full px-4 py-2.5 text-sm font-bold bg-orange-50"/></div>
              <div><div className="text-[10px] ml-3">✨ কোয়ালিটি</div><input value={editItem.quality} onChange={e=>setEditItem({...editItem,quality:e.target.value})} placeholder="Premium Cotton, 100% - কোয়ালিটি টাইপ" className="w-full border-2 border-purple-200 rounded-full px-4 py-2.5 text-sm font-bold bg-purple-50"/></div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div><div className="text-[10px] ml-3">📦 কোয়ান্টিটি</div><input value={editItem.quantity} onChange={e=>setEditItem({...editItem,quantity:e.target.value})} type="number" placeholder="1, 2, 5 - পরিমাণ টাইপ" className="w-full border-2 border-blue-300 rounded-full px-4 py-2.5 text-sm font-black bg-blue-50"/></div>
              <div><div className="text-[10px] ml-3">🏷️ ব্যাজ</div><input value={editItem.badge} onChange={e=>setEditItem({...editItem,badge:e.target.value})} placeholder="New, Hot, Offer" className="w-full border rounded-full px-4 py-2.5 text-sm"/></div>
            </div>
            <div className="mt-2"><div className="text-[10px] ml-3">💬 মন্তব্য</div><input value={editItem.comment} onChange={e=>setEditItem({...editItem,comment:e.target.value})} placeholder="Ind, ভালো কোয়ালিটি, ধোয়া যায় - মন্তব্য টাইপ" className="w-full border-2 border-gray-300 rounded-full px-4 py-2.5 text-sm bg-gray-50"/></div>

            <div className="flex gap-2 mt-3 overflow-auto">{editItem.editedImages?.map((im:string,k:number)=><img key={k} src={im} className="w-12 h-12 rounded-full border-2 border-orange-100 object-cover"/> )}</div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button type="button" onClick={handleSave} className="bg-gradient-to-r from-yellow-400 to-orange-400 border-2 border-black rounded-full py-3 text-sm font-black">💾 Save - সংরক্ষণ</button>
              <button type="button" onClick={()=>setEditItem(null)} className="bg-white border-2 border-black rounded-full py-3 text-sm font-bold">Cancel</button>
            </div>
            <button type="button" onClick={()=>setReviewItem(editItem)} className="w-full mt-2 bg-black text-white rounded-full py-3 text-sm font-bold">👁️ সেন্ট প্রিভিউ - রিভিউ দেখুন তারপর Send</button>
          </div>
        )}

        {active==="seller"&&<div className="grid md:grid-cols-2 gap-4">{sellerRecords.map((p:any)=><div key={p.id} className="bg-white rounded-[18px] p-3 border shadow"><div className="text-xs font-bold">👤 {p.shopName||p.shop} - {p.title}</div><img src={p.images?.[0]} className="w-full h-44 object-cover mt-2 rounded-[14px] border"/><button type="button" onClick={()=>moveSellerToAdmin(p)} className="w-full mt-2 bg-orange-500 text-white rounded-full py-2.5 text-xs font-black">✏️ Edit - সাইজ, কোয়ালিটি, কোয়ান্টিটি, মন্তব্য দিন</button></div>)}</div>}

        {active==="admin"&&<div className="grid md:grid-cols-2 gap-4">{adminEdited.map((p:any)=><div key={p.editId} className="bg-white rounded-[18px] p-3 border-2 border-black shadow-[3px_3px_0px_black]"><div className="flex justify-between"><span className="text-xs font-bold">{p.code} - {p.editedTitle} - {p.offerPrice}৳ - {p.quantity} পিস - {p.badge}</span><button type="button" onClick={()=>handleDeleteAdmin(p.editId)} className="bg-red-500 text-white w-6 h-6 rounded-full text-xs">X</button></div><div className="text-[10px] text-gray-500 mt-1">📏 {p.size} | ✨ {p.quality} | 📦 {p.quantity} | 💬 {p.comment} | -{p.discountPercent}%</div><img src={p.editedImages?.[0]} className="w-full h-44 object-cover mt-2 rounded-[14px] border-2 border-black"/><div className="grid grid-cols-4 gap-1.5 mt-2"><button type="button" onClick={()=>{ setEditItem(p); window.scrollTo({top:0,behavior:"smooth"}); }} className="bg-yellow-400 border-2 border-black rounded-full py-2 text-xs font-black">✏️ Edit</button><button type="button" onClick={()=>handleDeleteAdmin(p.editId)} className="bg-white border-2 border-black rounded-full py-2 text-xs font-bold">🗑️ Delete</button><button type="button" onClick={()=>setReviewItem(p)} className="bg-black text-white border-2 border-black rounded-full py-2 text-xs font-bold">👁️ প্রিভিউ</button><button type="button" onClick={()=>setReviewItem(p)} className="bg-blue-500 text-white border-2 border-black rounded-full py-2 text-[10px] font-black">📤 Send</button></div><div className="grid grid-cols-2 gap-1.5 mt-1.5"><button type="button" onClick={()=>setReviewItem(p)} className="bg-black text-white border-2 border-black rounded-full py-2 text-[11px] font-black">📦 Normal অংশে</button><button type="button" onClick={()=>setReviewItem(p)} className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-black rounded-full py-2 text-[11px] font-black">🔥 Special অংশে</button></div></div>)}</div>}

        {reviewItem&&(
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-auto">
            <div className="bg-white rounded-[20px] w-full max-w-md p-4 border-2 border-black my-8">
              <div className="flex justify-between"><div className="font-black text-sm">👁️ সেন্ট প্রিভিউ - Customer এ যেমন দেখাবে</div><button type="button" onClick={()=>setReviewItem(null)} className="bg-red-500 text-white w-7 h-7 rounded-full">X</button></div>
              <img src={reviewItem.editedImages?.[0]} className="w-full h-56 object-cover mt-3 rounded-[14px] border-2 border-black"/>
              <div className="mt-3 space-y-1 text-xs">
                <div className="font-black text-sm">{reviewItem.code} - {reviewItem.editedTitle}</div>
                <div>📏 সাইজ: {reviewItem.size} | ✨ কোয়ালিটি: {reviewItem.quality} | 📦 কোয়ান্টিটি: {reviewItem.quantity} পিস</div>
                <div>💬 মন্তব্য: {reviewItem.comment}</div>
                <div><span className="line-through text-gray-400">{reviewItem.originalPrice}৳</span> -<span className="text-red-500 font-bold">{reviewItem.discountPercent}%</span> = <span className="font-black text-green-600 text-lg">{reviewItem.offerPrice}৳</span></div>
                <div className="bg-yellow-100 border rounded-full px-3 py-1 w-fit">🎉 {reviewItem.offerTitle}</div>
                <div className="bg-orange-50 border rounded-[10px] p-2 mt-2"><div className="text-[11px]">👤 {reviewItem.sellerName} | 📞 {reviewItem.sellerPhone} | 📍 {reviewItem.sellerAddress}</div></div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button type="button" onClick={confirmNormal} className="bg-black text-white border-2 border-black rounded-full py-3 text-xs font-black">📦 Confirm - Normal অংশে</button>
                <button type="button" onClick={confirmSpecial} className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-black rounded-full py-3 text-xs font-black">🔥 Confirm - Special অংশে</button>
              </div>
              <button type="button" onClick={()=>setReviewItem(null)} className="w-full mt-2 bg-white border-2 border-black rounded-full py-2 text-xs font-bold">❌ Cancel - আবার Edit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
