const elList = document.querySelector(".js-list")
const localData=localStorage.getItem("token");
const elLogOutBtn =document.querySelector(".js-log-btn");
console.log(localData);
if(!localData){
    location.replace("index.html")
}
elLogOutBtn.addEventListener("click",function(){
    localStorage.removeItem("token")
    location.reload()
})

async function getProduct() {
    const res = await fetch("http://localhost:5000/product", {
        headers: {
            Authorization: localData,
        }
    });
    const data = await res.json()
    renderProduct(data, elList)
}
getProduct()

const renderProduct = (array, node) => {
    node.innerHTML = ""
    array.forEach(el => {
        node.innerHTML += `
            <div class="card " style="width: 18rem;">
            <img src="http://localhost:5000/${el.product_img}" class="card-img-top  bg-secondary bg-opacity-50 w-100" alt="...">
            <div class="card-body">
              <p class="card-title js-card-name mb-2 text-info fw-bold">Product_name:${el.product_name}</p>
              <p class="card-title js-card-desc mb-2 text-warning ">Product_desc:${el.product_desc}</p>
              <p class="card-title js-card-price mb-2">Product_price :${el.product_price} $</p>
              </div>
              </div>
              `
    });
}