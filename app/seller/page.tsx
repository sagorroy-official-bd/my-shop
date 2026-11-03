"use client";
import { useState, useEffect } from "react";
export default function SellerFixed(){
  const [shopCode,setShopCode]=useState("SHOP-01");
  const [shopName,setShopName]=useState("");
  const [address,setAddress]=useState("");
  const [phone,setPhone]=useState("");
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [comment,setComment]=useState("");
  const [image,setImage]=useState("");
  const [myProducts,setMyProducts]=useState<any[]>([]);

  // প্রত্যেক দোকানের তথ্য আলাদা আলাদা সেভ থাকবে - মিশবে না
  useEffect(()=>{
    loadShopInfo(shopCode);
    const all=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    setMyProducts(all.filter((p:any)=>p.shop===shopCode));
  },[shopCode]);

  const loadShopInfo=(code:string)=>{
    const allInfos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
    const info=allInfos[code];
    if(info){ setShopName(info.shopName||""); setAddress(info.address||""); setPhone(info.phone||""); }
    else { setShopName(""); setAddress(""); setPhone(""); }
    const all=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    setMyProducts(all.filter((p:any)=>p.shop===code));
  };

  const handleImage=(e:any)=>{ const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>setImage(r.result as string); r.readAsDataURL(f); };

  const send=()=>{
    if(!shopName||!title||!price){ alert("দোকানের নাম, পণ্যের নাম, দাম লিখুন"); return; }
    // দোকানের তথ্য ফিক্স করে সেভ - আলাদা ভাবে
    const allInfos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
    allInfos[shopCode]={shopName,address,phone,updatedAt:new Date().toLocaleString()};
    localStorage.setItem("gausia_all_shop_infos",JSON.stringify(allInfos));

    // দোকান লিস্টে Add - পর্যায়ক্রমে বাড়বে
    const shops=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
    let updatedShops=shops;
    if(!shops.includes(shopCode)){ updatedShops=[...shops,shopCode].sort(); localStorage.setItem("gausia_all_shops",JSON.stringify(updatedShops)); }

    const product={id:`${shopCode}-${Date.now().toString().slice(-5)}`,shop:shopCode,shopName,address,phone,title,price:parseInt(price),comment,image:image||`https://picsum.photos/seed/${Date.now()}/400/400`,status:"pending",createdAt:new Date().toLocaleString("bn-BD")};
    const existing=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    const updated=[...existing,product];
    localStorage.setItem("gausia_seller_pending",JSON.stringify(updated));
    setMyProducts(updated.filter((p:any)=>p.shop===shopCode));
    alert(`✅ ${shopCode} - ${shopName} এর পণ্য Admin এ গেছে! এই দোকানের তথ্য ফিক্স থাকবে`);
    setTitle("");setPrice("");setComment("");setImage("");
  };

  return(
    <div className="min-h-screen bg-[#f9f5f0] p-4">
      <div className="max-w-xl mx-auto bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_black]">
        <h1 className="font-black text-lg">Seller - পণ্য পাঠান</h1>
        <div className="text-[11px] text-gray-500 mt-1">দোকান ফিক্স থাকবে, এক দোকানের সাথে অন্য দোকান মিশবে না, সব আলাদা Admin এ যাবে</div>
        
        <div className="mt-4 space-y-3">
          <select value={shopCode} onChange={e=>{setShopCode(e.target.value); loadShopInfo(e.target.value);}} className="w-full border-2 border-black rounded-full px-4 py-3 text-sm font-bold bg-yellow-50">
            {Array.from({length:100}).map((_,i)=>{const s=`SHOP-${String(i+1).padStart(2,"0")}`;return <option key={s} value={s}>{s} - {s}</option>})}
          </select>
          
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-3">
            <div className="text-[11px] font-black">🏪 {shopCode} এর তথ্য (ফিক্স থাকবে)</div>
            <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="দোকানের নাম - যেমন: গাউছিয়া কালেকশন" className="w-full border-2 border-black rounded-full px-4 py-2.5 text-sm mt-2 font-bold"/>
            <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="ঠিকানা - যেমন: গাউছিয়া মার্কেট" className="w-full border-2 border-black rounded-full px-4 py-2.5 text-sm mt-2"/>
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="মোবাইল" className="w-full border-2 border-black rounded-full px-4 py-2.5 text-sm mt-2"/>
            <div className="text-[10px] text-orange-700 mt-2">⚠️ একবার লিখলে {shopCode} এর জন্য ফিক্স থাকবে, অন্য দোকানে যাবে না</div>
          </div>

          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="পণ্যের নাম" className="w-full border-2 border-black rounded-full px-4 py-2.5 text-sm"/>
          <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="দাম" className="w-full border-2 border-black rounded-full px-4 py-2.5 text-sm"/>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="মন্তব্য / Comment" className="w-full border-2 border-black rounded-2xl px-4 py-2.5 text-sm h-16"/>
          <input type="file" accept="image/*" onChange={handleImage} className="w-full border-2 border-dashed rounded-full px-4 py-2.5 text-sm"/>
          {image && <img src={image} className="w-full h-32 object-cover rounded-xl border-2 border-black"/>}

          <button onClick={send} className="w-full bg-black text-white py-3 rounded-full font-black text-sm border-2 border-black">Admin এ পাঠান → {shopCode}</button>
          
          <div className="mt-4 border-t-2 border-dashed pt-3">
            <div className="font-black text-xs">{shopCode} - {shopName||"নাম নেই"} এর পণ্য ({myProducts.length} টা) - আলাদা</div>
            <div className="mt-2 space-y-2 max-h-[300px] overflow-auto">
              {myProducts.map((p:any)=><div key={p.id} className="border border-black rounded-xl p-2 flex gap-2"><img src={p.image} className="w-12 h-12 rounded object-cover"/><div className="text-[11px]"><div className="font-bold">{p.title} - {p.price}৳</div><div>{p.shopName}</div></div></div>)}
              {myProducts.length===0 && <div className="text-[11px] text-gray-500">এই দোকানে এখনো কোনো পণ্য নেই</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
