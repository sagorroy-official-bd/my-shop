"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [backup,setBackup]=useState<any[]>([]);
  useEffect(()=>{setBackup(JSON.parse(localStorage.getItem("gausia_admin_backup")||"[]"))},[]);
  const save=(up:any[])=>{setBackup(up);localStorage.setItem("gausia_admin_backup",JSON.stringify(up));};
  const updateAdmin=(id:string,field:string,value:string)=>{
    const up=backup.map(p=>p.id===id?{...p,adminEditedData:{...p.adminEditedData,[field]:value}}:p);
    save(up);
  };
  const approveToCustomer=(id:string)=>{
    const item=backup.find(p=>p.id===id);
    if(!item) return;
    const customerProducts=JSON.parse(localStorage.getItem("gausia_customer_final")||"[]");
    const finalData={...item.adminEditedData,id:item.id,shop:item.shop,approveStatus:"approved",originalSellerNote:item.originalSellerData.comment};
    const exists=customerProducts.find((p:any)=>p.id===id);
    const newCustomer=exists?customerProducts.map((p:any)=>p.id===id?finalData:p):[finalData,...customerProducts];
    localStorage.setItem("gausia_customer_final",JSON.stringify(newCustomer));
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    localStorage.setItem("gausia_all_products",JSON.stringify(all.map((p:any)=>p.id===id?{...p,approveStatus:"approved"}:p)));
    const up=backup.map(p=>p.id===id?{...p,adminStatus:"approved"}:p);
    save(up);
    alert("কাস্টমার পেজে Approve হয়েছে!");
  };
  const reject=(id:string)=>{save(backup.map(p=>p.id===id?{...p,adminStatus:"rejected"}:p));};
  const deleteAdmin=(id:string)=>{if(!confirm("এডমিন থেকেও ডিলিট করবেন?"))return;save(backup.filter(p=>p.id!==id));};

  return(
    <div className="min-h-screen bg-white p-4 font-sans">
      <h1 className="text-3xl font-black">ADMIN PANEL - MASTER CONTROL</h1>
      <p className="mt-2 bg-black text-white inline-block px-4 py-1 rounded-full text-sm">মোট সেলার সাবমিশন: {backup.length} | Approved: {backup.filter(p=>p.adminStatus==="approved").length}</p>
      <p className="mt-2 text-sm text-gray-600">এখানে সেলার ডিলিট করলেও তথ্য থেকে যাবে। আপনি এডিট করে কাস্টমার পেজে পাঠাবেন।</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {backup.map(p=>(
          <div key={p.id} className="border-2 border-black rounded-[20px] p-4 shadow-[5px_5px_0px_black]">
            <div className="flex justify-between text-[10px]"><span className="bg-gray-100 border px-2 py-1 rounded-full">{p.id} | {p.shop}</span><span className={`px-2 py-1 rounded-full font-black ${p.adminStatus==="approved"?"bg-green-300":"bg-yellow-200"}`}>{p.adminStatus}</span></div>
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#fff7e6] border-2 border-dashed border-black rounded-xl p-3">
                <div className="font-black text-xs bg-black text-white inline-block px-2 py-1 rounded-full">SELLER এর তথ্য (অরিজিনাল)</div>
                {p.originalSellerData.image && <img src={p.originalSellerData.image} className="w-full h-24 object-cover rounded-lg mt-2"/>}
                <div className="text-sm mt-2"><b>নাম:</b> {p.originalSellerData.title}</div>
                <div className="text-sm"><b>দাম:</b> {p.originalSellerData.price}৳</div>
                <div className="text-sm"><b>ক্যাটাগরি:</b> {p.originalSellerData.cat}</div>
                <div className="text-xs mt-1 text-gray-600"><b>মন্তব্য:</b> {p.originalSellerData.comment||"নাই"}</div>
              </div>

              <div className="bg-[#e6fffa] border-2 border-black rounded-xl p-3">
                <div className="font-black text-xs bg-green-700 text-white inline-block px-2 py-1 rounded-full">ADMIN এডিট (কাস্টমার দেখবে)</div>
                <input value={p.adminEditedData.title} onChange={e=>updateAdmin(p.id,"title",e.target.value)} className="w-full mt-2 border border-black rounded-lg p-2 text-sm" placeholder="নাম এডিট"/>
                <input value={p.adminEditedData.price} onChange={e=>updateAdmin(p.id,"price",e.target.value)} className="w-full mt-2 border border-black rounded-lg p-2 text-sm" placeholder="দাম এডিট"/>
                <input value={p.adminEditedData.cat} onChange={e=>updateAdmin(p.id,"cat",e.target.value)} className="w-full mt-2 border border-black rounded-lg p-2 text-sm" placeholder="ক্যাটাগরি"/>
                <textarea value={p.adminEditedData.comment} onChange={e=>updateAdmin(p.id,"comment",e.target.value)} className="w-full mt-2 border border-black rounded-lg p-2 text-sm h-16" placeholder="নতুন বিবরণ লিখুন"/>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={()=>approveToCustomer(p.id)} className="flex-1 bg-green-600 text-white py-2 rounded-full font-black">✓ Approve to Customer Page</button>
              <button onClick={()=>reject(p.id)} className="flex-1 bg-orange-500 text-white py-2 rounded-full font-bold">Reject</button>
              <button onClick={()=>deleteAdmin(p.id)} className="bg-black text-white px-4 py-2 rounded-full text-xs">Delete Permanent</button>
            </div>
          </div>
        ))}
      </div>
      {backup.length===0 && <div className="text-center mt-20 text-gray-500">কোনো সেলার তথ্য নেই</div>}
    </div>
  )
}
