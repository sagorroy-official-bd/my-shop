"use client";
import { useState } from "react";
export default function Seller(){
  const [shopCode,setShopCode]=useState("SHOP-01");
  const [shopName,setShopName]=useState("");
  const [address,setAddress]=useState("");
  const [phone,setPhone]=useState("");
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [comment,setComment]=useState("");
  const [images,setImages]=useState<string[]>([]);
  const [drafts,setDrafts]=useState<any[]>([]);
  const [editIndex,setEditIndex]=useState<number|null>(null);

  const loadShop=(code:string)=>{
    setShopCode(code);
    try{
      const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
      if(infos[code]){ setShopName(infos[code].shopName||""); setAddress(infos[code].address||""); setPhone(infos[code].phone||""); }
      else { setShopName(""); setAddress(""); setPhone(""); }
      const d=JSON.parse(localStorage.getItem("gausia_draft_"+code)||"[]");
      setDrafts(d);
    }catch{}
  };
  const onFiles=(e:any)=>{
    const files=Array.from(e.target.files||[]) as File[];
    if(images.length+files.length>5){ alert("সর্বোচ্চ ৫টা"); return; }
    files.forEach((f:File)=>{
      const r=new FileReader();
      r.onload=()=>{ if(typeof r.result==="string") setImages(p=>[...p,r.result as string].slice(0,5)); };
      r.readAsDataURL(f);
    });
    e.target.value="";
  };
  const saveDraft=()=>{
    if(!shopName||!title||!price){ alert("দোকানের নাম, পণ্যের নাম, দাম লিখুন"); return; }
    if(images.length===0){ alert("১টা ছবি দিন"); return; }
    try{
      const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
      infos[shopCode]={shopName,address,phone};
      localStorage.setItem("gausia_all_shop_infos",JSON.stringify(infos));
      const shops=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
      if(!shops.includes(shopCode)) localStorage.setItem("gausia_all_shops",JSON.stringify([...shops,shopCode].sort()));
    }catch{}
    const item={id:editIndex!==null?drafts[editIndex].id:Date.now(),shop:shopCode,shopName,address,phone,title,price,comment,images,main:images[0]};
    let up=[...drafts];
    if(editIndex!==null){ up[editIndex]=item; setEditIndex(null); } else { up=[item,...up]; }
    setDrafts(up);
    try{ localStorage.setItem("gausia_draft_"+shopCode,JSON.stringify(up)); }catch{}
    setTitle(""); setPrice(""); setComment(""); setImages([]);
  };
  const sendAll=()=>{
    if(drafts.length===0){ alert("প্রিভিউ নেই"); return; }
    if(!confirm(drafts.length+" টা Admin এ পাঠাবেন?")) return;
    try{
      const old=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
      const toSave=drafts.map((d:any)=>({...d,status:"pending",image:d.main}));
      localStorage.setItem("gausia_seller_pending",JSON.stringify([...old,...toSave]));
      localStorage.removeItem("gausia_draft_"+shopCode);
    }catch{}
    setDrafts([]); setImages([]); alert("✅ Admin এ গেছে! এখন খালি");
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-indigo-50 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border-2 border-black rounded-[24px] shadow-[6px_6px_0px_black] p-4 flex justify-between"><div className="flex gap-3 items-center"><div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-black">G</div><div><div className="font-black">GAUSIA SELLER</div><div className="text-[11px] text-gray-500 font-bold">Permanent • 5 Pics • Colorful</div></div></div><div className="bg-black text-white px-4 py-2 rounded-full text-xs font-black">{shopCode} {images.length}/5</div></div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white border-2 border-black rounded-[24px] shadow-[6px_6px_0px_black] p-5">
            <div className="font-black text-[13px]">🏪 দোকানের স্থায়ী ঠিকানা (ফিক্স)</div>
            <select value={shopCode} onChange={e=>loadShop(e.target.value)} className="w-full mt-3 border-2 border-black bg-yellow-50 rounded-full px-4 py-3 text-sm font-black">{Array.from({length:30}).map((_,i)=>{const s=`SHOP-${String(i+1).padStart(2,"0")}`; return <option key={s} value={s}>{s}</option>})}</select>
            <div className="mt-3 bg-orange-50 border-2 border-orange-200 rounded-[20px] p-3">
              <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="🏬 দোকানের নাম" className="w-full border-2 border-black rounded-full px-4 py-2.5 text-sm font-bold"/>
              <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="🗺️ স্থায়ী ঠিকানা" className="w-full mt-2 border-2 border-black rounded-full px-4 py-2.5 text-sm"/>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="📞 মোবাইল" className="w-full mt-2 border-2 border-black rounded-full px-4 py-2.5 text-sm"/>
              <div className="text-[10px] font-bold text-orange-700 mt-1">এই দোকানের জন্য স্থায়ী সেভ থাকবে</div>
            </div>
            <div className="mt-4"><div className="font-black text-[13px]">📦 পণ্য + ৫ ছবি এক ফোল্ডারে</div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="✨ Lal sari" className="w-full mt-2 border-2 border-black bg-gray-50 rounded-full px-4 py-3 text-sm font-bold"/>
              <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="💰 500" className="w-full mt-2 border-2 border-black bg-gray-50 rounded-full px-4 py-3 text-sm"/>
              <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="💬 Ind / Ban" className="w-full mt-2 border-2 border-black bg-gray-50 rounded-full px-4 py-3 text-sm"/>
              <div className="mt-3 bg-violet-50 border-2 border-dashed border-violet-400 rounded-[20px] p-3">
                <div className="text-[12px] font-black text-violet-800">📁 একই ফোল্ডার থেকে ৫টা ছবি একসাথে - Ctrl+A</div>
                <label className="mt-2 block bg-black text-white py-3 rounded-full text-center font-black text-sm cursor-pointer">📁 ফোল্ডার থেকে ৫টা সিলেক্ট ({images.length}/5)<input type="file" accept="image/*" multiple onChange={onFiles} className="hidden"/></label>
                <div className="grid grid-cols-4 gap-2 mt-2">{images.map((im,i)=><div key={i} className="relative"><img src={im} alt="" className="w-full h-[65px] object-cover rounded-xl border-2 border-black"/><button onClick={()=>setImages(p=>p.filter((_,idx)=>idx!==i))} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs border-2 border-black">X</button></div>)}</div>
                {images.length>0 && <div className="flex gap-2 mt-2"><label className="flex-1 bg-white border-2 border-black py-2 rounded-full text-[11px] font-black text-center cursor-pointer">➕ আরো Add<input type="file" accept="image/*" multiple onChange={onFiles} className="hidden"/></label><button onClick={()=>setImages([])} className="flex-1 bg-red-50 border-2 border-black py-2 rounded-full text-[11px] font-black">🗑️ সব ডিলিট</button></div>}
              </div>
              <button onClick={saveDraft} className={`w-full mt-4 py-3 rounded-full font-black border-2 border-black shadow-[0_4px_0px_black] ${editIndex!==null?"bg-yellow-400":"bg-black text-white"}`}>{editIndex!==null?"✏️ আপডেট":"➕ প্রিভিউতে যোগ করুন - "+images.length+" ছবি"}</button>
            </div>
          </div>
          <div className="bg-white border-2 border-black rounded-[24px] shadow-[6px_6px_0px_black] p-5">
            <div className="flex justify-between"><div className="font-black text-[13px]">👁️ প্রোডাক্ট রিভিউ + Edit/Delete/Send</div><span className="bg-black text-white px-3 py-1 rounded-full text-[11px] font-black">{drafts.length}</span></div>
            {images.length>0 && <div className="mt-3 border-2 border-black rounded-[16px] overflow-hidden"><img src={images[0]} alt="" className="w-full h-36 object-cover"/><div className="flex gap-1 p-2 bg-gray-100">{images.map((im,i)=><img key={i} src={im} alt="" className="w-8 h-8 rounded border-2 border-black"/>)}</div><div className="p-2 font-black text-sm">{title||"Lal sari"} - {price||500}৳<div className="text-[11px] font-normal text-gray-600">🏪 {shopName||shopCode} • {address}</div></div></div>}
            <div className="mt-3 space-y-2 max-h-[500px] overflow-auto">
              {drafts.map((d:any,i:number)=><div key={d.id} className="border-2 border-black rounded-[14px] p-2"><div className="flex gap-2"><img src={d.main} alt="" className="w-16 h-16 rounded-lg border-2 border-black object-cover"/><div><div className="font-black text-xs">{d.title} - {d.price}৳</div><div className="text-[10px]">🏪 {d.shopName}</div><div className="text-[10px]">🗺️ {d.address}</div><div className="flex gap-1 mt-1">{d.images.slice(0,5).map((im:string,k:number)=><img key={k} src={im} alt="" className="w-5 h-5 rounded border"/>)}</div></div></div><div className="flex gap-2 mt-2"><button onClick={()=>{setShopCode(d.shop); setShopName(d.shopName); setAddress(d.address); setPhone(d.phone); setTitle(d.title); setPrice(String(d.price)); setComment(d.comment); setImages(d.images); setEditIndex(i);}} className="flex-1 bg-yellow-300 border-2 border-black rounded-full py-1.5 text-[11px] font-black">✏️ Edit</button><button onClick={()=>{ const up=drafts.filter((_,idx)=>idx!==i); setDrafts(up); try{ localStorage.setItem("gausia_draft_"+shopCode,JSON.stringify(up)); }catch{} }} className="flex-1 bg-white border-2 border-black rounded-full py-1.5 text-[11px] font-black">🗑️ Delete</button></div></div>)}
            </div>
            {drafts.length>0 && <button onClick={sendAll} className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 border-2 border-black text-white py-3 rounded-full font-black text-sm shadow-[0_4px_0px_black]">🚀 Send Admin - {drafts.length} টা পাঠান</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
