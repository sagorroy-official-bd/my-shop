"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [products,setProducts]=useState<any[]>([]);
  useEffect(()=>{setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]"))},[]);
  const update=(id:string,s:string)=>{const up=products.map(p=>p.id===id?{...p,approveStatus:s}:p);setProducts(up);localStorage.setItem("gausia_all_products",JSON.stringify(up))};
  const del=(id:string)=>{const up=products.filter(p=>p.id!==id);setProducts(up);localStorage.setItem("gausia_all_products",JSON.stringify(up))};
  return(
    <div className="min-h-screen bg-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black">ADMIN PANEL</h1><p className="mt-2 bg-black text-white inline-block px-4 py-1 rounded-full text-sm">মোট: {products.length} | পেন্ডিং: {products.filter(p=>p.approveStatus==="pending").length} | Approved: {products.filter(p=>p.approveStatus==="approved").length}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {products.map(p=>(
            <div key={p.id} className="border-[2px] border-black rounded-[20px] p-4 shadow-[4px_4px_0px_0px_black]">
              <div className="flex justify-between"><span className="text-[10px] bg-gray-100 border border-black px-2 py-1 rounded-full">{p.id}</span><span className="text-[10px] bg-black text-white px-2 py-1 rounded-full">{p.shop}</span></div>
              <div className="bg-[#fdf6ee] h-28 rounded-xl mt-3 flex items-center justify-center font-black text-lg">{p.title}</div>
              <div className="font-black text-xl mt-3">{p.title}</div><div className="text-sm">{p.price}৳ - {p.cat}</div>
              <div className={`mt-2 text-center py-1 rounded-full text-xs font-black uppercase ${p.approveStatus==="approved"?"bg-green-200":p.approveStatus==="pending"?"bg-yellow-200":"bg-red-200"}`}>{p.approveStatus}</div>
              <div className="flex gap-2 mt-3"><button onClick={()=>update(p.id,"approved")} className="flex-1 bg-green-600 text-white py-2 rounded-full font-bold">Approve</button><button onClick={()=>update(p.id,"rejected")} className="flex-1 bg-red-500 text-white py-2 rounded-full font-bold">Reject</button></div>
              <button onClick={()=>del(p.id)} className="w-full mt-2 bg-black text-white py-2 rounded-full text-sm">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
