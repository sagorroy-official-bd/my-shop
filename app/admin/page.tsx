"use client";
import { useState, useEffect } from "react";

type Product = { id: number; code: string; name: string; price: number; finalPrice: number; shop: string; quality: "positive" | "negative"; status: "pending" | "published" };

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [pass, setPass] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(()=>{
    const s = localStorage.getItem("gausia_admin_products");
    if(s) setProducts(JSON.parse(s));
    else {
      // Demo - 100 দোকানদারের পণ্য Pending
      const demo: Product[] = [
        { id: 1, code: "SHOP-01-001", name: "জর্জেট শাড়ি", price: 800, finalPrice: 0, shop: "SHOP-01", quality: "positive", status: "pending" },
        { id: 2, code: "SHOP-02-001", name: "কাতান বোরকা", price: 650, finalPrice: 0, shop: "SHOP-02", quality: "negative", status: "pending" },
      ];
      setProducts(demo);
    }
  },[]);

  const save = (list: Product[]) => { setProducts(list); localStorage.setItem("gausia_admin_products", JSON.stringify(list)); localStorage.setItem("gausia_products", JSON.stringify(list.filter(p=>p.status==="published"))); };

  const publish = (id: number, finalPrice: number) => {
    const updated = products.map(p=> p.id===id ? {...p, finalPrice, status: "published" as const} : p);
    save(updated);
    alert(`পাবলিশ হয়েছে! কোড: ${products.find(p=>p.id===id)?.code} - কাস্টমার পেজে চলে গেছে ✅`);
  };

  if(!ok){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow">
          <h1 className="font-black text-center text-xl">GAUSIA - এডমিন</h1>
          <p className="text-center text-xs">১০০ দোকান + কাস্টমার কন্ট্রোল</p>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="পাসওয়ার্ড: admin123" className="w-full border-2 rounded-full px-5 py-3 mt-6" />
          <button onClick={()=>pass==="admin123" ? setOk(true) : alert("ভুল পাসওয়ার্ড")} className="w-full bg-black text-white rounded-full py-3 mt-3 font-bold">লগইন</button>
        </div>
      </div>
    );
  }

  const filtered = products.filter(p=> filter==="all" ? true : p.status===filter);

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-black text-xl">এডমিন কন্ট্রোল - ৩টা পেজ</h1>
        <div className="flex gap-2 mt-3">
          <button onClick={()=>setFilter("all")} className={`px-4 py-2 rounded-full text-xs font-bold ${filter==="all"?"bg-black text-white":"bg-white"}`}>সব ({products.length})</button>
          <button onClick={()=>setFilter("pending")} className={`px-4 py-2 rounded-full text-xs font-bold ${filter==="pending"?"bg-black text-white":"bg-white"}`}>Pending ({products.filter(p=>p.status==="pending").length})</button>
          <button onClick={()=>setFilter("published")} className={`px-4 py-2 rounded-full text-xs font-bold ${filter==="published"?"bg-black text-white":"bg-white"}`}>Published ({products.filter(p=>p.status==="published").length})</button>
        </div>

        <div className="mt-4 space-y-3">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white p-4 rounded-2xl shadow flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <div className="font-bold text-sm">{p.code} - {p.name} {p.quality==="positive"?"✅ পজিটিভ":"⚠️ নেগেটিভ"}</div>
                <div className="text-xs text-gray-500">দোকান: {p.shop} | কেনা: {p.price}৳ | {p.quality==="positive"?"100% অরিজিনাল":"কপি/এভারেজ"}</div>
                <div className="text-xs mt-1">স্ট্যাটাস: <b>{p.status}</b></div>
              </div>
              {p.status==="pending" ? (
                <div className="flex items-center gap-2">
                  <input id={`fp-${p.id}`} type="number" placeholder="বিক্রয় দাম" className="border rounded-full px-3 py-2 text-sm w-28" />
                  <button onClick={()=>{
                    const el = document.getElementById(`fp-${p.id}`) as HTMLInputElement;
                    if(!el.value) return alert("বিক্রয় দাম লিখুন");
                    publish(p.id, Number(el.value));
                  }} className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold">Publish</button>
                </div>
              ) : (
                <div className="text-sm font-bold text-green-600">✅ কাস্টমার পেজে আছে - {p.finalPrice}৳ {p.quality==="positive"?"✅":"⚠️"}</div>
              )}
            </div>
          ))}
        </div>

        <a href="/" className="bg-[#ff6a00] text-white px-6 py-2 rounded-full inline-block mt-6 text-sm font-bold">কাস্টমার পেজ দেখুন</a>
        <a href="/seller" className="bg-black text-white px-6 py-2 rounded-full inline-block mt-6 ml-2 text-sm font-bold">দোকানদার পেজ দেখুন</a>
      </div>
    </div>
  );
}
