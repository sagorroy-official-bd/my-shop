"use client";
import { useState } from "react";

const products = [
  { id:1, title:"Black Kajal Waterproof - Gausia Collection", price:59, old:240, off:75, sold:39, rating:4.5, rev:7, choice:true, city:"Dhaka", img:"https://images.unsplash.com/photo-1631214524020-7e84f0e7a0a0?w=300" },
  { id:2, title:"Gausia Metal Leaf Brooch For Women", price:265, old:427, off:38, sold:121, rating:4.8, rev:34, choice:false, city:"Chattogram", img:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300" },
  { id:3, title:"Gausia Eyeconic Kajal - Deep Black", price:37, old:97, off:62, sold:243, rating:5, rev:27, choice:false, city:"Dhaka", img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300" },
  { id:4, title:"Gausia Beauty Glazed Kajal Liner", price:155, old:350, off:56, sold:55, rating:4.6, rev:10, choice:true, city:"Dhaka", img:"https://images.unsplash.com/photo-1587304886422-4111b2c0aa27?w=300" },
];

export default function Page(){
  return(
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* Header - GAUSIA থাকবে, রঙ Daraz এর */}
      <header className="bg-[#f85606] p-3 flex gap-4 items-center sticky top-0 z-50">
        <div className="text-white font-black text-[18px] tracking-wide">GAUSIA COLLECTION</div>
        <div className="flex-1 max-w-[600px] flex bg-white rounded overflow-hidden">
          <input defaultValue="meye der poshak" className="flex-1 p-2.5 text-sm outline-none" placeholder="Search in Gausia Collection"/>
          <button className="bg-[#ffe1d2] px-4">🔍</button>
        </div>
        <div className="text-white text-xl">🛒</div>
      </header>

      <div className="max-w-[1200px] mx-auto flex gap-6 p-4">
        <aside className="w-[200px] hidden md:block bg-white p-4 text-sm">
          <h3 className="font-bold mb-2">Category</h3>
          <p className="text-xs text-gray-500 leading-6">Meye der Poshak<br/>Saree<br/>Three Piece<br/>Bangles<br/>Hijab<br/>Kajal<br/><b className="text-[#1a9cb7]">VIEW MORE</b></p>
          <h3 className="font-bold mt-6 mb-2">Brand</h3>
          <p className="text-xs text-gray-500 leading-6">☐ Gausia Collection<br/>☐ Suba Int.<br/>☐ Beauty Glazed<br/>☐ Glam Touch</p>
        </aside>

        <main className="flex-1">
          <div className="bg-white p-3 mb-3 flex justify-between items-center text-sm">
            <div><b>meye der poshak</b><br/><span className="text-xs text-gray-500">1279 items found for "meye der poshak" in Gausia</span></div>
            <div className="flex gap-2 items-center">Sort By: <select className="border p-1 rounded text-xs"><option>Best Match</option></select></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.map(p=>(
              <div key={p.id} className="bg-white p-2 hover:shadow-lg cursor-pointer">
                <img src={p.img} className="w-full h-[180px] object-cover"/>
                {p.choice && <span className="bg-[#ffce00] text-[10px] font-bold px-1">CHOICE</span>}
                <h4 className="text-[12px] mt-1 line-clamp-2 h-[32px]">{p.title}</h4>
                <div className="text-[#f85606] font-bold">৳ {p.price}</div>
                <div className="text-[11px] text-gray-400">{p.off}% Off <span className="bg-[#fff6f3] text-[#f85606] ml-1">BEST PRICE</span></div>
                <div className="text-[11px] mt-1">{p.sold} sold | ⭐ {p.rating} ({p.rev}) <span className="float-right text-[10px]">{p.city}</span></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
