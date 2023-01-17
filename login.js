const elForm = document.querySelector(".js-form");
const elInputEmail = document.querySelector(".js-inputemail");
const elInputPassword = document.querySelector(".js-password");
const elEye = document.querySelector(".js-eye");
const elTitle=document.querySelector(".js-title")

elEye.addEventListener("mousedown", function () {
    elInputPassword.type = "text"

})
elEye.addEventListener("mouseup", function () {
    elInputPassword.type = "password"
})

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: elInputEmail.value,
            password: elInputPassword.value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.token) {
                localStorage.setItem("token", data.token)
                location.replace("main.html")
            }
            else{
                elTitle.innerHTML="<b>AFSUSKI SIZ RO'YHATDAN O'TMAGANSIZ REGISTR BO'LIMIGA KIRIB RO'YHATDAN O'TING<b>"
            }
        })
        .catch((err) => console.log(err));
})