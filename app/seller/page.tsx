"use client";
import { useState, useEffect } from "react";
export default function Seller(){
  const [shop,setShop]=useState("SHOP-01");
  const [shopName,setShopName]=useState("A");
  const [shopAddr,setShopAddr]=useState("Gawsia");
  const [shopMobile,setShopMobile]=useState("1111111");
  const [title,setTitle]=useState("Tree Pices");
  const [price,setPrice]=useState("1500");
  const [origin,setOrigin]=useState("Ind");
  const [comment,setComment]=useState("");
  const [remark,setRemark]=useState("");
  const [images,setImages]=useState<any[]>([]);
  const [list,setList]=useState<any[]>([]);
  const [editId,setEditId]=useState<any>(null);

  useEffect(()=>{ try{ setList(JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]")); }catch{} },[]);

  const onFiles=(e:any)=>{
    const files=[...e.target.files];
    files.forEach((f:any)=>{
      const r=new FileReader();
      r.onload=()=>{ setImages((prev:any)=>[...prev, r.result].slice(0,6)); };
      r.readAsDataURL(f);
    });
  };

  const saveDraft=()=>{
    if(!title||!price){ alert("নাম + দাম দিন"); return; }
    if(editId){
      const up=list.map((x:any)=> x.id===editId ? {...x, shop,shopName,shopAddr,shopMobile,title,price,origin,comment,remark,images: images.length?images:x.images} : x);
      setList(up); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); setEditId(null); alert("Edit হয়ে গেছে"); return;
    }
    const n={id:Date.now(),shop,shopName,shopAddr,shopMobile,title,price,origin,comment,remark,images,createdAt:new Date().toLocaleString()};
    const up=[n,...list]; setList(up); localStorage.setItem("gausia_seller_pending",JSON.stringify(up));
    alert("ড্রাফটে সেভ হয়েছে - এখন Send Admin চাপুন");
  };

  const doEdit=(p:any)=>{ setEditId(p.id); setShop(p.shop); setShopName(p.shopName); setShopAddr(p.shopAddr); setShopMobile(p.shopMobile); setTitle(p.title); setPrice(p.price); setOrigin(p.origin); setComment(p.comment); setRemark(p.remark); setImages(p.images); window.scrollTo({top:0,behavior:"smooth"}); };
  const doDelete=(id:any)=>{ if(!confirm("Delete করবেন?")) return; const up=list.filter((x:any)=>x.id!==id); setList(up); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); };
  const preview=list[0];

  return(
    <div className="min-h-screen bg-[#f6f0f5] p-3 md:p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border p-4">
          <div className="font-bold">📋 দোকানের স্থায়ী ঠিকানা (ফিক্সড)</div>
          <select value={shop} onChange={e=>setShop(e.target.value)} className="w-full mt-3 border rounded-full px-4 py-2 bg-yellow-50 font-bold">
            {["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"].map((s:any)=><option key={s}>{s}</option>)}
          </select>
          <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="দোকানের নাম - A" className="w-full mt-2 border rounded-full px-4 py-2"/>
          <input value={shopAddr} onChange={e=>setShopAddr(e.target.value)} placeholder="ঠিকানা - Gawsia" className="w-full mt-2 border rounded-full px-4 py-2"/>
          <input value={shopMobile} onChange={e=>setShopMobile(e.target.value)} placeholder="মোবাইল - 1111111" className="w-full mt-2 border rounded-full px-4 py-2"/>
          <div className="font-bold mt-4">📦 পণ্য + ছবি এক জায়গায়</div>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="পণ্যের নাম - Tree Pices" className="w-full mt-2 border rounded-full px-4 py-2"/>
          <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="দাম - 1500" className="w-full mt-2 border rounded-full px-4 py-2"/>
          <input value={origin} onChange={e=>setOrigin(e.target.value)} placeholder="জেলা - Ind" className="w-full mt-2 border rounded-full px-4 py-2"/>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="মন্তব্য / Comment" className="w-full mt-2 border rounded-xl px-4 py-2"/>
          <textarea value={remark} onChange={e=>setRemark(e.target.value)} placeholder="Remark / এডমিনের জন্য নোট" className="w-full mt-2 border rounded-xl px-4 py-2"/>
          <div className="mt-3 border-2 border-dashed rounded-xl p-3">
            <div className="text-xs font-bold mb-2">📷 একসাথে ৫/৬টা ছবি</div>
            <label className="block bg-black text-white text-center rounded-full py-2 cursor-pointer text-sm">ছবি সিলেক্ট করুন (৫/৬টা)<input type="file" accept="image/*" multiple onChange={onFiles} className="hidden"/></label>
            <div className="grid grid-cols-5 gap-2 mt-2">{images.map((im:any,i:number)=><div key={i} className="relative"><img src={im} className="w-full h-14 object-cover rounded"/><button onClick={()=>setImages(images.filter((_:any,j:number)=>j!==i))} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px]">X</button></div>)}</div>
          </div>
          <button onClick={saveDraft} className="w-full mt-3 bg-black text-white rounded-full py-2 font-bold">{editId ? "Update করুন" : "ড্রাফটে সেভ করুন"}</button>
        </div>
        <div className="bg-white rounded-2xl border p-4">
          <div className="flex justify-between"><div className="font-bold">👁️ প্রোডাক্ট প্রিভিউ + Edit/Delete/Send</div><span className="bg-black text-white text-xs px-2 py-1 rounded-full">{list.length}</span></div>
          {preview ? <div className="mt-3 border rounded-xl overflow-hidden"><img src={preview.images[0]} className="w-full h-56 object-cover"/><div className="px-3 pb-3"><div className="font-bold mt-2">{preview.title} - {preview.price}৳</div><div className="text-xs text-gray-500">{preview.shop} • {preview.shopName} • {preview.origin}</div><div className="grid grid-cols-2 gap-2 mt-2"><button onClick={()=>doEdit(preview)} className="bg-yellow-400 rounded-full py-1 text-sm font-bold">✏️ Edit</button><button onClick={()=>doDelete(preview.id)} className="border rounded-full py-1 text-sm">🗑️ Delete</button></div></div></div> : <div className="mt-3 border rounded-xl p-6 text-center text-sm text-gray-500">এখনো কোনো প্রিভিউ নেই</div>}
          <button onClick={()=>{ if(list.length===0){ alert("আগে একটা পণ্য সেভ করুন"); return; } alert(list.length+" টা পণ্য Admin এর কাছে পাঠানো হয়েছে"); }} className="w-full mt-3 bg-green-600 text-white rounded-full py-2 font-bold">📤 Send Admin - {list.length} টা পণ্য</button>
          <div className="mt-4 space-y-2">{list.map((p:any)=><div key={p.id} className="flex gap-2 border rounded-xl p-2 items-center"><img src={p.images[0]} className="w-14 h-14 object-cover rounded"/><div className="flex-1 text-xs"><div className="font-bold">{p.title} - {p.price}৳</div><div>{p.shop} - {p.origin}</div></div><button onClick={()=>doEdit(p)} className="text-xs bg-yellow-100 px-2 py-1 rounded-full">Edit</button><button onClick={()=>doDelete(p.id)} className="text-xs bg-red-100 px-2 py-1 rounded-full">Del</button></div>)}</div>
        </div>
      </div>
    </div>
  );
}
