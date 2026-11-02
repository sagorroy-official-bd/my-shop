"use client";

export default function Page(){
  const products = [
    { id:1, title:"Gausia Black Kajal Waterproof - 3 Pcs", price:59, off:75, sold:39, rating:4.5, rev:7, choice:true },
    { id:2, title:"Gausia Metal Leaf Lapel Pin Brooch", price:265, off:38, sold:121, rating:4.8, rev:34, choice:false },
    { id:3, title:"Gausia Eyeconic Kajal Deep Black 1 pc", price:37, off:62, sold:243, rating:5, rev:27, choice:false },
    { id:4, title:"Gausia Beauty Glazed N Kajal Liner", price:155, off:56, sold:55, rating:4.6, rev:10, choice:true },
  ];

  return(
    <div style={{background:"#f5f5f5", minHeight:"100vh"}}>
      <header style={{background:"#f85606", padding:"12px", display:"flex", gap:"16px", alignItems:"center"}}>
        <div style={{color:"white", fontWeight:900, fontSize:"18px"}}>GAUSIA COLLECTION</div>
        <div style={{flex:1, maxWidth:"600px", display:"flex", background:"white", borderRadius:"4px", overflow:"hidden"}}>
          <input defaultValue="meye der poshak" style={{flex:1, padding:"10px", fontSize:"14px", border:"none", outline:"none"}} placeholder="Search in Gausia Collection"/>
          <button style={{background:"#ffe1d2", padding:"0 16px", border:"none"}}>🔍</button>
        </div>
        <div style={{color:"white", fontSize:"20px"}}>🛒</div>
      </header>

      <div style={{maxWidth:"1200px", margin:"0 auto", display:"flex", gap:"24px", padding:"16px"}}>
        <aside style={{width:"200px", background:"white", padding:"16px", fontSize:"13px", display:"block"}}>
          <b>Category</b>
          <div style={{color:"gray", lineHeight:"24px", marginTop:"8px"}}>Meye der Poshak<br/>Saree<br/>Three Piece<br/>Bangles<br/>Hijab<br/><b style={{color:"#1a9cb7"}}>VIEW MORE</b></div>
          <div style={{marginTop:"24px"}}><b>Brand</b></div>
          <div style={{color:"gray", lineHeight:"24px", marginTop:"8px"}}>☐ Gausia Collection<br/>☐ Suba Int.<br/>☐ Beauty Glazed<br/>☐ Glam Touch</div>
        </aside>

        <main style={{flex:1}}>
          <div style={{background:"white", padding:"12px", marginBottom:"12px", display:"flex", justifyContent:"space-between", fontSize:"13px"}}>
            <div><b>meye der poshak</b><br/><span style={{color:"gray", fontSize:"11px"}}>1200 items found for "meye der poshak"</span></div>
            <div>Sort By: Best Match</div>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
            {products.map(p=>(
              <div key={p.id} style={{background:"white", padding:"8px"}}>
                <div style={{background:"#eee", height:"160px"}}></div>
                {p.choice && <span style={{background:"#ffce00", fontSize:"10px", fontWeight:"bold", padding:"2px 4px"}}>CHOICE</span>}
                <div style={{fontSize:"12px", marginTop:"4px", height:"32px"}}>{p.title}</div>
                <div style={{color:"#f85606", fontWeight:"bold"}}>৳ {p.price}</div>
                <div style={{fontSize:"11px", color:"#999"}}>{p.off}% Off <span style={{background:"#fff6f3", color:"#f85606"}}> BEST PRICE</span></div>
                <div style={{fontSize:"11px", marginTop:"4px"}}>{p.sold} sold | ⭐ {p.rating} ({p.rev})</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
