/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL WEBSITE LANGUAGE CONTROLLER
   CLEAN STABLE VERSION
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
        "fa",
        "he",
        "arc"
    ];


    /* =================================================
       GET TRANSLATIONS
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
            Object.prototype.hasOwnProperty.call(
                translations,
                savedLanguage
            )
        ) {

            return savedLanguage;

        }


        return DEFAULT_LANGUAGE;

    }


    /* =================================================
       SET PAGE DIRECTION
    ================================================= */

    function setPageDirection(language) {

        const isRTL =
            RTL_LANGUAGES.includes(language);


        document.documentElement.lang =
            language;


        document.documentElement.dir =
            isRTL ? "rtl" : "ltr";

    }


    /* =================================================
       APPLY TRANSLATIONS
    ================================================= */

    function applyWebsiteLanguage(language) {

        const translations =
            getTranslations();


        /* ---------------------------------------------
           CHECK TRANSLATIONS
        --------------------------------------------- */

        if (
            !translations ||
            typeof translations !== "object"
        ) {

            console.error(
                "Kingdom Light Network: translations.js is not ready."
            );

            return;

        }


        /* ---------------------------------------------
           CHECK LANGUAGE
        --------------------------------------------- */

        if (
            !Object.prototype.hasOwnProperty.call(
                translations,
                language
            )
        ) {

            console.warn(
                "Language not found:",
                language,
                "Using default language:",
                DEFAULT_LANGUAGE
            );

            language =
                DEFAULT_LANGUAGE;

        }


        /* ---------------------------------------------
           LANGUAGE DATA
        --------------------------------------------- */

        const languageData =
            translations[language];


        if (
            !languageData ||
            typeof languageData !== "object"
        ) {

            console.error(
                "Invalid translation data for:",
                language
            );

            return;

        }


        /* ---------------------------------------------
           SAVE LANGUAGE
        --------------------------------------------- */

        try {

            localStorage.setItem(
                "language",
                language
            );

        } catch (error) {

            console.warn(
                "Could not save language preference:",
                error
            );

        }


        /* ---------------------------------------------
           GLOBAL CURRENT LANGUAGE
        --------------------------------------------- */

        window.currentLanguage =
            language;


        /* ---------------------------------------------
           PAGE LANGUAGE + DIRECTION
        --------------------------------------------- */

        setPageDirection(
            language
        );


        /* ---------------------------------------------
           TRANSLATE PAGE ELEMENTS
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


            if (
                Object.prototype.hasOwnProperty.call(
                    languageData,
                    key
                )
            ) {

                element.textContent =
                    languageData[key];

            }

        });


        /* ---------------------------------------------
           UPDATE GLOBAL LANGUAGE SELECTOR
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
           LANGUAGE EVENT
        --------------------------------------------- */

        window.dispatchEvent(
            new CustomEvent(
                "languageChanged",
                {
                    detail: {
                        language: language
                    }
                }
            )
        );


        /* ---------------------------------------------
           CONFIRMATION
        --------------------------------------------- */

        console.log(
            "Kingdom Light Network language applied:",
            language
        );

    }


    /* =================================================
       WAIT FOR TRANSLATIONS.JS
    ================================================= */

    function waitForTranslations(
        callback,
        attempts
    ) {

        attempts =
            attempts || 0;


        const MAX_ATTEMPTS =
            50;


        if (
            window.translations &&
            typeof window.translations === "object"
        ) {

            callback();

            return;

        }


        if (
            attempts >= MAX_ATTEMPTS
        ) {

            console.error(
                "Kingdom Light Network: translations.js could not be loaded."
            );

            return;

        }


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

        const translations =
            getTranslations();


        if (
            !translations ||
            typeof translations !== "object"
        ) {

            console.error(
                "Language system initialization failed."
            );

            return;

        }


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


        /* ---------------------------------------------
           APPLY SAVED LANGUAGE
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


                    if (
                        !selectedLanguage
                    ) {

                        return;

                    }


                    applyWebsiteLanguage(
                        selectedLanguage
                    );

                }
            );

        }


        /* ---------------------------------------------
           GLOBAL LANGUAGE FUNCTION
           Can be used by other pages/scripts
        --------------------------------------------- */

        window.setWebsiteLanguage =
            function (language) {

                if (!language) {

                    return;

                }


                applyWebsiteLanguage(
                    language
                );

            };


        /* ---------------------------------------------
           LANGUAGE SYSTEM READY
        --------------------------------------------- */

        window.languageSystemReady =
            true;


        window.dispatchEvent(
            new Event(
                "languageSystemReady"
            )
        );


        console.log(
            "Kingdom Light Network Language System Ready."
        );

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
