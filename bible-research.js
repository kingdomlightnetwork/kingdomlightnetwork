// =====================================================
// KINGDOM LIGHT NETWORK
// BIBLE RESEARCH SYSTEM
// VERSES + FULL CHAPTER + AUDIO + ZOOM
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Bible Research System Started");

    // =================================================
    // ELEMENTS
    // =================================================

    const sourceLanguage = document.getElementById("sourceLanguage");
    const translationLanguage = document.getElementById("translationLanguage");
    const testamentSelect = document.getElementById("testamentSelect");
    const bookSelect = document.getElementById("bookSelect");
    const chapterSelect = document.getElementById("chapterSelect");
    const verseSelect = document.getElementById("verseSelect");

    const readBibleButton = document.getElementById("readBibleButton");
    const listenBibleButton = document.getElementById("listenBibleButton");
    const researchBibleButton = document.getElementById("researchBibleButton");

    const result = document.getElementById("bibleResult");

    if (
        !sourceLanguage ||
        !translationLanguage ||
        !testamentSelect ||
        !bookSelect ||
        !chapterSelect ||
        !verseSelect ||
        !result
    ) {
        console.error("Bible selector elements are missing.");
        return;
    }

    // =================================================
    // BIBLE BOOKS
    // =================================================

    const bibleBooks = {

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

    // =================================================
    // VERSE COUNTS
    // =================================================

    const verseCounts = {

        Matthew: [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],

        Mark: [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],

        Luke: [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],

        John: [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],

        Acts: [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],

        Romans: [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],

        Galatians: [24,21,29,31,26,18],

        Ephesians: [23,22,21,32,33,24],

        Philippians: [30,30,21,23],

        Colossians: [29,23,25,18],

        "1 Thessalonians": [10,20,13,18,28],

        "2 Thessalonians": [12,17,18],

        "1 Timothy": [20,15,16,16,25,21],

        "2 Timothy": [18,26,17,22],

        Titus: [16,15,15],

        Philemon: [25],

        Hebrews: [14,18,19,16,14,20,28,13,28,39,40,29,25],

        James: [27,26,18,17,20],

        "1 Peter": [25,25,22,19,14],

        "2 Peter": [21,22,18],

        "1 John": [10,29,24,21,21],

        "2 John": [13],

        "3 John": [14],

        Jude: [25],

        Revelation: [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]

    };

    // =================================================
    // AUDIO
    // =================================================

    let speaking = false;

    function stopAudio() {

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        speaking = false;
    }

    function getSpeechLanguage() {

        const lang = translationLanguage.value;

        if (lang === "ur") return "ur-PK";
        if (lang === "pa") return "pa-PK";
        if (lang === "ar") return "ar-SA";

        return "en-US";
    }

    function speak(text) {

        if (!text || !("speechSynthesis" in window)) {
            alert("آپ کے براؤزر میں آڈیو کی سہولت دستیاب نہیں ہے۔");
            return;
        }

        stopAudio();

        const utterance =
            new SpeechSynthesisUtterance(text);

        utterance.lang =
            getSpeechLanguage();

        utterance.rate = 0.85;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = function () {
            speaking = true;
        };

        utterance.onend = function () {
            speaking = false;
        };

        utterance.onerror = function () {
            speaking = false;
            console.error("Speech synthesis error.");
        };

        window.speechSynthesis.speak(utterance);
    }

    // =================================================
    // RESET SELECT
    // =================================================

    function resetSelect(element, text) {

        element.innerHTML = "";

        const option =
            document.createElement("option");

        option.value = "";
        option.textContent = text;

        element.appendChild(option);
    }

    // =================================================
    // LOAD BOOKS
    // =================================================

    function loadBooks(testament) {

        resetSelect(bookSelect, "Select Book");
        resetSelect(chapterSelect, "Select Chapter");
        resetSelect(verseSelect, "Select Verse");

        if (!bibleBooks[testament]) return;

        bibleBooks[testament].forEach(function (book, index) {

            const option =
                document.createElement("option");

            option.value = index;
            option.textContent = book[0];

            bookSelect.appendChild(option);
        });
    }

    // =================================================
    // LOAD CHAPTERS
    // =================================================

    function loadChapters() {

        resetSelect(chapterSelect, "Select Chapter");
        resetSelect(verseSelect, "Select Verse");

        const testament =
            testamentSelect.value;

        const index =
            bookSelect.value;

        if (
            !testament ||
            index === ""
        ) return;

        const book =
            bibleBooks[testament][Number(index)];

        if (!book) return;

        for (let i = 1; i <= book[1]; i++) {

            const option =
                document.createElement("option");

            option.value = i;
            option.textContent = "Chapter " + i;

            chapterSelect.appendChild(option);
        }
    }

    // =================================================
    // LOAD VERSES
    // =================================================

    function loadVerses() {

        resetSelect(verseSelect, "Select Verse");

        const book =
            getSelectedBook();

        const chapter =
            Number(chapterSelect.value);

        if (!book || !chapter) return;

        const count =
            getVerseCount(
                book,
                chapter
            );

        for (let i = 1; i <= count; i++) {

            const option =
                document.createElement("option");

            option.value = i;
            option.textContent = "Verse " + i;

            verseSelect.appendChild(option);
        }
    }

    // =================================================
    // GET SELECTED BOOK
    // =================================================

    function getSelectedBook() {

        const testament =
            testamentSelect.value;

        const index =
            bookSelect.value;

        if (
            !testament ||
            index === ""
        ) {
            return null;
        }

        return bibleBooks[testament][Number(index)];
    }

    // =================================================
    // GET VERSE COUNT
    // =================================================

    function getVerseCount(book, chapter) {

        if (!book) return 0;

        const name = book[0];

        if (!verseCounts[name]) return 0;

        return verseCounts[name][chapter - 1] || 0;
    }

    // =================================================
    // GET CURRENT REFERENCE
    // =================================================

    function getReference(requireVerse = true) {

        const book =
            getSelectedBook();

        if (
            !book ||
            !chapterSelect.value
        ) {
            return null;
        }

        if (
            requireVerse &&
            !verseSelect.value
        ) {
            return null;
        }

        return {

            testament:
                testamentSelect.value,

            book:
                book[0],

            chapter:
                Number(chapterSelect.value),

            verse:
                requireVerse
                    ? Number(verseSelect.value)
                    : null
        };
    }

    // =================================================
    // GET TEXT FROM DATABASE
    // =================================================

    function getVerseText(data) {

        if (!data) return null;

        if (
            typeof BIBLE_DATABASE === "undefined"
        ) {
            return null;
        }

        const language =
            translationLanguage.value || "ur";

        const database =
            BIBLE_DATABASE[language] ||
            BIBLE_DATABASE.en;

        if (!database) return null;

        if (
            !database[data.testament] ||
            !database[data.testament][data.book] ||
            !database[data.testament][data.book][data.chapter]
        ) {
            return null;
        }

        return database
            [data.testament]
            [data.book]
            [data.chapter]
            [data.verse] || null;
    }

    // =================================================
    // GET FULL CHAPTER
    // =================================================

    function getChapterTexts(data) {

        if (!data) return [];

        if (
            typeof BIBLE_DATABASE === "undefined"
        ) {
            return [];
        }

        const language =
            translationLanguage.value || "ur";

        const database =
            BIBLE_DATABASE[language] ||
            BIBLE_DATABASE.en;

        if (!database) return [];

        const chapter =
            database
                [data.testament]
                ?. [data.book]
                ?. [data.chapter];

        if (!chapter) return [];

        const count =
            getVerseCount(
                [data.book],
                data.chapter
            );

        const verses = [];

        for (let i = 1; i <= count; i++) {

            if (
                typeof chapter[i] === "string" &&
                chapter[i].trim() !== ""
            ) {

                verses.push({
                    verse: i,
                    text: chapter[i]
                });
            }
        }

        return verses;
    }

    // =================================================
    // DIRECTION
    // =================================================

    function getDirection() {

        const lang =
            translationLanguage.value || "ur";

        if (
            typeof BIBLE_LANGUAGES !== "undefined" &&
            BIBLE_LANGUAGES[lang]
        ) {
            return BIBLE_LANGUAGES[lang].direction;
        }

        return lang === "en" || lang === "grc"
            ? "ltr"
            : "rtl";
    }

    // =================================================
    // RENDER VERSE
    // =================================================

    function renderVerse(data, text, title) {

        const direction =
            getDirection();

        const displayText =
            text ||
            "اس آیت کا متن ابھی local Bible database میں موجود نہیں ہے۔";

        result.innerHTML = `

            <div class="bible-reading-content"
                 dir="${direction}">

                <h2>${title}</h2>

                <h3>
                    ${data.book} ${data.chapter}:${data.verse}
                </h3>

                <div class="bible-control-bar">

                    <button
                        type="button"
                        id="verseAudioButton">
                        🔊 Listen
                    </button>

                    <button
                        type="button"
                        id="verseStopButton">
                        ⏹ Stop
                    </button>

                </div>

                <div
                    class="bible-verse-text"
                    id="verseText"
                >
                    <p>${displayText}</p>
                </div>

            </div>
        `;

        document
            .getElementById("verseAudioButton")
            ?.addEventListener(
                "click",
                function () {

                    speak(displayText);
                }
            );

        document
            .getElementById("verseStopButton")
            ?.addEventListener(
                "click",
                function () {

                    stopAudio();
                }
            );

        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // =================================================
    // RENDER FULL CHAPTER
    // =================================================

    function renderChapter(data) {

        stopAudio();

        const verses =
            getChapterTexts(data);

        const direction =
            getDirection();

        if (!verses.length) {

            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${direction}"
                >

                    <h2>
                        📖 ${data.book} Chapter ${data.chapter}
                    </h2>

                    <p>
                        اس باب کا مکمل متن local Bible database
                        میں ابھی شامل نہیں ہے۔
                    </p>

                </div>
            `;

            return;
        }

        let html = "";

        verses.forEach(function (item) {

            html += `

                <div
                    class="bible-chapter-verse"
                    id="verse-${item.verse}"
                >

                    <span class="bible-verse-number">
                        ${item.verse}
                    </span>

                    <span class="bible-chapter-text">
                        ${item.text}
                    </span>

                </div>
            `;
        });

        result.innerHTML = `

            <div
                class="bible-reading-content bible-full-chapter"
                dir="${direction}"
            >

                <h2>
                    📖 ${data.book} Chapter ${data.chapter}
                </h2>

                <div class="bible-control-bar">

                    <button
                        type="button"
                        id="chapterAudioButton">
                        🔊 Listen Chapter
                    </button>

                    <button
                        type="button"
                        id="chapterStopButton">
                        ⏹ Stop
                    </button>

                </div>

                <div
                    class="bible-chapter-body"
                    id="chapterBody"
                >
                    ${html}
                </div>

            </div>
        `;

        document
            .getElementById("chapterAudioButton")
            ?.addEventListener(
                "click",
                function () {

                    playChapterAudio(
                        verses
                    );
                }
            );

        document
            .getElementById("chapterStopButton")
            ?.addEventListener(
                "click",
                function () {

                    stopAudio();

                    document
                        .querySelectorAll(
                            ".active-bible-verse"
                        )
                        .forEach(function (el) {

                            el.classList.remove(
                                "active-bible-verse"
                            );
                        });
                }
            );

        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // =================================================
    // CHAPTER AUDIO
    // =================================================

    function playChapterAudio(verses) {

        if (!verses.length) return;

        stopAudio();

        let index = 0;

        function nextVerse() {

            if (index >= verses.length) {

                speaking = false;
                return;
            }

            document
                .querySelectorAll(
                    ".active-bible-verse"
                )
                .forEach(function (el) {

                    el.classList.remove(
                        "active-bible-verse"
                    );
                });

            const element =
                document.getElementById(
                    "verse-" + verses[index].verse
                );

            if (element) {

                element.classList.add(
                    "active-bible-verse"
                );

                element.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            const utterance =
                new SpeechSynthesisUtterance(
                    verses[index].text
                );

            utterance.lang =
                getSpeechLanguage();

            utterance.rate = 0.85;
            utterance.pitch = 1;
            utterance.volume = 1;

            utterance.onend = function () {

                index++;

                setTimeout(
                    nextVerse,
                    150
                );
            };

            utterance.onerror = function () {

                speaking = false;
            };

            speaking = true;

            window.speechSynthesis.speak(
                utterance
            );
        }

        nextVerse();
    }

    // =================================================
    // TESTAMENT
    // =================================================

    testamentSelect.addEventListener(
        "change",
        function () {

            stopAudio();

            loadBooks(
                testamentSelect.value
            );
        }
    );

    // =================================================
    // BOOK
    // =================================================

    bookSelect.addEventListener(
        "change",
        function () {

            stopAudio();

            loadChapters();
        }
    );

    // =================================================
    // CHAPTER
    // =================================================

    chapterSelect.addEventListener(
        "change",
        function () {

            stopAudio();

            loadVerses();

            // مکمل باب خودکار نہیں کھلے گا۔
            // پہلے Verse منتخب کریں۔
        }
    );

    // =================================================
    // VERSE
    // =================================================

    verseSelect.addEventListener(
        "change",
        function () {

            stopAudio();

            const data =
                getReference(true);

            if (!data) return;

            const text =
                getVerseText(data);

            renderVerse(
                data,
                text,
                "📖 Bible Reading"
            );
        }
    );

    // =================================================
    // TRANSLATION LANGUAGE
    // =================================================

    translationLanguage.addEventListener(
        "change",
        function () {

            stopAudio();

            const data =
                getReference(true);

            if (!data) return;

            const text =
                getVerseText(data);

            renderVerse(
                data,
                text,
                "📖 Bible Reading"
            );
        }
    );

    // =================================================
    // READ BIBLE
    // =================================================

    if (readBibleButton) {

        readBibleButton.addEventListener(
            "click",
            function () {

                stopAudio();

                const data =
                    getReference(true);

                if (!data) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse."
                    );

                    return;
                }

                renderVerse(
                    data,
                    getVerseText(data),
                    "📖 Bible Reading"
                );
            }
        );
    }

    // =================================================
    // LISTEN
    // =================================================

    if (listenBibleButton) {

        listenBibleButton.addEventListener(
            "click",
            function () {

                const data =
                    getReference(true);

                if (!data) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse."
                    );

                    return;
                }

                const text =
                    getVerseText(data);

                if (!text) {

                    alert(
                        "اس آیت کا متن local Bible database میں موجود نہیں ہے۔"
                    );

                    return;
                }

                renderVerse(
                    data,
                    text,
                    "🔊 Bible Audio"
                );

                setTimeout(
                    function () {
                        speak(text);
                    },
                    150
                );
            }
        );
    }

    // =================================================
    // RESEARCH
    // =================================================

    if (researchBibleButton) {

        researchBibleButton.addEventListener(
            "click",
            function () {

                stopAudio();

                const data =
                    getReference(true);

                if (!data) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse."
                    );

                    return;
                }

                renderVerse(
                    data,
                    getVerseText(data),
                    "🔎 Bible Research"
                );
            }
        );
    }

    // =================================================
    // SHOW FULL CHAPTER
    // =================================================

    // اگر بعد میں بٹن بنایا جائے تو یہ کام کرے گا۔

    window.openBibleChapter = function () {

        const data =
            getReference(false);

        if (!data) {

            alert(
                "Please select Testament, Book and Chapter."
            );

            return;
        }

        renderChapter(data);
    };

    // =================================================
    // INITIAL STATE
    // =================================================

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

    if (!testamentSelect.value) {
        testamentSelect.value = "new";
    }

    loadBooks(
        testamentSelect.value
    );

    console.log(
        "Bible Research System Ready"
    );

});
