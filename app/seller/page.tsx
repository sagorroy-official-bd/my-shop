"use client";
import { useState, useEffect } from "react";
export default function Seller(){
  const [title,setTitle]=useState(""); const [price,setPrice]=useState(""); const [image,setImage]=useState(""); const [list,setList]=useState<any[]>([]);
  useEffect(()=>{ setList(JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]")); },[]);
  const add=()=>{
    if(!title||!price||!image){ alert("Title, Price, Image দিন"); return; }
    const n={id:Date.now(),title,price,image,images:[image],createdAt:new Date().toLocaleString()};
    const up=[n,...list]; setList(up); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); alert("Seller থেকে Admin এ গেছে");
    setTitle(""); setPrice(""); setImage("");
  };
  return(
    <div className="min-h-screen bg-white">
      <div className="bg-blue-600 text-white p-3 text-center font-black text-lg">🔵 SELLER v7 - {list.length}টি পাঠানো - শুধু /seller এ থাকবে</div>
      <div className="max-w-md mx-auto p-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="পণ্যের নাম" className="w-full border rounded-full px-4 py-2 mt-4"/>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="দাম" className="w-full border rounded-full px-4 py-2 mt-2"/>
        <input value={image} onChange={e=>setImage(e.target.value)} placeholder="ছবির লিংক https://" className="w-full border rounded-full px-4 py-2 mt-2"/>
        <button onClick={add} className="w-full mt-3 bg-blue-600 text-white rounded-full py-2 font-bold">Admin এ পাঠান</button>
        <div className="grid grid-cols-2 gap-2 mt-6">{list.map((x:any)=><div key={x.id} className="border p-2 rounded"><img src={x.image} className="w-full h-24 object-cover rounded"/><div className="text-xs mt-1">{x.title} - {x.price}৳</div></div>)}</div>
      </div>
    </div>
  );
}
