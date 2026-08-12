
/* =========================================================
   KINGDOM LIGHT NETWORK
   BIBLE RESEARCH SYSTEM
   Powered by Christ Church
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
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

    const listenBibleButton =
        document.getElementById("listenBibleButton");

    const researchBibleButton =
        document.getElementById("researchBibleButton");

    const bibleSelectionResult =
        document.getElementById("bibleSelectionResult");

    const researchResult =
        document.getElementById("researchResult");


    /* =====================================================
       BIBLE BOOK DATABASE
    ===================================================== */

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


    /* =====================================================
       LANGUAGE NAMES
    ===================================================== */

    const languageNames = {

        hebrew: "Hebrew",
        aramaic: "Aramaic",
        greek: "Koine Greek",

        urdu: "اردو",
        punjabi: "پنجابی",
        english: "English",
        arabic: "العربية"

    };


    /* =====================================================
       RESET SELECT
    ===================================================== */

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


    /* =====================================================
       LOAD BOOKS
    ===================================================== */

    function loadBooks() {

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

        bookSelect.disabled = true;
        chapterSelect.disabled = true;
        verseSelect.disabled = true;

        const testament =
            testamentSelect.value;

        if (!testament) {
            updateResult();
            return;
        }

        const books =
            bibleBooks[testament];

        books.forEach(function (book, index) {

            const option =
                document.createElement("option");

            option.value = index;

            option.textContent =
                book.name;

            bookSelect.appendChild(option);

        });

        bookSelect.disabled = false;

        updateResult();

    }


    /* =====================================================
       LOAD CHAPTERS
    ===================================================== */

    function loadChapters() {

        resetSelect(
            chapterSelect,
            "Select Chapter"
        );

        resetSelect(
            verseSelect,
            "Select Verse"
        );

        chapterSelect.disabled = true;
        verseSelect.disabled = true;

        const testament =
            testamentSelect.value;

        const bookIndex =
            bookSelect.value;

        if (
            !testament ||
            bookIndex === ""
        ) {
            updateResult();
            return;
        }

        const book =
            bibleBooks[testament][bookIndex];

        for (
            let chapter = 1;
            chapter <= book.chapters;
            chapter++
        ) {

            const option =
                document.createElement("option");

            option.value = chapter;

            option.textContent =
                "Chapter " + chapter;

            chapterSelect.appendChild(option);

        }

        chapterSelect.disabled = false;

        updateResult();

    }


    /* =====================================================
       LOAD VERSES
       
       IMPORTANT:
       This first stage creates the verse selector.
       Exact verse counts will be connected to the
       Bible text database in the next stage.
    ===================================================== */

    function loadVerses() {

        resetSelect(
            verseSelect,
            "Select Verse"
        );

        verseSelect.disabled = true;

        const chapter =
            chapterSelect.value;

        if (!chapter) {
            updateResult();
            return;
        }

        /*
           Temporary selector range.

           This allows the complete verse selector
           system to work immediately.

           In the next stage we will connect exact
           verse counts for every chapter.
        */

        for (
            let verse = 1;
            verse <= 176;
            verse++
        ) {

            const option =
                document.createElement("option");

            option.value = verse;

            option.textContent =
                "Verse " + verse;

            verseSelect.appendChild(option);

        }

        verseSelect.disabled = false;

        updateResult();

    }


    /* =====================================================
       GET CURRENT BOOK
    ===================================================== */

    function getCurrentBook() {

        const testament =
            testamentSelect.value;

        const bookIndex =
            bookSelect.value;

        if (
            !testament ||
            bookIndex === ""
        ) {
            return null;
        }

        return bibleBooks[testament][bookIndex];

    }


    /* =====================================================
       UPDATE SELECTION RESULT
    ===================================================== */

    function updateResult() {

        if (!bibleSelectionResult) {
            return;
        }

        const testament =
            testamentSelect.value;

        const book =
            getCurrentBook();

        const chapter =
            chapterSelect.value;

        const verse =
            verseSelect.value;

        const source =
            sourceLanguage
                ? languageNames[sourceLanguage.value]
                : "";

        const translation =
            translationLanguage
                ? languageNames[translationLanguage.value]
                : "";


        if (!testament) {

            bibleSelectionResult.innerHTML =
                "📖 Select a testament, Bible book, chapter and verse.";

            return;

        }


        if (!book) {

            bibleSelectionResult.innerHTML =
                "📖 Select a Bible book.";

            return;

        }


        if (!chapter) {

            bibleSelectionResult.innerHTML =
                "📖 " +
                book.name +
                " selected. Now select a chapter.";

            return;

        }


        if (!verse) {

            bibleSelectionResult.innerHTML =
                "📖 " +
                book.name +
                " " +
                chapter +
                " selected. Now select a verse.";

            return;

        }


        bibleSelectionResult.innerHTML =

            "<strong>📖 Selected Passage</strong><br><br>" +

            book.name +
            " " +
            chapter +
            ":" +
            verse +

            "<br><br>" +

            "Original Language: " +
            source +

            "<br>" +

            "Reading Language: " +
            translation;

    }


    /* =====================================================
       READ BIBLE BUTTON
    ===================================================== */

    if (readBibleButton) {

        readBibleButton.addEventListener(
            "click",
            function () {

                const book =
                    getCurrentBook();

                const chapter =
                    chapterSelect.value;

                const verse =
                    verseSelect.value;

                if (
                    !book ||
                    !chapter ||
                    !verse
                ) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse first."
                    );

                    return;

                }

                if (researchResult) {

                    researchResult.innerHTML =

                        "<h3>📖 Bible Passage</h3>" +

                        "<p>" +

                        book.name +
                        " " +
                        chapter +
                        ":" +
                        verse +

                        "</p>" +

                        "<p>" +

                        "Bible text connection will be added in the next stage."

                        +

                        "</p>";

                }

            }
        );

    }


    /* =====================================================
       LISTEN BUTTON
    ===================================================== */

    function listenToBible() {

        const book =
            getCurrentBook();

        const chapter =
            chapterSelect.value;

        const verse =
            verseSelect.value;

        if (
            !book ||
            !chapter ||
            !verse
        ) {

            alert(
                "Please select Testament, Book, Chapter and Verse first."
            );

            return;

        }

        alert(
            "🔊 Audio Bible connection will be added in the next stage."
        );

    }


    if (listenBibleButton) {

        listenBibleButton.addEventListener(
            "click",
            listenToBible
        );

    }


    if (document.getElementById("audioBibleButton")) {

        document
            .getElementById("audioBibleButton")
            .addEventListener(
                "click",
                listenToBible
            );

    }


    /* =====================================================
       AI AUDIO BUTTON
    ===================================================== */

    if (
        document.getElementById(
            "aiAudioBibleButton"
        )
    ) {

        document
            .getElementById(
                "aiAudioBibleButton"
            )
            .addEventListener(
                "click",
                function () {

                    alert(
                        "🤖 AI Bible Audio will be connected in a later stage."
                    );

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

                const book =
                    getCurrentBook();

                const chapter =
                    chapterSelect.value;

                const verse =
                    verseSelect.value;

                if (
                    !book ||
                    !chapter ||
                    !verse
                ) {

                    alert(
                        "Please select Testament, Book, Chapter and Verse first."
                    );

                    return;

                }

                if (researchResult) {

                    researchResult.innerHTML =

                        "<h3>🔎 Bible Research</h3>" +

                        "<p><strong>" +

                        book.name +
                        " " +
                        chapter +
                        ":" +
                        verse +

                        "</strong></p>" +

                        "<p>" +

                        "Research tools and reference sources will appear here."

                        +

                        "</p>";

                    researchResult.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       EVENT LISTENERS
    ===================================================== */

    if (testamentSelect) {

        testamentSelect.addEventListener(
            "change",
            loadBooks
        );

    }


    if (bookSelect) {

        bookSelect.addEventListener(
            "change",
            loadChapters
        );

    }


    if (chapterSelect) {

        chapterSelect.addEventListener(
            "change",
            loadVerses
        );

    }


    if (verseSelect) {

        verseSelect.addEventListener(
            "change",
            updateResult
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    if (bookSelect) {
        bookSelect.disabled = true;
    }

    if (chapterSelect) {
        chapterSelect.disabled = true;
    }

    if (verseSelect) {
        verseSelect.disabled = true;
    }


    console.log(
        "Bible Research System loaded successfully."
    );

});
