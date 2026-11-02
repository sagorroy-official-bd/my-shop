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
    if(pass==="1234"){ setOk(true); localStorage.setItem("gausia_admin_ok","yes"); } 
    else { alert("পাসওয়ার্ড: 1234"); }
  };

  const startEditPrice = (p:any) => {
    setEditing(p);
    // যদি আগের originalPrice না থাকে, তাহলে বর্তমান দামকেই original ধরে নাও
    if(!p.originalPrice) p.originalPrice = p.price;
    setNewPrice(String(p.price));
  };

  const savePrice = () => {
    if(!newPrice) { alert("দাম লিখুন"); return; }
    const updated = products.map((pr:any)=> {
      if(pr.id===editing.id){
        const original = pr.originalPrice || pr.price; // আগের রেকর্ড না থাকলে এখনকারটাই আসল
        return { 
          ...pr, 
          originalPrice: original, // দোকানদারের আসল দাম সেভ থাকবে
          price: parseInt(newPrice), // নতুন দাম
          priceHistory: [...(pr.priceHistory||[]), { oldPrice: pr.price, newPrice: parseInt(newPrice), date: new Date().toLocaleString("bn-BD") }]
        };
      }
      return pr;
    });
    saveProducts(updated);
    setEditing(null);
    alert(`✅ সেভ হয়েছে! দোকানদারের দাম ${editing.originalPrice || editing.price}৳ রেকর্ডে থাকবে!`);
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
        <h1 className="font-black text-xl">👑 অ্যাডমিন প্যানেল - দোকানদার রেকর্ড</h1>
        <p className="text-sm text-gray-500 mt-1">দোকানদারের আসল দাম ও আপনার বদলানো দাম - ২টাই থাকবে</p>
        <button onClick={()=>{localStorage.removeItem("gausia_admin_ok"); setOk(false);}} className="mt-2 text-xs bg-black text-white px-3 py-1 rounded-full">লগআউট</button>
        
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[100]">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-sm shadow-2xl border-2">
              <h2 className="font-black">💰 দাম পরিবর্তন</h2>
              <div className="mt-3 bg-gray-50 rounded-xl p-3 text-sm">
                <div>প্রোডাক্ট: <b>{editing.name}</b></div>
                <div className="mt-1">🏪 দোকানদার দিয়েছিল: <b className="text-green-600">{editing.originalPrice || editing.price}৳</b> <span className="text-[10px]">(এটা রেকর্ডে থাকবে)</span></div>
                <div>বর্তমান দাম: <b>{editing.price}৳</b></div>
              </div>
              <input value={newPrice} onChange={e=>setNewPrice(e.target.value)} type="number" placeholder="আপনার নতুন দাম" className="w-full mt-4 border-2 border-orange-300 rounded-xl px-4 py-3 text-sm font-bold" autoFocus />
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
              <div className="font-black">{s.name} ({s.code})</div>
              <div className="text-sm">📞 {s.phone} | 📍 {s.address}</div>
              <div className="mt-3 grid gap-2">
                {products.filter((p:any)=>p.shopCode===s.code).map((p:any)=>(
                  <div key={p.id} className="bg-white border-2 border-gray-100 rounded-xl p-3">
                    <div className="flex justify-between items-start">
                      <div className="text-[12px]"><b>{p.code}</b> - {p.name}</div>
                      <button onClick={()=>startEditPrice(p)} className="bg-black text-white text-[11px] px-3 py-1 rounded-full font-bold">✏️ দাম বদলান</button>
                    </div>
                    <div className="mt-2 text-[11px] grid grid-cols-2 gap-2">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="text-[10px] text-gray-500">দোকানদারের দাম</div>
                        <div className="font-black text-green-700 text-sm">{p.originalPrice || p.price}৳</div>
                        <div className="text-[9px]">✅ অপরিবর্তিত থাকবে</div>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                        <div className="text-[10px] text-gray-500">কাস্টমার দেখবে</div>
                        <div className="font-black text-orange-600 text-sm">{p.price}৳</div>
                        <div className="text-[9px]">{p.originalPrice && p.originalPrice !== p.price ? `লাভ: ${p.price - p.originalPrice}৳` : "এখনো বদলাননি"}</div>
                      </div>
                    </div>
                    {p.priceHistory && p.priceHistory.length > 0 && (
                      <div className="mt-2 text-[9px] text-gray-400">হিস্টরি: {p.priceHistory.map((h:any,i:number)=><span key={i}>{h.oldPrice}→{h.newPrice}৳, </span>)}</div>
                    )}
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
