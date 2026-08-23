/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL WEBSITE LANGUAGE CONTROLLER
===================================================== */

(function () {

    "use strict";


    /* =================================================
       DEFAULT LANGUAGE
    ================================================= */

    let currentLanguage =
        localStorage.getItem("language") || "en";


    /* =================================================
       CHECK TRANSLATIONS
    ================================================= */

    function languageExists(language) {

        return (
            typeof translations !== "undefined" &&
            translations &&
            translations[language]
        );

    }


    /* =================================================
       SET LANGUAGE
    ================================================= */

    function setTranslationLanguage(language) {

        if (!languageExists(language)) {

            console.warn(
                "Translation language not found:",
                language
            );

            language = "en";

        }


        currentLanguage = language;

        localStorage.setItem(
            "language",
            language
        );


        applyTranslations();

    }


    /* =================================================
       GET TRANSLATION
    ================================================= */

    function getTranslation(key) {

        if (!languageExists(currentLanguage)) {

            return undefined;

        }


        const languageData =
            translations[currentLanguage];


        if (
            languageData &&
            Object.prototype.hasOwnProperty.call(
                languageData,
                key
            )
        ) {

            return languageData[key];

        }


        /* ---------------------------------------------
           FALLBACK TO ENGLISH
        --------------------------------------------- */

        if (
            translations.en &&
            Object.prototype.hasOwnProperty.call(
                translations.en,
                key
            )
        ) {

            return translations.en[key];

        }


        return undefined;

    }


    /* =================================================
       APPLY ALL TRANSLATIONS
    ================================================= */

    function applyTranslations() {

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


            const translatedText =
                getTranslation(key);


            if (
                translatedText !== undefined
            ) {

                element.textContent =
                    translatedText;

            }

        });


        /* =================================================
           UPDATE LANGUAGE SELECTOR
        ================================================= */

        const languageSelect =
            document.getElementById(
                "globalLanguageSelect"
            );


        if (languageSelect) {

            languageSelect.value =
                currentLanguage;

        }


        /* =================================================
           UPDATE HTML LANGUAGE
        ================================================= */

        document.documentElement.lang =
            currentLanguage;


        /* =================================================
           UPDATE TEXT DIRECTION
        ================================================= */

        if (
            currentLanguage === "ur" ||
            currentLanguage === "pa" ||
            currentLanguage === "ar" ||
            currentLanguage === "fa"
        ) {

            document.documentElement.dir =
                "rtl";

        } else {

            document.documentElement.dir =
                "ltr";

        }


        console.log(
            "Language applied:",
            currentLanguage
        );

    }


    /* =================================================
       INITIALIZE
    ================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            console.log(
                "Kingdom Light Network Language Controller started."
            );


            /* -----------------------------------------
               CHECK TRANSLATION FILE
            ----------------------------------------- */

            if (
                typeof translations ===
                "undefined"
            ) {

                console.error(
                    "ERROR: translations.js was not loaded."
                );

                return;

            }


            console.log(
                "Available languages:",
                Object.keys(translations)
            );


            /* -----------------------------------------
               LANGUAGE SELECTOR
            ----------------------------------------- */

            const languageSelect =
                document.getElementById(
                    "globalLanguageSelect"
                );


            /* -----------------------------------------
               LOAD SAVED LANGUAGE
            ----------------------------------------- */

            if (
                !languageExists(
                    currentLanguage
                )
            ) {

                currentLanguage =
                    "en";

            }


            /* -----------------------------------------
               INITIAL APPLY
            ----------------------------------------- */

            applyTranslations();


            /* -----------------------------------------
               SELECTOR EVENT
            ----------------------------------------- */

            if (languageSelect) {

                languageSelect.value =
                    currentLanguage;


                languageSelect.addEventListener(
                    "change",
                    function () {

                        const selectedLanguage =
                            this.value;


                        console.log(
                            "Language selected:",
                            selectedLanguage
                        );


                        setTranslationLanguage(
                            selectedLanguage
                        );

                    }
                );

            } else {

                console.warn(
                    "Language selector not found."
                );

            }

        }
    );


    /* =================================================
       MAKE FUNCTIONS GLOBAL
    ================================================= */

    window.currentLanguage =
        currentLanguage;


    window.setTranslationLanguage =
        setTranslationLanguage;


    window.getTranslation =
        getTranslation;


    window.applyTranslations =
        applyTranslations;


})();
