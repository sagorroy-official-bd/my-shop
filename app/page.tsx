"use client";
import { useState } from "react";

const WHATSAPP_NUMBER = "8801913129137";

const PRODUCTS = [
  { id: 1, bn: "জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", price: 1850, old: 2500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700", cat: "শাড়ি", badge: "New" },
  { id: 2, bn: "ব্রাইডাল লেহেঙ্গা - লাল", price: 4500, old: 6000, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=700", cat: "লেহেঙ্গা", badge: "Hot" },
  { id: 3, bn: "কালো বোরকা - প্রিমিয়াম", price: 2200, old: 2800, img: "https://images.unsplash.com/photo-1584302052179-2e90841dad6a?w=700", cat: "বোরকা", badge: "" },
  { id: 4, bn: "সিটি গোল্ড নেকলেস সেট", price: 850, old: 1200, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700", cat: "সিটি গোল্ড", badge: "Sale" },
  { id: 5, bn: "কাতান শাড়ি - বিয়ের কালেকশন", price: 3200, old: 4500, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700", cat: "শাড়ি", badge: "Bridal" },
  { id: 6, bn: "কটন থ্রি পিস - আরামদায়ক", price: 1250, old: 1600, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700", cat: "থ্রি পিস", badge: "" },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCat, setActiveCat] = useState("সব");

  const filtered = activeCat === "সব" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);
  const addToCart = (p: any) => setCart([...cart, p]);

  const orderOnWhatsApp = () => {
    let msg = `আসসালামু আলাইকুম, Gausia Collection থেকে অর্ডার করতে চাই:%0A%0A`;
    cart.forEach((p: any, i: number) => { msg += `${i + 1}. ${p.bn} - ${p.price}৳%0A`; });
    const total = cart.reduce((s, p) => s + p.price, 0);
    msg += `%0Aমোট: ${total}৳%0A%0Aনাম:%0Aফোন:%0Aঠিকানা:%0A`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fdf8f2] text-[#1a1a1a]">
      {/* Aarong Style Header */}
      <header className="sticky top-0 z-50 bg-[#fdf8f2]/90 backdrop-blur-md border-b border-[#e8ddd0]">
        <div className="flex justify-between items-center px-4 md:px-10 py-4">
          <div className="font-black tracking-[0.2em] text-[15px]">GAUSIA COLLECTION</div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-[11px] tracking-wide">
              <span className="px-3 py-1 rounded-full border border-[#e8ddd0]">EN</span>
              <span>Search</span>
            </div>
            <button onClick={() => setShowCart(true)} className="bg-[#1a1a1a] text-white rounded-full px-5 py-2 text-xs tracking-wide font-bold">Cart ({cart.length})</button>
          </div>
        </div>
      </header>

      {/* Categories - Aarong pill style */}
      <div className="px-4 md:px-10 py-5">
        <div className="flex gap-2 overflow-auto scrollbar-hide">
          {["সব","শাড়ি","লেহেঙ্গা","বোরকা","সিটি গোল্ড","থ্রি পিস"].map(c => (
            <button key={c} onClick={() => setActiveCat(c)} className={`px-5 py-2 rounded-full text-xs border transition ${activeCat===c ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white border-[#e8ddd0] hover:border-[#1a1a1a]'}`}>{c}</button>
          ))}
        </div>
      </div>

      <main className="px-4 md:px-10 pb-10">
        {/* Products - Aarong Card Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map(p => (
            <div key={p.id} className="group bg-white rounded-[20px] overflow-hidden border border-[#f0e8df] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="relative overflow-hidden">
                <img src={p.img} alt={p.bn} className="h-[300px] md:h-[420px] w-full object-cover group-hover:scale-[1.03] transition duration-700" />
                {p.badge && <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold tracking-wide">{p.badge}</span>}
              </div>
              <div className="p-4">
                <div className="text-[13px] leading-snug min-h-[36px] font-medium">{p.bn}</div>
                <div className="flex justify-between items-end mt-3">
                  <div>
                    <div className="flex items-baseline gap-2"><span className="font-bold text-[15px]">{p.price}৳</span><span className="text-[11px] line-through text-gray-400">{p.old}৳</span></div>
                    <div className="text-[10px] text-[#7a6a58] mt-1 tracking-wide">✓ In Stock • Free Delivery</div>
                  </div>
                  <button onClick={() => addToCart(p)} className="w-9 h-9 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-black transition">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COLORED TRUST BADGES - Aarong Prestige with Color */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <div className="text-[11px] tracking-[0.3em] text-gray-500">WHY GAUSIA COLLECTION</div>
            <div className="text-xl font-serif mt-1">ঐতিহ্যের সাথে আধুনিকতা</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#f0e8df] rounded-[18px] p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center text-lg">💎</div>
              <div className="font-bold text-[13px] mt-3">১০০% অরিজিনাল</div>
              <div className="text-[11px] text-gray-500 mt-1">গ্যারান্টি সহ প্রোডাক্ট</div>
            </div>
            <div className="bg-white border border-[#f0e8df] rounded-[18px] p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200 flex items-center justify-center text-lg">🚚</div>
              <div className="font-bold text-[13px] mt-3">ঢাকায় ফ্রি ডেলিভারি</div>
              <div className="text-[11px] text-gray-500 mt-1">২৪ ঘণ্টায় ডেলিভারি</div>
            </div>
            <div className="bg-white border border-[#f0e8df] rounded-[18px] p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 flex items-center justify-center text-lg">💵</div>
              <div className="font-bold text-[13px] mt-3">Cash on Delivery</div>
              <div className="text-[11px] text-gray-500 mt-1">হাতে পেয়ে টাকা দিন</div>
            </div>
            <div className="bg-white border border-[#f0e8df] rounded-[18px] p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 flex items-center justify-center text-lg">↩️</div>
              <div className="font-bold text-[13px] mt-3">৩ দিনে সহজ রিটার্ন</div>
              <div className="text-[11px] text-gray-500 mt-1">কোন প্রশ্ন ছাড়াই</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#1a1a1a] text-white mt-10">
        <div className="px-4 md:px-10 py-10 flex flex-col md:flex-row justify-between gap-6">
          <div><div className="tracking-[0.2em] font-black text-sm">GAUSIA COLLECTION</div><div className="text-xs text-gray-400 mt-2 max-w-sm">বাংলাদেশের নারীদের জন্য ট্রাস্টেড ফ্যাশন ব্র্যান্ড। ঈদ, বিয়ে ও পার্টির জন্য সেরা কালেকশন।</div></div>
          <div className="text-sm"><div className="text-xs tracking-widest text-gray-400">CONTACT</div><div className="mt-2">WhatsApp: {WHATSAPP_NUMBER}</div><div className="text-[11px] text-gray-500 mt-1">Facebook Pixel Ready for Boost</div></div>
        </div>
      </footer>

      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-[#fdf8f2] w-full max-w-sm p-6 flex flex-col">
            <div className="flex justify-between mb-6"><h2 className="font-bold">আপনার কার্ট</h2><button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full bg-white border">✕</button></div>
            <div className="flex-1 overflow-auto space-y-3">{cart.length===0 ? <p className="text-sm text-gray-500">কার্ট খালি</p> : cart.map((p,i) => <div key={i} className="flex justify-between py-3 border-b border-[#e8ddd0] text-sm bg-white rounded-xl px-3"><span>{p.bn}</span><span className="font-bold">{p.price}৳</span></div>)}</div>
            {cart.length>0 && <button onClick={orderOnWhatsApp} className="bg-[#1a1a1a] text-white rounded-full py-3 mt-6 font-bold tracking-wide">WhatsApp এ অর্ডার করুন</button>}
          </div>
        </div>
      )}
    </div>
  );
}
