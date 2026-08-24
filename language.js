/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL WEBSITE LANGUAGE CONTROLLER
   VERSION 3.0
===================================================== */

(function () {

    "use strict";


    /* =================================================
       DEFAULT LANGUAGE
    ================================================= */

    const DEFAULT_LANGUAGE = "en";


    /* =================================================
       RTL LANGUAGES
    ================================================= */

    const RTL_LANGUAGES = [
        "ur",
        "pa",
        "ar",
        "fa"
    ];


    /* =================================================
       GET GLOBAL TRANSLATIONS
    ================================================= */

    function getTranslations() {

        return window.translations || null;

    }


    /* =================================================
       GET SAVED LANGUAGE
    ================================================= */

    function getSavedLanguage() {

        const translations =
            getTranslations();

        const savedLanguage =
            localStorage.getItem("language");


        if (
            savedLanguage &&
            translations &&
            translations[savedLanguage]
        ) {

            return savedLanguage;

        }


        return DEFAULT_LANGUAGE;

    }


    /* =================================================
       APPLY WEBSITE LANGUAGE
    ================================================= */

    function applyWebsiteLanguage(language) {

        const translations =
            getTranslations();


        /* ---------------------------------------------
           CHECK TRANSLATIONS
        --------------------------------------------- */

        if (!translations) {

            console.error(
                "ERROR: window.translations is not available."
            );

            return;

        }


        /* ---------------------------------------------
           CHECK LANGUAGE
        --------------------------------------------- */

        if (
            !translations[language]
        ) {

            console.error(
                "ERROR: Translation not found for:",
                language
            );

            language =
                DEFAULT_LANGUAGE;

        }


        /* ---------------------------------------------
           SAVE LANGUAGE
        --------------------------------------------- */

        localStorage.setItem(
            "language",
            language
        );


        /* ---------------------------------------------
           GLOBAL CURRENT LANGUAGE
        --------------------------------------------- */

        window.currentLanguage =
            language;


        /* ---------------------------------------------
           HTML LANGUAGE
        --------------------------------------------- */

        document.documentElement.lang =
            language;


        /* ---------------------------------------------
           RTL / LTR
        --------------------------------------------- */

        if (
            RTL_LANGUAGES.includes(language)
        ) {

            document.documentElement.dir =
                "rtl";

        } else {

            document.documentElement.dir =
                "ltr";

        }


        /* ---------------------------------------------
           LANGUAGE DATA
        --------------------------------------------- */

        const languageData =
            translations[language];


        /* ---------------------------------------------
           FIND TRANSLATABLE ELEMENTS
        --------------------------------------------- */

        const elements =
            document.querySelectorAll(
                "[data-translate]"
            );


        console.log(
            "Translatable elements found:",
            elements.length
        );


        /* ---------------------------------------------
           TRANSLATE ELEMENTS
        --------------------------------------------- */

        elements.forEach(function (element) {

            const key =
                element.getAttribute(
                    "data-translate"
                );


            if (!key) {

                return;

            }


            if (
                Object.prototype.hasOwnProperty.call(
                    languageData,
                    key
                )
            ) {

                element.textContent =
                    languageData[key];


                console.log(
                    "Translated:",
                    key,
                    "→",
                    languageData[key]
                );

            } else {

                console.warn(
                    "Translation key not found:",
                    key,
                    "for language:",
                    language
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
           UPDATE PAGE TITLE
        --------------------------------------------- */

        if (
            languageData.siteTitle
        ) {

            document.title =
                languageData.siteTitle;

        }


        /* ---------------------------------------------
           CONSOLE CONFIRMATION
        --------------------------------------------- */

        console.log(
            "=========================================="
        );

        console.log(
            "KINGDOM LIGHT NETWORK LANGUAGE APPLIED"
        );

        console.log(
            "Language:",
            language
        );

        console.log(
            "Direction:",
            document.documentElement.dir
        );

        console.log(
            "=========================================="
        );

    }


    /* =================================================
       WAIT FOR TRANSLATIONS.JS
    ================================================= */

    function waitForTranslations(
        callback,
        attempts = 0
    ) {

        const MAX_ATTEMPTS = 50;


        if (
            window.translations &&
            typeof window.translations === "object"
        ) {

            console.log(
                "translations.js loaded successfully."
            );

            console.log(
                "Available languages:",
                Object.keys(
                    window.translations
                )
            );


            callback();

            return;

        }


        if (
            attempts >= MAX_ATTEMPTS
        ) {

            console.error(
                "ERROR: window.translations could not be found."
            );

            return;

        }


        console.log(
            "Waiting for translations.js..."
        );


        setTimeout(
            function () {

                waitForTranslations(
                    callback,
                    attempts + 1
                );

            },
            100
        );

    }


    /* =================================================
       INITIALIZE LANGUAGE SYSTEM
    ================================================= */

    function initializeLanguageSystem() {

        console.log(
            "=========================================="
        );

        console.log(
            "Kingdom Light Network Language System"
        );

        console.log(
            "Initializing..."
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

        const savedLanguage =
            getSavedLanguage();


        console.log(
            "Saved language:",
            savedLanguage
        );


        /* ---------------------------------------------
           APPLY SAVED LANGUAGE
        --------------------------------------------- */

        applyWebsiteLanguage(
            savedLanguage
        );


        /* ---------------------------------------------
           LANGUAGE CHANGE EVENT
        --------------------------------------------- */

        if (languageSelect) {

            languageSelect.addEventListener(
                "change",
                function () {

                    const selectedLanguage =
                        this.value;


                    console.log(
                        "Language selected:",
                        selectedLanguage
                    );


                    applyWebsiteLanguage(
                        selectedLanguage
                    );


                    console.log(
                        "Language change completed."
                    );

                }
            );

        } else {

            console.error(
                "ERROR: #globalLanguageSelect was not found."
            );

        }

    }


    /* =================================================
       START LANGUAGE SYSTEM
    ================================================= */

    function startLanguageSystem() {

        waitForTranslations(
            initializeLanguageSystem
        );

    }


    /* =================================================
       DOM READY
    ================================================= */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startLanguageSystem
        );

    } else {

        startLanguageSystem();

    }


})();
