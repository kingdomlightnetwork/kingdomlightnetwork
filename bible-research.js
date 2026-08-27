/* =====================================================
   KINGDOM LIGHT NETWORK
   BIBLE RESEARCH JS
   VERSION 6.0
   STABLE SELECTOR SYSTEM

   TESTAMENT → BOOK → CHAPTER → VERSE
   READ → RESEARCH → AUDIO → ZOOM

   IMPORTANT:
   This file is independent from other JS variables.
===================================================== */

"use strict";

(function () {

    /* =================================================
       START AFTER HTML IS READY
    ================================================= */

    function startBibleSystem() {

        console.log("KLN Bible System v6.0 starting...");


        /* =============================================
           DOM ELEMENTS
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
            console.error("ERROR: testamentSelect not found.");
            return;
        }

        if (!bookSelect) {
            console.error("ERROR: bookSelect not found.");
            return;
        }

        if (!chapterSelect) {
            console.error("ERROR: chapterSelect not found.");
            return;
        }

        if (!verseSelect) {
            console.error("ERROR: verseSelect not found.");
            return;
        }


        /* =============================================
           COMPLETE BIBLE BOOK LIST
        ============================================= */

        const books = {

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

        function resetSelect(select, placeholder) {

            select.innerHTML = "";

            const option =
                document.createElement("option");

            option.value = "";
            option.textContent = placeholder;

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


            console.log(
                "Loading books for:",
                testament
            );


            if (!testament) {
                return;
            }


            if (!books[testament]) {

                console.error(
                    "Invalid testament:",
                    testament
                );

                return;

            }


            books[testament].forEach(
                function (book) {

                    const option =
                        document.createElement("option");

                    option.value = book[0];

                    option.textContent = book[0];

                    bookSelect.appendChild(option);

                }
            );


            console.log(
                "Books loaded:",
                bookSelect.options.length - 1
            );

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


            if (!testament || !bookName) {
                return;
            }


            const book =
                books[testament].find(
                    function (item) {

                        return item[0] === bookName;

                    }
                );


            if (!book) {

                console.error(
                    "Book not found:",
                    bookName
                );

                return;

            }


            const totalChapters =
                book[1];


            for (
                let chapter = 1;
                chapter <= totalChapters;
                chapter++
            ) {

                const option =
                    document.createElement("option");

                option.value =
                    String(chapter);

                option.textContent =
                    "Chapter " + chapter;

                chapterSelect.appendChild(option);

            }


            console.log(
                "Chapters loaded:",
                totalChapters
            );

        }


        /* =============================================
           GET DATABASE VERSES
        ============================================= */

        function getDatabaseVerses() {

            const language =
                translationLanguage &&
                translationLanguage.value
                    ? translationLanguage.value
                    : "en";


            let database = null;


            try {

                if (
                    typeof window.getBibleDatabase ===
                    "function"
                ) {

                    database =
                        window.getBibleDatabase(
                            language
                        );

                }

            } catch (error) {

                console.error(
                    "Database error:",
                    error
                );

            }


            if (!database) {
                return [];
            }


            const testament =
                testamentSelect.value;

            const book =
                bookSelect.value;

            const chapter =
                chapterSelect.value;


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
            .map(
                function (value) {

                    return Number(value);

                }
            )
            .filter(
                function (value) {

                    return Number.isFinite(value);

                }
            )
            .sort(
                function (a, b) {

                    return a - b;

                }
            );

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
                chapterSelect.value;


            if (
                !testament ||
                !book ||
                !chapter
            ) {

                return;

            }


            let verses =
                getDatabaseVerses();


            /*
               اگر database میں متن موجود ہے
            */

            if (verses.length > 0) {

                verses.forEach(
                    function (verse) {

                        const option =
                            document.createElement("option");

                        option.value =
                            String(verse);

                        option.textContent =
                            "Verse " + verse;

                        verseSelect.appendChild(option);

                    }
                );


                console.log(
                    "Database verses loaded:",
                    verses.length
                );


                return;

            }


            /*
               اگر اس chapter کا متن database میں
               ابھی موجود نہیں ہے تو selector
               بند نہیں ہوگا۔
               
               ایک ابتدائی Verse 1 دکھایا جائے گا۔
            */

            const fallback =
                document.createElement("option");

            fallback.value = "1";

            fallback.textContent =
                "Verse 1";

            verseSelect.appendChild(
                fallback
            );


            console.log(
                "No local verses found. Verse 1 fallback enabled."
            );

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
           GET SOURCE LANGUAGE
        ============================================= */

        function getSourceLanguage() {

            if (
                sourceLanguage &&
                sourceLanguage.value
            ) {

                return sourceLanguage.value;

            }

            return "";

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

            try {

                if (
                    typeof window.getBibleVerse ===
                    "function"
                ) {

                    return window.getBibleVerse(
                        language,
                        testament,
                        book,
                        Number(chapter),
                        Number(verse)
                    );

                }

            } catch (error) {

                console.error(
                    "getBibleVerse error:",
                    error
                );

            }


            return null;

        }


        /* =============================================
           HTML ESCAPE
        ============================================= */

        function escapeHTML(value) {

            return String(value)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        }


        /* =============================================
           TEXT DIRECTION
        ============================================= */

        function getDirection(language) {

            const rtlLanguages = [

                "ur",
                "pa",
                "ar",
                "he",
                "arc"

            ];


            if (
                rtlLanguages.includes(language)
            ) {

                return "rtl";

            }


            return "ltr";

        }


        /* =============================================
           AUDIO
        ============================================= */

        let speaking = false;


        function stopAudio() {

            if (
                "speechSynthesis" in window
            ) {

                window.speechSynthesis.cancel();

            }

            speaking = false;

        }


        function speak(text) {

            if (
                !text ||
                !("speechSynthesis" in window)
            ) {

                return;

            }


            stopAudio();


            const utterance =
                new SpeechSynthesisUtterance(text);


            const language =
                getLanguage();


            const speechLanguages = {

                en: "en-US",
                ur: "ur-PK",
                pa: "pa-IN",
                ar: "ar-SA",
                he: "he-IL",
                arc: "ar",
                grc: "el-GR",
                zh: "zh-CN",
                ja: "ja-JP",
                ko: "ko-KR",
                id: "id-ID",
                ms: "ms-MY",
                bn: "bn-BD",
                es: "es-ES",
                fr: "fr-FR",
                de: "de-DE",
                it: "it-IT",
                pt: "pt-PT",
                ru: "ru-RU",
                sw: "sw-KE"

            };


            utterance.lang =
                speechLanguages[language] ||
                "en-US";


            utterance.rate = 0.85;
            utterance.pitch = 1;


            utterance.onstart =
                function () {

                    speaking = true;

                };


            utterance.onend =
                function () {

                    speaking = false;

                };


            utterance.onerror =
                function () {

                    speaking = false;

                };


            window.speechSynthesis.speak(
                utterance
            );

        }


        /* =============================================
           RENDER VERSE
        ============================================= */

        function renderVerse() {

            const testament =
                testamentSelect.value;

            const book =
                bookSelect.value;

            const chapter =
                chapterSelect.value;

            const verse =
                verseSelect.value;

            const language =
                getLanguage();


            if (
                !testament ||
                !book ||
                !chapter ||
                !verse
            ) {

                alert(
                    "Please select Testament, Book, Chapter and Verse."
                );

                return;

            }


            let text =
                getVerseText(
                    language,
                    testament,
                    book,
                    chapter,
                    verse
                );


            if (!text) {

                text =
                    "اس آیت کا مکمل متن ابھی Bible Database میں موجود نہیں ہے۔";

            }


            const direction =
                getDirection(language);


            if (!result) {
                return;
            }


            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${direction}"
                >

                    <h2>
                        📖 ${escapeHTML(book)}
                        ${escapeHTML(chapter)}:${escapeHTML(verse)}
                    </h2>

                    <div class="bible-control-bar">

                        <button
                            type="button"
                            id="verseAudioButton"
                        >
                            🔊 Listen
                        </button>

                        <div class="bible-zoom-controls">

                            <span>
                                Text:
                            </span>

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

                            <button
                                type="button"
                                id="verseZoomLargeButton"
                            >
                                A++
                            </button>

                        </div>

                    </div>


                    <div
                        class="bible-verse-text"
                        id="verseText"
                    >

                        <p>
                            ${escapeHTML(text)}
                        </p>

                    </div>

                </div>

            `;


            /* =========================================
               AUDIO BUTTON
            ========================================= */

            const audioButton =
                document.getElementById(
                    "verseAudioButton"
                );


            if (audioButton) {

                audioButton.addEventListener(
                    "click",
                    function () {

                        if (speaking) {

                            stopAudio();

                            audioButton.textContent =
                                "🔊 Listen";

                        } else {

                            audioButton.textContent =
                                "⏹ Stop";

                            speak(text);

                        }

                    }
                );

            }


            /* =========================================
               ZOOM
            ========================================= */

            const verseText =
                document.getElementById(
                    "verseText"
                );


            let fontSize = 20;


            function applyZoom() {

                if (verseText) {

                    verseText.style.fontSize =
                        fontSize + "px";

                }

            }


            const zoomOut =
                document.getElementById(
                    "verseZoomOutButton"
                );


            const zoomReset =
                document.getElementById(
                    "verseZoomResetButton"
                );


            const zoomIn =
                document.getElementById(
                    "verseZoomInButton"
                );


            const zoomLarge =
                document.getElementById(
                    "verseZoomLargeButton"
                );


            if (zoomOut) {

                zoomOut.addEventListener(
                    "click",
                    function () {

                        fontSize =
                            Math.max(
                                14,
                                fontSize - 2
                            );

                        applyZoom();

                    }
                );

            }


            if (zoomReset) {

                zoomReset.addEventListener(
                    "click",
                    function () {

                        fontSize = 20;

                        applyZoom();

                    }
                );

            }


            if (zoomIn) {

                zoomIn.addEventListener(
                    "click",
                    function () {

                        fontSize =
                            Math.min(
                                36,
                                fontSize + 2
                            );

                        applyZoom();

                    }
                );

            }


            if (zoomLarge) {

                zoomLarge.addEventListener(
                    "click",
                    function () {

                        fontSize = 40;

                        applyZoom();

                    }
                );

            }


            applyZoom();


            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

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
                chapterSelect.value;

            const verse =
                verseSelect.value;

            const language =
                getLanguage();


            if (
                !testament ||
                !book ||
                !chapter ||
                !verse
            ) {

                alert(
                    "Please select Testament, Book, Chapter and Verse."
                );

                return;

            }


            let text =
                getVerseText(
                    language,
                    testament,
                    book,
                    chapter,
                    verse
                );


            if (!text) {

                text =
                    "Bible verse text is not yet available in the local database.";

            }


            if (!result) {
                return;
            }


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
                        ${escapeHTML(chapter)}:${escapeHTML(verse)}
                    </h3>

                    <div class="bible-verse-text">

                        <p>
                            ${escapeHTML(text)}
                        </p>

                    </div>

                    <div class="bible-research-info">

                        <p>
                            Reading Language:
                            ${escapeHTML(language)}
                        </p>

                        <p>
                            Original Language:
                            ${escapeHTML(
                                getSourceLanguage() || "Not selected"
                            )}
                        </p>

                    </div>

                </div>

            `;


            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        /* =============================================
           TESTAMENT
        ============================================= */

        testamentSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Testament changed:",
                    testamentSelect.value
                );

                loadBooks();

            }
        );


        /* =============================================
           BOOK
        ============================================= */

        bookSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Book changed:",
                    bookSelect.value
                );

                loadChapters();

            }
        );


        /* =============================================
           CHAPTER
        ============================================= */

        chapterSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Chapter changed:",
                    chapterSelect.value
                );

                loadVerses();

            }
        );


        /* =============================================
           VERSE
        ============================================= */

        verseSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Verse changed:",
                    verseSelect.value
                );

                renderVerse();

            }
        );


        /* =============================================
           READ BUTTON
        ============================================= */

        if (readBibleButton) {

            readBibleButton.addEventListener(
                "click",
                function () {

                    renderVerse();

                }
            );

        }


        /* =============================================
           RESEARCH BUTTON
        ============================================= */

        if (researchBibleButton) {

            researchBibleButton.addEventListener(
                "click",
                function () {

                    researchVerse();

                }
            );

        }


        /* =============================================
           TRANSLATION LANGUAGE CHANGE
        ============================================= */

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
            "KLN Bible System v6.0 loaded successfully."
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
            startBibleSystem
        );

    } else {

        startBibleSystem();

    }

})();
