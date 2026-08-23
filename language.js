/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL WEBSITE LANGUAGE CONTROLLER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("====================================");
    console.log("KINGDOM LIGHT NETWORK");
    console.log("GLOBAL LANGUAGE SYSTEM STARTED");
    console.log("====================================");


    /* =================================================
       LANGUAGE SELECTOR
    ================================================= */

    const languageSelect =
        document.getElementById("globalLanguageSelect");


    /* =================================================
       CHECK TRANSLATION SYSTEM
    ================================================= */

    if (typeof translations === "undefined") {

        console.error(
            "ERROR: translations.js is not loaded."
        );

        return;
    }


    if (typeof setTranslationLanguage !== "function") {

        console.error(
            "ERROR: setTranslationLanguage() is missing."
        );

        return;
    }


    if (typeof getTranslation !== "function") {

        console.error(
            "ERROR: getTranslation() is missing."
        );

        return;
    }


    /* =================================================
       LOAD SAVED LANGUAGE
    ================================================= */

    let savedLanguage =
        localStorage.getItem("language");


    if (
        !savedLanguage ||
        !translations[savedLanguage]
    ) {

        savedLanguage = "en";

    }


    /* =================================================
       SET INITIAL LANGUAGE
    ================================================= */

    setTranslationLanguage(
        savedLanguage
    );


    /* =================================================
       APPLY INITIAL TRANSLATIONS
    ================================================= */

    applyTranslations();


    /* =================================================
       SET SELECTOR
    ================================================= */

    if (languageSelect) {

        languageSelect.value =
            currentLanguage;

    }


    /* =================================================
       LANGUAGE CHANGE
    ================================================= */

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


                /* -----------------------------------------
                   CHECK LANGUAGE
                ----------------------------------------- */

                if (
                    !translations[selectedLanguage]
                ) {

                    console.error(
                        "Translation not found:",
                        selectedLanguage
                    );

                    return;
                }


                /* -----------------------------------------
                   SAVE LANGUAGE
                ----------------------------------------- */

                localStorage.setItem(
                    "language",
                    selectedLanguage
                );


                /* -----------------------------------------
                   CHANGE LANGUAGE
                ----------------------------------------- */

                setTranslationLanguage(
                    selectedLanguage
                );


                /* -----------------------------------------
                   APPLY TRANSLATIONS
                ----------------------------------------- */

                applyTranslations();

            }
        );

    }

});


/* =====================================================
   APPLY TRANSLATIONS
===================================================== */

function applyTranslations() {

    console.log(
        "Applying language:",
        currentLanguage
    );


    /* =================================================
       FIND ALL TRANSLATABLE ELEMENTS
    ================================================= */

    const elements =
        document.querySelectorAll(
            "[data-translate]"
        );


    console.log(
        "Translatable elements found:",
        elements.length
    );


    /* =================================================
       TRANSLATE EACH ELEMENT
    ================================================= */

    elements.forEach(function (element) {

        const key =
            element.getAttribute(
                "data-translate"
            );


        if (!key) {

            return;

        }


        let translatedText;


        try {

            translatedText =
                getTranslation(key);

        } catch (error) {

            console.error(
                "Translation error:",
                key,
                error
            );

            return;

        }


        /* =================================================
           APPLY TRANSLATION
        ================================================= */

        if (
            translatedText !== undefined &&
            translatedText !== null &&
            translatedText !== ""
        ) {

            element.textContent =
                translatedText;

        } else {

            console.warn(
                "Translation missing:",
                key,
                currentLanguage
            );

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
       UPDATE PAGE DIRECTION
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
        "Translations successfully applied:",
        currentLanguage
    );

}
