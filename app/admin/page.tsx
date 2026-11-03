"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [shops,setShops]=useState<string[]>([]);const [newShop,setNewShop]=useState("");const [products,setProducts]=useState<any[]>([]);

  useEffect(()=>{
    const savedShops=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
    if(savedShops.length>0) setShops(savedShops); else setShops(["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"]);
    const sellerProducts=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    if(sellerProducts.length>0) setProducts(sellerProducts);
    else setProducts([
      {id:"SHOP-01-0280",seller:"BBBB",title:"Sari - 700৳",price:700,note:"Indian",image:"https://picsum.photos/seed/bbbb/400/400",status:"approved"},
      {id:"SHOP-01-3230",seller:"ABCD",title:"Sari - 500৳",price:500,note:"Indian",image:"https://picsum.photos/seed/abcd/400/400",status:"rejected"}
    ]);
  },[]);

  const addShop=()=>{
    if(!newShop.trim())return;
    const name=newShop.trim().toUpperCase().replace(/\s+/g,"-");
    if(shops.includes(name))return;
    const updated=[...shops,name].sort();
    setShops(updated);localStorage.setItem("gausia_all_shops",JSON.stringify(updated));setNewShop("");
  };

  const approve=(id:string)=>{const updated=products.map(p=>p.id===id?{...p,status:"approved"}:p);setProducts(updated);const approvedList=updated.filter(p=>p.status==="approved");localStorage.setItem("gausia_customer_final",JSON.stringify(approvedList));};
  const reject=(id:string)=>{const updated=products.filter(p=>p.id!==id);setProducts(updated);localStorage.setItem("gausia_seller_pending",JSON.stringify(updated));};

  return(
    <div className="min-h-screen bg-[#f9f5f0] p-4">
      {/* দোকান কন্ট্রোল - মার্জনীয় ডিজাইন */}
      <div className="max-w-7xl mx-auto bg-white border border-orange-100 rounded-2xl p-4 mb-4 flex flex-wrap gap-3 items-center shadow-sm">
        <div className="font-black text-sm flex items-center gap-2"><span className="bg-orange-100 border border-orange-200 text-orange-700 px-2 py-1 rounded-full text-[11px]">🏪</span> দোকান কন্ট্রোল: {shops.length} টা</div>
        <input value={newShop} onChange={e=>setNewShop(e.target.value)} placeholder="SHOP-11 লিখুন" className="border border-orange-100 bg-[#FFF8F0] rounded-full px-4 py-2 text-xs w-48 outline-none focus:border-orange-300"/>
        <button onClick={addShop} className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-500 transition">+ Add দোকান</button>
        <button onClick={()=>{const h=Array.from({length:100}).map((_,i)=>`SHOP-${String(i+1).padStart(2,"0")}`);setShops(h);localStorage.setItem("gausia_all_shops",JSON.stringify(h));}} className="text-[11px] border border-dashed border-gray-300 px-3 py-2 rounded-full bg-white">1 ক্লিকে 100 টা বানান</button>
        <a href="/" className="ml-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold">Customer →</a>
      </div>

      {/* ADMIN PANEL - আপনার ছবির মতো হুবহু */}
      <div className="max-w-7xl mx-auto bg-white border-2 border-black rounded-2xl p-4 flex justify-between items-center shadow-[4px_4px_0px_black]">
        <div><div className="font-black text-lg">ADMIN PANEL <span className="bg-yellow-400 border border-black px-2 py-0.5 rounded-full text-xs ml-2">GAUSIA</span></div><div className="text-[10px] text-gray-600 mt-1">Remark + Mark Delete + Individual Delete (Reject) + Delete All</div></div>
        <div className="flex gap-2 items-center"><label className="border border-black px-3 py-1 rounded-full text-xs flex gap-1 items-center"><input type="checkbox"/> Mark All</label><span className="bg-black text-white px-3 py-1 rounded-full text-xs">মোট: {products.length}</span><button className="bg-red-500 text-white px-3 py-1 rounded-full text-xs border border-black">মার্ক করা ডিলিট (0)</button></div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 mt-4">
        {products.map(p=>(
          <div key={p.id} className="bg-white border-2 border-black rounded-2xl p-3 shadow-[3px_3px_0px_black]">
            <div className="flex justify-between items-center"><div className="flex gap-2 items-center"><input type="checkbox"/><span className="font-bold text-sm">📦 {p.seller}</span><span className="bg-black text-white px-2 py-0.5 rounded-full text-[10px]">{p.id}</span></div><span className={`px-2 py-0.5 rounded-full text-[10px] border border-black font-bold ${p.status==="approved"?"bg-green-300":"bg-red-300"}`}>{p.status}</span></div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="border border-dashed border-gray-400 rounded-xl p-2"><div className="flex justify-between"><span className="bg-black text-white text-[8px] px-2 py-0.5 rounded-full">SELLER ORIGINAL</span><span className="text-[8px] border px-2 rounded-full">Del Org</span></div><img src={p.image} className="w-full h-28 object-cover rounded-lg mt-2"/><div className="font-bold text-xs mt-2">{p.title}</div><input defaultValue={p.note} className="border w-full rounded mt-1 text-xs px-2 py-1"/></div>
              <div className="border border-gray-300 rounded-xl p-2 bg-yellow-50/30"><div className="flex justify-between"><span className="bg-yellow-400 border border-black text-[8px] px-2 py-0.5 rounded-full font-bold">ADMIN EDIT</span><span className="bg-black text-white text-[8px] px-2 rounded-full">Del Edit</span></div><input defaultValue={p.title} className="border w-full rounded mt-2 text-xs px-2 py-1"/><input defaultValue={p.price} className="border w-full rounded mt-2 text-xs px-2 py-1"/><input defaultValue={p.note} className="border w-full rounded mt-2 text-xs px-2 py-1"/><div className="border border-red-200 rounded mt-2 p-1 text-[10px] flex gap-1"><input type="checkbox"/> Remark লিখুন - যেমন: রিজেক্ট কারণ</div><img src={p.image} className="w-full h-12 object-cover rounded mt-2"/></div>
            </div>
            <div className="flex gap-2 mt-3"><button onClick={()=>approve(p.id)} className="flex-1 bg-yellow-400 border border-black rounded-full py-2 text-xs font-black">✓ Approve to Customer</button><button onClick={()=>reject(p.id)} className="flex-1 border border-black rounded-full py-2 text-xs font-bold">Reject (Individual Delete)</button><button onClick={()=>reject(p.id)} className="bg-red-500 text-white border border-black rounded-full px-4 py-2 text-xs font-bold">Delete All</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
