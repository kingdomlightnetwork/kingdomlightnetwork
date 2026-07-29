
// Kingdom Light Network
// Powered by Christ Church

document.addEventListener("DOMContentLoaded", function () {

    console.log("Kingdom Light Network is running");

    const buttons = document.querySelectorAll("button");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            console.log("Button clicked:", button.innerText);
        });
    });

});
