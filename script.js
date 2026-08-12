// Kingdom Light Network
// Powered by Christ Church

document.addEventListener("DOMContentLoaded", function () {

    console.log("Kingdom Light Network is running");


    /* ==============================
       MOBILE MENU
    ============================== */

    const menuButton = document.getElementById("menuToggle");
    const nav = document.querySelector("nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", function () {

            nav.classList.toggle("show");

            const isOpen = nav.classList.contains("show");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close Menu" : "Open Menu"
            );

        });

    }


    /* ==============================
       BUTTON CLICK MESSAGE
    ============================== */

    const buttons = document.querySelectorAll("button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            console.log(
                "Button clicked:",
                button.innerText
            );

        });

    });


    /* ==============================
       CREATE ACCOUNT
    ============================== */

    const openCreateAccount =
        document.getElementById("openCreateAccount");

    const createAccountForm =
        document.getElementById("createAccountForm");

    if (openCreateAccount && createAccountForm) {

        openCreateAccount.addEventListener(
            "click",
            function () {

                createAccountForm.style.display = "block";

                openCreateAccount.style.display = "none";

                createAccountForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* ==============================
       RESEARCH SEARCH
    ============================== */

    const researchQuery =
        document.getElementById("researchQuery");

    const researchSearchButton =
        document.getElementById("researchSearchButton");


    if (researchQuery && researchSearchButton) {

        researchSearchButton.addEventListener(
            "click",
            function () {

                const query =
                    researchQuery.value.trim();


                if (query === "") {

                    alert(
                        "Please enter a topic you want to research."
                    );

                    researchQuery.focus();

                    return;
                }


                const searchURL =
                    "https://www.google.com/search?q=" +
                    encodeURIComponent(query);


                window.open(
                    searchURL,
                    "_blank"
                );

            }
        );


        researchQuery.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    researchSearchButton.click();

                }

            }
        );

    }

});
