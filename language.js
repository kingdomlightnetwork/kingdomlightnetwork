/* =====================================================
   KINGDOM LIGHT NETWORK
   GLOBAL LANGUAGE SYSTEM
   Platform-Wide Language Control
   English • اردو • پنجابی • العربية
   + International Languages
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "Kingdom Light Network Global Language System is running."
    );


    /* =====================================================
       GLOBAL LANGUAGE LIST
    ===================================================== */

    const globalLanguages = {

        en: {
            name: "English",
            nativeName: "English",
            direction: "ltr"
        },

        ur: {
            name: "Urdu",
            nativeName: "اردو",
            direction: "rtl"
        },

        pa: {
            name: "Punjabi",
            nativeName: "پنجابی",
            direction: "rtl"
        },

        ar: {
            name: "Arabic",
            nativeName: "العربية",
            direction: "rtl"
        },

        hi: {
            name: "Hindi",
            nativeName: "हिन्दी",
            direction: "ltr"
        },

        bn: {
            name: "Bengali",
            nativeName: "বাংলা",
            direction: "ltr"
        },

        fa: {
            name: "Persian",
            nativeName: "فارسی",
            direction: "rtl"
        },

        ps: {
            name: "Pashto",
            nativeName: "پښتو",
            direction: "rtl"
        },

        tr: {
            name: "Turkish",
            nativeName: "Türkçe",
            direction: "ltr"
        },

        id: {
            name: "Indonesian",
            nativeName: "Bahasa Indonesia",
            direction: "ltr"
        },

        ms: {
            name: "Malay",
            nativeName: "Bahasa Melayu",
            direction: "ltr"
        },

        zh: {
            name: "Chinese",
            nativeName: "中文",
            direction: "ltr"
        },

        ja: {
            name: "Japanese",
            nativeName: "日本語",
            direction: "ltr"
        },

        ko: {
            name: "Korean",
            nativeName: "한국어",
            direction: "ltr"
        },

        vi: {
            name: "Vietnamese",
            nativeName: "Tiếng Việt",
            direction: "ltr"
        },

        th: {
            name: "Thai",
            nativeName: "ไทย",
            direction: "ltr"
        },

        fr: {
            name: "French",
            nativeName: "Français",
            direction: "ltr"
        },

        es: {
            name: "Spanish",
            nativeName: "Español",
            direction: "ltr"
        },

        pt: {
            name: "Portuguese",
            nativeName: "Português",
            direction: "ltr"
        },

        de: {
            name: "German",
            nativeName: "Deutsch",
            direction: "ltr"
        },

        it: {
            name: "Italian",
            nativeName: "Italiano",
            direction: "ltr"
        },

        ru: {
            name: "Russian",
            nativeName: "Русский",
            direction: "ltr"
        },

        uk: {
            name: "Ukrainian",
            nativeName: "Українська",
            direction: "ltr"
        },

        nl: {
            name: "Dutch",
            nativeName: "Nederlands",
            direction: "ltr"
        },

        el: {
            name: "Greek",
            nativeName: "Ελληνικά",
            direction: "ltr"
        },

        he: {
            name: "Hebrew",
            nativeName: "עברית",
            direction: "rtl"
        },

        ro: {
            name: "Romanian",
            nativeName: "Română",
            direction: "ltr"
        },

        pl: {
            name: "Polish",
            nativeName: "Polski",
            direction: "ltr"
        },

        sv: {
            name: "Swedish",
            nativeName: "Svenska",
            direction: "ltr"
        },

        no: {
            name: "Norwegian",
            nativeName: "Norsk",
            direction: "ltr"
        },

        da: {
            name: "Danish",
            nativeName: "Dansk",
            direction: "ltr"
        }

    };


    /* =====================================================
       DEFAULT LANGUAGE
    ===================================================== */

    const DEFAULT_LANGUAGE = "en";


    /* =====================================================
       RTL LANGUAGES
    ===================================================== */

    const rtlLanguages = [
        "ur",
        "pa",
        "ar",
        "fa",
        "ps",
        "he"
    ];


    /* =====================================================
       LANGUAGE SELECTORS
    ===================================================== */

    const languageSelectors =
        document.querySelectorAll(
            "#globalLanguageSelect, #languageSelect, .language-select, [data-language-select]"
        );


    /* =====================================================
       GET SAVED LANGUAGE
    ===================================================== */

    let savedLanguage =
        localStorage.getItem(
            "kingdomLightLanguage"
        );


    if (
        !savedLanguage ||
        !globalLanguages[savedLanguage]
    ) {

        savedLanguage =
            DEFAULT_LANGUAGE;

        localStorage.setItem(
            "kingdomLightLanguage",
            savedLanguage
        );

    }


    /* =====================================================
       CHECK TRANSLATION
    ===================================================== */

    function hasTranslation(language) {

        return (
            typeof translations !== "undefined" &&
            translations[language]
        );

    }


    /* =====================================================
       GET TRANSLATION
    ===================================================== */

    function getGlobalTranslation(
        key,
        language
    ) {

        const selectedLanguage =
            language ||
            savedLanguage ||
            DEFAULT_LANGUAGE;


        if (
            typeof translations !== "undefined" &&
            translations[selectedLanguage] &&
            translations[selectedLanguage][key] !== undefined
        ) {

            return translations[selectedLanguage][key];

        }


        /* ---------------------------------------------
           English fallback
        --------------------------------------------- */

        if (
            typeof translations !== "undefined" &&
            translations[DEFAULT_LANGUAGE] &&
            translations[DEFAULT_LANGUAGE][key] !== undefined
        ) {

            return translations[DEFAULT_LANGUAGE][key];

        }


        return key;

    }


    /* =====================================================
       APPLY TEXT TRANSLATIONS
    ===================================================== */

    function applyTextTranslations(
        language
    ) {

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


                element.textContent =
                    getGlobalTranslation(
                        key,
                        language
                    );

            }
        );

    }


    /* =====================================================
       APPLY PLACEHOLDER TRANSLATIONS
    ===================================================== */

    function applyPlaceholderTranslations(
        language
    ) {

        const elements =
            document.querySelectorAll(
                "[data-translate-placeholder]"
            );


        elements.forEach(
            function (element) {

                const key =
                    element.getAttribute(
                        "data-translate-placeholder"
                    );


                const value =
                    getGlobalTranslation(
                        key,
                        language
                    );


                if (value !== key) {

                    element.placeholder =
                        value;

                }

            }
        );

    }


    /* =====================================================
       APPLY TITLE TRANSLATIONS
    ===================================================== */

    function applyTitleTranslations(
        language
    ) {

        const elements =
            document.querySelectorAll(
                "[data-translate-title]"
            );


        elements.forEach(
            function (element) {

                const key =
                    element.getAttribute(
                        "data-translate-title"
                    );


                const value =
                    getGlobalTranslation(
                        key,
                        language
                    );


                if (value !== key) {

                    element.title =
                        value;

                }

            }
        );

    }


    /* =====================================================
       APPLY HTML LANGUAGE
    ===================================================== */

    function applyDocumentDirection(
        language
    ) {

        const languageInfo =
            globalLanguages[language];


        if (!languageInfo) {

            return;

        }


        document.documentElement.lang =
            language;


        if (
            rtlLanguages.includes(language)
        ) {

            document.documentElement.dir =
                "rtl";

            document.body.classList.add(
                "rtl-language"
            );

            document.body.classList.remove(
                "ltr-language"
            );

        } else {

            document.documentElement.dir =
                "ltr";

            document.body.classList.add(
                "ltr-language"
            );

            document.body.classList.remove(
                "rtl-language"
            );

        }

    }


    /* =====================================================
       UPDATE ALL LANGUAGE SELECTORS
    ===================================================== */

    function updateLanguageSelectors(
        language
    ) {

        languageSelectors.forEach(
            function (selector) {

                selector.value =
                    language;

            }
        );

    }


    /* =====================================================
       APPLY GLOBAL LANGUAGE
    ===================================================== */

    function applyGlobalLanguage(
        language
    ) {

        if (
            !globalLanguages[language]
        ) {

            language =
                DEFAULT_LANGUAGE;

        }


        savedLanguage =
            language;


        /* ---------------------------------------------
           Save language
        --------------------------------------------- */

        localStorage.setItem(
            "kingdomLightLanguage",
            language
        );


        /* ---------------------------------------------
           Apply document direction
        --------------------------------------------- */

        applyDocumentDirection(
            language
        );


        /* ---------------------------------------------
           Apply website translations
        --------------------------------------------- */

        applyTextTranslations(
            language
        );


        applyPlaceholderTranslations(
            language
        );


        applyTitleTranslations(
            language
        );


        /* ---------------------------------------------
           Update selectors
        --------------------------------------------- */

        updateLanguageSelectors(
            language
        );


        console.log(
            "Global website language:",
            language,
            globalLanguages[language].nativeName
        );

    }


    /* =====================================================
       CHANGE LANGUAGE
    ===================================================== */

    function changeLanguage(
        language
    ) {

        if (
            !globalLanguages[language]
        ) {

            console.warn(
                "Unsupported global language:",
                language
            );

            return;

        }


        /*
           If translation is not yet available,
           English remains as a safe fallback.
        */

        if (
            !hasTranslation(language)
        ) {

            console.warn(
                "Translation package not yet available for:",
                language,
                "- English fallback will be used."
            );

        }


        applyGlobalLanguage(
            language
        );

    }


    /* =====================================================
       LANGUAGE SELECTOR EVENTS
    ===================================================== */

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


    /* =====================================================
       GLOBAL FUNCTIONS
    ===================================================== */

    window.changeKingdomLanguage =
        changeLanguage;


    window.applyKingdomLanguage =
        applyGlobalLanguage;


    window.getKingdomLanguage =
        function () {

            return (
                localStorage.getItem(
                    "kingdomLightLanguage"
                ) ||
                DEFAULT_LANGUAGE
            );

        };


    window.getKingdomLanguages =
        function () {

            return globalLanguages;

        };


    window.getKingdomTranslation =
        function (
            key,
            language
        ) {

            return getGlobalTranslation(
                key,
                language
            );

        };


    /* =====================================================
       INITIALIZE
    ===================================================== */

    applyGlobalLanguage(
        savedLanguage
    );


    /* =====================================================
       SYSTEM READY
    ===================================================== */

    console.log(
        "Kingdom Light Network Global Language System initialized successfully."
    );

});
