/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL WEBSITE LANGUAGE CONTROLLER
===================================================== */


/* =====================================================
   INITIALIZE LANGUAGE SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "Kingdom Light Network Language Controller started."
    );


    /* =================================================
       FIND LANGUAGE SELECTOR
    ================================================= */

    const languageSelect =
        document.getElementById(
            "globalLanguageSelect"
        );


    /* =================================================
       LOAD SAVED LANGUAGE
    ================================================= */

    const savedLanguage =
        localStorage.getItem("language");


    if (
        savedLanguage &&
        translations[savedLanguage]
    ) {

        setTranslationLanguage(
            savedLanguage
        );

    } else {

        setTranslationLanguage(
            "en"
        );

    }


    /* =================================================
       SET SELECTOR VALUE
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


                setTranslationLanguage(
                    selectedLanguage
                );


                applyTranslations();


            }
        );

    }


    /* =================================================
       APPLY TRANSLATIONS
    ================================================= */

    applyTranslations();


});


/* =====================================================
   APPLY TRANSLATIONS TO WEBSITE
===================================================== */

function applyTranslations() {

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


            if (!key) {

                return;

            }


            const translatedText =
                getTranslation(
                    key
                );


            if (
                translatedText !== undefined
            ) {

                element.textContent =
                    translatedText;

            }

        }
    );


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
       UPDATE PAGE DIRECTION
    ================================================= */

    document.documentElement.lang =
        currentLanguage;


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
        "Translations applied:",
        currentLanguage
    );

}
