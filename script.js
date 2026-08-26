// =====================================================
// KINGDOM LIGHT NETWORK
// POWERED BY CHRIST CHURCH
// GLOBAL WEBSITE SCRIPT
// CLEAN & SAFE VERSION
// =====================================================

(function () {

    "use strict";


    // =================================================
    // DOM READY
    // =================================================

    document.addEventListener(
        "DOMContentLoaded",
        function () {


            console.log(
                "Kingdom Light Network is running."
            );


            // =================================================
            // MOBILE MENU
            // =================================================

            const menuButton =
                document.getElementById(
                    "menuToggle"
                );

            const nav =
                document.querySelector(
                    "nav"
                );


            if (
                menuButton &&
                nav
            ) {

                menuButton.addEventListener(
                    "click",
                    function () {

                        nav.classList.toggle(
                            "show"
                        );


                        const isOpen =
                            nav.classList.contains(
                                "show"
                            );


                        menuButton.setAttribute(
                            "aria-expanded",
                            isOpen
                                ? "true"
                                : "false"
                        );


                        menuButton.setAttribute(
                            "aria-label",
                            isOpen
                                ? "Close Menu"
                                : "Open Menu"
                        );

                    }
                );


                // -----------------------------------------
                // CLOSE MOBILE MENU AFTER NAVIGATION
                // -----------------------------------------

                const navLinks =
                    nav.querySelectorAll(
                        "a"
                    );


                navLinks.forEach(
                    function (link) {

                        link.addEventListener(
                            "click",
                            function () {

                                nav.classList.remove(
                                    "show"
                                );


                                menuButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );


                                menuButton.setAttribute(
                                    "aria-label",
                                    "Open Menu"
                                );

                            }
                        );

                    }
                );

            }


            // =================================================
            // CREATE ACCOUNT
            // =================================================

            const openCreateAccount =
                document.getElementById(
                    "openCreateAccount"
                );

            const createAccountForm =
                document.getElementById(
                    "createAccountForm"
                );


            if (
                openCreateAccount &&
                createAccountForm
            ) {

                openCreateAccount.addEventListener(
                    "click",
                    function () {

                        createAccountForm.style.display =
                            "block";


                        openCreateAccount.style.display =
                            "none";


                        createAccountForm.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }


            // =================================================
            // RESEARCH SEARCH
            // =================================================

            const researchQuery =
                document.getElementById(
                    "researchQuery"
                );

            const researchSearchButton =
                document.getElementById(
                    "researchSearchButton"
                );


            if (
                researchQuery &&
                researchSearchButton
            ) {


                // -----------------------------------------
                // SEARCH BUTTON
                // -----------------------------------------

                researchSearchButton.addEventListener(
                    "click",
                    function () {

                        const query =
                            researchQuery.value.trim();


                        if (
                            query === ""
                        ) {

                            alert(
                                "Please enter a topic you want to research."
                            );


                            researchQuery.focus();


                            return;

                        }


                        const searchURL =
                            "https://www.google.com/search?q=" +
                            encodeURIComponent(
                                query
                            );


                        window.open(
                            searchURL,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    }
                );


                // -----------------------------------------
                // ENTER KEY SEARCH
                // -----------------------------------------

                researchQuery.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter"
                        ) {

                            event.preventDefault();


                            researchSearchButton.click();

                        }

                    }
                );

            }


            // =================================================
            // GLOBAL LANGUAGE SYSTEM
            // =================================================
            //
            // Language functionality is handled by
            // language.js.
            //
            // Do NOT duplicate language logic here.
            // =================================================


            // =================================================
            // BIBLE SYSTEM
            // =================================================
            //
            // Bible functionality is handled by:
            //
            // bible-data.js
            // bible-research.js
            //
            // Do NOT duplicate Bible logic here.
            // =================================================


            // =================================================
            // AUDIO SYSTEM
            // =================================================
            //
            // Audio functionality is handled by
            // bible-research.js.
            //
            // This file intentionally does not modify it.
            // =================================================


            // =================================================
            // WEBSITE READY
            // =================================================

            console.log(
                "Kingdom Light Network global script loaded successfully."
            );


        }
    );

})();
