let sidebar = document.querySelector(".sidebar_menu");
let closeBtn = document.querySelector("#Button");
let searchBtn = document.querySelector(".bx-search");

//============Nav Dashboard==================//
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


//==========>> Api Products<<============//

let apiUrl = "https://dummyjson.com/products";
let productData = [];
let thisPage = 1;
let limit = 12;
let list = document.querySelectorAll('.products-container');

//=========>>Function to get Product and pagination<<===========//

async function getDataPro() {
    await productApi();
    console.log(productData);
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    let productsRow = document.getElementById("product-list");
    let productsContent = '';

    for (let i = beginGet; i <= endGet; i++) {
        if(i < productData.length){
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
    }
    productsRow.innerHTML = productsContent;
    listPage();

}
getDataPro()


async function productApi() {
    const data = await fetch(apiUrl);
    const res = await data.json();
    productData = res.products;
    return data;
}
getDataPro();

///////////////////////////////////////////////////////

//==========>> Pagination <<===========//

function listPage(){
    let count = Math.ceil(list.length / limit);
    document.querySelector('.listPage').innerHTML = '';
    if(thisPage != 1){
        let prev = document.createElement('li');
        prev.innerText = 'Previous';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for(i = 1; i <= count; i++){
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == thisPage){
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    if(thisPage != count){
        let next = document.createElement('li');
        next.innerText = 'Next';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}
listPage();
function changePage(i){
    thisPage = i;
    getDataPro();

}
//============================

//===========================
//=======>> Function to get Search <<==========//

let search='title';
function getSearch(){

let search=document.getElementById('search');
search.focus()
search.value='';
getDataPro()

}

function searchByTitle(value) {
    let productsContent =""

if (search=='title') {

    for (let i = 0; i < productData.length; i++) {
        if (productData[i].title.toLowerCase().startsWith(value.toLowerCase())) {

            productsContent +=`
        <div class="products-container m-4">
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
}
}
document.getElementById("row").innerHTML= productsContent;

    }

