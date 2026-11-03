"use client";
import { useState, useEffect } from "react";

export default function CustomerPage(){
  const [products,setProducts]=useState<any[]>([]);
  const [search,setSearch]=useState("");
  const [shop,setShop]=useState("সব");
  const [cart,setCart]=useState(0);
  const [heroImg,setHeroImg]=useState("");
  const [heroOffer,setHeroOffer]=useState("ঈদে 50% OFF");
  const [editMode,setEditMode]=useState(false);
  const [allShops,setAllShops]=useState<string[]>([]);

  useEffect(()=>{
    // Banner load
    const savedImg = localStorage.getItem("gausia_hero_image");
    const savedOffer = localStorage.getItem("gausia_hero_offer");
    setHeroImg(savedImg || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800");
    if(savedOffer) setHeroOffer(savedOffer);

    // দোকান লোড - আপনি Admin থেকে যা Add করবেন সেটাই আসবে
    const savedShops = JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
    if(savedShops.length>0) setAllShops(savedShops);
    else setAllShops(["SHOP-01","SHOP-02","SHOP-03","SHOP-04","SHOP-05","SHOP-06","SHOP-07","SHOP-08","SHOP-09","SHOP-10"]);

    // প্রোডাক্ট লোড
    const approved = JSON.parse(localStorage.getItem("gausia_customer_final")||"[]");
    if(approved.length>0){
      setProducts(approved);
    } else {
      setProducts([{id:"SHOP-01-0001",shop:"SHOP-01",title:"ডেমো শাড়ি",price:1250,originalPrice:1700,comment:"পজিটিভ - অরিজিনাল",isPositive:true,image:"https://picsum.photos/seed/1/400/400"}]);
    }
  },[]);

  const handleHeroUpload=(e:any)=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>{const b64=reader.result as string;setHeroImg(b64);localStorage.setItem("gausia_hero_image",b64);};
    reader.readAsDataURL(file);
  };
  const handleOfferChange=(val:string)=>{setHeroOffer(val);localStorage.setItem("gausia_hero_offer",val);};

  const filtered=products.filter(p=>{
    const matchShop = shop==="সব" || p.shop===shop;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchShop && matchSearch;
  });

  return(
    <div className="min-h-screen bg-[#fffbf7]">
      {/* TOP BAR - আপনার ছবির মতো কমলা-পিংক */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[11px] py-2 text-center font-bold">ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি • ২০,০০০+ খুশি কাস্টমার • ৭ দিনে রিটার্ন</div>

      {/* HEADER - আপনার ছবির মতো */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center bg-white sticky top-0 z-20 border-b border-orange-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-black">G</div>
          <div><div className="font-black text-sm">GAUSIA COLLECTION</div><div className="text-[9px] bg-orange-50 border border-orange-100 text-orange-600 px-2 rounded-full">অনলাইন প্ল্যাটফর্ম</div></div>
        </div>
        <div className="flex-1 max-w-sm mx-4 hidden md:flex border border-gray-200 rounded-full px-4 py-2 bg-gray-50"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন" className="w-full bg-transparent outline-none text-sm"/><span className="text-gray-400">⌕</span></div>
        <div className="flex gap-2 items-center">
          <button onClick={()=>setEditMode(!editMode)} className="text-[10px] border border-dashed border-orange-200 px-2 py-1 rounded-full bg-orange-50">Edit Banner</button>
          <a href="/admin" className="border border-gray-200 px-3 py-1.5 rounded-full text-xs font-bold bg-white">Admin</a>
          <div className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold">🛒 ({cart})</div>
        </div>
      </div>

      {/* HERO - আপনার ছবির মতো হুবহু */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 rounded-full px-3 py-1 text-[11px] font-bold"><span className="w-2 h-2 bg-green-500 rounded-full"></span> ২০,০০০+ খুশি কাস্টমার</div>
          <h1 className="text-[40px] font-black leading-[0.95] mt-6 text-gray-900">নারী ও পুরুষের<br/>ঐতিহ্যের সাথে<br/><span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">আধুনিকতার ছোঁয়া</span></h1>
          <p className="text-sm text-gray-500 mt-4 max-w-[320px]">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
          <div className="flex gap-3 mt-6">
            <button onClick={()=>document.getElementById("shop-section")?.scrollIntoView({behavior:"smooth"})} className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-6 py-3 rounded-full text-sm font-black shadow">✨ কালেকশন দেখুন</button>
            <a href="https://wa.me/8801913129137" className="border border-gray-200 bg-white px-6 py-3 rounded-full text-sm font-bold">💬 হোয়াটসঅ্যাপ</a>
          </div>

          {/* আইকনগুলো মার্জনীয় সফট কালারফুল */}
          <div className="flex gap-3 mt-8">
            <div className="flex items-center gap-2 bg-[#FFF4E6] border border-[#FFE0B2] rounded-full px-3 py-2"><div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div><div><div className="font-bold text-[11px] text-[#E65100]">অরিজিনাল</div><div className="text-[9px] text-gray-500">গাউছিয়া থেকে</div></div></div>
            <div className="flex items-center gap-2 bg-[#E3F2FD] border border-[#BBDEFB] rounded-full px-3 py-2"><div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-[10px]">★</div><div><div className="font-bold text-[11px] text-[#1565C0]">ফিক্সড</div><div className="text-[9px] text-gray-500">সেরা দাম</div></div></div>
            <div className="flex items-center gap-2 bg-[#FCE4EC] border border-[#F8BBD0] rounded-full px-3 py-2"><div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white text-[10px]">%</div><div><div className="font-bold text-[11px] text-[#AD1457]">ডিসকাউন্ট</div><div className="text-[9px] text-gray-500">অফার সহ</div></div></div>
          </div>
        </div>

        {/* ডান পাশের ছবি - আপনি যেকোনো সময় চেঞ্জ করতে পারবেন */}
        <div className="relative">
          <div className="bg-white p-2 rounded-[20px] shadow-xl border border-orange-50">
            <div className="rounded-[14px] overflow-hidden h-[420px] relative">
              <img src={heroImg} alt="Banner" className="w-full h-full object-cover object-top"/>
              <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-[11px] font-black shadow">🔥 {heroOffer}</div>
            </div>
          </div>
        </div>
      </div>

      {editMode && (<div className="max-w-7xl mx-auto px-6 pb-4"><div className="bg-white border-2 border-dashed border-orange-200 rounded-2xl p-4 flex gap-3 items-center"><input type="file" accept="image/*" onChange={handleHeroUpload} className="text-xs border rounded-full px-3 py-2 bg-gray-50"/><input value={heroOffer} onChange={e=>handleOfferChange(e.target.value)} className="border border-orange-200 rounded-full px-3 py-2 text-xs w-40 bg-orange-50" placeholder="ঈদে 50% OFF"/><button onClick={()=>setEditMode(false)} className="ml-auto bg-black text-white px-4 py-2 rounded-full text-xs">Done ✓</button></div></div>)}

      {/* নিচের দোকানের বার - আপনার ছবির মতো কিন্তু এখন ডাইনামিক */}
      <div id="shop-section" className="bg-gradient-to-r from-orange-600 to-red-500 text-white text-[11px] py-2 text-center font-bold">{allShops.length} দোকান x {products.length} পণ্য = ১০০% ভেরিফাইড | নারী ও পুরুষের ঐতিহ্যের সাথে আধুনিকতার ছোঁয়া</div>
      
      {/* দোকানগুলো - শুধু নাম থাকবে, বাড়তে থাকবে */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-auto bg-white border-b">
        <button onClick={()=>setShop("সব")} className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap ${shop==="সব"?"bg-orange-500 text-white border-orange-500":"bg-white text-gray-600 border-gray-200"}`}>সব ({products.length})</button>
        {allShops.map(s=>{
          const count=products.filter(p=>p.shop===s).length;
          return <button key={s} onClick={()=>setShop(s)} className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap ${shop===s?"bg-black text-white border-black":"bg-white text-gray-600 border-gray-200 hover:border-orange-200"}`}>{s}</button>
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {filtered.map((p:any)=><div key={p.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden"><div className="h-40 bg-gray-50"><img src={p.image} className="w-full h-full object-cover"/></div><div className="p-3"><div className="text-[10px] text-gray-400">{p.id}</div><div className="font-bold text-sm truncate">{p.title}</div><div className="text-xs text-orange-600 font-bold">{p.shop}</div><div className="flex justify-between mt-2"><span className="font-black">{p.price}৳</span><button onClick={()=>setCart(c=>c+1)} className="bg-black text-white w-6 h-6 rounded-full">+</button></div></div></div>)}
      </div>
    </div>
  )
}
