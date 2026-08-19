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
       LANGUAGE SELECTOR
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
            !translations[lang]
        ) {

            console.warn(
                "Language not available:",
                lang
            );

            return;

        }


        /* Save language */

        localStorage.setItem(
            "language",
            lang
        );


        /* Set translation language */

        if (
            typeof setTranslationLanguage ===
            "function"
        ) {

            setTranslationLanguage(
                lang
            );

        }


        /* Update page */

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
            !translations[lang]
        ) {

            return;

        }


        /* ---------------------------------------------
           Elements using data-translate
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
                    translations[lang][key]
                ) {

                    element.textContent =
                        translations[lang][key];

                }

            }
        );


        /* ---------------------------------------------
           Elements using data-translate-placeholder
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
                    translations[lang][key]
                ) {

                    element.placeholder =
                        translations[lang][key];

                }

            }
        );


        /* ---------------------------------------------
           Elements using data-translate-title
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
                    translations[lang][key]
                ) {

                    element.title =
                        translations[lang][key];

                }

            }
        );


        /* ---------------------------------------------
           HTML document language
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
           Update language selectors
        --------------------------------------------- */

        languageSelectors.forEach(
            function (selector) {

                selector.value =
                    lang;

            }
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
       GLOBAL LANGUAGE FUNCTION
    ================================================= */

    window.changeLanguage =
        changeLanguage;


    /* =================================================
       INITIAL LANGUAGE
    ================================================= */

    if (
        typeof setTranslationLanguage ===
        "function"
    ) {

        setTranslationLanguage(
            savedLanguage
        );

    }


    applyTranslations(
        savedLanguage
    );


    console.log(
        "Kingdom Light Network Language System initialized successfully."
    );

});
