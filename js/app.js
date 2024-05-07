// const ApiUrl = 'https://jvjcwtfyaeklbdxmkywu.supabase.co'
// const ApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2amN3dGZ5YWVrbGJkeG1reXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2NDc1NjEsImV4cCI6MjAxMzIyMzU2MX0.EtjfadRMfJ4M2rbfJgyX8ygeFef3Y-jRtsMKiwewlUc"
// const supabase = createClient(ApiUrl, ApiKey)

// let a = fetch("url" , {
//     method : "GET",
//     body: JSON.stringify({
//         email:"",
//         password:""
//     }),
//     header:{
//         "Content-Type": "application/json",
//         Authorization:""
//     }
// } );

// function getFile(event){
//     console.log(event.target.value);
//     let reader = new FileReader();
//     reader.onload = function(){
//         let dataURL = reader.result;
//         console.log(dataURL);
//     };
// console.log(reader.readAsDataURL(event.target.files[0]));
// }

// const {data , error} = await supabase.storage.creatBucket('images' ,{
//     public:true,
//     allowedMimeTypes: ['image/png'],
//     fileSizeLimit:1024
// });


// Api Products


 //=======>> Start Nav Dashboard <<============//

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

 //=======>> END Nav Dashboard <<============//

//=========>>Start Api Products<<============//

let apiUrl = "https://dummyjson.com/products";
let productData = [];
let thisPage = 1;
let limit = 9;
let list = document.querySelectorAll('.productBox');

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
            <div class="productBox">
               <div class="item">
               <img class="card-img-top" src="${productData[i].images[0]}" alt=""/>
               <h3 class="card-title">${productData[i].title.slice(0,20)}...</h3>
               <p class="price">Price: $${productData[i].price}</p>
           
             <a href="#" onclick="showDetails(${productData.id})" class="btn btn-details text-white flex-fill">Show Details <i class="fa-solid fa-eye"></i></a>

             <a href="#" type="button" class="btn btn-add text-capitalize text-white flex-fill "
             onclick="addToCart(${i},${productData[i].id})">Add to cart <i class="fa-solid fa-cart-shopping"></i></a>
             </div>
               </div>
  
            `;
        }
    }
    productsRow.innerHTML = productsContent;
    listPage();

}
getDataPro()


function showDetails(id) {
  let product = productData.find(product => product.id === id);
  document.getElementById("modal-title").innerText = product.title;
  document.getElementById("modal-description").innerText = product.description;
  document.getElementById("modal-price").innerText = product.price;

  document.getElementById("popModal").style.display = "block";
}

function closeModal() {
  document.getElementById("popModal").style.display = "none";
}

window.onclick = function(event) {
  if (event.target == document.getElementById("popModal")) {
      document.getElementById("popModal").style.display = "none";
  }
}


async function productApi() {
    const data = await fetch(apiUrl);
    const res = await data.json();
    productData = res.products;
    return data;
}
getDataPro();

///////////////////////////////////////////////////////


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

let cart;
if (localStorage.getItem('cartData') !== null) {
  cart = JSON.parse(localStorage.getItem('cartData'));
} else {
  cart = [];
}

// Function Add Products To Cart

function addToCart(productIndex, productId) {
  let existingItem = null;
  let targetProduct = productData[productIndex];

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      existingItem = cart[i];
    }
  }

  if (existingItem !== null) {
    existingItem.quantity++;
  } else {
    targetProduct.quantity = 1;
    cart.push(targetProduct);
  }

  localStorage.setItem('cartData', JSON.stringify(cart));
}



// async function getDataPro() {
//   await productApi();
//   console.log(productData);
//   let beginGet = limit * (thisPage - 1);
//   let endGet = limit * thisPage - 1;
//   let productsRow = document.getElementById("product-list");

//   let productsContent = '';

//   for (let i = beginGet; i <= endGet; i++) {
//       if (productData[i]) {
//           let product = productData[i];
//           productsContent += `
//           <div class="card">
//               <img class="card-img-top" src="${product.image}" alt="...">
//               <div class="card-body">
//                   <h5 class="card-title">${product.title}</h5>
//                   <p class="card-text">${product.description}</p>
//                   <p class="card-text">${product.price}</p>
//                   <a href="#" onclick="showDetails(${product.id})" class="btn btn-details text-white flex-fill">Show Details</a>
//               </div>
//           </div>
//           `;
//       }
//   }

//   productsRow.innerHTML = productsContent;
//   listPage();
// }
// getDataPro();


// async function getDataPro() {
//   await productApi();
//   console.log(productData);
//   let beginGet = limit * (thisPage - 1);
//   let endGet = limit * thisPage - 1;
//   let productsRow = document.getElementById("product-list");

//   let productsContent = '';

//   for (let i = beginGet; i <= endGet; i++) {
//       if(i < productData.length){
//           productsContent += `
//           <div class="modal">
//               <div class="modal-header">
//                   <h2>${productData[i].title}</h2>
//                   <button onclick="closeModal()">Close Modal</button>
//               </div>
//               <div class="modal-content">
//                   <div class="productBox">
//                      <div class="item">
//                      <img class="card-img-top" src="${productData[i].images[0]}" alt=""/>
//                      <h3 class="card-title">${productData[i].title.slice(0,20)}...</h3>
//                      <p class="price">Price: $${productData[i].price}</p>
                 
//                    <a href="#" onclick="showDetails(${productData.id})" class="btn btn-details text-white flex-fill">Show Details <i class="fa-solid fa-eye"></i></a>

//                    <a href="#" type="button" class="btn btn-add text-capitalize text-white flex-fill "
//                    onclick="addToCart(${i},${productData[i].id})">Add to cart <i class="fa-solid fa-cart-shopping"></i></a>
//                    </div>
//                      </div>
//               </div>
//           </div>

//           `;
//       }
//   }
//   productsRow.innerHTML = productsContent;
//   listPage();

// }
// getDataPro();


// <p class="description">${productData[i].description.slice(0,25)}...</p>
/*{ <p class="brand">Brand: ${productData[i].brand}</p>
<p class="discount">Discount: ${productData[i].discountPercentage}</p> }*/

