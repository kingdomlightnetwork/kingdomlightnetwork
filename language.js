/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL WEBSITE LANGUAGE CONTROLLER
   VERSION 2.0
===================================================== */

(function () {

    "use strict";

    /* =================================================
       APPLY WEBSITE LANGUAGE
    ================================================= */

    function applyWebsiteLanguage(language) {

        /* ---------------------------------------------
           CHECK TRANSLATION SYSTEM
        --------------------------------------------- */

        if (
            typeof window.translations === "undefined"
        ) {

            console.error(
                "ERROR: translations.js is not loaded."
            );

            return;

        }


        /* ---------------------------------------------
           CHECK SELECTED LANGUAGE
        --------------------------------------------- */

        if (
            !window.translations[language]
        ) {

            console.error(
                "ERROR: Translation not found for:",
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
           SET GLOBAL LANGUAGE
        --------------------------------------------- */

        window.currentLanguage =
            language;


        /* ---------------------------------------------
           UPDATE HTML LANGUAGE
        --------------------------------------------- */

        document.documentElement.lang =
            language;


        /* ---------------------------------------------
           RTL / LTR
        --------------------------------------------- */

        const rtlLanguages = [
            "ur",
            "pa",
            "ar",
            "fa"
        ];


        if (
            rtlLanguages.includes(language)
        ) {

            document.documentElement.dir =
                "rtl";

        } else {

            document.documentElement.dir =
                "ltr";

        }


        /* ---------------------------------------------
           TRANSLATE ALL PAGE ELEMENTS
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


            const languageData =
                window.translations[language];


            if (
                languageData &&
                Object.prototype.hasOwnProperty.call(
                    languageData,
                    key
                )
            ) {

                element.textContent =
                    languageData[key];

            } else {

                console.warn(
                    "Translation key not found:",
                    language,
                    key
                );

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
           SUCCESS MESSAGE
        --------------------------------------------- */

        console.log(
            "Language applied successfully:",
            language
        );

    }



    /* =================================================
       INITIALIZE LANGUAGE SYSTEM
    ================================================= */

    function initializeLanguageSystem() {

        console.log(
            "======================================"
        );

        console.log(
            "Kingdom Light Network Language System"
        );

        console.log(
            "Initializing..."
        );

        console.log(
            "======================================"
        );


        /* ---------------------------------------------
           CHECK TRANSLATIONS
        --------------------------------------------- */

        if (
            typeof window.translations === "undefined"
        ) {

            console.error(
                "ERROR: translations.js is not available."
            );

            return;

        }


        /* ---------------------------------------------
           FIND LANGUAGE SELECTOR
        --------------------------------------------- */

        const languageSelect =
            document.getElementById(
                "globalLanguageSelect"
            );


        if (!languageSelect) {

            console.error(
                "ERROR: globalLanguageSelect not found."
            );

            return;

        }


        /* ---------------------------------------------
           GET SAVED LANGUAGE
        --------------------------------------------- */

        let savedLanguage =
            localStorage.getItem(
                "language"
            );


        /* ---------------------------------------------
           CHECK SAVED LANGUAGE
        --------------------------------------------- */

        if (
            !savedLanguage ||
            !window.translations[savedLanguage]
        ) {

            savedLanguage =
                "en";

        }


        /* ---------------------------------------------
           APPLY SAVED LANGUAGE
        --------------------------------------------- */

        applyWebsiteLanguage(
            savedLanguage
        );


        /* ---------------------------------------------
           LANGUAGE CHANGE EVENT
        --------------------------------------------- */

        languageSelect.addEventListener(
            "change",
            function () {

                const selectedLanguage =
                    this.value;


                console.log(
                    "User selected language:",
                    selectedLanguage
                );


                applyWebsiteLanguage(
                    selectedLanguage
                );

            }
        );


        console.log(
            "Language selector connected successfully."
        );

    }



    /* =================================================
       WAIT FOR DOM
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
