"use client";
import { useState, useEffect } from "react";
export default function Home(){
  const [approved,setApproved]=useState<any[]>([]);
  const [cart,setCart]=useState<any[]>([]);
  const [selected,setSelected]=useState<any|null>(null);
  const [filter,setFilter]=useState("সব");
  const [search,setSearch]=useState("");

  useEffect(()=>{
    const backup=JSON.parse(localStorage.getItem("gausia_admin_backup")||"[]");
    const final=JSON.parse(localStorage.getItem("gausia_customer_final")||"[]");
    const approvedFromBackup=backup.filter((p:any)=>p.adminStatus==="approved").map((p:any)=>p.adminEditedData);
    setApproved(final.length>0?final:approvedFromBackup);
    setCart(JSON.parse(localStorage.getItem("gausia_cart")||"[]"));
  },[]);

  const demo=[
    {id:"SHOP-01-002",title:"মহিলা থ্রি-পিস",price:"2500",cat:"মহিলা",comment:"সুতি কাপড়",image:""},
    {id:"SHOP-01-003",title:"পুরুষ পাঞ্জাবি",price:"1800",cat:"পুরুষ",comment:"আরামদায়ক",image:""},
    {id:"SHOP-01-004",title:"বেবি ফ্রক",price:"900",cat:"বেবি",comment:"নরম কাপড়",image:""},
  ];
  const all=[...approved,...demo];

  const filtered=all.filter(p=>{
    const matchCat=filter==="সব"?true:p.cat===filter;
    const matchSearch=p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart=(p:any)=>{
    const newCart=[...cart,p];
    setCart(newCart);
    localStorage.setItem("gausia_cart",JSON.stringify(newCart));
    alert(`${p.title} কার্টে যোগ হয়েছে!`);
  };

  return(
    <div className="min-h-screen bg-[#fdf6ee] font-sans">
      <header className="bg-white border-b-2 border-black py-3 px-4 md:px-8 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-xl md:text-2xl font-black">GAUSIA COLLECTION</h1>
        <div className="flex gap-2 items-center">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="সার্চ..." className="border-2 border-black rounded-full px-4 py-1 text-sm w-28 md:w-48"/>
          <div className="bg-black text-white px-4 py-1 rounded-full text-sm">🛒 {cart.length}</div>
          <div className="bg-black text-white px-3 py-1 rounded-full text-xs">মোট: {filtered.length}</div>
        </div>
      </header>

      <div className="p-4 max-w-7xl mx-auto">
        <div className="bg-white border-2 border-black rounded-[20px] p-3 flex gap-2 overflow-x-auto">
          {["সব","মহিলা","পুরুষ","বেবি","অনুমোদিত"].map(c=><button key={c} onClick={()=>setFilter(c==="অনুমোদিত"?"সব":c)} className={`px-5 py-2 rounded-full border-2 border-black font-bold whitespace-nowrap ${filter===c || (c==="অনুমোদিত" && filter==="সব")?"bg-black text-white":"bg-white"}`}>{c}</button>)}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {filtered.map(p=>(
            <div key={p.id} onClick={()=>setSelected(p)} className="bg-white border-2 border-black rounded-[20px] overflow-hidden shadow-[4px_4px_0px_black] cursor-pointer hover:translate-y-[-2px] transition">
              <div className="bg-gray-100 h-44 flex items-center justify-center relative overflow-hidden">
                {p.image?<img src={p.image} className="w-full h-full object-cover"/>:<span className="font-black text-lg">{p.title}</span>}
                <span className="absolute top-2 left-2 bg-black text-white text-[8px] px-2 py-1 rounded-full">{p.id}</span>
                {approved.find((a:any)=>a.id===p.id) && <span className="absolute top-2 right-2 bg-green-400 text-black text-[8px] px-2 py-1 rounded-full font-black">NEW</span>}
              </div>
              <div className="p-3">
                <div className="font-black truncate">{p.title}</div>
                <div className="flex justify-between mt-1"><span className="font-black">{p.price}৳</span><span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full border">{p.cat}</span></div>
                <button onClick={(e)=>{e.stopPropagation();addToCart(p);}} className="w-full mt-2 bg-black text-white py-2 rounded-full text-xs font-bold">কার্টে যোগ করুন</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="bg-white border-2 border-black rounded-[24px] max-w-md w-full overflow-hidden shadow-[8px_8px_0px_black]" onClick={e=>e.stopPropagation()}>
            <div className="h-64 bg-gray-100 relative">{selected.image?<img src={selected.image} className="w-full h-full object-cover"/>:<div className="flex items-center justify-center h-full font-black text-2xl">{selected.title}</div>}<button onClick={()=>setSelected(null)} className="absolute top-3 right-3 bg-black text-white w-8 h-8 rounded-full font-black">×</button></div>
            <div className="p-5">
              <div className="flex justify-between"><span className="bg-black text-white text-xs px-3 py-1 rounded-full">{selected.id}</span><span className="bg-gray-100 border text-xs px-3 py-1 rounded-full">{selected.cat}</span></div>
              <h2 className="text-2xl font-black mt-3">{selected.title}</h2>
              <p className="text-3xl font-black mt-1">{selected.price}৳</p>
              <p className="text-sm text-gray-600 mt-3 bg-[#fdf6ee] border border-black rounded-xl p-3"><b>বিবরণ:</b> {selected.comment||"কোনো বিবরণ নেই"}</p>
              <p className="text-xs text-gray-500 mt-2">সেলার: {selected.shop||"SHOP-01"}</p>
              <div className="flex gap-2 mt-4"><button onClick={()=>{addToCart(selected);setSelected(null);}} className="flex-1 bg-black text-white py-3 rounded-full font-black">কার্টে যোগ করুন</button><button onClick={()=>setSelected(null)} className="flex-1 border-2 border-black py-3 rounded-full font-bold">বন্ধ করুন</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
