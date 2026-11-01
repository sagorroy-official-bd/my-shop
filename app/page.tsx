"use client";
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "8801700000000"; // এখানে আপনার নাম্বার দিবেন ভাই, যেমন 8801712345678

const DEFAULT_CATS = [
  { bn: "সব", en: "All", icon: "✨" },
  { bn: "শাড়ি", en: "Saree", icon: "👗" },
  { bn: "থ্রি পিস", en: "Three Piece", icon: "👚" },
  { bn: "লেহেঙ্গা", en: "Lehenga", icon: "💃" },
  { bn: "বোরকা", en: "Borka", icon: "🧕" },
  { bn: "ব্রাইডাল", en: "Bridal", icon: "👰" },
  { bn: "সিটি গোল্ড", en: "City Gold", icon: "💍" },
  { bn: "হিজাব", en: "Hijab", icon: "🧣" },
];

const defaults = [
  { id: 1, bn: "জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", en: "Georgette Party Saree", price: 1850, old: 2500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600", cat: "শাড়ি", badge: "BEST SELLER" },
  { id: 2, bn: "ব্রাইডাল লেহেঙ্গা - লাল", en: "Bridal Lehenga Red", price: 4500, old: 6000, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600", cat: "লেহেঙ্গা", badge: "NEW" },
  { id: 3, bn: "কালো বোরকা - প্রিমিয়াম", en: "Black Borka Premium", price: 2200, old: 2800, img: "https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=600", cat: "বোরকা", badge: "-21%" },
  { id: 4, bn: "সিটি গোল্ড নেকলেস সেট", en: "City Gold Set", price: 850, old: 1200, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600", cat: "সিটি গোল্ড", badge: "LIMITED" },
  { id: 5, bn: "কাতান শাড়ি - বিয়ের কালেকশন", en: "Katan Saree Wedding", price: 3200, old: 4500, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", cat: "শাড়ি", badge: "PREMIUM" },
  { id: 6, bn: "কটন থ্রি পিস - আরামদায়ক", en: "Cotton Three Piece", price: 1250, old: 1600, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600", cat: "থ্রি পিস", badge: "-22%" },
];

export default function Page() {
  const [lang, setLang] = useState<"bn" | "en">("bn");
  const [products] = useState(defaults);
  const [activeCat, setActiveCat] = useState("সব");
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = products.filter(p => {
    const matchCat = activeCat === "সব" || activeCat === "All" || p.cat === activeCat;
    const matchSearch = p.bn.toLowerCase().includes(search.toLowerCase()) || p.en.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (p: any) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === p.id);
      if (exist) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setShowCart(true);
    // Facebook Pixel - AddToCart
    // @ts-ignore
    if (typeof window !== "undefined" && window.fbq) window.fbq('track', 'AddToCart');
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  const checkoutWA = () => {
    const items = cart.map(i => `${lang === "bn" ? i.bn : i.en} x${i.qty} = ${i.price * i.qty}৳`).join("%0A");
    const msg = `আসসালামু আলাইকুম, গাউছিয়া কালেকশন থেকে অর্ডার করতে চাই:%0A%0A${items}%0A%0Aমোট: ${total}৳%0Aডেলিভারি: ঢাকার ভিতরে 70৳, বাইরে 120৳`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-zinc-900 selection:bg-pink-200">
      {/* Top Bar for Marketing */}
      <div className="bg-zinc-900 text-white text-[12px] py-2 text-center tracking-widest">
        {lang === "bn" ? "🚚 ঢাকায় ২৪ ঘণ্টায় ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি" : "🚚 Free Delivery in Dhaka | Cash on Delivery"} 
      </div>

      {/* Header - Prestige */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-zinc-900 text-white flex items-center justify-center font-serif text-xl">G</div>
            <div>
              <h1 className="font-serif text-[20px] leading-none tracking-[0.2em] font-bold">GAUSIA</h1>
              <p className="text-[10px] tracking-[0.3em] text-zinc-500">COLLECTION</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={lang==="bn"?"শাড়ি, বোরকা, লেহেঙ্গা খুঁজুন...":"Search Saree, Borka..."} className="w-full bg-zinc-100 rounded-full px-5 py-2.5 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900 transition" />
            <span className="absolute right-4 top-2.5 text-zinc-400">⌕</span>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={()=>setLang(lang==="bn"?"en":"bn")} className="text-xs border px-3 py-1.5 rounded-full hover:bg-zinc-900 hover:text-white transition">{lang==="bn"?"EN":"BN"}</button>
            <a href="/admin" className="hidden md:block text-xs text-zinc-500 hover:text-black">Admin</a>
            <button onClick={()=>setShowCart(true)} className="relative bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium">Cart ({totalQty})</button>
          </div>
        </div>
      </header>

      {/* Hero - Prestige */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white border rounded-full px-3 py-1 text-[11px] mb-4"> <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {lang==="bn"?"১০,০০০+ নারীর বিশ্বাস":"Trusted by 10,000+ Women"} </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[0.9]"> {lang==="bn"?<>ঐতিহ্যের<br/>সাথে<br/><span className="italic font-light">আধুনিকতা</span></>:<>Tradition<br/>Meets<br/><span className="italic font-light">Modern</span></>} </h2>
          <p className="mt-4 text-zinc-600 text-sm md:text-[15px] max-w-md leading-relaxed">{lang==="bn"?"গাউছিয়া কালেকশন - যেখানে প্রতিটি শাড়ি, বোরকা ও লেহেঙ্গা বাছাই করা হয় আপনার বিশেষ মুহূর্তের জন্য।":"Gausia Collection - Where every saree, borka & lehenga is curated for your special moments."}</p>
          <div className="mt-6 flex gap-3">
            <a href="#products" className="bg-zinc-900 text-white px-7 py-3 rounded-full text-sm">{lang==="bn"?"কালেকশন দেখুন":"Shop Collection"}</a>
            <div className="flex items-center gap-2 text-xs text-zinc-600"><span className="text-lg">★ ★ ★ ★ ★</span> 4.9/5 (2.1k reviews)</div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-[11px] border-t pt-6 max-w-md">
            <div>✓ {lang==="bn"?"ক্যাশ অন ডেলিভারি":"Cash on Delivery"}</div>
            <div>✓ {lang==="bn"?"সহজ রিটার্ন":"Easy Return"}</div>
            <div>✓ {lang==="bn"?"অরিজিনাল প্রোডাক্ট":"Original Product"}</div>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800" className="rounded-[32px] w-full h-[480px] object-cover" alt="hero" />
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-2xl p-4 flex justify-between items-center">
            <div><p className="text-xs text-zinc-500">Starting from</p><p className="font-serif text-xl">1,250৳</p></div>
            <div className="text-right"><p className="text-xs">New Eid Collection</p><p className="text-sm font-medium">50+ Designs</p></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 overflow-auto pb-2 scrollbar-hide">
          {DEFAULT_CATS.map(c => (
            <button key={c.bn} onClick={()=>setActiveCat(lang==="bn"?c.bn:c.en)} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm border transition ${activeCat===c.bn || activeCat===c.en || (activeCat==="সব" && c.bn==="সব") ? "bg-zinc-900 text-white border-zinc-900":"bg-white hover:border-zinc-900"}`}>{c.icon} {lang==="bn"?c.bn:c.en}</button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map(p => (
          <div key={p.id} className="group bg-white rounded-[20px] overflow-hidden border hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
              <img src={p.img} alt={p.bn} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-3 left-3 bg-white text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wider">{p.badge}</div>
              <div className="absolute top-3 right-3 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded-full">{Math.round((1-p.price/p.old)*100)}% OFF</div>
            </div>
            <div className="p-4">
              <h3 className="text-[13px] leading-snug line-clamp-2 h-9">{lang==="bn"?p.bn:p.en}</h3>
              <div className="mt-3 flex items-end justify-between">
                <div><p className="font-bold text-[16px]">{p.price}৳ <span className="text-zinc-400 line-through text-[12px] font-normal ml-1">{p.old}৳</span></p><p className="text-[11px] text-green-600">✓ In Stock • Free Delivery</p></div>
                <button onClick={()=>addToCart(p)} className="w-8 h-8 bg-zinc-900 text-white rounded-full flex items-center justify-center hover:scale-110 transition">+</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Marketing Trust */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {t: lang==="bn"?"১০০% অরিজিনাল":"100% Original", d: lang==="bn"?"গ্যারান্টি সহ":"Guaranteed"},
          {t: lang==="bn"?"ঢাকায় ফ্রি ডেলিভারি":"Free Delivery", d: "Inside Dhaka"},
          {t: "Cash on Delivery", d: lang==="bn"?"হাতে পেয়ে টাকা":"Pay on Delivery"},
          {t: lang==="bn"?"৩ দিনে রিটার্ন":"3 Days Return", d: lang==="bn"?"সহজ রিটার্ন":"Easy Return"},
        ].map((f,i)=><div key={i} className="bg-white border rounded-2xl p-4 text-center"><p className="font-medium text-sm">{f.t}</p><p className="text-[11px] text-zinc-500">{f.d}</p></div>)}
      </section>

      <footer className="mt-12 bg-zinc-900 text-zinc-300 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div><h4 className="font-serif text-white text-xl tracking-widest">GAUSIA COLLECTION</h4><p className="text-xs mt-3 text-zinc-400 leading-relaxed">{lang==="bn"?"বাংলাদেশের নারীদের জন্য ট্রাস্টেড ফ্যাশন ব্র্যান্ড। ঈদ, বিয়ে ও পার্টির জন্য সেরা কালেকশন।":"Trusted Fashion Brand for Bangladeshi Women. Best collection for Eid, Wedding & Party."}</p></div>
          <div className="text-sm"><p className="text-white mb-3">Contact for Marketing</p><p>WhatsApp: {WHATSAPP_NUMBER}</p><p className="mt-2 text-xs text-zinc-500">Facebook Pixel & TikTok Pixel Ready for Ads</p></div>
          <div className="text-xs text-zinc-500"><p>© 2026 Gausia Collection. All rights reserved.</p><p className="mt-2">Made for high-converting Facebook Ads • SEO Optimized</p></div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={()=>setShowCart(false)}></div>
          <div className="relative w-full max-w-sm bg-white h-full p-6 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center"><h3 className="font-serif text-xl">{lang==="bn"?"আপনার ব্যাগ":"Your Bag"} ({totalQty})</h3><button onClick={()=>setShowCart(false)} className="text-xl">×</button></div>
            <div className="flex-1 overflow-auto mt-6 space-y-4">
              {cart.length===0?<p className="text-sm text-zinc-500">{lang==="bn"?"ব্যাগ খালি":"Your bag is empty"}</p>:cart.map(i=><div key={i.id} className="flex gap-3"><img src={i.img} className="w-16 h-20 object-cover rounded-xl"/><div className="flex-1"><p className="text-xs line-clamp-2">{lang==="bn"?i.bn:i.en}</p><p className="text-sm font-bold mt-1">{i.price}৳ x {i.qty}</p><div className="flex gap-2 mt-2"><button onClick={()=>setCart(c=>c.map(x=>x.id===i.id?{...x,qty:Math.max(1,x.qty-1)}:x))} className="border w-6 h-6 rounded-full text-xs">-</button><button onClick={()=>setCart(c=>c.map(x=>x.id===i.id?{...x,qty:x.qty+1}:x))} className="border w-6 h-6 rounded-full text-xs">+</button><button onClick={()=>setCart(c=>c.filter(x=>x.id!==i.id))} className="ml-auto text-[11px] text-red-500">Remove</button></div></div></div>)}
            </div>
            <div className="border-t pt-4"><div className="flex justify-between font-bold"><span>Total</span><span>{total}৳</span></div><p className="text-[11px] text-zinc-500 mt-1">Delivery charge will be added</p><button onClick={checkoutWA} className="w-full mt-4 bg-[#25D366] text-white py-3 rounded-full font-medium">✓ WhatsApp এ অর্ডার করুন</button><p className="text-[10px] text-center mt-2 text-zinc-400">Secure checkout • Facebook Pixel Tracked</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
