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
        option.textContent = text;

        selectElement.appendChild(option);
    }


    // =================================================
    // LOAD BOOKS
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


        if (!testament) {
            return;
        }


        const books =
            bibleBooks[testament];


        books.forEach(function (book, index) {

            const option =
                document.createElement("option");

            option.value = index;

            option.textContent =
                "📖 " + book.name;

            bookSelect.appendChild(option);

        });

    }


    // =================================================
    // LOAD CHAPTERS
    // =================================================

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
            !testament ||
            bookIndex === ""
        ) {
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
                "📑 Chapter " + chapter;

            chapterSelect.appendChild(option);

        }

    }


    // =================================================
    // LOAD VERSES
    // =================================================

  function loadVerses(testament, bookIndex, chapter) {

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

    const verseCounts = {

        "Mark": {
            1: 45,
            2: 28,
            3: 35,
            4: 41,
            5: 43,
            6: 56,
            7: 37,
            8: 38,
            9: 50,
            10: 52,
            11: 33,
            12: 44,
            13: 37,
            14: 72,
            15: 47,
            16: 20
        }

    };

    const count =
        verseCounts[book.name] &&
        verseCounts[book.name][chapter]
            ? verseCounts[book.name][chapter]
            : 176;

    for (
        let verse = 1;
        verse <= count;
        verse++
    ) {

        const option =
            document.createElement("option");

        option.value = verse;

        option.textContent =
            "🔢 Verse " + verse;

        verseSelect.appendChild(option);

    }

}


    // =================================================
    // TESTAMENT
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
    // BOOK
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
    // CHAPTER
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
    // GET SELECTED REFERENCE
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
            testamentSelect.value === "" ||
            bookSelect.value === "" ||
            chapterSelect.value === "" ||
            verseSelect.value === ""
        ) {
            return null;
        }


        const book =
            bibleBooks[
                testamentSelect.value
            ][bookSelect.value];


        return {

            book: book.name,

            chapter:
                chapterSelect.value,

            verse:
                verseSelect.value,

            reference:
                book.name +
                " " +
                chapterSelect.value +
                ":" +
                verseSelect.value

        };

    }


    // =================================================
    // CREATE INTERNAL READING PANEL
    // =================================================

    function getBibleResult() {

        let result =
            document.getElementById("bibleResult");


        if (!result) {

            result =
                document.createElement("section");

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


                const result =
                    getBibleResult();


                result.innerHTML = `

                    <div class="bible-reading-content">

                        <h2>
                            📖 ${data.reference}
                        </h2>

                        <p>
                            ${data.book}
                            — Chapter
                            ${data.chapter}
                            — Verse
                            ${data.verse}
                        </p>

                        <div class="bible-text-placeholder">

                            <h3>
                                📖 Bible Reading
                            </h3>

                            <p>
                                The selected Bible reference
                                is ready.
                            </p>

                            <p>
                                ${data.reference}
                            </p>

                        </div>

                    </div>

                `;


                result.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

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
                        "Please select a verse first."
                    );

                    return;

                }


                if (
                    "speechSynthesis" in window
                ) {

                    const speech =
                        new SpeechSynthesisUtterance(
                            data.reference
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

            const result =
                getBibleResult();

            let verseText =
                "Bible verse will appear here.";

            // TEST: Mark 3:16
            if (
                data.reference === "Mark 3:16"
            ) {

                verseText =
                    "Mark 3:16 — Local Bible text will be connected here.";

            }

            result.innerHTML = `

                <div class="bible-reading-content">

                    <h2>
                        📖 Bible Reading
                    </h2>

                    <h3>
                        ${data.reference}
                    </h3>

                    <div class="bible-verse-text">

                        <p>
                            ${verseText}
                        </p>

                    </div>

                    <div class="research-tools">

                        <button
                            type="button"
                            id="localListenButton"
                        >
                            🔊 Listen
                        </button>

                        <button
                            type="button"
                            id="localResearchButton"
                        >
                            🔎 Research
                        </button>

                    </div>

                </div>

            `;

            result.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }
    );

}
