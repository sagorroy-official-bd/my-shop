"use client";
import { useState } from "react";
const WHATSAPP_NUMBER = "8801913129137";

const CATEGORIES = [
  { id: "সব", idEn: "All", icon: "✨", bg: "bg-[#1a1a1a] text-white border-black", active: "bg-[#1a1a1a] text-white" },
  { id: "শাড়ি", idEn: "Saree", icon: "👗", bg: "bg-[#ffeef2] text-[#b91c3a] border-[#ffd1dc]", active: "bg-[#b91c3a] text-white" },
  { id: "থ্রি পিস", idEn: "3 Pcs", icon: "👚", bg: "bg-[#eef7ff] text-[#1e5a8a] border-[#c2e0ff]", active: "bg-[#1e5a8a] text-white" },
  { id: "লেহেঙ্গা", idEn: "Lehenga", icon: "💃", bg: "bg-[#f3e8ff] text-[#7c3aed] border-[#ddd0ff]", active: "bg-[#7c3aed] text-white" },
  { id: "বোরকা", idEn: "Borka", icon: "🧕", bg: "bg-[#e6f4ea] text-[#1a6b3c] border-[#b7e1c5]", active: "bg-[#1a6b3c] text-white" },
  { id: "আবায়া", idEn: "Abaya", icon: "🖤", bg: "bg-[#f5f0eb] text-[#5a4630] border-[#e8ddd0]", active: "bg-[#5a4630] text-white" },
  { id: "সিটি গোল্ড", idEn: "City Gold", icon: "💍", bg: "bg-[#fff8e6] text-[#8a6d00] border-[#ffe9a8]", active: "bg-[#d4a017] text-white" },
  { id: "হিজাব", idEn: "Hijab", icon: "🧣", bg: "bg-[#eefcff] text-[#0e7c86] border-[#b8f0f5]", active: "bg-[#0e7c86] text-white" },
];

const PRODUCTS = [
  { id: 1, bn: "জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", en: "Georgette Party Saree", price: 1850, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&h=900&fit=crop", cat: "শাড়ি" },
  { id: 2, bn: "ব্রাইডাল লেহেঙ্গা - লাল", en: "Bridal Lehenga - Red", price: 4500, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&h=900&fit=crop", cat: "লেহেঙ্গা" },
  { id: 3, bn: "কালো বোরকা - প্রিমিয়াম", en: "Black Borka - Premium", price: 2200, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700&h=900&fit=crop", cat: "বোরকা" },
  { id: 4, bn: "সিটি গোল্ড নেকলেস সেট", en: "City Gold Necklace", price: 850, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&h=900&fit=crop", cat: "সিটি গোল্ড" },
  { id: 5, bn: "কাতান শাড়ি - বিয়ের কালেকশন", en: "Katan Saree - Wedding", price: 3200, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700&h=900&fit=crop", cat: "শাড়ি" },
  { id: 6, bn: "কটন থ্রি পিস - আরামদায়ক", en: "Cotton Three Piece", price: 1250, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=700&h=900&fit=crop", cat: "থ্রি পিস" },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCat, setActiveCat] = useState("সব");
  const [lang, setLang] = useState<'bn'|'en'>('bn');

  const L = {
    bn: { top: "🚚 ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি", search: "শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন...", cust: "20,000+ খুশি কাস্টমার", t1: "ঐতিহ্যের", t2: "সাথে", t3: "আধুনিকতা", desc: "গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।", btn: "কালেকশন দেখুন", cart: "কার্ট" },
    en: { top: "🚚 Free Delivery in 24H in Dhaka | Cash on Delivery", search: "Search Saree, Borka, Lehenga...", cust: "20,000+ Happy Customers", t1: "Tradition", t2: "Meets", t3: "Modernity", desc: "Gausia Collection - Every Saree, Borka & Lehenga is selected for your special moment.", btn: "View Collection", cart: "Cart" }
  }[lang];

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a]">
      <div className="bg-[#1a1a1a] text-white text-[11px] text-center py-2.5">{L.top}</div>
      
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black">G</div><div className="leading-none"><div className="font-black tracking-[0.2em] text-[14px]">GAUSIA</div><div className="text-[9px] tracking-[0.25em] text-gray-500">COLLECTION</div></div></div>
          
          <div className="hidden md:flex flex-1 max-w-[380px] mx-6"><div className="w-full bg-[#f8f3ec] rounded-full px-5 py-2.5 flex items-center gap-2"><input placeholder={L.search} className="bg-transparent text-[12px] w-full focus:outline-none" /><span>⌕</span></div></div>
          
          <div className="flex items-center gap-2">
            <button onClick={()=>setLang(lang==='bn'?'en':'bn')} className="border border-black bg-white text-black rounded-full px-3.5 py-1.5 text-[11px] font-black hover:bg-black hover:text-white transition-all">
              {lang==='bn' ? 'EN' : 'BN'}
            </button>
            <button onClick={()=>window.location.href='/admin'} className="hidden md:block text-[11px] font-bold bg-[#f8f3ec] hover:bg-black hover:text-white rounded-full px-3.5 py-1.5 transition-all">
              Admin
            </button>
            {/* CHAT BUTTON - এখানে ছিল */}
            <button onClick={()=>window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Gausia%20Collection`,'_blank')} className="hidden md:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-4 py-1.5 text-[11px] font-bold transition-all">
              💬 Chat
            </button>
            <button onClick={()=>setShowCart(true)} className="bg-black text-white rounded-full px-4 py-2 text-xs font-bold">{L.cart} ({cart.length})</button>
          </div>
        </div>
      </header>

      <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border bg-white rounded-full px-4 py-1.5 text-[11px]"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>{L.cust}</div>
            <h1 className="font-serif text-[48px] md:text-[56px] leading-[0.9] mt-6 font-black">{L.t1}<br/>{L.t2}<br/>{L.t3}</h1>
            <p className="text-[13px] text-gray-500 mt-5 max-w-[380px]">{L.desc}</p>
            <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} className="bg-black text-white rounded-full px-8 py-3 text-[13px] font-bold mt-7">{L.btn}</button>
          </div>
          <div className="bg-[#ff3d12] rounded-[24px] overflow-hidden aspect-[1/1] relative"><img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1100&fit=crop" className="w-full h-full object-cover" alt="hero" /></div>
        </div>
        <div className="mt-12 flex gap-2.5 overflow-auto pb-2">{CATEGORIES.map(c=>{ const isActive = activeCat===c.id; return (<button key={c.id} onClick={()=>setActiveCat(c.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs border-2 whitespace-nowrap font-bold ${isActive ? c.active + ' border-transparent shadow-md' : c.bg}`}>{c.icon} {lang==='bn'?c.id:c.idEn}</button>)})}</div>
      </section>

      <main id="products" className="max-w-[1300px] mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">{(activeCat==="সব"?PRODUCTS:PRODUCTS.filter(p=>p.cat===activeCat)).map(p=>(<div key={p.id} className="bg-white rounded-[20px] overflow-hidden border"><img src={p.img} className="h-[300px] w-full object-cover" alt={p.bn} /><div className="p-4"><div className="text-[13px] font-medium">{lang==='bn'?p.bn:p.en}</div><div className="flex justify-between items-center mt-3"><div className="font-black">{p.price}৳</div><button onClick={()=>setCart([...cart, p])} className="w-8 h-8 rounded-full bg-black text-white text-sm">+</button></div></div></div>))}</div>

        {/* BOTTOM 4 BOXES - SMALL ICON NOW */}
        <div className="mt-20">
          <div className="text-center mb-6"><div className="text-[10px] tracking-[0.3em] text-gray-400">OUR PROMISE</div><h3 className="font-bold text-lg mt-1">আপনার আস্থাই আমাদের শক্তি</h3></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-amber-200 rounded-[16px] p-5 text-center hover:shadow-md transition-all">
              <div className="w-10 h-10 mx-auto bg-amber-50 rounded-full flex items-center justify-center text-[18px] border border-amber-200">💎</div>
              <div className="font-bold text-[13px] mt-3">১০০% অরিজিনাল</div><div className="text-[11px] text-gray-500">গ্যারান্টি সহ</div>
            </div>
            <div className="bg-white border-2 border-blue-200 rounded-[16px] p-5 text-center hover:shadow-md transition-all">
              <div className="w-10 h-10 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-[18px] border border-blue-200">🚚</div>
              <div className="font-bold text-[13px] mt-3">ঢাকায় ফ্রি ডেলিভারি</div><div className="text-[11px] text-gray-500">Inside Dhaka</div>
            </div>
            <div className="bg-white border-2 border-green-200 rounded-[16px] p-5 text-center hover:shadow-md transition-all">
              <div className="w-10 h-10 mx-auto bg-green-50 rounded-full flex items-center justify-center text-[18px] border border-green-200">💵</div>
              <div className="font-bold text-[13px] mt-3">Cash on Delivery</div><div className="text-[11px] text-gray-500">হাতে পেয়ে টাকা</div>
            </div>
            <div className="bg-white border-2 border-purple-200 rounded-[16px] p-5 text-center hover:shadow-md transition-all">
              <div className="w-10 h-10 mx-auto bg-purple-50 rounded-full flex items-center justify-center text-[18px] border border-purple-200">↩️</div>
              <div className="font-bold text-[13px] mt-3">৩ দিনে রিটার্ন</div><div className="text-[11px] text-gray-500">সহজ রিটার্ন</div>
            </div>
          </div>
        </div>
      </main>

      {/* FLOATING WHATSAPP CHAT */}
      <button onClick={()=>window.open(`https://wa.me/${WHATSAPP_NUMBER}`,'_blank')} className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.4)] flex items-center justify-center text-white text-2xl z-40">
        💬
      </button>

      <footer className="bg-black text-white"><div className="max-w-[1300px] mx-auto px-4 md:px-8 py-8 flex justify-between"><div className="tracking-[0.2em] font-black text-sm">GAUSIA COLLECTION</div><div className="text-sm">WhatsApp: {WHATSAPP_NUMBER}</div></div></footer>

      {showCart && (<div className="fixed inset-0 bg-black/50 z-50 flex justify-end"><div className="bg-white w-full max-w-sm p-6 flex flex-col"><div className="flex justify-between mb-6"><h2 className="font-bold">{L.cart} ({cart.length})</h2><button onClick={()=>setShowCart(false)}>✕</button></div><div className="flex-1 overflow-auto">{cart.length===0 ? <p className="text-sm text-gray-500">কার্ট খালি</p> : cart.map((p,i)=><div key={i} className="flex justify-between py-3 border-b text-sm"><span>{lang==='bn'?p.bn:p.en}</span><span className="font-bold">{p.price}৳</span></div>)}</div>{cart.length>0 && <button onClick={()=>window.open(`https://wa.me/${WHATSAPP_NUMBER}`,'_blank')} className="bg-black text-white rounded-full py-3 mt-6 font-bold">WhatsApp এ অর্ডার করুন</button>}</div></div>)}
    </div>
  );
}
