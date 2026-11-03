"use client";
import { useState, useEffect } from "react";
export default function SellerFantastic(){
  const [shopCode,setShopCode]=useState("SHOP-01");
  const [shopName,setShopName]=useState(""); const [address,setAddress]=useState(""); const [phone,setPhone]=useState("");
  const [title,setTitle]=useState(""); const [price,setPrice]=useState(""); const [comment,setComment]=useState(""); const [image,setImage]=useState("");
  const [drafts,setDrafts]=useState<any[]>([]); const [editIndex,setEditIndex]=useState<number|null>(null);

  useEffect(()=>{
    const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
    if(infos[shopCode]){ setShopName(infos[shopCode].shopName||""); setAddress(infos[shopCode].address||""); setPhone(infos[shopCode].phone||""); }
    else { setShopName(""); setAddress(""); setPhone(""); }
    const d=JSON.parse(localStorage.getItem(`gausia_draft_${shopCode}`)||"[]"); setDrafts(d);
  },[shopCode]);

  const handleImg=(e:any)=>{ const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>setImage(r.result as string); r.readAsDataURL(f); };

  const saveDraft=()=>{
    if(!shopName||!title||!price){ alert("⚠️ দোকানের নাম, পণ্যের নাম, দাম লিখুন"); return; }
    const item={id:editIndex!==null?drafts[editIndex].id:`${shopCode}-${Date.now().toString().slice(-5)}`,shop:shopCode,shopName,address,phone,title,price:parseInt(price),comment,image:image||`https://picsum.photos/seed/${Date.now()}/500/500`,createdAt:new Date().toLocaleString("bn-BD")};
    
    let up=[...drafts];
    if(editIndex!==null){ up[editIndex]=item; setEditIndex(null); } else { up=[item,...up]; }
    setDrafts(up); localStorage.setItem(`gausia_draft_${shopCode}`,JSON.stringify(up));
    
    // দোকান ফিক্স সেভ - আলাদা, মিশবে না
    const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}"); infos[shopCode]={shopName,address,phone}; localStorage.setItem("gausia_all_shop_infos",JSON.stringify(infos));
    const shops=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]"); if(!shops.includes(shopCode)){ localStorage.setItem("gausia_all_shops",JSON.stringify([...shops,shopCode].sort())); }

    setTitle(""); setPrice(""); setComment(""); setImage(""); 
  };

  const editDraft=(i:number)=>{ const d=drafts[i]; setTitle(d.title); setPrice(String(d.price)); setComment(d.comment); setImage(d.image); setEditIndex(i); window.scrollTo({top:0,behavior:"smooth"}); };
  const deleteDraft=(i:number)=>{ if(!confirm("🗑️ এই প্রিভিউ ডিলিট করবেন?"))return; const up=drafts.filter((_,idx)=>idx!==i); setDrafts(up); localStorage.setItem(`gausia_draft_${shopCode}`,JSON.stringify(up)); };
  const sendAllToAdmin=()=>{ if(drafts.length===0){alert("কোনো প্রিভিউ নেই");return;} if(!confirm(`${drafts.length} টা পণ্য Admin এ পাঠাবেন?`))return; const existing=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]"); const withStatus=drafts.map(d=>({...d,status:"pending"})); localStorage.setItem("gausia_seller_pending",JSON.stringify([...existing,...withStatus])); localStorage.removeItem(`gausia_draft_${shopCode}`); setDrafts([]); alert(`✅ ${drafts.length} টা ${shopCode} থেকে Admin এ গেছে!`); };

  return(
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf3] via-[#fff0f6] to-[#f0f8ff] p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-5 flex justify-between items-center">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-black">G</div><div><div className="font-black text-sm tracking-wide">GAUSIA SELLER STUDIO</div><div className="text-[10px] text-gray-500 font-medium">Premium • Fantastic • Modern</div></div></div>
          <div className="text-[11px] bg-black text-white px-4 py-2 rounded-full font-bold">✨ {shopCode} Fixed</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* LEFT FORM */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6">
            <div className="flex items-center gap-2 mb-4"><span className="w-7 h-7 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs">🏪</span><h2 className="font-black text-[13px] tracking-wide">দোকান নির্বাচন (ফিক্স থাকবে)</h2></div>
            <select value={shopCode} onChange={e=>{setShopCode(e.target.value); const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}"); if(infos[e.target.value]){setShopName(infos[e.target.value].shopName); setAddress(infos[e.target.value].address); setPhone(infos[e.target.value].phone);} else {setShopName(""); setAddress(""); setPhone("");} const d=JSON.parse(localStorage.getItem(`gausia_draft_${e.target.value}`)||"[]"); setDrafts(d);}} className="w-full border border-gray-200 bg-gray-50/50 rounded-full px-5 py-3.5 text-sm font-bold outline-none focus:border-black focus:bg-white transition-all">
              {Array.from({length:100}).map((_,i)=>{const s=`SHOP-${String(i+1).padStart(2,"0")}`; return <option key={s} value={s}>✨ {s} - {s}</option>})}
            </select>

            <div className="mt-5 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-[20px] p-4">
              <div className="text-[11px] font-black text-orange-800 flex items-center gap-1.5">📍 {shopCode} এর তথ্য - একবার লিখলে ফিক্স</div>
              <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="🏬 দোকানের নাম - গাউছিয়া কালেকশন" className="w-full mt-3 border border-white bg-white rounded-full px-5 py-3 text-sm font-medium outline-none focus:border-orange-300 shadow-sm"/>
              <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="🗺️ ঠিকানা - গাউছিয়া মার্কেট" className="w-full mt-2.5 border border-white bg-white rounded-full px-5 py-3 text-sm outline-none focus:border-orange-300 shadow-sm"/>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="📞 মোবাইল" className="w-full mt-2.5 border border-white bg-white rounded-full px-5 py-3 text-sm outline-none focus:border-orange-300 shadow-sm"/>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3"><span className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs">📦</span><h2 className="font-black text-[13px]">পণ্যের তথ্য</h2></div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="✨ পণ্যের নাম - যেমন: Sari" className="w-full border border-gray-200 bg-gray-50/50 rounded-full px-5 py-3.5 text-sm outline-none focus:border-black focus:bg-white"/>
              <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="💰 দাম - 500" className="w-full mt-2.5 border border-gray-200 bg-gray-50/50 rounded-full px-5 py-3.5 text-sm outline-none focus:border-black focus:bg-white"/>
              <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="💬 মন্তব্য / Comment - অরিজিনাল ইন্ডিয়ান" className="w-full mt-2.5 border border-gray-200 bg-gray-50/50 rounded-[18px] px-5 py-3 text-sm h-16 outline-none focus:border-black focus:bg-white"/>
              <div className="mt-2.5 relative">
                <input type="file" accept="image/*" onChange={handleImg} className="w-full border border-dashed border-gray-300 bg-white rounded-full px-5 py-3.5 text-sm file:mr-3 file:bg-black file:text-white file:border-0 file:rounded-full file:px-4 file:py-1 file:text-xs"/>
              </div>
              {image && <div className="mt-3 rounded-[18px] overflow-hidden border-2 border-black shadow-lg"><img src={image} className="w-full h-44 object-cover"/></div>}
            </div>

            <button onClick={saveDraft} className={`w-full mt-5 py-3.5 rounded-full font-black text-sm border-2 border-black shadow-[0_4px_0px_black] transition-all active:shadow-none active:translate-y-1 ${editIndex!==null?"bg-yellow-400":"bg-black text-white"}`}>{editIndex!==null?"✏️ আপডেট প্রিভিউ":"➕ প্রিভিউতে যোগ করুন"}</button>
            {editIndex!==null && <button onClick={()=>{setEditIndex(null);setTitle("");setPrice("");setComment("");setImage("");}} className="w-full mt-2 border-2 border-black py-2.5 rounded-full text-xs font-bold bg-white">Cancel</button>}
          </div>

          {/* RIGHT PREVIEW */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6">
            <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="w-7 h-7 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-xs">👁️</span><h2 className="font-black text-[13px]">লাইভ প্রিভিউ - পাঠানোর আগে চেক</h2></div><span className="text-[11px] bg-black text-white px-3 py-1 rounded-full font-bold">{drafts.length} টা</span></div>
            <div className="text-[11px] text-gray-500 mt-1 ml-9">ভুল থাকলে Edit/Delete করে ঠিক করে তারপর Admin এ পাঠাবেন</div>

            {title||price||image ? (
              <div className="mt-5 border-2 border-dashed border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-[20px] p-4">
                <div className="text-[10px] font-black text-violet-700">🔴 এখন যা লিখছেন - লাইভ প্রিভিউ</div>
                <div className="mt-3 bg-white rounded-[16px] border-2 border-black overflow-hidden shadow-[0_6px_0px_black]">
                  {image && <img src={image} className="w-full h-40 object-cover"/>}
                  <div className="p-3"><div className="font-black text-sm">{title||"পণ্যের নাম"}</div><div className="text-xs text-gray-600 mt-1">🏪 {shopName||shopCode} • {address}</div><div className="flex justify-between items-center mt-2"><span className="font-black text-orange-600">{price||0}৳</span><span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full">{comment||"মন্তব্য নেই"}</span></div></div>
                </div>
              </div>
            ) : null}

            <div className="mt-5 space-y-3 max-h-[520px] overflow-auto pr-1">
              {drafts.map((p:any,i:number)=>(
                <div key={p.id} className="bg-white border-2 border-black rounded-[18px] p-3 shadow-[0_4px_0px_black] hover:shadow-[0_2px_0px_black] hover:translate-y-[2px] transition-all">
                  <div className="flex gap-3"><img src={p.image} className="w-20 h-20 rounded-[12px] object-cover border-2 border-black"/><div className="flex-1"><div className="font-black text-xs">{p.title} - {p.price}৳</div><div className="text-[11px] text-gray-600 mt-1">🏬 {p.shopName}</div><div className="text-[10px] text-gray-500">📍 {p.address}</div><div className="text-[10px] mt-1 bg-orange-50 border border-orange-100 px-2 py-1 rounded-full w-fit">💬 {p.comment||"মন্তব্য নেই"}</div></div></div>
                  <div className="flex gap-2 mt-3"><button onClick={()=>editDraft(i)} className="flex-1 bg-yellow-300 border-2 border-black rounded-full py-2 text-[11px] font-black">✏️ Edit</button><button onClick={()=>deleteDraft(i)} className="flex-1 bg-white border-2 border-black rounded-full py-2 text-[11px] font-bold hover:bg-red-50">🗑️ Delete</button></div>
                </div>
              ))}
              {drafts.length===0 && <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-[18px]"><div className="text-3xl">👀</div><div className="text-xs text-gray-500 mt-2 font-medium">এখনো কোনো প্রিভিউ নেই<br/>বাম পাশে লিখে প্রিভিউতে যোগ করুন</div></div>}
            </div>

            {drafts.length>0 && <button onClick={sendAllToAdmin} className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 border-2 border-black text-white py-3.5 rounded-full font-black text-sm shadow-[0_4px_0px_black] active:shadow-none active:translate-y-1">🚀 {drafts.length} টা Admin এ পাঠান → {shopCode}</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
