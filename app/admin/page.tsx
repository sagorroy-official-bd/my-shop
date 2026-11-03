"use client";
import { useState, useEffect } from "react";
export default function AdminPanel(){
  const [passOk,setPassOk]=useState(false);
  const [pass,setPass]=useState("");
  const [pending,setPending]=useState<any[]>([]);
  const [edited,setEdited]=useState<any[]>([]);
  const [shops,setShops]=useState<string[]>([]);
  const [newShop,setNewShop]=useState("");
  const [activeTab,setActiveTab]=useState<"shops"|"inbox"|"edit">("shops");
  const [editItem,setEditItem]=useState<any>(null);
  const [editIndex,setEditIndex]=useState<number|null>(null);

  useEffect(()=>{
    if(localStorage.getItem("gausia_admin_ok")==="yes") setPassOk(true);
    const s=JSON.parse(localStorage.getItem("gausia_all_shops")||'["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05"]');
    setShops(s);
    setPending(JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]"));
    setEdited(JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]"));
  },[]);

  const saveShops=(up:string[])=>{ setShops(up); localStorage.setItem("gausia_all_shops",JSON.stringify(up)); };
  const addShop=()=>{ if(!newShop.trim()) return; if(shops.includes(newShop.trim())){ alert("এই নামে দোকান আছে"); return; } const up=[...shops,newShop.trim()]; saveShops(up); setNewShop(""); };
  const deleteShop=(name:string)=>{ if(!confirm(name+" দোকান ডিলিট? এই দোকানের পণ্য Customer এ থাকবে কিন্তু নতুন Seller ওই নামে পাঠাতে পারবে না")) return; saveShops(shops.filter(s=>s!==name)); };
  const renameShop=(oldName:string)=>{ const n=prompt("নতুন নাম লিখুন",oldName); if(!n||!n.trim()) return; const up=shops.map(s=>s===oldName?n.trim():s); saveShops(up); };

  const login=()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setPassOk(true); } else alert("Password 1234"); };
  const moveToEdit=(item:any)=>{
    const newEdited={...item,editId:Date.now(),editedTitle:item.title,editedPrice:item.price,editedComment:item.comment,editedImages:item.images||[item.image],editedShop:item.shop,offerTitle:"",discountPercent:"",originalPrice:item.price,offerPrice:item.price,deliveryCharge:"60",freeDelivery:false,stock:"In Stock",badge:"New",extraDesc:""};
    const up=[newEdited,...edited]; setEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up)); setActiveTab("edit"); setEditItem(newEdited); setEditIndex(0);
  };
  const saveEdit=()=>{ if(editIndex===null) return; const up=[...edited]; up[editIndex]=editItem; setEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up)); setEditItem(null); setEditIndex(null); };
  const sendNormal=(idx:number)=>{
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const it=edited[idx];
    const final={id:Date.now(),shop:it.editedShop,shopName:it.shopName,title:it.editedTitle,price:parseInt(it.offerPrice||it.editedPrice),originalPrice:parseInt(it.originalPrice),image:it.editedImages[0],images:it.editedImages,offerTitle:it.offerTitle,discountPercent:it.discountPercent?parseInt(it.discountPercent):0,badge:it.badge,extraDesc:it.extraDesc,freeDelivery:it.freeDelivery,deliveryCharge:it.deliveryCharge,type:"normal"};
    localStorage.setItem("gausia_all_products",JSON.stringify([final,...all]));
    alert(`✅ Normal - ${final.shop} দোকানের অধীনে লিস্টে গেছে`);
  };
  const sendSpecial=(idx:number)=>{
    const banners=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
    const it=edited[idx];
    const final={id:Date.now(),shop:it.editedShop,shopName:it.shopName,title:it.editedTitle,price:parseInt(it.offerPrice||it.editedPrice),originalPrice:parseInt(it.originalPrice),image:it.editedImages[0],images:it.editedImages,offerTitle:it.offerTitle||"Special Offer",discountPercent:it.discountPercent?parseInt(it.discountPercent):0,badge:it.badge||"Hot",extraDesc:it.extraDesc,type:"special"};
    localStorage.setItem("gausia_special_banners",JSON.stringify([final,...banners].slice(0,10)));
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    localStorage.setItem("gausia_all_products",JSON.stringify([final,...all]));
    alert(`🔥 SPECIAL - টপ Banner মার্কেটিং এ গেছে + ${final.shop} দোকানের অধীনেও থাকবে - সবাই আকর্ষণ হবে`);
  };

  if(!passOk){ return(<div className="min-h-screen bg-black flex items-center justify-center p-4"><div className="bg-white rounded-[20px] p-6 w-full max-w-sm border-2 border-black shadow-[6px_6px_0px_white]"><div className="font-black">🔒 ADMIN - GAUSIA</div><div className="text-xs">দোকানের নাম নিয়ন্ত্রণ + 2 Way Send</div><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password 1234" className="w-full mt-4 border-2 border-black rounded-full px-4 py-3"/><button onClick={login} className="w-full mt-3 bg-black text-white py-3 rounded-full font-black">Login</button></div></div>); }

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 p-3">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-2 border-black rounded-[20px] shadow-[5px_5px_0px_black] p-4 flex justify-between flex-wrap gap-2">
          <div><div className="font-black">ADMIN - দোকান নিয়ন্ত্রণ + 2 WAY SEND</div><div className="text-[11px]">দোকানের নাম Admin থেকে কন্ট্রোল | পণ্য ওই দোকানের অধীনেই থাকবে | Special শুধু মার্কেটিং আকর্ষণ</div></div>
          <div className="flex gap-1.5">
            <button onClick={()=>setActiveTab("shops")} className={`px-3 py-2 rounded-full text-xs font-black border-2 border-black ${activeTab==="shops"?"bg-blue-400":"bg-white"}`}>🏪 দোকান নিয়ন্ত্রণ ({shops.length})</button>
            <button onClick={()=>setActiveTab("inbox")} className={`px-3 py-2 rounded-full text-xs font-black border-2 border-black ${activeTab==="inbox"?"bg-yellow-400":"bg-white"}`}>📥 Inbox ({pending.length})</button>
            <button onClick={()=>setActiveTab("edit")} className={`px-3 py-2 rounded-full text-xs font-black border-2 border-black ${activeTab==="edit"?"bg-emerald-400":"bg-white"}`}>✏️ Edit ({edited.length})</button>
          </div>
        </div>

        {activeTab==="shops" && (
          <div className="mt-4 bg-white border-2 border-black rounded-[18px] p-4 shadow-[4px_4px_0px_black]">
            <div className="font-black">🏪 দোকানের নাম Admin থেকে নিয়ন্ত্রণ - যে নামে পাঠাবেন ওই দোকানের অধীনেই পণ্য থাকবে</div>
            <div className="flex gap-2 mt-3"><input value={newShop} onChange={e=>setNewShop(e.target.value)} placeholder="নতুন দোকানের নাম লিখুন: যেমন গাউছিয়া ফ্যাশন, রাফি বোরকা হাউস" className="flex-1 border-2 border-black rounded-full px-4 py-2.5 text-sm"/><button onClick={addShop} className="bg-black text-white px-6 rounded-full font-black border-2 border-black">+ Add</button></div>
            <div className="grid md:grid-cols-3 gap-2 mt-4">
              {shops.map(s=><div key={s} className="border-2 border-black rounded-full px-4 py-2 flex justify-between items-center bg-yellow-50"><span className="font-black text-xs">{s}</span><div className="flex gap-1"><button onClick={()=>renameShop(s)} className="bg-white border-2 border-black rounded-full px-2 py-0.5 text-[10px] font-black">Edit</button><button onClick={()=>deleteShop(s)} className="bg-red-500 text-white border-2 border-black rounded-full px-2 py-0.5 text-[10px] font-black">X</button></div></div>)}
            </div>
            <div className="mt-4 text-[11px] bg-blue-50 border-2 border-blue-200 rounded-[12px] p-2">💡 Seller পেজে এখন এই {shops.length} টা দোকানই দেখাবে। আপনি এখানে নাম চেঞ্জ করলে Seller ও Customer দুই জায়গায় Auto চেঞ্জ হবে। Special Banner শুধু মার্কেটিং আকর্ষণের জন্য, কিন্তু পণ্য ওই দোকানের অধীনেই থাকবে।</div>
          </div>
        )}

        {activeTab==="inbox" && <div className="grid md:grid-cols-2 gap-3 mt-4">{pending.map((p:any,i:number)=><div key={i} className="bg-white border-2 border-black rounded-[16px] p-3"><div className="font-black text-xs">{p.shop} - {p.title} - {p.price}৳</div><img src={p.images?.[0]||p.image} alt="" className="w-full h-32 object-cover mt-2 rounded-xl border-2 border-black"/><button onClick={()=>moveToEdit(p)} className="w-full mt-2 bg-black text-white rounded-full py-2 text-xs font-black">✏️ Offer এড করতে নিন</button></div>)}{pending.length===0&&<div className="col-span-2 text-center py-10 bg-white border-2 border-dashed rounded-[16px]">📭 কোনো পণ্য নেই</div>}</div>}

        {activeTab==="edit" && <div className="mt-4">
          {editItem && editIndex!==null && <div className="bg-white border-2 border-black rounded-[18px] p-4 shadow-[4px_4px_0px_black]">
            <div className="font-black text-sm">✏️ এডিট - দোকানের অধীনে + মার্কেটিং</div>
            <select value={editItem.editedShop} onChange={e=>setEditItem({...editItem,editedShop:e.target.value})} className="w-full mt-2 border-2 border-black rounded-full px-4 py-2.5 text-sm font-black bg-yellow-50">
              {shops.map(s=><option key={s} value={s}>🏪 {s} দোকানের অধীনে থাকবে</option>)}
            </select>
            <div className="grid grid-cols-3 gap-2 mt-2"><input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} placeholder="আগের দাম" className="border-2 border-black rounded-full px-3 py-2 text-sm"/><input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} onBlur={()=>{const o=parseInt(editItem.originalPrice||0); const d=parseInt(editItem.discountPercent||0); if(o&&d) setEditItem((p:any)=>({...p,offerPrice:String(Math.round(o-(o*d/100)))}));}} placeholder="% 25" className="border-2 border-black rounded-full px-3 py-2 text-sm bg-red-50"/><input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} placeholder="অফার দাম" className="border-2 border-black rounded-full px-3 py-2 text-sm bg-green-50 font-black"/></div>
            <input value={editItem.offerTitle} onChange={e=>setEditItem({...editItem,offerTitle:e.target.value})} placeholder="🎉 রক্ত অফার / Eid Dhamaka / New Arrival - মার্কেটিং আকর্ষণ" className="w-full mt-2 border-2 border-black rounded-full px-4 py-2 text-sm bg-yellow-100 font-bold"/>
            <input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} className="w-full mt-2 border-2 border-black rounded-full px-4 py-2 text-sm"/>
            <div className="flex gap-2 mt-3"><button onClick={saveEdit} className="flex-1 bg-yellow-400 border-2 border-black rounded-full py-2 font-black">💾 Save</button><button onClick={()=>{setEditItem(null); setEditIndex(null);}} className="flex-1 bg-white border-2 border-black rounded-full py-2">Cancel</button></div>
          </div>}
          <div className="grid md:grid-cols-2 gap-3 mt-4">{edited.map((p:any,i:number)=><div key={p.editId} className="bg-white border-2 border-black rounded-[16px] p-3 shadow-[3px_3px_0px_black]"><div className="font-black text-xs">🏪 {p.editedShop} - {p.editedTitle} - {p.offerPrice}৳ {p.discountPercent?`-${p.discountPercent}%`:""} {p.offerTitle&&`[${p.offerTitle}]`}</div><img src={p.editedImages?.[0]} alt="" className="w-full h-32 object-cover mt-2 rounded-xl border-2 border-black"/><div className="flex gap-1.5 mt-2"><button onClick={()=>{setEditItem(p); setEditIndex(i);}} className="flex-1 bg-yellow-300 border-2 border-black rounded-full py-2 text-[11px] font-black">✏️ Edit</button><button onClick={()=>{ const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]"); const it=edited[i]; const final={id:Date.now(),shop:it.editedShop,shopName:it.shopName,title:it.editedTitle,price:parseInt(it.offerPrice||it.editedPrice),originalPrice:parseInt(it.originalPrice),image:it.editedImages[0],images:it.editedImages,offerTitle:it.offerTitle,discountPercent:it.discountPercent?parseInt(it.discountPercent):0,badge:it.badge,type:"normal"}; localStorage.setItem("gausia_all_products",JSON.stringify([final,...all])); alert(`✅ Normal - ${final.shop} অধীনে লিস্টে`); }} className="flex-1 bg-black text-white border-2 border-black rounded-full py-2 text-[11px] font-black">📦 Normal {p.editedShop} লিস্টে</button><button onClick={()=>{ const banners=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]"); const it=edited[i]; const final={id:Date.now(),shop:it.editedShop,title:it.editedTitle,price:parseInt(it.offerPrice||it.editedPrice),originalPrice:parseInt(it.originalPrice),image:it.editedImages[0],images:it.editedImages,offerTitle:it.offerTitle||"Special",discountPercent:it.discountPercent?parseInt(it.discountPercent):0,badge:it.badge||"Hot",type:"special"}; localStorage.setItem("gausia_special_banners",JSON.stringify([final,...banners].slice(0,10))); const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]"); localStorage.setItem("gausia_all_products",JSON.stringify([final,...all])); alert(`🔥 Special টপে + ${final.shop} অধীনে - মার্কেটিং আকর্ষণ`); }} className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-black rounded-full py-2 text-[11px] font-black">🔥 Special টপে</button></div></div>)}</div>
        </div>}
      </div>
    </div>
  );
}
