"use client";
import { useState } from "react";
const WHATSAPP_NUMBER = "8801913129137";

const CATEGORIES = [
  { id: "সব", idEn: "All" },
  { id: "শাড়ি", idEn: "Saree" },
  { id: "থ্রি পিস", idEn: "3 Pcs" },
  { id: "লেহেঙ্গা", idEn: "Lehenga" },
  { id: "বোরকা", idEn: "Borka" },
  { id: "আবায়া", idEn: "Abaya" },
  { id: "সিটি গোল্ড", idEn: "City Gold" },
  { id: "হিজাব", idEn: "Hijab" },
];

const PRODUCTS = [
  { id: 1, bn: "জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", en: "Georgette Party Saree", price: 1850, old: 2500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&h=900&fit=crop", cat: "শাড়ি" },
  { id: 2, bn: "ব্রাইডাল লেহেঙ্গা - লাল", en: "Bridal Lehenga Red", price: 4500, old: 6000, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&h=900&fit=crop", cat: "লেহেঙ্গা" },
  { id: 3, bn: "কালো বোরকা - প্রিমিয়াম", en: "Black Borka Premium", price: 2200, old: 2800, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700&h=900&fit=crop", cat: "বোরকা" },
  { id: 4, bn: "সিটি গোল্ড নেকলেস সেট", en: "City Gold Necklace Set", price: 850, old: 1200, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&h=900&fit=crop", cat: "সিটি গোল্ড" },
  { id: 5, bn: "কাতান শাড়ি - বিয়ের কালেকশন", en: "Katan Saree Wedding", price: 3200, old: 4500, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700&h=900&fit=crop", cat: "শাড়ি" },
  { id: 6, bn: "কটন থ্রি পিস - আরামদায়ক", en: "Cotton Three Piece", price: 1250, old: 1600, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=700&h=900&fit=crop", cat: "থ্রি পিস" },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCat, setActiveCat] = useState("সব");
  const [lang, setLang] = useState<'bn'|'en'>('bn');
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const L = {
    bn: { top: "🚚 ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি", ph: "শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন...", cust: "20,000+ খুশি কাস্টমার", t1: "ঐতিহ্যের", t2: "সাথে", t3: "আধুনিকতা", desc: "গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।", btn: "কালেকশন দেখুন", cart: "কার্ট", added: "কার্টে যোগ হয়েছে!" },
    en: { top: "🚚 Free Delivery in 24H in Dhaka | Cash on Delivery", ph: "Search Saree, Borka, Lehenga...", cust: "20,000+ Happy Customers", t1: "Tradition", t2: "Meets", t3: "Modernity", desc: "Gausia Collection - Every Saree, Borka & Lehenga is selected for your special moment.", btn: "View Collection", cart: "Cart", added: "Added to cart!" }
  }[lang];

  const addToCart = (p: any) => {
    setCart(prev => [...prev, p]);
    setToast(`${lang==='bn'?p.bn:p.en} - ${L.added}`);
    setTimeout(()=>setToast(null), 2000);
  };

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCat==="সব" || p.cat===activeCat;
    const matchSearch = search==="" || p.bn.toLowerCase().includes(search.toLowerCase()) || p.en.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a]">
      <div className="bg-[#1a1a1a] text-white text-[11px] text-center py-2.5">{L.top}</div>
      
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black">G</div><div className="leading-none"><div className="font-black tracking-[0.2em] text-[14px]">GAUSIA</div><div className="text-[9px] tracking-[0.25em] text-gray-500">COLLECTION</div></div></div>
          
          <div className="hidden md:flex flex-1 max-w-[400px] mx-6">
            <div className="w-full bg-[#f8f3ec] rounded-full px-5 py-2.5 flex items-center gap-2 border focus-within:border-black transition-all">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={L.ph} className="bg-transparent text-[12px] w-full focus:outline-none" />
              <span className="text-gray-400">⌕</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={()=>setLang(lang==='bn'?'en':'bn')} className="border border-black bg-white text-black rounded-full px-3.5 py-1.5 text-[11px] font-black hover:bg-black hover:text-white">{lang==='bn' ? 'EN' : 'BN'}</button>
            <button onClick={()=>window.location.href='/admin'} className="hidden md:block text-[11px] font-bold bg-[#f8f3ec] rounded-full px-3.5 py-1.5">Admin</button>
            <button onClick={()=>window.open(`https://wa.me/${WHATSAPP_NUMBER}`,'_blank')} className="hidden md:flex items-center gap-1.5 bg-[#25D366] text-white rounded-full px-4 py-1.5 text-[11px] font-bold">💬 Chat</button>
            <button onClick={()=>setShowCart(true)} className="bg-black text-white rounded-full px-4 py-2 text-xs font-bold">{L.cart} ({cart.length})</button>
          </div>
        </div>
        {/* MOBILE SEARCH */}
        <div className="md:hidden px-4 pb-3"><div className="w-full bg-[#f8f3ec] rounded-full px-4 py-2.5 flex items-center gap-2"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={L.ph} className="bg-transparent text-[12px] w-full focus:outline-none" /><span>⌕</span></div></div>
      </header>

      <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div><div className="inline-flex items-center gap-2 border bg-white rounded-full px-4 py-1.5 text-[11px]"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>{L.cust}</div><h1 className="font-serif text-[48px] md:text-[56px] leading-[0.9] mt-6 font-black">{L.t1}<br/>{L.t2}<br/>{L.t3}</h1><p className="text-[13px] text-gray-500 mt-5 max-w-[380px]">{L.desc}</p><button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} className="bg-black text-white rounded-full px-8 py-3 text-[13px] font-bold mt-7">{L.btn}</button></div>
          <div style={{background:"#ff3d12"}} className="rounded-[24px] overflow-hidden aspect-[1/1] relative"><img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=1100&fit=crop" className="w-full h-full object-cover" alt="hero" /></div>
        </div>

        <div className="mt-12 flex gap-2 overflow-auto pb-2">
          {CATEGORIES.map(c=>{
            const isActive = activeCat===c.id;
            return (<button key={c.id} onClick={()=>setActiveCat(c.id)} className={`px-5 py-2.5 rounded-full text-[12px] border-2 whitespace-nowrap font-bold transition-all ${isActive ? 'bg-black text-white border-black shadow-md scale-105' : 'bg-white text-gray-700 border-[#f0e6d8] hover:border-black'}`}>{lang==='bn'?c.id:c.idEn}</button>)
          })}
        </div>
      </section>

      <main id="products" className="max-w-[1300px] mx-auto px-4 md:px-8 pb-16">
        {filtered.length===0 && <div className="text-center py-20 text-gray-400">কোন প্রোডাক্ট পাওয়া যায়নি / No product found</div>}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-[20px] overflow-hidden border border-[#f3ebe1] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative overflow-hidden bg-[#f9f5f0] aspect-[3/4]">
                <img src={p.img} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" alt={p.bn} />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold">{p.cat}</div>
              </div>
              <div className="p-4">
                <div className="text-[13px] font-medium leading-tight line-clamp-2 h-[36px]">{lang==='bn'?p.bn:p.en}</div>
                <div className="flex justify-between items-center mt-3">
                  <div><div className="font-black text-[15px]">{p.price}৳</div><div className="text-[11px] text-gray-400 line-through">{p.old}৳</div></div>
                  <button onClick={()=>addToCart(p)} className="w-9 h-9 rounded-full bg-black text-white text-[18px] font-bold flex items-center justify-center hover:bg-[#ff3d12] active:scale-90 transition-all shadow-md cursor-pointer">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM 4 BOXES - COLORFUL FIXED */}
        <div className="mt-24">
          <div className="text-center mb-8"><div className="inline-block bg-black text-white text-[10px] tracking-[0.3em] px-4 py-1.5 rounded-full">WHY CHOOSE US</div><h3 className="font-bold text-[24px] mt-4">আপনার আস্থাই আমাদের শক্তি</h3></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div style={{background:"linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)", border:"2px solid #fdba74"}} className="rounded-[18px] p-6 text-center"><div style={{background:"linear-gradient(135deg, #fbbf24, #f97316)"}} className="w-11 h-11 mx-auto rounded-[10px] flex items-center justify-center text-[20px] text-white shadow-md">💎</div><div className="font-black text-[13px] mt-4 text-[#7c2d12]">১০০% অরিজিনাল</div><div className="text-[11px] font-bold text-white mt-2 inline-block px-3 py-1 rounded-full" style={{background:"#f97316"}}>গ্যারান্টি সহ ✓</div></div>
            <div style={{background:"linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border:"2px solid #93c5fd"}} className="rounded-[18px] p-6 text-center"><div style={{background:"linear-gradient(135deg, #60a5fa, #06b6d4)"}} className="w-11 h-11 mx-auto rounded-[10px] flex items-center justify-center text-[20px] text-white shadow-md">🚚</div><div className="font-black text-[13px] mt-4 text-[#1e3a8a]">ঢাকায় ফ্রি ডেলিভারি</div><div className="text-[11px] font-bold text-white mt-2 inline-block px-3 py-1 rounded-full" style={{background:"#3b82f6"}}>Inside Dhaka ✓</div></div>
            <div style={{background:"linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", border:"2px solid #86efac"}} className="rounded-[18px] p-6 text-center"><div style={{background:"linear-gradient(135deg, #4ade80, #10b981)"}} className="w-11 h-11 mx-auto rounded-[10px] flex items-center justify-center text-[20px] text-white shadow-md">💵</div><div className="font-black text-[13px] mt-4 text-[#14532d]">Cash on Delivery</div><div className="text-[11px] font-bold text-white mt-2 inline-block px-3 py-1 rounded-full" style={{background:"#22c55e"}}>হাতে পেয়ে টাকা ✓</div></div>
            <div style={{background:"linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border:"2px solid #d8b4fe"}} className="rounded-[18px] p-6 text-center"><div style={{background:"linear-gradient(135deg, #a78bfa, #ec4899)"}} className="w-11 h-11 mx-auto rounded-[10px] flex items-center justify-center text-[20px] text-white shadow-md">↩️</div><div className="font-black text-[13px] mt-4 text-[#581c87]">৩ দিনে রিটার্ন</div><div className="text-[11px] font-bold text-white mt-2 inline-block px-3 py-1 rounded-full" style={{background:"#a855f7"}}>সহজ রিটার্ন ✓</div></div>
          </div>
        </div>
      </main>

      {toast && <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl z-[100]">{toast}</div>}
      <button onClick={()=>window.open(`https://wa.me/${WHATSAPP_NUMBER}`,'_blank')} className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white text-2xl z-40">💬</button>

      <footer className="bg-black text-white mt-10">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 grid md:grid-cols-3 gap-8">
          <div><div className="tracking-[0.2em] font-black">GAUSIA COLLECTION</div><div className="text-sm text-gray-400 mt-3 leading-relaxed">ঢাকার গাউছিয়া মার্কেটের সেরা কালেকশন এখন অনলাইনে। শাড়ি, লেহেঙ্গা, বোরকা, থ্রি পিস - সব এক জায়গায়।</div></div>
          <div><div className="font-bold text-sm">যোগাযোগ</div><div className="text-sm text-gray-400 mt-3">WhatsApp: {WHATSAPP_NUMBER}<br/>ঢাকা, বাংলাদেশ<br/>প্রতিদিন সকাল ৯টা - রাত ১০টা</div></div>
          <div><div className="font-bold text-sm">পেমেন্ট</div><div className="text-sm text-gray-400 mt-3">✓ ক্যাশ অন ডেলিভারি<br/>✓ বিকাশ / নগদ<br/>✓ ৩ দিনে রিটার্ন গ্যারান্টি</div></div>
        </div>
        <div className="border-t border-white/10 text-center text-[11px] text-gray-500 py-4">© 2026 Gausia Collection - All Rights Reserved</div>
      </footer>

      {showCart && (<div className="fixed inset-0 bg-black/50 z-50 flex justify-end"><div className="bg-white w-full max-w-sm p-6 flex flex-col h-full"><div className="flex justify-between mb-6"><h2 className="font-bold">কার্ট ({cart.length})</h2><button onClick={()=>setShowCart(false)} className="text-xl">✕</button></div><div className="flex-1 overflow-auto">{cart.length===0 ? <p className="text-sm text-gray-500">কার্ট খালি</p> : cart.map((p,i)=><div key={i} className="flex justify-between py-3 border-b text-sm"><span>{lang==='bn'?p.bn:p.en}</span><span className="font-bold">{p.price}৳</span></div>)}</div>{cart.length>0 && <><div className="border-t pt-4 mt-4 flex justify-between font-black"><span>মোট:</span><span>{cart.reduce((s,p)=>s+p.price,0)}৳</span></div><button onClick={()=>{ let msg=`Order:%0A`; cart.forEach((p:any,i:number)=>{ msg+=`${i+1}. ${lang==='bn'?p.bn:p.en} - ${p.price}৳%0A`; }); window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,'_blank'); }} className="bg-black text-white rounded-full py-4 mt-4 font-bold">WhatsApp এ অর্ডার করুন</button></>}</div></div>)}
    </div>
  );
}
