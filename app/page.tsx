"use client";
import { useState, useEffect } from "react";

export default function GausiaHeroPage(){
  const [products,setProducts]=useState<any[]>([]);
  const [search,setSearch]=useState("");const [cat,setCat]=useState("সব");const [cart,setCart]=useState(0);const [lang,setLang]=useState("BN");
  const [showChat,setShowChat]=useState(false);

  useEffect(()=>{setProducts(JSON.parse(localStorage.getItem("gausia_customer_final")||"[]"));},[]);

  const getPrice=(p:any)=>{
    const original=Number(p.originalPrice||Number(p.price)+500);
    const current=Number(p.price);
    const discount=Math.round(((original-current)/original)*100);
    return {original,current,discount};
  };

  const filtered=products.filter((p:any)=>{
    const c=cat==="সব"||p.cat===cat;
    const s=p.title?.toLowerCase().includes(search.toLowerCase());
    return c&&s;
  });

  const scrollToCollection=()=>document.getElementById("collection")?.scrollIntoView({behavior:"smooth"});

  return(
    <div className="min-h-screen bg-[#fafafa] font-sans">
      {/* TOP BLACK BAR - ACTIVE */}
      <div className="bg-[#111] text-white text-[11px] text-center py-1.5 font-medium flex justify-center items-center gap-2">
        <span className="text-orange-400">◄ ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি</span>
        <span className="hidden md:inline">• ২০,০০০+ খুশি কাস্টমার • ৭ দিনে রিটার্ন</span>
      </div>

      {/* HEADER - EXACT LIKE YOUR SCREENSHOT - ALL ACTIVE */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black text-sm">G</div>
            <div className="leading-none"><div className="font-black text-sm tracking-widest">GAUSIA</div><div className="text-[9px] text-gray-500 tracking-[2px]">COLLECTION</div></div>
          </div>

          <div className="flex-1 max-w-md hidden md:flex border border-black rounded-full px-4 py-2 items-center gap-2 bg-white">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন" className="w-full outline-none text-sm"/>
            <button className="text-gray-500">⌕</button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={()=>setLang(lang==="BN"?"EN":"BN")} className="border border-black rounded-full px-3 py-1 text-xs font-bold">{lang}</button>
            <a href="/admin" className="text-xs font-bold hidden md:block hover:underline">Admin</a>
            <button onClick={()=>setShowChat(!showChat)} className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-bold">☎ Chat</button>
            <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">কার্ট ({cart})</div>
          </div>
        </div>
        {/* MOBILE SEARCH */}
        <div className="md:hidden px-4 pb-3">
          <div className="border border-black rounded-full px-4 py-2 flex gap-2"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="শাড়ি, বোরকা খুঁজুন" className="w-full outline-none text-sm"/><span>⌕</span></div>
        </div>
      </div>

      {/* HERO SECTION - EXACT YOUR SCREENSHOT */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 text-[11px]"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 20,000+ খুশি কাস্টমার</div>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] mt-6">
            নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/>আধুনিকতা
          </h1>
          <p className="text-sm text-gray-600 mt-4 max-w-sm">
            গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।
          </p>
          <div className="flex gap-3 mt-6">
            <button onClick={scrollToCollection} className="bg-black text-white px-6 py-3 rounded-full text-sm font-black hover:bg-orange-500 transition">কালেকশন দেখুন</button>
            <button onClick={()=>setShowChat(true)} className="border-2 border-black px-6 py-3 rounded-full text-sm font-bold">💬 হোয়াটসঅ্যাপ</button>
          </div>
          <div className="flex gap-6 mt-8 text-xs">
            <div><div className="font-black text-lg">✓ অরিজিনাল</div><div className="text-gray-500">গাউছিয়া থেকে</div></div>
            <div><div className="font-black text-lg">✓ ফিক্সড</div><div className="text-gray-500">সেরা দাম</div></div>
            <div><div className="font-black text-lg">✓ ডিসকাউন্ট</div><div className="text-gray-500">আপার প্রাইজে</div></div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#ff2d2d] rounded-[24px] overflow-hidden h-[420px] md:h-[500px] relative">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193a?q=80&w=1000" alt="Saree" className="w-full h-full object-cover mix-blend-multiply opacity-90"/>
            <div className="absolute bottom-4 left-4 bg-white border-2 border-black rounded-full px-4 py-2 text-xs font-black shadow-[4px_4px_0px_black]">🔥 ঈদ কালেকশন 50% OFF</div>
          </div>
          {/* FLOATING BADGE */}
          <div className="absolute -bottom-4 -left-4 bg-white border-2 border-black rounded-xl p-3 shadow-[4px_4px_0px_black] hidden md:block">
            <div className="text-[10px] text-gray-500">আজ ডেলিভারি</div><div className="font-black text-sm">ঢাকায় ২৪ ঘণ্টা</div>
          </div>
        </div>
      </div>

      {/* COLLECTION SECTION - ACTIVE CATEGORY */}
      <div id="collection" className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-black text-xl">আমাদের কালেকশন</h2>
          <div className="flex gap-2">
            {["সব","মহিলা","পুরুষ","বেবি","অনুমোদিত"].map(c=><button key={c} onClick={()=>setCat(c)} className={`px-4 py-1.5 rounded-full border-2 border-black text-xs font-black ${cat===c?"bg-black text-white":"bg-white"}`}>{c}</button>)}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((p:any)=>{
            const {original,current,discount}=getPrice(p);
            return(
              <div key={p.id} className="bg-white border-2 border-black rounded-[16px] overflow-hidden shadow-[4px_4px_0px_black] group">
                <div className="relative h-48 overflow-hidden">
                  {p.image ? <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/> : <div className="w-full h-full bg-gray-100 flex items-center justify-center">{p.title}</div>}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="bg-red-500 text-white text-[9px] px-2 py-1 rounded-full font-black">-{discount}%</span>
                    <span className="bg-black text-white text-[8px] px-2 py-1 rounded-full">{p.id?.slice(-4)}</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-white border border-black text-[8px] px-2 py-1 rounded-full font-bold">NEW</div>
                </div>
                <div className="p-3">
                  <div className="text-[10px] text-gray-500 flex justify-between"><span>{p.cat||"মহিলা"}</span><span>{p.shop||"SHOP-01-0230"}</span></div>
                  <h3 className="font-bold text-sm mt-1">{p.title}</h3>
                  <div className="flex gap-2 items-center mt-1"><span className="font-black">{current}৳</span><span className="text-[11px] line-through text-gray-400">{original}৳ আপার</span><span className="ml-auto text-[9px] bg-green-100 text-green-700 border px-2 py-0.5 rounded-full">ফিক্সড</span></div>
                  <div className="text-[10px] bg-gray-50 border rounded-lg p-2 mt-2"><span className="font-bold">কেন নিবেন?</span> {p.comment||"অরিজিনাল, সুতি, রঙ গ্যারান্টি"}</div>
                  <button onClick={()=>{setCart(c=>c+1);}} className="w-full mt-2 bg-black text-white rounded-full py-2 text-xs font-black hover:bg-orange-500">কার্টে যোগ করুন</button>
                  <div className="text-[9px] text-center mt-1 text-gray-500">✓ ক্যাশ অন ডেলিভারি • ✓ ৭ দিন রিটার্ন</div>
                </div>
              </div>
            )
          })}
        </div>
        {filtered.length===0 && <div className="text-center py-20 bg-white border-2 border-black rounded-xl mt-4">এখনো পণ্য Approve হয়নি - Admin থেকে Approve করুন</div>}
      </div>

      {/* WHY BUY + CUSTOMER BENEFIT */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-black rounded-xl p-4"><div className="font-black">🎯 কেন গ্রহণ করবেন?</div><div className="text-xs text-gray-600 mt-2">• ১০০% অরিজিনাল গাউছিয়া মার্কেট<br/>• আপার প্রাইজ দেখে যাচাই<br/>• ফিক্সড প্রাইস + অতিরিক্ত ডিসকাউন্ট<br/>• ছবির মতোই পণ্য</div></div>
        <div className="bg-black text-white rounded-xl p-4"><div className="font-black">🎁 কাস্টমারের লাভ</div><div className="text-xs text-gray-300 mt-2">• ২০০০৳+ কেনাকাটায় ফ্রি ডেলিভারি<br/>• রিভিউতে ৫% ক্যাশব্যাক<br/>• নতুন ইউজার ১৫০৳ ছাড়<br/>• প্রতি মাসে লটারি</div></div>
        <div className="bg-amber-400 border-2 border-black rounded-xl p-4"><div className="font-black">🚚 মার্কেটিং গ্যারান্টি</div><div className="text-xs mt-2">• ঢাকায় ২৪ ঘণ্টা ডেলিভারি<br/>• সারা দেশে ২-৩ দিন<br/>• ক্যাশ অন ডেলিভারি<br/>• হোয়াটসঅ্যাপ সাপোর্ট ২৪/৭</div></div>
      </div>

      {/* CHAT POPUP - ACTIVE */}
      {showChat && (
        <div className="fixed bottom-4 right-4 bg-white border-2 border-black rounded-2xl p-4 shadow-[6px_6px_0px_black] w-72 z-50">
          <div className="flex justify-between"><span className="font-black text-sm">💬 গাউছিয়া সাপোর্ট</span><button onClick={()=>setShowChat(false)} className="font-black">×</button></div>
          <div className="text-xs mt-3">হোয়াটসঅ্যাপে মেসেজ করুন: <b>017XXXXXXXX</b><br/>আমরা ৫ মিনিটে রিপ্লাই দেব।</div>
          <a href="https://wa.me/8801700000000" target="_blank" className="block mt-3 bg-green-500 text-white text-center py-2 rounded-full text-xs font-black">WhatsApp খুলুন</a>
        </div>
      )}

      <div className="fixed bottom-4 right-4 md:hidden"><button onClick={()=>setShowChat(true)} className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl shadow-lg">💬</button></div>
    </div>
  )
}
