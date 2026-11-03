"use client";
import { useState, useEffect } from "react";
export default function SellerFull(){
  const [shopCode,setShopCode]=useState("SHOP-01");
  const [shopName,setShopName]=useState("");
  const [address,setAddress]=useState("");
  const [phone,setPhone]=useState("");
  const [district,setDistrict]=useState("");
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [comment,setComment]=useState("");
  const [remark,setRemark]=useState("");
  const [image,setImage]=useState("");
  const [myProducts,setMyProducts]=useState<any[]>([]);
  const [editId,setEditId]=useState<string|null>(null);

  useEffect(()=>{
    const all=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    setMyProducts(all);
    // পুরাতন দোকানের তথ্য লোড
    const info=JSON.parse(localStorage.getItem("gausia_shop_info")||"{}");
    if(info.shopName) setShopName(info.shopName);
    if(info.address) setAddress(info.address);
    if(info.phone) setPhone(info.phone);
  },[]);

  const handleImage=(e:any)=>{ const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>setImage(r.result as string); r.readAsDataURL(f); };

  const saveShopInfo=()=>{
    localStorage.setItem("gausia_shop_info",JSON.stringify({shopName,address,phone}));
  };

  const sendToAdmin=()=>{
    if(!shopName||!title||!price||!district){ alert("দোকানের নাম, পণ্যের নাম, দাম, জেলা অবশ্যই লিখুন"); return; }
    saveShopInfo();
    const id=editId||`${shopCode}-${Date.now().toString().slice(-5)}`;
    const product={id,shop:shopCode,shopName,address,phone,district,title,price:parseInt(price),comment,remark,note:district,image:image||`https://picsum.photos/seed/${Date.now()}/400/400`,status:"pending",createdAt:new Date().toLocaleString("bn-BD")};
    
    let existing=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    if(editId){ existing=existing.map((p:any)=>p.id===editId?product:p); setEditId(null); }
    else { existing=[...existing,product]; }
    
    localStorage.setItem("gausia_seller_pending",JSON.stringify(existing));
    setMyProducts(existing);
    alert(editId?"✅ আপডেট হয়েছে!":"✅ Admin এ পাঠানো হয়েছে! এখন Admin Approve করলে Customer এ যাবে");
    // ফর্ম খালি না করে দোকানের তথ্য রেখে দেব
    setTitle("");setPrice("");setComment("");setRemark("");setImage("");setEditId(null);
  };

  const editProduct=(p:any)=>{ setEditId(p.id); setShopCode(p.shop); setShopName(p.shopName); setAddress(p.address); setPhone(p.phone); setDistrict(p.district); setTitle(p.title); setPrice(String(p.price)); setComment(p.comment||""); setRemark(p.remark||""); setImage(p.image); window.scrollTo({top:0,behavior:"smooth"}); };
  const deleteProduct=(id:string)=>{ if(!confirm("এই পণ্যটা ডিলিট করবেন?"))return; const up=myProducts.filter((p:any)=>p.id!==id); localStorage.setItem("gausia_seller_pending",JSON.stringify(up)); setMyProducts(up); };

  return(
    <div className="min-h-screen bg-[#f9f5f0] p-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* বাম পাশে ফর্ম - দোকানের নাম ঠিকানা সহ */}
        <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_black] h-fit sticky top-4">
          <h1 className="font-black text-lg">Seller Page - নতুন পণ্য পাঠান {editId&&"(Edit করছেন)"}</h1>
          <div className="text-[11px] text-gray-500 mt-1">দোকানের নাম, ঠিকানা, মন্তব্য, রিমার্ক সব লিখতে পারবেন</div>
          
          <div className="mt-4 space-y-3">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
              <div className="text-[11px] font-black text-orange-700 mb-2">🏪 দোকানের তথ্য</div>
              <select value={shopCode} onChange={e=>setShopCode(e.target.value)} className="w-full border-2 rounded-full px-4 py-2.5 text-sm bg-white">
                {Array.from({length:100}).map((_,i)=>{const s=`SHOP-${String(i+1).padStart(2,"0")}`;return <option key={s} value={s}>{s}</option>})}
              </select>
              <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="দোকানের নাম - যেমন: মেসার্স গাউছিয়া কালেকশন" className="w-full border-2 rounded-full px-4 py-2.5 text-sm mt-2"/>
              <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="দোকানের ঠিকানা - যেমন: গাউছিয়া মার্কেট, ২য় তলা" className="w-full border-2 rounded-full px-4 py-2.5 text-sm mt-2"/>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="মোবাইল - যেমন: 017XX-XXXXXX" className="w-full border-2 rounded-full px-4 py-2.5 text-sm mt-2"/>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <div className="text-[11px] font-black text-yellow-800 mb-2">📦 পণ্যের তথ্য + জেলা + মন্তব্য</div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="পণ্যের নাম - যেমন: Sari - 700৳" className="w-full border-2 rounded-full px-4 py-2.5 text-sm"/>
              <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="দাম - যেমন: 700" className="w-full border-2 rounded-full px-4 py-2.5 text-sm mt-2"/>
              <input value={district} onChange={e=>setDistrict(e.target.value)} placeholder="জেলা - যেমন: ঢাকা, রংপুর (আগের মতো)" className="w-full border-2 rounded-full px-4 py-2.5 text-sm mt-2 bg-white"/>
              <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="মন্তব্য / Comment - যেমন: অরিজিনাল ইন্ডিয়ান, ফিক্সড প্রাইস" className="w-full border-2 rounded-2xl px-4 py-2.5 text-sm mt-2 h-16"/>
              <textarea value={remark} onChange={e=>setRemark(e.target.value)} placeholder="Remark / এডমিনের জন্য নোট - যেমন: ঢাকা থেকে পাঠানো, ক্যাশ অন ডেলিভারি" className="w-full border-2 rounded-2xl px-4 py-2.5 text-sm mt-2 h-16"/>
              <input type="file" accept="image/*" onChange={handleImage} className="w-full border-2 border-dashed rounded-full px-4 py-2.5 text-sm mt-2"/>
              {image && <img src={image} className="w-full h-32 object-cover rounded-xl border-2 border-black mt-2"/>}
            </div>

            <button onClick={sendToAdmin} className={`w-full py-3 rounded-full font-black text-sm border-2 border-black shadow-[2px_2px_0px_black] ${editId?"bg-yellow-400":"bg-black text-white"}`}>{editId?"✅ আপডেট করুন":"Admin এ পাঠান →"}</button>
            {editId && <button onClick={()=>{setEditId(null);setTitle("");setPrice("");setComment("");setRemark("");setImage("");}} className="w-full border-2 border-black py-2 rounded-full text-xs font-bold">Cancel Edit</button>}
            <div className="flex gap-2"><a href="/admin" className="flex-1 text-center border-2 border-black py-2 rounded-full text-xs font-bold bg-white">Admin দেখুন</a><a href="/" className="flex-1 text-center bg-yellow-400 border-2 border-black py-2 rounded-full text-xs font-bold">Customer দেখুন</a></div>
          </div>
        </div>

        {/* ডান পাশে আমার পাঠানো পণ্য - Edit/Delete সহ */}
        <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_black]">
          <div className="flex justify-between items-center"><h2 className="font-black">আমার পাঠানো পণ্য ({myProducts.length})</h2><span className="text-[11px] bg-black text-white px-3 py-1 rounded-full">এখানেই Edit/Delete করবেন</span></div>
          <div className="mt-4 space-y-3 max-h-[800px] overflow-auto">
            {myProducts.map((p:any)=>(
              <div key={p.id} className="border-2 border-black rounded-xl p-3">
                <div className="flex justify-between"><span className="font-bold text-xs">{p.shopName||p.shop} - {p.id}</span><span className={`text-[10px] px-2 py-0.5 rounded-full border ${p.status==="approved"?"bg-green-200":"bg-yellow-200"}`}>{p.status}</span></div>
                <div className="flex gap-3 mt-2"><img src={p.image} className="w-16 h-16 rounded-lg object-cover border"/><div className="text-xs"><div className="font-bold">{p.title} - {p.price}৳</div><div className="text-[11px] text-gray-600 mt-1">🏪 {p.shopName}</div><div className="text-[11px]">📍 {p.address}</div><div className="text-[11px]">🌍 জেলা: {p.district}</div><div className="text-[11px] mt-1 bg-gray-100 p-1 rounded">💬 {p.comment||"মন্তব্য নেই"}</div><div className="text-[11px] mt-1 bg-yellow-50 p-1 rounded">📝 Remark: {p.remark||"নেই"}</div></div></div>
                <div className="flex gap-2 mt-3"><button onClick={()=>editProduct(p)} className="flex-1 bg-yellow-400 border border-black rounded-full py-1.5 text-xs font-bold">✏️ Edit</button><button onClick={()=>deleteProduct(p.id)} className="flex-1 bg-red-500 text-white border border-black rounded-full py-1.5 text-xs font-bold">🗑️ Delete</button></div>
              </div>
            ))}
            {myProducts.length===0 && <div className="text-center py-10 text-sm text-gray-500">এখনো কোনো পণ্য পাঠাননি - বাম পাশে ফর্ম পূরণ করে পাঠান</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
