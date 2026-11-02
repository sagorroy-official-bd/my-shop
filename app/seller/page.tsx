"use client";
import { useState, useEffect, useRef } from "react";
export default function SellerPage() {
  const [loggedShop, setLoggedShop] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [regForm, setRegForm] = useState({ shopName: "", address: "", floor: "২য় তলা" });
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", cat: "Women", price: "", quality: "positive", img: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const saved = localStorage.getItem("gausia_products");
    if (saved) setProducts(JSON.parse(saved));
    const logged = localStorage.getItem("gausia_seller_logged");
    if (logged) setLoggedShop(JSON.parse(logged));
  }, []);
  const saveProducts = (newProds: any[]) => { setProducts(newProds); localStorage.setItem("gausia_products", JSON.stringify(newProds)); };
  const getSellers = () => { const s = localStorage.getItem("gausia_sellers"); return s ? JSON.parse(s) : []; };
  const handlePhoneLogin = () => {
    if (phone.length < 11) return alert("সঠিক ১১ ডিজিটের ফোন নাম্বার দিন - যেমন 01712345678");
    const sellers = getSellers();
    const existing = sellers.find((s: any) => s.phone === phone);
    if (existing) {
      setLoggedShop(existing);
      localStorage.setItem("gausia_seller_logged", JSON.stringify(existing));
    } else {
      setIsNew(true);
    }
  };
  const handleRegister = () => {
    if (!regForm.shopName || !regForm.address) return alert("দোকানের নাম ও ঠিকানা দিন");
    const sellers = getSellers();
    const code = `SHOP-${String(sellers.length + 1).padStart(2, "0")}`;
    const newSeller = { phone, code, name: regForm.shopName, address: `${regForm.floor}, ${regForm.address}`, fullAddress: regForm.address, floor: regForm.floor, createdAt: new Date().toLocaleString("bn-BD"), };
    const newSellers = [...sellers, newSeller];
    localStorage.setItem("gausia_sellers", JSON.stringify(newSellers));
    localStorage.setItem("gausia_seller_logged", JSON.stringify(newSeller));
    setLoggedShop(newSeller); setIsNew(false);
    alert(`✅ রেজিস্ট্রেশন সফল! আপনার কোড: ${code}`);
  };
  const handleLogout = () => { setLoggedShop(null); localStorage.removeItem("gausia_seller_logged"); setPhone(""); setIsNew(false); };
  const handleFile = (e: any) => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (ev: any) => { setForm({ ...form, img: ev.target.result }); }; reader.readAsDataURL(file); };
  const handleAdd = () => {
    if (!form.name || !form.price) return alert("নাম ও দাম দিন");
    if (editId !== null) { const updated = products.map(p => p.id === editId ? { ...p, name: form.name, cat: form.cat, price: parseInt(form.price), quality: form.quality, img: form.img || p.img } : p); saveProducts(updated); setEditId(null); setForm({ name: "", cat: "Women", price: "", quality: "positive", img: "" }); if(fileRef.current) fileRef.current.value = ""; alert("✅ এডিট সফল!"); return; }
    const count = products.filter(p => p.shopCode === loggedShop.code).length + 1;
    const code = `${loggedShop.code}-${String(count).padStart(3, "0")}`;
    const newProduct = { id: Date.now(), code, name: form.name, cat: form.cat, shopCode: loggedShop.code, shopName: loggedShop.name, shopPhone: loggedShop.phone, shopAddress: loggedShop.address, price: parseInt(form.price), quality: form.quality, img: form.img || `https://picsum.photos/seed/${code}/400/400`, };
    saveProducts([...products, newProduct]); setForm({ name: "", cat: "Women", price: "", quality: "positive", img: "" }); if(fileRef.current) fileRef.current.value = ""; alert(`${code} সফলভাবে আপলোড হয়েছে!`);
  };
  const handleDelete = (id: number) => { if(!confirm("ডিলিট করতে চান?")) return; saveProducts(products.filter(p => p.id !== id)); };
  const handleEdit = (p: any) => { setEditId(p.id); setForm({ name: p.name, cat: p.cat, price: String(p.price), quality: p.quality, img: p.img }); window.scrollTo({top: 0, behavior: 'smooth'}); };
  const myProducts = products.filter(p => loggedShop && p.shopCode === loggedShop.code);
  if (!loggedShop) {
    if (isNew) {
      return (
        <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] border shadow-xl p-6 w-full max-w-sm">
            <div className="text-center"><div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-white font-black text-xl" style={{background:"linear-gradient(135deg,#ff6a00,#ee0979)"}}>G</div><h1 className="font-black text-lg mt-3">নতুন দোকান রেজিস্ট্রেশন</h1><p className="text-xs text-gray-500 mt-1">ফোন: {phone}</p></div>
            <input value={regForm.shopName} onChange={e=>setRegForm({...regForm, shopName: e.target.value})} placeholder="দোকানের নাম" className="w-full mt-5 border rounded-xl px-4 py-3 text-sm font-bold" />
            <select value={regForm.floor} onChange={e=>setRegForm({...regForm, floor: e.target.value})} className="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><option>১ম তলা</option><option>২য় তলা</option><option>৩য় তলা</option><option>৪র্থ তলা</option><option>৫ম তলা</option></select>
            <input value={regForm.address} onChange={e=>setRegForm({...regForm, address: e.target.value})} placeholder="দোকান নং, গাউছিয়া মার্কেট" className="w-full mt-3 border rounded-xl px-4 py-3 text-sm" />
            <button onClick={handleRegister} className="w-full mt-4 bg-black text-white rounded-full py-3 font-black text-sm">রেজিস্ট্রেশন সম্পন্ন করুন</button>
            <button onClick={()=>setIsNew(false)} className="w-full mt-2 text-xs text-gray-500">← ফিরে যান</button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center p-4">
        <div className="bg-white rounded-[24px] border shadow-xl p-8 w-full max-w-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-white font-black text-xl" style={{background:"linear-gradient(135deg,#ff6a00,#ee0979)"}}>G</div>
          <h1 className="font-black text-xl mt-3">দোকানদার লগইন</h1>
          <p className="text-xs text-gray-500 mt-1">ফোন নাম্বার দিয়ে লগইন করুন</p>
          <input value={phone} onChange={e=>setPhone(e.target.value)} type="tel" placeholder="যেমন: 01712345678" className="w-full mt-5 border rounded-full px-4 py-3 text-sm font-bold text-center tracking-widest" />
          <button onClick={handlePhoneLogin} className="w-full mt-3 bg-black text-white rounded-full py-3 font-black text-sm">লগইন করুন</button>
          <p className="text-[11px] text-gray-400 mt-3">নতুন হলে দোকানের ঠিকানা চাইবে</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#fff8f0]">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex gap-2 items-center"><div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-black">G</div><div><div className="font-black text-sm">{loggedShop.name}</div><div className="text-[10px] text-gray-600">{loggedShop.code} | {loggedShop.address}</div><div className="text-[10px]">📞 {loggedShop.phone}</div></div></div>
          <button onClick={handleLogout} className="text-xs bg-black text-white px-4 py-2 rounded-full font-bold">লগআউট</button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-5 grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-[20px] border p-5 shadow-sm h-fit">
          <h2 className="font-black">{editId ? "✏️ এডিট করুন" : `নতুন পণ্য আপলোড`}</h2>
          <p className="text-xs text-gray-500 mt-1">কোড: {loggedShop.code}-{(myProducts.length+1).toString().padStart(3,"0")}</p>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="পণ্যের নাম" className="w-full mt-4 border rounded-xl px-4 py-3 text-sm" />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} className="border rounded-xl px-3 py-3 text-sm"><option value="Women">👩 মহিলা</option><option value="Men">👨 পুরুষ</option><option value="Girls">👧 মেয়ে</option><option value="Boys">👦 ছেলে</option><option value="Baby">👶 বেবি</option></select>
            <select value={form.quality} onChange={e=>setForm({...form,quality:e.target.value})} className="border rounded-xl px-3 py-3 text-sm"><option value="positive">✅ পজিটিভ</option><option value="negative">⚠️ নেগেটিভ</option></select>
          </div>
          <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} type="number" placeholder="দাম" className="w-full mt-3 border rounded-xl px-4 py-3 text-sm" />
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <button onClick={()=>fileRef.current?.click()} className="w-full mt-3 border-2 border-dashed rounded-xl px-4 py-4 text-sm font-bold bg-gray-50">{form.img ? "✅ ছবি সিলেক্ট হয়েছে" : "📁 গ্যালারি থেকে ছবি বাছাই করুন"}</button>
          {form.img && <img src={form.img} className="w-full h-32 object-cover rounded-xl mt-3 border" alt="preview"/>}
          <button onClick={handleAdd} className="w-full mt-4 bg-black text-white rounded-full py-3 font-black text-sm">{editId ? "✅ আপডেট করুন" : `আপলোড করুন`}</button>
        </div>
        <div>
          <div className="bg-white border rounded-xl p-3 text-[11px]"><b>দোকান:</b> {loggedShop.name}<br/><b>ঠিকানা:</b> {loggedShop.address}<br/><b>ফোন:</b> {loggedShop.phone}</div>
          <h2 className="font-black mt-3">আমার আপলোড ({myProducts.length} টি)</h2>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {myProducts.map(p=>(
              <div key={p.id} className="bg-white rounded-[18px] border overflow-hidden relative">
                <img src={p.img} className="w-full h-28 object-cover" alt={p.name}/>
                <div className="absolute top-1.5 right-1.5 flex gap-1">
                  <button onClick={()=>handleEdit(p)} className="bg-white shadow w-7 h-7 rounded-full text-[10px]">✏️</button>
                  <button onClick={()=>handleDelete(p.id)} className="bg-red-500 text-white shadow w-7 h-7 rounded-full text-[10px]">🗑️</button>
                </div>
                <div className="p-2.5"><div className="text-[10px] font-mono bg-gray-100 px-2 rounded-full inline-block">{p.code}</div><div className="font-bold text-xs mt-1">{p.name}</div><div className="font-black text-sm mt-1">{p.price}৳</div></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
