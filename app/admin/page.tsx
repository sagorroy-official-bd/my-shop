"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [backup,setBackup]=useState<any[]>([]);
  useEffect(()=>{
    let b=JSON.parse(localStorage.getItem("gausia_admin_backup")||"[]");
    const old=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const shopProfile=JSON.parse(localStorage.getItem("gausia_shop_profile")||"null");
    if(b.length===0 && old.length>0){
      b=old.map((p:any)=>({
        id:p.id,shop:p.shop||"SHOP-01",shopInfo:p.shopInfo||shopProfile||{name:"SHOP-01",address:"গাউছিয়া মার্কেট",phone:"017XXXXXXXX"},
        originalSellerData:p,adminEditedData:{...p},adminStatus:p.approveStatus||"pending"
      }));
      localStorage.setItem("gausia_admin_backup",JSON.stringify(b));
    }
    setBackup(b);
  },[]);
  const save=(up:any[])=>{
    setBackup(up);
    localStorage.setItem("gausia_admin_backup",JSON.stringify(up));
    const approved=up.filter((x:any)=>x.adminStatus==="approved" && x.adminEditedData && !x.adminEditedData.deleted).map((x:any)=>x.adminEditedData);
    localStorage.setItem("gausia_customer_final",JSON.stringify(approved));
  };
  const update=(id:string,field:string,value:string)=>save(backup.map(p=>p.id===id?{...p,adminEditedData:{...p.adminEditedData,[field]:value}}:p));
  const approve=(id:string)=>{save(backup.map(p=>p.id===id?{...p,adminStatus:"approved"}:p));};
  const reject=(id:string)=>save(backup.map(p=>p.id===id?{...p,adminStatus:"rejected"}:p));
  const deleteOriginal=(id:string)=>{if(!confirm("Seller Original ডিলিট?"))return;save(backup.map(p=>p.id===id?{...p,originalSellerData:{...p.originalSellerData,deleted:true}}:p));};
  const deleteEdited=(id:string)=>{if(!confirm("Admin Edited ডিলিট?"))return;save(backup.map(p=>p.id===id?{...p,adminEditedData:{...p.adminEditedData,deleted:true}}:p));};
  const deleteAll=(id:string)=>{if(!confirm("পুরোটা ডিলিট?"))return;save(backup.filter(p=>p.id!==id));};

  return(
    <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* HEADER STANDARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ADMIN PANEL</h1>
            <p className="text-gray-500 text-xs mt-1">SELLER তথ্য + ADMIN তথ্য | ২টাই সংরক্ষিত | দোকান অনুযায়ী আলাদা</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold">মোট: {backup.length}</div>
            <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full text-xs font-bold">Approved: {backup.filter(p=>p.adminStatus==="approved").length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          {backup.map(p=>(
            <div key={p.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              {/* SHOP INFO - LIGHT STANDARD */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-900 text-sm flex items-center gap-2">🏬 {p.shopInfo?.name} <span className="bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full">{p.id}</span></div>
                  <div className="text-gray-500 text-[11px] mt-1">📍 {p.shopInfo?.address} | 📞 {p.shopInfo?.phone}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${p.adminStatus==="approved"?"bg-green-100 text-green-700 border-green-200":"bg-amber-100 text-amber-700 border-amber-200"}`}>{p.adminStatus}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white border border-gray-200 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-bold bg-gray-900 text-white px-2 py-1 rounded-full">SELLER ORIGINAL</span><button onClick={()=>deleteOriginal(p.id)} className="text-[9px] bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded-full">Delete</button></div>
                  {p.originalSellerData?.deleted ? <div className="h-32 flex items-center justify-center text-gray-400 text-xs border border-dashed rounded-xl">Deleted</div> : <>
                    {p.originalSellerData?.image && <img src={p.originalSellerData.image} className="w-full h-28 object-cover rounded-lg border border-gray-100"/>}
                    <div className="mt-2 text-sm font-semibold text-gray-900">{p.originalSellerData?.title}</div><div className="text-xs text-gray-600">{p.originalSellerData?.price}৳ • {p.originalSellerData?.cat}</div><div className="text-[11px] mt-2 bg-gray-50 border border-gray-100 p-2 rounded-lg text-gray-700">{p.originalSellerData?.comment||"মন্তব্য নেই"}</div>
                  </>}
                </div>
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3">
                  <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-1 rounded-full">ADMIN EDIT</span><button onClick={()=>deleteEdited(p.id)} className="text-[9px] bg-white text-red-600 border px-2 py-1 rounded-full">Delete</button></div>
                  {p.adminEditedData?.deleted ? <div className="h-32 flex items-center justify-center text-gray-400 text-xs border border-dashed rounded-xl">Deleted</div> : <>
                    <input value={p.adminEditedData?.title||""} onChange={e=>update(p.id,"title",e.target.value)} className="w-full mt-2 border border-gray-200 rounded-lg p-2 text-xs bg-white" placeholder="নাম"/>
                    <input value={p.adminEditedData?.price||""} onChange={e=>update(p.id,"price",e.target.value)} className="w-full mt-2 border border-gray-200 rounded-lg p-2 text-xs bg-white" placeholder="দাম"/>
                    <input value={p.adminEditedData?.cat||""} onChange={e=>update(p.id,"cat",e.target.value)} className="w-full mt-2 border border-gray-200 rounded-lg p-2 text-xs bg-white" placeholder="ক্যাটাগরি"/>
                    <textarea value={p.adminEditedData?.comment||""} onChange={e=>update(p.id,"comment",e.target.value)} className="w-full mt-2 border border-gray-200 rounded-lg p-2 text-xs h-14 bg-white" placeholder="বিবরণ"/>
                    {p.adminEditedData?.image && <img src={p.adminEditedData.image} className="w-full h-12 object-cover rounded-lg mt-2 border"/>}
                  </>}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={()=>approve(p.id)} className="flex-1 bg-gray-900 text-white py-2.5 rounded-full font-bold text-xs hover:bg-black">✓ Approve to Customer</button>
                <button onClick={()=>reject(p.id)} className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-full font-bold text-xs">Reject</button>
                <button onClick={()=>deleteAll(p.id)} className="bg-red-50 border border-red-200 text-red-600 px-4 rounded-full text-xs font-bold">Delete All</button>
              </div>
            </div>
          ))}
        </div>
        {backup.length===0 && <div className="text-center mt-20 text-gray-500">কোনো পণ্য নেই</div>}
      </div>
    </div>
  )
}
