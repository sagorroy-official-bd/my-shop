"use client";
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "8801913129137";

const DEFAULT_CATS = [
  { bn: "সব", en: "All", icon: "✨" },
  { bn: "শাড়ি", en: "Saree", icon: "👗" },
  { bn: "থ্রি পিস", en: "Three Piece", icon: "👚" },
  { bn: "লেহেঙ্গা", en: "Lehenga", icon: "👑" },
  { bn: "বোরকা", en: "Borka", icon: "🧕" },
  { bn: "আবায়া", en: "Abaya", icon: "🖤" },
  { bn: "সিটি গোল্ড", en: "City Gold", icon: "💍" },
  { bn: "হিজাব", en: "Hijab", icon: "🧣" },
];

const defaults = [
  { id: 1, bn: "জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", en: "Georgette Party Saree", price: 1850, old: 2500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500" },
  { id: 2, bn: "ব্রাইডাল লেহেঙ্গা - লাল", en: "Bridal Lehenga Red", price: 4500, old: 6000, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500" },
  { id: 3, bn: "কালো বোরকা - প্রিমিয়াম", en: "Black Borka Premium", price: 2200, old: 2800, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500" },
  { id: 4, bn: "সিটি গোল্ড নেকলেস সেট", en: "City Gold Set", price: 850, old: 1200, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500" },
  { id: 5, bn: "কাতান শাড়ি - বিয়ের কালেকশন", en: "Katan Saree Wedding", price: 3200, old: 4500, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500" },
  { id: 6, bn: "কটন থ্রি পিস - আরামদায়ক", en: "Cotton Three Piece", price: 1250, old: 1600, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500" },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b flex justify-between items-center px-4 md:px-8 py-3">
        <div className="font-black tracking-widest">GAUSIA COLLECTION</div>
        <button onClick={() => setShowCart(true)} className="bg-black text-white rounded-full px-4 py-1.5 text-sm">Cart ({cart.length})</button>
      </header>

      <main className="px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {defaults.map(p => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm">
              <img src={p.img} alt={p.bn} className="h-64 w-full object-cover" />
              <div className="p-3">
                <div className="text-sm font-medium h-10">{p.bn}</div>
                <div className="flex justify-between items-center mt-2">
                  <div><span className="font-bold">{p.price}৳</span> <span className="text-xs line-through text-gray-400">{p.old}৳</span></div>
                  <button onClick={() => addToCart(p)} className="bg-black text-white w-8 h-8 rounded-full">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NEW COLORFUL TRUST BADGES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-xl">💎</div>
            <div className="font-bold text-sm">১০০% অরিজিনাল</div>
            <div className="text-xs text-gray-600 mt-1">গ্যারান্টি সহ</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-sky-100 border border-blue-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-xl">🚚</div>
            <div className="font-bold text-sm">ঢাকায় ফ্রি ডেলিভারি</div>
            <div className="text-xs text-gray-600 mt-1">Inside Dhaka</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-xl">💵</div>
            <div className="font-bold text-sm">Cash on Delivery</div>
            <div className="text-xs text-gray-600 mt-1">হাতে পেয়ে টাকা</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-xl">↩️</div>
            <div className="font-bold text-sm">৩ দিনে রিটার্ন</div>
            <div className="text-xs text-gray-600 mt-1">সহজ রিটার্ন</div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white px-4 md:px-8 py-8 flex justify-between">
        <div className="font-black tracking-widest">GAUSIA COLLECTION</div>
        <div className="text-sm">WhatsApp: {WHATSAPP_NUMBER}</div>
      </footer>

      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-white w-full max-w-sm p-6 flex flex-col">
            <div className="flex justify-between mb-4"><h2 className="font-bold">আপনার কার্ট</h2><button onClick={() => setShowCart(false)}>✕</button></div>
            <div className="flex-1">{cart.map((p, i) => <div key={i} className="flex justify-between py-2 border-b text-sm"><span>{p.bn}</span><span>{p.price}৳</span></div>)}</div>
            {cart.length > 0 && <button onClick={orderOnWhatsApp} className="bg-green-600 text-white rounded-full py-3 mt-4 font-bold">WhatsApp এ অর্ডার করুন</button>}
          </div>
        </div>
      )}
    </div>
  );
}
