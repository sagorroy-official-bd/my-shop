"use client";
import { useState, useEffect } from "react";
export default function GausiaFinal(){
  const [products,setProducts]=useState<any[]>([]);
  const [search,setSearch]=useState("");const [cart,setCart]=useState(0);const [cat,setCat]=useState("সব");const [showChat,setShowChat]=useState(false);
  useEffect(()=>{setProducts(JSON.parse(localStorage.getItem("gausia_customer_final")||"[]"));},[]);

  const filtered=products.filter((p:any)=>{
    const mCat=cat==="সব"||p.cat===cat;
    const mSearch=p.title?.toLowerCase().includes(search.toLowerCase());
    return mCat&&mSearch;
  });

  return(
    <div className="min-h-screen bg-white font-sans">
      {/* TOP BAR - ACTIVE */}
      <div className="bg-[#0f172a] text-white text-[11px] py-1.5 text-center font-bold">◄ ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি • ২০,০০০+ খুশি কাস্টমার • ৭ দিনে রিটার্ন</div>

      {/* HEADER - ACTIVE */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center border-b">
        <div className="flex items-center gap-2"><div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black">G</div><div className="leading-none"><div className="font-black text-sm">GAUSIA</div><div className="text-[8px] tracking-[2px]">COLLECTION</div></div></div>
        <div className="flex-1 max-w-md mx-4 border border-black rounded-full px-4 py-2 flex gap-2 bg-white"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন" className="w-full outline-none text-sm"/><span>⌕</span></div>
        <div className="flex gap-2 items-center"><button className="border border-black rounded-full px-3 py-1 text-xs font-bold">BN</button><a href="/admin" className="text-xs font-bold">Admin</a><button onClick={()=>setShowChat(true)} className="bg-green-50 border text-[11px] px-3 py-1 rounded-full font-bold">☎ Chat</button><div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">কার্ট ({cart})</div></div>
      </div>

      {/* HERO - FIXED IMAGE */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border rounded-full px-3 py-1 text-[11px]"><span className="w-2 h-2 bg-green-500 rounded-full"></span> 20,000+ খুশি কাস্টমার</div>
          <h1 className="text-5xl font-black leading-[1.05] mt-6">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/>আধুনিকতা</h1>
          <p className="text-sm text-gray-600 mt-4 max-w-sm">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
          <div className="flex gap-3 mt-6"><button onClick={()=>document.getElementById("collection")?.scrollIntoView({behavior:"smooth"})} className="bg-black text-white px-6 py-3 rounded-full text-sm font-black">কালেকশন দেখুন</button><button onClick={()=>setShowChat(true)} className="border-2 border-black px-6 py-3 rounded-full text-sm font-bold">💬 হোয়াটসঅ্যাপ</button></div>
          <div className="flex gap-6 mt-8"><div><div className="font-black text-sm">✓ অরিজিনাল</div><div className="text-[10px] text-gray-500">গাউছিয়া থেকে</div></div><div><div className="font-black text-sm">✓ ফিক্সড</div><div className="text-[10px] text-gray-500">সেরা দাম</div></div><div><div className="font-black text-sm">✓ ডিসকাউন্ট</div><div className="text-[10px] text-gray-500">অফার সহ</div></div></div>
        </div>

        <div className="relative">
          {/* এখানে ছবি ফিক্স করা - আগের Saree লেখা বাদ দিয়ে রিয়েল ছবি */}
          <div className="bg-[#ff4d00] rounded-[24px] overflow-hidden h-[480px] relative border-2 border-black">
            <img src="https://images.unsplash.com/photo-1609354580875-4ad4160da7d9?q=80&w=1000" alt="Gausia Saree Model" className="w-full h-full object-cover object-top"/>
            {/* উপরের মডেলের মতো শাড়ি পরা মেয়ে */}
            <div className="absolute bottom-4 left-4 bg-white border-2 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_black]"><div className="text-[9px]">আজকের অফারে</div><div className="font-black text-xs">ঈদে 50% OFF</div></div>
          </div>
          <div className="absolute -bottom-3 left-6 bg-white border-2 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_black]"><div className="text-[9px]">দ্রুত ডেলিভারি</div><div className="font-black text-xs">ঢাকায় ২৪ ঘণ্টা</div></div>
        </div>
      </div>

      {/* COLLECTION - ACTIVE */}
      <div id="collection" className="max-w-7xl mx-auto px-4 mt-8 border-t pt-6">
        <div className="flex flex-wrap justify-between gap-3 mb-4">
          <h2 className="font-black text-xl">আমাদের কালেকশন - {filtered.length} টি</h2>
          <div className="flex gap-2">{["সব","মহিলা","পুরুষ","বেবি"].map(c=><button key={c} onClick={()=>setCat(c)} className={`px-4 py-1 rounded-full border-2 border-black text-xs font-black ${cat===c?"bg-black text-white":"bg-white"}`}>{c}</button>)}</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((p:any)=>{
            const original=Number(p.price)+500;const current=Number(p.price);const disc=Math.round(((original-current)/original)*100);
            return(
              <div key={p.id} className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_black]">
                <div className="h-44 overflow-hidden relative">{p.image?<img src={p.image} className="w-full h-full object-cover"/>:<div className="w-full h-full bg-gray-100 flex items-center justify-center">{p.title}</div>}<span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] px-2 py-1 rounded-full font-black">-{disc}%</span><span className="absolute top-2 right-2 bg-black text-white text-[8px] px-2 py-1 rounded-full">{p.id?.slice(-4)}</span></div>
                <div className="p-3"><div className="text-[10px] text-gray-500">{p.cat} • {p.shop}</div><div className="font-bold text-sm truncate">{p.title}</div><div className="flex gap-2 mt-1"><span className="font-black">{current}৳</span><span className="text-[10px] line-through text-gray-400">{original}৳ আপার</span><span className="ml-auto text-[9px] bg-green-100 border px-2 rounded-full">ফিক্সড</span></div><div className="text-[10px] bg-gray-50 border rounded p-2 mt-2"><b>কেন নিবেন?</b> {p.comment||"অরিজিনাল, সুতি, রঙ গ্যারান্টি"}</div><button onClick={()=>setCart(c=>c+1)} className="w-full mt-2 bg-black text-white rounded-full py-2 text-xs font-black">কার্টে যোগ করুন</button></div>
              </div>
            )
          })}
        </div>
      </div>

      {showChat && <div className="fixed bottom-4 right-4 bg-white border-2 border-black rounded-2xl p-4 shadow-[6px_6px_0px_black] w-72 z-50"><div className="flex justify-between font-black text-sm">💬 সাপোর্ট <button onClick={()=>setShowChat(false)}>×</button></div><div className="text-xs mt-2">WhatsApp: 017XXXXXXXX</div><a href="https://wa.me/8801700000000" target="_blank" className="block mt-2 bg-green-500 text-white text-center py-2 rounded-full text-xs font-black">WhatsApp খুলুন</a></div>}
    </div>
  )
}
