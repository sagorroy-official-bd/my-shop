"use client";
import { useState } from "react";

export default function SellerPage() {
  const [drafts, setDrafts] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-[#f6f2ea] p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* নাম ঠিক করা - ভিউ */}
        <div className="bg-gradient-to-r from-black via-zinc-900 to-pink-700 text-white rounded-[20px] p-5 md:p-6 shadow-lg text-center">
          <h1 className="font-black text-2xl md:text-3xl tracking-wide">GAUSIA COLLECTION</h1>
          <p className="text-[12px] md:text-sm opacity-80 mt-1">Seller Page • my-shop-17lh.vercel.app/seller</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* বাম - ফর্ম - ভিতরে যা ছিল তাই আছে */}
          <div className="bg-white rounded-[20px] border shadow-sm p-5">
            <h2 className="font-bold flex items-center gap-2">🛍️ দোকান + পণ্য</h2>

            <input defaultValue="SHOP-01" className="w-full border rounded-xl px-4 py-3 mt-4 text-sm outline-none focus:border-pink-500" />
            <input defaultValue="Gausia" className="w-full border rounded-xl px-4 py-3 mt-3 text-sm outline-none focus:border-pink-500" />
            <input defaultValue="1111111" className="w-full border rounded-xl px-4 py-3 mt-3 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-5">পণ্যের নাম - যেমন: বোরকা / শাড়ি / থ্রি-পিস</label>
            <input placeholder="এখানে পণ্যের নাম লিখবেন" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-4">পাইকারি মূল্য - যেমন: 500</label>
            <input placeholder="পাইকারি মূল্য" type="number" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-4">খুচরা মূল্য - যেমন: 800</label>
            <input placeholder="খুচরা মূল্য" type="number" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500" />

            <label className="block text-sm font-bold mt-4">📷 ছবি - একসাথে সর্বোচ্চ 6টা</label>
            <input type="file" multiple className="w-full border rounded-xl px-4 py-3 mt-2 text-sm" />
            <p className="text-xs text-gray-500 mt-1">ছবি 0 / 6 টা</p>

            <label className="block text-sm font-bold mt-4">মন্তব্য</label>
            <textarea placeholder="Remark - অ্যাডমিনের জন্য নোট" className="w-full border rounded-xl px-4 py-3 mt-2 text-sm outline-none focus:border-pink-500" rows={2} />

            <button className="w-full bg-black text-white rounded-full py-3 mt-4 font-bold text-sm">+ Draft-এ যোগ করুন</button>
          </div>

          {/* ডান - প্রিভিউ - ভিতরে যা ছিল তাই আছে */}
          <div className="bg-white rounded-[20px] border shadow-sm p-5 h-fit">
            <h2 className="font-bold">👁️ প্রিভিউ - Draft</h2>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 mt-3 text-sm">Draft খালি</div>
            <button className="w-full bg-green-600 text-white rounded-xl py-3 mt-3 font-bold text-sm">📤 Send Admin - {drafts.length} টা পণ্য (এটা ছবিসহ যাবে)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
