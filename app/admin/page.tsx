"use client";
import { useState, useEffect } from "react";

export default function AdminPage(){
  const [sellers, setSellers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [deleted, setDeleted] = useState<any[]>([]);
  const [tab, setTab] = useState<"active"|"deleted">("active");
  const [pass, setPass] = useState("");
  const [ok, setOk] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [newPrice, setNewPrice] = useState("");

  useEffect(()=>{
    try {
      const s = localStorage.getItem("gausia_sellers");
      const p = localStorage.getItem("gausia_products");
      const d = localStorage.getItem("gausia_deleted");
      if(s) setSellers(JSON.parse(s));
      if(p) setProducts(JSON.parse(p));
      if(d) setDeleted(JSON.parse(d));
      if(localStorage.getItem("gausia_admin_ok")==="yes") setOk(true);
    } catch{}
  },[]);

  const saveProducts = (newProds:any[]) => { setProducts(newProds); localStorage.setItem("gausia_products", JSON.stringify(newProds)); };
  const saveDeleted = (newDel:any[]) => { setDeleted(newDel); localStorage.setItem("gausia_deleted", JSON.stringify(newDel)); };
  const check = () => { if(pass==="1234"){ setOk(true); localStorage.setItem("gausia_admin_ok","yes"); } else { alert("পাসওয়ার্ড: 1234"); } };
  const startEditPrice = (p:any) => { setEditing(p); setNewPrice(String(p.price)); };
  const savePrice = () => {
    if(!newPrice) return;
    const updated = products.map((pr:any)=> pr.id===editing.id ? { ...pr, originalPrice: pr.originalPrice||pr.price, price: parseInt(newPrice), priceHistory: [...(pr.priceHistory||[]), { oldPrice: pr.price, newPrice: parseInt(newPrice), date: new Date().toLocaleString("bn-BD") }]} : pr);
    saveProducts(updated); setEditing(null);
  };
  const restoreProduct = (item:any) => {
    saveProducts([...products, { ...item, deletedAt: undefined, deletedBy: undefined }]);
    saveDeleted(deleted.filter((d:any)=>d.id!==item.id));
    alert("✅ Restore হয়েছে!");
  };

  if(!ok){
    return (
      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center p-4">
        <div className="bg-white rounded-[24px] border shadow-xl p-6 w-full max-w-sm text-center">
          <h1 className="font-black text-lg">GAUSIA - এডমিন</h1>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="পাসওয়ার্ড: 1234" className="w-full mt-4 border rounded-full px-4 py-3 text-sm text-center" />
          <button onClick={check} className="w-full mt-3 bg-black text-white rounded-full py-3 font-black text-sm">লগইন</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-black text-xl">👑 অ্যাডমিন প্যানেল</h1>
        <div className="flex gap-2 mt-3">
          <button onClick={()=>setTab("active")} className={`px-4 py-2 rounded-full text-sm font-bold ${tab==="active"?"bg-black text-white":"bg-white border"}`}>✅ Active ({products.length})</button>
          <button onClick={()=>setTab("deleted")} className={`px-4 py-2 rounded-full text-sm font-bold ${tab==="deleted"?"bg-red-600 text-white":"bg-white border"}`}>🗑️ Deleted Report ({deleted.length})</button>
        </div>

        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[100]">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-sm shadow-2xl border-2">
              <h2 className="font-black">💰 দাম পরিবর্তন</h2>
              <p className="text-sm mt-2">{editing.name} - দোকানদার দিয়েছিল: {editing.originalPrice||editing.price}৳</p>
              <input value={newPrice} onChange={e=>setNewPrice(e.target.value)} type="number" className="w-full mt-4 border-2 border-orange-300 rounded-xl px-4 py-3 text-sm font-bold" autoFocus />
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button onClick={()=>setEditing(null)} className="bg-gray-100 rounded-full py-3 font-bold text-sm">বাতিল</button>
                <button onClick={savePrice} className="bg-black text-white rounded-full py-3 font-bold text-sm">✅ সেভ</button>
              </div>
            </div>
          </div>
        )}

        {tab==="active" ? (
          <div className="grid gap-3 mt-5">
            {sellers.map((s:any)=>(
              <div key={s.phone} className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="font-black">{s.name} ({s.code})</div>
                <div className="text-sm">📞 {s.phone} | 📍 {s.address}</div>
                <div className="mt-3 grid gap-2">
                  {products.filter((p:any)=>p.shopCode===s.code).map((p:any)=>(
                    <div key={p.id} className="border-2 border-gray-100 rounded-xl p-3">
                      <div className="flex justify-between"><div className="text-[12px]"><b>{p.code}</b> - {p.name}</div><button onClick={()=>startEditPrice(p)} className="bg-black text-white text-[11px] px-3 py-1 rounded-full font-bold">✏️ দাম</button></div>
                      <div className="mt-2 text-[11px] grid grid-cols-2 gap-2">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2"><div className="text-[10px]">দোকানদারের দাম</div><div className="font-black text-green-700">{p.originalPrice||p.price}৳</div></div>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2"><div className="text-[10px]">কাস্টমার দেখবে</div><div className="font-black text-orange-600">{p.price}৳</div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 mt-5">
            {deleted.length===0 ? <div className="bg-white border rounded-xl p-8 text-center text-gray-400">কোনো ডিলিট রিপোর্ট নাই - দোকানদার এখনো কিছু ডিলিট করেনি</div> :
              deleted.map((d:any)=>(
                <div key={d.id} className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <div className="flex justify-between"><div className="font-black text-sm">🗑️ {d.name} ({d.code})</div><button onClick={()=>restoreProduct(d)} className="bg-green-600 text-white text-[11px] px-3 py-1 rounded-full font-bold">↩️ Restore</button></div>
                  <div className="text-xs mt-2">দোকান: {d.shopName} | দাম ছিল: {d.price}৳ (আসল: {d.originalPrice||d.price}৳)</div>
                  <div className="text-[11px] mt-1">📞 {d.shopPhone} | 🕒 ডিলিট: {d.deletedAt} | 👤 {d.deletedBy}</div>
                  <div className="text-[10px] text-red-600 mt-1">⚠️ এই রিপোর্ট আপনার কাছে সেভ থাকবে, দোকানদার ডিলিট করলেও আপনি দেখতে পাবেন!</div>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}
