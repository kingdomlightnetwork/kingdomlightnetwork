/* =====================================================
   KINGDOM LIGHT NETWORK
   LANGUAGE SYSTEM
   English • اردو • پنجابی • العربية
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "Kingdom Light Network Language System is running"
    );


    /* =================================================
       LANGUAGE SELECTORS
    ================================================= */

    const languageSelectors =
        document.querySelectorAll(
            "#languageSelect, .language-select, [data-language-select]"
        );


    /* =================================================
       GET SAVED LANGUAGE
    ================================================= */

    let savedLanguage =
        localStorage.getItem("language");


    if (
        !savedLanguage ||
        typeof translations === "undefined" ||
        !translations[savedLanguage]
    ) {

        savedLanguage = "en";

        localStorage.setItem(
            "language",
            savedLanguage
        );

    }


    /* =================================================
       CHANGE LANGUAGE
    ================================================= */

    function changeLanguage(lang) {

        if (
            typeof translations === "undefined"
        ) {

            console.error(
                "translations.js is not loaded."
            );

            return;

        }


        if (
            !translations[lang]
        ) {

            console.warn(
                "Language not available:",
                lang
            );

            return;

        }


        /* Save selected language */

        localStorage.setItem(
            "language",
            lang
        );


        /* Apply translations */

        applyTranslations(
            lang
        );


        console.log(
            "Language changed to:",
            lang
        );

    }


    /* =================================================
       APPLY TRANSLATIONS
    ================================================= */

    function applyTranslations(lang) {

        if (
            typeof translations === "undefined"
        ) {

            console.error(
                "translations.js is not loaded."
            );

            return;

        }


        if (
            !translations[lang]
        ) {

            return;

        }


        /* ---------------------------------------------
           TEXT TRANSLATIONS
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
           PLACEHOLDER TRANSLATIONS
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
           TITLE TRANSLATIONS
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
           UPDATE LANGUAGE SELECTORS
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
       INITIAL LANGUAGE
    ================================================= */

    applyTranslations(
        savedLanguage
    );


    console.log(
        "Kingdom Light Network Language System initialized successfully."
    );

});
