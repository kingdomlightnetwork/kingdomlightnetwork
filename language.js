/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL WEBSITE LANGUAGE CONTROLLER
   VERSION 2.0
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
       GET LANGUAGE FROM STORAGE
    ================================================= */

    function getSavedLanguage() {

        const savedLanguage =
            localStorage.getItem("language");

        if (
            savedLanguage &&
            typeof translations !== "undefined" &&
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

        /* ---------------------------------------------
           CHECK TRANSLATION SYSTEM
        --------------------------------------------- */

        if (
            typeof translations === "undefined"
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
            !translations[language]
        ) {

            console.error(
                "ERROR: Translation not found for:",
                language
            );

            language = DEFAULT_LANGUAGE;

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
           FIND ALL TRANSLATABLE ELEMENTS
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


            const languageData =
                translations[language];


            if (
                languageData &&
                Object.prototype.hasOwnProperty.call(
                    languageData,
                    key
                )
            ) {

                const translatedText =
                    languageData[key];


                /* -------------------------------------
                   CHANGE TEXT
                ------------------------------------- */

                element.textContent =
                    translatedText;


                console.log(
                    "Translated:",
                    key,
                    "→",
                    translatedText
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
            translations[language].siteTitle
        ) {

            document.title =
                translations[language].siteTitle;

        }


        /* ---------------------------------------------
           CONSOLE CONFIRMATION
        --------------------------------------------- */

        console.log(
            "=========================================="
        );

        console.log(
            "Kingdom Light Network Language Applied"
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
            typeof translations !== "undefined"
        ) {

            console.log(
                "translations.js loaded successfully."
            );

            callback();

            return;

        }


        if (
            attempts >= MAX_ATTEMPTS
        ) {

            console.error(
                "ERROR: translations.js could not be found."
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
                        "=========================================="
                    );

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

                    console.log(
                        "=========================================="
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
       START SYSTEM AFTER PAGE LOAD
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
