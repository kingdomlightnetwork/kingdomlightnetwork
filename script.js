// Kingdom Light Network
// Powered by Christ Church

document.addEventListener("DOMContentLoaded", function () {

    console.log("Kingdom Light Network is running");


    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");


    if (menuButton) {

        menuButton.addEventListener("click", function () {

            if (nav.style.display === "block") {

                nav.style.display = "none";

            } else {

                nav.style.display = "block";

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
