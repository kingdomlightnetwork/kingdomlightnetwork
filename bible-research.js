// =====================================================
// KINGDOM LIGHT NETWORK
// BIBLE RESEARCH SYSTEM
// VERSE SELECTOR + FULL CHAPTER + AUDIO + ZOOM
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Kingdom Light Network Bible Research System Started");


    // =====================================================
    // ELEMENTS
    // =====================================================

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

    const listenBibleButton =
        document.getElementById("listenBibleButton");

    const researchBibleButton =
        document.getElementById("researchBibleButton");

    const result =
        document.getElementById("bibleResult");


    // =====================================================
    // CHECK
    // =====================================================

    if (
        !sourceLanguage ||
        !translationLanguage ||
        !testamentSelect ||
        !bookSelect ||
        !chapterSelect ||
        !verseSelect ||
        !result
    ) {

        console.error(
            "Bible selector elements are missing."
        );

        return;
    }


    // =====================================================
    // BIBLE BOOKS
    // =====================================================

    const bibleBooks = {

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


    // =====================================================
    // VERSE COUNTS
    // =====================================================

    const verseCounts = {

        new: {

            Matthew: {
                1:25, 2:23, 3:17, 4:25, 5:48, 6:34,
                7:29, 8:34, 9:38, 10:42, 11:30, 12:50,
                13:58, 14:36, 15:39, 16:28, 17:27, 18:35,
                19:30, 20:34, 21:46, 22:46, 23:39, 24:51,
                25:46, 26:75, 27:66, 28:20
            },

            Mark: {
                1:45, 2:28, 3:35, 4:41, 5:43, 6:56,
                7:37, 8:38, 9:50, 10:52, 11:33, 12:44,
                13:37, 14:72, 15:47, 16:20
            },

            Luke: {
                1:80, 2:52, 3:38, 4:44, 5:39, 6:49,
                7:50, 8:56, 9:62, 10:42, 11:54, 12:59,
                13:35, 14:35, 15:32, 16:31, 17:37, 18:43,
                19:48, 20:47, 21:38, 22:71, 23:56, 24:53
            },

            John: {
                1:51, 2:25, 3:36, 4:54, 5:47, 6:71,
                7:53, 8:59, 9:41, 10:42, 11:57, 12:50,
                13:38, 14:31, 15:27, 16:33, 17:26, 18:40,
                19:42, 20:31, 21:25
            },

            Acts: {
                1:26, 2:47, 3:26, 4:37, 5:42, 6:15,
                7:60, 8:40, 9:43, 10:48, 11:30, 12:25,
                13:52, 14:28, 15:41, 16:40, 17:34, 18:28,
                19:41, 20:38, 21:40, 22:30, 23:35, 24:27,
                25:27, 26:32, 27:44, 28:31
            },

            Romans: {
                1:32, 2:29, 3:31, 4:25, 5:21, 6:23,
                7:25, 8:39, 9:33, 10:21, 11:36, 12:21,
                13:14, 14:23, 15:33, 16:27
            },

            Galatians: {
                1:24, 2:21, 3:29, 4:31, 5:26, 6:18
            },

            Ephesians: {
                1:23, 2:22, 3:21, 4:32, 5:33, 6:24
            },

            Philippians: {
                1:30, 2:30, 3:21, 4:23
            },

            Colossians: {
                1:29, 2:23, 3:25, 4:18
            },

            "1 Thessalonians": {
                1:10, 2:20, 3:13, 4:18, 5:28
            },

            "2 Thessalonians": {
                1:12, 2:17, 3:18
            },

            "1 Timothy": {
                1:20, 2:15, 3:16, 4:16, 5:25, 6:21
            },

            "2 Timothy": {
                1:18, 2:26, 3:17, 4:22
            },

            Titus: {
                1:16, 2:15, 3:15
            },

            Philemon: {
                1:25
            },

            Hebrews: {
                1:14, 2:18, 3:19, 4:16, 5:14, 6:20,
                7:28, 8:13, 9:28, 10:39, 11:40, 12:29,
                13:25
            },

            James: {
                1:27, 2:26, 3:18, 4:17, 5:20
            },

            "1 Peter": {
                1:25, 2:25, 3:22, 4:19, 5:14
            },

            "2 Peter": {
                1:21, 2:22, 3:18
            },

            "1 John": {
                1:10, 2:29, 3:24, 4:21, 5:21
            },

            "2 John": {
                1:13
            },

            "3 John": {
                1:14
            },

            Jude: {
                1:25
            },

            Revelation: {
                1:20, 2:29, 3:22, 4:11, 5:14, 6:17,
                7:17, 8:13, 9:21, 10:11, 11:19, 12:17,
                13:18, 14:20, 15:8, 16:21, 17:18, 18:24,
                19:21, 20:15, 21:27, 22:21
            }

        },

        old: {

            Genesis: {
                1:31, 2:25, 3:24, 4:26, 5:32, 6:22,
                7:24, 8:22, 9:29, 10:32, 11:32, 12:20,
                13:18, 14:24, 15:21, 16:16, 17:27, 18:33,
                19:38, 20:18, 21:34, 22:24, 23:20, 24:67,
                25:34, 26:35, 27:46, 28:22, 29:35, 30:43,
                31:55, 32:32, 33:20, 34:31, 35:29, 36:43,
                37:36, 38:30, 39:23, 40:23, 41:57, 42:38,
                43:34, 44:34, 45:28, 46:34, 47:31, 48:22,
                49:33, 50:26
            },

            Exodus: {
                1:22, 2:25, 3:22, 4:31, 5:23, 6:30,
                7:25, 8:32, 9:35, 10:29, 11:10, 12:51,
                13:22, 14:31, 15:27, 16:36, 17:16, 18:27,
                19:25, 20:26, 21:36, 22:31, 23:33, 24:18,
                25:40, 26:37, 27:21, 28:43, 29:46, 30:38,
                31:18, 32:35, 33:23, 34:35, 35:35, 36:38,
                37:29, 38:31, 39:43, 40:38
            },

            Leviticus: {
                1:17, 2:16, 3:17, 4:35, 5:19, 6:30,
                7:38, 8:36, 9:24, 10:20, 11:47, 12:8,
                13:59, 14:57, 15:33, 16:34, 17:16, 18:30,
                19:37, 20:27, 21:24, 22:33, 23:44, 24:23,
                25:55, 26:46, 27:34
            },

            Numbers: {
                1:54, 2:34, 3:51, 4:49, 5:31, 6:27,
                7:89, 8:26, 9:23, 10:36, 11:35, 12:16,
                13:33, 14:45, 15:41, 16:50, 17:13, 18:32,
                19:22, 20:29, 21:35, 22:41, 23:30, 24:25,
                25:18, 26:65, 27:23, 28:31, 29:40, 30:16,
                31:54, 32:42, 33:56, 34:29, 35:34, 36:13
            },

            Deuteronomy: {
                1:46, 2:37, 3:29, 4:49, 5:33, 6:25,
                7:26, 8:20, 9:29, 10:22, 11:32, 12:32,
                13:18, 14:29, 15:23, 16:20, 17:20, 18:22,
                19:21, 20:20, 21:23, 22:30, 23:25, 24:22,
                25:19, 26:19, 27:26, 28:68, 29:29, 30:20,
                31:30, 32:52, 33:29, 34:12
            }

        }

    };


    // =====================================================
    // AUDIO STATE
    // =====================================================

    let chapterAudioActive = false;
    let chapterAudioIndex = 0;
    let chapterAudioVerses = [];

    let bibleTextSize = 24;


    // =====================================================
    // RESET SELECT
    // =====================================================

    function resetSelect(select, text) {

        select.innerHTML = "";

        const option =
            document.createElement("option");

        option.value = "";
        option.textContent = text;

        select.appendChild(option);
    }


    // =====================================================
    // LOAD BOOKS
    // =====================================================

    function loadBooks(testament) {

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

        if (!bibleBooks[testament]) {
            return;
        }

        bibleBooks[testament].forEach(
            function (book, index) {

                const option =
                    document.createElement("option");

                option.value = index;
                option.textContent = book.name;

                bookSelect.appendChild(option);

            }
        );
    }


    // =====================================================
    // LOAD CHAPTERS
    // =====================================================

    function loadChapters(testament, bookIndex) {

        resetSelect(
            chapterSelect,
            "Select Chapter"
        );

        resetSelect(
            verseSelect,
            "Select Verse"
        );

        if (
            !bibleBooks[testament] ||
            bookIndex === ""
        ) {
            return;
        }

        const book =
            bibleBooks[testament][
                Number(bookIndex)
            ];

        if (!book) {
            return;
        }

        for (
            let i = 1;
            i <= book.chapters;
            i++
        ) {

            const option =
                document.createElement("option");

            option.value = i;
            option.textContent =
                "Chapter " + i;

            chapterSelect.appendChild(option);
        }
    }


    // =====================================================
    // LOAD VERSES
    // =====================================================

    function loadVerses(
        testament,
        bookIndex,
        chapter
    ) {

        resetSelect(
            verseSelect,
            "Select Verse"
        );

        if (
            !bibleBooks[testament] ||
            bookIndex === "" ||
            chapter === ""
        ) {
            return;
        }

        const book =
            bibleBooks[testament][
                Number(bookIndex)
            ];

        if (!book) {
            return;
        }

        const count =
            verseCounts[testament] &&
            verseCounts[testament][book.name] &&
            verseCounts[testament][book.name][
                Number(chapter)
            ];

        if (!count) {
            console.log(
                "Verse count not available:",
                book.name,
                chapter
            );
            return;
        }

        for (
            let i = 1;
            i <= count;
            i++
        ) {

            const option =
                document.createElement("option");

            option.value = i;

            option.textContent =
                "Verse " + i;

            verseSelect.appendChild(option);
        }

        console.log(
            "Loaded verses:",
            book.name,
            "Chapter",
            chapter,
            "Count:",
            count
        );
    }


    // =====================================================
    // GET CURRENT REFERENCE
    // =====================================================

    function getReference(requireVerse = true) {

        if (
            !testamentSelect.value ||
            bookSelect.value === "" ||
            chapterSelect.value === ""
        ) {
            return null;
        }

        if (
            requireVerse &&
            verseSelect.value === ""
        ) {
            return null;
        }

        const book =
            bibleBooks[
                testamentSelect.value
            ][
                Number(bookSelect.value)
            ];

        if (!book) {
            return null;
        }

        return {

            testament:
                testamentSelect.value,

            book:
                book.name,

            chapter:
                Number(chapterSelect.value),

            verse:
                requireVerse
                    ? Number(verseSelect.value)
                    : null,

            reference:
                book.name +
                " " +
                chapterSelect.value +
                (
                    requireVerse
                        ? ":" + verseSelect.value
                        : ""
                )

        };
    }


    // =====================================================
    // GET SELECTED DATABASE
    // =====================================================

    function getDatabase() {

        const language =
            translationLanguage.value || "ur";

        if (
            typeof BIBLE_DATABASE === "undefined"
        ) {
            console.error(
                "BIBLE_DATABASE not found."
            );
            return null;
        }

        return (
            BIBLE_DATABASE[language] ||
            BIBLE_DATABASE.en ||
            null
        );
    }


    // =====================================================
    // GET VERSE TEXT
    // =====================================================

    function getVerseText(data) {

        const database =
            getDatabase();

        if (!database || !data) {
            return null;
        }

        const testament =
            database[data.testament];

        if (!testament) {
            return null;
        }

        const book =
            testament[data.book];

        if (!book) {
            return null;
        }

        const chapter =
            book[data.chapter];

        if (!chapter) {
            return null;
        }

        return (
            typeof chapter[data.verse] === "string"
                ? chapter[data.verse]
                : null
        );
    }


    // =====================================================
    // GET FULL CHAPTER
    // =====================================================

    function getChapterText(data) {

        const database =
            getDatabase();

        if (!database || !data) {
            return [];
        }

        const testament =
            database[data.testament];

        if (!testament) {
            return [];
        }

        const book =
            testament[data.book];

        if (!book) {
            return [];
        }

        const chapter =
            book[data.chapter];

        if (!chapter) {
            return [];
        }

        const count =
            verseCounts[data.testament] &&
            verseCounts[data.testament][data.book] &&
            verseCounts[data.testament][data.book][
                data.chapter
            ];

        if (!count) {
            return [];
        }

        const verses = [];

        for (
            let i = 1;
            i <= count;
            i++
        ) {

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


    // =====================================================
    // LANGUAGE DIRECTION
    // =====================================================

    function getDirection() {

        const language =
            translationLanguage.value || "ur";

        if (
            typeof BIBLE_LANGUAGES !== "undefined" &&
            BIBLE_LANGUAGES[language]
        ) {

            return BIBLE_LANGUAGES[
                language
            ].direction;

        }

        return "rtl";
    }


    // =====================================================
    // SPEECH LANGUAGE
    // =====================================================

    function getSpeechLanguage() {

        const language =
            translationLanguage.value || "ur";

        if (language === "ur") {
            return "ur-PK";
        }

        if (language === "pa") {
            return "pa-PK";
        }

        if (language === "ar") {
            return "ar-SA";
        }

        return "en-US";
    }


    // =====================================================
    // STOP AUDIO
    // =====================================================

    function stopAudio() {

        chapterAudioActive = false;
        chapterAudioIndex = 0;
        chapterAudioVerses = [];

        if (
            "speechSynthesis" in window
        ) {

            window.speechSynthesis.cancel();

        }

        updateAudioButtons();
    }


    // =====================================================
    // UPDATE AUDIO BUTTONS
    // =====================================================

    function updateAudioButtons() {

        const stopButton =
            document.getElementById(
                "chapterAudioStopButton"
            );

        const chapterButton =
            document.getElementById(
                "chapterAudioButton"
            );

        if (stopButton) {

            stopButton.disabled =
                !chapterAudioActive;
        }

        if (chapterButton) {

            chapterButton.textContent =
                chapterAudioActive
                    ? "⏸ Listen Chapter"
                    : "🔊 Listen Chapter";
        }
    }


    // =====================================================
    // SPEAK TEXT
    // =====================================================

    function speakText(text, onEnd) {

        if (
            !text ||
            !("speechSynthesis" in window)
        ) {
            alert(
                "آپ کے براؤزر میں آڈیو سسٹم دستیاب نہیں ہے۔"
            );
            return;
        }

        window.speechSynthesis.cancel();

        const utterance =
            new SpeechSynthesisUtterance(text);

        utterance.lang =
            getSpeechLanguage();

        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend =
            function () {

                if (onEnd) {
                    onEnd();
                }
            };

        utterance.onerror =
            function () {

                console.error(
                    "Speech synthesis error."
                );

                if (onEnd) {
                    onEnd();
                }
            };

        window.speechSynthesis.speak(
            utterance
        );
    }


    // =====================================================
    // RENDER VERSE
    // =====================================================

    function renderVerse(
        data,
        text,
        title
    ) {

        const direction =
            getDirection();

        const displayText =
            text ||
            "اس آیت کا متن ابھی Bible Database میں شامل نہیں ہے۔";


        result.innerHTML = `

            <div
                class="bible-reading-content"
                dir="${direction}"
            >

                <h2>
                    ${title}
                </h2>

                <h3>
                    ${data.reference}
                </h3>

                <div class="bible-control-bar">

                    <button
                        type="button"
                        id="biblePlayButton"
                    >
                        ▶ آڈیو
                    </button>

                    <button
                        type="button"
                        id="chapterAudioButton"
                    >
                        🔊 Listen Chapter
                    </button>

                    <button
                        type="button"
                        id="chapterAudioStopButton"
                        disabled
                    >
                        ⏹ Stop
                    </button>

                    <button
                        type="button"
                        id="readChapterButton"
                    >
                        📖 Full Chapter
                    </button>

                    <button
                        type="button"
                        id="zoomOutButton"
                    >
                        A−
                    </button>

                    <button
                        type="button"
                        id="zoomResetButton"
                    >
                        A
                    </button>

                    <button
                        type="button"
                        id="zoomInButton"
                    >
                        A+
                    </button>

                    <button
                        type="button"
                        id="zoomLargeButton"
                    >
                        A++
                    </button>

                </div>

                <div
                    class="bible-verse-text"
                    style="font-size:${bibleTextSize}px;"
                >

                    <p>
                        ${displayText}
                    </p>

                </div>

            </div>
        `;


        attachResultButtons(
            displayText,
            data
        );


        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    // =====================================================
    // BUTTON EVENTS AFTER RENDER
    // =====================================================

    function attachResultButtons(
        text,
        data
    ) {

        const playButton =
            document.getElementById(
                "biblePlayButton"
            );

        const chapterButton =
            document.getElementById(
                "chapterAudioButton"
            );

        const stopButton =
            document.getElementById(
                "chapterAudioStopButton"
            );

        const fullChapterButton =
            document.getElementById(
                "readChapterButton"
            );

        const zoomOut =
            document.getElementById(
                "zoomOutButton"
            );

        const zoomReset =
            document.getElementById(
                "zoomResetButton"
            );

        const zoomIn =
            document.getElementById(
                "zoomInButton"
            );

        const zoomLarge =
            document.getElementById(
                "zoomLargeButton"
            );


        // =================================================
        // SINGLE AUDIO
        // =================================================

        if (playButton) {

            playButton.addEventListener(
                "click",
                function () {

                    if (
                        window.speechSynthesis.speaking
                    ) {

                        window.speechSynthesis.cancel();

                        playButton.textContent =
                            "▶ آڈیو";

                        return;
                    }

                    speakText(
                        text,
                        function () {

                            playButton.textContent =
                                "▶ آڈیو";

                        }
                    );

                    playButton.textContent =
                        "⏸ Pause";

                }
            );
        }


        // =================================================
        // CHAPTER AUDIO
        // =================================================

        if (chapterButton) {

            chapterButton.addEventListener(
                "click",
                function () {

                    startChapterAudio(data);

                }
            );
        }


        // =================================================
        // STOP
        // =================================================

        if (stopButton) {

            stopButton.addEventListener(
                "click",
                function () {

                    stopAudio();

                }
            );
        }


        // =================================================
        // FULL CHAPTER
        // =================================================

        if (fullChapterButton) {

            fullChapterButton.addEventListener(
                "click",
                function () {

                    stopAudio();

                    renderFullChapter(data);

                }
            );
        }


        // =================================================
        // ZOOM OUT
        // =================================================

        if (zoomOut) {

            zoomOut.addEventListener(
                "click",
                function () {

                    bibleTextSize =
                        Math.max(
                            16,
                            bibleTextSize - 2
                        );

                    applyZoom();

                }
            );
        }


        // =================================================
        // ZOOM RESET
        // =================================================

        if (zoomReset) {

            zoomReset.addEventListener(
                "click",
                function () {

                    bibleTextSize =
                        24;

                    applyZoom();

                }
            );
        }


        // =================================================
        // ZOOM IN
        // =================================================

        if (zoomIn) {

            zoomIn.addEventListener(
                "click",
                function () {

                    bibleTextSize =
                        Math.min(
                            42,
                            bibleTextSize + 2
                        );

                    applyZoom();

                }
            );
        }


        // =================================================
        // ZOOM LARGE
        // =================================================

        if (zoomLarge) {

            zoomLarge.addEventListener(
                "click",
                function () {

                    bibleTextSize =
                        48;

                    applyZoom();

                }
            );
        }

    }


    // =====================================================
    // ZOOM
    // =====================================================

    function applyZoom() {

        document
            .querySelectorAll(
                ".bible-verse-text"
            )
            .forEach(
                function (element) {

                    element.style.fontSize =
                        bibleTextSize + "px";

                }
            );

        document
            .querySelectorAll(
                ".bible-chapter-body"
            )
            .forEach(
                function (element) {

                    element.style.fontSize =
                        bibleTextSize + "px";

                }
            );

        document
            .querySelectorAll(
                ".bible-chapter-text"
            )
            .forEach(
                function (element) {

                    element.style.fontSize =
                        bibleTextSize + "px";

                }
            );
    }


    // =====================================================
    // FULL CHAPTER
    // =====================================================

    function renderFullChapter(data) {

        const verses =
            getChapterText(data);

        const direction =
            getDirection();

        if (!verses.length) {

            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${direction}"
                >

                    <h2>
                        📖 ${data.book} ${data.chapter}
                    </h2>

                    <p>
                        اس باب کا اصل متن ابھی Bible Database میں موجود نہیں ہے۔
                    </p>

                </div>

            `;

            return;
        }


        let html = "";


        verses.forEach(
            function (item) {

                html += `

                    <div
                        class="bible-chapter-verse"
                        id="chapter-verse-${item.verse}"
                    >

                        <span
                            class="bible-verse-number"
                        >
                            ${item.verse}
                        </span>

                        <span
                            class="bible-chapter-text"
                            style="font-size:${bibleTextSize}px;"
                        >
                            ${item.text}
                        </span>

                    </div>

                `;

            }
        );


        result.innerHTML = `

            <div
                class="bible-reading-content bible-full-chapter"
                dir="${direction}"
            >

                <h2>
                    📖 ${data.book} Chapter ${data.chapter}
                </h2>

                <div
                    class="bible-control-bar"
                >

                    <button
                        type="button"
                        id="chapterAudioButton"
                    >
                        🔊 Listen Chapter
                    </button>

                    <button
                        type="button"
                        id="chapterAudioStopButton"
                        disabled
                    >
                        ⏹ Stop
                    </button>

                    <button
                        type="button"
                        id="zoomOutButton"
                    >
                        A−
                    </button>

                    <button
                        type="button"
                        id="zoomResetButton"
                    >
                        A
                    </button>

                    <button
                        type="button"
                        id="zoomInButton"
                    >
                        A+
                    </button>

                    <button
                        type="button"
                        id="zoomLargeButton"
                    >
                        A++
                    </button>

                </div>

                <div
                    class="bible-chapter-body"
                    style="font-size:${bibleTextSize}px;"
                >

                    ${html}

                </div>

            </div>
        `;


        attachChapterButtons(data);

    }


    // =====================================================
    // FULL CHAPTER BUTTONS
    // =====================================================

    function attachChapterButtons(data) {

        const chapterButton =
            document.getElementById(
                "chapterAudioButton"
            );

        const stopButton =
            document.getElementById(
                "chapterAudioStopButton"
            );

        const zoomOut =
            document.getElementById(
                "zoomOutButton"
            );

        const zoomReset =
            document.getElementById(
                "zoomResetButton"
            );

        const zoomIn =
            document.getElementById(
                "zoomInButton"
            );

        const zoomLarge =
            document.getElementById(
                "zoomLargeButton"
            );


        if (chapterButton) {

            chapterButton.addEventListener(
                "click",
                function () {

                    startChapterAudio(data);

                }
            );
        }


        if (stopButton) {

            stopButton.addEventListener(
                "click",
                function () {

                    stopAudio();

                }
            );
        }


        if (zoomOut) {

            zoomOut.addEventListener(
                "click",
                function () {

                    bibleTextSize =
                        Math.max(
                            16,
                            bibleTextSize - 2
                        );

                    applyZoom();

                }
            );
        }


        if (zoomReset) {

            zoomReset.addEventListener(
                "click",
                function () {

                    bibleTextSize = 24;

                    applyZoom();

                }
            );
        }


        if (zoomIn) {

            zoomIn.addEventListener(
                "click",
                function () {

                    bibleTextSize =
                        Math.min(
                            42,
                            bibleTextSize + 2
                        );

                    applyZoom();

                }
            );
        }


        if (zoomLarge) {

            zoomLarge.addEventListener(
                "click",
                function () {

                    bibleTextSize = 48;

                    applyZoom();

                }
            );
        }

    }


    // =====================================================
    // CHAPTER AUDIO
    // =====================================================

    function startChapterAudio(data) {

        const verses =
            getChapterText(data);

        if (!verses.length) {

            alert(
                "اس باب کا متن Bible Database میں موجود نہیں ہے۔"
            );

            return;
        }


        if (chapterAudioActive) {

            if (
                window.speechSynthesis.paused
            ) {

                window.speechSynthesis.resume();

            } else {

                window.speechSynthesis.pause();

            }

            return;
        }


        chapterAudioVerses =
            verses;

        chapterAudioIndex = 0;

        chapterAudioActive = true;

        updateAudioButtons();

        speakNextVerse();

    }


    // =====================================================
    // NEXT CHAPTER VERSE
    // =====================================================

    function speakNextVerse() {

        if (!chapterAudioActive) {
            return;
        }


        if (
            chapterAudioIndex >=
            chapterAudioVerses.length
        ) {

            chapterAudioActive = false;

            chapterAudioIndex = 0;

            updateAudioButtons();

            return;
        }


        const current =
            chapterAudioVerses[
                chapterAudioIndex
            ];


        document
            .querySelectorAll(
                ".active-bible-verse"
            )
            .forEach(
                function (element) {

                    element.classList.remove(
                        "active-bible-verse"
                    );

                }
            );


        const element =
            document.getElementById(
                "chapter-verse-" +
                current.verse
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


        window.speechSynthesis.cancel();


        const utterance =
            new SpeechSynthesisUtterance(
                current.text
            );

        utterance.lang =
            getSpeechLanguage();

        utterance.rate = 0.9;

        utterance.pitch = 1;

        utterance.volume = 1;


        utterance.onend =
            function () {

                if (!chapterAudioActive) {
                    return;
                }

                chapterAudioIndex++;

                setTimeout(
                    function () {

                        speakNextVerse();

                    },
                    250
                );

            };


        utterance.onerror =
            function () {

                if (!chapterAudioActive) {
                    return;
                }

                chapterAudioIndex++;

                speakNextVerse();

            };


        window.speechSynthesis.speak(
            utterance
        );

    }


    // =====================================================
    // TESTAMENT
    // =====================================================

    testamentSelect.addEventListener(
        "change",
        function () {

            stopAudio();

            loadBooks(
                testamentSelect.value
            );

        }
    );


    // =====================================================
    // BOOK
    // =====================================================

    bookSelect.addEventListener(
        "change",
        function () {

            stopAudio();

            loadChapters(
                testamentSelect.value,
                bookSelect.value
            );

        }
    );


    // =====================================================
    // CHAPTER
    // =====================================================

    chapterSelect.addEventListener(
        "change",
        function () {

            stopAudio();

            loadVerses(
                testamentSelect.value,
                bookSelect.value,
                chapterSelect.value
            );

        }
    );


    // =====================================================
    // VERSE
    // =====================================================

    verseSelect.addEventListener(
        "change",
        function () {

            stopAudio();

        }
    );


    // =====================================================
    // TRANSLATION LANGUAGE
    // =====================================================

    translationLanguage.addEventListener(
        "change",
        function () {

            stopAudio();

            const data =
                getReference();

            if (data) {

                const text =
                    getVerseText(data);

                renderVerse(
                    data,
                    text,
                    "📖 Bible Reading"
                );

            }

        }
    );


    // =====================================================
    // READ BIBLE
    // =====================================================

    if (readBibleButton) {

        readBibleButton.addEventListener(
            "click",
            function () {

                stopAudio();

                const data =
                    getReference();

                if (!data) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse."
                    );

                    return;
                }

                const text =
                    getVerseText(data);

                renderVerse(
                    data,
                    text,
                    "📖 Bible Reading"
                );

            }
        );
    }


    // =====================================================
    // LISTEN SINGLE VERSE
    // =====================================================

    if (listenBibleButton) {

        listenBibleButton.addEventListener(
            "click",
            function () {

                stopAudio();

                const data =
                    getReference();

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
                        "اس آیت کا متن Bible Database میں موجود نہیں ہے۔"
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

                        speakText(
                            text,
                            null
                        );

                    },
                    200
                );

            }
        );
    }


    // =====================================================
    // RESEARCH
    // =====================================================

    if (researchBibleButton) {

        researchBibleButton.addEventListener(
            "click",
            function () {

                stopAudio();

                const data =
                    getReference();

                if (!data) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse."
                    );

                    return;
                }

                const text =
                    getVerseText(data);

                renderVerse(
                    data,
                    text,
                    "🔎 Bible Research"
                );

            }
        );
    }


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    if (!testamentSelect.value) {

        testamentSelect.value =
            "new";

    }


    loadBooks(
        testamentSelect.value
    );


    console.log(
        "Bible Research System initialized successfully."
    );

});
