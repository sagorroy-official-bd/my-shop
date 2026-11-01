"use client";
import { useState } from "react";
const WHATSAPP_NUMBER = "8801913129137";

const CATEGORIES = [
  { id: "সব", icon: "✨", bg: "bg-[#1a1a1a] text-white border-[#1a1a1a]", activeBg: "bg-[#1a1a1a] text-white" },
  { id: "শাড়ি", icon: "👗", bg: "bg-[#ffeef2] text-[#b91c3a] border-[#ffd1dc]", activeBg: "bg-[#b91c3a] text-white" },
  { id: "থ্রি পিস", icon: "👚", bg: "bg-[#eef7ff] text-[#1e5a8a] border-[#c2e0ff]", activeBg: "bg-[#1e5a8a] text-white" },
  { id: "লেহেঙ্গা", icon: "💃", bg: "bg-[#f3e8ff] text-[#7c3aed] border-[#ddd0ff]", activeBg: "bg-[#7c3aed] text-white" },
  { id: "বোরকা", icon: "🧕", bg: "bg-[#e6f4ea] text-[#1a6b3c] border-[#b7e1c5]", activeBg: "bg-[#1a6b3c] text-white" },
  { id: "আবায়া", icon: "🖤", bg: "bg-[#f5f0eb] text-[#5a4630] border-[#e8ddd0]", activeBg: "bg-[#5a4630] text-white" },
  { id: "সিটি গোল্ড", icon: "💍", bg: "bg-[#fff8e6] text-[#8a6d00] border-[#ffe9a8]", activeBg: "bg-[#d4a017] text-white" },
  { id: "হিজাব", icon: "🧣", bg: "bg-[#eefcff] text-[#0e7c86] border-[#b8f0f5]", activeBg: "bg-[#0e7c86] text-white" },
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
    let msg = `আসসালামু আলাইকুম, Gausia Collection থেকে অর্ডার:%0A%0A`;
    cart.forEach((p: any, i: number) => { msg += `${i + 1}. ${p.bn} - ${p.price}৳%0A`; });
    const total = cart.reduce((s, p) => s + p.price, 0);
    msg += `%0Aমোট: ${total}৳%0A%0Aনাম:%0Aফোন:%0Aঠিকানা:%0A`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a]">
      <div className="bg-[#1a1a1a] text-[#fdf8f2] text-[11px] tracking-wide text-center py-2">🚚 ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি</div>
      <header className="bg-white border-b border-[#f0e8df] sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 h-[64px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 bg-[#1a1a1a] text-white flex items-center justify-center font-black text-sm">G</div><div className="leading-none"><div className="font-black tracking-[0.2em] text-[13px]">GAUSIA</div><div className="text-[9px] tracking-[0.2em] text-gray-400">COLLECTION</div></div></div>
          <div className="hidden md:flex flex-1 max-w-sm mx-6"><div className="w-full bg-[#f8f3ec] rounded-full px-4 py-2 flex items-center"><input placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন..." className="bg-transparent text-xs w-full focus:outline-none" /><span className="text-xs">⌕</span></div></div>
          <div className="flex items-center gap-2"><span className="hidden md:block text-[11px] border rounded-full px-3 py-1">EN</span><span className="hidden md:block text-[11px]">Admin</span><button onClick={()=>setShowCart(true)} className="bg-[#1a1a1a] text-white rounded-full px-4 py-2 text-xs">Cart ({cart.length})</button></div>
        </div>
      </header>

      <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#e8ddd0] bg-white rounded-full px-3 py-1 text-[10px] text-gray-500"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>20,000+ খুশি কাস্টমার</div>
            <h1 className="font-serif text-[44px] md:text-[56px] leading-[0.9] mt-5 tracking-[-0.03em] font-bold">ঐতিহ্যের<br/>সাথে<br/>আধুনিকতা</h1>
            <p className="text-xs text-gray-500 mt-5 max-w-[360px] leading-relaxed">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
            <div className="flex items-center gap-4 mt-7">
              <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} className="bg-[#1a1a1a] text-white rounded-full px-7 py-3 text-xs font-bold hover:bg-black transition">কালেকশন দেখুন</button>
              <div className="flex items-center gap-1.5 text-[11px]"><span>★★★★★</span><span className="text-gray-500">4.9/5 (2.1k reviews)</span></div>
            </div>
            <div className="flex gap-5 mt-10 text-[10px] text-gray-500 border-t border-[#eee6db] pt-4 max-w-sm">
              <span>✓ ঢাকায় ফ্রি ডেলিভারি</span><span>✓ ক্যাশ অন ডেলিভারি</span><span>✓ অরিজিনাল প্রোডাক্ট</span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#ff3d12] rounded-[28px] overflow-hidden aspect-[4/3] md:aspect-[1/1] relative shadow-[0_20px_50px_rgba(255,61,18,0.2)]">
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1100&fit=crop" className="w-full h-full object-cover object-top" alt="hero" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-[18px] p-4 flex justify-between items-center shadow-lg">
                <div><div className="text-[10px] text-gray-400 tracking-wide">Starting from</div><div className="font-bold text-[15px]">1,250৳</div></div>
                <div className="text-right"><div className="text-[10px] text-gray-400">New Eid Collection</div><div className="text-xs font-bold">50+ Designs</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex gap-2.5 overflow-auto pb-3 scrollbar-hide">
            {CATEGORIES.map(c=>{
              const isActive = activeCat===c.id;
              return (
                <button key={c.id} onClick={()=>setActiveCat(c.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs border-2 whitespace-nowrap font-medium transition-all ${isActive ? c.activeBg + ' border-transparent shadow-md scale-[1.02]' : c.bg + ' hover:scale-[1.02] hover:shadow-sm'}`}>
                  <span className="text-[14px]">{c.icon}</span>{c.id}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <main id="products" className="max-w-[1300px] mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {filtered.map(p=>(
            <div key={p.id} className="group bg-white rounded-[22px] overflow-hidden border border-[#f3ebe1] hover:border-[#e8ddd0] hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)] transition-all duration-300">
              <div className="relative overflow-hidden aspect-[3/4]"><img src={p.img} className="w-full h-full object-cover group-hover:scale-[1.05] transition duration-700" alt={p.bn} /><div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold">IN STOCK</div></div>
              <div className="p-4"><div className="text-[13px] font-medium min-h-[36px] leading-snug">{p.bn}</div><div className="flex justify-between items-end mt-3"><div><span className="font-bold text-[15px]">{p.price}৳</span><span className="text-[11px] line-through text-gray-400 ml-2">{p.old}৳</span></div><button onClick={()=>addToCart(p)} className="w-9 h-9 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-black transition">+</button></div></div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-[#1a1a1a] text-white"><div className="max-w-[1300px] mx-auto px-4 md:px-8 py-8 flex justify-between"><div className="tracking-[0.2em] font-black text-sm">GAUSIA COLLECTION</div><div className="text-sm">WhatsApp: {WHATSAPP_NUMBER}</div></div></footer>

      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end"><div className="bg-[#fdfbf7] w-full max-w-sm p-6 flex flex-col"><div className="flex justify-between mb-6"><h2 className="font-bold">কার্ট</h2><button onClick={()=>setShowCart(false)}>✕</button></div><div className="flex-1 overflow-auto">{cart.length===0 ? <p className="text-sm text-gray-500">কার্ট খালি</p> : cart.map((p,i)=><div key={i} className="flex justify-between py-3 border-b text-sm"><span>{p.bn}</span><span className="font-bold">{p.price}৳</span></div>)}</div>{cart.length>0 && <button onClick={orderOnWhatsApp} className="bg-[#1a1a1a] text-white rounded-full py-3 mt-6 font-bold">WhatsApp এ অর্ডার করুন</button>}</div></div>
      )}
    </div>
  );
}
