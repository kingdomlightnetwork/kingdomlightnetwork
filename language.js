/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL WEBSITE LANGUAGE SYSTEM
   Central Language Selector
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "Kingdom Light Network Global Language System is running"
    );


    /* =================================================
       LANGUAGE SELECTORS
    ================================================= */

    const languageSelectors =
        document.querySelectorAll(
            "#globalLanguageSelect, #languageSelect, .language-select, [data-language-select]"
        );


    /* =================================================
       CHECK TRANSLATION SYSTEM
    ================================================= */

    if (
        typeof translations === "undefined"
    ) {

        console.error(
            "translations.js is not loaded."
        );

        return;

    }


    /* =================================================
       GET SAVED LANGUAGE
    ================================================= */

    let savedLanguage =
        localStorage.getItem("language");


    if (
        !savedLanguage ||
        !translations[savedLanguage]
    ) {

        savedLanguage = "en";

        localStorage.setItem(
            "language",
            savedLanguage
        );

    }


    /* =================================================
       CHANGE WEBSITE LANGUAGE
    ================================================= */

    function changeLanguage(lang) {

        if (
            !translations[lang]
        ) {

            console.warn(
                "Language not available:",
                lang
            );

            return;

        }


        /* ---------------------------------------------
           SAVE LANGUAGE
        --------------------------------------------- */

        localStorage.setItem(
            "language",
            lang
        );


        /* ---------------------------------------------
           APPLY TRANSLATIONS
        --------------------------------------------- */

        applyTranslations(
            lang
        );


        console.log(
            "Global website language changed to:",
            lang
        );

    }


    /* =================================================
       APPLY TRANSLATIONS
    ================================================= */

    function applyTranslations(lang) {

        if (
            !translations[lang]
        ) {

            return;

        }


        /* ---------------------------------------------
           TEXT
        --------------------------------------------- */

        const elements =
            document.querySelectorAll(
                "[data-translate]"
            );


        elements.forEach(
            function (element) {

                const key =
                    element.getAttribute(
                        "data-translate"
                    );


                if (
                    translations[lang][key] !== undefined
                ) {

                    element.textContent =
                        translations[lang][key];

                }

            }
        );


        /* ---------------------------------------------
           PLACEHOLDERS
        --------------------------------------------- */

        const placeholders =
            document.querySelectorAll(
                "[data-translate-placeholder]"
            );


        placeholders.forEach(
            function (element) {

                const key =
                    element.getAttribute(
                        "data-translate-placeholder"
                    );


                if (
                    translations[lang][key] !== undefined
                ) {

                    element.placeholder =
                        translations[lang][key];

                }

            }
        );


        /* ---------------------------------------------
           TITLES
        --------------------------------------------- */

        const titles =
            document.querySelectorAll(
                "[data-translate-title]"
            );


        titles.forEach(
            function (element) {

                const key =
                    element.getAttribute(
                        "data-translate-title"
                    );


                if (
                    translations[lang][key] !== undefined
                ) {

                    element.title =
                        translations[lang][key];

                }

            }
        );


        /* ---------------------------------------------
           HTML LANGUAGE
        --------------------------------------------- */

        document.documentElement.lang =
            lang;


        /* ---------------------------------------------
           RTL / LTR
        --------------------------------------------- */

        if (
            lang === "ur" ||
            lang === "pa" ||
            lang === "ar"
        ) {

            document.documentElement.dir =
                "rtl";

        } else {

            document.documentElement.dir =
                "ltr";

        }


        /* ---------------------------------------------
           UPDATE ALL LANGUAGE SELECTORS
        --------------------------------------------- */

        languageSelectors.forEach(
            function (selector) {

                selector.value =
                    lang;

            }
        );


        /* ---------------------------------------------
           SAVE CURRENT LANGUAGE
        --------------------------------------------- */

        localStorage.setItem(
            "language",
            lang
        );

    }


    /* =================================================
       LANGUAGE SELECTOR EVENTS
    ================================================= */

    languageSelectors.forEach(
        function (selector) {

            selector.addEventListener(
                "change",
                function () {

                    changeLanguage(
                        selector.value
                    );

                }
            );

        }
    );


    /* =================================================
       GLOBAL FUNCTION
    ================================================= */

    window.changeLanguage =
        changeLanguage;


    /* =================================================
       APPLY SAVED LANGUAGE
    ================================================= */

    applyTranslations(
        savedLanguage
    );


    /* =================================================
       SYSTEM READY
    ================================================= */

    console.log(
        "Kingdom Light Network Global Language System initialized successfully."
    );

});
