"use client";
import { useState, useEffect } from "react";
export default function GausiaProPage(){
  const [products,setProducts]=useState<any[]>([]);
  const [search,setSearch]=useState("");const [cat,setCat]=useState("সব");const [priceFilter,setPriceFilter]=useState("সব");const [cart,setCart]=useState(0);
  useEffect(()=>{setProducts(JSON.parse(localStorage.getItem("gausia_customer_final")||"[]"));},[]);
  
  const getPriceData=(p:any)=>{
    const original=Number(p.originalPrice||Number(p.price)+500);
    const current=Number(p.price);
    const discount=Math.round(((original-current)/original)*100);
    const isFixed=p.isFixed||false;
    return {original,current,discount,isFixed};
  };

  const filtered=products.filter((p:any)=>{
    const matchCat=cat==="সব"||p.cat===cat||p.category===cat;
    const matchSearch=p.title?.toLowerCase().includes(search.toLowerCase());
    const {current}=getPriceData(p);
    let matchPrice=true;
    if(priceFilter==="500 এর নিচে") matchPrice=current<500;
    if(priceFilter==="500-1000") matchPrice=current>=500&&current<=1000;
    if(priceFilter==="1000-2000") matchPrice=current>1000&&current<=2000;
    if(priceFilter==="2000+") matchPrice=current>2000;
    return matchCat&&matchSearch&&matchPrice;
  });

  return(
    <div className="min-h-screen bg-[#f5f5f5] font-sans">
      {/* TOP MARKETING BAR */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] font-bold text-center py-1.5">
        🎉 গাউছিয়া কালেকশনে ঈদ অফার! ৫০% পর্যন্ত ছাড় | ফ্রি ডেলিভারি ৯৯৯৳+ | ৭ দিনে রিটার্ন | 📞 017XXXXXXXX
      </div>

      {/* HEADER - DARAZ STYLE */}
      <div className="bg-white sticky top-0 z-20 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg flex items-center justify-center font-black">G</div>
            <div><h1 className="font-black text-lg leading-none">GAUSIA COLLECTION</h1><p className="text-[9px] text-gray-500">অরিজিনাল • বিশ্বস্ত • ২০১০ থেকে</p></div>
          </div>
          <div className="flex-1 max-w-xl hidden md:flex bg-gray-100 border border-gray-200 rounded-full px-4 py-2.5 items-center gap-2">
            <span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="গাউছিয়াতে খুঁজুন - শাড়ি, থ্রি-পিস, পাঞ্জাবি..." className="bg-transparent outline-none text-sm w-full"/>
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-black">🛒 {cart} | ❤️</div>
            <div className="bg-orange-500 text-white px-3 py-2 rounded-full text-[10px] font-black">LOGIN</div>
          </div>
        </div>
        {/* CATEGORY + FILTER BAR */}
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-2 items-center bg-white">
          <span className="text-xs font-black">ক্যাটাগরি:</span>
          {["সব","মহিলা","পুরুষ","বেবি","অনুমোদিত"].map(c=><button key={c} onClick={()=>setCat(c)} className={`px-4 py-1.5 rounded-full text-xs font-bold border ${cat===c?"bg-black text-white border-black":"bg-white border-gray-300"}`}>{c}</button>)}
          <span className="text-xs font-black ml-4">দাম:</span>
          {["সব","500 এর নিচে","500-1000","1000-2000","2000+"].map(pf=><button key={pf} onClick={()=>setPriceFilter(pf)} className={`px-3 py-1 rounded-full text-[11px] border ${priceFilter===pf?"bg-orange-500 text-white border-orange-500":"bg-gray-50"}`}>{pf}</button>)}
          <span className="ml-auto text-[11px] bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full font-bold">✓ ফিক্সড প্রাইস ✓ ডিসকাউন্ট ✓ অরিজিনাল</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-4 mt-4">
        {/* LEFT SIDEBAR - INDIVIDUAL FILTER */}
        <div className="col-span-12 md:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-black text-sm mb-3">✨ কেন গাউছিয়া থেকে কিনবেন?</h3>
            <div className="space-y-2 text-[11px]">
              <div className="flex gap-2"><span>✅</span> ১০০% অরিজিনাল - গাউছিয়া মার্কেট সরাসরি</div>
              <div className="flex gap-2"><span>✅</span> ফিক্সড প্রাইস + অতিরিক্ত ডিসকাউন্ট</div>
              <div className="flex gap-2"><span>✅</span> আপার প্রাইজ দেখে দাম যাচাই করুন</div>
              <div className="flex gap-2"><span>✅</span> ৭ দিনে ফ্রি রিটার্ন</div>
              <div className="flex gap-2"><span>✅</span> ক্যাশ অন ডেলিভারি সারা বাংলাদেশ</div>
            </div>
            <div className="mt-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3">
              <div className="font-black text-xs">🎁 কাস্টমারের লাভ</div>
              <div className="text-[11px] mt-1">• প্রতি ২০০০৳ কেনাকাটায় ১০০৳ কুপন<br/>• রিভিউ দিলে ৫% ক্যাশব্যাক<br/>• নতুন ইউজার ১৫০৳ ছাড়</div>
            </div>
          </div>
          <div className="bg-black text-white rounded-xl p-4">
            <div className="font-black text-sm">🔥 আজকের অফার</div>
            <div className="text-2xl font-black text-yellow-400 mt-2">50% OFF</div>
            <div className="text-[11px] text-gray-300">Lal Sari সহ সকল শাড়িতে</div>
          </div>
        </div>

        {/* MAIN PRODUCT GRID */}
        <div className="col-span-12 md:col-span-9">
          {/* HERO BANNER */}
          <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl p-[2px]">
            <div className="bg-white rounded-[10px] p-4 flex justify-between items-center">
              <div><h2 className="font-black text-lg">গাউছিয়া ঈদ কালেকশন ২০২৬</h2><p className="text-xs text-gray-600">অরিজিনাল ইন্ডিয়ান শাড়ি, থ্রি-পিস, পাঞ্জাবি - সরাসরি মার্কেট থেকে</p></div>
              <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-black">Shop Now →</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {filtered.map((p:any)=>{
              const {original,current,discount,isFixed}=getPriceData(p);
              return(
                <div key={p.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition group">
                  <div className="relative">
                    {p.image ? <img src={p.image} className="w-full h-44 object-cover"/> : <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-xs">{p.title}</div>}
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="bg-red-500 text-white text-[9px] px-2 py-1 rounded-full font-black">-{discount}%</span>
                      {isFixed && <span className="bg-black text-white text-[9px] px-2 py-1 rounded-full">FIXED</span>}
                    </div>
                    <span className="absolute top-2 right-2 bg-white border text-[8px] px-2 py-1 rounded-full font-bold">{p.id}</span>
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] text-gray-500">{p.cat} • {p.shop||"SHOP-01"}</div>
                    <h3 className="font-bold text-sm truncate mt-1">{p.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-black text-orange-600">{current}৳</span>
                      <span className="text-[11px] text-gray-400 line-through">আপার প্রাইজ {original}৳</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-yellow-500">★★★★★</span><span className="text-[9px] text-gray-400">(১২৩ বিক্রি)</span>
                      <span className={`ml-auto text-[9px] px-2 py-0.5 rounded-full border ${isFixed?"bg-green-50 text-green-700 border-green-200":"bg-orange-50 text-orange-700 border-orange-200"}`}>{isFixed?"ফিক্সড প্রাইস":"ডিসকাউন্ট প্রাইস"}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 mt-2 text-[10px]">
                      <span className="font-bold">কেন নিবেন?</span> {p.comment||"অরিজিনাল ইন্ডিয়ান, কাপড় ১০০% সুতি, রঙ গ্যারান্টি"}
                    </div>
                    <button onClick={()=>setCart(c=>c+1)} className="w-full mt-2 bg-black text-white rounded-full py-2 text-xs font-black group-hover:bg-orange-500 transition">কার্টে যোগ করুন</button>
                  </div>
                </div>
              )
            })}
          </div>
          {filtered.length===0 && <div className="text-center py-20 bg-white rounded-xl border mt-4">কোনো পণ্য নেই - Admin থেকে Approve করুন</div>}
        </div>
      </div>

      {/* FOOTER MARKETING */}
      <div className="mt-10 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div><div className="font-black mb-2">GAUSIA COLLECTION</div><div className="text-gray-500">গাউছিয়া মার্কেট, ঢাকা থেকে সরাসরি। ২০১০ সাল থেকে বিশ্বস্ত।</div></div>
          <div><div className="font-black mb-2">কাস্টমার সার্ভিস</div><div className="text-gray-500">ফ্রি ডেলিভারি • ৭ দিন রিটার্ন • ক্যাশ অন ডেলিভারি • ২৪/৭ সাপোর্ট</div></div>
          <div><div className="font-black mb-2">আমাদের প্রতিশ্রুতি</div><div className="text-gray-500">১০০% অরিজিনাল • ফিক্সড প্রাইসে সেরা দাম • আপার প্রাইজ যাচাই • ডিসকাউন্ট গ্যারান্টি</div></div>
          <div><div className="font-black mb-2">যোগাযোগ</div><div className="text-gray-500">📍 গাউছিয়া মার্কেট, ২য় তলা<br/>📞 017XXXXXXXX<br/>🕘 সকাল ৯টা - রাত ৯টা</div></div>
        </div>
      </div>
    </div>
  )
}
