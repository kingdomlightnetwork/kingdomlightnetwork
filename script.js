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

    <script src="translations.js"></script>
<script src="language.js"></script>

});
