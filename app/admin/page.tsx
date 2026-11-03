"use client";
import { useState, useEffect } from "react";

export default function AdminPage(){
  const [products, setProducts] = useState<any[]>([]);

  useEffect(()=>{
    const all = JSON.parse(localStorage.getItem("gausia_all_products") || "[]");
    setProducts(all);
  },[]);

  const approve = (id:string, status:string) => {
    const updated = products.map(p => p.id===id ? {...p, approveStatus:status} : p);
    setProducts(updated);
    localStorage.setItem("gausia_all_products", JSON.stringify(updated));
  };

  const del = (id:string) => {
    const updated = products.filter(p=>p.id!==id);
    setProducts(updated);
    localStorage.setItem("gausia_all_products", JSON.stringify(updated));
  };

  return(
    <div style={{padding:"20px", background:"white", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <h1 style={{fontWeight:900, fontSize:"30px"}}>ADMIN PANEL</h1>
      <p>মোট পণ্য: {products.length} | পেন্ডিং: {products.filter(p=>p.approveStatus==="pending").length}</p>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"15px", marginTop:"20px"}}>
        {products.map(p=>(
          <div key={p.id} style={{border:"2px solid black", borderRadius:"16px", padding:"12px"}}>
            <div style={{fontSize:"10px", background:"#eee", padding:"3px 6px", borderRadius:"6px", display:"inline-block"}}>{p.id} - {p.shop}</div>
            <div style={{fontWeight:800, marginTop:"8px", fontSize:"18px"}}>{p.title}</div>
            <div>{p.price}৳ - {p.cat}</div>
            <div style={{marginTop:"8px", padding:"5px", borderRadius:"20px", textAlign:"center", fontWeight:700, background: p.approveStatus==="approved" ? "#bbf7d0" : p.approveStatus==="rejected" ? "#fecaca" : "#fef08a"}}>
              {p.approveStatus}
            </div>
            <div style={{display:"flex", gap:"6px", marginTop:"10px"}}>
              <button onClick={()=>approve(p.id, "approved")} style={{flex:1, background:"green", color:"white", padding:"8px", borderRadius:"10px", border:"none", fontWeight:700}}>Approve</button>
              <button onClick={()=>approve(p.id, "rejected")} style={{flex:1, background:"red", color:"white", padding:"8px", borderRadius:"10px", border:"none", fontWeight:700}}>Reject</button>
            </div>
            <button onClick={()=>del(p.id)} style={{width:"100%", marginTop:"6px", background:"black", color:"white", padding:"6px", borderRadius:"10px"}}>Delete</button>
          </div>
        ))}
      </div>
      {products.length===0 && <p style={{marginTop:"30px", textAlign:"center", color:"gray"}}>কোনো পণ্য নেই। Seller থেকে আপলোড করুন।</p>}
    </div>
  )
}
