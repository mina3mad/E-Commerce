let sidebar = document.querySelector(".sidebar_menu");
let closeBtn = document.querySelector("#Button");
let searchBtn = document.querySelector(".bx-search");

 //=======>> Nav Dashboard <<============//

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();
});
searchBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();
});
function menuBtnChange() {
if(sidebar.classList.contains("open")){
closeBtn.classList.replace("bx-menu", "bxs-x-circle");
}else {
closeBtn.classList.replace("bxs-x-circle","bx-menu");
}
}

 //=======>> END Nav Dashboard <<============//


//==================>>Images With (Jequery)<<==========================//
 $(".small-img").click(function(){
  let imgItem= $(this).attr("src")
  $("#MainImg").attr("src" , imgItem )
 })

//==================>>Images With (Jequery)<<==========================//


//=========>>Start Api Products<<============//

let apiUrl = "https://dummyjson.com/products";
let productData = [];
let list = document.querySelectorAll('.products-container');

async function getDataPro() {
    await productApi();
    console.log(productData);
    let productsRow = document.getElementById("product-list");
    let productsContent = '';

    for (let i = 0; i < productData.length ; i++) {
       
            productsContent += `
            <div class="products-container">
            <div class="pro">
            <img src=${productData[i].images[0]} alt="">
            <div class="des">
            <span>${productData[i].title.slice(0,20)}...</span>
            <p class="description">${productData[i].description.slice(0,25)}...</p>
            <p class="brand">Brand: ${productData[i].brand}</p>
            <p class="discount">Discount: ${productData[i].discountPercentage}</p> 
              <div class="star">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            </div>
            <h4>Price: $${productData[i].price}</h4>
            </div>
            <a href="cart.html"><i class="fa-solid fa-cart-shopping shopping-cart-icon"></i></a>
            </div>
            </div>
            `;
        }
    
    productsRow.innerHTML = productsContent;

}
getDataPro()


async function productApi() {
    const data = await fetch(apiUrl);
    const res = await data.json();
    productData = res.products;
    return data;
}
getDataPro();