"use client";
import { useState, useEffect } from "react";
export default function AdminFinalFixed(){
  const [shops,setShops]=useState<string[]>([]);
  const [newShop,setNewShop]=useState("");
  const [products,setProducts]=useState<any[]>([]);
  const [marked,setMarked]=useState<string[]>([]);
  const [tab,setTab]=useState("product");

  useEffect(()=>{
    const s=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
    if(s.length>0) setShops(s); else setShops(["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"]);
    const seller=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    setProducts(seller.length>0?seller:[
      {id:"SHOP-01-0280",seller:"BBBB",title:"Sari - 700৳",price:700,note:"Dhaka",district:"ঢাকা",image:"https://picsum.photos/seed/bbbb/400/400",status:"pending"},
      {id:"SHOP-01-3230",seller:"ABCD",title:"Sari - 500৳",price:500,note:"Rangpur",district:"রংপুর",image:"https://picsum.photos/seed/abcd/400/400",status:"pending"}
    ]);
  },[]);

  const saveProducts=(up:any[])=>{ setProducts(up); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); localStorage.setItem("gausia_customer_final",JSON.stringify(up.filter(p=>p.status==="approved"))); };

  // *** DELETE + REJECT FIXED ***
  const rejectOne=(id:string)=>{ if(!confirm("এই পণ্যটা Reject/Delete করবেন?"))return; const up=products.filter(p=>p.id!==id); saveProducts(up); };
  const deleteAll=()=>{ if(!confirm("সব পণ্য Delete করবেন? সব ডিলিট হয়ে যাবে!"))return; localStorage.removeItem("gausia_seller_pending"); localStorage.removeItem("gausia_customer_final"); setProducts([]); setMarked([]); alert("সব ডিলিট হয়েছে! এখন Seller পেজ থেকে নতুন Add করতে পারবেন"); };
  const deleteMarked=()=>{ if(marked.length===0){alert("কোনো পণ্য Mark করেননি");return;} if(!confirm(marked.length+" টা পণ্য Delete করবেন?"))return; const up=products.filter(p=>!marked.includes(p.id)); saveProducts(up); setMarked([]); };
  const approve=(id:string)=>{ const up=products.map(p=>p.id===id?{...p,status:"approved"}:p); saveProducts(up); };

  const toggleMark=(id:string)=>{ setMarked(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]); };
  const markAll=()=>{ if(marked.length===products.length) setMarked([]); else setMarked(products.map(p=>p.id)); };

  const addShop=()=>{ if(!newShop.trim())return; let n=newShop.trim().toUpperCase().replace(/\s+/g,"-"); if(!n.startsWith("SHOP-")) n="SHOP-"+n; const u=[...shops,n].sort(); setShops(u); localStorage.setItem("gausia_all_shops",JSON.stringify(u)); setNewShop(""); };
  const make100=()=>{ const h=Array.from({length:100}).map((_,i)=>`SHOP-${String(i+1).padStart(2,"0")}`); setShops(h); localStorage.setItem("gausia_all_shops",JSON.stringify(h)); };

  return(
    <div className="min-h-screen bg-[#f9f5f0] p-3">
      <div className="max-w-7xl mx-auto flex gap-2 mb-3 flex-wrap">
        <button onClick={()=>setTab("product")} className={`px-5 py-2 rounded-full text-sm font-black border-2 border-black ${tab==="product"?"bg-yellow-400 shadow-[2px_2px_0px_black]":"bg-white"}`}>📦 আগের পেজ - পণ্য + জেলার তথ্য</button>
        <button onClick={()=>setTab("shop")} className={`px-5 py-2 rounded-full text-sm font-black border-2 border-black ${tab==="shop"?"bg-orange-500 text-white shadow-[2px_2px_0px_black]":"bg-white"}`}>🏪 দোকান ({shops.length})</button>
        <button onClick={deleteAll} className="ml-auto bg-red-600 text-white px-5 py-2 rounded-full text-xs font-black border-2 border-black">🗑️ সব ডিলিট - Seller থেকে নতুন Add করব</button>
        <a href="/seller" className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold border-2 border-black">Seller Page →</a>
        <a href="/" className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold">Customer →</a>
      </div>

      {tab==="shop" ? (
        <div className="max-w-7xl mx-auto bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_black]">
          <h1 className="font-black text-xl">ADMIN - দোকান কন্ট্রোল</h1>
          <div className="flex gap-2 mt-4"><input value={newShop} onChange={e=>setNewShop(e.target.value)} placeholder="11 লিখলেই SHOP-11" className="flex-1 border-2 border-orange-200 bg-orange-50 rounded-full px-5 py-3 text-sm"/><button onClick={addShop} className="bg-black text-white px-8 py-3 rounded-full font-black">+ Add</button></div>
          <button onClick={make100} className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold mt-3">1 ক্লিকে 100 টা</button>
          <div className="grid grid-cols-6 gap-2 mt-4 max-h-[500px] overflow-auto border p-3 rounded-xl bg-gray-50">{shops.map(s=><div key={s} className="border bg-white rounded-full px-2 py-1 text-[11px] text-center font-bold">{s}</div>)}</div>
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto bg-white border-2 border-black rounded-2xl p-4 flex justify-between items-center shadow-[4px_4px_0px_black]">
            <div><div className="font-black text-lg">ADMIN PANEL <span className="bg-yellow-400 border border-black px-2 py-0.5 rounded-full text-xs ml-2">GAUSIA</span></div><div className="text-[10px]">Remark + Mark Delete + Individual Delete (Reject) + Delete All</div></div>
            <div className="flex gap-2 items-center"><label className="border border-black px-3 py-1 rounded-full text-xs flex gap-1 items-center cursor-pointer"><input type="checkbox" checked={marked.length===products.length && products.length>0} onChange={markAll}/> Mark All</label><span className="bg-black text-white px-3 py-1 rounded-full text-xs">মোট: {products.length}</span><button onClick={deleteMarked} className="bg-red-500 text-white px-3 py-1 rounded-full text-xs border border-black">মার্ক করা ডিলিট ({marked.length})</button></div>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 mt-4">
            {products.map(p=>(
              <div key={p.id} className="bg-white border-2 border-black rounded-2xl p-3 shadow-[3px_3px_0px_black]">
                <div className="flex justify-between items-center"><div className="flex gap-2 items-center"><input type="checkbox" checked={marked.includes(p.id)} onChange={()=>toggleMark(p.id)}/><span className="font-bold text-sm">📦 {p.seller}</span><span className="bg-black text-white px-2 py-0.5 rounded-full text-[10px]">{p.id}</span></div><span className="px-2 py-0.5 rounded-full text-[10px] border border-black font-bold bg-yellow-100">{p.status} - {p.district||p.note}</span></div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="border border-dashed border-gray-400 rounded-xl p-2"><div className="text-[8px] bg-black text-white px-2 py-0.5 rounded-full w-fit">SELLER ORIGINAL</div><img src={p.image} className="w-full h-28 object-cover rounded-lg mt-2"/><div className="font-bold text-xs mt-2">{p.title}</div><div className="text-[11px] mt-1 bg-gray-100 p-1 rounded">📍 জেলা: {p.district||p.note}</div></div>
                  <div className="border rounded-xl p-2 bg-yellow-50/30"><div className="text-[8px] bg-yellow-400 border border-black px-2 py-0.5 rounded-full w-fit font-bold">ADMIN EDIT</div><input defaultValue={p.title} className="border w-full rounded mt-2 text-xs px-2 py-1"/><input defaultValue={p.price} className="border w-full rounded mt-1 text-xs px-2 py-1"/><div className="border border-red-200 rounded mt-2 p-1 text-[10px]"><input type="checkbox"/> Remark - {p.district}</div></div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={()=>approve(p.id)} className="flex-1 bg-yellow-400 border border-black rounded-full py-2 text-xs font-black">✓ Approve to Customer</button>
                  <button onClick={()=>rejectOne(p.id)} className="flex-1 border-2 border-black rounded-full py-2 text-xs font-bold bg-white hover:bg-red-50">Reject</button>
                  <button onClick={()=>rejectOne(p.id)} className="bg-red-500 text-white border-2 border-black rounded-full px-4 py-2 text-xs font-bold hover:bg-red-600">Delete All</button>
                </div>
              </div>
            ))}
            {products.length===0 && <div className="col-span-2 bg-white border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center"><div className="text-2xl">✅</div><div className="font-bold mt-2">সব ডিলিট হয়েছে</div><div className="text-sm text-gray-500 mt-1">এখন Seller পেজ (/seller) থেকে নতুন পণ্য Add করুন - জেলার তথ্য সহ আসবে</div><a href="/seller" className="inline-block mt-4 bg-black text-white px-6 py-2 rounded-full text-sm font-bold">Seller Page এ যান →</a></div>}
          </div>
        </>
      )}
    </div>
  )
}
