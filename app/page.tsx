"use client";
import { useState } from "react";

const WHATSAPP_NUMBER = "8801913129137";

const PRODUCTS = [
  { id: 1, bn: "জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", price: 1850, old: 2500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600", cat: "শাড়ি" },
  { id: 2, bn: "ব্রাইডাল লেহেঙ্গা - লাল", price: 4500, old: 6000, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600", cat: "লেহেঙ্গা" },
  { id: 3, bn: "কালো বোরকা - প্রিমিয়াম", price: 2200, old: 2800, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600", cat: "বোরকা" },
  { id: 4, bn: "সিটি গোল্ড নেকলেস সেট", price: 850, old: 1200, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVja2xhY2V8ZW58MHx8MHx8fDA%3D", cat: "সিটি গোল্ড" },
  { id: 5, bn: "কাতান শাড়ি - বিয়ের কালেকশন", price: 3200, old: 4500, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", cat: "শাড়ি" },
  { id: 6, bn: "কটন থ্রি পিস - আরামদায়ক", price: 1250, old: 1600, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600", cat: "থ্রি পিস" },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCat, setActiveCat] = useState("সব");

  const filtered = activeCat === "সব" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);
  const addToCart = (p: any) => setCart([...cart, p]);

  const orderOnWhatsApp = () => {
    let msg = "আসসালামু আলাইকুম, Gausia Collection থেকে অর্ডার:%0A%0A";
    cart.forEach((p: any, i: number) => { msg += `${i + 1}. ${p.bn} - ${p.price}৳%0A`; });
    const total = cart.reduce((s, p) => s + p.price, 0);
    msg += `%0Aমোট: ${total}৳%0A%0Aঠিকানা:%0Aনাম:%0Aফোন:%0A`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fcf9f6] text-black">
      {/* Header - Prestige */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b flex justify-between items-center px-4 md:px-8 py-3">
        <div className="font-black tracking-widest">GAUSIA COLLECTION</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowCart(true)} className="bg-black text-white rounded-full px-5 py-2 text-sm font-bold">Cart ({cart.length})</button>
        </div>
      </header>

      {/* Categories */}
      <div className="px-4 md:px-8 py-4 flex gap-2 overflow-auto">
        {["সব","শাড়ি","লেহেঙ্গা","বোরকা","সিটি গোল্ড","থ্রি পিস"].map(c => (
          <button key={c} onClick={() => setActiveCat(c)} className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap ${activeCat===c ? 'bg-black text-white' : 'bg-white'}`}>{c}</button>
        ))}
      </div>

      <main className="px-4 md:px-8 py-2">
        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition">
              <img src={p.img} alt={p.bn} className="h-72 w-full object-cover" />
              <div className="p-3">
                <div className="text-sm font-medium min-h-[40px]">{p.bn}</div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <span className="font-bold">{p.price}৳</span> <span className="text-xs line-through text-gray-400">{p.old}৳</span>
                    <div className="text-[11px] text-green-600 font-medium">✓ In Stock • Free Delivery</div>
                  </div>
                  <button onClick={() => addToCart(p)} className="bg-black text-white w-9 h-9 rounded-full text-lg">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COLORFUL TRUST BADGES - NEW PREMIUM DESIGN */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-xl">💎</div>
            <div className="font-bold text-[13px]">১০০% অরিজিনাল</div>
            <div className="text-[11px] text-gray-600 mt-1">গ্যারান্টি সহ প্রোডাক্ট</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-xl">🚚</div>
            <div className="font-bold text-[13px]">ঢাকায় ফ্রি ডেলিভারি</div>
            <div className="text-[11px] text-gray-600 mt-1">২৪ ঘণ্টায় ডেলিভারি</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-xl">💵</div>
            <div className="font-bold text-[13px]">Cash on Delivery</div>
            <div className="text-[11px] text-gray-600 mt-1">হাতে পেয়ে টাকা দিন</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-xl">↩️</div>
            <div className="font-bold text-[13px]">৩ দিনে সহজ রিটার্ন</div>
            <div className="text-[11px] text-gray-600 mt-1">কোন প্রশ্ন ছাড়াই</div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div><div className="font-black tracking-widest">GAUSIA COLLECTION</div><div className="text-xs text-gray-400 mt-2">ঐতিহ্যের সাথে আধুনিকতা - Trusted Fashion Brand</div></div>
          <div className="text-sm"><div>WhatsApp: {WHATSAPP_NUMBER}</div><div className="text-xs text-gray-400">Facebook Pixel Ready for Boost</div></div>
        </div>
      </footer>

      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-white w-full max-w-sm p-6 flex flex-col">
            <div className="flex justify-between mb-4"><h2 className="font-bold">আপনার কার্ট</h2><button onClick={() => setShowCart(false)}>✕</button></div>
            <div className="flex-1 overflow-auto">{cart.length===0 ? <p className="text-sm text-gray-500">কার্ট খালি</p> : cart.map((p,i) => <div key={i} className="flex justify-between py-2 border-b text-sm"><span>{p.bn}</span><span>{p.price}৳</span></div>)}</div>
            {cart.length>0 && <button onClick={orderOnWhatsApp} className="bg-green-600 text-white rounded-full py-3 mt-4 font-bold">WhatsApp এ অর্ডার করুন</button>}
          </div>
        </div>
      )}
    </div>
  );
}
