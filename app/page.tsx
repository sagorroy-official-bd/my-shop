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
    let msg = `অর্ডার:%0A`; cart.forEach((p: any, i: number) => { msg += `${i + 1}. ${p.bn} - ${p.price}৳%0A`; }); const total = cart.reduce((s, p) => s + p.price, 0); msg += `%0Aমোট: ${total}৳%0A`; window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a]">
      <div className="bg-[#1a1a1a] text-white text-[11px] text-center py-2">🚚 ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি</div>
      <header className="bg-white border-b sticky top-0 z-50"><div className="max-w-[1300px] mx-auto px-4 md:px-8 h-[64px] flex items-center justify-between gap-4"><div className="flex items-center gap-2"><div className="w-7 h-7 bg-black text-white flex items-center justify-center font-black">G</div><div className="font-black text-[13px] tracking-[0.2em]">GAUSIA COLLECTION</div></div><div className="hidden md:flex flex-1 max-w-sm mx-6"><div className="w-full bg-[#f8f3ec] rounded-full px-4 py-2 flex items-center"><input placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন..." className="bg-transparent text-xs w-full focus:outline-none" /><span className="text-xs">⌕</span></div></div><div className="flex items-center gap-2"><span className="hidden md:block text-[11px] border rounded-full px-3 py-1">EN</span><span className="hidden md:block text-[11px]">Admin</span><button onClick={()=>setShowCart(true)} className="bg-black text-white rounded-full px-4 py-2 text-xs">Cart ({cart.length})</button></div></div></header>

      <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border bg-white rounded-full px-3 py-1 text-[10px]"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>20,000+ খুশি কাস্টমার</div>
            <h1 className="font-serif text-[48px] md:text-[56px] leading-[0.9] mt-5 font-bold tracking-[-0.02em]">ঐতিহ্যের<br/>সাথে<br/>আধুনিকতা</h1>
            <p className="text-xs text-gray-500 mt-5 max-w-[360px] leading-relaxed">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
            <div className="flex items-center gap-4 mt-7">
              <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} className="bg-black text-white rounded-full px-7 py-3 text-xs font-bold">কালেকশন দেখুন</button>
              <div className="text-[11px]">★★★★★ <span className="text-gray-500">4.9/5 (2.1k reviews)</span></div>
            </div>
            <div className="flex gap-5 mt-8 text-[10px] text-gray-500 border-t pt-4 max-w-sm"><span>✓ ঢাকায় ফ্রি ডেলিভারি</span><span>✓ ক্যাশ অন ডেলিভারি</span><span>✓ অরিজিনাল প্রোডাক্ট</span></div>
          </div>
          <div className="bg-[#ff3d12] rounded-[28px] overflow-hidden aspect-[1/1] relative shadow-[0_20px_50px_rgba(255,61,18,0.2)]"><img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1100&fit=crop" className="w-full h-full object-cover" alt="hero" /><div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur rounded-[18px] p-4 flex justify-between shadow-lg"><div><div className="text-[10px] text-gray-400">Starting from</div><div className="font-bold">1,250৳</div></div><div className="text-right"><div className="text-[10px] text-gray-400">New Eid Collection</div><div className="text-xs font-bold">50+ Designs</div></div></div></div>
        </div>
        <div className="mt-12 flex gap-2.5 overflow-auto pb-3">{CATEGORIES.map(c=>{ const isActive = activeCat===c.id; return (<button key={c.id} onClick={()=>setActiveCat(c.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs border-2 whitespace-nowrap font-medium ${isActive ? c.active + ' border-transparent shadow-md' : c.bg}`}>{c.icon} {c.id}</button>)})}</div>
      </section>

      <main id="products" className="max-w-[1300px] mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">{filtered.map(p=>(<div key={p.id} className="bg-white rounded-[20px] overflow-hidden border hover:shadow-lg transition"><img src={p.img} className="h-[340px] w-full object-cover" alt={p.bn} /><div className="p-4"><div className="text-[13px] font-medium">{p.bn}</div><div className="flex justify-between items-end mt-3"><div><span className="font-bold">{p.price}৳</span><div className="text-[10px] text-green-600 mt-1">✓ In Stock • Free Delivery</div></div><button onClick={()=>addToCart(p)} className="w-9 h-9 rounded-full bg-black text-white">+</button></div></div></div>))}</div>
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300 rounded-[20px] p-6 text-center"><div className="text-2xl">💎</div><div className="font-black text-[14px] mt-3">১০০% অরিজিনাল</div><div className="text-[11px] font-bold text-amber-800">গ্যারান্টি সহ</div></div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-300 rounded-[20px] p-6 text-center"><div className="text-2xl">🚚</div><div className="font-black text-[14px] mt-3">ঢাকায় ফ্রি ডেলিভারি</div><div className="text-[11px] font-bold text-blue-800">Inside Dhaka</div></div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300 rounded-[20px] p-6 text-center"><div className="text-2xl">💵</div><div className="font-black text-[14px] mt-3">Cash on Delivery</div><div className="text-[11px] font-bold text-green-800">হাতে পেয়ে টাকা</div></div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-300 rounded-[20px] p-6 text-center"><div className="text-2xl">↩️</div><div className="font-black text-[14px] mt-3">৩ দিনে রিটার্ন</div><div className="text-[11px] font-bold text-purple-800">সহজ রিটার্ন</div></div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white"><div className="max-w-[1300px] mx-auto px-4 md:px-8 py-8 flex justify-between"><div className="tracking-[0.2em] font-black text-sm">GAUSIA COLLECTION</div><div className="text-sm">WhatsApp: {WHATSAPP_NUMBER}</div></div></footer>
      {showCart && (<div className="fixed inset-0 bg-black/40 z-50 flex justify-end"><div className="bg-white w-full max-w-sm p-6 flex flex-col"><div className="flex justify-between mb-6"><h2 className="font-bold">কার্ট</h2><button onClick={()=>setShowCart(false)}>✕</button></div><div className="flex-1 overflow-auto">{cart.length===0 ? <p className="text-sm">কার্ট খালি</p> : cart.map((p,i)=><div key={i} className="flex justify-between py-3 border-b text-sm"><span>{p.bn}</span><span className="font-bold">{p.price}৳</span></div>)}</div>{cart.length>0 && <button onClick={orderOnWhatsApp} className="bg-black text-white rounded-full py-3 mt-6 font-bold">WhatsApp এ অর্ডার করুন</button>}</div></div>)}
    </div>
  );
}
