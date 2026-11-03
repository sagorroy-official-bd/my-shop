"use client";
import { useState, useEffect } from "react";
export default function SellerPage(){
  const [products,setProducts]=useState<any[]>([]);
  const [name,setName]=useState("");const [price,setPrice]=useState("");const [cat,setCat]=useState("মহিলা");const [comment,setComment]=useState("");const [image,setImage]=useState("");const [editId,setEditId]=useState<string|null>(null);const [filter,setFilter]=useState("সব");
  useEffect(()=>{setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]"))},[]);
  const saveAll=(up:any[])=>{setProducts(up);localStorage.setItem("gausia_all_products",JSON.stringify(up));};
  const handleImage=(e:any)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>setImage(r.result as string);r.readAsDataURL(f);};
  const upload=()=>{
    if(!name||!price) return alert("নাম ও দাম দিন");
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const backup=JSON.parse(localStorage.getItem("gausia_admin_backup")||"[]");
    if(editId){
      const updated=all.map((p:any)=>p.id===editId?{...p,title:name,price,cat,comment,image:image||p.image}:p);
      saveAll(updated);
      const bUpdated=backup.map((p:any)=>p.id===editId?{...p,originalSellerData:{title:name,price,cat,comment,image:image||p.image}}:p);
      localStorage.setItem("gausia_admin_backup",JSON.stringify(bUpdated));
      setEditId(null);alert("এডিট সফল!");
    }else{
      const newP={id:`SHOP-01-${String(Date.now()).slice(-4)}`,title:name,price,cat,comment,image,shop:"SHOP-01",approveStatus:"pending"};
      saveAll([newP,...all]);
      const adminCopy={id:newP.id,shop:"SHOP-01",createdAt:new Date().toLocaleString(),originalSellerData:{...newP},adminEditedData:{...newP},adminStatus:"pending"};
      localStorage.setItem("gausia_admin_backup",JSON.stringify([adminCopy,...backup]));
      alert("আপলোড হয়েছে! এডমিন দেখবে");
    }
    setName("");setPrice("");setComment("");setImage("");
  };
  const edit=(p:any)=>{setName(p.title);setPrice(p.price);setCat(p.cat);setComment(p.comment||"");setImage(p.image||"");setEditId(p.id);window.scrollTo(0,0);};
  const del=(id:string)=>{if(!confirm("ডিলিট করবেন? এডমিনের কাছে কপি থেকে যাবে"))return;const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");saveAll(all.filter((p:any)=>p.id!==id));};
  const filtered=products.filter(p=>{if(filter==="সব")return true; if(filter==="পেন্ডিং")return p.approveStatus==="pending"; if(filter==="অনুমোদিত")return p.approveStatus==="approved"; if(filter==="বাতিল")return p.approveStatus==="rejected"; return true;});
  return(
    <div className="min-h-screen bg-[#fdf6ee] p-4 font-sans"><div className="max-w-7xl mx-auto grid lg:grid-cols-[400px_1fr] gap-6">
      <div className="bg-white rounded-[24px] border-2 border-black p-6 h-fit shadow-[6px_6px_0px_black] sticky top-4">
        <h2 className="text-xl font-black">{editId?"এডিট করুন":"নতুন পণ্য আপলোড"}</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="পণ্যের নাম" className="w-full mt-4 border-2 border-black rounded-xl p-3"/>
        <select value={cat} onChange={e=>setCat(e.target.value)} className="w-full mt-3 border-2 border-black rounded-xl p-3"><option>মহিলা</option><option>পুরুষ</option><option>মেয়ে</option><option>ছেলে</option><option>বেবি</option></select>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="দাম" className="w-full mt-3 border-2 border-black rounded-xl p-3"/>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="মন্তব্য / বিবরণ" className="w-full mt-3 border-2 border-black rounded-xl p-3 h-20"></textarea>
        <div className="mt-3 border-2 border-dashed border-black rounded-xl p-3"><input type="file" accept="image/*" onChange={handleImage} className="w-full text-sm"/>{image && <img src={image} className="mt-2 w-full h-32 object-cover rounded-xl"/>}</div>
        <button onClick={upload} className="w-full mt-4 bg-black text-white py-3 rounded-full font-black">{editId?"আপডেট":"আপলোড +"}</button>
        {editId && <button onClick={()=>{setEditId(null);setName("");setPrice("");setComment("");setImage("");}} className="w-full mt-2 border-2 border-black py-2 rounded-full font-bold">বাতিল</button>}
      </div>
      <div>
        <h3 className="text-2xl font-black">আমার আপলোড ({products.length})</h3>
        <div className="flex gap-2 mt-3 flex-wrap">{["সব","পেন্ডিং","অনুমোদিত","বাতিল"].map(f=><button key={f} onClick={()=>setFilter(f)} className={`px-4 py-2 rounded-full border-2 border-black font-bold text-sm ${filter===f?"bg-black text-white":"bg-white"}`}>{f}</button>)}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">{filtered.map(p=><div key={p.id} className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[3px_3px_0px_black]">{p.image?<img src={p.image} className="h-32 w-full object-cover"/>:<div className="bg-gray-100 h-32 flex items-center justify-center font-black">{p.title}</div>}<div className="p-3"><div className="flex justify-between"><span className="text-[9px] bg-black text-white px-2 py-1 rounded-full">{p.id}</span><span className={`text-[9px] px-2 py-1 rounded-full font-bold ${p.approveStatus==="approved"?"bg-green-200":"bg-yellow-200"}`}>{p.approveStatus}</span></div><div className="font-black mt-1 text-sm">{p.title} - {p.price}৳</div><div className="flex gap-1 mt-2"><button onClick={()=>edit(p)} className="flex-1 bg-blue-600 text-white py-1 rounded-full text-xs font-bold">Edit</button><button onClick={()=>del(p.id)} className="flex-1 bg-red-600 text-white py-1 rounded-full text-xs font-bold">Delete</button></div></div></div>)}</div>
      </div>
    </div></div>
  )
}
