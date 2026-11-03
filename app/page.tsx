"use client";
import { useState, useEffect } from "react";
export default function Home(){
  const [approved,setApproved]=useState<any[]>([]);
  useEffect(()=>{setApproved(JSON.parse(localStorage.getItem("gausia_all_products")||"[]").filter((p:any)=>p.approveStatus==="approved"))},[]);
  const demo=[
    {id:"SHOP-01-002",title:"মহিলা থ্রি-পিস",price:"2500",cat:"মহিলা"},
    {id:"SHOP-01-003",title:"পুরুষ পাঞ্জাবি",price:"1800",cat:"পুরুষ"},
    {id:"SHOP-01-004",title:"বেবি ফ্রক",price:"900",cat:"বেবি"},
  ];
  const all=[...approved,...demo];
  return(
    <div className="min-h-screen bg-[#fdf6ee] font-sans">
      <header className="bg-white border-b-2 border-black py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter">GAUSIA COLLECTION</h1>
        <div className="bg-black text-white px-4 py-1 rounded-full text-sm">মোট: {all.length} টি</div>
      </header>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="bg-white border-2 border-black rounded-[20px] p-4 flex gap-2 overflow-x-auto">
          {["সব","মহিলা","পুরুষ","বেবি","অনুমোদিত"].map(c=><button key={c} className="px-5 py-2 rounded-full border-2 border-black font-bold whitespace-nowrap bg-black text-white">{c}</button>)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {all.map(p=>(
            <div key={p.id} className="bg-white border-2 border-black rounded-[20px] overflow-hidden shadow-[4px_4px_0px_0px_black] hover:translate-y-[-2px] transition">
              <div className="bg-[#f8f8f8] h-44 flex items-center justify-center font-black text-xl relative">
                {p.title}
                <span className="absolute top-2 left-2 bg-black text-white text-[9px] px-2 py-1 rounded-full">{p.id}</span>
                {approved.find(a=>a.id===p.id) && <span className="absolute top-2 right-2 bg-green-400 text-black text-[9px] px-2 py-1 rounded-full font-black">NEW</span>}
              </div>
              <div className="p-3">
                <div className="font-black">{p.title}</div>
                <div className="flex justify-between items-center mt-1"><span className="font-black text-lg">{p.price}৳</span><span className="text-xs bg-gray-100 px-2 py-1 rounded-full border">{p.cat}</span></div>
                <button className="w-full mt-3 bg-black text-white py-2 rounded-full font-bold text-sm">কার্টে যোগ করুন</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
