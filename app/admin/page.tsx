"use client";
import { useState, useEffect } from "react";

export default function AdminPanel(){
  const [passOk,setPassOk]=useState(false);
  const [pass,setPass]=useState("");
  const [pending,setPending]=useState<any[]>([]); // PART 1: সেলার যা পাঠাবে থেকে যাবে
  const [edited,setEdited]=useState<any[]>([]); // PART 2: এডমিন এডিট করে কাস্টমারে পাঠাবে
  const [activeTab,setActiveTab]=useState<"inbox"|"edit">("inbox");
  const [editItem,setEditItem]=useState<any>(null);
  const [editIndex,setEditIndex]=useState<number|null>(null);

  useEffect(()=>{
    if(typeof window==="undefined") return;
    if(localStorage.getItem("gausia_admin_ok")==="yes") setPassOk(true);
    const p=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    const e=JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]");
    setPending(p); setEdited(e);
  },[]);

  const login=()=>{
    if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setPassOk(true); }
    else alert("Password ভুল! Password: 1234");
  };

  // PART 1 থেকে PART 2 এ নেওয়া - সেলারেরটা অপরিবর্তিত থাকবে
  const moveToEdit=(item:any)=>{
    const newEdited={...item,editId:Date.now(),editedTitle:item.title,editedPrice:item.price,editedComment:item.comment,editedImages:item.images||[item.image]};
    const up=[newEdited,...edited];
    setEdited(up);
    localStorage.setItem("gausia_admin_edited",JSON.stringify(up));
    setActiveTab("edit");
    setEditItem(newEdited); setEditIndex(0);
  };

  const saveEdit=()=>{
    if(editIndex===null) return;
    const up=[...edited];
    up[editIndex]={...up[editIndex],editedTitle:editItem.editedTitle,editedPrice:editItem.editedPrice,editedComment:editItem.editedComment,editedImages:editItem.editedImages};
    setEdited(up);
    localStorage.setItem("gausia_admin_edited",JSON.stringify(up));
    setEditItem(null); setEditIndex(null);
  };

  const sendToCustomer=(idx:number)=>{
    try{
      const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
      const it=edited[idx];
      const forCustomer={id:Date.now(),shop:it.shop,shopName:it.shopName,address:it.address,phone:it.phone,title:it.editedTitle||it.title,price:parseInt(it.editedPrice||it.price),comment:it.editedComment||it.comment,image:it.editedImages[0],images:it.editedImages,main:it.editedImages[0],status:"approved"};
      localStorage.setItem("gausia_all_products",JSON.stringify([forCustomer,...all]));
      alert("✅ "+forCustomer.title+" Customer পেজে গেছে - ৫ ছবি সহ");
    }catch{}
  };

  const deleteInbox=(i:number)=>{
    if(!confirm("এই রেকর্ড ডিলিট করবেন? সেলারের পাঠানো রেকর্ড থেকে যাওয়ার কথা ছিল, কিন্তু আপনি চাইলে ডিলিট করতে পারবেন")) return;
    const up=pending.filter((_,idx)=>idx!==i);
    setPending(up); localStorage.setItem("gausia_seller_pending",JSON.stringify(up));
  };

  const deleteEdited=(i:number)=>{
    if(!confirm("এডমিন এডিট করা রেকর্ড ডিলিট?")) return;
    const up=edited.filter((_,idx)=>idx!==i);
    setEdited(up); localStorage.setItem("gausia_admin_edited",JSON.stringify(up));
  };

  if(!passOk){
    return(
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-white border-2 border-black rounded-[20px] p-6 w-full max-w-sm shadow-[6px_6px_0px_white]">
          <div className="font-black text-lg">🔒 ADMIN PANEL - GAUSIA</div>
          <div className="text-xs text-gray-600 mt-1">এই পেজ সেলার/কাস্টমার দেখতে পারবে না</div>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password লিখুন (1234)" className="w-full mt-4 border-2 border-black rounded-full px-4 py-3"/>
          <button onClick={login} className="w-full mt-3 bg-black text-white py-3 rounded-full font-black border-2 border-black">Login</button>
        </div>
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 p-3">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-2 border-black rounded-[20px] shadow-[5px_5px_0px_black] p-4 flex justify-between items-center">
          <div><div className="font-black">ADMIN PANEL GAUSIA - 2 PART</div><div className="text-[11px]">১ম পার্ট: সেলারের রেকর্ড থেকে যাবে | ২য় পার্ট: এডিট করে কাস্টমারে</div></div>
          <div className="flex gap-2">
            <button onClick={()=>setActiveTab("inbox")} className={`px-4 py-2 rounded-full text-xs font-black border-2 border-black ${activeTab==="inbox"?"bg-yellow-400":"bg-white"}`}>📥 সেলার ইনবক্স ({pending.length})</button>
            <button onClick={()=>setActiveTab("edit")} className={`px-4 py-2 rounded-full text-xs font-black border-2 border-black ${activeTab==="edit"?"bg-emerald-400":"bg-white"}`}>✏️ এডিট ও কাস্টমারে ({edited.length})</button>
            <button onClick={()=>{localStorage.removeItem("gausia_admin_ok"); location.reload();}} className="px-3 py-2 rounded-full text-xs font-black bg-red-50 border-2 border-black">Logout</button>
          </div>
        </div>

        {activeTab==="inbox" && (
          <div className="mt-4">
            <div className="bg-yellow-100 border-2 border-black rounded-[14px] p-3 mb-4 text-[12px] font-bold">📥 PART 1: সেলার যা পাঠাবে এই রেকর্ড গুলো থেকে যাবে - সেলারের পেজ অপরিবর্তিত থাকবে, ডিলিট না করলে থাকবে</div>
            <div className="grid md:grid-cols-2 gap-4">
              {pending.map((p:any,i:number)=>(
                <div key={i} className="bg-white border-2 border-black rounded-[18px] p-3 shadow-[4px_4px_0px_black]">
                  <div className="font-black text-xs">{p.shop} - {p.title} - {p.price}৳ - 📂 {p.images?.length||1} Pics</div>
                  <div className="mt-2 border-2 border-black rounded-xl overflow-hidden"><img src={p.images?.[0]||p.image} alt="" className="w-full h-40 object-cover"/><div className="flex gap-1 p-1 bg-gray-100 overflow-auto">{(p.images||[p.image]).slice(0,5).map((im:string,k:number)=><img key={k} src={im} alt="" className="w-10 h-10 rounded border-2 border-black object-cover"/>)}</div></div>
                  <div className="text-[11px] mt-2">🏪 {p.shopName} | 🗺️ {p.address} | 💬 {p.comment}</div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={()=>moveToEdit(p)} className="flex-1 bg-black text-white border-2 border-black rounded-full py-2 text-xs font-black">✏️ এডিট করতে PART 2 এ নিন</button>
                    <button onClick={()=>deleteInbox(i)} className="bg-red-50 border-2 border-black rounded-full px-4 py-2 text-xs font-black">🗑️ ডিলিট</button>
                  </div>
                </div>
              ))}
            </div>
            {pending.length===0 && <div className="text-center py-12 bg-white border-2 border-dashed rounded-[16px]">📭 সেলার এখনো কিছু পাঠায়নি</div>}
          </div>
        )}

        {activeTab==="edit" && (
          <div className="mt-4">
            <div className="bg-emerald-100 border-2 border-black rounded-[14px] p-3 mb-4 text-[12px] font-bold">✏️ PART 2: এডমিন এডিট করে কাস্টমার পেজে পাঠাবে - সেলারের পেজ অপরিবর্তিত থাকবে, এখানে আলাদা এডিট/ডিলিট</div>
            
            {editItem && editIndex!==null && (
              <div className="bg-white border-2 border-black rounded-[18px] p-4 mb-4 shadow-[4px_4px_0px_black]">
                <div className="font-black">✏️ এডিট করুন - {editItem.shop}</div>
                <input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} className="w-full mt-2 border-2 border-black rounded-full px-4 py-2 text-sm"/>
                <input value={editItem.editedPrice} onChange={e=>setEditItem({...editItem,editedPrice:e.target.value})} type="number" className="w-full mt-2 border-2 border-black rounded-full px-4 py-2 text-sm"/>
                <input value={editItem.editedComment} onChange={e=>setEditItem({...editItem,editedComment:e.target.value})} className="w-full mt-2 border-2 border-black rounded-full px-4 py-2 text-sm"/>
                <div className="flex gap-2 mt-3 flex-wrap">{editItem.editedImages.map((im:string,k:number)=><div key={k} className="relative"><img src={im} alt="" className="w-16 h-16 rounded border-2 border-black"/><button onClick={()=>setEditItem({...editItem,editedImages:editItem.editedImages.filter((_:any,idx:number)=>idx!==k)})} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs">X</button></div>)}</div>
                <div className="flex gap-2 mt-3"><button onClick={saveEdit} className="flex-1 bg-yellow-400 border-2 border-black rounded-full py-2 font-black">💾 Save Edit</button><button onClick={()=>{setEditItem(null); setEditIndex(null);}} className="flex-1 bg-white border-2 border-black rounded-full py-2 font-black">Cancel</button></div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {edited.map((p:any,i:number)=>(
                <div key={p.editId} className="bg-white border-2 border-black rounded-[18px] p-3 shadow-[4px_4px_0px_black]">
                  <div className="font-black text-xs">{p.shop} - {p.editedTitle||p.title} - {p.editedPrice||p.price}৳ - 📂 {p.editedImages?.length} Pics</div>
                  <div className="mt-2 border-2 border-black rounded-xl overflow-hidden"><img src={p.editedImages?.[0]} alt="" className="w-full h-40 object-cover"/><div className="flex gap-1 p-1 bg-gray-100 overflow-auto">{p.editedImages?.slice(0,5).map((im:string,k:number)=><img key={k} src={im} alt="" className="w-10 h-10 rounded border-2 border-black object-cover"/>)}</div></div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={()=>{setEditItem(p); setEditIndex(i);}} className="flex-1 bg-yellow-300 border-2 border-black rounded-full py-2 text-xs font-black">✏️ Edit</button>
                    <button onClick={()=>sendToCustomer(i)} className="flex-1 bg-emerald-500 text-white border-2 border-black rounded-full py-2 text-xs font-black">🚀 Customer এ পাঠান</button>
                    <button onClick={()=>deleteEdited(i)} className="bg-red-50 border-2 border-black rounded-full px-3 py-2 text-xs font-black">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
            {edited.length===0 && <div className="text-center py-12 bg-white border-2 border-dashed rounded-[16px]">✏️ PART 1 থেকে "এডিট করতে PART 2 এ নিন" চাপুন, তারপর এখানে এডিট করে কাস্টমারে পাঠাবেন</div>}
          </div>
        )}
      </div>
    </div>
  );
}
