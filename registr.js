const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-name")
const elPhone = document.querySelector(".js-phone")
const elEmail = document.querySelector(".js-email")
const elPassword = document.querySelector(".js-password")
const ElEye = document.querySelector(".js-eye");

ElEye.addEventListener("mousedown", function () {
    elPassword.type = "text"

})
ElEye.addEventListener("mouseup", function () {
    elPassword.type = "password"
})

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_name: elInput.value,
            phone: elPhone.value,
            email: elEmail.value,
            password: elPassword.value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token)
                location.replace("main.html")
            }
        })
        .catch((err) => console.log(err));
})
