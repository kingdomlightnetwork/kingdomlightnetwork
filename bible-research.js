// =====================================================
// KINGDOM LIGHT NETWORK
// BIBLE RESEARCH SYSTEM
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Bible Research System Loaded");


    // =================================================
    // ELEMENTS
    // =================================================

    const testamentSelect =
        document.getElementById("testamentSelect");

    const bookSelect =
        document.getElementById("bookSelect");

    const chapterSelect =
        document.getElementById("chapterSelect");

    const verseSelect =
        document.getElementById("verseSelect");

    const sourceLanguage =
        document.getElementById("sourceLanguage");

    const translationLanguage =
        document.getElementById("translationLanguage");

    const selectedReference =
        document.getElementById("selectedReference");

    const readBibleButton =
        document.getElementById("readBibleButton");

    const listenBibleButton =
        document.getElementById("listenBibleButton");

    const researchBibleButton =
        document.getElementById("researchBibleButton");


    // =================================================
    // BIBLE BOOKS
    // =================================================

    const oldTestament = [

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

    ];


    const newTestament = [

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

    ];


    // =================================================
    // TEMPORARY VERSE COUNTS
    // =================================================

    // This allows the complete selector system to work.
    // Exact verse counts will be added in the next stage.

    const defaultVerseCount = 176;


    // =================================================
    // RESET FUNCTION
    // =================================================

    function resetSelect(select, text) {

        select.innerHTML = "";

        const option =
            document.createElement("option");

        option.value = "";
        option.textContent = text;

        select.appendChild(option);

    }


    // =================================================
    // INITIAL SETUP
    // =================================================

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


    // =================================================
    // TESTAMENT → BOOKS
    // =================================================

    testamentSelect.addEventListener(
        "change",
        function () {

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


            chapterSelect.disabled = true;
            verseSelect.disabled = true;


            let books = [];


            if (
                testamentSelect.value === "old"
            ) {

                books = oldTestament;

            }


            if (
                testamentSelect.value === "new"
            ) {

                books = newTestament;

            }


            books.forEach(
                function (book, index) {

                    const option =
                        document.createElement("option");

                    option.value = index;

                    option.textContent =
                        book[0];

                    bookSelect.appendChild(
                        option
                    );

                }
            );


            bookSelect.disabled =
                books.length === 0;

        }
    );


    // =================================================
    // BOOK → CHAPTERS
    // =================================================

    bookSelect.addEventListener(
        "change",
        function () {

            resetSelect(
                chapterSelect,
                "Select Chapter"
            );

            resetSelect(
                verseSelect,
                "Select Verse"
            );


            verseSelect.disabled = true;


            let books = [];


            if (
                testamentSelect.value === "old"
            ) {

                books = oldTestament;

            }


            if (
                testamentSelect.value === "new"
            ) {

                books = newTestament;

            }


            const selectedBook =
                books[
                    Number(bookSelect.value)
                ];


            if (!selectedBook) {

                chapterSelect.disabled =
                    true;

                return;

            }


            const chapterCount =
                selectedBook[1];


            for (
                let i = 1;
                i <= chapterCount;
                i++
            ) {

                const option =
                    document.createElement("option");

                option.value = i;

                option.textContent =
                    "Chapter " + i;

                chapterSelect.appendChild(
                    option
                );

            }


            chapterSelect.disabled = false;

        }
    );


    // =================================================
    // CHAPTER → VERSES
    // =================================================

    chapterSelect.addEventListener(
        "change",
        function () {

            resetSelect(
                verseSelect,
                "Select Verse"
            );


            if (
                chapterSelect.value === ""
            ) {

                verseSelect.disabled = true;

                return;

            }


            for (
                let i = 1;
                i <= defaultVerseCount;
                i++
            ) {

                const option =
                    document.createElement("option");

                option.value = i;

                option.textContent =
                    "Verse " + i;

                verseSelect.appendChild(
                    option
                );

            }


            verseSelect.disabled = false;

        }
    );


    // =================================================
    // UPDATE REFERENCE
    // =================================================

    function updateReference() {

        if (
            testamentSelect.value === "" ||
            bookSelect.value === "" ||
            chapterSelect.value === "" ||
            verseSelect.value === ""
        ) {

            selectedReference.textContent =
                "Select a testament, book, chapter and verse.";

            return;

        }


        const bookName =
            bookSelect.options[
                bookSelect.selectedIndex
            ].textContent;


        const chapter =
            chapterSelect.value;


        const verse =
            verseSelect.value;


        const language =
            translationLanguage.value;


        selectedReference.textContent =
            bookName +
            " " +
            chapter +
            ":" +
            verse +
            " — " +
            language;

    }


    bookSelect.addEventListener(
        "change",
        updateReference
    );

    chapterSelect.addEventListener(
        "change",
        updateReference
    );

    verseSelect.addEventListener(
        "change",
        updateReference
    );

    translationLanguage.addEventListener(
        "change",
        updateReference
    );


    // =================================================
    // READ BIBLE
    // =================================================

    readBibleButton.addEventListener(
        "click",
        function () {

            updateReference();

            if (
                verseSelect.value === ""
            ) {

                alert(
                    "Please select Testament, Book, Chapter and Verse."
                );

                return;

            }


            alert(
                "Bible reading system is ready. Bible text will be connected in the next stage."
            );

        }
    );


    // =================================================
    // LISTEN
    // =================================================

    listenBibleButton.addEventListener(
        "click",
        function () {

            if (
                verseSelect.value === ""
            ) {

                alert(
                    "Please select a Bible verse first."
                );

                return;

            }


            alert(
                "Audio Bible system will be connected in the next stage."
            );

        }
    );


    // =================================================
    // RESEARCH
    // =================================================

    researchBibleButton.addEventListener(
        "click",
        function () {

            if (
                verseSelect.value === ""
            ) {

                alert(
                    "Please select a Bible verse first."
                );

                return;

            }


            const book =
                bookSelect.options[
                    bookSelect.selectedIndex
                ].textContent;


            const chapter =
                chapterSelect.value;


            const verse =
                verseSelect.value;


            const researchQuery =
                encodeURIComponent(
                    book +
                    " " +
                    chapter +
                    ":" +
                    verse
                );


            window.location.href =
                "research.html?query=" +
                researchQuery;

        }
    );


    // =================================================
    // FINISHED
    // =================================================

    console.log(
        "Bible Book → Chapter → Verse system ready"
    );

});
