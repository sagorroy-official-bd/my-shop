"use client";
import { useState, useEffect } from "react";
export default function SellerPage(){
  const [products,setProducts]=useState<any[]>([]);
  const [name,setName]=useState("");const [price,setPrice]=useState("");const [cat,setCat]=useState("মহিলা");const [comment,setComment]=useState("");const [image,setImage]=useState("");const [editId,setEditId]=useState<string|null>(null);const [filter,setFilter]=useState("সব");
  // দোকানের তথ্য
  const [shopName,setShopName]=useState("");const [shopAddr,setShopAddr]=useState("");const [shopPhone,setShopPhone]=useState("");const [showShopEdit,setShowShopEdit]=useState(false);

  useEffect(()=>{
    setProducts(JSON.parse(localStorage.getItem("gausia_all_products")||"[]"));
    const shop=JSON.parse(localStorage.getItem("gausia_shop_profile")||"null");
    if(shop){setShopName(shop.name);setShopAddr(shop.address);setShopPhone(shop.phone);}
    else{setShowShopEdit(true);}
  },[]);

  const saveShop=()=>{
    if(!shopName||!shopAddr||!shopPhone) return alert("দোকানের নাম, ঠিকানা, ফোন দিন");
    localStorage.setItem("gausia_shop_profile",JSON.stringify({name:shopName,address:shopAddr,phone:shopPhone,id:"SHOP-01"}));
    setShowShopEdit(false);alert("দোকানের তথ্য সেভ হয়েছে, এখন ফিক্সড থাকবে");
  };

  const saveAll=(up:any[])=>{setProducts(up);localStorage.setItem("gausia_all_products",JSON.stringify(up));};
  const handleImage=(e:any)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>setImage(r.result as string);r.readAsDataURL(f);};
  
  const upload=()=>{
    const shop=JSON.parse(localStorage.getItem("gausia_shop_profile")||"{}");
    if(!shop.name) return alert("আগে উপরে দোকানের তথ্য সেভ করুন");
    if(!name||!price) return alert("পণ্যের নাম ও দাম দিন");
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const backup=JSON.parse(localStorage.getItem("gausia_admin_backup")||"[]");
    if(editId){
      const updated=all.map((p:any)=>p.id===editId?{...p,title:name,price,cat,comment,image:image||p.image}:p);
      saveAll(updated);
      const bUpdated=backup.map((p:any)=>p.id===editId?{...p,originalSellerData:{...p.originalSellerData,title:name,price,cat,comment,image:image||p.originalSellerData.image},adminEditedData:{...p.adminEditedData,title:name,price,cat,comment,image:image||p.adminEditedData.image}}:p);
      localStorage.setItem("gausia_admin_backup",JSON.stringify(bUpdated));
      setEditId(null);alert("এডিট সফল!");
    }else{
      const newP={id:`SHOP-01-${String(Date.now()).slice(-4)}`,title:name,price,cat,comment,image,shop:"SHOP-01",shopInfo:shop,approveStatus:"pending"};
      saveAll([newP,...all]);
      const adminCopy={id:newP.id,shop:"SHOP-01",shopInfo:shop,createdAt:new Date().toLocaleString(),originalSellerData:{...newP},adminEditedData:{...newP},adminStatus:"pending"};
      localStorage.setItem("gausia_admin_backup",JSON.stringify([adminCopy,...backup]));
      alert("আপলোড হয়েছে! এডমিন দেখবে");
    }
    setName("");setPrice("");setComment("");setImage("");
  };
  const edit=(p:any)=>{setName(p.title);setPrice(p.price);setCat(p.cat);setComment(p.comment||"");setImage(p.image||"");setEditId(p.id);window.scrollTo(0,0);};
  const del=(id:string)=>{if(!confirm("ডিলিট করবেন? এডমিনের কাছে কপি থেকে যাবে"))return;const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");saveAll(all.filter((p:any)=>p.id!==id));};

  const filtered=products.filter(p=>{if(filter==="সব")return true; if(filter==="পেন্ডিং")return p.approveStatus==="pending"; if(filter==="অনুমোদিত")return p.approveStatus==="approved"; if(filter==="বাতিল")return p.approveStatus==="rejected"; return true;});

  return(
    <div className="min-h-screen bg-[#fff8f0] p-3 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* উপরে দোকানের ফিক্সড এড্রেস - সুন্দর ডিজাইন */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 rounded-[24px] border-[3px] border-black p-[3px] shadow-[6px_6px_0px_black]">
          <div className="bg-white rounded-[20px] p-4 md:p-5 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-3 items-center">
              <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center font-black text-xl">G</div>
              <div>
                {showShopEdit ? (
                  <div className="grid gap-2">
                    <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="দোকানের নাম - যেমন: মা কালেকশন" className="border-2 border-black rounded-full px-3 py-1 text-sm w-64"/>
                    <input value={shopAddr} onChange={e=>setShopAddr(e.target.value)} placeholder="ঠিকানা - যেমন: গাউছিয়া মার্কেট, ২য় তলা" className="border-2 border-black rounded-full px-3 py-1 text-sm w-64"/>
                    <input value={shopPhone} onChange={e=>setShopPhone(e.target.value)} placeholder="ফোন - 017XXXXXXXX" className="border-2 border-black rounded-full px-3 py-1 text-sm w-64"/>
                    <button onClick={saveShop} className="bg-black text-white px-4 py-1 rounded-full text-sm font-black w-fit">সেভ করুন ✓</button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-black flex items-center gap-2">{shopName||"দোকানের নাম দিন"} <span className="bg-green-400 text-[10px] px-2 py-1 rounded-full border border-black">SHOP-01</span></h2>
                    <p className="text-sm mt-1">📍 {shopAddr||"ঠিকানা নেই"} | 📞 {shopPhone||"ফোন নেই"}</p>
                    <p className="text-[11px] mt-1 bg-yellow-200 inline-block px-2 py-1 rounded-full border border-black">এই ঠিকানা প্রতিটি পণ্যের সাথে এডমিন দেখবে - ফিক্সড</p>
                  </>
                )}
              </div>
            </div>
            {!showShopEdit && <button onClick={()=>setShowShopEdit(true)} className="h-fit bg-white border-2 border-black px-4 py-2 rounded-full text-xs font-black shadow-[3px_3px_0px_black]">এডিট দোকান তথ্য</button>}
            <div className="hidden md:block text-right">
              <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">মোট আপলোড: {products.length} টি</div>
              <div className="bg-green-300 border-2 border-black px-4 py-1 rounded-full text-xs font-bold mt-2 inline-block">Pending: {products.filter(p=>p.approveStatus==="pending").length}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-6 mt-6">
          <div className="bg-white rounded-[24px] border-[3px] border-black p-5 h-fit shadow-[6px_6px_0px_black] sticky top-4">
            <h2 className="text-[20px] font-black flex items-center gap-2"> {editId?"✏️ পণ্য এডিট করুন":"✨ নতুন পণ্য আপলোড"} </h2>
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-pink-400 rounded-full mt-2"></div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="পণ্যের নাম - যেমন Chane" className="w-full mt-4 border-2 border-black rounded-xl p-3 bg-[#fffef5] font-bold"/>
            <select value={cat} onChange={e=>setCat(e.target.value)} className="w-full mt-3 border-2 border-black rounded-xl p-3 bg-white"><option>মহিলা</option><option>পুরুষ</option><option>মেয়ে</option><option>ছেলে</option><option>বেবি</option><option>জুয়েলারি</option></select>
            <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="দাম - 500" className="w-full mt-3 border-2 border-black rounded-xl p-3 bg-[#fffef5]"/>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="মন্তব্য / বিবরণ - যেমন Indian" className="w-full mt-3 border-2 border-black rounded-xl p-3 h-20 bg-white"></textarea>
            <div className="mt-3 border-2 border-dashed border-black rounded-xl p-3 bg-[#fff8e6] text-center">
              <div className="text-xs font-black mb-1">📸 ছবি আপলোড</div>
              <input type="file" accept="image/*" onChange={handleImage} className="w-full text-xs"/>
              {image && <img src={image} className="mt-2 w-full h-36 object-cover rounded-xl border-2 border-black"/>}
            </div>
            <button onClick={upload} className="w-full mt-4 bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-full font-black text-lg shadow-[4px_4px_0px_#fbbf24]">{editId?"আপডেট করুন ✓":"আপলোড করুন +"}</button>
            {editId && <button onClick={()=>{setEditId(null);setName("");setPrice("");setComment("");setImage("");}} className="w-full mt-2 bg-white border-2 border-black py-2 rounded-full font-bold">বাতিল</button>}
          </div>

          <div>
            <h3 className="text-2xl font-black flex items-center gap-2">আমার আপলোড ({products.length} টি) <span className="bg-amber-300 border-2 border-black text-xs px-3 py-1 rounded-full">{filtered.length} দেখাচ্ছে</span></h3>
            <div className="flex gap-2 mt-3 flex-wrap">{["সব","পেন্ডিং","অনুমোদিত","বাতিল"].map(f=><button key={f} onClick={()=>setFilter(f)} className={`px-5 py-2 rounded-full border-2 border-black font-black text-sm shadow-[2px_2px_0px_black] ${filter===f?"bg-black text-white":"bg-white hover:bg-yellow-100"}`}>{f}</button>)}</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
              {filtered.map(p=>(
                <div key={p.id} className="bg-white border-[3px] border-black rounded-[20px] overflow-hidden shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] transition">
                  {p.image?<img src={p.image} className="h-36 w-full object-cover"/>:<div className="bg-gradient-to-br from-amber-100 to-pink-100 h-36 flex items-center justify-center font-black text-center p-2">{p.title}</div>}
                  <div className="p-3">
                    <div className="flex justify-between items-center"><span className="text-[8px] bg-black text-white px-2 py-1 rounded-full font-bold">{p.id}</span><span className={`text-[9px] px-2 py-1 rounded-full font-black border border-black ${p.approveStatus==="approved"?"bg-green-300":p.approveStatus==="pending"?"bg-yellow-300":"bg-red-300"}`}>{p.approveStatus}</span></div>
                    <div className="font-black mt-2 text-sm truncate">{p.title} - {p.price}৳</div><div className="text-[11px] text-gray-600 truncate">📍 {p.shopInfo?.address||shopAddr}</div>
                    <div className="flex gap-1 mt-3"><button onClick={()=>edit(p)} className="flex-1 bg-blue-500 border-2 border-black text-white py-1.5 rounded-full text-xs font-black">Edit</button><button onClick={()=>{if(!confirm("ডিলিট?"))return;const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");const up=all.filter((x:any)=>x.id!==p.id);localStorage.setItem("gausia_all_products",JSON.stringify(up));setProducts(up);}} className="flex-1 bg-red-500 border-2 border-black text-white py-1.5 rounded-full text-xs font-black">Delete</button></div>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length===0 && <div className="mt-16 text-center"><div className="text-6xl">📦</div><div className="font-black mt-2">কোনো পণ্য নেই</div></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
