"use client";
import { useState, useEffect } from "react";

export default function AdminPage(){
  const [products, setProducts] = useState<any[]>([]);

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    setProducts(saved);
  },[]);

  const update = (id:string, st:string) => {
    const updated = products.map(p=> p.id===id ? {...p, approveStatus:st} : p);
    setProducts(updated);
    localStorage.setItem("gausia_all_products", JSON.stringify(updated));
  };

  const pending = products.filter(p=>p.approveStatus==="pending").length;

  return(
    <div style={{padding:"20px", background:"white", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <h1 style={{fontWeight:900, fontSize:"28px"}}>ADMIN PANEL</h1>
      <p style={{marginTop:"8px"}}>মোট পণ্য: {products.length} টি | পেন্ডিং: {pending} টি</p>
      
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"16px", marginTop:"20px"}}>
        {products.map(p=>(
          <div key={p.id} style={{border:"2px solid black", borderRadius:"16px", padding:"12px"}}>
            <div style={{fontSize:"10px", background:"#eee", padding:"2px 6px", borderRadius:"6px", display:"inline-block"}}>{p.id} - {p.shop}</div>
            <div style={{fontWeight:800, marginTop:"6px"}}>{p.title}</div>
            <div style={{fontSize:"14px"}}>{p.price}৳</div>
            <div style={{margin:"8px 0", padding:"4px 8px", borderRadius:"20px", fontSize:"12px", fontWeight:700, background: p.approveStatus==="approved"?"#bbf7d0":p.approveStatus==="rejected"?"#fecaca":"#fef08a", textAlign:"center"}}>
              {p.approveStatus === "pending" ? "পেন্ডিং - অনুমোদনের অপেক্ষায়" : p.approveStatus === "approved" ? "অনুমোদিত" : "বাতিল"}
            </div>
            <div style={{display:"flex", gap:"6px", marginTop:"10px"}}>
              <button onClick={()=>update(p.id,"approved")} style={{flex:1, background:"green", color:"white", padding:"8px", borderRadius:"10px", border:"none", fontWeight:700}}>Approve</button>
              <button onClick={()=>update(p.id,"rejected")} style={{flex:1, background:"red", color:"white", padding:"8px", borderRadius:"10px", border:"none", fontWeight:700}}>Reject</button>
            </div>
            <button onClick={()=>{ const f=products.filter(x=>x.id!==p.id); setProducts(f); localStorage.setItem("gausia_all_products", JSON.stringify(f)); }} style={{width:"100%", marginTop:"6px", background:"black", color:"white", padding:"6px", borderRadius:"10px", border:"none"}}>Delete</button>
          </div>
        ))}
      </div>

      {products.length===0 && <div style={{marginTop:"40px", textAlign:"center", color:"gray"}}>এখনো কোনো Seller পণ্য আপলোড করেনি। Seller পেজ থেকে আপলোড করলে এখানে দেখাবে।</div>}
    </div>
  )
}
