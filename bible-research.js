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
    // BIBLE BOOK DATA
    // =================================================

    const makeBooks = (text) =>
        text.split(",").map(item => {

            const [name, chapters] =
                item.split(":");

            return {
                name: name,
                chapters: Number(chapters)
            };

        });


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
    // VERSE COUNTS — LOCAL TEST DATA
    // =================================================

    const localVerseCounts = {

        Mark: {
            1:45,
            2:28,
            3:35,
            4:41,
            5:43,
            6:56,
            7:37,
            8:38,
            9:50,
            10:52,
            11:33,
            12:44,
            13:37,
            14:72,
            15:47,
            16:20
        },

        Matthew: {
            1:25,
            2:23,
            3:17,
            4:25,
            5:48,
            6:34,
            7:29,
            8:34,
            9:38,
            10:42,
            11:30,
            12:50,
            13:58,
            14:36,
            15:39,
            16:28,
            17:27,
            18:35,
            19:30,
            20:34,
            21:46,
            22:46,
            23:39,
            24:51,
            25:46,
            26:75,
            27:66,
            28:20
        },

        Luke: {
            1:80,
            2:52,
            3:38,
            4:44,
            5:39,
            6:49,
            7:50,
            8:56,
            9:62,
            10:42,
            11:54,
            12:59,
            13:35,
            14:35,
            15:32,
            16:31,
            17:37,
            18:43,
            19:48,
            20:47,
            21:38,
            22:71,
            23:56,
            24:53
        },

        John: {
            1:51,
            2:25,
            3:36,
            4:54,
            5:47,
            6:71,
            7:53,
            8:59,
            9:41,
            10:42,
            11:57,
            12:50,
            13:38,
            14:31,
            15:27,
            16:33,
            17:26,
            18:40,
            19:42,
            20:31,
            21:25
        },

        Acts: {
            1:26,
            2:47,
            3:26,
            4:37,
            5:42,
            6:15,
            7:60,
            8:40,
            9:43,
            10:48,
            11:30,
            12:25,
            13:52,
            14:28,
            15:41,
            16:40,
            17:34,
            18:28,
            19:41,
            20:38,
            21:40,
            22:30,
            23:35,
            24:27,
            25:27,
            26:32,
            27:44,
            28:31
        },

        Romans: {
            1:32,
            2:29,
            3:31,
            4:25,
            5:21,
            6:23,
            7:25,
            8:39,
            9:33,
            10:21,
            11:36,
            12:21,
            13:14,
            14:23,
            15:33,
            16:27
        },

        Galatians: {
            1:24,
            2:21,
            3:29,
            4:31,
            5:26,
            6:18
        },

        Ephesians: {
            1:23,
            2:22,
            3:21,
            4:32,
            5:33,
            6:24
        },

        Philippians: {
            1:30,
            2:30,
            3:21,
            4:23
        },

        Colossians: {
            1:29,
            2:23,
            3:25,
            4:18
        },

        "1 Thessalonians": {
            1:10,
            2:20,
            3:13,
            4:18,
            5:28
        },

        "2 Thessalonians": {
            1:12,
            2:17,
            3:18
        },

        "1 Timothy": {
            1:20,
            2:15,
            3:16,
            4:16,
            5:25,
            6:21
        },

        "2 Timothy": {
            1:18,
            2:26,
            3:17,
            4:22
        },

        Titus: {
            1:16,
            2:15,
            3:15
        },

        Philemon: {
            1:25
        },

        James: {
            1:27,
            2:26,
            3:18,
            4:17,
            5:20
        },

        "1 Peter": {
            1:25,
            2:25,
            3:22,
            4:19,
            5:14
        },

        "2 Peter": {
            1:21,
            2:22,
            3:18
        },

        "1 John": {
            1:10,
            2:29,
            3:24,
            4:21,
            5:21
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
            1:20,
            2:29,
            3:22,
            4:11,
            5:14,
            6:17,
            7:17,
            8:13,
            9:21,
            10:11,
            11:19,
            12:17,
            13:18,
            14:20,
            15:8,
            16:21,
            17:18,
            18:24,
            19:21,
            20:15,
            21:27,
            22:21
        }

    };


    // =================================================
    // RESET SELECT
    // =================================================

    function resetSelect(selectElement, text) {

        if (!selectElement) {
            return;
        }

        selectElement.innerHTML = "";

        const option =
            document.createElement("option");

        option.value = "";

        option.textContent =
            text;

        selectElement.appendChild(
            option
        );
    }


    // =================================================
    // LOAD BIBLE BOOKS
    // =================================================

    function loadBibleBooks(testament) {

        resetSelect(
            bookSelect,
            "Select Bible Book"
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
            !testament ||
            !bibleBooks[testament]
        ) {
            return;
        }


        bibleBooks[testament].forEach(
            function (book, index) {

                const option =
                    document.createElement("option");

                option.value =
                    index;

                option.textContent =
                    "📖 " + book.name;

                bookSelect.appendChild(
                    option
                );

            }
        );

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
            !testament ||
            bookIndex === ""
        ) {
            return;
        }


        const book =
            bibleBooks[testament][bookIndex];


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
                "📑 Chapter " + chapter;

            chapterSelect.appendChild(
                option
            );

        }

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
            !testament ||
            bookIndex === "" ||
            chapter === ""
        ) {
            return;
        }


        const book =
            bibleBooks[testament][bookIndex];


        if (!book) {
            return;
        }


        const count =
            localVerseCounts[book.name] &&
            localVerseCounts[book.name][
                Number(chapter)
            ]
                ? localVerseCounts[book.name][
                    Number(chapter)
                ]
                : 176;


        for (
            let verse = 1;
            verse <= count;
            verse++
        ) {

            const option =
                document.createElement("option");

            option.value =
                verse;

            option.textContent =
                "🔢 Verse " + verse;

            verseSelect.appendChild(
                option
            );

        }

    }


    // =================================================
    // TESTAMENT CHANGE
    // =================================================

    if (testamentSelect) {

        testamentSelect.addEventListener(
            "change",
            function () {

                loadBibleBooks(
                    testamentSelect.value
                );

            }
        );

    }


    // =================================================
    // BOOK CHANGE
    // =================================================

    if (bookSelect) {

        bookSelect.addEventListener(
            "change",
            function () {

                loadChapters(
                    testamentSelect.value,
                    bookSelect.value
                );

            }
        );

    }


    // =================================================
    // CHAPTER CHANGE
    // =================================================

    if (chapterSelect) {

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

    }


  // =================================================
// LOCAL BIBLE TEXT
// =================================================

const localBibleText = {

    new: {

        Mark: {

            3: {

                6:
                    "And the Pharisees went forth, and straightway took counsel with the Herodians against him, how they might destroy him.",

                16:
                    "And Simon he surnamed Peter."

            }

        }

    }

};
    // =================================================
    // GET BIBLE REFERENCE
    // =================================================

    function getBibleReference() {

        if (
            !testamentSelect ||
            !bookSelect ||
            !chapterSelect ||
            !verseSelect
        ) {
            return null;
        }


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
                bookSelect.value
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
    // GET LOCAL BIBLE VERSE
    // =================================================

    function getLocalBibleVerse(data) {

        if (!data) {
            return null;
        }


        if (
            localBibleText[
                data.testament
            ] &&
            localBibleText[
                data.testament
            ][
                data.book
            ] &&
            localBibleText[
                data.testament
            ][
                data.book
            ][
                data.chapter
            ] &&
            localBibleText[
                data.testament
            ][
                data.book
            ][
                data.chapter
            ][
                data.verse
            ]
        ) {

            return localBibleText[
                data.testament
            ][
                data.book
            ][
                data.chapter
            ][
                data.verse
            ];

        }


        return null;

    }


    // =================================================
    // RESULT PANEL
    // =================================================

    function getOrCreateBibleResult() {

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
    // DISPLAY BIBLE RESULT
    // =================================================

    function renderBibleResult(
        title,
        data,
        text,
        extra
    ) {

        const result =
            getOrCreateBibleResult();


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
                            "📖 اس آیت کا اصل متن ابھی local Bible database میں شامل نہیں ہے۔"
                        }
                    </p>

                </div>

                ${
                    extra || ""
                }

            </div>

        `;


        result.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

    }


    // =================================================
    // READ BIBLE — LOCAL ONLY
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
    // LISTEN — LOCAL ONLY
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
    // INTERNAL RESEARCH — LOCAL ONLY
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


});
