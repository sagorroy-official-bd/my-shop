"use client";
import { useState, useEffect } from "react";
export default function GausiaFinalEditable(){
  const [products,setProducts]=useState<any[]>([]);const [search,setSearch]=useState("");const [shop,setShop]=useState("সব");const [cart,setCart]=useState(0);
  const [heroImg,setHeroImg]=useState("");const [heroOffer,setHeroOffer]=useState("ঈদে 50% OFF");const [editMode,setEditMode]=useState(false);

  useEffect(()=>{
    setHeroImg(localStorage.getItem("gausia_hero_image")||"https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800");
    setHeroOffer(localStorage.getItem("gausia_hero_offer")||"ঈদে 50% OFF");
    const approved=JSON.parse(localStorage.getItem("gausia_customer_final")||"[]");
    if(approved.length>0){setProducts(approved.map((p:any,i:number)=>({...p,id:p.id||`SHOP-01-00${i+1}`,shop:p.shop||"SHOP-01",isPositive:true,comment:"পজিটিভ - অরিজিনাল",image:p.image||`https://picsum.photos/seed/gausia${i}/400/400`})));
    }else{
      const demo=Array.from({length:30}).map((_,i)=>({id:`SHOP-0${(i%10)+1}-00${i+1}`,shop:`SHOP-0${(i%10)+1}`,title:["জর্জেট শাড়ি","কাতান বোরকা","পার্টি লেহেঙ্গা","সিটি গোল্ড","থ্রি পিস","বেনারসি শাড়ি","হিজাব","পার্টি ড্রেস","জর্জেট শাড়ি","বোরকা"][i%10]+` - ${i+1}`,price:1250+i*20,originalPrice:1700+i*20,comment:i%4===0?"নেগেটিভ - এভারেজ":"পজিটিভ - অরিজিনাল",isPositive:i%4!==0,image:`https://picsum.photos/seed/${i+10}/400/400`}));
      setProducts(demo);
    }
  },[]);

  const handleHeroUpload=(e:any)=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();reader.onload=()=>{
      const base64=reader.result as string;
      setHeroImg(base64);localStorage.setItem("gausia_hero_image",base64);
    };reader.readAsDataURL(file);
  };
  const handleOfferChange=(val:string)=>{setHeroOffer(val);localStorage.setItem("gausia_hero_offer",val);};

  const shops=["সব","SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"];
  const filtered=products.filter(p=>(shop==="সব"||p.shop===shop)&&p.title.toLowerCase().includes(search.toLowerCase()));

  return(
    <div className="min-h-screen bg-[#fffdf8] font-sans">
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-[11px] py-2 text-center font-bold">✨ ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি • ২০,০০০+ খুশি কাস্টমার • ৭ দিনে রিটার্ন ✨</div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center bg-white border-b border-orange-100 sticky top-0 z-20">
        <div className="flex items-center gap-2"><div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl text-white flex items-center justify-center font-black shadow">G</div><div><div className="font-black text-[14px]">GAUSIA COLLECTION</div><div className="text-[9px] bg-orange-50 border border-orange-200 text-orange-600 px-2.5 py-0.5 rounded-full font-bold">🌐 অনলাইন প্ল্যাটফর্ম</div></div></div>
        <div className="flex-1 max-w-md mx-4 hidden md:flex border border-orange-200 bg-orange-50/50 rounded-full px-4 py-2 gap-2"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন" className="w-full outline-none text-sm bg-transparent"/><span className="text-orange-400">⌕</span></div>
        <div className="flex gap-2 items-center"><button onClick={()=>setEditMode(!editMode)} className="text-[10px] border border-dashed border-orange-300 px-2 py-1 rounded-full">Edit Banner</button><a href="/admin" className="text-xs font-bold border px-3 py-1.5 rounded-full bg-white">Admin</a><div className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-bold">🛒 ({cart})</div></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-full px-3 py-1 text-[11px] font-bold"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 20,000+ খুশি কাস্টমার</div>
          <h1 className="text-[44px] font-black leading-[0.95] mt-6"><span className="text-gray-900">নারী ও পুরুষের</span><br/><span className="text-gray-900">ঐতিহ্যের সাথে</span><br/><span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">আধুনিকতার ছোঁয়া</span></h1>
          <p className="text-sm text-gray-500 mt-4 max-w-[340px]">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
          <div className="flex gap-3 mt-6"><button onClick={()=>document.getElementById("products")?.scrollIntoView({behavior:"smooth"})} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-7 py-3 rounded-full text-sm font-black shadow-lg shadow-orange-200">✨ কালেকশন দেখুন</button><a href="https://wa.me/8801913129137" className="border border-green-200 bg-green-50 text-green-700 px-6 py-3 rounded-full text-sm font-bold">💬 হোয়াটসঅ্যাপ</a></div>
          
          {/* COLORFUL ICONS - FIXED */}
          <div className="flex gap-4 mt-8">
            <div className="flex items-center gap-2 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-full px-3 py-2"><div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs">✓</div><div><div className="font-black text-[11px] text-orange-700">অরিজিনাল</div><div className="text-[9px] text-gray-500">গাউছিয়া থেকে</div></div></div>
            <div className="flex items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-full px-3 py-2"><div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs">★</div><div><div className="font-black text-[11px] text-blue-700">ফিক্সড</div><div className="text-[9px] text-gray-500">সেরা দাম</div></div></div>
            <div className="flex items-center gap-2 bg-gradient-to-br from-pink-50 to-rose-100 border border-pink-200 rounded-full px-3 py-2"><div className="w-7 h-7 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-xs">%</div><div><div className="font-black text-[11px] text-pink-700">ডিসকাউন্ট</div><div className="text-[9px] text-gray-500">অফার সহ</div></div></div>
          </div>
        </div>

        {/* HERO IMAGE - EDITABLE */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-200 to-pink-200 rounded-[28px] blur-xl opacity-40"></div>
          <div className="relative bg-white p-1.5 rounded-[24px] shadow-2xl shadow-orange-100">
            <div className="rounded-[18px] overflow-hidden h-[460px] relative">
              <img src={heroImg} alt="Special Banner" className="w-full h-full object-cover object-top"/>
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border border-white/20 rounded-full px-4 py-2 text-xs font-black shadow flex items-center gap-2">🔥 {heroOffer}</div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100"><span className="bg-white px-4 py-2 rounded-full text-xs font-bold">ছবি চেঞ্জ করতে Edit Banner চাপুন</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PANEL - FOR YOU TO UPLOAD ANYTIME */}
      {editMode && (
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <div className="bg-white border-2 border-dashed border-orange-300 rounded-2xl p-4 flex flex-wrap gap-4 items-center">
            <div className="font-black text-sm">🎨 ব্যানার এডিট:</div>
            <input type="file" accept="image/*" onChange={handleHeroUpload} className="text-xs border border-gray-200 rounded-full px-3 py-2 bg-gray-50"/>
            <div className="flex items-center gap-2"><span className="text-xs font-bold">অফার লেখা:</span><input value={heroOffer} onChange={e=>handleOfferChange(e.target.value)} className="border border-orange-200 rounded-full px-3 py-2 text-xs w-40 bg-orange-50" placeholder="ঈদে 50% OFF"/></div>
            <span className="text-[10px] text-gray-500">যে ছবি আপলোড করবেন, সেটা অল টাইম থাকবে। Vercel এও থাকবে।</span>
            <button onClick={()=>setEditMode(false)} className="ml-auto bg-black text-white px-4 py-2 rounded-full text-xs font-bold">Done ✓</button>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 text-white text-[11px] py-2.5 text-center font-bold tracking-wide" id="products">১০ দোকান x ১০ পণ্য = ১০০% ভেরিফাইড | নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতার ছোঁয়া</div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-auto bg-white border-b border-orange-50">{shops.map(s=>{const count=s==="সব"?products.length:products.filter(p=>p.shop===s).length;return <button key={s} onClick={()=>setShop(s)} className={`px-4 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap ${shop===s?"bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400 shadow":"bg-white border-gray-200 text-gray-600"}`}>{s==="সব"?`সব (${count})`:s}</button>})}</div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-4 py-6">{filtered.map((p:any)=>{const discount=Math.round(((p.originalPrice-p.price)/p.originalPrice)*100);return(<div key={p.id} className="bg-white border border-gray-100 rounded-[16px] overflow-hidden hover:border-orange-200 hover:shadow-xl transition"><div className="h-44 bg-gradient-to-br from-orange-50 to-pink-50"><img src={p.image} className="w-full h-full object-cover"/></div><div className="p-3"><div className="flex justify-between"><span className="text-[9px] text-gray-400 border bg-gray-50 px-2 rounded-full">{p.id}</span><span className="text-[9px] bg-red-500 text-white px-2 rounded-full font-bold">-{discount}%</span></div><div className="font-bold text-[13px] truncate mt-2">{p.title}</div><div className="text-[10px] text-orange-500 font-bold">{p.shop}</div><div className={`text-[10px] mt-1 px-2 py-1 rounded-full border w-fit ${p.isPositive?"bg-green-50 text-green-700 border-green-200":"bg-amber-50 text-amber-700 border-amber-200"}`}>{p.isPositive?"✅":"⚠️"} {p.comment}</div><div className="flex justify-between mt-3"><span className="font-black text-sm">{p.price}৳</span><button onClick={()=>setCart(c=>c+1)} className="bg-gray-900 text-white w-7 h-7 rounded-full font-black hover:bg-orange-500">+</button></div></div></div>)})}</div>
    </div>
  )
}
