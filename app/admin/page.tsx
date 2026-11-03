"use client";
import { useState, useEffect } from "react";
export default function AdminPage(){
  const [ok,setOk]=useState(false); 
  const [pass,setPass]=useState(""); 
  const [seller,setSeller]=useState<any[]>([]); 
  const [edited,setEdited]=useState<any[]>([]); 
  const [editItem,setEditItem]=useState<any>(null); 
  const [review,setReview]=useState<any>(null);

  useEffect(()=>{
    if(localStorage.getItem("gausia_admin_ok")==="yes") setOk(true);
    setSeller(JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]"));
    setEdited(JSON.parse(localStorage.getItem("gausia_admin_edited")||"[]"));
  },[]);

  const save=(up:any)=>{
    setEdited(up);
    localStorage.setItem("gausia_admin_edited",JSON.stringify(up));
  };

  if(!ok){
    return(
      <div className="min-h-screen flex items-center justify-center bg-orange-100">
        <div className="bg-white p-6 rounded-xl border w-80">
          <div className="font-black text-center">GAUSIA ADMIN PANEL - LOGIN 1234</div>
          <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="1234" type="password" className="w-full border px-4 py-2 mt-4 rounded-full"/>
          <button onClick={()=>{ if(pass==="1234"){ localStorage.setItem("gausia_admin_ok","yes"); setOk(true);} }} className="w-full mt-3 bg-black text-white py-2 rounded-full font-bold">Login</button>
        </div>
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-[#f0f0f0] p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-black text-white px-4 py-3 rounded-full font-black flex justify-between items-center">
          <span>GAUSIA ADMIN PANEL - Seller {seller.length} | Edited {edited.length}</span>
          <button onClick={()=>{
            if(confirm("সব ডিলিট করবেন?")){
              localStorage.removeItem("gausia_all_products");
              localStorage.removeItem("gausia_special_banners");
              localStorage.removeItem("gausia_admin_edited");
              alert("Clear Done"); location.reload();
            }
          }} className="bg-red-500 px-3 py-1 rounded-full text-xs">🗑️ Clear All</button>
        </div>

        {editItem && (
          <div className="bg-white border-2 border-black p-4 mt-4 rounded-xl">
            <div className="font-bold">Edit: {editItem.code}</div>
            <input value={editItem.code} onChange={e=>setEditItem({...editItem,code:e.target.value})} className="w-full border-2 border-black rounded-full px-4 py-2 mt-2 font-black bg-yellow-50"/>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input value={editItem.size} onChange={e=>setEditItem({...editItem,size:e.target.value})} placeholder="Size L" className="border rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.quality} onChange={e=>setEditItem({...editItem,quality:e.target.value})} placeholder="Quality" className="border rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.quantity} onChange={e=>setEditItem({...editItem,quantity:e.target.value})} placeholder="Qty 1" className="border rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.comment} onChange={e=>setEditItem({...editItem,comment:e.target.value})} placeholder="Comment Ind" className="border rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.originalPrice} onChange={e=>setEditItem({...editItem,originalPrice:e.target.value})} placeholder="Original Price" className="border rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.discountPercent} onChange={e=>setEditItem({...editItem,discountPercent:e.target.value})} placeholder="Discount %" className="border rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.offerPrice} onChange={e=>setEditItem({...editItem,offerPrice:e.target.value})} placeholder="Offer Price" className="border rounded-full px-3 py-2 text-sm"/>
              <input value={editItem.editedTitle} onChange={e=>setEditItem({...editItem,editedTitle:e.target.value})} placeholder="Title" className="border rounded-full px-3 py-2 text-sm col-span-2"/>
            </div>
            <button onClick={()=>{ const up=edited.map((x:any)=>x.editId===editItem.editId?editItem:x); save(up); setEditItem(null); alert("Saved "+editItem.code); }} className="w-full mt-3 bg-yellow-400 border-2 border-black rounded-full py-2 font-black">💾 Save</button>
            <button onClick={()=>setReview(editItem)} className="w-full mt-2 bg-black text-white rounded-full py-2 font-bold">👁️ Preview + Send</button>
          </div>
        )}

        <div className="mt-4">
          <div className="font-bold text-sm">Seller থেকে আসা ({seller.length})</div>
          <div className="grid md:grid-cols-2 gap-3 mt-2">
            {seller.map((p:any)=>(
              <div key={p.id} className="bg-white border p-3 rounded-xl">
                <img src={p.image} className="w-full h-40 object-cover rounded" alt=""/>
                <div className="text-xs mt-2 font-bold">{p.title} - {p.price}৳</div>
                <button onClick={()=>{
                  const exists=edited.find((x:any)=>x.originalId===p.id);
                  if(exists){ alert("আগেই Edit করেছেন - "+exists.code); setEditItem(exists); return; }
                  const code="CODE-"+String(1001+edited.length).padStart(4,"0");
                  const n={editId:Date.now(),originalId:p.id,code,originalPrice:String(p.price),discountPercent:"25",offerPrice:String(Math.round(parseInt(p.price||"1500")*0.75)),editedTitle:p.title,editedImages:p.images||[p.image],size:"L",quality:"Premium",quantity:"1",comment:"Ind"};
                  const up=[n,...edited]; save(up); setEditItem(n);
                }} className="w-full mt-2 bg-orange-500 text-white rounded-full py-1.5 text-xs font-bold">✏️ Edit - নতুন CODE</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="font-bold text-sm">Edited CODE ({edited.length}) - এখান থেকে Customer এ যাবে</div>
          <div className="grid md:grid-cols-2 gap-3 mt-2">
            {edited.map((p:any)=>(
              <div key={p.editId} className="bg-white border-2 border-black p-3 rounded-xl">
                <div className="text-xs font-bold">{p.code} - {p.editedTitle} - {p.offerPrice}৳ - {p.quantity} পিস</div>
                <img src={p.editedImages?.[0]} className="w-full h-32 object-cover mt-2 border rounded" alt=""/>
                <button onClick={()=>setReview(p)} className="w-full mt-2 bg-black text-white rounded-full py-1.5 text-xs font-bold">👁️ Review + Send</button>
              </div>
            ))}
          </div>
        </div>

        {review && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:12}}>
            <div className="bg-white rounded-xl p-4 w-full max-w-sm border-2 border-black">
              <div className="flex justify-between font-bold"><span>Preview - {review.code}</span><button onClick={()=>setReview(null)} className="bg-red-500 text-white w-7 h-7 rounded-full">X</button></div>
              <img src={review.editedImages?.[0]} className="w-full h-60 object-cover rounded border-2 border-black mt-2" alt=""/>
              <div className="mt-2 text-sm font-bold">{review.code} - {review.editedTitle} - {review.offerPrice}৳</div>
              <div className="text-xs">📏 {review.size} | {review.quantity} পিস | {review.quality} | {review.comment}</div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button onClick={()=>{
                  let all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
                  if(all.find((x:any)=>x.code===review.code)){ alert("এই CODE আগেই আছে - "+review.code); return; }
                  const f={id:Date.now(),code:review.code,title:review.editedTitle,price:parseInt(review.offerPrice),originalPrice:parseInt(review.originalPrice),image:review.editedImages[0],size:review.size,quality:review.quality,quantity:review.quantity,comment:review.comment,discountPercent:parseInt(review.discountPercent)};
                  localStorage.setItem("gausia_all_products",JSON.stringify([f,...all])); alert("✅ Normal এ গেছে - "+f.code); setReview(null);
                }} className="bg-black text-white rounded-full py-2.5 text-xs font-bold">Confirm Normal</button>
                <button onClick={()=>{
                  let b=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
                  let all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
                  if(all.find((x:any)=>x.code===review.code)){ alert("এই CODE আগেই আছে - "+review.code); return; }
                  const f={id:Date.now(),code:review.code,title:review.editedTitle,price:parseInt(review.offerPrice),originalPrice:parseInt(review.originalPrice),image:review.editedImages[0],size:review.size,quality:review.quality,quantity:review.quantity,comment:review.comment,discountPercent:parseInt(review.discountPercent)};
                  localStorage.setItem("gausia_special_banners",JSON.stringify([f,...b].slice(0,12)));
                  localStorage.setItem("gausia_all_products",JSON.stringify([f,...all]));
                  alert("🔥 Special এ গেছে - "+f.code); setReview(null);
                }} className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full py-2.5 text-xs font-bold">🔥 Special</button>
              </div>
              <button onClick={()=>setReview(null)} className="w-full mt-2 border-2 border-black rounded-full py-1.5 text-xs">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
