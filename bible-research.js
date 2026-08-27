```javascript
/* =====================================================
   KINGDOM LIGHT NETWORK
   BIBLE RESEARCH SYSTEM
   VERSION 5.0
   BOOK / CHAPTER / VERSE FIX
   MULTILINGUAL / AUDIO / ZOOM / RESEARCH
===================================================== */

"use strict";


/* =====================================================
   GLOBAL STATE
===================================================== */

let speaking = false;
let currentSpeech = null;


/* =====================================================
   DOM ELEMENTS
===================================================== */

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

const selectedReference =
    document.getElementById("selectedReference");


/* =====================================================
   BIBLE BOOKS
===================================================== */

const BIBLE_BOOKS = {

    old: [

        { name: "Genesis", chapters: 50 },
        { name: "Exodus", chapters: 40 },
        { name: "Leviticus", chapters: 27 },
        { name: "Numbers", chapters: 36 },
        { name: "Deuteronomy", chapters: 34 },

        { name: "Joshua", chapters: 24 },
        { name: "Judges", chapters: 21 },
        { name: "Ruth", chapters: 4 },

        { name: "1 Samuel", chapters: 31 },
        { name: "2 Samuel", chapters: 24 },
        { name: "1 Kings", chapters: 22 },
        { name: "2 Kings", chapters: 25 },

        { name: "1 Chronicles", chapters: 29 },
        { name: "2 Chronicles", chapters: 36 },

        { name: "Ezra", chapters: 10 },
        { name: "Nehemiah", chapters: 13 },
        { name: "Esther", chapters: 10 },

        { name: "Job", chapters: 42 },
        { name: "Psalms", chapters: 150 },
        { name: "Proverbs", chapters: 31 },
        { name: "Ecclesiastes", chapters: 12 },
        { name: "Song of Solomon", chapters: 8 },

        { name: "Isaiah", chapters: 66 },
        { name: "Jeremiah", chapters: 52 },
        { name: "Lamentations", chapters: 5 },
        { name: "Ezekiel", chapters: 48 },
        { name: "Daniel", chapters: 12 },

        { name: "Hosea", chapters: 14 },
        { name: "Joel", chapters: 3 },
        { name: "Amos", chapters: 9 },
        { name: "Obadiah", chapters: 1 },
        { name: "Jonah", chapters: 4 },
        { name: "Micah", chapters: 7 },
        { name: "Nahum", chapters: 3 },
        { name: "Habakkuk", chapters: 3 },
        { name: "Zephaniah", chapters: 3 },
        { name: "Haggai", chapters: 2 },
        { name: "Zechariah", chapters: 14 },
        { name: "Malachi", chapters: 4 }

    ],

    new: [

        { name: "Matthew", chapters: 28 },
        { name: "Mark", chapters: 16 },
        { name: "Luke", chapters: 24 },
        { name: "John", chapters: 21 },
        { name: "Acts", chapters: 28 },

        { name: "Romans", chapters: 16 },
        { name: "1 Corinthians", chapters: 16 },
        { name: "2 Corinthians", chapters: 13 },
        { name: "Galatians", chapters: 6 },
        { name: "Ephesians", chapters: 6 },
        { name: "Philippians", chapters: 4 },
        { name: "Colossians", chapters: 4 },

        { name: "1 Thessalonians", chapters: 5 },
        { name: "2 Thessalonians", chapters: 3 },

        { name: "1 Timothy", chapters: 6 },
        { name: "2 Timothy", chapters: 4 },
        { name: "Titus", chapters: 3 },
        { name: "Philemon", chapters: 1 },

        { name: "Hebrews", chapters: 13 },
        { name: "James", chapters: 5 },
        { name: "1 Peter", chapters: 5 },
        { name: "2 Peter", chapters: 3 },
        { name: "1 John", chapters: 5 },
        { name: "2 John", chapters: 1 },
        { name: "3 John", chapters: 1 },
        { name: "Jude", chapters: 1 },

        { name: "Revelation", chapters: 22 }

    ]

};


/* =====================================================
   STANDARD BIBLE VERSE COUNTS
   Used when local verse text is not yet stored.
===================================================== */

const BIBLE_VERSE_COUNTS = {

    Genesis: [
        31,25,24,26,32,22,24,22,29,32,
        32,20,18,24,21,16,27,33,38,18,
        34,24,20,67,34,35,46,22,35,43,
        55,32,20,31,29,43,36,30,23,23,
        57,40,15,33,34,28,34,31,22,33
    ],

    Exodus: [
        22,25,22,31,23,30,25,32,35,29,
        10,51,22,31,27,36,16,27,25,26,
        36,31,33,18,40,37,21,43,46,38,
        18,35,35,16,35,19,29,38,31,43
    ],

    Leviticus: [
        17,16,17,35,19,30,38,36,24,20,
        47,8,59,57,33,34,16,30,37,27,
        24,33,44,23,55,46,34
    ],

    Numbers: [
        54,34,51,49,31,27,89,26,23,36,
        35,16,28,55,32,27,16,36,30,49,
        35,41,35,28,24,65,23,31,40,16,
        54,42,56,29,34,13
    ],

    Deuteronomy: [
        46,37,29,49,33,25,26,20,29,22,
        32,32,18,29,23,22,20,22,21,20,
        23,29,26,22,20,19,26,68,29,20,
        30,52,29,12
    ],

    Matthew: [
        25,23,17,25,48,34,29,34,38,42,
        30,50,58,36,39,28,27,35,30,34,
        46,46,44,53,46,75,66,20
    ],

    Mark: [
        45,28,35,41,43,56,37,38,
        50,52,33,44,37,72,47,20
    ],

    Luke: [
        80,52,38,44,39,49,50,56,62,42,
        54,59,35,35,32,31,37,43,48,47,
        38,71,56,53
    ],

    John: [
        51,25,36,54,47,71,53,59,41,42,
        57,50,38,31,27,33,26,40,42,31,25
    ],

    Acts: [
        26,47,26,37,42,15,60,40,43,48,
        30,25,37,27,41,27,37,40,42,27,
        27,37,44,27,32,44,27,31
    ],

    Romans: [
        32,29,31,25,21,23,25,39,33,21,
        36,21,14,23,33,27
    ],

    "1 Corinthians": [
        31,16,23,21,13,20,40,13,
        27,33,34,31,13,40,58,24
    ],

    "2 Corinthians": [
        24,17,18,18,21,18,18,24,15,18,18,21,13
    ],

    Galatians: [
        24,21,29,31,26,18
    ],

    Ephesians: [
        23,22,21,32,33,24
    ],

    Philippians: [
        30,30,21,23
    ],

    Colossians: [
        29,23,25,18
    ],

    "1 Thessalonians": [
        10,20,13,18,28
    ],

    "2 Thessalonians": [
        12,17,18
    ],

    "1 Timothy": [
        20,15,16,16,25,21
    ],

    "2 Timothy": [
        18,26,17,22
    ],

    Titus: [
        16,15,15
    ],

    Philemon: [
        25
    ],

    Hebrews: [
        14,18,19,16,14,20,28,13,28,39,
        40,29,25
    ],

    James: [
        27,26,18,17,20
    ],

    "1 Peter": [
        25,25,22,19,14
    ],

    "2 Peter": [
        21,22,18
    ],

    "1 John": [
        10,29,24,21,21
    ],

    "2 John": [
        13
    ],

    "3 John": [
        14
    ],

    Jude: [
        25
    ],

    Revelation: [
        20,29,22,11,14,17,17,13,21,11,
        19,17,18,20,8,21,18,24,21,15,
        27,21
    ]

};


/* =====================================================
   FIND BOOK
===================================================== */

function findBook(testament, bookName) {

    if (!BIBLE_BOOKS[testament]) {
        return null;
    }

    return BIBLE_BOOKS[testament].find(
        function (book) {
            return book.name === bookName;
        }
    ) || null;

}


/* =====================================================
   CLEAR SELECT
===================================================== */

function clearSelect(selectElement, text) {

    if (!selectElement) {
        return;
    }

    selectElement.innerHTML = "";

    const option =
        document.createElement("option");

    option.value = "";
    option.textContent = text;

    selectElement.appendChild(option);

}


/* =====================================================
   LOAD BOOKS
===================================================== */

function loadBibleBooks() {

    clearSelect(bookSelect, "Select Book");
    clearSelect(chapterSelect, "Select Chapter");
    clearSelect(verseSelect, "Select Verse");

    if (!testamentSelect || !testamentSelect.value) {
        return;
    }

    const books =
        BIBLE_BOOKS[testamentSelect.value] || [];

    books.forEach(
        function (book) {

            const option =
                document.createElement("option");

            option.value = book.name;
            option.textContent = book.name;

            bookSelect.appendChild(option);

        }
    );

}


/* =====================================================
   LOAD CHAPTERS
===================================================== */

function loadBibleChapters() {

    clearSelect(chapterSelect, "Select Chapter");
    clearSelect(verseSelect, "Select Verse");

    if (
        !testamentSelect ||
        !bookSelect ||
        !testamentSelect.value ||
        !bookSelect.value
    ) {
        return;
    }

    const book =
        findBook(
            testamentSelect.value,
            bookSelect.value
        );

    if (!book) {
        return;
    }

    for (
        let chapter = 1;
        chapter <= book.chapters;
        chapter++
    ) {

        const option =
            document.createElement("option");

        option.value = String(chapter);

        option.textContent =
            "Chapter " + chapter;

        chapterSelect.appendChild(option);

    }

}


/* =====================================================
   GET VERSE COUNT
===================================================== */

function getVerseCount(book, chapter) {

    if (
        BIBLE_VERSE_COUNTS[book] &&
        BIBLE_VERSE_COUNTS[book][chapter - 1]
    ) {

        return BIBLE_VERSE_COUNTS[book][chapter - 1];

    }

    return 176;

}


/* =====================================================
   LOAD VERSES
===================================================== */

function loadBibleVerses() {

    clearSelect(verseSelect, "Select Verse");

    if (
        !testamentSelect ||
        !bookSelect ||
        !chapterSelect ||
        !testamentSelect.value ||
        !bookSelect.value ||
        !chapterSelect.value
    ) {
        return;
    }

    const chapter =
        Number(chapterSelect.value);

    const count =
        getVerseCount(
            bookSelect.value,
            chapter
        );

    for (
        let verse = 1;
        verse <= count;
        verse++
    ) {

        const option =
            document.createElement("option");

        option.value = String(verse);

        option.textContent =
            "Verse " + verse;

        verseSelect.appendChild(option);

    }

}


/* =====================================================
   CURRENT BIBLE LANGUAGE
===================================================== */

function getCurrentBibleLanguage() {

    if (
        translationLanguage &&
        translationLanguage.value
    ) {
        return translationLanguage.value;
    }

    return "en";

}


/* =====================================================
   CURRENT SOURCE LANGUAGE
===================================================== */

function getCurrentSourceLanguage() {

    if (
        sourceLanguage &&
        sourceLanguage.value
    ) {
        return sourceLanguage.value;
    }

    return "he";

}


/* =====================================================
   TEXT DIRECTION
===================================================== */

function getDirection() {

    const language =
        getCurrentBibleLanguage();

    if (
        typeof getBibleLanguageInfo === "function"
    ) {

        const info =
            getBibleLanguageInfo(language);

        if (
            info &&
            info.direction
        ) {
            return info.direction;
        }

    }

    if (
        ["ur", "pa", "ar", "he", "arc"]
            .includes(language)
    ) {
        return "rtl";
    }

    return "ltr";

}


/* =====================================================
   STOP AUDIO
===================================================== */

function stopAudio() {

    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();

    }

    speaking = false;
    currentSpeech = null;

}


/* =====================================================
   SPEAK TEXT
===================================================== */

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
        getCurrentBibleLanguage();

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
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        pt: "pt-PT",
        ru: "ru-RU",
        it: "it-IT",
        tr: "tr-TR",
        id: "id-ID",
        ms: "ms-MY"

    };

    utterance.lang =
        speechLanguages[language] || "en-US";

    utterance.rate = 0.85;
    utterance.pitch = 1;

    utterance.onstart =
        function () {
            speaking = true;
        };

    utterance.onend =
        function () {

            speaking = false;
            currentSpeech = null;

            const button =
                document.getElementById(
                    "verseAudioButton"
                );

            if (button) {
                button.textContent = "🔊 Listen";
            }

        };

    utterance.onerror =
        function () {

            speaking = false;
            currentSpeech = null;

        };

    currentSpeech = utterance;

    window.speechSynthesis.speak(
        utterance
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   RENDER VERSE
===================================================== */

function renderVerse(
    data,
    text,
    title
) {

    stopAudio();

    const direction =
        getDirection();

    const displayText =
        text ||
        "اس آیت کا متن ابھی مقامی Bible Database میں موجود نہیں ہے۔";

    if (!result) {
        return;
    }

    result.innerHTML = `

        <div
            class="bible-reading-content"
            dir="${direction}"
        >

            <h2>
                ${escapeHTML(title)}
            </h2>

            <h3>
                ${escapeHTML(data.book)}
                ${escapeHTML(data.chapter)}
                :
                ${escapeHTML(data.verse)}
            </h3>

            <div
                class="bible-control-bar"
            >

                <button
                    type="button"
                    id="verseAudioButton"
                >
                    🔊 Listen
                </button>

                <div
                    class="bible-zoom-controls"
                >

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
                    ${escapeHTML(displayText)}
                </p>

            </div>

        </div>

    `;


    const verseAudioButton =
        document.getElementById(
            "verseAudioButton"
        );

    if (verseAudioButton) {

        verseAudioButton.addEventListener(
            "click",
            function () {

                if (speaking) {

                    stopAudio();

                    verseAudioButton.textContent =
                        "🔊 Listen";

                } else {

                    verseAudioButton.textContent =
                        "⏹ Stop";

                    speak(displayText);

                }

            }
        );

    }


    const verseText =
        document.getElementById(
            "verseText"
        );

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


    let fontSize = 20;


    function applyVerseZoom() {

        if (verseText) {

            verseText.style.fontSize =
                fontSize + "px";

        }

    }


    if (zoomOut) {

        zoomOut.addEventListener(
            "click",
            function () {

                fontSize =
                    Math.max(
                        14,
                        fontSize - 2
                    );

                applyVerseZoom();

            }
        );

    }


    if (zoomReset) {

        zoomReset.addEventListener(
            "click",
            function () {

                fontSize = 20;

                applyVerseZoom();

            }
        );

    }


    if (zoomIn) {

        zoomIn.addEventListener(
            "click",
            function () {

                fontSize =
                    Math.min(
                        34,
                        fontSize + 2
                    );

                applyVerseZoom();

            }
        );

    }


    if (zoomLarge) {

        zoomLarge.addEventListener(
            "click",
            function () {

                fontSize = 38;

                applyVerseZoom();

            }
        );

    }


    applyVerseZoom();


    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   READ SELECTED VERSE
===================================================== */

function readSelectedVerse() {

    if (
        !testamentSelect ||
        !bookSelect ||
        !chapterSelect ||
        !verseSelect
    ) {
        return;
    }

    const testament =
        testamentSelect.value;

    const book =
        bookSelect.value;

    const chapter =
        Number(chapterSelect.value);

    const verse =
        Number(verseSelect.value);

    if (
        !testament ||
        !book ||
        !chapter ||
        !verse
    ) {

        if (selectedReference) {

            selectedReference.textContent =
                "Select a testament, book, chapter and verse.";

        }

        return;

    }

    const language =
        getCurrentBibleLanguage();

    let text = null;

    if (
        typeof getBibleVerse === "function"
    ) {

        text =
            getBibleVerse(
                language,
                testament,
                book,
                chapter,
                verse
            );

    }

    const data = {

        book: book,
        chapter: chapter,
        verse: verse

    };

    const title =
        book +
        " " +
        chapter +
        ":" +
        verse;

    renderVerse(
        data,
        text,
        title
    );

    if (selectedReference) {

        selectedReference.textContent =
            title;

    }

}


/* =====================================================
   RESEARCH SELECTED VERSE
===================================================== */

function researchSelectedVerse() {

    const testament =
        testamentSelect &&
        testamentSelect.value;

    const book =
        bookSelect &&
        bookSelect.value;

    const chapter =
        chapterSelect &&
        chapterSelect.value;

    const verse =
        verseSelect &&
        verseSelect.value;

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

    const language =
        getCurrentBibleLanguage();

    let text = null;

    if (
        typeof getBibleVerse === "function"
    ) {

        text =
            getBibleVerse(
                language,
                testament,
                book,
                Number(chapter),
                Number(verse)
            );

    }

    const reference =
        book +
        " " +
        chapter +
        ":" +
        verse;

    const researchText =
        text ||
        "Bible verse text is not yet available in the local database.";

    if (result) {

        result.innerHTML = `

            <div
                class="bible-reading-content"
                dir="${getDirection()}"
            >

                <h2>
                    🔎 Bible Research
                </h2>

                <h3>
                    ${escapeHTML(reference)}
                </h3>

                <div
                    class="bible-verse-text"
                >

                    <p>
                        ${escapeHTML(researchText)}
                    </p>

                </div>

                <div
                    class="bible-research-info"
                >

                    <p>
                        Language:
                        ${escapeHTML(language)}
                    </p>

                    <p>
                        Source:
                        ${escapeHTML(
                            getCurrentSourceLanguage()
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

}


/* =====================================================
   TESTAMENT CHANGE
===================================================== */

if (testamentSelect) {

    testamentSelect.addEventListener(
        "change",
        function () {

            loadBibleBooks();

        }
    );

}


/* =====================================================
   BOOK CHANGE
===================================================== */

if (bookSelect) {

    bookSelect.addEventListener(
        "change",
        function () {

            loadBibleChapters();

        }
    );

}


/* =====================================================
   CHAPTER CHANGE
===================================================== */

if (chapterSelect) {

    chapterSelect.addEventListener(
        "change",
        function () {

            loadBibleVerses();

        }
    );

}


/* =====================================================
   VERSE CHANGE
===================================================== */

if (verseSelect) {

    verseSelect.addEventListener(
        "change",
        function () {

            readSelectedVerse();

        }
    );

}


/* =====================================================
   READ BIBLE BUTTON
===================================================== */

if (readBibleButton) {

    readBibleButton.addEventListener(
        "click",
        function () {

            readSelectedVerse();

        }
    );

}


/* =====================================================
   RESEARCH BUTTON
===================================================== */

if (researchBibleButton) {

    researchBibleButton.addEventListener(
        "click",
        function () {

            researchSelectedVerse();

        }
    );

}


/* =====================================================
   TRANSLATION LANGUAGE CHANGE
===================================================== */

if (translationLanguage) {

    translationLanguage.addEventListener(
        "change",
        function () {

            stopAudio();

            /*
             * Verse list is rebuilt without changing
             * the selected Book or Chapter.
             */

            loadBibleVerses();

        }
    );

}


/* =====================================================
   SOURCE LANGUAGE CHANGE
===================================================== */

if (sourceLanguage) {

    sourceLanguage.addEventListener(
        "change",
        function () {

            stopAudio();

        }
    );

}


/* =====================================================
   INITIALIZATION
===================================================== */

function initializeBibleResearch() {

    clearSelect(
        bookSelect,
        "Select Book"
    );

    clearSelect(
        chapterSelect,
        "Select Chapter"
    );

    clearSelect(
        verseSelect,
        "Select Verse"
    );

    if (selectedReference) {

        selectedReference.textContent =
            "Select a testament, book, chapter and verse.";

    }

    console.log(
        "Kingdom Light Network Bible Research System Version 5.0 loaded successfully."
    );

}


/* =====================================================
   START
===================================================== */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeBibleResearch
    );

} else {

    initializeBibleResearch();

}
```



    
