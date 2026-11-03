"use client";
import { useState, useEffect } from "react";
export default function Seller5Pics(){
  const [shopCode,setShopCode]=useState("SHOP-01");
  const [shopName,setShopName]=useState(""); const [address,setAddress]=useState(""); const [phone,setPhone]=useState("");
  const [title,setTitle]=useState(""); const [price,setPrice]=useState(""); const [comment,setComment]=useState("");
  const [images,setImages]=useState<string[]>([]); const [drafts,setDrafts]=useState<any[]>([]); const [editIndex,setEditIndex]=useState<number|null>(null);

  useEffect(()=>{
    const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
    if(infos[shopCode]){ setShopName(infos[shopCode].shopName||""); setAddress(infos[shopCode].address||""); setPhone(infos[shopCode].phone||""); }
    const d=JSON.parse(localStorage.getItem(`gausia_draft_${shopCode}`)||"[]"); setDrafts(d);
  },[shopCode]);

  const handleImgs=(e:any)=>{
    const files=Array.from(e.target.files as FileList).slice(0,5);
    if(images.length+files.length>5){ alert("⚠️ সর্বোচ্চ ৫টা ছবি দিতে পারবেন"); return; }
    files.forEach((f:any)=>{ const r=new FileReader(); r.onload=()=>setImages(prev=>[...prev,r.result as string].slice(0,5)); r.readAsDataURL(f); });
  };
  const removeImg=(idx:number)=>{ setImages(prev=>prev.filter((_,i)=>i!==idx)); };

  const saveDraft=()=>{
    if(!shopName||!title||!price){ alert("⚠️ দোকানের নাম, পণ্যের নাম, দাম লিখুন"); return; }
    if(images.length===0){ alert("⚠️ কমপক্ষে ১টা ছবি দিন"); return; }
    const item={id:editIndex!==null?drafts[editIndex].id:`${shopCode}-${Date.now().toString().slice(-5)}`,shop:shopCode,shopName,address,phone,title,price:parseInt(price),comment,images,mainImage:images[0],createdAt:new Date().toLocaleString("bn-BD")};
    let up=[...drafts]; if(editIndex!==null){ up[editIndex]=item; setEditIndex(null);} else { up=[item,...up];}
    setDrafts(up); localStorage.setItem(`gausia_draft_${shopCode}`,JSON.stringify(up));
    const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}"); infos[shopCode]={shopName,address,phone}; localStorage.setItem("gausia_all_shop_infos",JSON.stringify(infos));
    const shops=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]"); if(!shops.includes(shopCode)) localStorage.setItem("gausia_all_shops",JSON.stringify([...shops,shopCode].sort()));
    setTitle(""); setPrice(""); setComment(""); setImages([]); 
  };

  const editDraft=(i:number)=>{ const d=drafts[i]; setTitle(d.title); setPrice(String(d.price)); setComment(d.comment); setImages(d.images||[d.mainImage||d.image]); setEditIndex(i); window.scrollTo({top:0,behavior:"smooth"}); };
  const deleteDraft=(i:number)=>{ if(!confirm("🗑️ প্রিভিউ ডিলিট?"))return; const up=drafts.filter((_,idx)=>idx!==i); setDrafts(up); localStorage.setItem(`gausia_draft_${shopCode}`,JSON.stringify(up)); };
  
  const sendAllToAdmin=()=>{
    if(drafts.length===0){alert("কোনো প্রিভিউ নেই");return;} if(!confirm(`${drafts.length} টা পণ্য Admin এ পাঠাবেন? পাঠানোর পর এখানে আর কিছু থাকবে না`))return;
    const existing=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    const withStatus=drafts.map(d=>({...d,status:"pending",image:d.mainImage||d.images[0]}));
    localStorage.setItem("gausia_seller_pending",JSON.stringify([...existing,...withStatus]));
    // *** ADMIN এ পাঠানোর পরে ওখানে আর কোন তথ্য থাকবে না - সব ক্লিয়ার ***
    localStorage.removeItem(`gausia_draft_${shopCode}`);
    setDrafts([]); setTitle(""); setPrice(""); setComment(""); setImages([]); setEditIndex(null);
    alert(`✅ ${withStatus.length} টা ${shopCode} থেকে Admin এ গেছে! এখন এই পেজ খালি হয়ে গেছে`);
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf3] via-[#fff0f6] to-[#f0f8ff] p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl border rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-5 flex justify-between items-center">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-black">G</div><div><div className="font-black text-sm">GAUSIA SELLER STUDIO</div><div className="text-[10px] text-gray-500">5 Pics • Preview • Auto Clear</div></div></div>
          <div className="text-[11px] bg-black text-white px-4 py-2 rounded-full font-bold">✨ {shopCode} - {images.length}/5 Pics</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-[24px] border shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6">
            <div className="flex items-center gap-2 mb-4"><span className="w-7 h-7 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs">🏪</span><h2 className="font-black text-[13px]">দোকান (ফিক্স থাকবে)</h2></div>
            <select value={shopCode} onChange={e=>{setShopCode(e.target.value); const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}"); if(infos[e.target.value]){setShopName(infos[e.target.value].shopName); setAddress(infos[e.target.value].address); setPhone(infos[e.target.value].phone);} else {setShopName(""); setAddress(""); setPhone("");} const d=JSON.parse(localStorage.getItem(`gausia_draft_${e.target.value}`)||"[]"); setDrafts(d);}} className="w-full border bg-gray-50 rounded-full px-5 py-3.5 text-sm font-bold outline-none focus:border-black">
              {Array.from({length:100}).map((_,i)=>{const s=`SHOP-${String(i+1).padStart(2,"0")}`;return <option key={s} value={s}>✨ {s}</option>})}
            </select>
            <div className="mt-4 bg-orange-50 border border-orange-100 rounded-[20px] p-4">
              <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="🏬 দোকানের নাম" className="w-full border bg-white rounded-full px-5 py-3 text-sm font-bold outline-none"/>
              <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="🗺️ ঠিকানা" className="w-full mt-2.5 border bg-white rounded-full px-5 py-3 text-sm outline-none"/>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="📞 মোবাইল" className="w-full mt-2.5 border bg-white rounded-full px-5 py-3 text-sm outline-none"/>
            </div>
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3"><span className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs">📦</span><h2 className="font-black text-[13px]">পণ্য + ৫ ছবি</h2></div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="✨ পণ্যের নাম - Lal Sari" className="w-full border bg-gray-50 rounded-full px-5 py-3.5 text-sm outline-none focus:border-black"/>
              <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="💰 দাম - 500" className="w-full mt-2.5 border bg-gray-50 rounded-full px-5 py-3.5 text-sm outline-none focus:border-black"/>
              <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="💬 মন্তব্য - Ind" className="w-full mt-2.5 border bg-gray-50 rounded-[18px] px-5 py-3 text-sm h-14 outline-none focus:border-black"/>
              
              <div className="mt-3">
                <label className="block w-full border-2 border-dashed border-violet-300 bg-violet-50 rounded-full px-5 py-3.5 text-sm text-center font-bold cursor-pointer hover:bg-violet-100">📸 একসাথে ৫টা ছবি সিলেক্ট করুন ( {images.length}/5 )<input type="file" accept="image/*" multiple onChange={handleImgs} className="hidden"/></label>
                {images.length>0 && <div className="grid grid-cols-5 gap-2 mt-3">{images.map((img,i)=><div key={i} className="relative group"><img src={img} className="w-full h-20 object-cover rounded-xl border-2 border-black"/><button onClick={()=>removeImg(i)} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs font-bold border-2 border-black">✕</button><div className="absolute bottom-1 left-1 bg-black text-white text-[9px] px-1.5 py-0.5 rounded-full">{i+1}</div></div>)}</div>}
              </div>
            </div>
            <button onClick={saveDraft} className={`w-full mt-5 py-3.5 rounded-full font-black text-sm border-2 border-black shadow-[0_4px_0px_black] active:shadow-none active:translate-y-1 ${editIndex!==null?"bg-yellow-400":"bg-black text-white"}`}>{editIndex!==null?"✏️ আপডেট প্রিভিউ":`➕ প্রিভিউতে যোগ করুন (${images.length} ছবি)`}</button>
          </div>

          <div className="bg-white rounded-[24px] border shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6">
            <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-7 h-7 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-xs">👁️</span><h2 className="font-black text-[13px]">লাইভ প্রিভিউ - চেক করে পাঠান</h2></div><span className="text-[11px] bg-black text-white px-3 py-1 rounded-full font-bold">{drafts.length} টা</span></div>
            
            {title||images.length>0 ? (
              <div className="mt-5 border-2 border-dashed border-violet-200 bg-violet-50 rounded-[20px] p-4">
                <div className="text-[10px] font-black text-violet-700">🔴 এখন যা লিখছেন</div>
                <div className="mt-3 bg-white rounded-[16px] border-2 border-black overflow-hidden shadow-[0_6px_0px_black]">
                  {images.length>0 && <div className="relative"><img src={images[0]} className="w-full h-40 object-cover"/><div className="absolute bottom-2 left-2 flex gap-1">{images.map((_,i)=><div key={i} className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden"><img src={images[i]} className="w-full h-full object-cover"/></div>)}</div><div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 rounded-full">{images.length} Pics</div></div>}
                  <div className="p-3"><div className="font-black text-sm">{title||"Lal Sari"}</div><div className="text-xs text-gray-600 mt-1">🏪 {shopName||shopCode} • {address}</div><div className="flex justify-between items-center mt-2"><span className="font-black text-orange-600">{price||"500"}৳</span><span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full">{comment||"Ind"}</span></div></div>
                </div>
              </div>
            ) : null}

            <div className="mt-5 space-y-3 max-h-[520px] overflow-auto">
              {drafts.map((p:any,i:number)=>(
                <div key={p.id} className="bg-white border-2 border-black rounded-[18px] p-3 shadow-[0_4px_0px_black]">
                  <div className="flex gap-3"><div className="relative"><img src={p.mainImage||p.images[0]} className="w-20 h-20 rounded-[12px] object-cover border-2 border-black"/><div className="absolute -top-1 -right-1 bg-black text-white text-[9px] px-1.5 py-0.5 rounded-full">{p.images?.length||1} Pics</div></div><div className="flex-1"><div className="font-black text-xs">{p.title} - {p.price}৳</div><div className="text-[11px] text-gray-600">🏬 {p.shopName}</div><div className="flex gap-1 mt-1">{(p.images||[]).slice(0,5).map((im:string,idx:number)=><img key={idx} src={im} className="w-6 h-6 rounded border object-cover"/>)}</div></div></div>
                  <div className="flex gap-2 mt-3"><button onClick={()=>editDraft(i)} className="flex-1 bg-yellow-300 border-2 border-black rounded-full py-2 text-[11px] font-black">✏️ Edit</button><button onClick={()=>deleteDraft(i)} className="flex-1 bg-white border-2 border-black rounded-full py-2 text-[11px] font-bold">🗑️ Delete</button></div>
                </div>
              ))}
              {drafts.length===0 && <div className="text-center py-12 border-2 border-dashed rounded-[18px]"><div className="text-3xl">📸</div><div className="text-xs text-gray-500 mt-2">একসাথে ৫টা ছবি দিয়ে প্রিভিউ বানান<br/>ভুল থাকলে Edit/Delete করুন</div></div>}
            </div>
            {drafts.length>0 && <button onClick={sendAllToAdmin} className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 border-2 border-black text-white py-3.5 rounded-full font-black text-sm shadow-[0_4px_0px_black]">🚀 {drafts.length} টা Admin এ পাঠান - পাঠানোর পর খালি হয়ে যাবে</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
