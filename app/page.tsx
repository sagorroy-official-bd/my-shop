"use client";
import { useState, useEffect } from "react";

export default function GausiaFinalExact(){
  const [products,setProducts]=useState<any[]>([]);
  const [search,setSearch]=useState("");const [shop,setShop]=useState("সব");const [cart,setCart]=useState(0);const [showChat,setShowChat]=useState(false);

  useEffect(()=>{
    // আপনার SHOP-01-001 থেকে 100 টা ডেমো + Admin Approve করা
    const adminApproved=JSON.parse(localStorage.getItem("gausia_customer_final")||"[]");
    if(adminApproved.length>0){setProducts(adminApproved);return;}
    const demo=Array.from({length:30}).map((_,i)=>({
      id:`SHOP-01-${String(i+1).padStart(3,"0")}`,shop:`SHOP-0${(i%10)+1}`,shopCode:`SHOP-${String(i+1).padStart(2,"0")}`,
      title:["জর্জেট শাড়ি","কাতান বোরকা","পার্টি লেহেঙ্গা","সিটি গোল্ড সেট","প্রিমিয়াম থ্রি পিস","বেনারসি শাড়ি","হিজাব কামরা","পার্টি ড্রেস","জর্জেট শাড়ি","কাতান বোরকা"][i%10]+` - ${i+1}`,
      price:1250+i*25,originalPrice:1700+i*25,comment:i%3===0?"নেগেটিভ - এভারেজ":"পজিটিভ - অরিজিনাল",isPositive:i%3!==0,
      image:`https://picsum.photos/seed/${i+100}/400/400`,cat:"মহিলা"
    }));
    setProducts(demo);
  },[]);

  const shops=["সব","SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"];
  const filtered=products.filter(p=>{
    const s=shop==="সব"||p.shop===shop;
    const q=p.title.toLowerCase().includes(search.toLowerCase());
    return s&&q;
  });

  return(
    <div className="min-h-screen bg-white font-sans">
      {/* TOP BLACK - ACTIVE */}
      <div className="bg-black text-white text-[11px] py-2 text-center font-bold flex justify-center gap-2">
        <span className="text-orange-400">◄ ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি • ২০,০০০+ খুশি কাস্টমার • ৭ দিনে রিটার্ন</span>
        <span className="ml-auto mr-4 bg-white text-black px-2 py-0.5 rounded-full text-[10px] hidden md:block">{filtered.length} টি</span>
      </div>

      {/* HEADER - EXACT IMAGE 1 */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center sticky top-0 bg-white z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg text-white flex items-center justify-center font-black">G</div>
          <div><div className="font-black text-sm leading-none">GAUSIA COLLECTION</div><div className="text-[9px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">অনলাইন প্রোডাক্ট • অফিশিয়াল স্টোর</div></div>
        </div>
        <div className="flex-1 max-w-md mx-6 hidden md:flex border border-black/20 rounded-full px-4 py-2 gap-2 bg-gray-50"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন" className="w-full bg-transparent outline-none text-sm"/><span>⌕</span></div>
        <div className="flex gap-2 items-center"><button className="border rounded-full px-3 py-1 text-xs font-bold">EN</button><a href="/admin" className="text-xs font-bold">Admin</a><button onClick={()=>setShowChat(true)} className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">💬 Chat</button><div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">কার্ট ({cart})</div></div>
      </div>

      {/* HERO - IMAGE 1 EXACT */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 items-center border-b">
        <div>
          <div className="inline-flex items-center gap-2 border rounded-full px-3 py-1 text-[11px]"><span className="w-2 h-2 bg-green-500 rounded-full"></span> 20,000+ খুশি কাস্টমার</div>
          <h1 className="text-5xl font-black leading-[1.05] mt-6">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/>আধুনিকতা</h1>
          <p className="text-sm text-gray-600 mt-4 max-w-sm">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
          <button onClick={()=>document.getElementById("shop-bar")?.scrollIntoView({behavior:"smooth"})} className="mt-6 bg-black text-white px-6 py-3 rounded-full text-sm font-black">কালেকশন দেখুন</button>
          <div className="flex gap-6 mt-8 text-xs"><div className="font-bold">✓ অরিজিনাল<br/><span className="text-[10px] text-gray-500 font-normal">গাউছিয়া থেকে</span></div><div className="font-bold">✓ ফিক্সড<br/><span className="text-[10px] text-gray-500 font-normal">সেরা দাম</span></div><div className="font-bold">✓ ডিসকাউন্ট<br/><span className="text-[10px] text-gray-500 font-normal">অফার সহ</span></div></div>
        </div>
        <div className="bg-[#ff3b1f] rounded-[24px] overflow-hidden h-[460px] relative border">
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193a?q=80&w=800" alt="Saree Model" className="w-full h-full object-cover object-top"/>
          <div className="absolute bottom-4 left-4 bg-white border-2 border-black rounded-full px-4 py-2 text-xs font-black shadow-[3px_3px_0px_black]">ঈদে 50% OFF</div>
        </div>
      </div>

      {/* SHOP BAR - IMAGE 2 EXACT */}
      <div id="shop-bar" className="bg-black text-white text-[11px] py-2 px-4 flex justify-between items-center sticky top-[57px] z-10">
        <div className="text-center w-full font-bold">১০ দোকান x ১০ পণ্য = ১০০% ভেরিফাইড | নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতা</div>
        <div className="bg-white text-black px-2 py-0.5 rounded-full text-[10px] ml-2">100 টি</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-auto border-b">
        {shops.map(s=>{
          const count=s==="সব"?products.length:products.filter(p=>p.shop===s).length;
          return <button key={s} onClick={()=>setShop(s)} className={`px-4 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap ${shop===s?"bg-black text-white border-black":"bg-white border-gray-300"}`}>{s==="সব"?`সব (${count})`:s}</button>
        })}
      </div>

      {/* PRODUCT GRID - IMAGE 2 EXACT */}
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-white border border-gray-200 rounded-[16px] overflow-hidden hover:shadow-lg transition">
            <div className="h-44 overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover"/></div>
            <div className="p-3">
              <div className="flex justify-between items-center"><span className="text-[9px] text-gray-500">{p.id}</span>{p.isPositive?<span className="text-[9px] text-green-600">✅</span>:<span className="text-[9px] text-yellow-600">⚠️</span>}</div>
              <div className="font-bold text-[13px] mt-1 truncate">{p.title}</div>
              <div className="text-[11px] text-gray-500 truncate">{p.shopCode} গাউছিয়া</div>
              <div className={`text-[10px] mt-1 flex items-center gap-1 ${p.isPositive?"text-green-700":"text-yellow-700"}`}>{p.isPositive?"✅":"⚠️"} {p.comment}</div>
              <div className="flex justify-between items-center mt-2"><span className="font-black text-sm">{p.price}৳</span><button onClick={()=>setCart(c=>c+1)} className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black hover:bg-orange-500">+</button></div>
            </div>
          </div>
        ))}
      </div>

      {/* WHY CHOOSE US - IMAGE 3 EXACT */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pb-10 border-t pt-8">
        <div className="text-center"><span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-black tracking-widest">WHY CHOOSE US</span><h2 className="font-black text-2xl mt-3">আপনার আস্থাই আমাদের শক্তি</h2></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#fff6e9] border border-orange-100 rounded-2xl p-5 text-center"><div className="w-10 h-10 bg-orange-400 rounded-lg mx-auto flex items-center justify-center">💎</div><div className="font-bold text-sm mt-3">১০০% অরিজিনাল</div><div className="bg-orange-500 text-white text-[10px] px-3 py-1 rounded-full inline-block mt-2">যাচাইকৃত পণ্য ✓</div></div>
          <div className="bg-[#eef3ff] border border-blue-100 rounded-2xl p-5 text-center"><div className="w-10 h-10 bg-blue-500 rounded-lg mx-auto flex items-center justify-center">🚚</div><div className="font-bold text-sm mt-3">ঢাকায় ফ্রি ডেলিভারি</div><div className="bg-blue-500 text-white text-[10px] px-3 py-1 rounded-full inline-block mt-2">Inside Dhaka ✓</div></div>
          <div className="bg-[#e8f8f0] border border-green-100 rounded-2xl p-5 text-center"><div className="w-10 h-10 bg-green-500 rounded-lg mx-auto flex items-center justify-center">💵</div><div className="font-bold text-sm mt-3">Cash on Delivery</div><div className="bg-green-500 text-white text-[10px] px-3 py-1 rounded-full inline-block mt-2">হাতে পেয়ে টাকা ✓</div></div>
          <div className="bg-[#f3e8ff] border border-purple-100 rounded-2xl p-5 text-center"><div className="w-10 h-10 bg-purple-500 rounded-lg mx-auto flex items-center justify-center">↩️</div><div className="font-bold text-sm mt-3">৩ দিনে রিটার্ন</div><div className="bg-purple-500 text-white text-[10px] px-3 py-1 rounded-full inline-block mt-2">সহজ রিটার্ন ✓</div></div>
        </div>
      </div>

      <div className="bg-black text-white py-4 px-4 flex justify-between items-center"><div className="font-black text-sm tracking-widest">GAUSIA COLLECTION</div><div className="text-[11px] text-gray-400">WhatsApp: 8801913129137</div></div>

      {showChat && <div className="fixed bottom-4 right-4 bg-white border-2 border-black rounded-2xl p-4 shadow-[6px_6px_0px_black] w-72 z-50"><div className="flex justify-between font-black text-sm">💬 সাপোর্ট <button onClick={()=>setShowChat(false)}>×</button></div><div className="text-xs mt-2">WhatsApp: 017XXXXXXXX</div><a href="https://wa.me/8801913129137" target="_blank" className="block mt-2 bg-green-500 text-white text-center py-2 rounded-full text-xs font-black">WhatsApp খুলুন</a></div>}
    </div>
  )
}
