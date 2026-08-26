```javascript
/* =====================================================
   KINGDOM LIGHT NETWORK
   BIBLE RESEARCH SYSTEM
   VERSION 5.0
   MULTILINGUAL / AUDIO / ZOOM / RTL-LTR
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
   FALLBACK TEXT
===================================================== */

const FALLBACK_TEXT = {

    en:
        "This verse is not yet available in the local Bible database.",

    ur:
        "اس آیت کا متن ابھی مقامی بائبل ڈیٹا میں موجود نہیں ہے۔",

    pa:
        "ایہہ آیت دا متن ہن تک مقامی بائبل ڈیٹا وچ موجود نہیں۔",

    ar:
        "نص هذه الآية غير متوفرة حالياً في قاعدة بيانات الكتاب المقدس المحلية.",

    fa:
        "متن این آیه هنوز در داده‌های محلی کتاب مقدس موجود نیست.",

    bn:
        "এই পদটির পাঠ্য এখনো স্থানীয় বাইবেল ডেটাবেসে পাওয়া যায় না۔",

    es:
        "El texto de este versículo aún no está disponible en la base de datos bíblica local.",

    pt:
        "O texto deste versículo ainda não está disponível no banco de dados bíblico local.",

    fr:
        "Le texte de ce verset n'est pas encore disponible dans la base de données biblique locale.",

    de:
        "Der Text dieses Verses ist noch nicht in der lokalen Bibeldatenbank verfügbar.",

    it:
        "Il testo di questo versetto non è ancora disponibile nel database biblico locale.",

    nl:
        "De tekst van dit vers is nog niet beschikbaar in de lokale Bijbeldatabase.",

    ru:
        "Текст этого стиха пока недоступен в локальной базе данных Библии.",

    tr:
        "Bu ayetin metni henüz yerel Kutsal Kitap veritabanında mevcut değildir.",

    "zh-CN":
        "这节经文的内容目前还没有收录在本地圣经数据库中。",

    "zh-TW":
        "這節經文的內容目前還沒有收錄在本地聖經資料庫中。",

    yue:
        "呢節經文嘅內容暫時未有收錄喺本地聖經資料庫入面。",

    ja:
        "この聖句の本文は、現在ローカル聖書データベースに登録されていません。",

    ko:
        "이 구절의 본문은 현재 로컬 성경 데이터베이스에 없습니다.",

    mn:
        "Энэ эшлэлийн текст одоогоор орон нутгийн Библийн мэдээллийн санд байхгүй байна.",

    vi:
        "Nội dung câu Kinh Thánh này hiện chưa có trong cơ sở dữ liệu Kinh Thánh cục bộ.",

    th:
        "ข้อความพระคัมภีร์ข้อนี้ยังไม่มีอยู่ในฐานข้อมูลพระคัมภีร์ภายในระบบ",

    lo:
        "ຂໍ້ພຣະຄຳພີນີ້ຍັງບໍ່ມີຢູ່ໃນຖານຂໍ້ມູນພຣະຄຳພີທ້ອງຖິ່ນ.",

    km:
        "អត្ថបទខគម្ពីរនេះមិនទាន់មាននៅក្នុងមូលដ្ឋានទិន្នន័យព្រះគម្ពីរក្នុងប្រព័ន្ធនៅឡើយទេ។",

    my:
        "ဤကျမ်းပိုဒ်၏စာသားကို ဒေသတွင်းကျမ်းစာဒေတာဘေ့စ်တွင် မရှိသေးပါ။",

    id:
        "Teks ayat ini belum tersedia dalam basis data Alkitab lokal.",

    ms:
        "Teks ayat ini belum tersedia dalam pangkalan data Alkitab tempatan.",

    fil:
        "Ang teksto ng talatang ito ay wala pa sa lokal na database ng Bibliya.",

    sw:
        "Maandishi ya mstari huu bado hayapatikani katika hifadhidata ya Biblia ya ndani.",

    he:
        "טקסט הפסוק עדיין אינו זמין במאגר התנ״ך המקומי.",

    arc:
        "ܟܬܒܬܐ ܕܗܢܐ ܦܣܘܩܐ ܠܐ ܐܝܬܝܗ ܗܫܐ ܒܡܐܓܪܐ ܡܩܘܡܝܐ.",

    grc:
        "Τὸ κείμενον τοῦ ἐδαφίου τούτου οὔπω ἐν τῇ τοπικῇ βάσει δεδομένων τῆς Βίβλου ἐστίν."

};


/* =====================================================
   BOOKS
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

    if (
        !testamentSelect ||
        !testamentSelect.value
    ) {
        return;
    }

    const books =
        BIBLE_BOOKS[
            testamentSelect.value
        ] || [];

    books.forEach(
        function (book) {

            const option =
                document.createElement("option");

            option.value =
                book.name;

            option.textContent =
                book.name;

            bookSelect.appendChild(
                option
            );

        }
    );

}


/* =====================================================
   LOAD CHAPTERS
===================================================== */

function loadBibleChapters() {

    clearSelect(
        chapterSelect,
        "Select Chapter"
    );

    clearSelect(
        verseSelect,
        "Select Verse"
    );

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

        option.value =
            chapter;

        option.textContent =
            "Chapter " + chapter;

        chapterSelect.appendChild(
            option
        );

    }

}


/* =====================================================
   GET AVAILABLE VERSES
===================================================== */

function getAvailableDatabaseVerses(
    language,
    testament,
    book,
    chapter
) {

    try {

        if (
            typeof getBibleDatabase !== "function"
        ) {
            return [];
        }

        const database =
            getBibleDatabase(language);

        if (
            !database ||
            !database[testament] ||
            !database[testament][book] ||
            !database[testament][book][chapter]
        ) {
            return [];
        }

        return Object.keys(
            database[
                testament
            ][
                book
            ][
                chapter
            ]
        )
        .map(
            function (verse) {
                return Number(verse);
            }
        )
        .filter(
            function (verse) {
                return Number.isFinite(verse);
            }
        )
        .sort(
            function (a, b) {
                return a - b;
            }
        );

    } catch (error) {

        console.error(
            "Bible database verse error:",
            error
        );

        return [];

    }

}


/* =====================================================
   LOAD VERSES
===================================================== */

function loadBibleVerses() {

    clearSelect(
        verseSelect,
        "Select Verse"
    );

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

    const language =
        getCurrentBibleLanguage();

    const verses =
        getAvailableDatabaseVerses(
            language,
            testamentSelect.value,
            bookSelect.value,
            Number(chapterSelect.value)
        );

    verses.forEach(
        function (verse) {

            const option =
                document.createElement("option");

            option.value =
                verse;

            option.textContent =
                "Verse " + verse;

            verseSelect.appendChild(
                option
            );

        }
    );


    /*
       If verse data is not yet available,
       show Verse 1 so the interface remains usable.
    */

    if (verses.length === 0) {

        const option =
            document.createElement("option");

        option.value = "1";

        option.textContent =
            "Verse 1";

        verseSelect.appendChild(
            option
        );

    }

}


/* =====================================================
   CURRENT LANGUAGE
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
   LANGUAGE INFORMATION
===================================================== */

function getCurrentLanguageInfo() {

    const language =
        getCurrentBibleLanguage();

    if (
        typeof getBibleLanguageInfo === "function"
    ) {

        return getBibleLanguageInfo(
            language
        );

    }

    return {
        name: language,
        nativeName: language,
        type: "translation",
        direction: "ltr"
    };

}


/* =====================================================
   TEXT DIRECTION
===================================================== */

function getDirection() {

    const info =
        getCurrentLanguageInfo();

    if (
        info &&
        info.direction
    ) {

        return info.direction;

    }

    return "ltr";

}


/* =====================================================
   FALLBACK MESSAGE
===================================================== */

function getFallbackText(language) {

    return (
        FALLBACK_TEXT[language] ||
        FALLBACK_TEXT.en
    );

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
   SPEECH LANGUAGE
===================================================== */

function getSpeechLanguage(language) {

    const speechLanguages = {

        en: "en-US",
        ur: "ur-PK",
        pa: "pa-PK",
        ar: "ar-SA",
        fa: "fa-IR",
        bn: "bn-BD",

        es: "es-ES",
        pt: "pt-PT",
        fr: "fr-FR",
        de: "de-DE",
        it: "it-IT",
        nl: "nl-NL",
        ru: "ru-RU",
        tr: "tr-TR",

        "zh-CN": "zh-CN",
        "zh-TW": "zh-TW",
        yue: "zh-HK",

        ja: "ja-JP",
        ko: "ko-KR",
        mn: "mn-MN",

        vi: "vi-VN",
        th: "th-TH",
        lo: "lo-LA",
        km: "km-KH",
        my: "my-MM",

        id: "id-ID",
        ms: "ms-MY",
        fil: "fil-PH",

        sw: "sw-KE",

        he: "he-IL",
        arc: "ar",
        grc: "el-GR"

    };

    return (
        speechLanguages[language] ||
        "en-US"
    );

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
        new SpeechSynthesisUtterance(
            text
        );

    const language =
        getCurrentBibleLanguage();

    utterance.lang =
        getSpeechLanguage(
            language
        );

    utterance.rate =
        0.85;

    utterance.pitch =
        1;

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

                button.textContent =
                    "🔊 Listen";

            }

        };

    utterance.onerror =
        function () {

            speaking = false;
            currentSpeech = null;

            const button =
                document.getElementById(
                    "verseAudioButton"
                );

            if (button) {

                button.textContent =
                    "🔊 Listen";

            }

        };

    currentSpeech =
        utterance;

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

    if (!result) {
        return;
    }

    const direction =
        getDirection();

    const language =
        getCurrentBibleLanguage();

    const displayText =
        text ||
        getFallbackText(language);

    result.innerHTML = `

        <div
            class="bible-reading-content"
            dir="${escapeHTML(direction)}"
        >

            <h2>
                📖 ${escapeHTML(title)}
            </h2>

            <h3>
                ${escapeHTML(data.book)}
                ${escapeHTML(data.chapter)}:${escapeHTML(data.verse)}
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


    /* =================================================
       AUDIO BUTTON
    ================================================= */

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

                    speak(
                        displayText
                    );

                }

            }
        );

    }


    /* =================================================
       ZOOM
    ================================================= */

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
        Number(
            chapterSelect.value
        );

    const verse =
        Number(
            verseSelect.value
        );

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

        book:
            book,

        chapter:
            chapter,

        verse:
            verse

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

    const source =
        getCurrentSourceLanguage();

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
        getFallbackText(language);

    const direction =
        getDirection();

    if (result) {

        result.innerHTML = `

            <div
                class="bible-reading-content"
                dir="${escapeHTML(direction)}"
            >

                <h2>
                    🔎 Bible Research
                </h2>

                <h3>
                    ${escapeHTML(reference)}
                </h3>


                <div
                    class="bible-verse-text"
                    id="researchVerseText"
                >

                    <p>
                        ${escapeHTML(researchText)}
                    </p>

                </div>


                <div
                    class="bible-research-info"
                >

                    <p>
                        Reading Language:
                        ${escapeHTML(language)}
                    </p>

                    <p>
                        Original Language:
                        ${escapeHTML(source)}
                    </p>

                    <p>
                        Testament:
                        ${escapeHTML(testament)}
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
   EVENT — TESTAMENT
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
   EVENT — BOOK
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
   EVENT — CHAPTER
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
   EVENT — VERSE
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
   EVENT — READ BIBLE
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
   EVENT — RESEARCH
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
   EVENT — READING LANGUAGE CHANGE
===================================================== */

if (translationLanguage) {

    translationLanguage.addEventListener(
        "change",
        function () {

            stopAudio();

            loadBibleVerses();

        }
    );

}


/* =====================================================
   EVENT — ORIGINAL LANGUAGE CHANGE
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
