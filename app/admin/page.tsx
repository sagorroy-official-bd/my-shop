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
    if(b.length>0){
      b=b.map((p:any)=>({...p,shopInfo:p.shopInfo||shopProfile||p.shopInfo,originalSellerData:p.originalSellerData||p,adminEditedData:p.adminEditedData||p}));
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
  const approve=(id:string)=>{save(backup.map(p=>p.id===id?{...p,adminStatus:"approved"}:p));alert("✓ Approved! ২টা তথ্যই সংরক্ষিত থাকবে");};
  const reject=(id:string)=>save(backup.map(p=>p.id===id?{...p,adminStatus:"rejected"}:p));
  const deleteOriginal=(id:string)=>{if(!confirm("Seller Original ডিলিট?"))return;save(backup.map(p=>p.id===id?{...p,originalSellerData:{...p.originalSellerData,deleted:true}}:p));};
  const deleteEdited=(id:string)=>{if(!confirm("Admin Edited ডিলিট?"))return;save(backup.map(p=>p.id===id?{...p,adminEditedData:{...p.adminEditedData,deleted:true}}:p));};
  const deleteAll=(id:string)=>{if(!confirm("পুরোটা পার্মানেন্ট ডিলিট?"))return;save(backup.filter(p=>p.id!==id));};

  return(
    <div className="min-h-screen bg-[#0a0a0a] p-3 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* HEADER - BLACK GOLD */}
        <div className="bg-black border-[3px] border-yellow-400 rounded-[20px] p-5 shadow-[6px_6px_0px_#facc15] flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white tracking-wider">ADMIN PANEL</h1>
            <p className="text-yellow-300 text-xs mt-1 font-bold">● SELLER তথ্য + ADMIN তথ্য = ২টাই সংরক্ষিত | দোকান অনুযায়ী আলাদা</p>
          </div>
          <div className="text-right">
            <div className="bg-white text-black px-5 py-2 rounded-full text-sm font-black border-2 border-yellow-400">মোট: {backup.length}</div>
            <div className="bg-yellow-400 text-black px-5 py-1 rounded-full text-xs font-black mt-2 border-2 border-white">Approved: {backup.filter(p=>p.adminStatus==="approved").length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {backup.map(p=>(
            <div key={p.id} className="bg-[#1a1a1a] border-[3px] border-white rounded-[24px] p-4 shadow-[8px_8px_0px_#facc15] hover:shadow-[10px_10px_0px_#facc15] transition-all">
              {/* SHOP INFO - BLACK GOLD */}
              <div className="bg-black border-2 border-yellow-400 rounded-[14px] p-3 flex justify-between items-center">
                <div>
                  <div className="text-white font-black text-sm">🏪 {p.shopInfo?.name||"SHOP-01"} <span className="bg-yellow-400 text-black text-[9px] px-2 py-1 rounded-full ml-2">{p.id}</span></div>
                  <div className="text-gray-300 text-[11px] mt-1">📍 {p.shopInfo?.address} | 📞 {p.shopInfo?.phone}</div>
                </div>
                <span className={`px-3 py-1 rounded-full font-black text-[10px] border-2 border-white ${p.adminStatus==="approved"?"bg-green-400 text-black":"bg-yellow-400 text-black"}`}>{p.adminStatus.toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {/* SELLER ORIGINAL - BLACK THEME */}
                <div className="bg-white border-[2px] border-black rounded-[16px] p-3">
                  <div className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full flex justify-between items-center">SELLER ORIGINAL <button onClick={()=>deleteOriginal(p.id)} className="bg-red-600 text-white px-2 py-0.5 rounded-full text-[8px] border border-white">DEL</button></div>
                  {p.originalSellerData?.deleted ? <div className="h-36 flex items-center justify-center text-red-600 font-black text-xs mt-2 bg-red-50 rounded-xl border-2 border-dashed border-red-400">Original Deleted</div> : <>
                    {p.originalSellerData?.image && <img src={p.originalSellerData.image} className="w-full h-28 object-cover rounded-xl mt-2 border-2 border-black"/>}
                    <div className="mt-2"><div className="font-black text-sm text-black">{p.originalSellerData?.title}</div><div className="text-xs font-bold text-gray-700">{p.originalSellerData?.price}৳ | {p.originalSellerData?.cat}</div><div className="text-[11px] mt-2 bg-black text-white p-2 rounded-lg">{p.originalSellerData?.comment||"মন্তব্য নেই"}</div></div>
                  </>}
                </div>

                {/* ADMIN EDIT - GOLD BLACK */}
                <div className="bg-[#fffbeb] border-[2px] border-yellow-400 rounded-[16px] p-3">
                  <div className="bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-full flex justify-between items-center border-2 border-black">ADMIN EDIT <button onClick={()=>deleteEdited(p.id)} className="bg-black text-yellow-400 px-2 py-0.5 rounded-full text-[8px] border">DEL</button></div>
                  {p.adminEditedData?.deleted ? <div className="h-36 flex items-center justify-center text-red-600 font-black text-xs mt-2 bg-red-50 rounded-xl border-2 border-dashed border-red-400">Edited Deleted</div> : <>
                    <input value={p.adminEditedData?.title||""} onChange={e=>update(p.id,"title",e.target.value)} className="w-full mt-2 bg-black text-white border-2 border-yellow-400 rounded-lg p-2 text-xs font-bold" placeholder="নাম এডিট"/>
                    <input value={p.adminEditedData?.price||""} onChange={e=>update(p.id,"price",e.target.value)} className="w-full mt-2 bg-white border-2 border-black rounded-lg p-2 text-xs font-bold" placeholder="দাম"/>
                    <input value={p.adminEditedData?.cat||""} onChange={e=>update(p.id,"cat",e.target.value)} className="w-full mt-2 bg-white border-2 border-black rounded-lg p-2 text-xs" placeholder="ক্যাটাগরি"/>
                    <textarea value={p.adminEditedData?.comment||""} onChange={e=>update(p.id,"comment",e.target.value)} className="w-full mt-2 bg-white border-2 border-black rounded-lg p-2 text-xs h-14" placeholder="Admin নতুন বিবরণ"/>
                    {p.adminEditedData?.image && <img src={p.adminEditedData.image} className="w-full h-14 object-cover rounded-lg mt-2 border-2 border-black"/>}
                  </>}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={()=>approve(p.id)} className="flex-1 bg-yellow-400 border-2 border-white text-black py-3 rounded-full font-black text-sm shadow-[3px_3px_0px_white] hover:shadow-[4px_4px_0px_white]">✓ APPROVE TO CUSTOMER</button>
                <button onClick={()=>reject(p.id)} className="flex-1 bg-[#2a2a2a] border-2 border-white text-white py-3 rounded-full font-bold text-sm">Reject</button>
                <button onClick={()=>deleteAll(p.id)} className="bg-red-600 border-2 border-white text-white px-4 rounded-full text-xs font-black">DELETE ALL</button>
              </div>
            </div>
          ))}
        </div>

        {backup.length===0 && <div className="text-center mt-24"><div className="text-7xl">🖤</div><p className="text-white font-black mt-4 text-xl">কোনো পণ্য নেই</p><p className="text-yellow-300 text-sm">Seller থেকে আপলোড করুন</p></div>}
      </div>
    </div>
  )
}
