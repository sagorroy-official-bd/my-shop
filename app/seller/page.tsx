"use client";
import { useState, useEffect } from "react";

export default function SellerPage(){
  const [shopCode,setShopCode]=useState("SHOP-01");
  const [shopName,setShopName]=useState("");
  const [address,setAddress]=useState("");
  const [phone,setPhone]=useState("");
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [comment,setComment]=useState("");
  const [images,setImages]=useState<string[]>([]);
  const [drafts,setDrafts]=useState<any[]>([]);

  useEffect(()=>{
    try{
      const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
      if(infos[shopCode]){ setShopName(infos[shopCode].shopName||""); setAddress(infos[shopCode].address||""); setPhone(infos[shopCode].phone||""); }
      const d=JSON.parse(localStorage.getItem("gausia_draft_"+shopCode)||"[]");
      setDrafts(d);
    }catch(e){ console.log(e); }
  },[shopCode]);

  const onFiles=(e:any)=>{
    const files=Array.from(e.target.files||[]) as File[];
    if(files.length>5){ alert("একসাথে সর্বোচ্চ ৫টা ছবি"); return; }
    if(images.length+files.length>5){ alert("আর মাত্র "+(5-images.length)+" টা দিতে পারবেন"); return; }
    files.forEach((file:File)=>{
      const reader=new FileReader();
      reader.onload=()=>{
        const img=new Image();
        img.onload=()=>{
          const canvas=document.createElement("canvas");
          const max=800;
          let w=img.width, h=img.height;
          if(w>max||h>max){ if(w>h){ h=h*max/w; w=max; } else { w=w*max/h; h=max; } }
          canvas.width=w; canvas.height=h;
          const ctx=canvas.getContext("2d");
          ctx?.drawImage(img,0,0,w,h);
          const compressed=canvas.toDataURL("image/jpeg",0.6);
          setImages(prev=>[...prev,compressed].slice(0,5));
        };
        img.src=reader.result as string;
      };
      reader.readAsDataURL(file);
    });
    e.target.value="";
  };

  const save=()=>{
    if(!shopName||!title||!price){ alert("দোকানের নাম, পণ্যের নাম, দাম লিখুন"); return; }
    if(images.length===0){ alert("কমপক্ষে ১টা ছবি দিন"); return; }
    const item={id:shopCode+"-"+Date.now(),shop:shopCode,shopName,address,phone,title,price:Number(price),comment,images,mainImage:images[0]};
    const updated=[item,...drafts];
    setDrafts(updated);
    localStorage.setItem("gausia_draft_"+shopCode,JSON.stringify(updated));
    const infos=JSON.parse(localStorage.getItem("gausia_all_shop_infos")||"{}");
    infos[shopCode]={shopName,address,phone};
    localStorage.setItem("gausia_all_shop_infos",JSON.stringify(infos));
    const shops=JSON.parse(localStorage.getItem("gausia_all_shops")||"[]");
    if(!shops.includes(shopCode)) localStorage.setItem("gausia_all_shops",JSON.stringify([...shops,shopCode].sort()));
    setTitle(""); setPrice(""); setComment(""); setImages([]);
  };

  const delDraft=(i:number)=>{ const u=drafts.filter((_,idx)=>idx!==i); setDrafts(u); localStorage.setItem("gausia_draft_"+shopCode,JSON.stringify(u)); };
  const send=()=>{
    if(drafts.length===0){ alert("কোনো প্রিভিউ নেই"); return; }
    const exist=JSON.parse(localStorage.getItem("gausia_seller_pending")||"[]");
    const withStatus=drafts.map((d:any)=>({...d,status:"pending",image:d.mainImage}));
    localStorage.setItem("gausia_seller_pending",JSON.stringify([...exist,...withStatus]));
    localStorage.removeItem("gausia_draft_"+shopCode);
    setDrafts([]); setImages([]); setTitle(""); setPrice(""); setComment("");
    alert("✅ "+withStatus.length+" টা Admin এ গেছে! এখন পেজ খালি হয়ে গেছে");
  };

  return (
    <div style={{minHeight:"100vh",background:"#f9f5f0",padding:16}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{background:"white",border:"2px solid black",borderRadius:20,padding:16,display:"flex",justifyContent:"space-between"}}>
          <b>GAUSIA SELLER - 5 Pics Folder</b><span style={{background:"black",color:"white",padding:"4px 12px",borderRadius:20,fontSize:12}}>{images.length}/5</span>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:16}}>
          <div style={{background:"white",border:"2px solid black",borderRadius:20,padding:16}}>
            <select value={shopCode} onChange={e=>setShopCode(e.target.value)} style={{width:"100%",border:"2px solid black",borderRadius:30,padding:12,fontWeight:"bold"}}>
              {Array.from({length:100}).map((_,i)=>{const s="SHOP-"+String(i+1).padStart(2,"0"); return <option key={s} value={s}>{s}</option>})}
            </select>
            <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="🏬 দোকানের নাম" style={{width:"100%",border:"2px solid black",borderRadius:30,padding:12,marginTop:12}}/>
            <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="🗺️ ঠিকানা" style={{width:"100%",border:"2px solid black",borderRadius:30,padding:12,marginTop:8}}/>
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="📞 মোবাইল" style={{width:"100%",border:"2px solid black",borderRadius:30,padding:12,marginTop:8}}/>

            <div style={{marginTop:16,borderTop:"2px dashed #ccc",paddingTop:12}}>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="✨ Lal Sari" style={{width:"100%",border:"2px solid black",borderRadius:30,padding:12}}/>
              <input value={price} onChange={e=>setPrice(e.target.value)} type="number" placeholder="💰 1000" style={{width:"100%",border:"2px solid black",borderRadius:30,padding:12,marginTop:8}}/>
              <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="💬 Ban / Ind" style={{width:"100%",border:"2px solid black",borderRadius:20,padding:12,marginTop:8,height:60}}/>

              <div style={{marginTop:12,border:"2px dashed #8b5cf6",background:"#f5f3ff",borderRadius:16,padding:12}}>
                <div style={{fontSize:12,fontWeight:"bold"}}>📁 একই ফোল্ডার থেকে ৫টা ছবি একসাথে</div>
                <div style={{fontSize:10,color:"#666",marginTop:4}}>ফোল্ডারে Ctrl+A দিয়ে ৫টা সিলেক্ট করুন - প্রিভিউতে ৫টাই দেখা যাবে</div>
                <label style={{display:"block",marginTop:10,background:"black",color:"white",padding:12,borderRadius:30,textAlign:"center",fontWeight:"bold",cursor:"pointer"}}>
                  📁 ফোল্ডার থেকে ৫টা সিলেক্ট ({images.length}/5)
                  <input type="file" accept="image/*" multiple onChange={onFiles} style={{display:"none"}}/>
                </label>
                {images.length>0 && (
                  <>
                    <div style={{display:"flex",gap:8,marginTop:8}}>
                      <label style={{flex:1,background:"white",border:"2px solid black",padding:8,borderRadius:20,textAlign:"center",fontSize:11,fontWeight:"bold",cursor:"pointer"}}>➕ আরো Add<input type="file" accept="image/*" multiple onChange={onFiles} style={{display:"none"}}/></label>
                      <button onClick={()=>setImages([])} style={{flex:1,background:"#fee2e2",border:"2px solid black",padding:8,borderRadius:20,fontSize:11,fontWeight:"bold"}}>🗑️ সব ডিলিট</button>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginTop:10}}>
                      {images.map((img,i)=><div key={i} style={{position:"relative"}}><img src={img} style={{width:"100%",height:60,objectFit:"cover",borderRadius:10,border:"2px solid black"}}/><button onClick={()=>setImages(prev=>prev.filter((_,idx)=>idx!==i))} style={{position:"absolute",top:-6,right:-6,background:"red",color:"white",width:18,height:18,borderRadius:10,fontSize:10,border:"1px solid black"}}>✕</button><div style={{position:"absolute",bottom:2,left:2,background:"black",color:"white",fontSize:8,padding:"0 4px",borderRadius:10}}>{i+1}</div></div>)}
                    </div>
                  </>
                )}
              </div>

              <button onClick={save} style={{width:"100%",marginTop:14,background:"black",color:"white",padding:14,borderRadius:30,fontWeight:"bold",border:"2px solid black"}}>➕ প্রিভিউতে যোগ করুন ({images.length} ছবি)</button>
            </div>
          </div>

          <div style={{background:"white",border:"2px solid black",borderRadius:20,padding:16}}>
            <b>👁️ লাইভ প্রিভিউ - {drafts.length} টা</b>
            {images.length>0 && <div style={{marginTop:12,border:"2px solid black",borderRadius:16,overflow:"hidden"}}><img src={images[0]} style={{width:"100%",height:160,objectFit:"cover"}}/><div style={{display:"flex",gap:4,padding:6,background:"#f9f5f0"}}>{images.map((im,i)=><img key={i} src={im} style={{width:32,height:32,borderRadius:6,border:"2px solid black",objectFit:"cover"}}/>)}</div><div style={{padding:10}}><b>{title||"Lal Sari"} - {price||1000}৳</b><div style={{fontSize:11,color:"#666"}}>🏪 {shopName||shopCode}</div></div></div>}

            <div style={{marginTop:16,maxHeight:500,overflow:"auto"}}>
              {drafts.map((p:any,i:number)=><div key={p.id} style={{border:"2px solid black",borderRadius:14,padding:10,marginBottom:10}}><div style={{display:"flex",gap:10}}><img src={p.mainImage} style={{width:60,height:60,borderRadius:10,border:"2px solid black",objectFit:"cover"}}/><div><div style={{fontWeight:"bold",fontSize:12}}>{p.title} - {p.price}৳</div><div style={{display:"flex",gap:3,marginTop:4}}>{p.images.map((im:string,idx:number)=><img key={idx} src={im} style={{width:22,height:22,borderRadius:4,border:"1px solid black"}}/>)}</div><div style={{fontSize:10,color:"#666",marginTop:2}}>📂 {p.images.length} Pics একই ফোল্ডারে</div></div></div><div style={{display:"flex",gap:6,marginTop:8}}><button onClick={()=>{setTitle(p.title); setPrice(String(p.price)); setComment(p.comment); setImages(p.images); const u=drafts.filter((_,idx)=>idx!==i); setDrafts(u);}} style={{flex:1,background:"#facc15",border:"2px solid black",borderRadius:20,padding:6,fontSize:11,fontWeight:"bold"}}>✏️ Edit</button><button onClick={()=>delDraft(i)} style={{flex:1,background:"white",border:"2px solid black",borderRadius:20,padding:6,fontSize:11,fontWeight:"bold"}}>🗑️ Delete</button></div></div>)}
              {drafts.length===0 && <div style={{textAlign:"center",padding:40,border:"2px dashed #ccc",borderRadius:14,fontSize:12,color:"#888"}}>📁 একই ফোল্ডার থেকে ৫টা ছবি সিলেক্ট করুন<br/>প্রিভিউতে ৫টাই একসাথে দেখা যাবে</div>}
            </div>

            {drafts.length>0 && <button onClick={send} style={{width:"100%",marginTop:12,background:"#10b981",color:"white",border:"2px solid black",padding:12,borderRadius:30,fontWeight:"bold"}}>🚀 {drafts.length} টা Admin এ পাঠান - পাঠানোর পর খালি</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
