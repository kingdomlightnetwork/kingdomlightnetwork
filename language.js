/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL WEBSITE LANGUAGE CONTROLLER
===================================================== */


/* =====================================================
   GLOBAL LANGUAGE CONTROLLER
===================================================== */

(function () {

    "use strict";


    /* =================================================
       APPLY LANGUAGE
    ================================================= */

    function applyWebsiteLanguage(language) {

        /* ---------------------------------------------
           CHECK LANGUAGE DATA
        --------------------------------------------- */

        if (
            typeof translations === "undefined" ||
            !translations[language]
        ) {

            console.error(
                "Language data not found:",
                language
            );

            return;

        }


        /* ---------------------------------------------
           SAVE LANGUAGE
        --------------------------------------------- */

        localStorage.setItem(
            "language",
            language
        );


        /* ---------------------------------------------
           SET GLOBAL CURRENT LANGUAGE
        --------------------------------------------- */

        if (
            typeof window.currentLanguage !== "undefined"
        ) {

            window.currentLanguage = language;

        }


        /* ---------------------------------------------
           TRANSLATE ALL ELEMENTS
        --------------------------------------------- */

        const elements =
            document.querySelectorAll(
                "[data-translate]"
            );


        elements.forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-translate"
                );


            if (!key) {
                return;
            }


            /* -----------------------------------------
               FIND TRANSLATION
            ----------------------------------------- */

            let translatedText;


            if (
                translations[language] &&
                translations[language][key] !== undefined
            ) {

                translatedText =
                    translations[language][key];

            }


            /* -----------------------------------------
               APPLY TRANSLATION
            ----------------------------------------- */

            if (
                translatedText !== undefined
            ) {

                element.textContent =
                    translatedText;

            }

        });


        /* ---------------------------------------------
           UPDATE LANGUAGE SELECTOR
        --------------------------------------------- */

        const languageSelect =
            document.getElementById(
                "globalLanguageSelect"
            );


        if (languageSelect) {

            languageSelect.value =
                language;

        }


        /* ---------------------------------------------
           UPDATE HTML LANGUAGE
        --------------------------------------------- */

        document.documentElement.lang =
            language;


        /* ---------------------------------------------
           RTL LANGUAGES
        --------------------------------------------- */

        if (
            language === "ur" ||
            language === "pa" ||
            language === "ar" ||
            language === "fa"
        ) {

            document.documentElement.dir =
                "rtl";

        } else {

            document.documentElement.dir =
                "ltr";

        }


        /* ---------------------------------------------
           CONSOLE MESSAGE
        --------------------------------------------- */

        console.log(
            "Kingdom Light Network language changed to:",
            language
        );

    }



    /* =================================================
       START LANGUAGE SYSTEM
    ================================================= */

    function initializeLanguageSystem() {

        console.log(
            "Kingdom Light Network Language Controller started."
        );


        /* ---------------------------------------------
           LANGUAGE SELECTOR
        --------------------------------------------- */

        const languageSelect =
            document.getElementById(
                "globalLanguageSelect"
            );


        /* ---------------------------------------------
           GET SAVED LANGUAGE
        --------------------------------------------- */

        let savedLanguage =
            localStorage.getItem(
                "language"
            );


        /* ---------------------------------------------
           DEFAULT LANGUAGE
        --------------------------------------------- */

        if (
            !savedLanguage ||
            typeof translations === "undefined" ||
            !translations[savedLanguage]
        ) {

            savedLanguage = "en";

        }


        /* ---------------------------------------------
           APPLY INITIAL LANGUAGE
        --------------------------------------------- */

        applyWebsiteLanguage(
            savedLanguage
        );


        /* ---------------------------------------------
           LANGUAGE SELECTOR EVENT
        --------------------------------------------- */

        if (languageSelect) {

            languageSelect.addEventListener(
                "change",
                function () {

                    const selectedLanguage =
                        this.value;


                    console.log(
                        "Selected language:",
                        selectedLanguage
                    );


                    applyWebsiteLanguage(
                        selectedLanguage
                    );

                }
            );

        } else {

            console.error(
                "globalLanguageSelect was not found."
            );

        }

    }



    /* =================================================
       WAIT FOR PAGE
    ================================================= */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeLanguageSystem
        );

    } else {

        initializeLanguageSystem();

    }


})();
