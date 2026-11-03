"use client";
import { useState, useEffect } from "react";

export default function SellerPage(){
  const [shopCode,setShopCode]=useState("SHOP-01");
  const [shopName,setShopName]=useState("");
  const [address,setAddress]=useState("");
  const [phone,setPhone]=useState("");
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [comment,setComment]=useState("");
  const [images,setImages]=useState<string[]>([]);
  const [drafts,setDrafts]=useState<any[]>([]);
  const [editId,setEditId]=useState<number|null>(null);

  useEffect(()=>{
    if(typeof window==="undefined") return;
    try{
      const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
      if(infos[shopCode]){ setShopName(infos[shopCode].shopName||""); setAddress(infos[shopCode].address||""); setPhone(infos[shopCode].phone||""); }
      else { setShopName(""); setAddress(""); setPhone(""); }
      const d=JSON.parse(localStorage.getItem("gausia_draft_"+shopCode)||"[]");
      setDrafts(d);
    }catch{}
  },[shopCode]);

  const onFiles=(e:any)=>{
    const files=Array.from(e.target.files||[]) as File[];
    if(images.length+files.length>5){ alert("সর্বোচ্চ ৫টা ছবি"); return; }
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
    const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
    infos[shopCode]={shopName,address,phone};
    localStorage.setItem("gausia_all_shop_infos",JSON.stringify(infos));
    const shops=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
    if(!shops.includes(shopCode)) localStorage.setItem("gausia_all_shops",JSON.stringify([...shops,shopCode].sort()));

    const item={id:editId!==null?drafts[editId].id:Date.now(),shop:shopCode,shopName,address,phone,title,price,comment,images,main:images[0],createdAt:new Date().toLocaleString("bn-BD")};
    let up=[...drafts];
    if(editId!==null){ up[editId]=item; setEditId(null); } else { up=[item,...up]; }
    setDrafts(up);
    localStorage.setItem("gausia_draft_"+shopCode,JSON.stringify(up));
    setTitle(""); setPrice(""); setComment(""); setImages([]);
  };

  const sendAll=()=>{
    if(drafts.length===0){ alert("প্রিভিউ নেই"); return; }
    if(!confirm(`${drafts.length} টা Admin এ পাঠাবেন? পাঠানোর পর এখানে খালি হয়ে যাবে`)) return;
    try{
      const old=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
      const toSave=drafts.map((d:any)=>({...d,status:"pending",image:d.main}));
      localStorage.setItem("gausia_seller_pending",JSON.stringify([...old,...toSave]));
    }catch{}
    localStorage.removeItem("gausia_draft_"+shopCode);
    setDrafts([]); setImages([]); setTitle(""); setPrice(""); setComment(""); setEditId(null);
    alert("✅ Admin এ গেছে! এখন খালি হয়ে গেছে");
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-indigo-50 p-3 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Fantastic */}
        <div className="bg-white/90 backdrop-blur-xl border-2 border-black rounded-[24px] shadow-[6px_6px_0px_black] p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">G</div>
            <div><div className="font-black text-[15px] tracking-wide">GAUSIA SELLER STUDIO</div><div className="text-[11px] text-gray-500 font-bold">Permanent Shop • 5 Pics Folder • Fantastic Look</div></div>
          </div>
          <div className="bg-black text-white px-4 py-2 rounded-full text-[12px] font-black">{shopCode} • {images.length}/5 Pics</div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-5">
          {/* LEFT FORM - Permanent Address */}
          <div className="bg-white rounded-[24px] border-2 border-black shadow-[6px_6px_0px_black] p-5">
            <div className="flex items-center gap-2"><span className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white">🏪</span><h2 className="font-black text-[13px]">দোকানের স্থায়ী ঠিকানা (ফিক্স থাকবে)</h2></div>
            <select value={shopCode} onChange={e=>setShopCode(e.target.value)} className="w-full mt-3 border-2 border-black bg-yellow-50 rounded-full px-5 py-3 text-sm font-black outline-none">
              {Array.from({length:30}).map((_,i)=>{const s=`SHOP-${String(i+1).padStart(2,"0")}`; return <option key={s} value={s}>✨ {s}</option>})}
            </select>
            <div className="mt-4 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-[20px] p-4">
              <div className="text-[11px] font-black text-orange-800">🏪 {shopCode} এর স্থায়ী তথ্য - একবার লিখলে ফিক্স</div>
              <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="🏬 দোকানের নাম - গাউছিয়া কালেকশন" className="w-full mt-3 border-2 border-black bg-white rounded-full px-5 py-3 text-sm font-bold outline-none focus:border-orange-500"/>
              <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="🗺️ স্থায়ী ঠিকানা - গাউছিয়া মার্কেট, ২য় তলা" className="w-full mt-2.5 border-2 border-black bg-white rounded-full px-5 py-3 text-sm outline-none focus:border-orange-500"/>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="📞 মোবাইল - 017XX-XXXXXX" className="w-full mt-2.5 border-2 border-black bg-white rounded-full px-5 py-3 text-sm outline-none focus:border-orange-500"/>
              <div className="text-[10px] text-orange-700 font-bold mt-2">⚠️ এই তথ্য {shopCode} এর জন্য স্থায়ীভাবে সেভ থাকবে, অন্য দোকানে যাবে না</div>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3"><span className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white">📦</span><h2 className="font-black text-[13px]">পণ্য + ৫ ছবি এক ফোল্ডারে</h2></div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="✨ Lal sari" className="w-full border-2 border-black bg-gray-50 rounded-full px-5 py-3 text-sm font-bold outline-none focus:bg-white"/>
              <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="💰 500" className="w-full mt-2.5 border-2 border-black bg-gray-50 rounded-full px-5 py-3 text-sm outline-none focus:bg-white"/>
              <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="💬 Ind / Ban" className="w-full mt-2.5 border-2 border-black bg-gray-50 rounded-full px-5 py-3 text-sm outline-none focus:bg-white"/>

              <div className="mt-4 bg-gradient-to-br from-violet-50 to-indigo-50 border-2 border-dashed border-violet-400 rounded-[20px] p-4">
                <div className="text-[12px] font-black text-violet-800">📁 একই ফোল্ডার থেকে ৫টা ছবি একসাথে - Ctrl+A দিয়ে সিলেক্ট</div>
                <label className="mt-3 flex items-center justify-center w-full bg-black text-white py-3.5 rounded-full font-black text-sm cursor-pointer shadow-[0_4px_0px_#000] active:translate-y-1 active:shadow-none">
                  📁 ফোল্ডার থেকে ৫টা সিলেক্ট করুন ({images.length}/5)
                  <input type="file" accept="image/*" multiple onChange={onFiles} className="hidden"/>
                </label>
                {images.length>0 && (
                  <>
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {images.map((im,i)=><div key={i} className="relative"><img src={im} alt="" className="w-full h-[70px] object-cover rounded-xl border-2 border-black"/><button onClick={()=>setImages(p=>p.filter((_,idx)=>idx!==i))} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-[11px] font-black border-2 border-black">X</button><div className="absolute bottom-1 left-1 bg-black text-white text-[9px] px-1.5 rounded-full">{i+1}</div>{i===0 && <div className="absolute top-1 left-1 bg-yellow-400 text-black text-[8px] px-1 rounded-full font-black">Main</div>}</div>)}
                    </div>
                    <div className="flex gap-2 mt-3"><label className="flex-1 bg-white border-2 border-black py-2.5 rounded-full text-[11px] font-black text-center cursor-pointer">➕ আরো Add<input type="file" accept="image/*" multiple onChange={onFiles} className="hidden"/></label><button onClick={()=>setImages([])} className="flex-1 bg-red-50 border-2 border-black py-2.5 rounded-full text-[11px] font-black text-red-600">🗑️ সব ডিলিট</button></div>
                  </>
                )}
              </div>
            </div>

            <button onClick={saveDraft} className={`w-full mt-5 py-4 rounded-full font-black text-sm border-2 border-black shadow-[0_5px_0px_black] active:shadow-none active:translate-y-1 ${editId!==null?"bg-yellow-400":"bg-black text-white"}`}>{editId!==null?`✏️ আপডেট করুন - ${images.length} ছবি`:`➕ প্রিভিউতে যোগ করুন - ${images.length} ছবি এক ফোল্ডারে`}</button>
          </div>

          {/* RIGHT REVIEW */}
          <div className="bg-white rounded-[24px] border-2 border-black shadow-[6px_6px_0px_black] p-5">
            <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white">👁️</span><h2 className="font-black text-[13px]">প্রোডাক্ট রিভিউ - চেক করে পাঠান</h2></div><span className="bg-black text-white px-3 py-1 rounded-full text-[11px] font-black">{drafts.length} টা</span></div>

            {images.length>0 && (
              <div className="mt-4 border-2 border-dashed border-violet-300 bg-violet-50 rounded-[20px] p-3">
                <div className="text-[10px] font-black text-violet-700">🔴 LIVE REVIEW - {images.length} ছবি এক ফোল্ডারে</div>
                <div className="mt-2 bg-white rounded-[16px] border-2 border-black overflow-hidden shadow-[0_4px_0px_black]">
                  <div className="relative"><img src={images[0]} alt="" className="w-full h-44 object-cover"/><div className="absolute bottom-2 left-2 right-2 flex gap-1.5"><div className="flex gap-1.5 bg-black/70 backdrop-blur p-1.5 rounded-full">{images.map((im,i)=><img key={i} src={im} alt="" className={`w-10 h-10 rounded-full border-2 object-cover ${i===0?"border-yellow-400":"border-white"}`}/>)}</div></div><div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 rounded-full font-black">{images.length} Pics Folder</div></div>
                  <div className="p-3"><div className="font-black text-sm">{title||"Lal sari"} - {price||500}৳</div><div className="text-[11px] text-gray-600 mt-1">🏪 {shopName||shopCode} • {address} • {phone}</div><div className="text-[10px] mt-2 bg-orange-100 border px-2 py-1 rounded-full w-fit">💬 {comment||"Ind"}</div></div>
                </div>
              </div>
            )}

            <div className="mt-4 space-y-3 max-h-[550px] overflow-auto">
              {drafts.map((p:any,i:number)=>(
                <div key={p.id} className="border-2 border-black rounded-[18px] p-3 shadow-[0_4px_0px_black] bg-gradient-to-br from-white to-gray-50">
                  <div className="flex gap-3"><div className="relative"><img src={p.main} alt="" className="w-20 h-20 rounded-xl border-2 border-black object-cover"/><div className="absolute -top-1 -right-1 bg-black text-white text-[9px] px-1.5 py-0.5 rounded-full font-black">{p.images.length} Pics</div></div><div className="flex-1"><div className="font-black text-xs">{p.title} - {p.price}৳</div><div className="text-[11px] text-gray-700">🏪 {p.shopName}</div><div className="text-[10px] text-gray-500">🗺️ {p.address}</div><div className="flex gap-1 mt-1 flex-wrap">{p.images.slice(0,5).map((im:string,k:number)=><img key={k} src={im} alt="" className="w-6 h-6 rounded border-2 border-black object-cover"/>)}</div><div className="text-[10px] mt-1 bg-yellow-100 px-2 py-0.5 rounded-full w-fit">📂 {p.images.length} Pics এক ফোল্ডারে</div></div></div>
                  <div className="flex gap-2 mt-3"><button onClick={()=>{setShopCode(p.shop); setShopName(p.shopName); setAddress(p.address); setPhone(p.phone); setTitle(p.title); setPrice(String(p.price)); setComment(p.comment); setImages(p.images); setEditId(i); window.scrollTo({top:0,behavior:"smooth"});}} className="flex-1 bg-yellow-300 border-2 border-black rounded-full py-2 text-[11px] font-black">✏️ Edit</button><button onClick={()=>{if(confirm("Delete?")){ const up=drafts.filter((_,idx)=>idx!==i); setDrafts(up); localStorage.setItem("gausia_draft_"+shopCode,JSON.stringify(up));}}} className="flex-1 bg-white border-2 border-black rounded-full py-2 text-[11px] font-black">🗑️ Delete</button></div>
                </div>
              ))}
              {drafts.length===0 && <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-[18px]"><div className="text-3xl">📁</div><div className="text-xs text-gray-500 mt-2 font-bold">একই ফোল্ডার থেকে ৫টা ছবি সিলেক্ট করুন<br/>প্রিভিউতে ৫টাই একসাথে দেখা যাবে<br/>তারপর Admin এ পাঠান</div></div>}
            </div>

            {drafts.length>0 && <button onClick={sendAll} className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-teal-600 border-2 border-black text-white py-4 rounded-full font-black text-sm shadow-[0_5px_0px_black] active:shadow-none active:translate-y-1">🚀 Send Admin - {drafts.length} টা পাঠান (পাঠানোর পর খালি)</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
