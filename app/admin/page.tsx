"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [backup,setBackup]=useState<any[]>([]);
  useEffect(()=>{
    // অটো মাইগ্রেশন: পুরনো ডাটা থাকলে নতুন সিস্টেমে নিয়ে আসবে
    let b = JSON.parse(localStorage.getItem("gausia_admin_backup")||"[]");
    const old = JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    if(b.length===0 && old.length>0){
      b = old.map((p:any)=>({
        id:p.id, shop:p.shop||"SHOP-01", createdAt:new Date().toLocaleString(),
        originalSellerData:p,
        adminEditedData:{...p},
        adminStatus: p.approveStatus==="approved"?"approved":"pending"
      }));
      localStorage.setItem("gausia_admin_backup",JSON.stringify(b));
    }
    setBackup(b);
  },[]);
  const save=(up:any[])=>{setBackup(up);localStorage.setItem("gausia_admin_backup",JSON.stringify(up));};
  const updateAdmin=(id:string,field:string,value:string)=>{save(backup.map(p=>p.id===id?{...p,adminEditedData:{...p.adminEditedData,[field]:value}}:p));};
  const approve=(id:string)=>{
    const item=backup.find(p=>p.id===id);
    const customer=JSON.parse(localStorage.getItem("gausia_customer_final")||"[]");
    const finalData={...item.adminEditedData, id:item.id, approveStatus:"approved"};
    const newCustomer=customer.find((x:any)=>x.id===id)?customer.map((x:any)=>x.id===id?finalData:x):[finalData,...customer];
    localStorage.setItem("gausia_customer_final",JSON.stringify(newCustomer));
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    localStorage.setItem("gausia_all_products",JSON.stringify(all.map((x:any)=>x.id===id?{...x,approveStatus:"approved"}:x)));
    save(backup.map(p=>p.id===id?{...p,adminStatus:"approved"}:p));
    alert("Customer Page এ চলে গেছে!");
  };
  const reject=(id:string)=>save(backup.map(p=>p.id===id?{...p,adminStatus:"rejected"}:p));
  const del=(id:string)=>{if(!confirm("Admin থেকে ডিলিট? Seller ডিলিট করলেও এখানে থাকবে, এটা পার্মানেন্ট ডিলিট"))return;save(backup.filter(p=>p.id!==id));};

  return(
    <div className="min-h-screen bg-white p-4 font-sans">
      <h1 className="text-3xl font-black">ADMIN PANEL - MASTER CONTROL</h1>
      <div className="mt-2 bg-black text-white inline-block px-4 py-1 rounded-full text-sm">মোট: {backup.length} | Approved: {backup.filter(p=>p.adminStatus==="approved").length}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {backup.map(p=>(
          <div key={p.id} className="border-2 border-black rounded-[20px] p-4 shadow-[5px_5px_0px_black]">
            <div className="flex justify-between text-[10px]"><span className="bg-gray-100 border px-2 py-1 rounded-full">{p.id}</span><span className={`px-2 py-1 rounded-full font-black ${p.adminStatus==="approved"?"bg-green-300":"bg-yellow-200"}`}>{p.adminStatus}</span></div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#fff7e6] border-2 border-dashed border-black rounded-xl p-3">
                <div className="text-[10px] font-black bg-black text-white px-2 py-1 rounded-full">SELLER ORIGINAL</div>
                {p.originalSellerData.image && <img src={p.originalSellerData.image} className="w-full h-24 object-cover rounded mt-2"/>}
                <div className="text-sm mt-2 font-bold">{p.originalSellerData.title} - {p.originalSellerData.price}৳</div>
                <div className="text-xs">{p.originalSellerData.cat}</div><div className="text-xs text-gray-600 mt-1">{p.originalSellerData.comment}</div>
              </div>
              <div className="bg-[#e6fffa] border-2 border-black rounded-xl p-3">
                <div className="text-[10px] font-black bg-green-700 text-white px-2 py-1 rounded-full">ADMIN EDIT (Customer দেখবে)</div>
                <input value={p.adminEditedData.title} onChange={e=>updateAdmin(p.id,"title",e.target.value)} className="w-full mt-2 border border-black rounded p-2 text-sm"/>
                <input value={p.adminEditedData.price} onChange={e=>updateAdmin(p.id,"price",e.target.value)} className="w-full mt-2 border border-black rounded p-2 text-sm"/>
                <textarea value={p.adminEditedData.comment} onChange={e=>updateAdmin(p.id,"comment",e.target.value)} className="w-full mt-2 border border-black rounded p-2 text-sm h-16"/>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={()=>approve(p.id)} className="flex-1 bg-green-600 text-white py-2 rounded-full font-black">✓ Approve to Customer</button>
              <button onClick={()=>reject(p.id)} className="flex-1 bg-orange-500 text-white py-2 rounded-full font-bold">Reject</button>
              <button onClick={()=>del(p.id)} className="bg-black text-white px-3 rounded-full text-xs">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {backup.length===0 && <div className="text-center mt-20">কোনো তথ্য নেই - Seller থেকে আপলোড করুন</div>}
    </div>
  )
}
