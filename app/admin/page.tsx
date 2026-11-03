"use client";
import { useState, useEffect } from "react";
export default function Admin(){
  const [ok,setOk]=useState(false); const [pass,setPass]=useState("");
  const [sellerRecords,setSellerRecords]=useState<any[]>([]); const [adminEdited,setAdminEdited]=useState<any[]>([]);
  const [editItem,setEditItem]=useState<any>(null); const [reviewItem,setReviewItem]=useState<any>(null); const [active,setActive]=useState<"seller"|"admin">("seller");

  useEffect(()=>{
    if(localStorage.getItem("gausia_admin_ok")==="yes") setOk(true);
    const pend=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    const rec=JSON.parse(localStorage.getItem("gausia_seller_records")||"[]");
    const list = pend.length>0?pend:rec;
    setSellerRecords(list);
    setAdminEdited(JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]"));
  },[]);

  const saveEdited=(up:any)=>{ setAdminEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up)); };

  const moveToEdit=(item:any)=>{
    const code="CODE-"+String(1001+adminEdited.length).padStart(4,"0");
    const n={editId:Date.now(),code,sellerName:item.shopName||item.shop||"SHOP-01",sellerPhone:item.phone||"",sellerAddress:item.address||"",sellerDate:item.createdAt||"",originalPrice:String(item.price||"1500"),discountPercent:"25",offerPrice:String(Math.round(parseInt(item.price||"1500")*0.75)),offerTitle:"Eid Dhamaka Offer, Buy 1 Get 1",editedTitle:item.title||"Lal sari",editedImages:item.images||[item.image],badge:"New",size:"L",quality:"Premium Cotton",quantity:"1",comment:item.origin||"Ind",stock:"In Stock"};
    const up=[n,...adminEdited]; saveEdited(up); setEditItem(n); setActive("admin"); window.scrollTo(0,0);
  };

  if(!ok) return(<div className="min-h-screen flex items-center justify-center bg-orange-50 p-4"><div className="bg-white rounded-[20px] p-6 w-full max-w-sm border"><div className="font-black text-center">GAUSIA ADMIN - 1234</div><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="1234" className="w-full mt-4 border rounded-full px-4 py-3"/><button onClick={()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setOk(true);} }} className="w-full mt-3 bg-black text-white py-3 rounded-full font-black">Login</button></div></div>);

  return(
    <div className="min-h-screen bg-[#fcf8f5]">
      <div className="bg-white border-b sticky top-0 z-10 px-4 py-3 flex justify-between"><div className="font-black text-sm">ADMIN - Seller ({sellerRecords.length}) → Customer</div><div className="flex gap-2"><button onClick={()=>setActive("seller")} className={`px-4 py-2 rounded-full text-xs border ${active==="seller"?"bg-orange-500 text-white":"bg-white"}`}>সেলার</button><button onClick={()=>setActive("admin")} className={`px-4 py-2 rounded-full text-xs border ${active==="admin"?"bg-black text-white":"bg-white"}`}>কোড ({adminEdited.length})</button></div></div>
      <div className="max-w-6xl mx-auto p-3">
        {editItem && <div className="bg-white rounded-[16px] p-4 border-2 border-black mb-4"><div className="bg-orange-50 border rounded-[8px] p-2 text-[11px]">👤 {editItem.sellerName} | 📞 {editItem.sellerPhone} | 📍 {editItem.sellerAddress}</div><input value={editItem.code} onChange={e=>setEditItem({...editItem,code:e.target.value})} className="w-full mt-2 border-2 border-black rounded-full px-4 py-2 font-black bg-yellow-50"/><div className="grid grid-cols-3 gap-2 mt-2"><input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} className="border rounded-full px-3 py-2 text-sm"/><input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} className="border rounded-full px-3 py-2 text-sm bg-orange-50"/><input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} className="border rounded-full px-3 py-2 text-sm bg-green-50 font-bold"/></div><input value={editItem.offerTitle} onChange={e=>setEditItem({...editItem,offerTitle:e.target.value})} className="w-full mt-2 border rounded-full px-4 py-2 text-sm bg-yellow-50"/><input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} className="w-full mt-2 border rounded-full px-4 py-2 text-sm"/><div className="grid grid-cols-2 gap-2 mt-2"><input value={editItem.size} onChange={e=>setEditItem({...editItem,size:e.target.value})} placeholder="সাইজ L" className="border rounded-full px-3 py-2 text-sm"/><input value={editItem.quality} onChange={e=>setEditItem({...editItem,quality:e.target.value})} placeholder="কোয়ালিটি" className="border rounded-full px-3 py-2 text-sm"/><input value={editItem.quantity} onChange={e=>setEditItem({...editItem,quantity:e.target.value})} placeholder="কোয়ান্টিটি" className="border rounded-full px-3 py-2 text-sm"/><input value={editItem.comment} onChange={e=>setEditItem({...editItem,comment:e.target.value})} placeholder="মন্তব্য Ind" className="border rounded-full px-3 py-2 text-sm"/></div><div className="grid grid-cols-2 gap-2 mt-3"><button onClick={()=>{ saveEdited(adminEdited.map((x:any)=>x.editId===editItem.editId?editItem:x)); setEditItem(null); alert("✅ Save - "+editItem.code); }} className="bg-yellow-400 border-2 border-black rounded-full py-2.5 font-black">💾 Save</button><button onClick={()=>setEditItem(null)} className="bg-white border-2 border-black rounded-full py-2.5">Cancel</button></div><button onClick={()=>setReviewItem(editItem)} className="w-full mt-2 bg-black text-white rounded-full py-2.5 text-sm">👁️ প্রিভিউ + Send</button></div>}

        {active==="seller" && <div className="grid md:grid-cols-2 gap-3">{sellerRecords.map((p:any)=><div key={p.id} className="bg-white rounded-[16px] p-3 border"><img src={p.image} className="w-full h-48 object-cover rounded-[12px] border"/><div className="text-xs mt-2 font-bold">{p.shop} - {p.title} - {p.price}৳</div><button onClick={()=>moveToEdit(p)} className="w-full mt-2 bg-orange-500 text-white rounded-full py-2 text-xs font-black">✏️ Edit</button></div>)}{sellerRecords.length===0 && <div className="col-span-2 text-center py-20 text-sm">Seller থেকে পাঠালে এখানে আসবে - আপনার ১ নং ছবির পেজ থেকে</div>}</div>}

        {active==="admin" && <div className="grid md:grid-cols-2 gap-3">{adminEdited.map((p:any)=><div key={p.editId} className="bg-white rounded-[16px] p-3 border-2 border-black"><div className="text-xs font-bold">{p.code} - {p.editedTitle} - {p.offerPrice}৳</div><img src={p.editedImages?.[0]} className="w-full h-44 object-cover mt-2 rounded-[12px] border-2 border-black"/><button onClick={()=>setReviewItem(p)} className="w-full mt-2 bg-black text-white rounded-full py-2 text-xs">👁️ রিভিউ + Send</button></div>)}</div>}

        {reviewItem && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:12}}>
            <div className="bg-white rounded-[20px] w-full max-w-[380px] p-4 border-2 border-black">
              <div className="flex justify-between font-black text-sm"><span>👁️ প্রিভিউ - এখন 100% যাবে</span><button onClick={()=>setReviewItem(null)} className="bg-red-500 text-white w-7 h-7 rounded-full">X</button></div>
              <img src={reviewItem.editedImages?.[0]} className="w-full h-60 object-cover mt-2 rounded-[12px] border-2 border-black"/>
              <div className="mt-2 font-bold text-sm">{reviewItem.code} - {reviewItem.editedTitle} - {reviewItem.offerPrice}৳</div>
              <div className="text-xs">📏 {reviewItem.size} | ✨ {reviewItem.quality} | 📦 {reviewItem.quantity} | 💬 {reviewItem.comment}</div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button onClick={()=>{
                  const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
                  const f={id:Date.now(),code:reviewItem.code,title:reviewItem.editedTitle,price:parseInt(reviewItem.offerPrice)||0,originalPrice:parseInt(reviewItem.originalPrice)||0,image:reviewItem.editedImages?.[0],images:reviewItem.editedImages,offerTitle:reviewItem.offerTitle,discountPercent:parseInt(reviewItem.discountPercent)||0,badge:reviewItem.badge,size:reviewItem.size,quality:reviewItem.quality,quantity:reviewItem.quantity,comment:reviewItem.comment,type:"normal"};
                  localStorage.setItem("gausia_all_products",JSON.stringify([f,...all]));
                  localStorage.setItem("gausia_last_action",JSON.stringify({type:"normal",time:Date.now(),code:f.code}));
                  alert("✅ Normal এ গেছে - "+f.code+" - এখন Customer পেজ খুলুন");
                  setReviewItem(null);
                }} className="bg-black text-white border-2 border-black rounded-full py-3 text-xs font-black">Confirm Normal</button>
                <button onClick={()=>{
                  const banners=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
                  const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
                  const f={id:Date.now(),code:reviewItem.code,title:reviewItem.editedTitle,price:parseInt(reviewItem.offerPrice)||0,originalPrice:parseInt(reviewItem.originalPrice)||0,image:reviewItem.editedImages?.[0],images:reviewItem.editedImages,offerTitle:reviewItem.offerTitle,discountPercent:parseInt(reviewItem.discountPercent)||0,badge:reviewItem.badge,size:reviewItem.size,quality:reviewItem.quality,quantity:reviewItem.quantity,comment:reviewItem.comment,type:"special"};
                  localStorage.setItem("gausia_special_banners",JSON.stringify([f,...banners].slice(0,12)));
                  localStorage.setItem("gausia_all_products",JSON.stringify([f,...all]));
                  localStorage.setItem("gausia_last_action",JSON.stringify({type:"special",time:Date.now(),code:f.code}));
                  alert("🔥 Special Display তে গেছে - "+f.code+" - Customer পেজে ওপরে দেখাবে");
                  setReviewItem(null);
                }} className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-black rounded-full py-3 text-xs font-black">🔥 Confirm Special</button>
              </div>
              <button onClick={()=>setReviewItem(null)} className="w-full mt-2 bg-white border-2 border-black rounded-full py-2 text-xs">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
