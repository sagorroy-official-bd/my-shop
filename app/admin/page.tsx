"use client";
import { useState, useEffect } from "react";
export default function Admin(){
  const [shops,setShops]=useState<string[]>([]);
  const [newShop,setNewShop]=useState("");
  const [products,setProducts]=useState<any[]>([]);

  useEffect(()=>{
    // ১. দোকান লোড
    const s=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
    if(s.length>0) setShops(s); else setShops(["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"]);
    // ২. সেলার যে জেলার তথ্য পাঠায় সেটা লোড - আগের মতোই
    const seller=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    if(seller.length>0) setProducts(seller);
  },[]);

  const addShop=()=>{ if(!newShop.trim())return; let n=newShop.trim().toUpperCase().replace(/\s+/g,"-"); if(!n.startsWith("SHOP-")) n="SHOP-"+n; const u=[...shops,n].sort(); setShops(u); localStorage.setItem("gausia_all_shops",JSON.stringify(u)); setNewShop(""); };
  const make100=()=>{ const h=Array.from({length:100}).map((_,i)=>`SHOP-${String(i+1).padStart(2,"0")}`); setShops(h); localStorage.setItem("gausia_all_shops",JSON.stringify(h)); };
  
  const approve=(id:string)=>{
    const updated=products.map(p=>p.id===id?{...p,status:"approved"}:p);
    setProducts(updated);
    const approvedList=updated.filter(p=>p.status==="approved");
    localStorage.setItem("gausia_customer_final",JSON.stringify(approvedList));
    localStorage.setItem("gausia_seller_pending",JSON.stringify(updated));
  };

  return(
    <div className="min-h-screen bg-[#f9f5f0] p-4">
      {/* উপরে দোকান কন্ট্রোল */}
      <div className="max-w-7xl mx-auto bg-white border border-orange-100 rounded-2xl p-4 mb-4 flex gap-3 items-center">
        <div className="font-black text-sm">🏪 {shops.length} দোকান</div>
        <input value={newShop} onChange={e=>setNewShop(e.target.value)} placeholder="11 লিখুন" className="border bg-orange-50 rounded-full px-4 py-2 text-xs w-40"/>
        <button onClick={addShop} className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold">+ Add</button>
        <button onClick={make100} className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold">1 ক্লিকে 100 টা</button>
        <a href="/" className="ml-auto bg-green-500 text-white px-4 py-2 rounded-full text-xs">Customer →</a>
      </div>

      {/* নিচে আপনার আগের ADMIN PANEL - জেলার তথ্য সহ */}
      <div className="max-w-7xl mx-auto bg-white border-2 border-black rounded-2xl p-4 flex justify-between">
        <div><div className="font-black">ADMIN PANEL <span className="bg-yellow-400 px-2 rounded-full text-xs">GAUSIA</span></div><div className="text-[10px]">Remark + Mark Delete + জেলার তথ্য দেখা যাবে</div></div>
        <div className="bg-black text-white px-3 py-1 rounded-full text-xs">মোট: {products.length} টা পণ্য</div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 mt-4">
        {products.map(p=>(
          <div key={p.id} className="bg-white border-2 border-black rounded-2xl p-3">
            <div className="flex justify-between"><span className="font-bold text-sm">📦 {p.seller||p.shop} - {p.id}</span><span className="bg-yellow-200 px-2 rounded-full text-[10px] border">{p.district||p.note||"জেলা তথ্য"}</span></div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="border border-dashed rounded-xl p-2"><div className="text-[8px] bg-black text-white px-2 rounded-full w-fit">SELLER ORIGINAL</div><img src={p.image} className="w-full h-28 object-cover rounded mt-2"/><div className="text-xs mt-2 font-bold">{p.title} - {p.price}৳</div><div className="text-[11px] mt-1 bg-gray-100 p-1 rounded">📍 জেলা: {p.district||p.note||"তথ্য নেই"}</div></div>
              <div className="border rounded-xl p-2 bg-yellow-50"><div className="text-[8px] bg-yellow-400 border border-black px-2 rounded-full w-fit">ADMIN EDIT</div><input defaultValue={p.title} className="border w-full rounded mt-2 text-xs px-2 py-1"/><input defaultValue={p.price} className="border w-full rounded mt-1 text-xs px-2 py-1"/><div className="text-[10px] mt-2">Remark / জেলার নোট</div><textarea defaultValue={p.adminRemark||""} className="border w-full rounded text-xs p-1 mt-1" placeholder="যেমন: ঢাকা, রংপুর - রিজেক্ট কারণ"/></div>
            </div>
            <div className="flex gap-2 mt-3"><button onClick={()=>approve(p.id)} className="flex-1 bg-yellow-400 border border-black rounded-full py-2 text-xs font-black">✓ Approve</button><button className="flex-1 border border-black rounded-full py-2 text-xs">Reject</button></div>
          </div>
        ))}
        {products.length===0 && <div className="col-span-2 text-center text-sm text-gray-500 py-10">এখন কোনো সেলার তথ্য নেই - সেলার পণ্য আপলোড করলে এখানে জেলার তথ্য সহ দেখাবে</div>}
      </div>
    </div>
  )
}
