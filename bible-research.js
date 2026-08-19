// =====================================================
// KINGDOM LIGHT NETWORK
// BIBLE RESEARCH SYSTEM
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Bible Research System is running");


    // =================================================
    // ELEMENTS
    // =================================================

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


    // =================================================
    // CHECK SELECTORS
    // =================================================

    if (
        !testamentSelect ||
        !bookSelect ||
        !chapterSelect ||
        !verseSelect
    ) {

        console.error(
            "Bible selectors are missing from bible-research.html"
        );

        return;

    }


    // =================================================
    // CHECK BIBLE DATABASE
    // =================================================

    if (
        typeof KJV_BIBLE === "undefined"
    ) {

        console.error(
            "KJV_BIBLE is not loaded. Make sure bible-data.js is loaded before bible-research.js."
        );

    } else {

        console.log(
            "KJV Bible database loaded successfully."
        );

    }


    // =================================================
    // BOOK CREATOR
    // =================================================

    function makeBooks(text) {

        return text
            .split(",")
            .map(function (item) {

                const parts =
                    item.split(":");

                return {

                    name:
                        parts[0].trim(),

                    chapters:
                        Number(parts[1])

                };

            });

    }


    // =================================================
    // BIBLE BOOKS
    // =================================================

    const bibleBooks = {

        old: makeBooks(
            "Genesis:50," +
            "Exodus:40," +
            "Leviticus:27," +
            "Numbers:36," +
            "Deuteronomy:34," +
            "Joshua:24," +
            "Judges:21," +
            "Ruth:4," +
            "1 Samuel:31," +
            "2 Samuel:24," +
            "1 Kings:22," +
            "2 Kings:25," +
            "1 Chronicles:29," +
            "2 Chronicles:36," +
            "Ezra:10," +
            "Nehemiah:13," +
            "Esther:10," +
            "Job:42," +
            "Psalms:150," +
            "Proverbs:31," +
            "Ecclesiastes:12," +
            "Song of Solomon:8," +
            "Isaiah:66," +
            "Jeremiah:52," +
            "Lamentations:5," +
            "Ezekiel:48," +
            "Daniel:12," +
            "Hosea:14," +
            "Joel:3," +
            "Amos:9," +
            "Obadiah:1," +
            "Jonah:4," +
            "Micah:7," +
            "Nahum:3," +
            "Habakkuk:3," +
            "Zephaniah:3," +
            "Haggai:2," +
            "Zechariah:14," +
            "Malachi:4"
        ),

        new: makeBooks(
            "Matthew:28," +
            "Mark:16," +
            "Luke:24," +
            "John:21," +
            "Acts:28," +
            "Romans:16," +
            "1 Corinthians:16," +
            "2 Corinthians:13," +
            "Galatians:6," +
            "Ephesians:6," +
            "Philippians:4," +
            "Colossians:4," +
            "1 Thessalonians:5," +
            "2 Thessalonians:3," +
            "1 Timothy:6," +
            "2 Timothy:4," +
            "Titus:3," +
            "Philemon:1," +
            "Hebrews:13," +
            "James:5," +
            "1 Peter:5," +
            "2 Peter:3," +
            "1 John:5," +
            "2 John:1," +
            "3 John:1," +
            "Jude:1," +
            "Revelation:22"
        )

    };


    // =================================================
    // COMPLETE VERSE COUNTS
    // =================================================

    const localVerseCounts = {

        new: {

            Matthew: {
                1:25,2:23,3:17,4:25,5:48,6:34,7:29,
                8:34,9:38,10:42,11:30,12:50,13:58,14:36,
                15:39,16:28,17:27,18:35,19:30,20:34,
                21:46,22:46,23:39,24:51,25:46,26:75,
                27:66,28:20
            },

            Mark: {
                1:45,2:28,3:35,4:41,5:43,6:56,7:37,
                8:38,9:50,10:52,11:33,12:44,13:37,
                14:72,15:47,16:20
            },

            Luke: {
                1:80,2:52,3:38,4:44,5:39,6:49,7:50,
                8:56,9:62,10:42,11:54,12:59,13:35,
                14:35,15:32,16:31,17:37,18:43,19:48,
                20:47,21:38,22:71,23:56,24:53
            },

            John: {
                1:51,2:25,3:36,4:54,5:47,6:71,7:53,
                8:59,9:41,10:42,11:57,12:50,13:38,
                14:31,15:27,16:33,17:26,18:40,19:42,
                20:31,21:25
            },

            Acts: {
                1:26,2:47,3:26,4:37,5:42,6:15,7:60,
                8:40,9:43,10:48,11:30,12:25,13:52,
                14:28,15:41,16:40,17:34,18:28,19:41,
                20:38,21:40,22:30,23:35,24:27,25:27,
                26:32,27:44,28:31
            },

            Romans: {
                1:32,2:29,3:31,4:25,5:21,6:23,7:25,
                8:39,9:33,10:21,11:36,12:21,13:14,
                14:23,15:33,16:27
            },

            Galatians: {
                1:24,2:21,3:29,4:31,5:26,6:18
            },

            Ephesians: {
                1:23,2:22,3:21,4:32,5:33,6:24
            },

            Philippians: {
                1:30,2:30,3:21,4:23
            },

            Colossians: {
                1:29,2:23,3:25,4:18
            },

            "1 Thessalonians": {
                1:10,2:20,3:13,4:18,5:28
            },

            "2 Thessalonians": {
                1:12,2:17,3:18
            },

            "1 Timothy": {
                1:20,2:15,3:16,4:16,5:25,6:21
            },

            "2 Timothy": {
                1:18,2:26,3:17,4:22
            },

            Titus: {
                1:16,2:15,3:15
            },

            Philemon: {
                1:25
            },

            Hebrews: {
                1:14,2:18,3:19,4:16,5:14,6:20,7:28,
                8:13,9:28,10:39,11:40,12:29,13:25
            },

            James: {
                1:27,2:26,3:18,4:17,5:20
            },

            "1 Peter": {
                1:25,2:25,3:22,4:19,5:14
            },

            "2 Peter": {
                1:21,2:22,3:18
            },

            "1 John": {
                1:10,2:29,3:24,4:21,5:21
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
                1:20,2:29,3:22,4:11,5:14,6:17,7:17,
                8:13,9:21,10:11,11:19,12:17,13:18,14:20,
                15:8,16:21,17:18,18:24,19:21,20:15,
                21:27,22:21
            }

        },

        old: {

            Genesis: {
                1:31,2:25,3:24,4:26,5:32,6:22,7:24,
                8:22,9:29,10:32,11:32,12:20,13:18,
                14:24,15:21,16:16,17:27,18:33,19:38,
                20:18,21:34,22:24,23:20,24:67,25:34,
                26:35,27:46,28:22,29:35,30:43,31:55,
                32:32,33:20,34:31,35:29,36:43,37:36,
                38:30,39:23,40:23,41:57,42:38,43:34,
                44:34,45:28,46:34,47:31,48:22,49:33,
                50:26
            },

            Exodus: {
                1:22,2:25,3:22,4:31,5:23,6:30,7:25,
                8:32,9:35,10:29,11:10,12:51,13:22,
                14:31,15:27,16:36,17:16,18:27,19:25,
                20:26,21:36,22:31,23:33,24:18,25:40,
                26:37,27:21,28:43,29:46,30:38,31:18,
                32:35,33:23,34:35,35:35,36:38,37:29,
                38:31,39:43,40:38
            },

            Leviticus: {
                1:17,2:16,3:17,4:35,5:19,6:30,7:38,
                8:36,9:24,10:20,11:47,12:8,13:59,
                14:57,15:33,16:34,17:16,18:30,19:37,
                20:27,21:24,22:33,23:44,24:23,25:55,
                26:46,27:34
            },

            Numbers: {
                1:54,2:34,3:51,4:49,5:31,6:27,7:89,
                8:26,9:23,10:36,11:35,12:16,13:33,
                14:45,15:41,16:50,17:13,18:32,19:22,
                20:29,21:35,22:41,23:30,24:25,25:18,
                26:65,27:23,28:31,29:40,30:16,31:54,
                32:42,33:56,34:29,35:34,36:13
            },

            Deuteronomy: {
                1:46,2:37,3:29,4:49,5:33,6:25,7:26,
                8:20,9:29,10:22,11:32,12:32,13:18,
                14:29,15:23,16:20,17:20,18:22,19:21,
                20:20,21:23,22:30,23:25,24:22,25:19,
                26:19,27:26,28:68,29:29,30:20,31:30,
                32:52,33:29,34:12
            }

        }

    };


    // =================================================
    // RESET SELECT
    // =================================================

    function resetSelect(
        selectElement,
        text
    ) {

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


    // =================================================
    // LOAD BOOKS
    // =================================================

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

        bibleBooks[testament]
            .forEach(function (book, index) {

                const option =
                    document.createElement("option");

                option.value =
                    String(index);

                option.textContent =
                    book.name;

                bookSelect.appendChild(
                    option
                );

            });

    }


    // =================================================
    // LOAD CHAPTERS
    // =================================================

    function loadChapters(
        testament,
        bookIndex
    ) {

        resetSelect(
            chapterSelect,
            "Select Chapter"
        );

        resetSelect(
            verseSelect,
            "Select Verse"
        );

        if (
            bookIndex === "" ||
            !bibleBooks[testament]
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

            option.value =
                String(i);

            option.textContent =
                "Chapter " + i;

            chapterSelect.appendChild(
                option
            );

        }

    }


    // =================================================
    // GET VERSE COUNT
    // =================================================

    function getVerseCount(
        testament,
        bookName,
        chapter
    ) {

        const testamentData =
            localVerseCounts[testament];

        if (!testamentData) {
            return 176;
        }

        const bookData =
            testamentData[bookName];

        if (!bookData) {
            return 176;
        }

        const count =
            bookData[Number(chapter)];

        if (
            typeof count === "number" &&
            count > 0
        ) {

            return count;

        }

        return 176;

    }


    // =================================================
    // LOAD VERSES
    // =================================================

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
            bookIndex === "" ||
            chapter === "" ||
            !bibleBooks[testament]
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
            getVerseCount(
                testament,
                book.name,
                Number(chapter)
            );

        for (
            let i = 1;
            i <= count;
            i++
        ) {

            const option =
                document.createElement("option");

            option.value =
                String(i);

            option.textContent =
                "Verse " + i;

            verseSelect.appendChild(
                option
            );

        }

    }


    // =================================================
    // GET BIBLE REFERENCE
    // =================================================

    function getBibleReference() {

        if (
            !testamentSelect.value ||
            bookSelect.value === "" ||
            chapterSelect.value === "" ||
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
                Number(
                    chapterSelect.value
                ),

            verse:
                Number(
                    verseSelect.value
                ),

            reference:
                book.name +
                " " +
                chapterSelect.value +
                ":" +
                verseSelect.value

        };

    }


    // =================================================
    // LOCAL BIBLE DATA CONNECTION
    // =================================================
    // IMPORTANT:
    // Bible verse text comes ONLY from bible-data.js
    // =================================================

    function getLocalBibleVerse(data) {

        if (!data) {
            return null;
        }

        if (
            typeof KJV_BIBLE === "undefined"
        ) {

            console.error(
                "KJV_BIBLE is not loaded. Check bible-data.js."
            );

            return null;

        }


        // ---------------------------------------------
        // TESTAMENT
        // ---------------------------------------------

        const testamentData =
            KJV_BIBLE[
                data.testament
            ];

        if (!testamentData) {
            return null;
        }


        // ---------------------------------------------
        // BOOK
        // ---------------------------------------------

        const bookData =
            testamentData[
                data.book
            ];

        if (!bookData) {
            return null;
        }


        // ---------------------------------------------
        // CHAPTER
        // ---------------------------------------------

        const chapterData =
            bookData[
                String(data.chapter)
            ];

        if (!chapterData) {
            return null;
        }


        // ---------------------------------------------
        // VERSE
        // ---------------------------------------------

        const verseText =
            chapterData[
                String(data.verse)
            ];

        if (
            typeof verseText === "string" &&
            verseText.trim() !== ""
        ) {

            return verseText;

        }

        return null;

    }


    // =================================================
    // RESULT PANEL
    // =================================================

    function getBibleResult() {

        let result =
            document.getElementById(
                "bibleResult"
            );

        if (!result) {

            result =
                document.createElement(
                    "section"
                );

            result.id =
                "bibleResult";

            result.className =
                "bible-reading-panel";

            const searchBox =
                document.querySelector(
                    ".research-search-box"
                );

            if (searchBox) {

                searchBox.insertAdjacentElement(
                    "afterend",
                    result
                );

            } else {

                document.body.appendChild(
                    result
                );

            }

        }

        return result;

    }


    // =================================================
    // DISPLAY RESULT
    // =================================================

    function renderBibleResult(
        title,
        data,
        text,
        extra
    ) {

        const result =
            getBibleResult();

        result.innerHTML = `

            <div class="bible-reading-content">

                <h2>
                    ${title}
                </h2>

                <h3>
                    ${data.reference}
                </h3>

                <div class="bible-verse-text">

                    <p>
                        ${
                            text ||
                            "📖 اس آیت کا اصل متن ابھی bible-data.js میں شامل نہیں ہے۔"
                        }
                    </p>

                </div>

                ${
                    extra || ""
                }

            </div>

        `;

        result.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }


    // =================================================
    // TESTAMENT CHANGE
    // =================================================

    testamentSelect.addEventListener(
        "change",
        function () {

            loadBooks(
                testamentSelect.value
            );

        }
    );


    // =================================================
    // BOOK CHANGE
    // =================================================

    bookSelect.addEventListener(
        "change",
        function () {

            loadChapters(
                testamentSelect.value,
                bookSelect.value
            );

        }
    );


    // =================================================
    // CHAPTER CHANGE
    // =================================================

    chapterSelect.addEventListener(
        "change",
        function () {

            loadVerses(
                testamentSelect.value,
                bookSelect.value,
                chapterSelect.value
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

                const data =
                    getBibleReference();

                if (!data) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse."
                    );

                    return;

                }

                const text =
                    getLocalBibleVerse(
                        data
                    );

                renderBibleResult(
                    "📖 Bible Reading",
                    data,
                    text,
                    ""
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
                    getBibleReference();

                if (!data) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse."
                    );

                    return;

                }

                const text =
                    getLocalBibleVerse(
                        data
                    );

                if (!text) {

                    alert(
                        "This verse is not yet available in the local Bible database."
                    );

                    return;

                }

                if (
                    "speechSynthesis"
                    in window
                ) {

                    const speech =
                        new SpeechSynthesisUtterance(
                            text
                        );

                    speech.lang =
                        "en-US";

                    window.speechSynthesis.cancel();

                    window.speechSynthesis.speak(
                        speech
                    );

                } else {

                    alert(
                        "Audio speech is not supported in this browser."
                    );

                }

            }
        );

    }


    // =================================================
    // INTERNAL RESEARCH
    // =================================================

    if (researchBibleButton) {

        researchBibleButton.addEventListener(
            "click",
            function () {

                const data =
                    getBibleReference();

                if (!data) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse."
                    );

                    return;

                }

                const text =
                    getLocalBibleVerse(
                        data
                    );

                renderBibleResult(
                    "🔎 Bible Research",
                    data,
                    text,
                    `
                        <p>
                            🔎 Research اسی ویب سائٹ کے اندر رہے گا۔
                        </p>
                    `
                );

            }
        );

    }


    // =================================================
    // INITIAL LOAD
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

    if (
        testamentSelect.value
    ) {

        loadBooks(
            testamentSelect.value
        );

    }


    console.log(
        "Bible Research System initialized successfully."
    );

});
