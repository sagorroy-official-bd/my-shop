"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [backup,setBackup]=useState<any[]>([]);
  const [selected,setSelected]=useState<string[]>([]);
  useEffect(()=>{
    const b=JSON.parse(localStorage.getItem("gausia_admin_backup")||"[]");
    setBackup(b);
  },[]);
  const save=(up:any[])=>{
    setBackup(up);
    localStorage.setItem("gausia_admin_backup",JSON.stringify(up));
    const approved=up.filter((x:any)=>x.adminStatus==="approved" && x.adminEditedData && !x.adminEditedData.deleted).map((x:any)=>x.adminEditedData);
    localStorage.setItem("gausia_customer_final",JSON.stringify(approved));
  };
  const update=(id:string,field:string,value:string)=>save(backup.map(p=>p.id===id?{...p,adminEditedData:{...p.adminEditedData,[field]:value}}:p));
  const approve=(id:string)=>{save(backup.map(p=>p.id===id?{...p,adminStatus:"approved"}:p));alert("Approved!");};
  
  // আপনার চাওয়া অনুযায়ী - Reject = Individual Delete
  const rejectIndividual=(id:string)=>{
    if(!confirm("এই পণ্যটা Individual Delete (Reject) করবেন?"))return;
    save(backup.filter(p=>p.id!==id));
  };
  // Delete All = পুরো পেজ ডিলিট
  const deleteAllSingle=(id:string)=>{
    if(!confirm("পুরো পণ্যটা পার্মানেন্ট ডিলিট করবেন?"))return;
    save(backup.filter(p=>p.id!==id));
  };
  const deleteOriginal=(id:string)=>{if(!confirm("Seller Original ডিলিট?"))return;save(backup.map(p=>p.id===id?{...p,originalSellerData:{...p.originalSellerData,deleted:true}}:p));};
  const deleteEdited=(id:string)=>{if(!confirm("Admin Edit ডিলিট?"))return;save(backup.map(p=>p.id===id?{...p,adminEditedData:{...p.adminEditedData,deleted:true}}:p));};

  const toggleMark=(id:string)=>{setSelected(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);};
  const deleteMarked=()=>{if(selected.length===0) return alert("কোনো পণ্য মার্ক করেননি"); if(!confirm(`${selected.length} টি পণ্য মার্ক করা - ডিলিট করবেন?`))return; save(backup.filter(p=>!selected.includes(p.id))); setSelected([]);};
  const markAll=()=>{if(selected.length===backup.length) setSelected([]); else setSelected(backup.map(p=>p.id));};

  return(
    <div className="min-h-screen bg-gradient-to-br from-[#fef9f0] to-[#fff4e6] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER - STANDARD PREMIUM */}
        <div className="bg-white border-2 border-black rounded-[20px] p-4 flex flex-wrap justify-between items-center shadow-[6px_6px_0px_black]">
          <div>
            <h1 className="text-2xl font-black text-black">ADMIN PANEL <span className="bg-amber-400 border-2 border-black px-3 py-1 rounded-full text-sm">GAUSIA</span></h1>
            <p className="text-xs font-bold text-gray-600 mt-1">Remark + Mark Delete + Individual Delete (Reject) + Delete All</p>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="flex items-center gap-2 bg-white border-2 border-black px-3 py-2 rounded-full text-xs font-black cursor-pointer"><input type="checkbox" checked={selected.length===backup.length && backup.length>0} onChange={markAll}/> Mark All</label>
            <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-black">মোট: {backup.length}</div>
            <button onClick={deleteMarked} className="bg-red-500 border-2 border-black text-white px-4 py-2 rounded-full text-xs font-black shadow-[3px_3px_0px_black]">🗑️ মার্ক করা ডিলিট ({selected.length})</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {backup.map(p=>(
            <div key={p.id} className={`bg-white border-[3px] border-black rounded-[22px] p-4 shadow-[6px_6px_0px_black] ${selected.includes(p.id)?"ring-4 ring-amber-400":""}`}>
              <div className="flex justify-between items-center mb-3">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={selected.includes(p.id)} onChange={()=>toggleMark(p.id)} className="w-5 h-5"/><span className="font-black text-sm">🏪 {p.shopInfo?.name||"SHOP-01"} <span className="bg-black text-white text-[9px] px-2 py-1 rounded-full">{p.id}</span></span></label>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full border-2 border-black ${p.adminStatus==="approved"?"bg-green-300":"bg-yellow-200"}`}>{p.adminStatus}</span>
              </div>
              <div className="text-[11px] text-gray-600 mb-3">📍 {p.shopInfo?.address} | 📞 {p.shopInfo?.phone}</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border-2 border-dashed border-black rounded-xl p-2 bg-[#fffef5]">
                  <div className="flex justify-between"><span className="text-[9px] font-black bg-black text-white px-2 py-1 rounded-full">SELLER ORIGINAL</span><button onClick={()=>deleteOriginal(p.id)} className="text-[8px] bg-white border border-black px-2 rounded-full">Del Org</button></div>
                  {p.originalSellerData?.deleted ? <div className="h-28 flex items-center justify-center text-gray-400 text-xs">Deleted</div> : <>
                    {p.originalSellerData?.image && <img src={p.originalSellerData.image} className="w-full h-28 object-cover rounded-lg mt-2 border-2 border-black"/>}
                    <div className="font-bold text-sm mt-1">{p.originalSellerData?.title} - {p.originalSellerData?.price}৳</div><div className="text-[11px] bg-white border p-1 rounded mt-1">{p.originalSellerData?.comment}</div>
                  </>}
                </div>
                <div className="border-2 border-black rounded-xl p-2 bg-amber-50">
                  <div className="flex justify-between"><span className="text-[9px] font-black bg-amber-400 border border-black px-2 py-1 rounded-full">ADMIN EDIT</span><button onClick={()=>deleteEdited(p.id)} className="text-[8px] bg-black text-white px-2 rounded-full">Del Edit</button></div>
                  <input value={p.adminEditedData?.title||""} onChange={e=>update(p.id,"title",e.target.value)} className="w-full mt-2 border-2 border-black rounded-lg p-1.5 text-xs font-bold" placeholder="নাম"/>
                  <input value={p.adminEditedData?.price||""} onChange={e=>update(p.id,"price",e.target.value)} className="w-full mt-1 border-2 border-black rounded-lg p-1.5 text-xs" placeholder="দাম"/>
                  <textarea value={p.adminEditedData?.comment||""} onChange={e=>update(p.id,"comment",e.target.value)} className="w-full mt-1 border-2 border-black rounded-lg p-1.5 text-xs h-10" placeholder="বিবরণ"/>
                  {/* REMARK OPTION - আপনার চাওয়া */}
                  <input value={p.adminEditedData?.remark||""} onChange={e=>update(p.id,"remark",e.target.value)} className="w-full mt-2 border-2 border-red-400 bg-red-50 rounded-lg p-1.5 text-xs font-bold" placeholder="📝 Remark লিখুন - যেমন: রিজেক্ট কারণ"/>
                  {p.adminEditedData?.image && <img src={p.adminEditedData.image} className="w-full h-12 object-cover rounded mt-1 border"/>}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={()=>approve(p.id)} className="flex-1 bg-amber-400 border-2 border-black text-black py-2.5 rounded-full font-black text-xs shadow-[3px_3px_0px_black]">✓ Approve to Customer</button>
                <button onClick={()=>rejectIndividual(p.id)} className="flex-1 bg-white border-2 border-black text-black py-2.5 rounded-full font-black text-xs hover:bg-red-50">Reject (Individual Delete)</button>
                <button onClick={()=>deleteAllSingle(p.id)} className="bg-red-500 border-2 border-black text-white px-4 py-2.5 rounded-full font-black text-xs shadow-[3px_3px_0px_black]">Delete All</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
