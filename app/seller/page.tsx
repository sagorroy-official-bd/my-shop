"use client";
import { useState, useEffect } from "react";

const SHOPS = [
  { code: "SHOP-01", name: "মা ফ্যাশন হাউজ" },
  { code: "SHOP-02", name: "বোরকা কালেকশন" },
  { code: "SHOP-03", name: "পুরুষ ফ্যাশন" },
  { code: "SHOP-04", name: "বাচ্চাদের দুনিয়া" },
  { code: "SHOP-05", name: "সিটি গোল্ড হাউজ" },
  { code: "SHOP-06", name: "থ্রি পিস কর্নার" },
  { code: "SHOP-07", name: "ছেলেদের পাঞ্জাবি" },
  { code: "SHOP-08", name: "বেনারসি কালেকশন" },
  { code: "SHOP-09", name: "মেয়েদের পার্টি ড্রেস" },
  { code: "SHOP-10", name: "ফ্যামিলি কালেকশন" },
];

export default function SellerPage() {
  const [loggedShop, setLoggedShop] = useState<any>(null);
  const [shopCode, setShopCode] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", cat: "Women", price: "", quality: "positive", img: "" });

  useEffect(() => {
    const saved = localStorage.getItem("gausia_products");
    if (saved) setProducts(JSON.parse(saved));
    const logged = localStorage.getItem("gausia_seller");
    if (logged) setLoggedShop(JSON.parse(logged));
  }, []);

  const saveProducts = (newProds: any[]) => {
    setProducts(newProds);
    localStorage.setItem("gausia_products", JSON.stringify(newProds));
  };

  const handleLogin = () => {
    const shop = SHOPS.find(s => s.code === shopCode.toUpperCase().trim());
    if (shop) {
      setLoggedShop(shop);
      localStorage.setItem("gausia_seller", JSON.stringify(shop));
    } else {
      alert("ভুল কোড! SHOP-01 থেকে SHOP-10 লিখুন");
    }
  };

  const handleLogout = () => {
    setLoggedShop(null);
    localStorage.removeItem("gausia_seller");
  };

  const handleAdd = () => {
    if (!form.name || !form.price) return alert("নাম ও দাম দিন");
    const count = products.filter(p => p.shopCode === loggedShop.code).length + 1;
    if(count > 10) return alert("এই দোকানে ১০টা হয়ে গেছে! অন্য দোকানে লগইন করুন");
    const code = `${loggedShop.code}-${String(count).padStart(3, "0")}`;
    const newProduct = {
      id: Date.now(), code, name: form.name, cat: form.cat,
      shopCode: loggedShop.code, shopName: loggedShop.name,
      price: parseInt(form.price), quality: form.quality,
      img: form.img || `https://picsum.photos/seed/${code}/400/400`,
    };
    saveProducts([...products, newProduct]);
    setForm({ name: "", cat: "Women", price: "", quality: "positive", img: "" });
    alert(`${code} সফলভাবে আপলোড হয়েছে! ${count}/10`);
  };

  const myProducts = products.filter(p => loggedShop && p.shopCode === loggedShop.code);

  if (!loggedShop) {
    return (
      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center p-4">
        <div className="bg-white rounded-[24px] border shadow-xl p-8 w-full max-w-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-white font-black text-xl" style={{background:"linear-gradient(135deg,#ff6a00,#ee0979)"}}>G</div>
          <h1 className="font-black text-xl mt-3">দোকানদার লগইন</h1>
          <p className="text-xs text-gray-500 mt-1">১০ দোকানের ভার্চুয়াল টেস্ট</p>
          <input value={shopCode} onChange={e=>setShopCode(e.target.value)} placeholder="যেমন: SHOP-01" className="w-full mt-5 border rounded-full px-4 py-3 text-sm font-bold text-center" />
          <button onClick={handleLogin} className="w-full mt-3 bg-black text-white rounded-full py-3 font-black text-sm">লগইন করুন</button>
          <div className="mt-4 text-[11px] text-left bg-gray-50 p-3 rounded-xl"><b>ভার্চুয়াল কোড:</b><br/>SHOP-01 থেকে SHOP-10<br/>প্রতিটা থেকে ১০টা করে = ১০০টা</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f0]">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex gap-2 items-center"><div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-black">G</div><div><div className="font-black text-sm">{loggedShop.name}</div><div className="text-[11px]">{loggedShop.code} | {myProducts.length}/10 টি</div></div></div>
          <div className="flex gap-2"><a href="/" target="_blank" className="text-xs border px-3 py-1.5 rounded-full font-bold">কাস্টমার পেজ</a><button onClick={handleLogout} className="text-xs bg-black text-white px-3 py-1.5 rounded-full">লগআউট</button></div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-5 grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-[20px] border p-5 shadow-sm h-fit">
          <h2 className="font-black">নতুন পণ্য আপলোড ({myProducts.length+1} নম্বর)</h2>
          <p className="text-xs text-gray-500 mt-1">কোড অটো: {loggedShop.code}-{(myProducts.length+1).toString().padStart(3,"0")}</p>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="পণ্যের নাম: যেমন জর্জেট শাড়ি" className="w-full mt-4 border rounded-xl px-4 py-3 text-sm" />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} className="border rounded-xl px-3 py-3 text-sm"><option value="Women">👩 মহিলা</option><option value="Men">👨 পুরুষ</option><option value="Girls">👧 মেয়ে</option><option value="Boys">👦 ছেলে</option><option value="Baby">👶 বেবি</option></select>
            <select value={form.quality} onChange={e=>setForm({...form,quality:e.target.value})} className="border rounded-xl px-3 py-3 text-sm"><option value="positive">✅ পজিটিভ</option><option value="negative">⚠️ নেগেটিভ</option></select>
          </div>
          <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} type="number" placeholder="দাম: 1250" className="w-full mt-3 border rounded-xl px-4 py-3 text-sm" />
          <input value={form.img} onChange={e=>setForm({...form,img:e.target.value})} placeholder="ছবির লিংক (খালি রাখলে অটো)" className="w-full mt-3 border rounded-xl px-4 py-3 text-sm" />
          <button onClick={handleAdd} className="w-full mt-4 bg-black text-white rounded-full py-3 font-black text-sm">আপলোড করুন - {myProducts.length+1}/10</button>
        </div>
        <div>
          <h2 className="font-black">আমার আপলোড ({myProducts.length} টি)</h2>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {myProducts.map(p=>(
              <div key={p.id} className="bg-white rounded-[18px] border overflow-hidden"><img src={p.img} className="w-full h-28 object-cover" alt={p.name}/><div className="p-2.5"><div className="text-[10px] font-mono bg-gray-100 px-2 rounded-full inline-block">{p.code}</div><div className="font-bold text-xs mt-1">{p.name}</div><div className="text-[10px] text-gray-500">{p.cat} | {p.quality==="positive"?"✅":"⚠️"}</div><div className="font-black text-sm mt-1">{p.price}৳</div></div></div>
            ))}
          </div>
          {myProducts.length===0 && <div className="bg-white border rounded-xl p-8 text-center text-sm text-gray-400 mt-3">এখনো আপলোড করেননি</div>}
          {myProducts.length===10 && <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center text-sm font-bold text-green-700 mt-3">🎉 এই দোকানে ১০টা শেষ! এবার লগআউট করে SHOP-02 এ যান</div>}
        </div>
      </main>
    </div>
  );
}
