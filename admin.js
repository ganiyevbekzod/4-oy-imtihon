const elForm = document.querySelector(".js-form")
const elNameInput = document.querySelector(".js-name-input");
const elDescInput = document.querySelector(".js-desc-input");
const elImgInput = document.querySelector(".js-img-input");
const elPriceInput = document.querySelector(".js-price-input");
const elList = document.querySelector(".js-list")
const localData = localStorage.getItem("token");
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
            <img src="http://localhost:5000/${el.product_img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title js-card-name mb-2">Product_name :${el.product_name}</h5>
              <h5 class="card-title js-card-desc mb-2">Product_desc :${el.product_desc}</h5>
              <p class="card-title js-card-price mb-2">Product_price :${el.product_price}</p>
              <button data-bs-toggle="modal" data-bs-target="#staticBackdrop type="button" data-product-id=${el.id} class="btn btn-warning mt-3 product-edit">EDIT</button>
              <button data-product-id=${el.id} class="btn btn-danger  mt-3 ms-2 product-delete">DELETE</button>
              <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      ...
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Understood</button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>`
    });
}

elForm.addEventListener("submit", function (evt) {
    const formData = new FormData();
    formData.append("product_name", elNameInput.value)
    formData.append("product_desc", elDescInput.value)
    formData.append("product_img", elImgInput.files[0])
    formData.append("product_price", elPriceInput.value)
    evt.preventDefault()
    fetch("http://localhost:5000/product", {
        method: "POST",
        headers: {
            Authorization: localData,
        },
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
})

const deleteProduct = (id) => {
    fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: localData,
        },
    }).then((res) => res.json())
        .then((data) => {

            if (data) {
                getProduct()
            }
        }
        )
        .catch((err) => console.log(err))
}

elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".product-delete")) {
        const productId = (evt.target.dataset.productId);
        deleteProduct(productId)
    }
    if (evt.target.matches(".product-edit")) {
        const productId = evt.target.dataset.productId;


        editProduct(productId)
    }
})

const editProduct=(id)=>{
    fetch(`http://localhost:5000/product/${id}`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json",
            Authorization: localData,
        },
        body:JSON.stringify({
            product_name:`${newValueName}`,
            product_desc:`${newValueDesc}`,
            product_price:`${newValuePrice}`,
        })
    }).then((res)=>res.json())
    .then((data)=>{
        if(data){
            getProduct()
        }
    })
    .catch((err)=>console.log(err))
}



