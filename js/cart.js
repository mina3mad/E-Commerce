let cartRow = document.getElementById("cart__row");
let cartTotalElement = document.getElementById('total');
let deleteAllElement = document.getElementById('deleteAll');
let sidebar = document.querySelector(".sidebar_menu");
let closeBtn = document.querySelector("#Button");
let searchBtn = document.querySelector(".bx-search");

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

async function displaycartData(cartData) {
    // await productApi();
    console.log(cartData);

    let cartDataContent = '';

    for (let i = 0 ; i <  cartData.length ; i++){

        cartDataContent += `
            <div class="productBox">
               <div class="item">
               <img class="card-img-top" src=${cartData[i].images[0]} alt=""/>
               <h3 class="card-title">${cartData[i].title.slice(0,35)}...</h3>
               <p class="price">Price: $${cartData[i].price}</p>
               <p class="brand">Brand: ${cartData[i].brand}</p>
               <p class="discount">Discount: ${cartData[i].discountPercentage}</p>
             
               <div class="btns">
               <button class="btn btn-increase" onclick="increaseCount(${i})"><i class="fa-solid fa-plus"></i></button>
               ${cartData[i].quantity}
               <button class="btn btn-decrease" onclick="decreaseCount(${i})"><i class="fa-solid fa-minus"></i></button>
               </div>
               <button class="btn btn-delete text-white" onclick="deleteData(${i})">Delete <i class="fa-solid fa-trash"></i></button>
               <a href="#" class="btn btn-view text-white">View Details<i class="fa-regular fa-eye"></i></a>
               </div>
               </div>
    
            `;
        
    }
    cartRow.innerHTML=cartDataContent;

}

displaycartData()

// <p class="description">${cartData[i].description.slice(0,25)}...</p>
// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// // Wrong way to access data before promise is resolved
// // console.log(cart.length); // Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'length')

// // Correct way to access data in promise
// getCartData().then(cart => {
//     console.log(cart.length);
// });

// async function getCartData() {
//     let cartData = JSON.parse(localStorage.getItem('cartData')) || [];
//     return cartData;
// }

// let cartData = JSON.parse(localStorage.getItem('cartData'));

// if (cartData) {
//     console.log(cartData.length);
// } else {
//     console.log('Cart is empty');
// }


let  cartData = JSON.parse(localStorage.getItem('cartData'));

if (cartData.lenght !== null) {
    displaycartData(cartData);
  getTotal();
  deleteAllElement.innerHTML = `
            <button class="btn btn-deleteAll text-white" id="deleteAll" onclick="deleteAll()">
              Delete All (${cartData.length}) <i class="fa-solid fa-trash"></i>
            </button>
  `;
} else {
  cartRow.innerHTML =
    `<h2 class="text-capitalize text-white">There's No Products In Your Cart</h2>`;
  deleteAllElement.innerHTML = '';
}

// Function ( get total)
function getTotal() {
  let total = 0;
  for (let i = 0; i <  cartData.length ; i++) {
    total +=  cartData[i].price *  cartData[i].quantity;
  }

  if (total === 0) {
    deleteAllElement.innerHTML = '';
    cartTotalElement.innerHTML = '';
    cartRow.innerHTML =
      `<h2 class="text-capitalize text-center text-white emptyCart " id="emptyCart">There's No Products In Your Cart</h2>`;
  } else {
    cartTotalElement.innerHTML = `Total is : ${total} $`;
  }
 
}



// Function (Delete Item)
function deleteData(i) {
   cartData.splice(i, 1);
  saveDataProducts();
}

// Function (Delete All)
function deleteAll() {
   cartData.splice(0);
  localStorage.removeItem('cartData');
displaycartData(cartData);
  getTotal();
}

//=============================
// function deleteAll() {
//   cartData.splice(0);
//  localStorage.clear();
//  getTotal();
// }
//=============================

// function (increase)
function increaseCount(i) {
   cartData[i].quantity++;
  saveDataProducts();
}

// function (decrease)
function decreaseCount(i) {
  if ( cartData[i].quantity > 1) {
     cartData[i].quantity--;
  } else {
     cartData.splice(i, 1);
     localStorage.removeItem('cartData');
  }

displaycartData(cartData);
  getTotal();
}

// function (Save Data)
function saveDataProducts() {
  localStorage.setItem('cartData', JSON.stringify(cartData));
 displaycartData(cartData);
  getTotal();
}








