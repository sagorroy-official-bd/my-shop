"use client";
import { useState } from "react";

export default function SellerPage() {
  const [shop, setShop] = useState("SHOP-01");
  const [name, setName] = useState("Gausia");
  const [phone, setPhone] = useState("1111111");
  const [pName, setPName] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [retail, setRetail] = useState("");
  const [remark, setRemark] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);

  const handleImage = (e: any) => {
    const files = Array.from(e.target.files || []).slice(0, 6);
    const urls = files.map((f: any) => URL.createObjectURL(f));
    setImages(urls);
  };

  const addDraft = () => {
    if (!pName || !wholesale || !retail) {
      alert("পণ্যের নাম, পাইকারি মূল্য, খুচরা মূল্য লিখেন");
      return;
    }
    setDrafts([...drafts, { pName, wholesale, retail, remark, images }]);
    setPName(""); setWholesale(""); setRetail(""); setRemark(""); setImages([]);
  };

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-black via-zinc-900 to-pink-700 text-white rounded-[20px] p-5 md:p-6 shadow-lg text-center">
          <h1 className="font-black text-2xl md:text-3xl tracking-wide">GAUSIA COLLECTION</h1>
          <p className="text-[12px] md:text-sm opacity-80 mt-1">Seller Page • my-shop-17lh.vercel.app/seller</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-[20px] border shadow-sm p-5">
            <h2 className="font-bold flex items-center gap-2">🛍️ দোকান + পণ্য</h2>

            <input value={shop} onChange={(e)=>setShop(e.target.value)} className="w-full border rounded-xl px-4 py-3 mt-4 text-sm outline-none focus:border-pink-500" />
            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded-xl px-4 py-3 mt-3 text-sm outline-none focus:border-pink-500" />
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full border rounded-xl px-4 py-3 mt-3 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-5">পণ্যের নাম - যেমন: বোরকা / শাড়ি / থ্রি-পিস</label>
            <input value={pName} onChange={(e)=>setPName(e.target.value)} placeholder="এখানে পণ্যের নাম লিখবেন" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-4">পাইকারি মূল্য</label>
            <input value={wholesale} onChange={(e)=>setWholesale(e.target.value)} placeholder="পাইকারি মূল্য" type="number" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-4">খুচরা মূল্য</label>
            <input value={retail} onChange={(e)=>setRetail(e.target.value)} placeholder="খুচরা মূল্য" type="number" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-4">📷 ছবি - একসাথে সর্বোচ্চ 6টা</label>
            <input type="file" multiple accept="image/*" onChange={handleImage} className="w-full border rounded-xl px-4 py-3 mt-2 text-sm" />
            <p className="text-xs text-gray-500 mt-1">ছবি {images.length} / 6 টা</p>

            <label className="block text-sm font-bold mt-4">মন্তব্য / রিমার্ক</label>
            <textarea value={remark} onChange={(e)=>setRemark(e.target.value)} placeholder="Remark - অ্যাডমিনের জন্য নোট" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500" rows={3} />

            <button onClick={addDraft} className="w-full bg-black text-white rounded-full py-3 mt-4 font-bold text-sm">+ Draft-এ যোগ করুন</button>
          </div>

          <div className="bg-white rounded-[20px] border shadow-sm p-5 h-fit">
            <h2 className="font-bold">👁️ প্রিভিউ - Draft</h2>
            {drafts.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 mt-3 text-sm">Draft খালি</div>
            ) : (
              drafts.map((d, i) => (
                <div key={i} className="border rounded-xl p-3 mt-3 text-sm">
                  <b>{d.pName}</b>
                  <p>পাইকারি: {d.wholesale} ৳ | খুচরা: {d.retail} ৳</p>
                  {d.remark && <p className="text-gray-600">রিমার্ক: {d.remark}</p>}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {d.images.map((img: string, j: number) => (
                      <img key={j} src={img} className="w-16 h-16 object-cover rounded-lg" />
                    ))}
                  </div>
                </div>
              ))
            )}
            <button className="w-full bg-green-600 text-white rounded-xl py-3 mt-3 font-bold text-sm">📤 Send Admin - {drafts.length} টা পণ্য (এটা ছবিসহ যাবে)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
