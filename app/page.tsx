"use client";
import { useState } from "react";
const WHATSAPP_NUMBER = "8801913129137";
const PRODUCTS = [
  { id: 1, bn: "জর্জেট পার্টি শাড়ি - আধুনিক ডিজাইন", price: 1850, old: 2500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop", cat: "শাড়ি" },
  { id: 2, bn: "ব্রাইডাল লেহেঙ্গা - লাল", price: 4500, old: 6000, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop", cat: "লেহেঙ্গা" },
  { id: 3, bn: "কালো বোরকা - প্রিমিয়াম", price: 2200, old: 2800, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop", cat: "বোরকা" },
  { id: 4, bn: "সিটি গোল্ড নেকলেস সেট", price: 850, old: 1200, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop", cat: "সিটি গোল্ড" },
  { id: 5, bn: "কাতান শাড়ি - বিয়ের কালেকশন", price: 3200, old: 4500, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop", cat: "শাড়ি" },
  { id: 6, bn: "কটন থ্রি পিস - আরামদায়ক", price: 1250, old: 1600, img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=800&fit=crop", cat: "থ্রি পিস" },
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
      <header className="sticky top-0 z-50 bg-[#fdf8f2]/90 backdrop-blur-md border-b border-[#e8ddd0]">
        <div className="flex justify-between items-center px-6 md:px-10 py-5">
          <div className="font-black tracking-[0.25em] text-[14px]">GAUSIA COLLECTION</div>
          <button onClick={() => setShowCart(true)} className="bg-[#1a1a1a] text-white rounded-full px-5 py-2 text-xs font-bold">Cart ({cart.length})</button>
        </div>
        <div className="px-6 md:px-10 pb-4 flex gap-2 overflow-auto">
          {["সব","শাড়ি","লেহেঙ্গা","বোরকা","সিটি গোল্ড","থ্রি পিস"].map(c => (
            <button key={c} onClick={() => setActiveCat(c)} className={`px-5 py-2 rounded-full text-xs border ${activeCat===c ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white border-[#e8ddd0]'}`}>{c}</button>
          ))}
        </div>
      </header>

      <main className="px-6 md:px-10 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-[20px] overflow-hidden border border-[#f0e8df] shadow-sm hover:shadow-lg transition">
              <img src={p.img} alt={p.bn} className="h-[360px] w-full object-cover" />
              <div className="p-4">
                <div className="text-[13px] font-medium min-h-[36px]">{p.bn}</div>
                <div className="flex justify-between items-end mt-3">
                  <div><span className="font-bold">{p.price}৳</span> <span className="text-[11px] line-through text-gray-400 ml-1">{p.old}৳</span><div className="text-[10px] text-[#7a6a58] mt-1">✓ In Stock • Free Delivery</div></div>
                  <button onClick={() => addToCart(p)} className="w-9 h-9 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#f0e8df] rounded-[18px] p-6 text-center"><div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center">💎</div><div className="font-bold text-[13px] mt-3">১০০% অরিজিনাল</div></div>
          <div className="bg-white border border-[#f0e8df] rounded-[18px] p-6 text-center"><div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200 flex items-center justify-center">🚚</div><div className="font-bold text-[13px] mt-3">ফ্রি ডেলিভারি</div></div>
          <div className="bg-white border border-[#f0e8df] rounded-[18px] p-6 text-center"><div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 flex items-center justify-center">💵</div><div className="font-bold text-[13px] mt-3">Cash on Delivery</div></div>
          <div className="bg-white border border-[#f0e8df] rounded-[18px] p-6 text-center"><div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 flex items-center justify-center">↩️</div><div className="font-bold text-[13px] mt-3">৩ দিনে রিটার্ন</div></div>
        </div>
      </main>

      <footer className="bg-[#1a1a1a] text-white mt-10"><div className="px-6 md:px-10 py-8 flex justify-between"><div className="tracking-[0.2em] font-black text-sm">GAUSIA COLLECTION</div><div className="text-sm">WhatsApp: {WHATSAPP_NUMBER}</div></div></footer>

      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-[#fdf8f2] w-full max-w-sm p-6 flex flex-col">
            <div className="flex justify-between mb-6"><h2 className="font-bold">আপনার কার্ট</h2><button onClick={() => setShowCart(false)}>✕</button></div>
            <div className="flex-1 overflow-auto">{cart.length===0 ? <p className="text-sm text-gray-500">কার্ট খালি</p> : cart.map((p,i) => <div key={i} className="flex justify-between py-3 border-b text-sm"><span>{p.bn}</span><span className="font-bold">{p.price}৳</span></div>)}</div>
            {cart.length>0 && <button onClick={orderOnWhatsApp} className="bg-[#1a1a1a] text-white rounded-full py-3 mt-6 font-bold">WhatsApp এ অর্ডার করুন</button>}
          </div>
        </div>
      )}
    </div>
  );
}
