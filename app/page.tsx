"use client";
import { useState } from "react";
const WHATSAPP_NUMBER = "8801913129137";
const PRODUCTS = [
  { id: 1, bn: "জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", price: 1850, old: 2500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&h=900&fit=crop", cat: "শাড়ি" },
  { id: 2, bn: "ব্রাইডাল লেহেঙ্গা - লাল", price: 4500, old: 6000, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&h=900&fit=crop", cat: "লেহেঙ্গা" },
  { id: 3, bn: "কালো বোরকা - প্রিমিয়াম", price: 2200, old: 2800, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700&h=900&fit=crop", cat: "বোরকা" },
  { id: 4, bn: "সিটি গোল্ড নেকলেস সেট", price: 850, old: 1200, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&h=900&fit=crop", cat: "সিটি গোল্ড" },
  { id: 5, bn: "কাতান শাড়ি", price: 3200, old: 4500, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700&h=900&fit=crop", cat: "শাড়ি" },
  { id: 6, bn: "কটন থ্রি পিস", price: 1250, old: 1600, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=700&h=900&fit=crop", cat: "থ্রি পিস" },
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
    <div className="min-h-screen bg-[#fdf8f2] text-[#1a1a1a]">
      <div className="bg-[#1a1a1a] text-[#fdf8f2] text-[11px] tracking-wide text-center py-2">🚚 ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি</div>
      
      <header className="bg-white border-b border-[#eee6db] sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 h-[64px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 bg-[#1a1a1a] text-white flex items-center justify-center font-black text-sm">G</div><div className="leading-none"><div className="font-black tracking-[0.2em] text-[13px]">GAUSIA</div><div className="text-[9px] tracking-[0.2em] text-gray-400">COLLECTION</div></div></div>
          <div className="hidden md:flex flex-1 max-w-sm mx-6"><div className="w-full bg-[#f8f3ec] rounded-full px-4 py-2 flex items-center"><input placeholder="শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন..." className="bg-transparent text-xs w-full focus:outline-none" /><span className="text-xs">⌕</span></div></div>
          <div className="flex items-center gap-2"><span className="hidden md:block text-[11px] border rounded-full px-3 py-1">EN</span><span className="hidden md:block text-[11px]">Admin</span><button onClick={()=>setShowCart(true)} className="bg-[#1a1a1a] text-white rounded-full px-4 py-2 text-xs">Cart ({cart.length})</button></div>
        </div>
      </header>

      {/* HERO - Like Your Photo */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border rounded-full px-3 py-1 text-[10px] text-gray-500"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>20,000+ খুশি কাস্টমার</div>
            <h1 className="font-serif text-[42px] md:text-[52px] leading-[0.95] mt-4 tracking-[-0.02em]">ঐতিহ্যের<br/>সাথে<br/>আধুনিকতা</h1>
            <p className="text-xs text-gray-500 mt-4 max-w-sm leading-relaxed">গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।</p>
            <div className="flex items-center gap-3 mt-6">
              <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} className="bg-[#1a1a1a] text-white rounded-full px-6 py-3 text-xs">কালেকশন দেখুন</button>
              <div className="flex items-center gap-1 text-[11px]"><span>★★★★★</span><span className="text-gray-500">4.9/5 (2.1k reviews)</span></div>
            </div>
            <div className="flex gap-6 mt-8 text-[10px] text-gray-500 border-t pt-4 max-w-sm">
              <span>✓ ঢাকায় ফ্রি ডেলিভারি</span><span>✓ ক্যাশ অন ডেলিভারি</span><span>✓ অরিজিনাল প্রোডাক্ট</span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#ff3d12] rounded-[24px] overflow-hidden aspect-[4/3] md:aspect-[1/1] relative">
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop" className="w-full h-full object-cover object-top" alt="hero" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-[16px] p-4 flex justify-between items-center">
                <div><div className="text-[10px] text-gray-400">Starting from</div><div className="font-bold">1,250৳</div></div>
                <div className="text-right"><div className="text-[10px] text-gray-400">New Eid Collection</div><div className="text-xs font-bold">50+ Designs</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-2 overflow-auto pb-2">
          {[
            {id:"সব", icon:"✨"},
            {id:"শাড়ি", icon:"👗"},
            {id:"থ্রি পিস", icon:"👚"},
            {id:"লেহেঙ্গা", icon:"👘"},
            {id:"বোরকা", icon:"🧕"},
            {id:"আবায়া", icon:"👘"},
            {id:"সিটি গোল্ড", icon:"💍"},
            {id:"হিজাব", icon:"🧣"},
          ].map(c=>(
            <button key={c.id} onClick={()=>setActiveCat(c.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border whitespace-nowrap ${activeCat===c.id ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white border-[#eee6db]'}`}><span>{c.icon}</span>{c.id}</button>
          ))}
        </div>
      </section>

      <main id="products" className="max-w-[1300px] mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-[20px] overflow-hidden border border-[#f0e8df] shadow-sm">
              <img src={p.img} className="h-[340px] w-full object-cover" alt={p.bn} />
              <div className="p-4"><div className="text-[13px] font-medium">{p.bn}</div><div className="flex justify-between items-end mt-3"><div><span className="font-bold">{p.price}৳</span><span className="text-[11px] line-through text-gray-400 ml-1">{p.old}৳</span></div><button onClick={()=>addToCart(p)} className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white">+</button></div></div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-[#1a1a1a] text-white"><div className="max-w-[1300px] mx-auto px-4 md:px-8 py-8 flex justify-between"><div className="tracking-[0.2em] font-black text-sm">GAUSIA COLLECTION</div><div className="text-sm">WhatsApp: {WHATSAPP_NUMBER}</div></div></footer>

      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-[#fdf8f2] w-full max-w-sm p-6 flex flex-col"><div className="flex justify-between mb-6"><h2 className="font-bold">কার্ট</h2><button onClick={()=>setShowCart(false)}>✕</button></div><div className="flex-1 overflow-auto">{cart.length===0 ? <p className="text-sm text-gray-500">কার্ট খালি</p> : cart.map((p,i)=><div key={i} className="flex justify-between py-3 border-b text-sm"><span>{p.bn}</span><span className="font-bold">{p.price}৳</span></div>)}</div>{cart.length>0 && <button onClick={orderOnWhatsApp} className="bg-[#1a1a1a] text-white rounded-full py-3 mt-6 font-bold">WhatsApp এ অর্ডার করুন</button>}</div>
        </div>
      )}
    </div>
  );
}
