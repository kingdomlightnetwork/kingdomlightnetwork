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

    const oldReadingControls =
        document.getElementById("bibleReadingControls");


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


    // =================================================
    // HIDE OLD OUTSIDE CONTROLS
    // =================================================

    if (oldReadingControls) {
        oldReadingControls.style.display = "none";
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

        Matthew: [
            25,23,17,25,48,34,29,34,
            38,42,30,50,58,36,39,28,
            27,35,30,34,46,46,39,51,
            46,75,66,20
        ],

        Mark: [
            45,28,35,41,43,56,37,38,
            50,52,33,44,37,72,47,20
        ],

        Luke: [
            80,52,38,44,39,49,50,56,
            62,42,54,59,35,35,32,31,
            37,43,48,47,38,71,56,53
        ],

        John: [
            51,25,36,54,47,71,53,59,
            41,42,57,50,38,31,27,33,
            26,40,42,31,25
        ],

        Acts: [
            26,47,26,37,42,15,60,40,
            43,48,30,25,52,28,41,40,
            34,28,41,38,40,30,35,27,
            27,32,44,31
        ],

        Romans: [
            32,29,31,25,21,23,25,39,
            33,21,36,21,14,23,33,27
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
            14,18,19,16,14,20,28,
            13,28,39,40,29,25
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
            20,29,22,11,14,17,17,13,
            21,11,19,17,18,20,8,21,
            18,24,21,15,27,21
        ]

    };


    // =================================================
    // AUDIO STATE
    // =================================================

    let speaking = false;
    let chapterAudioRunning = false;
    let currentChapterVerses = [];
    let currentChapterIndex = 0;


    // =================================================
    // STOP AUDIO
    // =================================================

    function stopAudio() {

        if (
            "speechSynthesis" in window
        ) {
            window.speechSynthesis.cancel();
        }

        speaking = false;
        chapterAudioRunning = false;
    }


    // =================================================
    // SPEECH LANGUAGE
    // =================================================

    function getSpeechLanguage() {

        const lang =
            translationLanguage.value;

        if (lang === "ur") {
            return "ur-PK";
        }

        if (lang === "pa") {
            return "pa-PK";
        }

        if (lang === "ar") {
            return "ar-SA";
        }

        return "en-US";
    }


    // =================================================
    // SPEAK
    // =================================================

    function speak(text) {

        if (
            !text ||
            !("speechSynthesis" in window)
        ) {

            alert(
                "آپ کے براؤزر میں آڈیو کی سہولت دستیاب نہیں ہے۔"
            );

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


        utterance.onerror = function (event) {

            speaking = false;

            console.error(
                "Speech synthesis error:",
                event
            );

        };


        window.speechSynthesis.speak(
            utterance
        );
    }


    // =================================================
    // RESET SELECT
    // =================================================

    function resetSelect(
        element,
        text
    ) {

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
            !bibleBooks[testament]
        ) {
            return;
        }


        bibleBooks[testament].forEach(
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
    }


    // =================================================
    // LOAD CHAPTERS
    // =================================================

    function loadChapters() {

        resetSelect(
            chapterSelect,
            "Select Chapter"
        );

        resetSelect(
            verseSelect,
            "Select Verse"
        );


        const testament =
            testamentSelect.value;

        const index =
            bookSelect.value;


        if (
            !testament ||
            index === ""
        ) {
            return;
        }


        const book =
            bibleBooks[testament][
                Number(index)
            ];


        if (!book) {
            return;
        }


        for (
            let i = 1;
            i <= book[1];
            i++
        ) {

            const option =
                document.createElement(
                    "option"
                );

            option.value = i;

            option.textContent =
                "Chapter " + i;

            chapterSelect.appendChild(
                option
            );
        }
    }


    // =================================================
    // LOAD VERSES
    // =================================================

    function loadVerses() {

        resetSelect(
            verseSelect,
            "Select Verse"
        );


        const book =
            getSelectedBook();

        const chapter =
            Number(
                chapterSelect.value
            );


        if (
            !book ||
            !chapter
        ) {
            return;
        }


        const count =
            getVerseCount(
                book,
                chapter
            );


        for (
            let i = 1;
            i <= count;
            i++
        ) {

            const option =
                document.createElement(
                    "option"
                );

            option.value = i;

            option.textContent =
                "Verse " + i;

            verseSelect.appendChild(
                option
            );
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


        return bibleBooks[testament][
            Number(index)
        ];
    }


    // =================================================
    // GET VERSE COUNT
    // =================================================

    function getVerseCount(
        book,
        chapter
    ) {

        if (!book) {
            return 0;
        }


        const name =
            book[0];


        if (
            verseCounts[name] &&
            verseCounts[name][chapter - 1]
        ) {

            return verseCounts[name][
                chapter - 1
            ];
        }


        // ---------------------------------------------
        // FALLBACK:
        // DATABASE میں موجود VERSES سے COUNT لیں
        // ---------------------------------------------

        if (
            typeof BIBLE_DATABASE !==
            "undefined"
        ) {

            const lang =
                translationLanguage.value ||
                "ur";

            const database =
                BIBLE_DATABASE[lang] ||
                BIBLE_DATABASE.en;


            const testament =
                testamentSelect.value;


            const chapterData =
                database
                ?. [testament]
                ?. [name]
                ?. [chapter];


            if (chapterData) {

                const keys =
                    Object.keys(
                        chapterData
                    )
                    .filter(
                        key =>
                            !isNaN(
                                Number(key)
                            )
                    );


                if (keys.length) {

                    return Math.max(
                        ...keys.map(
                            Number
                        )
                    );
                }
            }
        }


        return 0;
    }


    // =================================================
    // GET REFERENCE
    // =================================================

    function getReference(
        requireVerse = true
    ) {

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
                Number(
                    chapterSelect.value
                ),

            verse:
                requireVerse
                    ? Number(
                        verseSelect.value
                    )
                    : null
        };
    }


    // =================================================
    // GET VERSE TEXT
    // =================================================

    function getVerseText(data) {

        if (!data) {
            return null;
        }


        if (
            typeof BIBLE_DATABASE ===
            "undefined"
        ) {

            console.error(
                "BIBLE_DATABASE not found."
            );

            return null;
        }


        const language =
            translationLanguage.value ||
            "ur";


        const database =
            BIBLE_DATABASE[language] ||
            BIBLE_DATABASE.en;


        if (!database) {
            return null;
        }


        const chapter =
            database
            ?. [data.testament]
            ?. [data.book]
            ?. [data.chapter];


        if (!chapter) {
            return null;
        }


        return chapter[
            data.verse
        ] || null;
    }


    // =================================================
    // GET FULL CHAPTER
    // =================================================

    function getChapterTexts(data) {

        if (!data) {
            return [];
        }


        if (
            typeof BIBLE_DATABASE ===
            "undefined"
        ) {
            return [];
        }


        const language =
            translationLanguage.value ||
            "ur";


        const database =
            BIBLE_DATABASE[language] ||
            BIBLE_DATABASE.en;


        if (!database) {
            return [];
        }


        const chapter =
            database
            ?. [data.testament]
            ?. [data.book]
            ?. [data.chapter];


        if (!chapter) {
            return [];
        }


        const verses = [];


        Object.keys(chapter)
            .sort(
                function (a, b) {
                    return Number(a) -
                           Number(b);
                }
            )
            .forEach(
                function (key) {

                    const verseNumber =
                        Number(key);

                    const text =
                        chapter[key];


                    if (
                        !isNaN(
                            verseNumber
                        ) &&
                        typeof text ===
                        "string" &&
                        text.trim() !== ""
                    ) {

                        verses.push({

                            verse:
                                verseNumber,

                            text:
                                text

                        });

                    }
                }
            );


        return verses;
    }


    // =================================================
    // DIRECTION
    // =================================================

    function getDirection() {

        const lang =
            translationLanguage.value ||
            "ur";


        if (
            typeof BIBLE_LANGUAGES !==
            "undefined" &&
            BIBLE_LANGUAGES[lang]
        ) {

            return BIBLE_LANGUAGES[
                lang
            ].direction;
        }


        if (lang === "en") {
            return "ltr";
        }


        return "rtl";
    }


    // =================================================
    // RENDER VERSE
    // =================================================

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
            "اس آیت کا متن ابھی local Bible database میں موجود نہیں ہے۔";


        result.innerHTML = `

            <div
                class="bible-reading-content"
                dir="${direction}"
            >

                <h2>${title}</h2>

                <h3>
                    ${data.book}
                    ${data.chapter}:${data.verse}
                </h3>


                <!-- =================================
                     VERSE CONTROLS
                ================================== -->

                <div
                    class="bible-control-bar"
                >

                    <button
                        type="button"
                        id="verseAudioButton"
                    >
                        🔊 Listen
                    </button>

                </div>


                <!-- =================================
                     VERSE TEXT
                ================================== -->

                <div
                    class="bible-verse-text"
                    id="verseText"
                >

                    <p>
                        ${displayText}
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
                        📖
                        ${data.book}
                        Chapter
                        ${data.chapter}
                    </h2>

                    <p>
                        اس باب کا مکمل متن
                        local Bible database
                        میں ابھی شامل نہیں ہے۔
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
                        id="verse-${item.verse}"
                    >

                        <span
                            class="bible-verse-number"
                        >
                            ${item.verse}
                        </span>

                        <span
                            class="bible-chapter-text"
                        >
                            ${item.text}
                        </span>

                    </div>

                `;
            }
        );


        // =================================================
        // CHAPTER RESULT
        // =================================================

        result.innerHTML = `

            <div
                class="
                    bible-reading-content
                    bible-full-chapter
                "
                dir="${direction}"
            >

                <h2>
                    📖
                    ${data.book}
                    Chapter
                    ${data.chapter}
                </h2>


                <!-- =====================================
                     CHAPTER CONTROL BAR
                ====================================== -->

                <div
                    class="bible-control-bar
                           chapter-control-bar"
                >

                    <button
                        type="button"
                        id="chapterAudioToggle"
                    >
                        🔊 Listen Chapter
                    </button>


                    <div
                        class="bible-zoom-controls"
                    >

                        <span>
                            Text:
                        </span>

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

                </div>


                <!-- =====================================
                     CHAPTER TEXT
                ====================================== -->

                <div
                    class="bible-chapter-body"
                    id="chapterBody"
                >

                    ${html}

                </div>

            </div>
        `;


        // =================================================
        // CHAPTER AUDIO BUTTON
        // =================================================

        const audioButton =
            document.getElementById(
                "chapterAudioToggle"
            );


        if (audioButton) {

            audioButton.addEventListener(
                "click",
                function () {

                    if (
                        chapterAudioRunning
                    ) {

                        stopAudio();

                        audioButton.textContent =
                            "🔊 Listen Chapter";

                        document
                            .querySelectorAll(
                                ".active-bible-verse"
                            )
                            .forEach(
                                function (el) {

                                    el.classList.remove(
                                        "active-bible-verse"
                                    );

                                }
                            );

                    } else {

                        startChapterAudio(
                            verses,
                            audioButton
                        );

                    }

                }
            );
        }


        // =================================================
        // ZOOM
        // =================================================

        setupZoom();


        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    // =================================================
    // CHAPTER AUDIO
    // =================================================

    function startChapterAudio(
        verses,
        audioButton
    ) {

        if (
            !verses ||
            !verses.length
        ) {
            return;
        }


        if (
            !("speechSynthesis" in window)
        ) {

            alert(
                "آپ کے براؤزر میں آڈیو کی سہولت دستیاب نہیں ہے۔"
            );

            return;
        }


        stopAudio();


        chapterAudioRunning = true;

        currentChapterVerses =
            verses;

        currentChapterIndex = 0;


        audioButton.textContent =
            "⏹ Stop Chapter";


        playNextChapterVerse(
            audioButton
        );
    }


    // =================================================
    // PLAY NEXT VERSE
    // =================================================

    function playNextChapterVerse(
        audioButton
    ) {

        if (
            !chapterAudioRunning
        ) {
            return;
        }


        if (
            currentChapterIndex >=
            currentChapterVerses.length
        ) {

            chapterAudioRunning =
                false;

            speaking = false;

            audioButton.textContent =
                "🔊 Listen Chapter";

            return;
        }


        document
            .querySelectorAll(
                ".active-bible-verse"
            )
            .forEach(
                function (el) {

                    el.classList.remove(
                        "active-bible-verse"
                    );

                }
            );


        const currentVerse =
            currentChapterVerses[
                currentChapterIndex
            ];


        const element =
            document.getElementById(
                "verse-" +
                currentVerse.verse
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
                currentVerse.text
            );


        utterance.lang =
            getSpeechLanguage();

        utterance.rate = 0.85;
        utterance.pitch = 1;
        utterance.volume = 1;


        utterance.onstart =
            function () {

                speaking = true;

            };


        utterance.onend =
            function () {

                if (
                    !chapterAudioRunning
                ) {
                    return;
                }


                currentChapterIndex++;


                setTimeout(
                    function () {

                        playNextChapterVerse(
                            audioButton
                        );

                    },
                    150
                );

            };


        utterance.onerror =
            function (event) {

                console.error(
                    "Chapter audio error:",
                    event
                );


                speaking = false;

                chapterAudioRunning =
                    false;

                audioButton.textContent =
                    "🔊 Listen Chapter";

            };


        window.speechSynthesis.speak(
            utterance
        );
    }


    // =================================================
    // ZOOM SYSTEM
    // =================================================

    function setupZoom() {

        const chapterBody =
            document.getElementById(
                "chapterBody"
            );


        if (!chapterBody) {
            return;
        }


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


        let fontSize = 20;


        function applyZoom() {

            chapterBody.style.fontSize =
                fontSize + "px";
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

                    applyZoom();

                }
            );
        }


        if (zoomReset) {

            zoomReset.addEventListener(
                "click",
                function () {

                    fontSize = 20;

                    applyZoom();

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

                    applyZoom();

                }
            );
        }


        if (zoomLarge) {

            zoomLarge.addEventListener(
                "click",
                function () {

                    fontSize = 38;

                    applyZoom();

                }
            );
        }


        applyZoom();
    }


    // =================================================
    // TESTAMENT
    // =================================================

    testamentSelect.addEventListener(
        "change",
        function () {

            stopAudio();

            result.innerHTML = "";

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

            result.innerHTML = "";

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

            result.innerHTML = "";

            loadVerses();

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


            if (!data) {
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


    // =================================================
    // TRANSLATION LANGUAGE
    // =================================================

    translationLanguage.addEventListener(
        "change",
        function () {

            stopAudio();

            result.innerHTML = "";


            const data =
                getReference(true);


            if (!data) {
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
    // LISTEN VERSE
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
                    200
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
    // READ FULL CHAPTER
    // =================================================
    // یہی وہ حصہ تھا جو پہلے موجود نہیں تھا۔
    // اب Read Full Chapter صحیح کام کرے گا۔
    // =================================================

    const readChapterButton =
        document.getElementById(
            "readChapterButton"
        );


    if (readChapterButton) {

        readChapterButton.addEventListener(
            "click",
            function () {

                stopAudio();


                const data =
                    getReference(false);


                if (!data) {

                    alert(
                        "Please select Testament, Book and Chapter."
                    );

                    return;
                }


                renderChapter(data);

            }
        );
    }


    // =================================================
    // PUBLIC FUNCTION
    // =================================================

    window.openBibleChapter =
        function () {

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


    if (
        !testamentSelect.value
    ) {

        testamentSelect.value =
            "new";
    }


    loadBooks(
        testamentSelect.value
    );


    console.log(
        "Bible Research System Ready"
    );

});
