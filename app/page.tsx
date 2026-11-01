"use client";
import { useState, useEffect } from "react";

const DEFAULT_CATS = [
  {bn:"শাড়ি", en:"Saree", icon:"🥻", color:"from-pink-500 to-rose-500"},
  {bn:"থ্রি পিস", en:"Three Piece", icon:"👗", color:"from-purple-500 to-indigo-500"},
  {bn:"লেহেঙ্গা", en:"Lehenga", icon:"👘", color:"from-red-500 to-orange-500"},
  {bn:"বোরকা", en:"Borka", icon:"🧕", color:"from-gray-700 to-black"},
  {bn:"ব্রাইডাল", en:"Bridal", icon:"👰", color:"from-amber-500 to-yellow-500"},
  {bn:"সিটি গোল্ড", en:"City Gold", icon:"💍", color:"from-yellow-400 to-amber-600"},
  {bn:"হিজাব", en:"Hijab", icon:"🧣", color:"from-teal-500 to-emerald-500"},
];

const defaults=[
  {id:1, bn:"জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", en:"Georgette Party Saree", price:1850, old:2500, img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", cat:"শাড়ি"},
  {id:2, bn:"ব্রাইডাল লেহেঙ্গা - লাল", en:"Bridal Lehenga Red", price:4500, old:6000, img:"https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400", cat:"লেহেঙ্গা"},
  {id:3, bn:"কালো বোরকা - প্রিমিয়াম", en:"Black Borka Premium", price:2200, old:2800, img:"https://images.unsplash.com/photo-1582418702059-c141af5a3d28?w=400", cat:"বোরকা"},
  {id:4, bn:"সিটি গোল্ড নেকলেস সেট", en:"City Gold Set", price:850, old:1200, img:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", cat:"সিটি গোল্ড"},
];

export default function Page(){
  const [lang,setLang]=useState<"bn"|"en">("bn");
  const [products,setProducts]=useState(defaults);
  const [cats,setCats]=useState(DEFAULT_CATS);
  const [activeCat,setActiveCat]=useState("সব");
  const [cart,setCart]=useState<any[]>([]);

  useEffect(()=>{
    const s=localStorage.getItem("gausia_products");
    if(s){ try{ setProducts([...JSON.parse(s), ...defaults]); }catch{} }
    const c=localStorage.getItem("gausia_cats");
    if(c){ try{ const custom=JSON.parse(c); const mapped=custom.map((x:any)=>({bn:x.bn,en:x.en||x.bn,icon:"✨",color:"from-pink-500 to-orange-500"})); setCats([...DEFAULT_CATS,...mapped]); }catch{} }
  },[]);

  const t=(bn:string,en:string)=> lang==="bn"?bn:en;
  const filtered = activeCat==="সব"?products:products.filter(p=>p.cat===activeCat);
  const catsToShow = [...new Set(products.map(p=>p.cat))];

  return(
    <div className="min-h-screen bg-[#f8f5ff]">
      {/* TOP HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="bg-gradient-to-r from-[#ff006a] via-[#a855f7] to-[#ff6a00] text-white text-[11px] py-1.5 text-center font-bold">
          🎉 {t("৫০০ টাকার উপরে ফ্রি ডেলিভারি - ভুলতা, গাউছিয়া!","Free Delivery over 500 TK - Bhulta, Gausia!")} 🎉
        </div>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff006a] to-[#ff6a00] rounded-xl flex items-center justify-center text-white font-black text-lg">গ</div>
            <div>
              <h1 className="font-black text-[16px] leading-none">গাউছিয়া কালেকশন</h1>
              <p className="text-[10px] text-gray-500 font-bold tracking-widest">GAUSIA COLLECTION</p>
            </div>
          </div>
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="w-full bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-gray-400">🔍</span>
              <input placeholder={t("শাড়ি, থ্রি পিস খুঁজুন...","Search Saree, Three Piece...")} className="bg-transparent outline-none text-sm w-full"/>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setLang(lang==="bn"?"en":"bn")} className="border-2 border-[#ff006a] text-[#ff006a] px-4 py-1.5 rounded-full font-black text-xs hover:bg-[#ff006a] hover:text-white">{lang==="bn"?"EN":"বাং"}</button>
            <button className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-black">🛒 {cart.length} | ৳{cart.reduce((s,p)=>s+p.price,0)}</button>
          </div>
        </div>
        {/* CATEGORY NAVBAR */}
        <div className="border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
            <button onClick={()=>setActiveCat("সব")} className={`px-5 py-1.5 rounded-full text-xs font-black whitespace-nowrap ${activeCat==="সব"?"bg-black text-white":"bg-gray-100 hover:bg-gray-200"}`}>🌸 {t("সব","All")}</button>
            {cats.map(c=><button key={c.bn} onClick={()=>setActiveCat(c.bn)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 ${activeCat===c.bn?`bg-gradient-to-r ${c.color} text-white`:"bg-gray-100"}`}><span>{c.icon}</span> {lang==="bn"?c.bn:c.en}</button>)}
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      {activeCat==="সব" && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-gradient-to-r from-[#ff006a] via-[#a855f7] to-[#ff6a00] rounded-[24px] p-6 md:p-10 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <p className="bg-white/20 inline-block px-3 py-1 rounded-full text-[11px] font-black mb-3">✨ NEW COLLECTION 2025</p>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">{t("আধুনিক মেয়েদের","Modern Girls")} <br/><span className="text-yellow-200">{t("পছন্দের দোকান","Fashion Store")}</span></h2>
              <p className="mt-3 text-sm opacity-90">{t("শাড়ি, লেহেঙ্গা, বোরকা ও সিটি গোল্ড - একই ছাদের নিচে","Saree, Lehenga, Borka & City Gold - All Under One Roof")}</p>
              <div className="flex gap-3 mt-6">
                <button className="bg-white text-[#ff006a] px-6 py-2.5 rounded-full font-black text-sm">🛍️ {t("কেনাকাটা শুরু করুন","Shop Now")}</button>
                <button className="bg-black/30 backdrop-blur px-6 py-2.5 rounded-full font-bold text-sm">📍 {t("ভুলতা, গাউছিয়া","Bhulta, Gausia")}</button>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 text-[140px] opacity-20 rotate-12">🥻</div>
          </div>
        </div>
      )}

      {/* CATEGORY WISE SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {activeCat==="সব" ? (
          catsToShow.map(catName=>{
            const catProducts = products.filter(p=>p.cat===catName);
            const catInfo = cats.find(c=>c.bn===catName);
            if(catProducts.length===0) return null;
            return (
              <div key={catName} className="bg-white rounded-[20px] p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${catInfo?.color||"from-pink-500 to-orange-500"} flex items-center justify-center text-white text-lg`}>{catInfo?.icon||"✨"}</div>
                    <div>
                      <h3 className="font-black text-[16px]">{catName} কালেকশন</h3>
                      <p className="text-[11px] text-gray-500">{catProducts.length} {t("টি প্রোডাক্ট","Products")}</p>
                    </div>
                  </div>
                  <button onClick={()=>setActiveCat(catName)} className="text-[#ff006a] text-xs font-black border border-[#ff006a] px-4 py-1.5 rounded-full">{t("সব দেখুন","View All")} →</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {catProducts.slice(0,5).map((p:any)=>(
                    <div key={p.id} className="group border rounded-2xl p-2 hover:shadow-xl hover:-translate-y-1 transition-all bg-white">
                      <div className="relative overflow-hidden rounded-xl">
                        <img src={p.img} className="w-full h-40 object-cover group-hover:scale-110 transition duration-500"/>
                        <span className="absolute top-2 left-2 bg-black text-white text-[9px] px-2 py-1 rounded-full font-black">- {Math.round((1-p.price/(p.old||p.price+500))*100)}% OFF</span>
                        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur text-[9px] px-2 py-1 rounded-full font-bold">{p.cat}</span>
                      </div>
                      <p className="text-[12px] font-bold mt-2 line-clamp-2 min-h-[32px]">{lang==="bn"?p.bn:p.en}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[#ff006a] font-black text-sm">৳{p.price}</p>
                        <p className="text-gray-400 line-through text-[11px]">৳{p.old||p.price+400}</p>
                      </div>
                      <p className="text-[10px] text-green-600 font-bold">⭐ 4.8 (120) • {t("ফ্রি ডেলিভারি","Free Delivery")}</p>
                      <button onClick={()=>setCart([...cart,p])} className="bg-black group-hover:bg-gradient-to-r group-hover:from-[#ff006a] group-hover:to-[#ff6a00] text-white w-full py-2 rounded-full text-xs font-black mt-2 transition">{t("কার্টে যোগ করুন","Add to Cart")}</button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-[20px] p-4 shadow-sm">
            <h3 className="font-black text-lg mb-4">{activeCat} - {filtered.length} {t("টি পাওয়া গেছে","Found")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filtered.map((p:any)=>(
                <div key={p.id} className="border rounded-2xl p-2 hover:shadow-lg transition bg-white">
                  <img src={p.img} className="w-full h-40 object-cover rounded-xl"/>
                  <p className="text-[12px] font-bold mt-2">{lang==="bn"?p.bn:p.en}</p>
                  <p className="text-[#ff006a] font-black">৳{p.price}</p>
                  <button onClick={()=>setCart([...cart,p])} className="bg-black text-white w-full py-2 rounded-full text-xs font-black mt-2">{t("কার্টে যোগ","Add")}</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-black text-white mt-10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-black text-xl">গাউছিয়া কালেকশন 🌸</h2>
          <p className="text-xs text-gray-400 mt-2">ভুলতা, রূপগঞ্জ, নারায়ণগঞ্জ | 01913129137 | Daraz Style E-commerce</p>
        </div>
      </footer>
    </div>
  );
}