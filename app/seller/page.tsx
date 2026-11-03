"use client";
import { useState, useEffect } from "react";
export default function SellerPage(){
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState(""); const [price, setPrice] = useState("");
  useEffect(()=>{ const s=JSON.parse(localStorage.getItem("gausia_all_products")||"[]"); setProducts(s); },[]);
  const upload=()=>{
    if(!name||!price) return alert("নাম ও দাম দিন");
    const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
    const newP={id:`SHOP-01-${all.length+1}`, title:name, price, cat:"মহিলা", status:"পজিটিভ", shop:"SHOP-01", approveStatus:"pending"};
    const up=[newP,...all]; localStorage.setItem("gausia_all_products", JSON.stringify(up)); setProducts(up); setName(""); setPrice(""); alert("আপলোড হয়েছে! Admin এ দেখা যাবে");
  };
  return(<div style={{padding:"20px"}}><h2>SELLER - নতুন পণ্য আপলোড</h2><input value={name} onChange={e=>setName(e.target.value)} placeholder="পণ্যের নাম" style={{border:"1px solid black", padding:"8px", width:"100%"}}/><br/><br/><input value={price} onChange={e=>setPrice(e.target.value)} placeholder="দাম" style={{border:"1px solid black", padding:"8px", width:"100%"}}/><br/><br/><button onClick={upload} style={{background:"black", color:"white", padding:"10px 20px", borderRadius:"20px"}}>আপলোড</button><h3>আমার আপলোড: {products.length}</h3></div>)
}
