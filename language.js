/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL LANGUAGE CONTROLLER
===================================================== */


/* =====================================================
   APPLY TRANSLATIONS
===================================================== */

function applyTranslations() {

    const elements =
        document.querySelectorAll("[data-translate]");


    elements.forEach(function (element) {

        const key =
            element.getAttribute("data-translate");


        const translatedText =
            getTranslation(key);


        if (translatedText) {

            element.textContent =
                translatedText;

        }

    });


    /* -------------------------------------------------
       UPDATE LANGUAGE SELECTOR
    ------------------------------------------------- */

    const languageSelectors =
        document.querySelectorAll("[data-language-select]");


    languageSelectors.forEach(function (selector) {

        selector.value =
            currentLanguage;

    });


    console.log(
        "Translations applied:",
        currentLanguage
    );

}


/* =====================================================
   CHANGE WEBSITE LANGUAGE
===================================================== */

function changeWebsiteLanguage(language) {

    if (!translations[language]) {

        console.warn(
            "Unsupported language:",
            language
        );

        return;

    }


    setTranslationLanguage(language);


    applyTranslations();

}


/* =====================================================
   LANGUAGE SELECTOR
===================================================== */

function initializeLanguageSelector() {

    const languageSelectors =
        document.querySelectorAll(
            "[data-language-select]"
        );


    languageSelectors.forEach(function (selector) {

        selector.addEventListener(
            "change",
            function () {

                const selectedLanguage =
                    this.value;


                changeWebsiteLanguage(
                    selectedLanguage
                );

            }
        );

    });

}


/* =====================================================
   LOAD SAVED LANGUAGE
===================================================== */

function loadSavedLanguage() {

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

}


/* =====================================================
   INITIALIZE GLOBAL LANGUAGE SYSTEM
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSavedLanguage();

        initializeLanguageSelector();

        applyTranslations();


        console.log(
            "Kingdom Light Network Language System initialized successfully."
        );

    }
);
