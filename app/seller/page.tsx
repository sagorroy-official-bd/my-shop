"use client";
import { useState } from "react";

export default function SellerPage() {
  const [shop, setShop] = useState("SHOP-01");
  const [name, setName] = useState("Gausia");
  const [phone, setPhone] = useState("1111111");
  const [pName, setPName] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [retail, setRetail] = useState("");
  const [montobbo, setMontobbo] = useState("");
  const [remark, setRemark] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleImage = (e: any) => {
    const files = Array.from(e.target.files || []).slice(0, 6 - images.length);
    setImages([...images, ...files.map((f: any) => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  const deleteFormImage = (idx: number) => {
    setImages(images.filter((_, j) => j !== idx));
  };

  const deleteDraftImage = (draftIdx: number, imgIdx: number) => {
    const copy = [...drafts];
    copy[draftIdx].images = copy[draftIdx].images.filter((_: any, j: number) => j !== imgIdx);
    setDrafts(copy);
    if (editIndex === draftIdx) setImages(copy[draftIdx].images);
  };

  const clearForm = () => {
    setPName(""); setWholesale(""); setRetail("");
    setMontobbo(""); setRemark(""); setImages([]);
    setEditIndex(null);
  };

  const addOrSave = () => {
    if (!pName || !wholesale || !retail) { alert("পণ্যের নাম, পাইকারি মূল্য, খুচরা মূল্য লিখেন"); return; }
    const data = { pName, wholesale, retail, montobbo, remark, images };
    if (editIndex !== null) {
      const copy = [...drafts]; copy[editIndex] = data; setDrafts(copy);
    } else { setDrafts([...drafts, data]); }
    clearForm();
  };

  const editDraft = (i: number) => {
    const d = drafts[i];
    setPName(d.pName); setWholesale(d.wholesale); setRetail(d.retail);
    setMontobbo(d.montobbo || ""); setRemark(d.remark || ""); setImages([...(d.images || [])]);
    setEditIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteDraft = (i: number) => {
    if (!confirm("ডিলিট করবেন?")) return;
    setDrafts(drafts.filter((_, j) => j !== i));
    if (editIndex === i) clearForm();
  };

  const sendAdmin = () => {
    if (drafts.length === 0) { alert("আগে Draft-এ যোগ করেন"); return; }
    const old = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    localStorage.setItem("admin_orders", JSON.stringify([...old, { shop, name, phone, items: drafts, time: new Date().toLocaleString() }]));
    alert("Admin-এর কাছে পাঠানো হয়েছে");
    setDrafts([]);
    setPName(""); setWholesale(""); setRetail("");
    setMontobbo(""); setRemark(""); setImages([]);
    setShop(""); setName(""); setPhone("");
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-black via-zinc-900 to-pink-700 text-white rounded-[20px] p-5 text-center">
          <h1 className="font-black text-2xl md:text-3xl">GAUSIA COLLECTION</h1>
          <p className="text-xs opacity-80 mt-1">Seller Page • my-shop-17lh.vercel.app/seller</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-[20px] border shadow-sm p-5">
            <h2 className="font-bold">🛍️ দোকান + পণ্য</h2>
            <input value={shop} onChange={(e)=>setShop(e.target.value)} placeholder="SHOP-01" className="w-full border rounded-xl px-4 py-3 mt-4 text-sm outline-none focus:border-pink-500" />
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Gausia" className="w-full border rounded-xl px-4 py-3 mt-3 text-sm outline-none focus:border-pink-500" />
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="মোবাইল" className="w-full border rounded-xl px-4 py-3 mt-3 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-5">পণ্যের নাম - যেমন: বোরকা / শাড়ি / থ্রি-পিস</label>
            <input value={pName} onChange={(e)=>setPName(e.target.value)} placeholder="এখানে পণ্যের নাম লিখবেন" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-4">পাইকারি মূল্য</label>
            <input value={wholesale} onChange={(e)=>setWholesale(e.target.value)} placeholder="500" type="number" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500 placeholder:text-amber-300 placeholder:font-bold" />

            <label className="block text-sm font-bold mt-4">খুচরা মূল্য</label>
            <input value={retail} onChange={(e)=>setRetail(e.target.value)} placeholder="800" type="number" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500 placeholder:text-amber-300 placeholder:font-bold" />

            <label className="block text-sm font-bold mt-4">📷 ছবি - একসাথে সর্বোচ্চ 6টা</label>
            <input type="file" multiple accept="image/*" onChange={handleImage} className="w-full border rounded-xl px-4 py-3 mt-2 text-sm" />
            <p className="text-xs text-gray-500 mt-1">ছবি {images.length} / 6 টা</p>

            {images.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {images.map((img, j) => (
                  <div key={j} className="relative">
                    <img src={img} className="w-16 h-16 object-cover rounded-lg" />
                    <button onClick={()=>deleteFormImage(j)} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-[11px] font-bold leading-none">✕</button>
                  </div>
                ))}
              </div>
            )}

            <label className="block text-sm font-bold mt-4">মন্তব্য</label>
            <textarea value={montobbo} onChange={(e)=>setMontobbo(e.target.value)} placeholder="মন্তব্য লিখেন" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500 placeholder:text-amber-300 placeholder:font-bold" rows={2} />

            <label className="block text-sm font-bold mt-4">রিমার্ক</label>
            <textarea value={remark} onChange={(e)=>setRemark(e.target.value)} placeholder="Remark - অ্যাডমিনের জন্য নোট" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500 placeholder:text-amber-300 placeholder:font-bold" rows={2} />

            <button onClick={addOrSave} className="w-full bg-black text-white rounded-full py-3 mt-4 font-bold text-sm">
              {editIndex !== null ? "✅ Save / আপডেট করুন" : "+ Draft-এ যোগ করুন"}
            </button>
            {editIndex !== null && <button onClick={clearForm} className="w-full border rounded-full py-2 mt-2 text-sm">বাতিল</button>}
          </div>

          <div className="bg-white rounded-[20px] border shadow-sm p-5 h-fit">
            <h2 className="font-bold">👁️ প্রিভিউ - Draft</h2>
            {drafts.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 mt-3 text-sm">Draft খালি</div>
            ) : drafts.map((d, i) => (
              <div key={i} className="border rounded-xl p-3 mt-3 text-sm">
                <b>{d.pName}</b>
                <p>পাইকারি: {d.wholesale} ৳ | খুচরা: {d.retail} ৳</p>
                {d.montobbo && <p>মন্তব্য: {d.montobbo}</p>}
                {d.remark && <p className="text-gray-600">রিমার্ক: {d.remark}</p>}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {d.images.map((img: string, j: number) => (
                    <div key={j} className="relative">
                      <img src={img} className="w-16 h-16 object-cover rounded-lg" />
                      {editIndex === i && (
                        <button onClick={()=>deleteDraftImage(i, j)} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-[11px] font-bold leading-none">✕</button>
                      )}
                    </div>
                  ))}
                </div>
                {editIndex === i && <p className="text-[11px] text-red-500 mt-1">Edit চলতেছে - ছবির ✕ দিয়ে আলাদা ডিলিট করতে পারবেন</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={()=>editDraft(i)} className="flex-1 bg-yellow-400 rounded-lg py-1.5 font-bold text-xs">✏️ Edit</button>
                  <button onClick={()=>deleteDraft(i)} className="flex-1 bg-red-500 text-white rounded-lg py-1.5 font-bold text-xs">🗑️ Delete</button>
                </div>
              </div>
            ))}
            <button onClick={sendAdmin} className="w-full bg-green-600 text-white rounded-xl py-3 mt-3 font-bold text-sm">📤 Send Admin - {drafts.length} টা পণ্য (এটা ছবিসহ যাবে)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
