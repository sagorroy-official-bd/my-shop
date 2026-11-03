"use client";
import { useState, useEffect } from "react";
export default function GausiaColorful(){
  const [products,setProducts]=useState<any[]>([]);const [search,setSearch]=useState("");const [shop,setShop]=useState("সব");const [cart,setCart]=useState(0);
  useEffect(()=>{
    const approved=JSON.parse(localStorage.getItem("gausia_customer_final")||"[]");
    if(approved.length>0){setProducts(approved.map((p:any,i:number)=>({...p,id:p.id||`SHOP-01-00${i+1}`,shop:p.shop||"SHOP-01",isPositive:true,comment:"পজিটিভ - অরিজিনাল",image:p.image||`https://picsum.photos/seed/gausia${i}/400/400`})));
    }else{
      const demo=Array.from({length:30}).map((_,i)=>({id:`SHOP-0${(i%10)+1}-00${i+1}`,shop:`SHOP-0${(i%10)+1}`,title:["জর্জেট শাড়ি","কাতান বোরকা","পার্টি লেহেঙ্গা","সিটি গোল্ড","থ্রি পিস","বেনারসি শাড়ি","হিজাব","পার্টি ড্রেস","জর্জেট শাড়ি","বোরকা"][i%10]+` - ${i+1}`,price:1250+i*20,originalPrice:1700+i*20,comment:i%4===0?"নেগেটিভ - এভারেজ":"পজিটিভ - অরিজিনাল",isPositive:i%4!==0,image:`https://picsum.photos/seed/${i+10}/400/400`}));
      setProducts(demo);
    }
  },[]);
  const shops=["সব","SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"];
  const filtered=products.filter(p=>(shop==="সব"||p.shop===shop)&&p.title.toLowerCase().includes(search.toLowerCase()));

  return(
    <div className="min-h-screen bg-[#fffdf8] font-sans">
      {/* TOP GRADIENT - COLORFUL */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-[11px] py-2 text-center font-bold tracking-wide">✨ ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি • ২০,০০০+ খুশি কাস্টমার • ৭ দিনে রিটার্ন ✨</div>

      {/* HEADER - SOFT BORDER + COLORFUL ICONS */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center bg-white/80 backdrop-blur sticky top-0 z-20 border-b border-orange-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl text-white flex items-center justify-center font-black shadow">G</div>
          <div><div className="font-black text-[14px] tracking-wide text-gray-900">GAUSIA COLLECTION</div><div className="text-[9px] bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full font-bold">🌐 অনলাইন প্ল্যাটফর্ম</div></div>
        </div>
        <div className="flex-1 max-w-md mx-6 hidden md:flex border border-orange-200 bg-orange-50/50 rounded-full px-4 py-2 gap-2 focus-within:border-orange-400 focus-within:bg-white transition"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন" className="w-full outline-none text-sm bg-transparent"/><span className="text-orange-400">⌕</span></div>
        <div className="flex gap-2 items-center">
          <button className="border border-gray-200 bg-white px-3 py-1.5 rounded-full text-xs font-bold hover:border-orange-300">EN</button>
          <a href="/admin" className="text-xs font-bold border border-gray-200 bg-white px-3 py-1.5 rounded-full hover:bg-gray-900 hover:text-white transition">Admin</a>
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow">🛒 কার্ট ({cart})</div>
        </div>
      </div>

      {/* HERO - COLORFUL FONTS */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-full px-3 py-1 text-[11px] font-bold"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 20,000+ খুশি কাস্টমার</div>
          <h1 className="text-[44px] font-black leading-[0.95] mt-6 tracking-tight">
            <span className="text-gray-900">নারী ও পুরুষের</span><br/>
            <span className="text-gray-900">ঐতিহ্যের সাথে</span><br/>
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">আধুনিকতার ছোঁয়া</span>
          </h1>
          <p className="text-sm text-gray-500 mt-4 max-w-[340px] leading-relaxed">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
          <div className="flex gap-3 mt-6">
            <button onClick={()=>document.getElementById("products")?.scrollIntoView({behavior:"smooth"})} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-7 py-3 rounded-full text-sm font-black shadow-lg shadow-orange-200 hover:shadow-xl transition">✨ কালেকশন দেখুন</button>
            <a href="https://wa.me/8801913129137" className="border border-green-200 bg-green-50 text-green-700 px-6 py-3 rounded-full text-sm font-bold hover:bg-green-500 hover:text-white transition">💬 হোয়াটসঅ্যাপ</a>
          </div>
          <div className="flex gap-5 mt-8">
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">✓</div><div><div className="font-bold text-xs text-orange-600">অরিজিনাল</div><div className="text-[10px] text-gray-400">গাউছিয়া থেকে</div></div></div>
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">★</div><div><div className="font-bold text-xs text-blue-600">ফিক্সড</div><div className="text-[10px] text-gray-400">সেরা দাম</div></div></div>
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">%</div><div><div className="font-bold text-xs text-pink-600">ডিসকাউন্ট</div><div className="text-[10px] text-gray-400">অফার সহ</div></div></div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-200 to-pink-200 rounded-[28px] blur-xl opacity-50"></div>
          <div className="relative bg-white p-1.5 rounded-[24px] shadow-2xl shadow-orange-100">
            <div className="rounded-[18px] overflow-hidden h-[460px] relative">
              <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800" alt="Saree" className="w-full h-full object-cover object-top"/>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur border border-orange-200 rounded-full px-4 py-2 text-xs font-black shadow text-orange-600">🔥 ঈদে 50% OFF</div>
            </div>
          </div>
        </div>
      </div>

      {/* SHOP BAR - COLORFUL GRADIENT */}
      <div className="bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 text-white text-[11px] py-2.5 text-center font-bold tracking-wide" id="products">১০ দোকান x ১০ পণ্য = ১০০% ভেরিফাইড | নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতার ছোঁয়া</div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-auto bg-white border-b border-orange-50">
        {shops.map(s=>{
          const count=s==="সব"?products.length:products.filter(p=>p.shop===s).length;
          return <button key={s} onClick={()=>setShop(s)} className={`px-4 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap transition ${shop===s?"bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400 shadow":"bg-white border-gray-200 text-gray-600 hover:border-orange-200"}`}>{s==="সব"?`সব (${count})`:s}</button>
        })}
      </div>

      {/* PRODUCT GRID - SOFT COLORFUL BORDER */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-4 py-6">
        {filtered.map((p:any)=>{
          const discount=Math.round(((p.originalPrice-p.price)/p.originalPrice)*100);
          return(
            <div key={p.id} className="bg-white border border-gray-100 rounded-[16px] overflow-hidden hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition group">
              <div className="h-44 bg-gradient-to-br from-orange-50 to-pink-50 overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/></div>
              <div className="p-3">
                <div className="flex justify-between items-center"><span className="text-[9px] text-gray-400 border border-gray-100 bg-gray-50 px-2 py-0.5 rounded-full">{p.id}</span><span className="text-[9px] bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full font-bold">-{discount}%</span></div>
                <div className="font-bold text-[13px] truncate mt-2 text-gray-800">{p.title}</div>
                <div className="text-[10px] text-orange-500 font-bold">গাউছিয়া • {p.shop}</div>
                <div className={`text-[10px] mt-1.5 flex gap-1 items-center px-2 py-1 rounded-full border w-fit ${p.isPositive?"bg-green-50 text-green-700 border-green-200":"bg-amber-50 text-amber-700 border-amber-200"}`}>{p.isPositive?"✅":"⚠️"} {p.comment}</div>
                <div className="flex justify-between items-center mt-3"><div><span className="font-black text-[15px] text-gray-900">{p.price}৳</span><span className="text-[10px] line-through text-gray-400 ml-1">{p.originalPrice}৳</span></div><button onClick={()=>setCart(c=>c+1)} className="bg-gray-900 text-white w-8 h-8 rounded-full font-black text-sm hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition">+</button></div>
                <div className="text-[8px] text-center mt-2 text-gray-400 tracking-wide">✓ ফিক্সড প্রাইস ✓ ক্যাশ অন ডেলিভারি</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
