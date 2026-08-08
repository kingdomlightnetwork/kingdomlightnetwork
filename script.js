// Kingdom Light Network
// Powered by Christ Church

document.addEventListener("DOMContentLoaded", function () {

    console.log("Kingdom Light Network is running");


    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");


    if (menuButton) {

        menuButton.addEventListener("click", function () {

          if (nav.classList.contains("show")) {

    nav.classList.remove("show");

} else {

    nav.classList.add("show");

} 

        });

    }


    const buttons = document.querySelectorAll("button");

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            console.log("Button clicked:", button.innerText);

        });

    });

   
});

const openCreateAccount = document.getElementById("openCreateAccount");
const createAccountForm = document.getElementById("createAccountForm");

if (openCreateAccount && createAccountForm) {

    openCreateAccount.addEventListener("click", function () {

        createAccountForm.style.display = "block";

        openCreateAccount.style.display = "none";

        createAccountForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}
