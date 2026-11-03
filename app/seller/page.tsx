"use client";
import { useState, useEffect } from "react";
export default function SellerPage(){
  const [products,setProducts]=useState<any[]>([]);
  const [name,setName]=useState("");const [price,setPrice]=useState("");const [cat,setCat]=useState("মহিলা");
  useEffect(()=>{setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]"))},[]);
  const upload=()=>{
    if(!name||!price) return alert("নাম ও দাম দিন");
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const newP={id:`SHOP-01-${String(all.length+1).padStart(3,"0")}`,title:name,price,cat,shop:"SHOP-01",approveStatus:"pending",image:"https://via.placeholder.com/300"};
    const up=[newP,...all];localStorage.setItem("gausia_all_products",JSON.stringify(up));setProducts(up);setName("");setPrice("");alert("আপলোড হয়েছে!");
  };
  return(
    <div className="min-h-screen bg-[#fdf6ee] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[380px_1fr] gap-8">
        <div className="bg-white rounded-[24px] border-[2px] border-black p-6 h-fit shadow-[6px_6px_0px_0px_black]">
          <h2 className="text-[22px] font-black">নতুন পণ্য আপলোড</h2><p className="text-sm bg-black text-white inline-block px-3 py-1 rounded-full mt-1">SHOP-01</p>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="পণ্যের নাম যেমন Sari" className="w-full mt-5 border-2 border-black rounded-xl p-3 outline-none"/>
          <select value={cat} onChange={e=>setCat(e.target.value)} className="w-full mt-3 border-2 border-black rounded-xl p-3"><option>মহিলা</option><option>পুরুষ</option><option>মেয়ে</option><option>ছেলে</option><option>বেবি</option></select>
          <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="দাম - 5000" className="w-full mt-3 border-2 border-black rounded-xl p-3 outline-none"/>
          <button onClick={upload} className="w-full mt-5 bg-black text-white py-3 rounded-full font-black text-[16px] hover:scale-[1.02] transition">আপলোড করুন +</button>
        </div>
        <div>
          <h3 className="text-2xl font-black">আমার আপলোড ({products.length} টি)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {products.map(p=>(
              <div key={p.id} className="bg-white border-2 border-black rounded-2xl p-3">
                <div className="bg-[#f3f3f3] h-32 rounded-xl flex items-center justify-center font-black">{p.title}</div>
                <div className="text-[10px] bg-black text-white px-2 py-1 rounded-full inline-block mt-2">{p.id}</div>
                <div className="font-black mt-1">{p.title} - {p.price}৳</div>
                <div className={`text-xs mt-1 px-2 py-1 rounded-full text-center font-bold ${p.approveStatus==="approved"?"bg-green-200":p.approveStatus==="pending"?"bg-yellow-200":"bg-red-200"}`}>{p.approveStatus}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
