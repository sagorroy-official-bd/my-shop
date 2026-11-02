"use client";
import { useState } from "react";

const products = [
  { id:"SHOP-01-001", cat:"Women", title:"জর্জেট শাড়ি - 1", price:850, status:"নেগেটিভ", img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400" },
  { id:"SHOP-01-002", cat:"Women", title:"কাতান বোরকা - 2", price:892, status:"পজিটিভ", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400" },
  { id:"SHOP-01-003", cat:"Men", title:"প্রিমিয়াম পাঞ্জাবি - 3", price:934, status:"পজিটিভ", img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400" },
  { id:"SHOP-01-004", cat:"Women", title:"পার্টি লেহেঙ্গা - 4", price:976, status:"পজিটিভ", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
  { id:"SHOP-01-005", cat:"Women", title:"সিটি গোল্ড সেট - 5", price:1018, status:"নেগেটিভ", img:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },
];

export default function Page(){
  return(
    <div style={{background:"#fdf6ee", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <header style={{background:"white", padding:"12px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #eee"}}>
        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
          <div style={{background:"#ff3b30", color:"white", width:"36px", height:"36px", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900}}>G</div>
          <div><div style={{fontWeight:900}}>GAUSIA COLLECTION</div><div style={{fontSize:"11px", color:"#e91e63"}}>ছেলে • মেয়ে • বাচ্চা • ফ্যামিলি</div></div>
        </div>
        <div style={{background:"black", color:"white", padding:"6px 16px", borderRadius:"20px", fontSize:"12px", fontWeight:700}}>100 টি</div>
      </header>

      <div style={{background:"black", color:"white", textAlign:"center", padding:"8px", fontSize:"12px"}}>✨ ১০ দোকান x ১০ পণ্য = ১০০ টি | ভার্চুয়াল টেস্ট - ফাইনাল ✨</div>

      <div style={{maxWidth:"1200px", margin:"0 auto", padding:"16px"}}>
        <div style={{background:"white", borderRadius:"16px", border:"1px solid black", padding:"16px", marginBottom:"16px"}}>
          <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px"}}>
            <span style={{background:"black", color:"white", padding:"6px 14px", borderRadius:"20px", fontSize:"12px"}}>📊 সব (100)</span>
            <span style={{border:"1px solid black", padding:"6px 14px", borderRadius:"20px", fontSize:"12px"}}>👩 মহিলা</span>
            <span style={{border:"1px solid black", padding:"6px 14px", borderRadius:"20px", fontSize:"12px"}}>👨 পুরুষ</span>
            <span style={{border:"1px solid black", padding:"6px 14px", borderRadius:"20px", fontSize:"12px"}}>👧 মেয়ে</span>
            <span style={{border:"1px solid black", padding:"6px 14px", borderRadius:"20px", fontSize:"12px"}}>👦 ছেলে</span>
            <span style={{border:"1px solid black", padding:"6px 14px", borderRadius:"20px", fontSize:"12px"}}>👶 বেবি</span>
          </div>
          <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
            <span style={{background:"#ff2d92", color:"white", padding:"6px 12px", borderRadius:"20px", fontSize:"11px"}}>সব দোকান</span>
            {Array.from({length:10}).map((_,i)=><span key={i} style={{border:"1px solid black", padding:"6px 12px", borderRadius:"20px", fontSize:"11px"}}>SHOP-0{i+1}</span>)}
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:"16px"}}>
          {products.map(p=>(
            <div key={p.id} style={{background:"white", borderRadius:"16px", border:"1px solid black", overflow:"hidden"}}>
              <div style={{position:"relative"}}>
                <img src={p.img} style={{width:"100%", height:"200px", objectFit:"cover"}}/>
                <div style={{position:"absolute", top:"8px", left:"8px", background:"white", fontSize:"10px", padding:"2px 8px", borderRadius:"12px", border:"1px solid black"}}>{p.id}</div>
                <div style={{position:"absolute", top:"8px", right:"8px", background: p.status==="পজিটিভ"?"#dcfce7":"#fef3c7", fontSize:"10px", padding:"2px 6px", borderRadius:"10px"}}>{p.status==="পজিটিভ"?"✅":"⚠️"}</div>
                <div style={{position:"absolute", bottom:"8px", left:"8px", background:"black", color:"white", fontSize:"10px", padding:"2px 8px", borderRadius:"12px"}}>{p.cat}</div>
              </div>
              <div style={{padding:"10px"}}>
                <div style={{fontWeight:700, fontSize:"14px"}}>{p.title}</div>
                <div style={{fontSize:"11px", color:"gray"}}>মা ফ্যাশন</div>
                <div style={{marginTop:"4px", fontSize:"11px", color: p.status==="পজিটিভ"?"green":"#d97706"}}>{p.status==="পজিটিভ"?"✅ পজিটিভ":"⚠️ নেগেটিভ"}</div>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"8px"}}>
                  <div style={{fontWeight:900}}>{p.price}৳</div>
                  <button style={{background:"black", color:"white", border:"none", padding:"6px 14px", borderRadius:"20px", fontSize:"12px"}}>অর্ডার</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
