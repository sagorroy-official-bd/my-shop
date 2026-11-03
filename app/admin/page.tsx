"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [passOk,setPassOk]=useState(false); const [pass,setPass]=useState("");
  const [sellerRecords,setSellerRecords]=useState<any[]>([]); const [adminEdited,setAdminEdited]=useState<any[]>([]);
  const [active,setActive]=useState<"seller"|"admin">("admin"); const [editItem,setEditItem]=useState<any>(null);
  const [reviewItem,setReviewItem]=useState<any>(null);

  useEffect(()=>{
    if(localStorage.getItem("gausia_admin_ok")==="yes") setPassOk(true);
    try{
      const rec=JSON.parse(localStorage.getItem("gausia_seller_records")||"[]");
      const pend=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
      setSellerRecords(rec.length>0?rec:pend);
      setAdminEdited(JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]"));
    }catch{}
  },[]);

  const saveEdited=(up:any[])=>{ setAdminEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up)); };

  const moveSellerToAdmin=(item:any)=>{
    const code="CODE-"+String(1001+adminEdited.length).padStart(4,"0");
    const n={editId:Date.now(),code,sellerName:item.shopName||item.sellerName||item.shop||"A",sellerPhone:item.phone||"1111111",sellerAddress:item.address||"Gawsia",sellerDate:new Date().toLocaleString(),originalPrice:String(item.price||"1500"),discountPercent:"25",offerPrice:String(Math.round(parseInt(item.price||"1500")*0.85)),offerTitle:"Eid Dhamaka Offer, Buy 1 Get 1, Free Delivery",editedTitle:item.title||"Tree Pices",editedImages:item.images||[item.image],badge:"New",size:"L",quality:"Premium Cotton",quantity:"1",comment:"Ind"};
    saveEdited([n,...adminEdited]); setEditItem(n); setActive("admin");
  };

  if(!passOk) return(<div className="min-h-screen flex items-center justify-center p-4 bg-orange-50"><div className="bg-white rounded-[20px] p-6 w-full max-w-sm border"><div className="text-center font-black">GAUSIA ADMIN - 1234</div><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="1234" className="w-full mt-4 border rounded-full px-4 py-3"/><button type="button" onClick={()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setPassOk(true);} }} className="w-full mt-3 bg-black text-white py-3 rounded-full font-black">Login</button></div></div>);

  return(
    <div className="min-h-screen bg-[#fcf8f5]">
      <div className="bg-white border-b sticky top-0 z-10"><div className="max-w-6xl mx-auto px-4 py-3 flex justify-between"><div className="font-black text-sm">GAUSIA ADMIN PANEL - সব বাটন FIX</div><div className="flex gap-2"><button type="button" onClick={()=>setActive("seller")} className={`px-4 py-2 rounded-full text-xs font-bold border ${active==="seller"?"bg-orange-500 text-white":"bg-white"}`}>সেলার ({sellerRecords.length})</button><button type="button" onClick={()=>setActive("admin")} className={`px-4 py-2 rounded-full text-xs font-bold border ${active==="admin"?"bg-emerald-500 text-white":"bg-white"}`}>কোড ({adminEdited.length})</button></div></div></div>

      <div className="max-w-5xl mx-auto px-3 py-4">
        {editItem&&active==="admin"&&(
          <div className="bg-white rounded-[20px] p-5 border mb-5">
            <input value={editItem.code} onChange={e=>setEditItem({...editItem,code:e.target.value})} className="w-full border-2 border-black rounded-full px-4 py-3 font-black bg-yellow-50"/>
            <div className="grid grid-cols-3 gap-2 mt-3"><input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} className="border rounded-full px-3 py-2 text-sm"/><input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} className="border rounded-full px-3 py-2 text-sm"/><input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} className="border rounded-full px-3 py-2 text-sm bg-green-50 font-bold"/></div>
            <input value={editItem.offerTitle} onChange={e=>setEditItem({...editItem,offerTitle:e.target.value})} className="w-full mt-2 border rounded-full px-4 py-2 text-sm bg-yellow-50"/><input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} className="w-full mt-2 border rounded-full px-4 py-2 text-sm"/>
            <div className="grid grid-cols-2 gap-2 mt-2"><input value={editItem.size} onChange={e=>setEditItem({...editItem,size:e.target.value})} placeholder="সাইজ L" className="border-2 border-orange-200 rounded-full px-4 py-2 text-sm bg-orange-50"/><input value={editItem.quality} onChange={e=>setEditItem({...editItem,quality:e.target.value})} placeholder="কোয়ালিটি" className="border-2 border-purple-200 rounded-full px-4 py-2 text-sm bg-purple-50"/><input value={editItem.quantity} onChange={e=>setEditItem({...editItem,quantity:e.target.value})} placeholder="কোয়ান্টিটি" className="border-2 border-blue-300 rounded-full px-4 py-2 text-sm bg-blue-50 font-black"/><input value={editItem.comment} onChange={e=>setEditItem({...editItem,comment:e.target.value})} placeholder="মন্তব্য" className="border rounded-full px-4 py-2 text-sm"/></div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button type="button" onClick={()=>{ saveEdited(adminEdited.map((e:any)=>e.editId===editItem.editId?editItem:e)); alert("✅ Save হয়েছে"); setEditItem(null); }} className="bg-yellow-400 border-2 border-black rounded-full py-3 font-black">💾 Save</button>
              <button type="button" onClick={()=>setEditItem(null)} className="bg-white border-2 border-black rounded-full py-3 font-bold">Cancel</button>
            </div>
            <button type="button" onClick={()=>setReviewItem(editItem)} className="w-full mt-2 bg-black text-white rounded-full py-3 font-bold">👁️ প্রিভিউ দেখুন</button>
          </div>
        )}

        {active==="admin"&&<div className="grid md:grid-cols-2 gap-4">{adminEdited.map((p:any)=><div key={p.editId} className="bg-white rounded-[18px] p-3 border-2 border-black"><div className="text-xs font-bold">{p.code} - {p.editedTitle} - {p.offerPrice}৳ - {p.quantity} পিস - {p.badge}</div><img src={p.editedImages?.[0]} className="w-full h-44 object-cover mt-2 rounded-[14px] border-2 border-black"/><button type="button" onClick={()=>setReviewItem(p)} className="w-full mt-2 bg-black text-white border-2 border-black rounded-full py-2.5 text-xs font-bold">👁️ রিভিউ দেখুন</button></div>)}</div>}
        {active==="seller"&&<div className="grid md:grid-cols-2 gap-4">{sellerRecords.map((p:any)=><div key={p.id} className="bg-white rounded-[18px] p-3 border"><img src={p.images?.[0]} className="w-full h-44 object-cover rounded-[14px] border"/><button type="button" onClick={()=>moveSellerToAdmin(p)} className="w-full mt-2 bg-orange-500 text-white rounded-full py-2.5 text-xs font-black">✏️ Edit</button></div>)}</div>}
      </div>

      {/* REVIEW MODAL - 100% FIXED - সবুজ দাগের বাটন এখন কাজ করবে */}
      {reviewItem&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:"12px"}}>
          <div style={{background:"white",borderRadius:"20px",width:"100%",maxWidth:"380px",padding:"16px",border:"3px solid black"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><div className="font-black text-sm">👁️ রিভিউ - Customer এ যেমন দেখাবে</div><button type="button" onClick={()=>setReviewItem(null)} style={{background:"red",color:"white",width:"28px",height:"28px",borderRadius:"50%",fontWeight:"900"}}>X</button></div>
            <img src={reviewItem.editedImages?.[0]} style={{width:"100%",height:"260px",objectFit:"cover",marginTop:"12px",borderRadius:"14px",border:"2px solid black"}}/>
            <div className="mt-2 font-black">{reviewItem.code} - {reviewItem.editedTitle}</div>
            <div className="text-xs mt-1">📏 {reviewItem.size} | ✨ {reviewItem.quality} | 📦 {reviewItem.quantity} | 💬 {reviewItem.comment} | -{reviewItem.discountPercent}% = {reviewItem.offerPrice}৳</div>
            <div className="text-xs bg-yellow-100 border rounded-full px-3 py-1 w-fit mt-2">🎉 {reviewItem.offerTitle}</div>

            <div style={{marginTop:"14px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
              {/* Normal - 100% Direct */}
              <button
                type="button"
                style={{background:"black",color:"white",border:"2px solid black",borderRadius:"9999px",padding:"12px 4px",fontWeight:"900",fontSize:"12px",cursor:"pointer"}}
                onClick={()=>{
                  const all = JSON.parse(window.localStorage.getItem("gausia_all_products")||"[]");
                  const item = reviewItem;
                  const f = {id:Date.now(),code:item.code,title:item.editedTitle,price:parseInt(item.offerPrice)||0,originalPrice:parseInt(item.originalPrice)||0,image:item.editedImages?.[0],images:item.editedImages,offerTitle:item.offerTitle,discountPercent:parseInt(item.discountPercent)||0,badge:item.badge,size:item.size,quality:item.quality,quantity:item.quantity,comment:item.comment,type:"normal"};
                  window.localStorage.setItem("gausia_all_products",JSON.stringify([f,...all]));
                  window.alert("✅ Normal অংশে পাঠানো হয়েছে - "+f.code+" - এখন Customer পেজে দেখুন");
                  setReviewItem(null);
                  window.location.href = "/";
                }}
              >
                Confirm Normal - সব জমা
              </button>

              {/* Special - আপনি যেটা সবুজ দাগ দিয়েছেন - এখন 100% কাজ করবে */}
              <button
                type="button"
                style={{background:"linear-gradient(to right,#ec4899,#ef4444)",color:"white",border:"2px solid black",borderRadius:"9999px",padding:"12px 4px",fontWeight:"900",fontSize:"12px",cursor:"pointer"}}
                onClick={()=>{
                  const banners = JSON.parse(window.localStorage.getItem("gausia_special_banners")||"[]");
                  const all = JSON.parse(window.localStorage.getItem("gausia_all_products")||"[]");
                  const item = reviewItem;
                  const f = {id:Date.now(),code:item.code,title:item.editedTitle,price:parseInt(item.offerPrice)||0,originalPrice:parseInt(item.originalPrice)||0,image:item.editedImages?.[0],images:item.editedImages,offerTitle:item.offerTitle,discountPercent:parseInt(item.discountPercent)||0,badge:item.badge,size:item.size,quality:item.quality,quantity:item.quantity,comment:item.comment,type:"special"};
                  window.localStorage.setItem("gausia_special_banners",JSON.stringify([f,...banners].slice(0,12)));
                  window.localStorage.setItem("gausia_all_products",JSON.stringify([f,...all]));
                  window.alert("🔥 Special Display তে পাঠানো হয়েছে - "+f.code+" - ওপরে অফার হিসেবে যাবে");
                  setReviewItem(null);
                  window.location.href = "/";
                }}
              >
                🔥 Confirm Special Display
              </button>
            </div>

            <button
              type="button"
              style={{width:"100%",marginTop:"8px",background:"white",border:"2px solid black",borderRadius:"9999px",padding:"10px",fontWeight:"700",fontSize:"12px",cursor:"pointer"}}
              onClick={()=>setReviewItem(null)}
            >
              ❌ Cancel - আবার Edit করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
