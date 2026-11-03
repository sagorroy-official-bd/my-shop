"use client";
import { useState, useEffect } from "react";
export default function Home(){
  const [approved,setApproved]=useState<any[]>([]);
  useEffect(()=>{
    const backup=JSON.parse(localStorage.getItem("gausia_admin_backup")||"[]");
    const final=JSON.parse(localStorage.getItem("gausia_customer_final")||"[]");
    const approvedFromBackup=backup.filter((p:any)=>p.adminStatus==="approved").map((p:any)=>p.adminEditedData);
    setApproved(final.length>0?final:approvedFromBackup);
  },[]);
  const demo=[{id:"SHOP-01-002",title:"মহিলা থ্রি-পিস",price:"2500",cat:"মহিলা"},{id:"SHOP-01-003",title:"পুরুষ পাঞ্জাবি",price:"1800",cat:"পুরুষ"},{id:"SHOP-01-004",title:"বেবি ফ্রক",price:"900",cat:"বেবি"}];
  const all=[...approved,...demo];
  return(
    <div className="min-h-screen bg-[#fdf6ee] font-sans">
      <header className="bg-white border-b-2 border-black py-4 px-6 flex justify-between"><h1 className="text-2xl font-black">GAUSIA COLLECTION</h1><div className="bg-black text-white px-4 py-1 rounded-full text-sm">মোট: {all.length} টি</div></header>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {all.map(p=>(
            <div key={p.id} className="bg-white border-2 border-black rounded-[20px] overflow-hidden shadow-[4px_4px_0px_black]">
              <div className="bg-gray-100 h-44 flex items-center justify-center font-black relative">{p.image?<img src={p.image} className="w-full h-full object-cover"/>:p.title}<span className="absolute top-2 left-2 bg-black text-white text-[9px] px-2 py-1 rounded-full">{p.id}</span>{approved.find((a:any)=>a.id===p.id) && <span className="absolute top-2 right-2 bg-green-400 text-[9px] px-2 py-1 rounded-full font-black">NEW ADMIN APPROVED</span>}</div>
              <div className="p-3"><div className="font-black">{p.title}</div><div className="flex justify-between mt-1"><span className="font-black">{p.price}৳</span><span className="text-xs bg-gray-100 px-2 py-1 rounded-full border">{p.cat}</span></div><div className="text-xs text-gray-500 mt-1">{p.comment}</div><button className="w-full mt-3 bg-black text-white py-2 rounded-full text-sm font-bold">কার্টে যোগ করুন</button></div>
            </div>
          ))}
        </div>
        {approved.length===0 && <p className="text-center mt-10">Admin থেকে Approve করলে এখানে দেখা যাবে</p>}
      </div>
    </div>
  )
}
