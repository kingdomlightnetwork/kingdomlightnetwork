console.log("BIBLE RESEARCH JS LOADED");
// ======================================================
// KINGDOM LIGHT NETWORK
// BIBLE RESEARCH SYSTEM
// Testament → Book → Chapter → Verse
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const testamentSelect = document.getElementById("testamentSelect");
    const bookSelect = document.getElementById("bookSelect");
    const chapterSelect = document.getElementById("chapterSelect");
    const verseSelect = document.getElementById("verseSelect");

    // --------------------------------------------------
    // 66 BIBLE BOOKS + CHAPTER COUNTS
    // --------------------------------------------------

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


    // --------------------------------------------------
    // HELPER
    // --------------------------------------------------

    function resetSelect(select, text) {

        if (!select) return;

        select.innerHTML = "";

        const option = document.createElement("option");

        option.value = "";
        option.textContent = text;

        select.appendChild(option);
    }


    // --------------------------------------------------
    // INITIAL STATE
    // --------------------------------------------------

    resetSelect(bookSelect, "Select Bible Book");
    resetSelect(chapterSelect, "Select Chapter");
    resetSelect(verseSelect, "Select Verse");

    if (bookSelect) bookSelect.disabled = true;
    if (chapterSelect) chapterSelect.disabled = true;
    if (verseSelect) verseSelect.disabled = true;


    // --------------------------------------------------
    // TESTAMENT → BOOKS
    // --------------------------------------------------

    if (testamentSelect) {

        testamentSelect.addEventListener("change", function () {

            resetSelect(bookSelect, "Select Bible Book");
            resetSelect(chapterSelect, "Select Chapter");
            resetSelect(verseSelect, "Select Verse");

            chapterSelect.disabled = true;
            verseSelect.disabled = true;

            const testament = testamentSelect.value;

            if (!testament) {

                bookSelect.disabled = true;
                return;

            }

            let books = [];

            if (
                testament === "old" ||
                testament === "old-testament"
            ) {
                books = bibleBooks.old;
            }

            if (
                testament === "new" ||
                testament === "new-testament"
            ) {
                books = bibleBooks.new;
            }

            books.forEach(function (book, index) {

                const option = document.createElement("option");

                option.value = index;

                option.textContent = book.name;

                bookSelect.appendChild(option);

            });

            bookSelect.disabled = false;

        });

    }


    // --------------------------------------------------
    // BOOK → CHAPTERS
    // --------------------------------------------------

    if (bookSelect) {

        bookSelect.addEventListener("change", function () {

            resetSelect(chapterSelect, "Select Chapter");
            resetSelect(verseSelect, "Select Verse");

            verseSelect.disabled = true;

            const testament = testamentSelect.value;

            if (!testament || bookSelect.value === "") {

                chapterSelect.disabled = true;
                return;

            }

            let books = [];

            if (
                testament === "old" ||
                testament === "old-testament"
            ) {
                books = bibleBooks.old;
            }

            if (
                testament === "new" ||
                testament === "new-testament"
            ) {
                books = bibleBooks.new;
            }

            const selectedBook =
                books[Number(bookSelect.value)];

            if (!selectedBook) {

                chapterSelect.disabled = true;
                return;

            }

            for (
                let chapter = 1;
                chapter <= selectedBook.chapters;
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

        });

    }


    // --------------------------------------------------
    // CHAPTER → VERSES
    // --------------------------------------------------
    // Temporary verse selector.
    // Exact verse counts will be connected in the
    // NEXT STEP after the book/chapter system works.
    // --------------------------------------------------

    if (chapterSelect) {

        chapterSelect.addEventListener("change", function () {

            resetSelect(verseSelect, "Select Verse");

            if (!chapterSelect.value) {

                verseSelect.disabled = true;
                return;

            }

            for (let verse = 1; verse <= 176; verse++) {

                const option =
                    document.createElement("option");

                option.value = verse;

                option.textContent =
                    "Verse " + verse;

                verseSelect.appendChild(option);

            }

            verseSelect.disabled = false;

        });

    }


    // --------------------------------------------------
    // VERSE SELECT
    // --------------------------------------------------

    if (verseSelect) {

        verseSelect.addEventListener("change", function () {

            if (!verseSelect.value) return;

            console.log(
                "Bible Reference:",
                testamentSelect.value,
                bookSelect.options[bookSelect.selectedIndex]?.text,
                chapterSelect.value,
                verseSelect.value
            );

        });

    }


    console.log(

        console.log("BIBLE RESEARCH JS FINISHED");
        "Bible Research Selector Loaded Successfully"
    );

});
