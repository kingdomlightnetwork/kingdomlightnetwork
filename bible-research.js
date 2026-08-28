/* =====================================================
   KINGDOM LIGHT NETWORK
   BIBLE RESEARCH / SELECTOR ENGINE
   FINAL STABLE VERSION
   Testament → Book → Chapter → Verse
   Audio + Zoom + Research
===================================================== */

(function () {

    "use strict";


    /* =================================================
       WAIT FOR HTML
    ================================================= */

    function startBibleSystem() {

        console.log("Bible Selector: starting...");


        /* =============================================
           DOM
        ============================================= */

        const sourceLanguage =
            document.getElementById("sourceLanguage");

        const translationLanguage =
            document.getElementById("translationLanguage");

        const testamentSelect =
            document.getElementById("testamentSelect");

        const bookSelect =
            document.getElementById("bookSelect");

        const chapterSelect =
            document.getElementById("chapterSelect");

        const verseSelect =
            document.getElementById("verseSelect");

        const readBibleButton =
            document.getElementById("readBibleButton");

        const researchBibleButton =
            document.getElementById("researchBibleButton");

        const result =
            document.getElementById("bibleResult");


        /* =============================================
           CHECK HTML
        ============================================= */

        if (!testamentSelect) {
            console.error(
                "Bible Error: testamentSelect not found."
            );
            return;
        }

        if (!bookSelect) {
            console.error(
                "Bible Error: bookSelect not found."
            );
            return;
        }

        if (!chapterSelect) {
            console.error(
                "Bible Error: chapterSelect not found."
            );
            return;
        }

        if (!verseSelect) {
            console.error(
                "Bible Error: verseSelect not found."
            );
            return;
        }

        console.log(
            "Bible Selector HTML detected."
        );


        /* =============================================
           COMPLETE BIBLE BOOK LIST
        ============================================= */

        const BIBLE_BOOKS = {

            old: [

                ["Genesis", 50],
                ["Exodus", 40],
                ["Leviticus", 27],
                ["Numbers", 36],
                ["Deuteronomy", 34],

                ["Joshua", 24],
                ["Judges", 21],
                ["Ruth", 4],

                ["1 Samuel", 31],
                ["2 Samuel", 24],
                ["1 Kings", 22],
                ["2 Kings", 25],

                ["1 Chronicles", 29],
                ["2 Chronicles", 36],

                ["Ezra", 10],
                ["Nehemiah", 13],
                ["Esther", 10],

                ["Job", 42],
                ["Psalms", 150],
                ["Proverbs", 31],
                ["Ecclesiastes", 12],
                ["Song of Solomon", 8],

                ["Isaiah", 66],
                ["Jeremiah", 52],
                ["Lamentations", 5],
                ["Ezekiel", 48],
                ["Daniel", 12],

                ["Hosea", 14],
                ["Joel", 3],
                ["Amos", 9],
                ["Obadiah", 1],
                ["Jonah", 4],
                ["Micah", 7],
                ["Nahum", 3],
                ["Habakkuk", 3],
                ["Zephaniah", 3],
                ["Haggai", 2],
                ["Zechariah", 14],
                ["Malachi", 4]

            ],

            new: [

                ["Matthew", 28],
                ["Mark", 16],
                ["Luke", 24],
                ["John", 21],
                ["Acts", 28],

                ["Romans", 16],
                ["1 Corinthians", 16],
                ["2 Corinthians", 13],
                ["Galatians", 6],
                ["Ephesians", 6],
                ["Philippians", 4],
                ["Colossians", 4],

                ["1 Thessalonians", 5],
                ["2 Thessalonians", 3],

                ["1 Timothy", 6],
                ["2 Timothy", 4],
                ["Titus", 3],
                ["Philemon", 1],

                ["Hebrews", 13],
                ["James", 5],

                ["1 Peter", 5],
                ["2 Peter", 3],

                ["1 John", 5],
                ["2 John", 1],
                ["3 John", 1],

                ["Jude", 1],
                ["Revelation", 22]

            ]

        };


        /* =============================================
           RESET SELECT
        ============================================= */

        function resetSelect(select, text) {

            if (!select) {
                return;
            }

            select.innerHTML = "";

            const option =
                document.createElement("option");

            option.value = "";
            option.textContent = text;

            select.appendChild(option);

        }


        /* =============================================
           LOAD BOOKS
        ============================================= */

        function loadBooks() {

            resetSelect(
                bookSelect,
                "Select Book"
            );

            resetSelect(
                chapterSelect,
                "Select Chapter"
            );

            resetSelect(
                verseSelect,
                "Select Verse"
            );


            const testament =
                testamentSelect.value;


            if (!testament) {
                return;
            }


            const books =
                BIBLE_BOOKS[testament];


            if (!books) {

                console.error(
                    "Bible Error: Testament not found:",
                    testament
                );

                return;
            }


            books.forEach(function (book) {

                const option =
                    document.createElement("option");

                option.value =
                    book[0];

                option.textContent =
                    book[0];

                bookSelect.appendChild(
                    option
                );

            });


            console.log(
                "Books loaded:",
                books.length
            );

        }


        /* =============================================
           FIND BOOK
        ============================================= */

        function findBook(
            testament,
            bookName
        ) {

            const books =
                BIBLE_BOOKS[testament];

            if (!books) {
                return null;
            }

            return books.find(
                function (book) {

                    return book[0] === bookName;

                }
            ) || null;

        }


        /* =============================================
           LOAD CHAPTERS
        ============================================= */

        function loadChapters() {

            resetSelect(
                chapterSelect,
                "Select Chapter"
            );

            resetSelect(
                verseSelect,
                "Select Verse"
            );


            const testament =
                testamentSelect.value;

            const bookName =
                bookSelect.value;


            if (
                !testament ||
                !bookName
            ) {

                return;

            }


            const book =
                findBook(
                    testament,
                    bookName
                );


            if (!book) {

                console.error(
                    "Bible Error: Book not found:",
                    bookName
                );

                return;

            }


            const chapterCount =
                Number(book[1]);


            for (
                let chapter = 1;
                chapter <= chapterCount;
                chapter++
            ) {

                const option =
                    document.createElement("option");

                option.value =
                    String(chapter);

                option.textContent =
                    "Chapter " + chapter;

                chapterSelect.appendChild(
                    option
                );

            }


            console.log(
                "Chapters loaded:",
                bookName,
                chapterCount
            );

        }


        /* =============================================
           GET DATABASE
        ============================================= */

        function getDatabase(language) {

            if (
                typeof window.getBibleDatabase ===
                "function"
            ) {

                try {

                    return window.getBibleDatabase(
                        language
                    );

                } catch (error) {

                    console.error(
                        "Bible database error:",
                        error
                    );

                }

            }


            if (
                typeof BIBLE_DATABASE !==
                "undefined"
            ) {

                return BIBLE_DATABASE[language] ||
                    null;

            }


            return null;

        }


        /* =============================================
           GET CURRENT LANGUAGE
        ============================================= */

        function getLanguage() {

            if (
                translationLanguage &&
                translationLanguage.value
            ) {

                return translationLanguage.value;

            }

            return "en";

        }


        /* =============================================
           GET AVAILABLE VERSES
        ============================================= */

        function getAvailableVerses(
            language,
            testament,
            book,
            chapter
        ) {

            const database =
                getDatabase(language);


            if (!database) {
                return [];
            }


            if (
                !database[testament] ||
                !database[testament][book] ||
                !database[testament][book][chapter]
            ) {

                return [];

            }


            return Object.keys(
                database[testament][book][chapter]
            )
            .map(function (value) {

                return Number(value);

            })
            .filter(function (value) {

                return Number.isFinite(value);

            })
            .sort(function (a, b) {

                return a - b;

            });

        }


        /* =============================================
           LOAD VERSES
        ============================================= */

        function loadVerses() {

            resetSelect(
                verseSelect,
                "Select Verse"
            );


            const testament =
                testamentSelect.value;

            const book =
                bookSelect.value;

            const chapter =
                Number(
                    chapterSelect.value
                );


            if (
                !testament ||
                !book ||
                !chapter
            ) {

                return;

            }


            const language =
                getLanguage();


            const verses =
                getAvailableVerses(
                    language,
                    testament,
                    book,
                    chapter
                );


            if (
                verses.length > 0
            ) {

                verses.forEach(
                    function (verse) {

                        const option =
                            document.createElement(
                                "option"
                            );

                        option.value =
                            String(verse);

                        option.textContent =
                            "Verse " + verse;

                        verseSelect.appendChild(
                            option
                        );

                    }
                );


                console.log(
                    "Verses loaded:",
                    book,
                    chapter,
                    verses
                );

                return;

            }


            /*
               اس باب کا متن مقامی Database
               میں موجود نہیں ہے۔
            */

            const option =
                document.createElement(
                    "option"
                );

            option.value = "";

            option.textContent =
                "No verse text in local database";

            verseSelect.appendChild(
                option
            );


            console.log(
                "No verse data:",
                book,
                chapter,
                language
            );

        }


        /* =============================================
           GET VERSE TEXT
        ============================================= */

        function getVerseText(
            language,
            testament,
            book,
            chapter,
            verse
        ) {

            if (
                typeof window.getBibleVerse ===
                "function"
            ) {

                try {

                    return window.getBibleVerse(
                        language,
                        testament,
                        book,
                        chapter,
                        verse
                    );

                } catch (error) {

                    console.error(
                        "Bible verse error:",
                        error
                    );

                }

            }


            const database =
                getDatabase(language);


            if (
                !database ||
                !database[testament] ||
                !database[testament][book] ||
                !database[testament][book][chapter]
            ) {

                return null;

            }


            return database[
                testament
            ][
                book
            ][
                chapter
            ][
                verse
            ] || null;

        }


        /* =============================================
           TEXT DIRECTION
        ============================================= */

        function getDirection(
            language
        ) {

            const rtlLanguages = [

                "ur",
                "pa",
                "ar",
                "fa",
                "he",
                "arc"

            ];


            return rtlLanguages.includes(
                language
            )
                ? "rtl"
                : "ltr";

        }


        /* =============================================
           HTML ESCAPE
        ============================================= */

        function escapeHTML(value) {

            return String(value)
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        /* =============================================
           STOP AUDIO
        ============================================= */

        function stopAudio() {

            if (
                "speechSynthesis" in window
            ) {

                window.speechSynthesis.cancel();

            }


            const button =
                document.getElementById(
                    "verseAudioButton"
                );

            if (button) {

                button.textContent =
                    "🔊 Listen";

            }

        }

       ```js
```js
/* =============================================
   AUDIO — FINAL MULTI-LANGUAGE VOICE SYSTEM
   Urdu / Punjabi / Arabic / English / Other Languages
============================================= */

function setupAudio(text) {

    const button =
        document.getElementById(
            "verseAudioButton"
        );


    if (!button) {

        console.error(
            "Bible Audio Error: verseAudioButton not found."
        );

        return;

    }


    /*
       پرانے handler کو ختم کریں۔
    */

    button.onclick = null;


    button.onclick =
        function () {

            if (
                !("speechSynthesis" in window) ||
                !("SpeechSynthesisUtterance" in window)
            ) {

                alert(
                    "Audio is not supported by this browser."
                );

                return;

            }


            /*
               اگر آواز پہلے سے چل رہی ہو
               تو اسے روک دیں۔
            */

            if (
                window.speechSynthesis.speaking ||
                window.speechSynthesis.pending
            ) {

                window.speechSynthesis.cancel();

                button.textContent =
                    "🔊 Listen";

                return;

            }


            const language =
                getLanguage();


            /* =====================================
               LANGUAGE MAP
            ===================================== */

            const speechMap = {

                en: "en-US",

                ur: "ur-PK",

                pa: "pa-PK",

                ar: "ar-SA",

                fa: "fa-IR",

                he: "he-IL",

                arc: "ar",

                grc: "el-GR",

                es: "es-ES",

                pt: "pt-PT",

                fr: "fr-FR",

                de: "de-DE",

                it: "it-IT",

                ru: "ru-RU",

                nl: "nl-NL",

                tr: "tr-TR",

                bn: "bn-BD",

                ta: "ta-IN",

                te: "te-IN",

                mr: "mr-IN",

                "zh-CN": "zh-CN",

                "zh-TW": "zh-TW",

                ja: "ja-JP",

                ko: "ko-KR",

                vi: "vi-VN",

                th: "th-TH",

                id: "id-ID",

                ms: "ms-MY",

                fil: "fil-PH",

                sw: "sw-KE"

            };


            const requestedLanguage =
                speechMap[language] ||
                "en-US";


            /*
               دستیاب آوازیں حاصل کریں۔
            */

            let voices =
                window.speechSynthesis.getVoices();


            /*
               اگر آوازیں ابھی load نہیں ہوئیں
               تو دوبارہ حاصل کریں۔
            */

            if (
                !voices ||
                voices.length === 0
            ) {

                window.speechSynthesis.onvoiceschanged =
                    function () {

                        voices =
                            window.speechSynthesis
                                .getVoices();

                        playBibleAudio(
                            voices,
                            requestedLanguage,
                            language,
                            text,
                            button
                        );

                    };


                /*
                   کچھ browsers میں
                   onvoiceschanged دیر سے آتا ہے۔
                */

                setTimeout(
                    function () {

                        voices =
                            window.speechSynthesis
                                .getVoices();


                        if (
                            voices &&
                            voices.length > 0
                        ) {

                            playBibleAudio(
                                voices,
                                requestedLanguage,
                                language,
                                text,
                                button
                            );

                        }

                    },
                    700
                );


                return;

            }


            playBibleAudio(
                voices,
                requestedLanguage,
                language,
                text,
                button
            );

        };

}


/* =============================================
   FIND AND PLAY BIBLE VOICE
============================================= */

function playBibleAudio(
    voices,
    requestedLanguage,
    language,
    text,
    button
) {

    if (
        !voices ||
        voices.length === 0
    ) {

        alert(
            "No speech voice is available in this browser."
        );

        return;

    }


    const requested =
        requestedLanguage
            .toLowerCase();


    const baseLanguage =
        requested
            .split("-")[0];


    /* =====================================
       1. EXACT LANGUAGE MATCH
       Example: ar-SA
    ===================================== */

    let voice =
        voices.find(
            function (item) {

                return (
                    item.lang &&
                    item.lang
                        .toLowerCase() ===
                    requested
                );

            }
        );


    /* =====================================
       2. BASE LANGUAGE MATCH
       Example: ar-SA → ar
    ===================================== */

    if (!voice) {

        voice =
            voices.find(
                function (item) {

                    return (
                        item.lang &&
                        item.lang
                            .toLowerCase()
                            .split("-")[0] ===
                        baseLanguage
                    );

                }
            );

    }


    /* =====================================
       3. LANGUAGE NAME MATCH
    ===================================== */

    if (!voice) {

        const languageNames = {

            ur: [
                "urdu",
                "pakistan"
            ],

            pa: [
                "punjabi"
            ],

            ar: [
                "arabic"
            ],

            fa: [
                "persian",
                "farsi"
            ],

            he: [
                "hebrew"
            ],

            grc: [
                "greek"
            ],

            en: [
                "english"
            ],

            es: [
                "spanish"
            ],

            pt: [
                "portuguese"
            ],

            fr: [
                "french"
            ],

            de: [
                "german"
            ],

            it: [
                "italian"
            ],

            ru: [
                "russian"
            ],

            nl: [
                "dutch"
            ],

            tr: [
                "turkish"
            ]

        };


        const names =
            languageNames[language] ||
            [];


        voice =
            voices.find(
                function (item) {

                    const voiceName =
                        (
                            item.name ||
                            ""
                        ).toLowerCase();


                    const voiceLang =
                        (
                            item.lang ||
                            ""
                        ).toLowerCase();


                    return names.some(
                        function (name) {

                            return (
                                voiceName
                                    .includes(name) ||
                                voiceLang
                                    .includes(name)
                            );

                        }
                    );

                }
            );

    }


    /* =====================================
       CREATE SPEECH
    ===================================== */

    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    /* =====================================
       APPLY VOICE
    ===================================== */

    if (voice) {

        speech.voice =
            voice;


        speech.lang =
            voice.lang;


        console.log(
            "Bible Audio Voice Selected:",
            voice.name,
            voice.lang
        );

    } else {

        /*
           کوئی مخصوص voice نہ ملنے پر
           requested language استعمال کریں۔
        */

        speech.lang =
            requestedLanguage;


        console.warn(
            "No matching voice found for:",
            requestedLanguage
        );

    }


    speech.rate =
        0.85;


    speech.pitch =
        1;


    speech.volume =
        1;


    /* =====================================
       AUDIO START
    ===================================== */

    speech.onstart =
        function () {

            button.textContent =
                "⏹ Stop";

        };


    /* =====================================
       AUDIO END
    ===================================== */

    speech.onend =
        function () {

            button.textContent =
                "🔊 Listen";

        };


    /* =====================================
       AUDIO ERROR
    ===================================== */

    speech.onerror =
        function (event) {

            console.error(
                "Bible Audio Error:",
                event
            );


            button.textContent =
                "🔊 Listen";

        };


    /* =====================================
       PLAY
    ===================================== */

    window.speechSynthesis.cancel();


    window.speechSynthesis.speak(
        speech
    );

}
```

   
        /* =============================================
           ZOOM
        ============================================= */

        function setupZoom() {

            const target =
                document.querySelector(
                    ".bible-verse-text p"
                );


            if (!target) {
                return;
            }


            let size = 20;


            const out =
                document.getElementById(
                    "verseZoomOutButton"
                );

            const reset =
                document.getElementById(
                    "verseZoomResetButton"
                );

            const inButton =
                document.getElementById(
                    "verseZoomInButton"
                );


            if (out) {

                out.onclick =
                    function () {

                        size =
                            Math.max(
                                14,
                                size - 2
                            );

                        target.style.fontSize =
                            size + "px";

                    };

            }


            if (reset) {

                reset.onclick =
                    function () {

                        size = 20;

                        target.style.fontSize =
                            size + "px";

                    };

            }


            if (inButton) {

                inButton.onclick =
                    function () {

                        size =
                            Math.min(
                                40,
                                size + 2
                            );

                        target.style.fontSize =
                            size + "px";

                    };

            }


            target.style.fontSize =
                size + "px";

        }


        /* =============================================
           RENDER VERSE
        ============================================= */

        function renderVerse(
            book,
            chapter,
            verse,
            text,
            language
        ) {

            if (!result) {
                return;
            }


            stopAudio();


            const displayText =
                text ||
                "اس آیت کا متن ابھی مقامی Bible Database میں موجود نہیں ہے۔";


            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${getDirection(language)}"
                >

                    <h2>
                        📖 ${escapeHTML(book)}
                        ${chapter}:${verse}
                    </h2>

                    <div class="bible-verse-text">

                        <p>
                            ${escapeHTML(displayText)}
                        </p>

                    </div>

                    <div class="bible-control-bar">

                        <button
                            type="button"
                            id="verseAudioButton"
                        >
                            🔊 Listen
                        </button>

                        <button
                            type="button"
                            id="verseZoomOutButton"
                        >
                            A−
                        </button>

                        <button
                            type="button"
                            id="verseZoomResetButton"
                        >
                            A
                        </button>

                        <button
                            type="button"
                            id="verseZoomInButton"
                        >
                            A+
                        </button>

                    </div>

                </div>

            `;


            setupAudio(displayText);

            setupZoom();


            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        /* =============================================
           READ VERSE
        ============================================= */

        function readVerse() {

            const testament =
                testamentSelect.value;

            const book =
                bookSelect.value;

            const chapter =
                Number(
                    chapterSelect.value
                );

            const verse =
                Number(
                    verseSelect.value
                );

            const language =
                getLanguage();


            if (
                !testament ||
                !book ||
                !chapter ||
                !verse
            ) {

                return;

            }


            const text =
                getVerseText(
                    language,
                    testament,
                    book,
                    chapter,
                    verse
                );


            renderVerse(
                book,
                chapter,
                verse,
                text,
                language
            );

        }


        /* =============================================
           RESEARCH
        ============================================= */

        function researchVerse() {

            const testament =
                testamentSelect.value;

            const book =
                bookSelect.value;

            const chapter =
                Number(
                    chapterSelect.value
                );

            const verse =
                Number(
                    verseSelect.value
                );

            const language =
                getLanguage();


            if (
                !testament ||
                !book ||
                !chapter ||
                !verse
            ) {

                alert(
                    "Please select Testament, Book, Chapter and Verse first."
                );

                return;

            }


            const text =
                getVerseText(
                    language,
                    testament,
                    book,
                    chapter,
                    verse
                );


            if (!result) {
                return;
            }


            stopAudio();


            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${getDirection(language)}"
                >

                    <h2>
                        🔎 Bible Research
                    </h2>

                    <h3>
                        ${escapeHTML(book)}
                        ${chapter}:${verse}
                    </h3>

                    <div class="bible-verse-text">

                        <p>
                            ${escapeHTML(
                                text ||
                                "اس آیت کا متن مقامی Bible Database میں موجود نہیں ہے۔"
                            )}
                        </p>

                    </div>

                    <p>
                        Reading Language:
                        ${escapeHTML(language)}
                    </p>

                </div>

            `;


            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        /* =============================================
           EVENTS
        ============================================= */

        testamentSelect.addEventListener(
            "change",
            loadBooks
        );


        bookSelect.addEventListener(
            "change",
            loadChapters
        );


        chapterSelect.addEventListener(
            "change",
            loadVerses
        );


        /*
           Verse منتخب ہوتے ہی متن خود بخود آئے گا۔
        */

        verseSelect.addEventListener(
            "change",
            readVerse
        );


        if (readBibleButton) {

            readBibleButton.addEventListener(
                "click",
                readVerse
            );

        }


        if (researchBibleButton) {

            researchBibleButton.addEventListener(
                "click",
                researchVerse
            );

        }


        if (translationLanguage) {

            translationLanguage.addEventListener(
                "change",
                function () {

                    stopAudio();


                    if (
                        testamentSelect.value &&
                        bookSelect.value &&
                        chapterSelect.value
                    ) {

                        loadVerses();

                    }

                }
            );

        }


        /* =============================================
           INITIAL RESET
        ============================================= */

        resetSelect(
            bookSelect,
            "Select Book"
        );

        resetSelect(
            chapterSelect,
            "Select Chapter"
        );

        resetSelect(
            verseSelect,
            "Select Verse"
        );


        console.log(
            "Kingdom Light Network Bible Selector READY."
        );

    }


    /* =================================================
       START AFTER DOM
    ================================================= */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startBibleSystem
        );

    } else {

        startBibleSystem();

    }

})();
