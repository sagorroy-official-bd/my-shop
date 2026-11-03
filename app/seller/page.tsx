"use client";
import { useState, useEffect } from "react";

export default function SellerPage(){
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cat, setCat] = useState("মহিলা");

  useEffect(()=>{
    const all = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    setProducts(all);
  },[]);

  const upload = () => {
    if(!name || !price) return alert("নাম ও দাম দিন");
    const all = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    const newP = {
      id: `SHOP-01-${String(all.length+1).padStart(3,"0")}`,
      title: name,
      price: price,
      cat: cat,
      shop: "SHOP-01",
      approveStatus: "pending"
    };
    const updated = [newP, ...all];
    localStorage.setItem("gausia_all_products", JSON.stringify(updated));
    setProducts(updated);
    setName(""); setPrice("");
    alert("আপলোড হয়েছে! Admin এ গিয়ে Approve করুন");
  };

  return(
    <div style={{padding:"20px", background:"#fdf6ee", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <div style={{background:"white", border:"2px solid black", borderRadius:"20px", padding:"20px", maxWidth:"500px"}}>
        <h2 style={{fontWeight:900}}>নতুন পণ্য আপলোড - SHOP-01</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="পণ্যের নাম যেমন Sari" style={{width:"100%", border:"1px solid black", padding:"10px", borderRadius:"10px", marginTop:"10px"}}/>
        <select value={cat} onChange={e=>setCat(e.target.value)} style={{width:"100%", padding:"10px", borderRadius:"10px", border:"1px solid black", marginTop:"10px"}}>
          <option>মহিলা</option><option>পুরুষ</option><option>মেয়ে</option><option>ছেলে</option><option>বেবি</option>
        </select>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="দাম যেমন 5000" style={{width:"100%", border:"1px solid black", padding:"10px", borderRadius:"10px", marginTop:"10px"}}/>
        <button onClick={upload} style={{width:"100%", background:"black", color:"white", padding:"12px", borderRadius:"30px", marginTop:"15px", fontWeight:800}}>আপলোড করুন</button>
      </div>
      <h3 style={{marginTop:"20px", fontWeight:800}}>আমার আপলোড ({products.length} টি)</h3>
      <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>
        {products.map(p=><div key={p.id} style={{background:"white", border:"1px solid black", borderRadius:"10px", padding:"10px"}}>{p.title} - {p.price}৳ ({p.approveStatus})</div>)}
      </div>
    </div>
  )
}
