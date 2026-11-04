"use client";
export default function Admin(){
  return (
    <div style={{padding:20, fontFamily:"sans-serif"}}>
      <h1 style={{fontWeight:"bold", fontSize:22}}>🛡️ Admin Panel</h1>
      <p style={{marginTop:10}}>Seller থেকে পাঠানো পণ্য এখানে দেখা যাবে।</p>
      <a href="/seller" style={{display:"inline-block", marginTop:15, background:"black", color:"white", padding:"10px 18px", borderRadius:999}}>Seller পেজে যান</a>
    </div>
  );
}
