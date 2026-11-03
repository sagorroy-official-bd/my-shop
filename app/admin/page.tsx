// Special পাঠালে শুধু টপ ব্যানারে যাবে + দোকানের লিস্টেও থাকবে যাতে আকর্ষণ হয়
const sendSpecial=(item:any)=>{
  const banners=JSON.parse(localStorage.getItem("gausia_special_banners")||"[]");
  const final={
    id:Date.now(),
    shop:item.editedShop, 
    title:item.editedTitle,
    price:parseInt(item.offerPrice||0),
    originalPrice:parseInt(item.originalPrice||0),
    image:item.editedImages[0],
    images:item.editedImages,
    offerTitle:item.offerTitle||"Special Offer",
    discountPercent:item.discountPercent?parseInt(item.discountPercent):0,
    badge:item.badge,
    quantity:item.quantity,
    type:"special",
    createdAt:new Date().toLocaleString()
  };
  localStorage.setItem("gausia_special_banners",JSON.stringify([final,...banners].slice(0,10)));
  const all=JSON.parse(localStorage.getItem("gausia_all_products")||"[]");
  localStorage.setItem("gausia_all_products",JSON.stringify([final,...all]));
  alert(`🔥 SPECIAL - কাস্টমার পেজের টপে বড় ডিসপ্লে তে গেছে - সবার নজরে পড়বে! + ${final.shop} দোকানের লিস্টেও থাকবে`);
};
