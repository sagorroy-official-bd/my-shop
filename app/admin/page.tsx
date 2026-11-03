"use client";
import { useState, useEffect } from "react";
export default function AdminFinal(){
  const [shops,setShops]=useState<string[]>([]);
  const [newShop,setNewShop]=useState("");
  const [products,setProducts]=useState<any[]>([]);
  const [tab,setTab]=useState("product"); // product = আগের পেজ, shop = নতুন

  useEffect(()=>{
    const s=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
    if(s.length>0) setShops(s); else setShops(["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"]);
    const seller=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    if(seller.length>0) setProducts(seller);
    else setProducts([
      {id:"SHOP-01-0280",seller:"BBBB",title:"Sari - 700৳",price:700,note:"Dhaka",district:"ঢাকা",image:"https://picsum.photos/seed/bbbb/400/400",status:"pending"},
      {id:"SHOP-01-3230",seller:"ABCD",title:"Sari - 500৳",price:500,note:"Rangpur",district:"রংপুর",image:"https://picsum.photos/seed/abcd/400/400",status:"pending"}
    ]);
  },[]);

  const addShop=()=>{ if(!newShop.trim())return; let n=newShop.trim().toUpperCase().replace(/\s+/g,"-"); if(!n.startsWith("SHOP-")) n="SHOP-"+n; const u=[...shops,n].sort(); setShops(u); localStorage.setItem("gausia_all_shops",JSON.stringify(u)); setNewShop(""); };
  const make100=()=>{ const h=Array.from({length:100}).map((_,i)=>`SHOP-${String(i+1).padStart(2,"0")}`); setShops(h); localStorage.setItem("gausia_all_shops",JSON.stringify(h)); alert("100 টা হয়ে গেছে!"); };
  const approve=(id:string)=>{ const up=products.map(p=>p.id===id?{...p,status:"approved"}:p); setProducts(up); localStorage.setItem("gausia_customer_final",JSON.stringify(up.filter(p=>p.status==="approved"))); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); };

  return(
    <div className="min-h-screen bg-[#f9f5f0] p-3">
      {/* উপরে ২টা ট্যাব */}
      <div className="max-w-7xl mx-auto flex gap-2 mb-3">
        <button onClick={()=>setTab("product")} className={`px-5 py-2 rounded-full text-sm font-black border-2 border-black ${tab==="product"?"bg-yellow-400 shadow-[2px_2px_0px_black]":"bg-white"}`}>📦 আগের পেজ - পণ্য + জেলার তথ্য</button>
        <button onClick={()=>setTab("shop")} className={`px-5 py-2 rounded-full text-sm font-black border-2 border-black ${tab==="shop"?"bg-orange-500 text-white shadow-[2px_2px_0px_black]":"bg-white"}`}>🏪 দোকান কন্ট্রোল ({shops.length})</button>
        <a href="/" className="ml-auto bg-black text-white px-4 py-2 rounded-full text-xs font-bold">Customer →</a>
      </div>

      {tab==="shop" ? (
        <div className="max-w-7xl mx-auto bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_black]">
          <h1 className="font-black text-xl">ADMIN - দোকান কন্ট্রোল</h1>
          <p className="text-xs text-gray-600">এখানে Add করলে Customer পেজে অটো বাড়বে - একই ব্রাউজারে করতে হবে</p>
          <div className="flex gap-2 mt-4"><input value={newShop} onChange={e=>setNewShop(e.target.value)} placeholder="11 লিখলেই SHOP-11 হবে" className="flex-1 border-2 border-orange-200 bg-orange-50 rounded-full px-5 py-3 text-sm outline-none"/><button onClick={addShop} className="bg-black text-white px-8 py-3 rounded-full font-black">+ Add</button></div>
          <div className="flex gap-2 mt-4"><button onClick={make100} className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold">1 ক্লিকে 100 টা দোকান বানান</button></div>
          <div className="mt-4 font-bold">বর্তমান: {shops.length} টা দোকান ✅ বাড়ছে!</div>
          <div className="grid grid-cols-6 gap-2 mt-3 max-h-[500px] overflow-auto border p-3 rounded-xl bg-gray-50">{shops.map(s=><div key={s} className="border bg-white rounded-full px-2 py-1 text-[11px] text-center font-bold">{s}</div>)}</div>
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto bg-white border-2 border-black rounded-2xl p-4 flex justify-between items-center shadow-[4px_4px_0px_black]">
            <div><div className="font-black text-lg">ADMIN PANEL <span className="bg-yellow-400 border border-black px-2 py-0.5 rounded-full text-xs ml-2">GAUSIA</span></div><div className="text-[10px] text-gray-600 mt-1">Remark + Mark Delete + Individual Delete (Reject) + Delete All - জেলার তথ্য সহ</div></div>
            <div className="flex gap-2 items-center"><label className="border border-black px-3 py-1 rounded-full text-xs flex gap-1 items-center"><input type="checkbox"/> Mark All</label><span className="bg-black text-white px-3 py-1 rounded-full text-xs">মোট: {products.length}</span></div>
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 mt-4">
            {products.map(p=>(
              <div key={p.id} className="bg-white border-2 border-black rounded-2xl p-3 shadow-[3px_3px_0px_black]">
                <div className="flex justify-between items-center"><div className="flex gap-2 items-center"><input type="checkbox"/><span className="font-bold text-sm">📦 {p.seller}</span><span className="bg-black text-white px-2 py-0.5 rounded-full text-[10px]">{p.id}</span></div><span className={`px-2 py-0.5 rounded-full text-[10px] border border-black font-bold ${p.status==="approved"?"bg-green-300":"bg-yellow-200"}`}>{p.status} - {p.district||p.note}</span></div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="border border-dashed border-gray-400 rounded-xl p-2"><div className="flex justify-between"><span className="bg-black text-white text-[8px] px-2 py-0.5 rounded-full">SELLER ORIGINAL</span></div><img src={p.image} className="w-full h-28 object-cover rounded-lg mt-2"/><div className="font-bold text-xs mt-2">{p.title}</div><div className="text-[11px] mt-1 bg-gray-100 p-1 rounded">📍 জেলা: {p.district||p.note}</div><input defaultValue={p.note} className="border w-full rounded mt-1 text-xs px-2 py-1"/></div>
                  <div className="border border-gray-300 rounded-xl p-2 bg-yellow-50/30"><div className="flex justify-between"><span className="bg-yellow-400 border border-black text-[8px] px-2 py-0.5 rounded-full font-bold">ADMIN EDIT</span></div><input defaultValue={p.title} className="border w-full rounded mt-2 text-xs px-2 py-1"/><input defaultValue={p.price} className="border w-full rounded mt-2 text-xs px-2 py-1"/><div className="border border-red-200 rounded mt-2 p-1 text-[10px] flex gap-1"><input type="checkbox"/> Remark লিখুন - {p.district}</div><img src={p.image} className="w-full h-12 object-cover rounded mt-2"/></div>
                </div>
                <div className="flex gap-2 mt-3"><button onClick={()=>approve(p.id)} className="flex-1 bg-yellow-400 border border-black rounded-full py-2 text-xs font-black">✓ Approve to Customer</button><button className="flex-1 border border-black rounded-full py-2 text-xs font-bold">Reject</button><button className="bg-red-500 text-white border border-black rounded-full px-4 py-2 text-xs font-bold">Delete All</button></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
