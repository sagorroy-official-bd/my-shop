"use client";
import { useState } from "react";
export default function Seller(){
  const [title,setTitle]=useState("");const [price,setPrice]=useState("");const [district,setDistrict]=useState("");const [shop,setShop]=useState("SHOP-01");const [image,setImage]=useState("");

  const handleImage=(e:any)=>{ const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>setImage(r.result as string); r.readAsDataURL(f); };

  const sendToAdmin=()=>{
    if(!title||!price||!district){ alert("শিরোনাম, দাম, জেলা লিখুন"); return; }
    const id=`${shop}-${Date.now().toString().slice(-4)}`;
    const product={id,shop,seller:shop,title,price:parseInt(price),district,note:district,image:image||`https://picsum.photos/seed/${Date.now()}/400/400`,status:"pending"};
    const existing=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    const updated=[...existing,product];
    localStorage.setItem("gausia_seller_pending",JSON.stringify(updated));
    alert("✅ Admin এ পাঠানো হয়েছে! Admin Page এ গিয়ে দেখুন");
    setTitle("");setPrice("");setDistrict("");
  };

  return(
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_black]">
        <h1 className="font-black text-xl">Seller Page - নতুন পণ্য পাঠান</h1>
        <div className="mt-4 space-y-3">
          <select value={shop} onChange={e=>setShop(e.target.value)} className="w-full border-2 rounded-full px-4 py-3 text-sm bg-orange-50">
            {Array.from({length:100}).map((_,i)=>{const s=`SHOP-${String(i+1).padStart(2,"0")}`;return <option key={s} value={s}>{s}</option>})}
          </select>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="পণ্যের নাম - যেমন: Sari - 700৳" className="w-full border-2 rounded-full px-4 py-3 text-sm"/>
          <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="দাম - যেমন: 700" className="w-full border-2 rounded-full px-4 py-3 text-sm"/>
          <input value={district} onChange={e=>setDistrict(e.target.value)} placeholder="জেলা - যেমন: ঢাকা, রংপুর" className="w-full border-2 rounded-full px-4 py-3 text-sm bg-yellow-50"/>
          <input type="file" accept="image/*" onChange={handleImage} className="w-full border-2 border-dashed rounded-full px-4 py-3 text-sm"/>
          {image && <img src={image} className="w-full h-40 object-cover rounded-xl border"/>}
          <button onClick={sendToAdmin} className="w-full bg-black text-white py-3 rounded-full font-black text-sm">Admin এ পাঠান →</button>
          <div className="flex gap-2"><a href="/admin" className="flex-1 text-center border-2 border-black py-2 rounded-full text-xs font-bold">Admin দেখুন</a><a href="/" className="flex-1 text-center bg-yellow-400 border-2 border-black py-2 rounded-full text-xs font-bold">Customer দেখুন</a></div>
        </div>
      </div>
    </div>
  )
}
