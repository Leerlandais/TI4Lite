
const checkoutForm = document.getElementById("checkoutForm");
const formElements = checkoutForm.querySelectorAll("input");
const submitButton = document.getElementById("submitButton");
const formData = {};

submitButton.addEventListener("click", (e) => {
    alert("Your order has been successfully submitted!");
    localStorage.removeItem("BASKET");

})

formElements.forEach(element => {
    const key = element.id
    if (key) {
        formData[key] = element;
        element.addEventListener("input", validateForm);
    }
});


function validateForm() {
    let allValid = true;
    formElements.forEach(element => {
        if (!element.value.trim()) {
            allValid = false;
        }

        if (element.type === "email" && !isValidEmail(element.value)) {
            allValid = false;
        }
    });
    submitButton.disabled = !allValid;
    submitButton.disabled ? submitButton.style.opacity = "0.5" : submitButton.style.opacity = "1";
}

function isValidEmail(mail) {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.test(mail);
}

validateForm();