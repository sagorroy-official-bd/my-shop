"use client";
import { useState, useEffect } from "react";

export default function Home(){
  const [approved, setApproved] = useState<any[]>([]);
  
  useEffect(()=>{
    const all = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    setApproved(all.filter((p:any)=>p.approveStatus==="approved"));
  },[]);

  const demo = [
    {id:"SHOP-01-001", title:"মহিলা পণ্য 1", price:"1000", cat:"মহিলা"},
    {id:"SHOP-01-002", title:"মহিলা পণ্য 2", price:"1500", cat:"মহিলা"},
    {id:"SHOP-01-003", title:"পুরুষ পণ্য", price:"2000", cat:"পুরুষ"},
  ];

  const allDisplay = [...approved, ...demo];

  return(
    <div style={{padding:"20px", background:"#fdf6ee", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <h1 style={{fontWeight:900, fontSize:"32px", textAlign:"center"}}>GAUSIA COLLECTION</h1>
      <p style={{textAlign:"center"}}>মোট পণ্য: {allDisplay.length} টি (Approved: {approved.length} টি)</p>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:"15px", marginTop:"20px"}}>
        {allDisplay.map(p=>(
          <div key={p.id} style={{background:"white", border:"2px solid black", borderRadius:"16px", padding:"12px", textAlign:"center"}}>
            <div style={{fontSize:"10px", background:"black", color:"white", padding:"2px 6px", borderRadius:"6px", display:"inline-block"}}>{p.id}</div>
            <div style={{fontWeight:800, marginTop:"8px"}}>{p.title}</div>
            <div style={{marginTop:"4px"}}>{p.price}৳</div>
            <div style={{fontSize:"12px", color:"gray"}}>{p.cat}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
