"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [passOk,setPassOk]=useState(false); const [pass,setPass]=useState("");
  const [sellerRecords,setSellerRecords]=useState<any[]>([]); // সেলার অংশ সংরক্ষিত
  const [adminEdited,setAdminEdited]=useState<any[]>([]); // এডমিন অংশ সংরক্ষিত
  const [shops,setShops]=useState<string[]>([]);
  const [active,setActive]=useState<"seller"|"admin">("admin"); // এই পেজে ২টাই থাকবে
  const [editItem,setEditItem]=useState<any>(null);

  useEffect(()=>{
    if(typeof window==="undefined") return;
    if(localStorage.getItem("gausia_admin_ok")==="yes") setPassOk(true);
    const s=JSON.parse(localStorage.getItem("gausia_all_shops")||'["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10","SHOP-11","SHOP-12","SHOP-13"]');
    setShops(s);
    setSellerRecords(JSON.parse(localStorage.getItem("gausia_seller_records")||localStorage.getItem("gausia_seller_pending")||"[]"));
    setAdminEdited(JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]"));
  },[]);

  const saveEdited=(up:any[])=>{ setAdminEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up)); };
  const saveSeller=(up:any[])=>{ setSellerRecords(up); localStorage.setItem("gausia_seller_records",JSON.stringify(up)); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); };

  // সেলার থেকে এডমিনে আনা - রেকর্ড থেকে যাবে
  const moveSellerToAdmin=(item:any)=>{
    const n={editId:Date.now(),shop:item.shop,shopName:item.shopName,address:item.address,phone:item.phone,title:item.title,editedTitle:item.title,editedPrice:String(item.price),originalPrice:String(item.price),discountPercent:"25",offerPrice:String(Math.round(parseInt(item.price)*(0.85))),offerTitle:"Eid Dhamaka Offer, Buy 1 Get 1, Free Delivery",editedComment:item.comment||"Ind",editedImages:item.images||[item.image],editedShop:item.shop,badge:"New",size:"L",color:"Lal",deliveryCharge:"60",stock:"In Stock",quantity:item.quantity||"1",extraDesc:"100% Cotton, Washable, 7 Days Return, Best Quality, Gausia Market etc.",freeDelivery:false};
    const up=[n,...adminEdited]; saveEdited(up); setEditItem(n); setActive("admin"); window.scrollTo(0,0);
  };

  const handleSave=()=>{
    if(!editItem) return;
    const up=adminEdited.map((e:any)=> e.editId===editItem.editId ? editItem : e);
    saveEdited(up); alert("✅ Save Edit হয়েছে!"); setEditItem(null);
  };
  const handleCancel=()=>{ setEditItem(null); };

  const handleDeleteSeller=(id:number)=>{ if(!confirm("সেলার রেকর্ড ডিলিট?")) return; saveSeller(sellerRecords.filter((e:any)=>e.id!==id)); };
  const handleDeleteAdmin=(editId:number)=>{ if(!confirm("এডমিন এডিট ডিলিট?")) return; saveEdited(adminEdited.filter((e:any)=>e.editId!==editId)); };

  const sendNormal=(item:any)=>{
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const f={id:Date.now(),shop:item.editedShop||item.shop,title:item.editedTitle||item.title,price:parseInt(item.offerPrice||item.editedPrice||item.price),originalPrice:parseInt(item.originalPrice||item.price),image:item.editedImages?.[0]||item.image,images:item.editedImages||[item.image],offerTitle:item.offerTitle,discountPercent:item.discountPercent?parseInt(item.discountPercent):0,badge:item.badge,quantity:item.quantity,type:"normal",category:item.editedShop||item.shop};
    localStorage.setItem("gausia_all_products",JSON.stringify([f,...all]));
    alert("✅ Normal - "+f.shop+" - ক্যাটাগরি অনুযায়ী দোকানে গেলো - "+f.category);
  };
  const sendSpecial=(item:any)=>{
    const banners=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
    const f={id:Date.now(),shop:item.editedShop||item.shop,title:item.editedTitle||item.title,price:parseInt(item.offerPrice||item.price),originalPrice:parseInt(item.originalPrice||item.price),image:item.editedImages?.[0]||item.image,images:item.editedImages||[item.image],offerTitle:item.offerTitle||"Special Offer",discountPercent:item.discountPercent?parseInt(item.discountPercent):0,badge:item.badge,quantity:item.quantity,type:"special"};
    localStorage.setItem("gausia_special_banners",JSON.stringify([f,...banners].slice(0,10)));
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    localStorage.setItem("gausia_all_products",JSON.stringify([f,...all]));
    alert("🔥 Special - Customer পেজের Display তে গেলো - বিভিন্ন অফার/নতুন ডিসপ্লে - মার্কেটিং");
  };

  if(!passOk) return(<div className="min-h-screen bg-black flex items-center justify-center p-4"><div className="bg-white rounded-[20px] p-6 w-full max-w-sm border-2 border-black"><div className="font-black">🔒 ADMIN - 1234</div><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password 1234" className="w-full mt-4 border-2 border-black rounded-full px-4 py-3"/><button type="button" onClick={()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setPassOk(true);} else alert("1234"); }} className="w-full mt-3 bg-black text-white py-3 rounded-full font-black">Login</button></div></div>);

  return(
    <div className="min-h-screen bg-[#f9f9f9] p-2 md:p-4">
      <div className="max-w-6xl mx-auto">
        {/* টপ ট্যাব - সেলার অংশ + এডমিন অংশ একই পেজে সংরক্ষিত */}
        <div className="flex gap-2 justify-center mb-3">
          <button type="button" onClick={()=>setActive("seller")} className={`px-5 py-2 rounded-full text-xs font-black border-2 border-black ${active==="seller"?"bg-yellow-400":"bg-white"}`}>📦 সেলার অংশ ({sellerRecords.length}) - সংরক্ষিত</button>
          <button type="button" onClick={()=>setActive("admin")} className={`px-5 py-2 rounded-full text-xs font-black border-2 border-black ${active==="admin"?"bg-emerald-400":"bg-white"}`}>✏️ এডমিন অংশ ({adminEdited.length}) - সংরক্ষিত</button>
        </div>

        {/* এডিট ফর্ম - আপনার ছবির হুবহু ডিজাইন */}
        {editItem&&active==="admin"&&(
          <div className="bg-white border-2 border-black rounded-[16px] p-3 shadow-[3px_3px_0px_black] mb-4">
            <div className="font-black text-xs">✏️ এডিট - দোকানের অধীনে + মার্কেটিং</div>
            <div className="mt-2">
              <select value={editItem.editedShop} onChange={e=>setEditItem({...editItem,editedShop:e.target.value})} className="w-full border border-gray-300 rounded-full px-4 py-2.5 text-sm bg-[#fffbe6]">
                <option>🏪 h দোকানের অধীনে থাকবে</option>
                {shops.map((s:string)=><option key={s} value={s}>🏪 {s} অধীনে থাকবে</option>)}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} type="number" placeholder="1500" className="border border-gray-300 rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} type="number" placeholder="% 25" className="border border-gray-300 rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} type="number" placeholder="1500" className="border border-gray-300 rounded-full px-3 py-2 text-sm bg-green-50 font-bold"/>
            </div>
            <input value={editItem.offerTitle} onChange={e=>setEditItem({...editItem,offerTitle:e.target.value})} placeholder="বক্ত অফার / Eid Dhamaka / New Arrival - মার্কেটিং আকর্ষণ" className="w-full mt-2 border border-gray-300 rounded-full px-4 py-2 text-sm bg-[#fffbe6]"/>
            <input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} placeholder="Tree Pices" className="w-full mt-2 border border-gray-300 rounded-full px-4 py-2 text-sm"/>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <input value={editItem.quantity} onChange={e=>setEditItem({...editItem,quantity:e.target.value})} type="number" placeholder="পরিমাণ 1" className="border-2 border-blue-300 rounded-full px-3 py-2 text-sm bg-blue-50 font-black"/>
              <input value={editItem.badge} onChange={e=>setEditItem({...editItem,badge:e.target.value})} placeholder="New" className="border border-gray-300 rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.size} onChange={e=>setEditItem({...editItem,size:e.target.value})} placeholder="L" className="border border-gray-300 rounded-full px-3 py-2 text-sm"/>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button type="button" onClick={handleSave} className="bg-[#facc15] border-2 border-black rounded-full py-2.5 text-sm font-black shadow-[0_2px_0px_black]">💾 Save</button>
              <button type="button" onClick={handleCancel} className="bg-white border-2 border-black rounded-full py-2.5 text-sm font-bold shadow-[0_2px_0px_black]">Cancel</button>
            </div>
          </div>
        )}

        {/* সেলার অংশ - সংরক্ষিত - এডমিন চাইলে এডিট/ডিলিট করতে পারে */}
        {active==="seller"&&(
          <div>
            <div className="bg-purple-100 border-2 border-black rounded-[12px] p-2 text-xs font-bold text-center">📦 সেলার যে পণ্য পাঠাবে তা এখানে সংরক্ষিত থাকবে - এডমিন Edit/Delete করতে পারে</div>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {sellerRecords.map((p:any)=><div key={p.id} className="bg-white border-2 border-black rounded-[16px] p-2 shadow-[2px_2px_0px_black]">
                <div className="flex justify-between items-center"><span className="text-xs font-bold">🏪 {p.shop} - {p.title} - {p.price}৳ - {p.quantity||1} পিস</span><button type="button" onClick={()=>handleDeleteSeller(p.id)} className="bg-red-500 text-white w-6 h-6 rounded-full text-xs font-black">X</button></div>
                <img src={p.images?.[0]||p.image} alt="" className="w-full h-40 object-cover mt-2 rounded-[12px] border-2 border-black"/>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button type="button" onClick={()=>moveSellerToAdmin(p)} className="bg-yellow-400 border-2 border-black rounded-full py-2 text-xs font-black">✏️ Edit করে Admin অংশে নিন</button>
                  <button type="button" onClick={()=>handleDeleteSeller(p.id)} className="bg-white border-2 border-black rounded-full py-2 text-xs font-bold">🗑️ Delete</button>
                </div>
              </div>)}
              {sellerRecords.length===0&&<div className="col-span-2 text-center py-12 bg-white border-2 border-dashed rounded-[16px]">📭 সেলার কোনো পণ্য পাঠায়নি</div>}
            </div>
          </div>
        )}

        {/* এডমিন অংশ - সংরক্ষিত - আপনার ছবির মতো 2 কলাম কার্ড + 3 বাটন */}
        {active==="admin"&&(
          <div>
            <div className="bg-emerald-100 border-2 border-black rounded-[12px] p-2 text-xs font-bold text-center">✏️ এডমিন অংশ সংরক্ষিত - এখান থেকে 2 দিকে পাঠানো যাবে: 1) Display (অফার/নতুন) 2) Category অনুযায়ী দোকানে</div>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {adminEdited.map((p:any)=><div key={p.editId} className="bg-white border-2 border-black rounded-[16px] p-2 shadow-[2px_2px_0px_black]">
                <div className="flex justify-between"><span className="text-xs font-bold">🏪 {p.editedShop||p.shop} - {p.editedTitle||p.title} - {p.offerPrice||p.price}৳ - {p.quantity} পিস - {p.badge}</span><button type="button" onClick={()=>handleDeleteAdmin(p.editId)} className="bg-red-500 text-white w-5 h-5 rounded-full text-[10px] font-black">X</button></div>
                <img src={p.editedImages?.[0]||p.image} alt="" className="w-full h-44 object-cover mt-2 rounded-[12px] border-2 border-black"/>
                <div className="grid grid-cols-3 gap-1.5 mt-2">
                  <button type="button" onClick={()=>{ setEditItem(p); window.scrollTo({top:0,behavior:"smooth"}); }} className="bg-[#facc15] border-2 border-black rounded-full py-2 text-xs font-black">✏️ Edit</button>
                  <button type="button" onClick={()=>sendNormal(p)} className="bg-black text-white border-2 border-black rounded-full py-2 text-[11px] font-black">📦 Normal {p.editedShop} লিস্টে</button>
                  <button type="button" onClick={()=>sendSpecial(p)} className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-black rounded-full py-2 text-[11px] font-black">🔥 Special টপে</button>
                </div>
              </div>)}
              {adminEdited.length===0&&<div className="col-span-2 text-center py-12 bg-white border-2 border-dashed rounded-[16px]">📭 এডমিন এডিট নেই - সেলার অংশ থেকে Edit করে আনুন</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
