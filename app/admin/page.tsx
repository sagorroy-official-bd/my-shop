"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [backup,setBackup]=useState<any[]>([]);
  useEffect(()=>{
    let b=JSON.parse(localStorage.getItem("gausia_admin_backup")||"[]");
    const old=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    if(b.length===0 && old.length>0){
      b=old.map((p:any)=>({id:p.id,shop:p.shop||"SHOP-01",originalSellerData:p,adminEditedData:{...p},adminStatus:p.approveStatus||"pending"}));
      localStorage.setItem("gausia_admin_backup",JSON.stringify(b));
    }
    setBackup(b);
  },[]);
  const save=(up:any[])=>{setBackup(up);localStorage.setItem("gausia_admin_backup",JSON.stringify(up));localStorage.setItem("gausia_customer_final",JSON.stringify(up.filter((x:any)=>x.adminStatus==="approved").map((x:any)=>x.adminEditedData)));};
  const update=(id:string,field:string,value:string)=>{save(backup.map(p=>p.id===id?{...p,adminEditedData:{...p.adminEditedData,[field]:value}}:p));};
  const approve=(id:string)=>{save(backup.map(p=>p.id===id?{...p,adminStatus:"approved"}:p));alert("Approved! এখন Customer Page এ দেখুন");};
  const reject=(id:string)=>save(backup.map(p=>p.id===id?{...p,adminStatus:"rejected"}:p));
  return(
    <div className="min-h-screen bg-white p-4 font-sans">
      <h1 className="text-3xl font-black">ADMIN PANEL</h1><div className="mt-2 bg-black text-white inline-block px-4 py-1 rounded-full text-sm">মোট: {backup.length} | Approved: {backup.filter(p=>p.adminStatus==="approved").length}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {backup.map(p=>(
          <div key={p.id} className="border-2 border-black rounded-[20px] p-4 shadow-[5px_5px_0px_black]">
            <div className="flex justify-between text-[10px]"><span className="bg-gray-100 border px-2 py-1 rounded-full">{p.id}</span><span className={`px-2 py-1 rounded-full font-black ${p.adminStatus==="approved"?"bg-green-300":"bg-yellow-200"}`}>{p.adminStatus}</span></div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#fff7e6] border-2 border-dashed border-black rounded-xl p-3">
                <div className="text-[10px] font-black bg-black text-white px-2 py-1 rounded-full">SELLER ORIGINAL</div>
                {p.originalSellerData.image && <img src={p.originalSellerData.image} className="w-full h-24 object-cover rounded mt-2"/>}
                <div className="text-sm mt-2 font-bold">{p.originalSellerData.title} - {p.originalSellerData.price}৳</div><div className="text-xs">{p.originalSellerData.cat}</div><div className="text-xs text-gray-600">{p.originalSellerData.comment}</div>
              </div>
              <div className="bg-[#e6fffa] border-2 border-black rounded-xl p-3">
                <div className="text-[10px] font-black bg-green-700 text-white px-2 py-1 rounded-full">ADMIN EDIT (এডিট করে Approve করবেন)</div>
                <input value={p.adminEditedData.title} onChange={e=>update(p.id,"title",e.target.value)} className="w-full mt-2 border border-black rounded p-2 text-sm" placeholder="নাম এডিট"/>
                <input value={p.adminEditedData.price} onChange={e=>update(p.id,"price",e.target.value)} className="w-full mt-2 border border-black rounded p-2 text-sm" placeholder="দাম এডিট"/>
                <input value={p.adminEditedData.cat} onChange={e=>update(p.id,"cat",e.target.value)} className="w-full mt-2 border border-black rounded p-2 text-sm" placeholder="ক্যাটাগরি"/>
                <textarea value={p.adminEditedData.comment} onChange={e=>update(p.id,"comment",e.target.value)} className="w-full mt-2 border border-black rounded p-2 text-sm h-16" placeholder="নতুন বিবরণ"/>
                {p.adminEditedData.image && <img src={p.adminEditedData.image} className="w-full h-16 object-cover rounded mt-2"/>}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={()=>approve(p.id)} className="flex-1 bg-green-600 text-white py-3 rounded-full font-black text-lg">✓ Approve to Customer</button>
              <button onClick={()=>reject(p.id)} className="flex-1 bg-orange-500 text-white py-3 rounded-full font-bold">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
