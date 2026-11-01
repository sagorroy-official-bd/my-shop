"use client";
import { useState } from "react";
const WHATSAPP_NUMBER = "8801913129137";

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
    <div className="min-h-screen bg-[#fdf8f2] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-white">
      {/* Aarong Top Bar */}
      <div className="bg-[#1a1a1a] text-[#fdf8f2] text-[10px] tracking-[0.25em] text-center py-2.5">
        FREE DELIVERY IN DHAKA • 100% ORIGINAL • CASH ON DELIVERY
      </div>

      {/* Aarong Modern Header - WOW */}
      <header className="sticky top-0 z-50 bg-[#fdf8f2]/80 backdrop-blur-xl border-b border-[#eee6db]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          <div className="font-black tracking-[0.28em] text-[13px] md:text-[15px]">GAUSIA COLLECTION</div>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.15em] text-[#7a6a58]">
            <span className="hover:text-black cursor-pointer transition">NEW IN</span>
            <span className="hover:text-black cursor-pointer transition">SAREE</span>
            <span className="hover:text-black cursor-pointer transition">LEHENGA</span>
            <span className="hover:text-black cursor-pointer transition">BORKA</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center bg-white border border-[#eee6db] rounded-full px-4 py-2">
              <input placeholder="Search..." className="bg-transparent text-xs w-24 focus:outline-none placeholder:text-[#b8a898]" />
              <span className="text-xs ml-2">⌕</span>
            </div>
            <button onClick={() => setShowCart(true)} className="bg-[#1a1a1a] text-white rounded-full px-5 py-2.5 text-[11px] tracking-wide font-bold hover:bg-black transition">
              CART ({cart.length})
            </button>
          </div>
        </div>
        
        {/* Category Pills - Aarong Style */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-4 flex gap-2 overflow-auto scrollbar-hide">
          {["সব","শাড়ি","লেহেঙ্গা","বোরকা","সিটি গোল্ড","থ্রি পিস","হিজাব"].map(c => (
            <button key={c} onClick={() => setActiveCat(c)} className={`px-5 py-2 rounded-full text-[11px] tracking-wide border transition-all ${activeCat===c ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm' : 'bg-white border-[#eee6db] hover:border-[#1a1a1a] text-[#5a4a3a]'}`}>{c}</button>
          ))}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
        {/* Products - Aarong Wow Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filtered.map(p => (
            <div key={p.id} className="group">
              <div className="bg-white rounded-[24px] overflow-hidden border border-[#f3ebe1] group-hover:border-[#e8ddd0] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img src={p.img} alt={p.bn} className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] tracking-wide font-bold">IN STOCK</div>
                </div>
                <div className="p-5">
                  <div className="text-[13px] leading-[1.4] font-medium min-h-[38px] tracking-[-0.01em]">{p.bn}</div>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <div className="flex items-baseline gap-2"><span className="font-bold text-[16px] tracking-[-0.02em]">{p.price}৳</span><span className="text-[11px] line-through text-[#b8a898]">{p.old}৳</span></div>
                      <div className="text-[10px] tracking-[0.15em] text-[#9a8a7a] mt-1.5">FREE DELIVERY</div>
                    </div>
                    <button onClick={() => addToCart(p)} className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-lg hover:bg-black hover:scale-105 transition-all">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prestige Trust - Colorful but Aarong */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <div className="text-[10px] tracking-[0.4em] text-[#b8a898]">GAUSIA PROMISE</div>
            <h2 className="font-serif text-3xl mt-3 tracking-[-0.02em]">ঐতিহ্য, আস্থা, আধুনিকতা</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "💎", title: "১০০% অরিজিনাল", desc: "গ্যারান্টি সহ প্রোডাক্ট", grad: "from-amber-50 to-orange-100", border: "border-amber-200" },
              { icon: "🚚", title: "ঢাকায় ফ্রি ডেলিভারি", desc: "২৪ ঘণ্টায় ডেলিভারি", grad: "from-blue-50 to-cyan-100", border: "border-blue-200" },
              { icon: "💵", title: "Cash on Delivery", desc: "হাতে পেয়ে টাকা দিন", grad: "from-green-50 to-emerald-100", border: "border-green-200" },
              { icon: "↩️", title: "৩ দিনে সহজ রিটার্ন", desc: "কোন প্রশ্ন ছাড়াই", grad: "from-purple-50 to-pink-100", border: "border-purple-200" },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-[20px] border border-[#f3ebe1] p-7 text-center hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${b.grad} border ${b.border} flex items-center justify-center text-xl shadow-sm`}>{b.icon}</div>
                <div className="font-bold text-[13px] mt-4 tracking-[-0.01em]">{b.title}</div>
                <div className="text-[11px] text-[#9a8a7a] mt-1">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-[#1a1a1a] text-white mt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between gap-8">
          <div><div className="tracking-[0.25em] font-black text-sm">GAUSIA COLLECTION</div><div className="text-xs text-[#9a8a7a] mt-3 max-w-sm leading-relaxed">বাংলাদেশের নারীদের জন্য ট্রাস্টেড ফ্যাশন ব্র্যান্ড। ঈদ, বিয়ে ও পার্টির জন্য সেরা কালেকশন — আড়ং এর মতো প্রেস্টিজ ডিজাইন।</div></div>
          <div className="text-sm"><div className="text-[10px] tracking-[0.3em] text-[#7a6a58]">CONTACT</div><div className="mt-3 font-medium">WhatsApp: {WHATSAPP_NUMBER}</div><div className="text-[11px] text-[#7a6a58] mt-1">Facebook Pixel Ready for Boost</div></div>
        </div>
      </footer>

      {showCart && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-[#fdf8f2] w-full max-w-[380px] p-7 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-8"><h2 className="font-serif text-xl">আপনার কার্ট</h2><button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full bg-white border border-[#eee6db] flex items-center justify-center">✕</button></div>
            <div className="flex-1 overflow-auto space-y-3">{cart.length===0 ? <p className="text-sm text-[#9a8a7a]">কার্ট খালি</p> : cart.map((p,i) => <div key={i} className="flex justify-between py-4 border-b border-[#eee6db] text-sm bg-white rounded-xl px-4"><span>{p.bn}</span><span className="font-bold">{p.price}৳</span></div>)}</div>
            {cart.length>0 && <button onClick={orderOnWhatsApp} className="bg-[#1a1a1a] text-white rounded-full py-4 mt-6 font-bold tracking-wide hover:bg-black transition">WhatsApp এ অর্ডার করুন</button>}
          </div>
        </div>
      )}
    </div>
  );
}
