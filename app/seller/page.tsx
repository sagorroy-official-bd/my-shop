"use client";
import { useState } from "react";

export default function SellerPage(){
  const [shopCode,setShopCode]=useState("SHOP-01");
  const [shopName,setShopName]=useState("");
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [comment,setComment]=useState("");
  const [images,setImages]=useState<string[]>([]);
  const [drafts,setDrafts]=useState<any[]>([]);

  const onFiles=(e:any)=>{
    const files=Array.from(e.target.files||[]) as File[];
    const take=files.slice(0,5-images.length);
    if(take.length===0){ alert("সর্বোচ্চ ৫টা ছবি"); return; }
    take.forEach((f:File)=>{
      const r=new FileReader();
      r.onload=()=>{ if(typeof r.result==="string") setImages(p=>[...p,r.result as string].slice(0,5)); };
      r.readAsDataURL(f);
    });
    e.target.value="";
  };

  const save=()=>{
    if(!shopName||!title||!price){ alert("দোকানের নাম, পণ্যের নাম, দাম লিখুন"); return; }
    if(images.length===0){ alert("১টা ছবি দিন"); return; }
    const item={id:Date.now(),shop:shopCode,shopName,title,price,comment,images,main:images[0]};
    setDrafts([item,...drafts]);
    setTitle(""); setPrice(""); setComment(""); setImages([]);
  };

  const send=()=>{
    if(drafts.length===0){ alert("প্রিভিউ নেই"); return; }
    try{
      const old=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
      const toSave=drafts.map((d:any)=>({...d,status:"pending",image:d.main}));
      localStorage.setItem("gausia_seller_pending",JSON.stringify([...old,...toSave]));
    }catch{}
    setDrafts([]); setImages([]); setTitle(""); setPrice(""); setComment("");
    alert("✅ "+drafts.length+" টা Admin এ গেছে! এখন খালি হয়ে গেছে");
  };

  return(
    <div style={{padding:12,background:"#f9f5f0",minHeight:"100vh"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <div style={{background:"white",border:"2px solid black",borderRadius:16,padding:12}}><b>SELLER - ৫ ছবি এক ফোল্ডারে</b><div style={{fontSize:10,color:"#666"}}>Build Fixed - এখন লোড হবে</div></div>
        <div style={{background:"white",border:"2px solid black",borderRadius:16,padding:14,marginTop:12}}>
          <select value={shopCode} onChange={e=>setShopCode(e.target.value)} style={{width:"100%",border:"2px solid black",borderRadius:30,padding:10,fontWeight:"bold"}}>
            {Array.from({length:20}).map((_,i)=>{const s="SHOP-"+String(i+1).padStart(2,"0"); return <option key={s} value={s}>{s}</option>})}
          </select>
          <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="দোকানের নাম" style={{width:"100%",marginTop:8,border:"2px solid black",borderRadius:30,padding:10}}/>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Lal Sari" style={{width:"100%",marginTop:8,border:"2px solid black",borderRadius:30,padding:10}}/>
          <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="1000" style={{width:"100%",marginTop:8,border:"2px solid black",borderRadius:30,padding:10}}/>
          <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Ban / Ind" style={{width:"100%",marginTop:8,border:"2px solid black",borderRadius:30,padding:10}}/>

          <div style={{marginTop:12,border:"2px dashed #8b5cf6",background:"#f5f3ff",borderRadius:14,padding:10}}>
            <div style={{fontSize:12,fontWeight:900}}>📁 একই ফোল্ডার থেকে ৫টা ছবি একসাথে - Ctrl+A দিয়ে সিলেক্ট</div>
            <label style={{display:"block",marginTop:8,background:"black",color:"white",padding:10,borderRadius:30,textAlign:"center",fontWeight:900,cursor:"pointer"}}>
              📁 ফোল্ডার থেকে ৫টা সিলেক্ট ({images.length}/5)
              <input type="file" accept="image/*" multiple onChange={onFiles} style={{display:"none"}}/>
            </label>
            <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
              {images.map((im,i)=><div key={i} style={{position:"relative"}}><img src={im} alt="" style={{width:70,height:70,objectFit:"cover",borderRadius:8,border:"2px solid black"}}/><button onClick={()=>setImages(p=>p.filter((_,idx)=>idx!==i))} style={{position:"absolute",top:-6,right:-6,background:"red",color:"white",borderRadius:10,width:18,height:18,fontSize:10}}>X</button><div style={{position:"absolute",bottom:1,left:1,background:"black",color:"white",fontSize:9,padding:"0 4px",borderRadius:6}}>{i+1}</div></div>)}
            </div>
            {images.length>0 && <div style={{display:"flex",gap:6,marginTop:8}}><label style={{flex:1,background:"white",border:"2px solid black",padding:8,borderRadius:20,textAlign:"center",fontSize:11,fontWeight:900,cursor:"pointer"}}>➕ আরো Add<input type="file" accept="image/*" multiple onChange={onFiles} style={{display:"none"}}/></label><button onClick={()=>setImages([])} style={{flex:1,background:"#fee2e2",border:"2px solid black",padding:8,borderRadius:20,fontSize:11,fontWeight:900}}>🗑️ সব ডিলিট</button></div>}
          </div>

          <button onClick={save} style={{width:"100%",marginTop:12,background:"black",color:"white",padding:12,borderRadius:30,fontWeight:900}}>➕ প্রিভিউতে যোগ করুন - {images.length} ছবি এক ফোল্ডারে</button>

          {images.length>0 && <div style={{marginTop:12,border:"2px solid black",borderRadius:12,overflow:"hidden"}}><img src={images[0]} alt="" style={{width:"100%",height:150,objectFit:"cover"}}/><div style={{display:"flex",gap:4,padding:6,background:"#eee"}}>{images.map((im,i)=><img key={i} src={im} alt="" style={{width:30,height:30,borderRadius:4,border:"1px solid black"}}/>)}</div><div style={{padding:8,fontSize:12,fontWeight:900}}>প্রিভিউতে {images.length} ছবি এক ফোল্ডারে দেখা যাবে</div></div>}

          <div style={{marginTop:14}}>
            {drafts.map((d,i)=><div key={d.id} style={{border:"2px solid black",borderRadius:12,padding:8,marginTop:8}}><div style={{display:"flex",gap:8}}><img src={d.main} alt="" style={{width:50,height:50,borderRadius:8,border:"1px solid black"}}/><div><div style={{fontWeight:900,fontSize:12}}>{d.title} - {d.price}৳</div><div style={{display:"flex",gap:2,marginTop:2}}>{d.images.map((im:string,k:number)=><img key={k} src={im} alt="" style={{width:18,height:18,borderRadius:3,border:"1px solid black"}}/>)}</div><div style={{fontSize:10}}>📂 {d.images.length} Pics এক ফোল্ডারে</div></div></div><div style={{display:"flex",gap:6,marginTop:6}}><button onClick={()=>{setTitle(d.title); setPrice(d.price); setComment(d.comment); setImages(d.images); setDrafts(drafts.filter((_,idx)=>idx!==i));}} style={{flex:1,background:"#facc15",border:"2px solid black",borderRadius:20,padding:5,fontSize:11,fontWeight:900}}>Edit</button><button onClick={()=>setDrafts(drafts.filter((_,idx)=>idx!==i))} style={{flex:1,background:"white",border:"2px solid black",borderRadius:20,padding:5,fontSize:11,fontWeight:900}}>Delete</button></div></div>)}
          </div>

          {drafts.length>0 && <button onClick={send} style={{width:"100%",marginTop:12,background:"#10b981",color:"white",border:"2px solid black",padding:12,borderRadius:30,fontWeight:900}}>🚀 {drafts.length} টা Admin এ পাঠান - পাঠানোর পর খালি</button>}
        </div>
      </div>
    </div>
  );
}
