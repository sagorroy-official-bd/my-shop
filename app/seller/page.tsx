"use client";
import { useState, useEffect } from "react";
export default function Seller5Folder(){
  const [shopCode,setShopCode]=useState("SHOP-01");
  const [shopName,setShopName]=useState(""); const [address,setAddress]=useState(""); const [phone,setPhone]=useState("");
  const [title,setTitle]=useState(""); const [price,setPrice]=useState(""); const [comment,setComment]=useState("");
  const [images,setImages]=useState<string[]>([]); const [drafts,setDrafts]=useState<any[]>([]); const [editIndex,setEditIndex]=useState<number|null>(null);

  useEffect(()=>{
    const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
    if(infos[shopCode]){ setShopName(infos[shopCode].shopName||""); setAddress(infos[shopCode].address||""); setPhone(infos[shopCode].phone||""); }
    const d=JSON.parse(localStorage.getItem(`gausia_draft_${shopCode}`)||"[]"); setDrafts(d);
  },[shopCode]);

  const handleFolderSelect=(e:any)=>{
    const files=Array.from(e.target.files as FileList);
    if(files.length===0) return;
    if(files.length>5){ alert("⚠️ একসাথে সর্বোচ্চ ৫টা ছবি নিতে পারবেন - ফোল্ডারে Ctrl+A দিয়ে ৫টা সিলেক্ট করুন"); return; }
    if(images.length+files.length>5){ alert(`⚠️ আর মাত্র ${5-images.length} টা Add করতে পারবেন`); return; }
    files.forEach((f:any)=>{ const r=new FileReader(); r.onload=()=>setImages(prev=>[...prev,r.result as string].slice(0,5)); r.readAsDataURL(f); });
    e.target.value=""; // একই ফোল্ডার থেকে আবার সিলেক্ট করতে পারবে
  };
  const removeImg=(idx:number)=>setImages(prev=>prev.filter((_,i)=>i!==idx));

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

  const editDraft=(i:number)=>{ const d=drafts[i]; setTitle(d.title); setPrice(String(d.price)); setComment(d.comment); setImages(d.images||[d.mainImage]); setEditIndex(i); window.scrollTo({top:0,behavior:"smooth"}); };
  const deleteDraft=(i:number)=>{ if(!confirm("🗑️ ডিলিট?"))return; const up=drafts.filter((_,idx)=>idx!==i); setDrafts(up); localStorage.setItem(`gausia_draft_${shopCode}`,JSON.stringify(up)); };
  const sendAll=()=>{ if(drafts.length===0){alert("কোনো প্রিভিউ নেই");return;} if(!confirm(`${drafts.length} টা Admin এ পাঠাবেন? পাঠানোর পর এখানে খালি হয়ে যাবে`))return; const existing=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]"); const withStatus=drafts.map(d=>({...d,status:"pending",image:d.mainImage})); localStorage.setItem("gausia_seller_pending",JSON.stringify([...existing,...withStatus])); localStorage.removeItem(`gausia_draft_${shopCode}`); setDrafts([]); setTitle(""); setPrice(""); setComment(""); setImages([]); alert(`✅ Admin এ গেছে! এখন পেজ খালি`); };

  return(
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf3] via-[#fff0f6] to-[#f0f8ff] p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border rounded-[24px] shadow p-5 flex justify-between items-center"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-black">G</div><div><div className="font-black text-sm">SELLER - 5 Pics Folder</div><div className="text-[10px] text-gray-500">একই ফোল্ডার থেকে ৫টা একসাথে</div></div></div><div className="text-[11px] bg-black text-white px-4 py-2 rounded-full font-bold">{images.length}/5 Pics</div></div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-[24px] border shadow p-6">
            <select value={shopCode} onChange={e=>setShopCode(e.target.value)} className="w-full border bg-gray-50 rounded-full px-5 py-3.5 text-sm font-bold">
              {Array.from({length:100}).map((_,i)=>{const s=`SHOP-${String(i+1).padStart(2,"0")}`;return <option key={s} value={s}>✨ {s}</option>})}
            </select>
            <div className="mt-4 bg-orange-50 border border-orange-100 rounded-[20px] p-4">
              <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="🏬 দোকানের নাম" className="w-full border bg-white rounded-full px-5 py-3 text-sm font-bold"/>
              <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="🗺️ ঠিকানা" className="w-full mt-2 border bg-white rounded-full px-5 py-3 text-sm"/>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="📞 মোবাইল" className="w-full mt-2 border bg-white rounded-full px-5 py-3 text-sm"/>
            </div>

            <div className="mt-5">
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="✨ Lal Sari" className="w-full border bg-gray-50 rounded-full px-5 py-3.5 text-sm"/>
              <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="💰 1000" className="w-full mt-2 border bg-gray-50 rounded-full px-5 py-3.5 text-sm"/>
              <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="💬 Ban / Ind" className="w-full mt-2 border bg-gray-50 rounded-[18px] px-5 py-3 text-sm h-14"/>

              {/* ৫টা ছবি একসাথে - ফোল্ডার */}
              <div className="mt-4 bg-violet-50 border-2 border-dashed border-violet-300 rounded-[20px] p-4">
                <div className="text-[12px] font-black text-violet-800">📁 একই ফোল্ডার থেকে ৫টা ছবি একসাথে Add হবে</div>
                <div className="text-[10px] text-gray-600 mt-1">ফোল্ডারে গিয়ে Ctrl+A দিয়ে ৫টা সিলেক্ট করুন, প্রিভিউতে ৫টাই দেখা যাবে</div>
                
                <label className="mt-3 flex items-center justify-center w-full bg-black text-white py-3 rounded-full font-black text-sm cursor-pointer hover:bg-gray-900">
                  📁 ফোল্ডার থেকে ৫টা ছবি সিলেক্ট করুন ({images.length}/5)
                  <input type="file" accept="image/*" multiple onChange={handleFolderSelect} className="hidden"/>
                </label>

                {images.length>0 && (
                  <>
                    <div className="mt-3 flex gap-2">
                      <label className="flex-1 bg-white border-2 border-black py-2 rounded-full text-[11px] font-bold text-center cursor-pointer">➕ আরো ছবি Add করুন<input type="file" accept="image/*" multiple onChange={handleFolderSelect} className="hidden"/></label>
                      <button onClick={()=>setImages([])} className="flex-1 bg-red-50 border-2 border-red-200 py-2 rounded-full text-[11px] font-bold text-red-600">🗑️ সব ছবি ডিলিট</button>
                    </div>
                    <div className="mt-3 bg-white border-2 border-black rounded-[16px] p-3">
                      <div className="text-[11px] font-black mb-2">📂 একই ফোল্ডারে {images.length} টা ছবি - প্রিভিউতে সব দেখা যাবে</div>
                      <div className="grid grid-cols-5 gap-2">
                        {images.map((img,i)=>(
                          <div key={i} className="relative group">
                            <img src={img} className="w-full h-20 object-cover rounded-xl border-2 border-black"/>
                            <button onClick={()=>removeImg(i)} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs border-2 border-black">✕</button>
                            <div className="absolute bottom-1 left-1 bg-black text-white text-[9px] px-1.5 rounded-full">{i+1}</div>
                            {i===0 && <div className="absolute top-1 left-1 bg-yellow-400 text-black text-[8px] px-1 rounded-full font-black">Main</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button onClick={saveDraft} className={`w-full mt-5 py-3.5 rounded-full font-black text-sm border-2 border-black shadow-[0_4px_0px_black] ${editIndex!==null?"bg-yellow-400":"bg-black text-white"}`}>{editIndex!==null?"✏️ আপডেট প্রিভিউ":`➕ প্রিভিউতে যোগ করুন (${images.length} ছবি)`}</button>
            {editIndex!==null && <button onClick={()=>{setEditIndex(null);setTitle("");setPrice("");setComment("");setImages([]);}} className="w-full mt-2 border-2 border-black py-2 rounded-full text-xs font-bold bg-white">Cancel</button>}
          </div>

          <div className="bg-white rounded-[24px] border shadow p-6">
            <div className="flex justify-between items-center"><h2 className="font-black text-[13px]">👁️ লাইভ প্রিভিউ - ৫ ছবি এক ফোল্ডারে</h2><span className="text-[11px] bg-black text-white px-3 py-1 rounded-full font-bold">{drafts.length} টা</span></div>

            {images.length>0 && (
              <div className="mt-5 border-2 border-dashed border-violet-200 bg-violet-50 rounded-[20px] p-4">
                <div className="text-[10px] font-black text-violet-700">🔴 এখন যা লিখছেন - {images.length} ছবি এক ফোল্ডারে</div>
                <div className="mt-3 bg-white rounded-[16px] border-2 border-black overflow-hidden shadow-[0_6px_0px_black]">
                  <div className="relative"><img src={images[0]} className="w-full h-44 object-cover"/><div className="absolute bottom-2 left-2 right-2 flex gap-1.5 overflow-auto">{images.map((im,i)=><img key={i} src={im} className={`w-12 h-12 rounded-lg border-2 object-cover ${i===0?"border-yellow-400":"border-white"}`}/>)}</div><div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 rounded-full">{images.length} Pics Folder</div></div>
                  <div className="p-3"><div className="font-black text-sm">{title||"Lal Sari"} - {price||1000}৳</div><div className="text-[11px] text-gray-600">🏪 {shopName||shopCode} • {address}</div></div>
                </div>
              </div>
            )}

            <div className="mt-5 space-y-3 max-h-[600px] overflow-auto">
              {drafts.map((p:any,i:number)=>(
                <div key={p.id} className="border-2 border-black rounded-[18px] p-3 shadow-[0_4px_0px_black]">
                  <div className="flex gap-3"><div className="relative"><img src={p.mainImage} className="w-20 h-20 rounded-xl border-2 border-black object-cover"/><div className="absolute -top-1 -right-1 bg-black text-white text-[9px] px-1.5 rounded-full">{p.images.length} Pics</div></div><div className="flex-1"><div className="font-black text-xs">{p.title} - {p.price}৳</div><div className="text-[10px] mt-1 flex gap-1 flex-wrap">{p.images.map((im:string,idx:number)=><img key={idx} src={im} className="w-7 h-7 rounded border object-cover"/>)}</div><div className="text-[10px] text-gray-500 mt-1">📂 একই ফোল্ডারে {p.images.length} টা</div></div></div>
                  <div className="flex gap-2 mt-3"><button onClick={()=>editDraft(i)} className="flex-1 bg-yellow-300 border-2 border-black rounded-full py-2 text-[11px] font-black">✏️ Edit</button><button onClick={()=>deleteDraft(i)} className="flex-1 bg-white border-2 border-black rounded-full py-2 text-[11px] font-bold">🗑️ Delete</button></div>
                </div>
              ))}
              {drafts.length===0 && <div className="text-center py-12 border-2 border-dashed rounded-[18px]"><div className="text-3xl">📁</div><div className="text-xs text-gray-500 mt-2">একই ফোল্ডার থেকে ৫টা ছবি সিলেক্ট করুন<br/>প্রিভিউতে ৫টাই একসাথে দেখা যাবে</div></div>}
            </div>
            {drafts.length>0 && <button onClick={sendAll} className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 border-2 border-black text-white py-3.5 rounded-full font-black text-sm shadow-[0_4px_0px_black]">🚀 {drafts.length} টা Admin এ পাঠান - পাঠানোর পর খালি</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
