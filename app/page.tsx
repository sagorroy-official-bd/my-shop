"use client";
import { useState } from "react";

const WHATSAPP_NUMBER = "8801913129137";

const CATEGORIES = [
  { id: "সব", icon: "✨", bg: "bg-[#1a1a1a] text-white border-black", active: "bg-[#1a1a1a] text-white" },
  { id: "শাড়ি", icon: "👗", bg: "bg-[#ffeef2] text-[#b91c3a] border-[#ffd1dc]", active: "bg-[#b91c3a] text-white" },
  { id: "থ্রি পিস", icon: "👚", bg: "bg-[#eef7ff] text-[#1e5a8a] border-[#c2e0ff]", active: "bg-[#1e5a8a] text-white" },
  { id: "লেহেঙ্গা", icon: "💃", bg: "bg-[#f3e8ff] text-[#7c3aed] border-[#ddd0ff]", active: "bg-[#7c3aed] text-white" },
  { id: "বোরকা", icon: "🧕", bg: "bg-[#e6f4ea] text-[#1a6b3c] border-[#b7e1c5]", active: "bg-[#1a6b3c] text-white" },
  { id: "আবায়া", icon: "🖤", bg: "bg-[#f5f0eb] text-[#5a4630] border-[#e8ddd0]", active: "bg-[#5a4630] text-white" },
  { id: "সিটি গোল্ড", icon: "💍", bg: "bg-[#fff8e6] text-[#8a6d00] border-[#ffe9a8]", active: "bg-[#d4a017] text-white" },
  { id: "হিজাব", icon: "🧣", bg: "bg-[#eefcff] text-[#0e7c86] border-[#b8f0f5]", active: "bg-[#0e7c86] text-white" },
];

const PRODUCTS = [
  { id: 1, bn: "জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", price: 1850, old: 2500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&h=900&fit=crop", cat: "শাড়ি" },
  { id: 2, bn: "ব্রাইডাল লেহেঙ্গা - লাল", price: 4500, old: 6000, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&h=900&fit=crop", cat: "লেহেঙ্গা" },
  { id: 3, bn: "কালো বোরকা - প্রিমিয়াম", price: 2200, old: 2800, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700&h=900&fit=crop", cat: "বোরকা" },
  { id: 4, bn: "সিটি গোল্ড নেকলেস সেট", price: 850, old: 1200, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&h=900&fit=crop", cat: "সিটি গোল্ড" },
  { id: 5, bn: "কাতান শাড়ি - বিয়ের কালেকশন", price: 3200, old: 4500, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700&h=900&fit=crop", cat: "শাড়ি" },
  { id: 6, bn: "কটন থ্রি পিস - আরামদায়ক", price: 1250, old: 1600, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=700&h=900&fit=crop", cat: "থ্রি পিস" },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCat, setActiveCat] = useState("সব");

  const filtered = activeCat === "সব" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);
  const addToCart = (p: any) => setCart([...cart, p]);

  const orderOnWhatsApp = () => {
    let msg = `আসসালামু আলাইকুম, অর্ডার:%0A`;
    cart.forEach((p: any, i: number) => { msg += `${i + 1}. ${p.bn} - ${p.price}৳%0A`; });
    const total = cart.reduce((s, p) => s + p.price, 0);
    msg += `%0Aমোট: ${total}৳%0A%0Aনাম:%0Aফোন:%0Aঠিকানা:%0A`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a] font-sans">
      {/* TOP BLACK BAR - ঠিক যেমন চেয়েছিলেন */}
      <div className="bg-[#1a1a1a] text-white text-[11px] tracking-wide text-center py-2.5">
        🚚 ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-[#f0e8df] sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a1a1a] text-white flex items-center justify-center font-black">G</div>
            <div className="leading-none">
              <div className="font-black tracking-[0.2em] text-[14px]">GAUSIA</div>
              <div className="text-[9px] tracking-[0.25em] text-gray-500">COLLECTION</div>
            </div>
          </div>
          <div className="hidden md:flex flex-1 max-w-[380px] mx-8">
            <div className="w-full bg-[#f8f3ec] rounded-full px-5 py-2.5 flex items-center gap-2">
              <input placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন..." className="bg-transparent text-[12px] w-full focus:outline-none" />
              <span>⌕</span>
            </div>
          </div>
          <button onClick={()=>setShowCart(true)} className="bg-[#1a1a1a] text-white rounded-full px-5 py-2.5 text-xs font-bold">
            Cart ({cart.length})
          </button>
        </div>
      </header>

      {/* HERO - FULL VERSION */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#e8ddd0] bg-white rounded-full px-4 py-1.5 text-[11px]">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 20,000+ খুশি কাস্টমার
            </div>
            <h1 className="font-serif text-[48px] md:text-[64px] leading-[0.9] mt-6 font-black tracking-[-0.03em]">
              ঐতিহ্যের<br/>সাথে<br/>আধুনিকতা
            </h1>
            <p className="text-[13px] text-gray-500 mt-6 max-w-[380px] leading-relaxed">
              গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।
            </p>
            <div className="flex items-center gap-5 mt-8">
              <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} className="bg-[#1a1a1a] text-white rounded-full px-8 py-3.5 text-[13px] font-bold">
                কালেকশন দেখুন
              </button>
              <div className="text-[12px]">★★★★★ <span className="text-gray-500">4.9/5 (2.1k reviews)</span></div>
            </div>
            <div className="flex gap-6 mt-10 text-[11px] text-gray-600 border-t border-[#f0e8df] pt-5 max-w-[420px]">
              <span>✓ ঢাকায় ফ্রি ডেলিভারি</span><span>✓ ক্যাশ অন ডেলিভারি</span><span>✓ অরিজিনাল প্রোডাক্ট</span>
            </div>
          </div>
          <div className="bg-[#ff3d12] rounded-[32px] overflow-hidden aspect-[1/1] relative shadow-[0_25px_60px_rgba(255,61,18,0.25)]">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1100&fit=crop" className="w-full h-full object-cover object-top" alt="hero" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-[20px] p-5 flex justify-between items-center shadow-xl">
              <div><div className="text-[11px] text-gray-400">Starting from</div><div className="font-bold text-[16px]">1,250৳</div></div>
              <div className="text-right"><div className="text-[11px] text-gray-400">New Eid Collection</div><div className="text-[13px] font-bold">50+ Designs</div></div>
            </div>
          </div>
        </div>

        {/* COLORFUL CATEGORY PILLS */}
        <div className="mt-14 flex gap-3 overflow-auto pb-2">
          {CATEGORIES.map(c=>{
            const isActive = activeCat===c.id;
            return (
              <button key={c.id} onClick={()=>setActiveCat(c.id)} className={`flex items-center gap-2 px-6 py-3 rounded-full text-[13px] border-2 whitespace-nowrap font-bold transition-all ${isActive ? c.active + ' border-transparent shadow-lg scale-105' : c.bg}`}>
                <span>{c.icon}</span> {c.id}
              </button>
            )
          })}
        </div>
      </section>

      {/* PRODUCTS */}
      <main id="products" className="max-w-[1300px] mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-[24px] overflow-hidden border border-[#f3ebe1] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
              <img src={p.img} className="h-[360px] w-full object-cover" alt={p.bn} />
              <div className="p-5">
                <div className="text-[14px] font-medium leading-snug">{p.bn}</div>
                <div className="flex justify-between items-end mt-4">
                  <div><div className="font-black text-[16px]">{p.price}৳ <span className="text-[12px] font-normal line-through text-gray-400 ml-1">{p.old}৳</span></div><div className="text-[11px] text-green-600 font-bold mt-1">✓ In Stock • Free Delivery</div></div>
                  <button onClick={()=>addToCart(p)} className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white font-bold text-lg">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM 4 COLORFUL BOXES - আপনার চাওয়া অংশ */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <div className="text-[11px] tracking-[0.4em] text-gray-400">WHY GAUSIA</div>
            <h2 className="font-serif text-[32px] font-bold mt-2">আপনার আস্থাই আমাদের শক্তি</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300 rounded-[24px] p-7 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[28px] shadow-sm border border-amber-200">💎</div>
              <div className="font-black text-[16px] mt-4">১০০% অরিজিনাল</div><div className="text-[12px] font-bold text-amber-800 mt-1">গ্যারান্টি সহ</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-300 rounded-[24px] p-7 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[28px] shadow-sm border border-blue-200">🚚</div>
              <div className="font-black text-[16px] mt-4">ঢাকায় ফ্রি ডেলিভারি</div><div className="text-[12px] font-bold text-blue-800 mt-1">Inside Dhaka</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300 rounded-[24px] p-7 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[28px] shadow-sm border border-green-200">💵</div>
              <div className="font-black text-[16px] mt-4">Cash on Delivery</div><div className="text-[12px] font-bold text-green-800 mt-1">হাতে পেয়ে টাকা</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-300 rounded-[24px] p-7 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[28px] shadow-sm border border-purple-200">↩️</div>
              <div className="font-black text-[16px] mt-4">৩ দিনে রিটার্ন</div><div className="text-[12px] font-bold text-purple-800 mt-1">সহজ রিটার্ন</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#111] text-white"><div className="max-w-[1300px] mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row justify-between gap-6"><div><div className="tracking-[0.3em] font-black">GAUSIA COLLECTION</div><div className="text-[12px] text-gray-400 mt-3 max-w-sm">বাংলাদেশের নারীদের জন্য ট্রাস্টেড ফ্যাশন ব্র্যান্ড। ঈদ, বিয়ে ও পার্টির জন্য সেরা কালেকশন।</div></div><div className="text-sm"><div className="text-[11px] tracking-[0.2em] text-gray-500">CONTACT</div><div className="mt-3">WhatsApp: {WHATSAPP_NUMBER}</div></div></div></footer>

      {showCart && (<div className="fixed inset-0 bg-black/50 z-50 flex justify-end"><div className="bg-white w-full max-w-sm p-6 flex flex-col"><div className="flex justify-between mb-6"><h2 className="font-bold">কার্ট ({cart.length})</h2><button onClick={()=>setShowCart(false)} className="text-xl">✕</button></div><div className="flex-1 overflow-auto space-y-3">{cart.length===0 ? <p className="text-sm text-gray-500">কার্ট খালি</p> : cart.map((p,i)=><div key={i} className="flex justify-between py-3 border-b text-sm"><span>{p.bn}</span><span className="font-bold">{p.price}৳</span></div>)}</div>{cart.length>0 && <button onClick={orderOnWhatsApp} className="bg-black text-white rounded-full py-4 mt-6 font-bold">WhatsApp এ অর্ডার করুন - {cart.reduce((s,p)=>s+p.price,0)}৳</button>}</div></div>)}
    </div>
  );
}
