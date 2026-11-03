"use client";
import { useState, useEffect } from "react";

export default function CustomerFinal(){
  const [products,setProducts]=useState<any[]>([]);
  const [search,setSearch]=useState("");const [shop,setShop]=useState("সব");const [cart,setCart]=useState(0);
  
  useEffect(()=>{
    const approved=JSON.parse(localStorage.getItem("gausia_customer_final")||"[]");
    if(approved.length>0){
      setProducts(approved.map((p:any,i:number)=>({
        ...p,id:p.id||`SHOP-01-00${i+1}`,shop:p.shop||"SHOP-01",isPositive:true,comment:"পজিটিভ - অরিজিনাল",image:p.image||`https://picsum.photos/seed/gausia${i}/400/400`
      })));
    } else {
      // আপনার ছবির মতো 100% ডেমো - SHOP-01-001 এর মতো
      const demo=Array.from({length:30}).map((_,i)=>({
        id:`SHOP-01-00${i+1}`,shop:`SHOP-0${(i%10)+1}`,title:["জর্জেট শাড়ি","কাতান বোরকা","পার্টি লেহেঙ্গা","সিটি গোল্ড","থ্রি পিস","বেনারসি শাড়ি","হিজাব","পার্টি ড্রেস","জর্জেট শাড়ি","বোরকা"][i%10]+` - ${i+1}`,
        price:1250+i*20,originalPrice:1700+i*20,comment:i%4===0?"নেগেটিভ - এভারেজ":"পজিটিভ - অরিজিনাল",isPositive:i%4!==0,image:`https://picsum.photos/seed/${i+10}/400/400`
      }));
      setProducts(demo);
    }
  },[]);

  const shops=["সব","SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"];
  const filtered=products.filter(p=>{
    const matchShop=shop==="সব"||p.shop===shop;
    const matchSearch=p.title.toLowerCase().includes(search.toLowerCase());
    return matchShop&&matchSearch;
  });

  return(
    <div className="min-h-screen bg-white">
      {/* TOP - ACTIVE */}
      <div className="bg-black text-white text-[11px] py-2 text-center font-bold">◄ ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি • ২০,০০০+ খুশি কাস্টমার • ৭ দিনে রিটার্ন</div>

      {/* HEADER - ALL ACTIVE */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center border-b sticky top-0 bg-white z-20">
        <div className="flex items-center gap-2"><div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg text-white flex items-center justify-center font-black">G</div><div><div className="font-black text-sm">GAUSIA COLLECTION</div><div className="text-[9px] bg-orange-100 text-orange-700 px-2 rounded-full">অফিশিয়াল স্টোর</div></div></div>
        <div className="flex-1 max-w-md mx-4 hidden md:flex border border-black rounded-full px-4 py-2 gap-2"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন" className="w-full outline-none text-sm bg-transparent"/><span>⌕</span></div>
        <div className="flex gap-2 items-center"><button className="border rounded-full px-3 py-1 text-xs font-bold">EN</button><a href="/admin" className="text-xs font-bold border px-3 py-1 rounded-full hover:bg-black hover:text-white">Admin</a><div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">কার্ট ({cart})</div></div>
      </div>

      {/* HERO - FIXED IMAGE ISSUE */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border rounded-full px-3 py-1 text-[11px]"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 20,000+ খুশি কাস্টমার</div>
          <h1 className="text-[42px] font-black leading-[0.95] mt-6 tracking-tight">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/>আধুনিকতা</h1>
          <p className="text-sm text-gray-600 mt-4 max-w-[320px]">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
          <div className="flex gap-3 mt-6"><button onClick={()=>document.getElementById("products")?.scrollIntoView({behavior:"smooth"})} className="bg-black text-white px-6 py-3 rounded-full text-sm font-black">কালেকশন দেখুন</button><a href="https://wa.me/8801913129137" className="border-2 border-black px-6 py-3 rounded-full text-sm font-bold">💬 হোয়াটসঅ্যাপ</a></div>
        </div>
        <div className="bg-[#ff3d12] rounded-[24px] h-[460px] relative overflow-hidden border-2 border-black">
          {/* এখানে ছবি ১০০% আসবে - আগের Saree লেখা বাদ */}
          <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800" alt="Saree" className="w-full h-full object-cover object-top"/>
          <div className="absolute bottom-4 left-4 bg-white border-2 border-black rounded-full px-4 py-2 text-xs font-black">🔥 ঈদে 50% OFF</div>
        </div>
      </div>

      {/* SHOP FILTER BAR - ACTIVE */}
      <div className="bg-black text-white text-[11px] py-2 text-center font-bold" id="products">১০ দোকান x ১০ পণ্য = ১০০% ভেরিফাইড | নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতা</div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-auto"><button onClick={()=>setShop("সব")} className={`px-4 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap ${shop==="সব"?"bg-black text-white":"bg-white"}`}>সব ({products.length})</button>{shops.slice(1).map(s=><button key={s} onClick={()=>setShop(s)} className={`px-4 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap ${shop===s?"bg-black text-white":"bg-white"}`}>{s}</button>)}</div>

      {/* PRODUCT GRID - YOUR IMAGE 2 EXACT + ACTIVE */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-3 pb-10">
        {filtered.map((p:any)=>{
          const discount=Math.round(((p.originalPrice-p.price)/p.originalPrice)*100);
          return(
            <div key={p.id} className="bg-white border rounded-[14px] overflow-hidden hover:shadow-[4px_4px_0px_black] hover:border-black transition">
              <div className="h-44 bg-gray-100"><img src={p.image} alt={p.title} className="w-full h-full object-cover"/></div>
              <div className="p-2.5">
                <div className="flex justify-between"><span className="text-[9px] text-gray-500">{p.id}</span><span className="text-[9px] bg-red-500 text-white px-1.5 rounded-full">-{discount}%</span></div>
                <div className="font-bold text-[13px] truncate mt-1">{p.title}</div>
                <div className="text-[10px] text-gray-500">SHOP-01 গাউছিয়া</div>
                <div className={`text-[10px] mt-1 flex gap-1 ${p.isPositive?"text-green-700":"text-amber-600"}`}>{p.isPositive?"✅":"⚠️"} {p.comment}</div>
                <div className="flex justify-between items-center mt-2"><div><span className="font-black text-sm">{p.price}৳</span><span className="text-[10px] line-through text-gray-400 ml-1">{p.originalPrice}৳ আপার</span></div><button onClick={()=>setCart(c=>c+1)} className="bg-black text-white w-7 h-7 rounded-full font-black text-sm hover:bg-orange-500">+</button></div>
                <div className="text-[8px] text-center mt-1 text-gray-400">✓ ফিক্সড প্রাইস ✓ ক্যাশ অন ডেলিভারি</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* WHY CHOOSE US - YOUR IMAGE 3 EXACT */}
      <div className="bg-[#fafafa] border-t py-10">
        <div className="max-w-7xl mx-auto px-4 text-center"><span className="bg-black text-white text-[10px] px-3 py-1 rounded-full tracking-widest font-black">WHY CHOOSE US</span><h2 className="font-black text-2xl mt-3">আপনার আস্থাই আমাদের শক্তি</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#fff6e9] border rounded-2xl p-5"><div className="w-10 h-10 bg-orange-400 rounded-lg mx-auto flex items-center justify-center">💎</div><div className="font-bold text-sm mt-3">১০০% অরিজিনাল</div><div className="text-[10px] bg-orange-500 text-white px-2 py-1 rounded-full inline-block mt-2">যাচাইকৃত পণ্য ✓</div></div>
            <div className="bg-[#eef3ff] border rounded-2xl p-5"><div className="w-10 h-10 bg-blue-500 rounded-lg mx-auto flex items-center justify-center">🚚</div><div className="font-bold text-sm mt-3">ঢাকায় ফ্রি ডেলিভারি</div><div className="text-[10px] bg-blue-500 text-white px-2 py-1 rounded-full inline-block mt-2">Inside Dhaka ✓</div></div>
            <div className="bg-[#e8f8f0] border rounded-2xl p-5"><div className="w-10 h-10 bg-green-500 rounded-lg mx-auto flex items-center justify-center">💵</div><div className="font-bold text-sm mt-3">Cash on Delivery</div><div className="text-[10px] bg-green-500 text-white px-2 py-1 rounded-full inline-block mt-2">হাতে পেয়ে টাকা ✓</div></div>
            <div className="bg-[#f3e8ff] border rounded-2xl p-5"><div className="w-10 h-10 bg-purple-500 rounded-lg mx-auto flex items-center justify-center">↩️</div><div className="font-bold text-sm mt-3">৩ দিনে রিটার্ন</div><div className="text-[10px] bg-purple-500 text-white px-2 py-1 rounded-full inline-block mt-2">সহজ রিটার্ন ✓</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
