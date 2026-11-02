"use client";
import { useState, useEffect } from "react";

export default function AdminPage(){
  const [sellers, setSellers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [pass, setPass] = useState("");
  const [ok, setOk] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [newPrice, setNewPrice] = useState("");

  useEffect(()=>{
    try {
      const s = localStorage.getItem("gausia_sellers");
      const p = localStorage.getItem("gausia_products");
      if(s) setSellers(JSON.parse(s));
      if(p) setProducts(JSON.parse(p));
      if(localStorage.getItem("gausia_admin_ok")==="yes") setOk(true);
    } catch{}
  },[]);

  const saveProducts = (newProds:any[]) => {
    setProducts(newProds);
    localStorage.setItem("gausia_products", JSON.stringify(newProds));
  };

  const check = () => {
    if(pass==="1234" || pass==="admin"){
      setOk(true);
      localStorage.setItem("gausia_admin_ok","yes");
    } else {
      alert("ভুল পাসওয়ার্ড - পাসওয়ার্ড হলো: 1234");
    }
  };

  const startEditPrice = (p:any) => {
    setEditing(p);
    setNewPrice(String(p.price));
  };

  const savePrice = () => {
    if(!newPrice) { alert("দাম লিখুন"); return; }
    const updated = products.map((pr:any)=> pr.id===editing.id ? {...pr, price: parseInt(newPrice)} : pr);
    saveProducts(updated);
    setEditing(null);
    setNewPrice("");
    alert(`✅ ${editing.name} এর নতুন দাম ${newPrice}৳ সেভ হয়েছে! কাস্টমার পেজেও চলে গেছে!`);
  };

  if(!ok){
    return (
      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center p-4">
        <div className="bg-white rounded-[24px] border shadow-xl p-6 w-full max-w-sm text-center">
          <h1 className="font-black text-lg">GAUSIA - এডমিন</h1>
          <p className="text-xs text-gray-500 mt-1">পাসওয়ার্ড দিন</p>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="পাসওয়ার্ড: 1234" className="w-full mt-4 border rounded-full px-4 py-3 text-sm text-center tracking-widest" />
          <button onClick={check} className="w-full mt-3 bg-black text-white rounded-full py-3 font-black text-sm">লগইন</button>
          <p className="text-[10px] text-gray-400 mt-3">পাসওয়ার্ড: 1234</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-black text-xl">👑 অ্যাডমিন প্যানেল - দোকানদার রেকর্ড</h1>
        <p className="text-sm text-gray-500 mt-1">মোট দোকান: {sellers.length} টি | মোট প্রোডাক্ট: {products.length} টি</p>
        <button onClick={()=>{localStorage.removeItem("gausia_admin_ok"); setOk(false);}} className="mt-2 text-xs bg-black text-white px-3 py-1 rounded-full">লগআউট</button>
        
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[100]">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-sm shadow-2xl border-2">
              <h2 className="font-black">💰 দাম পরিবর্তন করুন</h2>
              <p className="text-sm mt-2">{editing.name} ({editing.code})</p>
              <p className="text-xs text-gray-500">পুরানো দাম: {editing.price}৳</p>
              <input value={newPrice} onChange={e=>setNewPrice(e.target.value)} type="number" placeholder="নতুন দাম" className="w-full mt-4 border-2 border-orange-200 rounded-xl px-4 py-3 text-sm font-bold" autoFocus />
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button onClick={()=>setEditing(null)} className="bg-gray-100 rounded-full py-3 font-bold text-sm">বাতিল</button>
                <button onClick={savePrice} className="bg-black text-white rounded-full py-3 font-bold text-sm">✅ সেভ করুন</button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-3 mt-5">
          {sellers.map((s:any)=>(
            <div key={s.phone} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="font-black text-base">{s.name} ({s.code})</div>
              <div className="text-sm mt-2">📞 ফোন: <b>{s.phone}</b></div>
              <div className="text-sm">📍 ঠিকানা: {s.address}</div>
              <div className="text-xs mt-3 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 inline-block font-bold">এই দোকানের প্রোডাক্ট: {products.filter((p:any)=>p.shopCode===s.code).length} টি</div>
              <div className="mt-3 grid gap-2">
                {products.filter((p:any)=>p.shopCode===s.code).map((p:any)=>(
                  <div key={p.id} className="bg-gray-50 border rounded-xl px-3 py-2 flex justify-between items-center">
                    <div className="text-[12px]"><b>{p.code}</b> - {p.name}<br/><span className="font-black text-orange-600">{p.price}৳</span></div>
                    <button onClick={()=>startEditPrice(p)} className="bg-black text-white text-[11px] px-3 py-1.5 rounded-full font-bold">✏️ দাম বদলান</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
