"use client";
import { useState, useEffect } from "react";

export default function AdminPanel(){
  const [passOk,setPassOk]=useState(false);
  const [pass,setPass]=useState("");
  const [pending,setPending]=useState<any[]>([]);
  const [edited,setEdited]=useState<any[]>([]);
  const [activeTab,setActiveTab]=useState<"inbox"|"edit">("inbox");
  const [editItem,setEditItem]=useState<any>(null);
  const [editIndex,setEditIndex]=useState<number|null>(null);

  useEffect(()=>{
    if(typeof window==="undefined") return;
    if(localStorage.getItem("gausia_admin_ok")==="yes") setPassOk(true);
    setPending(JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]"));
    setEdited(JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]"));
  },[]);

  const login=()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setPassOk(true); } else alert("Password: 1234"); };

  const moveToEdit=(item:any)=>{
    const newEdited={
      ...item, editId:Date.now(),
      editedTitle:item.title, editedPrice:item.price, editedComment:item.comment, editedImages:item.images||[item.image],
      offerTitle:"", discountPercent:"", originalPrice:item.price, offerPrice:item.price, deliveryCharge:"60", freeDelivery:false,
      stock:"In Stock", badge:"New", extraDesc:"", size:"", color:""
    };
    const up=[newEdited,...edited];
    setEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up));
    setActiveTab("edit"); setEditItem(newEdited); setEditIndex(0);
  };

  const calcOffer=()=>{
    if(!editItem) return;
    const orig=parseInt(editItem.originalPrice||0);
    const disc=parseInt(editItem.discountPercent||0);
    if(orig && disc){ const newPrice=Math.round(orig-(orig*disc/100)); setEditItem({...editItem,offerPrice:String(newPrice)}); }
  };

  const saveEdit=()=>{
    if(editIndex===null) return;
    const up=[...edited]; up[editIndex]=editItem;
    setEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up));
    setEditItem(null); setEditIndex(null);
  };

  const sendToCustomer=(idx:number)=>{
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const it=edited[idx];
    const finalPrice=it.discountPercent? parseInt(it.offerPrice): parseInt(it.editedPrice||it.price);
    const forCustomer={
      id:Date.now(), shop:it.shop, shopName:it.shopName, address:it.address, phone:it.phone,
      title:it.editedTitle||it.title, price:finalPrice, originalPrice:parseInt(it.originalPrice)||finalPrice,
      comment:it.editedComment||it.comment, image:it.editedImages[0], images:it.editedImages,
      offerTitle:it.offerTitle, discountPercent:it.discountPercent? parseInt(it.discountPercent):0,
      deliveryCharge:it.freeDelivery?0:parseInt(it.deliveryCharge||60), freeDelivery:it.freeDelivery,
      stock:it.stock, badge:it.badge, extraDesc:it.extraDesc, size:it.size, color:it.color,
      status:"approved"
    };
    localStorage.setItem("gausia_all_products",JSON.stringify([forCustomer,...all]));
    alert(`✅ ${forCustomer.title} Customer এ গেছে - ${forCustomer.discountPercent? forCustomer.discountPercent+"% Discount":""} ${forCustomer.offerTitle}`);
  };

  const deleteInbox=(i:number)=>{ if(!confirm("Inbox Delete?")) return; const up=pending.filter((_,idx)=>idx!==i); setPending(up); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); };
  const deleteEdited=(i:number)=>{ if(!confirm("Edited Delete?")) return; const up=edited.filter((_,idx)=>idx!==i); setEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up)); };

  if(!passOk){
    return(<div className="min-h-screen bg-black flex items-center justify-center p-4"><div className="bg-white rounded-[20px] p-6 w-full max-w-sm border-2 border-black shadow-[6px_6px_0px_white]"><div className="font-black">🔒 ADMIN - GAUSIA</div><input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password 1234" className="w-full mt-4 border-2 border-black rounded-full px-4 py-3"/><button onClick={login} className="w-full mt-3 bg-black text-white py-3 rounded-full font-black">Login</button></div></div>);
  }

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 p-3">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-2 border-black rounded-[20px] shadow-[5px_5px_0px_black] p-4 flex justify-between">
          <div><div className="font-black">ADMIN 2-PART + OFFER/DISCOUNT</div><div className="text-[11px]">Seller রেকর্ড থেকে যাবে | Admin Edit করে Offer/Discount সহ Customer এ</div></div>
          <div className="flex gap-2">
            <button onClick={()=>setActiveTab("inbox")} className={`px-3 py-2 rounded-full text-xs font-black border-2 border-black ${activeTab==="inbox"?"bg-yellow-400":"bg-white"}`}>📥 Inbox ({pending.length})</button>
            <button onClick={()=>setActiveTab("edit")} className={`px-3 py-2 rounded-full text-xs font-black border-2 border-black ${activeTab==="edit"?"bg-emerald-400":"bg-white"}`}>✏️ Offer Edit ({edited.length})</button>
            <button onClick={()=>{localStorage.removeItem("gausia_admin_ok"); location.reload();}} className="px-2 py-2 rounded-full text-xs bg-red-50 border-2 border-black">Logout</button>
          </div>
        </div>

        {activeTab==="inbox" && (
          <div className="mt-4">
            <div className="bg-yellow-100 border-2 border-black rounded-[12px] p-2 text-[12px] font-bold">📥 PART 1: সেলারের পাঠানো - থেকে যাবে, অপরিবর্তিত</div>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {pending.map((p:any,i:number)=>(
                <div key={i} className="bg-white border-2 border-black rounded-[16px] p-3 shadow-[4px_4px_0px_black]">
                  <div className="font-black text-xs">{p.shop} - {p.title} - {p.price}৳ - {p.images?.length} Pics</div>
                  <div className="mt-2 border-2 border-black rounded-xl overflow-hidden"><img src={p.images?.[0]||p.image} alt="" className="w-full h-40 object-cover"/><div className="flex gap-1 p-1 bg-gray-100">{(p.images||[]).slice(0,5).map((im:string,k:number)=><img key={k} src={im} alt="" className="w-10 h-10 rounded border-2 border-black object-cover"/>)}</div></div>
                  <div className="flex gap-2 mt-2"><button onClick={()=>moveToEdit(p)} className="flex-1 bg-black text-white rounded-full py-2 text-xs font-black border-2 border-black">✏️ Offer/Discount এড করতে PART 2 এ নিন</button><button onClick={()=>deleteInbox(i)} className="bg-red-50 border-2 border-black rounded-full px-3 text-xs">🗑️</button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==="edit" && (
          <div className="mt-4">
            <div className="bg-emerald-100 border-2 border-black rounded-[12px] p-2 text-[12px] font-bold">✏️ PART 2: এখান থেকে Offer/Discount/তথ্য এড করুন - Customer এ Auto যাবে, Customer পেজে আর কিছু করতে হবে না</div>

            {editItem && editIndex!==null && (
              <div className="bg-white border-2 border-black rounded-[18px] p-4 mt-3 shadow-[4px_4px_0px_black]">
                <div className="font-black text-sm">🎯 বিক্রির জন্য সব তথ্য এড করুন - SHOP-01</div>
                
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  <input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} placeholder="পণ্যের নাম" className="border-2 border-black rounded-full px-4 py-2.5 text-sm font-bold"/>
                  <input value={editItem.badge} onChange={e=>setEditItem({...editItem,badge:e.target.value})} placeholder="Badge: New/Hot/Offer/Discount" className="border-2 border-black rounded-full px-4 py-2.5 text-sm bg-yellow-50"/>
                </div>

                <div className="mt-3 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-[16px] p-3">
                  <div className="font-black text-xs text-orange-800">💥 অফার ও ডিসকাউন্ট</div>
                  <div className="grid md:grid-cols-3 gap-2 mt-2">
                    <input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} placeholder="আগের দাম 2000" type="number" className="border-2 border-black rounded-full px-3 py-2 text-sm"/>
                    <input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} onBlur={calcOffer} placeholder="ডিসকাউন্ট % 25" type="number" className="border-2 border-black rounded-full px-3 py-2 text-sm bg-red-50"/>
                    <input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} placeholder="অফার দাম 1500" type="number" className="border-2 border-black rounded-full px-3 py-2 text-sm bg-green-50 font-black"/>
                  </div>
                  <input value={editItem.offerTitle} onChange={e=>setEditItem({...editItem,offerTitle:e.target.value})} placeholder="🎉 অফার টাইটেল: Eid Dhamaka Offer, Buy 1 Get 1, Free Delivery" className="w-full mt-2 border-2 border-black rounded-full px-4 py-2.5 text-sm bg-yellow-100 font-bold"/>
                  <div className="text-[11px] mt-1 text-orange-700">Original {editItem.originalPrice}৳ - {editItem.discountPercent}% = Offer {editItem.offerPrice}৳ - Customer এ লাল কাটা দাম দেখাবে</div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  <input value={editItem.size} onChange={e=>setEditItem({...editItem,size:e.target.value})} placeholder="📏 সাইজ: L,XL,XXL / 36-42" className="border-2 border-black rounded-full px-4 py-2.5 text-sm"/>
                  <input value={editItem.color} onChange={e=>setEditItem({...editItem,color:e.target.value})} placeholder="🎨 কালার: Lal, Pink, White" className="border-2 border-black rounded-full px-4 py-2.5 text-sm"/>
                  <input value={editItem.deliveryCharge} onChange={e=>setEditItem({...editItem,deliveryCharge:e.target.value})} placeholder="🚚 ডেলিভারি চার্জ 60" type="number" className="border-2 border-black rounded-full px-4 py-2.5 text-sm"/>
                  <select value={editItem.stock} onChange={e=>setEditItem({...editItem,stock:e.target.value})} className="border-2 border-black rounded-full px-4 py-2.5 text-sm"><option>In Stock</option><option>Stock Out</option><option>Limited Stock</option><option>Pre Order</option></select>
                </div>

                <div className="flex items-center gap-2 mt-3 bg-blue-50 border-2 border-blue-200 rounded-full px-4 py-2 w-fit">
                  <input type="checkbox" checked={editItem.freeDelivery} onChange={e=>setEditItem({...editItem,freeDelivery:e.target.checked})} className="w-5 h-5"/>
                  <span className="text-sm font-black">🚚 ফ্রি ডেলিভারি</span>
                </div>

                <textarea value={editItem.extraDesc} onChange={e=>setEditItem({...editItem,extraDesc:e.target.value})} placeholder="📝 বিক্রির জন্য বাড়তি তথ্য: 100% Cotton, Washable, 7 Days Return, Best Quality, Gausia Market etc." className="w-full mt-3 border-2 border-black rounded-[16px] px-4 py-3 text-sm h-20"/>
                <input value={editItem.editedComment} onChange={e=>setEditItem({...editItem,editedComment:e.target.value})} placeholder="💬 Ind/Ban" className="w-full mt-2 border-2 border-black rounded-full px-4 py-2 text-sm"/>

                <div className="flex gap-1.5 mt-3 flex-wrap">{editItem.editedImages.map((im:string,k:number)=><div key={k} className="relative"><img src={im} alt="" className="w-14 h-14 rounded border-2 border-black object-cover"/><button onClick={()=>setEditItem({...editItem,editedImages:editItem.editedImages.filter((_:any,idx:number)=>idx!==k)})} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs">X</button></div>)}</div>

                <div className="flex gap-2 mt-4"><button onClick={saveEdit} className="flex-1 bg-yellow-400 border-2 border-black rounded-full py-3 font-black">💾 Save Edit</button><button onClick={()=>{setEditItem(null); setEditIndex(null);}} className="flex-1 bg-white border-2 border-black rounded-full py-3 font-black">Cancel</button></div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-3 mt-4">
              {edited.map((p:any,i:number)=>(
                <div key={p.editId} className="bg-white border-2 border-black rounded-[16px] p-3 shadow-[4px_4px_0px_black]">
                  <div className="flex justify-between"><div className="font-black text-xs">{p.editedTitle} {p.discountPercent?`- ${p.discountPercent}% OFF`:""} {p.badge?`[${p.badge}]`:""}</div><div className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full">{p.offerTitle||"No Offer"}</div></div>
                  <div className="text-xs mt-1">{p.discountPercent? <><span className="line-through text-gray-500">{p.originalPrice}৳</span> <span className="font-black text-green-600">{p.offerPrice}৳</span> <span className="bg-red-500 text-white px-1.5 rounded-full text-[10px]">-{p.discountPercent}%</span></>: <span className="font-black">{p.editedPrice||p.price}৳</span>} {p.freeDelivery&& <span className="bg-blue-500 text-white px-1.5 rounded-full text-[10px]">Free Delivery</span>}</div>
                  <div className="mt-2 border rounded-xl overflow-hidden"><img src={p.editedImages?.[0]} alt="" className="w-full h-36 object-cover"/><div className="flex gap-1 p-1 bg-gray-100">{p.editedImages?.slice(0,5).map((im:string,k:number)=><img key={k} src={im} alt="" className="w-8 h-8 rounded border object-cover"/>)}</div></div>
                  <div className="flex gap-2 mt-2"><button onClick={()=>{setEditItem(p); setEditIndex(i);}} className="flex-1 bg-yellow-300 border-2 border-black rounded-full py-2 text-xs font-black">✏️ Edit Offer</button><button onClick={()=>sendToCustomer(i)} className="flex-1 bg-emerald-600 text-white border-2 border-black rounded-full py-2 text-xs font-black">🚀 Customer এ পাঠান</button><button onClick={()=>deleteEdited(i)} className="bg-red-50 border-2 border-black rounded-full px-3 text-xs">🗑️</button></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
