/* =====================================================
   KINGDOM LIGHT NETWORK
   BIBLE RESEARCH / SELECTOR ENGINE
   STABLE MULTI-LANGUAGE VERSION

   Testament → Book → Chapter → Verse

   FEATURES:
   - Verse structure is independent of translation text.
   - English is currently used as the reference structure.
   - Translation text is read from the selected language.
   - Missing translation text does NOT remove verse numbers.
   - Verse Audio
   - Verse Zoom
   - Full Chapter Reading
   - Full Chapter Audio
   - Full Chapter Zoom
   - Bible Research
   - Ready for future complete Bible language expansion
===================================================== */

(function () {

    "use strict";


    /* =====================================================
       START BIBLE SYSTEM
    ===================================================== */

    function startBibleSystem() {

        console.log("Bible Selector: starting...");


        /* =================================================
           HTML ELEMENTS
        ================================================= */

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


        /* =================================================
           REQUIRED HTML CHECK
        ================================================= */

        if (
            !testamentSelect ||
            !bookSelect ||
            !chapterSelect ||
            !verseSelect
        ) {

            console.error(
                "Bible Error: required selector HTML is missing."
            );

            return;
        }


        /* =================================================
           66 BIBLE BOOKS
        ================================================= */

        const BIBLE_BOOKS = {

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


        /* =================================================
           RESET SELECT
        ================================================= */

        function resetSelect(select, text) {

            if (!select) return;

            select.innerHTML = "";

            const option =
                document.createElement("option");

            option.value = "";

            option.textContent = text;

            select.appendChild(option);
        }


        /* =================================================
           LANGUAGE NORMALIZATION
        ================================================= */

        function normalizeLanguage(language) {

            if (!language) return "en";

            const value =
                String(language)
                    .trim()
                    .toLowerCase();

            const aliases = {

                english: "en",
                en: "en",

                urdu: "ur",
                اردو: "ur",
                ur: "ur",

                punjabi: "pa",
                pa: "pa",

                arabic: "ar",
                ar: "ar",

                hebrew: "he",
                he: "he",

                aramaic: "arc",
                arc: "arc",

                greek: "grc",
                "koine greek": "grc",
                grc: "grc",

                "en-us": "en",
                "en-gb": "en",

                "ur-pk": "ur",
                "ur-in": "ur",

                "el-gr": "grc",
                "el-grc": "grc"
            };

            return aliases[value] || value;
        }


        /* =================================================
           GET SELECTED TRANSLATION LANGUAGE
        ================================================= */

        function getLanguage() {

            if (
                translationLanguage &&
                translationLanguage.value
            ) {

                return normalizeLanguage(
                    translationLanguage.value
                );

            }

            return "en";
        }


        /* =================================================
           GET BIBLE DATABASE
        ================================================= */

        function getDatabase(language) {

            const lang =
                normalizeLanguage(language);

            if (
                typeof window.getBibleDatabase ===
                "function"
            ) {

                try {

                    return (
                        window.getBibleDatabase(lang) ||
                        null
                    );

                } catch (error) {

                    console.error(
                        "Bible database error:",
                        error
                    );

                }

            }

            if (
                typeof window.BIBLE_DATABASE !==
                "undefined"
            ) {

                return (
                    window.BIBLE_DATABASE[lang] ||
                    null
                );

            }

            return null;
        }


        /* =================================================
           FIND BOOK
        ================================================= */

        function findBook(
            testament,
            bookName
        ) {

            const books =
                BIBLE_BOOKS[testament];

            if (!books) return null;

            return books.find(
                function (book) {

                    return book[0] === bookName;

                }
            ) || null;
        }


        /* =================================================
           LOAD BOOKS
        ================================================= */

        function loadBooks() {

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

            const books =
                BIBLE_BOOKS[
                    testamentSelect.value
                ];

            if (!books) return;

            books.forEach(
                function (book) {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        book[0];

                    option.textContent =
                        book[0];

                    bookSelect.appendChild(
                        option
                    );

                }
            );

            console.log(
                "Books loaded:",
                books.length
            );
        }


        /* =================================================
           LOAD CHAPTERS
        ================================================= */

        function loadChapters() {

            resetSelect(
                chapterSelect,
                "Select Chapter"
            );

            resetSelect(
                verseSelect,
                "Select Verse"
            );

            const book =
                findBook(
                    testamentSelect.value,
                    bookSelect.value
                );

            if (!book) return;

            for (
                let chapter = 1;
                chapter <= Number(book[1]);
                chapter++
            ) {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    String(chapter);

                option.textContent =
                    "Chapter " + chapter;

                chapterSelect.appendChild(
                    option
                );

            }

            console.log(
                "Chapters loaded:",
                bookSelect.value,
                book[1]
            );
        }


        /* =================================================
           GET VERSES FROM DATABASE
        ================================================= */

        function getAvailableVersesFromDatabase(
            database,
            testament,
            book,
            chapter
        ) {

            if (
                !database ||
                !database[testament] ||
                !database[testament][book] ||
                !database[testament][book][chapter]
            ) {

                return [];

            }

            return Object.keys(
                database[testament][book][chapter]
            )
                .map(
                    function (value) {

                        return Number(value);

                    }
                )
                .filter(
                    function (value) {

                        return Number.isFinite(value);

                    }
                )
                .sort(
                    function (a, b) {

                        return a - b;

                    }
                );
        }


        /* =================================================
           GET REFERENCE VERSES
        ================================================= */

        function getReferenceVerses(
            testament,
            book,
            chapter
        ) {

            let referenceDatabase =
                getDatabase("en");

            let verses =
                getAvailableVersesFromDatabase(
                    referenceDatabase,
                    testament,
                    book,
                    chapter
                );

            if (!verses.length) {

                const selectedDatabase =
                    getDatabase(
                        getLanguage()
                    );

                verses =
                    getAvailableVersesFromDatabase(
                        selectedDatabase,
                        testament,
                        book,
                        chapter
                    );

            }

            return verses;
        }


        /* =================================================
           LOAD VERSES
        ================================================= */

        function loadVerses() {

            resetSelect(
                verseSelect,
                "Select Verse"
            );

            const testament =
                testamentSelect.value;

            const book =
                bookSelect.value;

            const chapter =
                Number(
                    chapterSelect.value
                );

            if (
                !testament ||
                !book ||
                !chapter
            ) {

                return;

            }

            const verses =
                getReferenceVerses(
                    testament,
                    book,
                    chapter
                );

            verses.forEach(
                function (verse) {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        String(verse);

                    option.textContent =
                        "Verse " + verse;

                    verseSelect.appendChild(
                        option
                    );

                }
            );

            if (!verses.length) {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value = "";

                option.textContent =
                    "Verse data not available yet";

                verseSelect.appendChild(
                    option
                );

            }

            console.log(
                "Reference verses loaded:",
                book,
                chapter,
                verses
            );
        }


        /* =================================================
           GET VERSE TEXT
        ================================================= */

        function getVerseText(
            language,
            testament,
            book,
            chapter,
            verse
        ) {

            const lang =
                normalizeLanguage(language);

            if (
                typeof window.getBibleVerse ===
                "function"
            ) {

                try {

                    const value =
                        window.getBibleVerse(
                            lang,
                            testament,
                            book,
                            chapter,
                            verse
                        );

                    if (value) {

                        return value;

                    }

                } catch (error) {

                    console.error(
                        "Bible verse error:",
                        error
                    );

                }

            }

            const database =
                getDatabase(lang);

            if (
                !database ||
                !database[testament] ||
                !database[testament][book] ||
                !database[testament][book][chapter]
            ) {

                return null;

            }

            return (
                database[testament][book][chapter][verse] ||
                null
            );
        }


        /* =================================================
           LANGUAGE DIRECTION
        ================================================= */

        function getDirection(language) {

            const lang =
                normalizeLanguage(language);

            if (
                [
                    "ur",
                    "pa",
                    "ar",
                    "fa",
                    "he",
                    "arc"
                ].includes(lang)
            ) {

                return "rtl";

            }

            return "ltr";
        }


        /* =================================================
           ESCAPE HTML
        ================================================= */

        function escapeHTML(value) {

            return String(value)

                .replace(/&/g, "&amp;")

                .replace(/</g, "&lt;")

                .replace(/>/g, "&gt;")

                .replace(/"/g, "&quot;")

                .replace(/'/g, "&#039;");
        }


        /* =================================================
           STOP AUDIO
        ================================================= */

        function stopAudio() {

            if (
                "speechSynthesis" in window
            ) {

                window.speechSynthesis.cancel();

            }

            const verseButton =
                document.getElementById(
                    "verseAudioButton"
                );

            if (verseButton) {

                verseButton.textContent =
                    "🔊 Listen";

            }

            const chapterButton =
                document.getElementById(
                    "chapterAudioButton"
                );

            if (chapterButton) {

                chapterButton.textContent =
                    "🔊 Listen Chapter";

            }
        }


        /* =================================================
           AUDIO LANGUAGES
        ================================================= */

        const SPEECH_LANGUAGES = {

            en: [
                "en-US",
                "en-GB",
                "en"
            ],

            ur: [
                "ur-PK",
                "ur-IN",
                "ur"
            ],

            pa: [
                "pa-PK",
                "pa-IN",
                "pa"
            ],

            ar: [
                "ar-SA",
                "ar-AE",
                "ar"
            ],

            he: [
                "he-IL",
                "he"
            ],

            arc: [
                "ar"
            ],

            grc: [
                "el-GR",
                "el"
            ]

        };


        const VOICE_NAMES = {

            ur: [
                "urdu",
                "pakistan",
                "india",
                "اردو"
            ],

            pa: [
                "punjabi",
                "پنجابی"
            ],

            ar: [
                "arabic",
                "العربية"
            ],

            he: [
                "hebrew"
            ],

            grc: [
                "greek"
            ],

            en: [
                "english"
            ]

        };


        /* =================================================
           CHOOSE VOICE
        ================================================= */

        function chooseVoice(
            voices,
            language
        ) {

            const requested =
                SPEECH_LANGUAGES[
                    language
                ] ||
                [
                    "en-US",
                    "en"
                ];

            for (
                let i = 0;
                i < requested.length;
                i++
            ) {

                const wanted =
                    requested[i].toLowerCase();

                const exact =
                    voices.find(
                        function (voice) {

                            return (
                                voice.lang &&
                                voice.lang
                                    .toLowerCase() ===
                                wanted
                            );

                        }
                    );

                if (exact) return exact;

            }

            const bases =
                requested.map(
                    function (value) {

                        return value
                            .toLowerCase()
                            .split("-")[0];

                    }
                );

            const base =
                voices.find(
                    function (voice) {

                        return (
                            voice.lang &&
                            bases.includes(
                                voice.lang
                                    .toLowerCase()
                                    .split("-")[0]
                            )
                        );

                    }
                );

            if (base) return base;

            const names =
                VOICE_NAMES[
                    language
                ] || [];

            return (
                voices.find(
                    function (voice) {

                        const name =
                            String(
                                voice.name || ""
                            ).toLowerCase();

                        const lang =
                            String(
                                voice.lang || ""
                            ).toLowerCase();

                        return names.some(
                            function (word) {

                                const search =
                                    word.toLowerCase();

                                return (
                                    name.includes(search) ||
                                    lang.includes(search)
                                );

                            }
                        );

                    }
                ) || null
            );
        }


        /* =================================================
           PLAY AUDIO
        ================================================= */

        function playBibleAudio(
            voices,
            language,
            text,
            button
        ) {

            if (
                !voices ||
                !voices.length
            ) {

                alert(
                    "No speech voice is available in this browser."
                );

                return;

            }

            const requested =
                SPEECH_LANGUAGES[
                    language
                ] ||
                [
                    "en-US",
                    "en"
                ];

            const voice =
                chooseVoice(
                    voices,
                    language
                );

            const speech =
                new SpeechSynthesisUtterance(
                    String(text || "")
                );

            speech.rate = 0.85;

            speech.pitch = 1;

            speech.volume = 1;

            if (voice) {

                speech.voice =
                    voice;

                speech.lang =
                    voice.lang;

                console.log(
                    "Bible Audio Voice Selected:",
                    voice.name,
                    voice.lang
                );

            } else {

                speech.lang =
                    requested[0];

                console.warn(
                    "No matching voice found for:",
                    requested
                );

            }

            speech.onstart =
                function () {

                    if (button) {

                        button.textContent =
                            "⏹ Stop";

                    }

                };

            speech.onend =
                function () {

                    if (button) {

                        button.textContent =
                            "🔊 Listen";

                    }

                };

            speech.onerror =
                function (event) {

                    console.error(
                        "Bible Audio Error:",
                        event
                    );

                    if (button) {

                        button.textContent =
                            "🔊 Listen";

                    }

                };

            window.speechSynthesis.cancel();

            setTimeout(
                function () {

                    window.speechSynthesis.speak(
                        speech
                    );

                },
                100
            );
        }


        /* =================================================
           SETUP AUDIO
        ================================================= */

        function setupAudio(text) {

            const button =
                document.getElementById(
                    "verseAudioButton"
                );

            if (!button) return;

            button.onclick =
                function () {

                    if (
                        !(
                            "speechSynthesis" in
                            window
                        ) ||
                        !(
                            "SpeechSynthesisUtterance" in
                            window
                        )
                    ) {

                        alert(
                            "Audio is not supported by this browser."
                        );

                        return;

                    }

                    if (
                        window.speechSynthesis.speaking ||
                        window.speechSynthesis.pending
                    ) {

                        window.speechSynthesis.cancel();

                        button.textContent =
                            "🔊 Listen";

                        return;

                    }

                    const language =
                        getLanguage();

                    let voices =
                        window.speechSynthesis
                            .getVoices();

                    if (
                        voices &&
                        voices.length
                    ) {

                        playBibleAudio(
                            voices,
                            language,
                            text,
                            button
                        );

                        return;

                    }

                    const loadAndPlay =
                        function () {

                            const loaded =
                                window.speechSynthesis
                                    .getVoices();

                            if (
                                loaded &&
                                loaded.length
                            ) {

                                playBibleAudio(
                                    loaded,
                                    language,
                                    text,
                                    button
                                );

                            }

                        };

                    window.speechSynthesis
                        .onvoiceschanged =
                        loadAndPlay;

                    setTimeout(
                        loadAndPlay,
                        700
                    );
                };
        }


        /* =================================================
           ZOOM
        ================================================= */

        function setupZoom() {

            const target =
                document.querySelector(
                    ".bible-reading-text"
                ) ||
                document.querySelector(
                    ".bible-verse-text p"
                );

            if (!target) return;

            let size = 20;

            const out =
                document.getElementById(
                    "verseZoomOutButton"
                ) ||
                document.getElementById(
                    "chapterZoomOutButton"
                );

            const reset =
                document.getElementById(
                    "verseZoomResetButton"
                ) ||
                document.getElementById(
                    "chapterZoomResetButton"
                );

            const inButton =
                document.getElementById(
                    "verseZoomInButton"
                ) ||
                document.getElementById(
                    "chapterZoomInButton"
                );

            if (out) {

                out.onclick =
                    function () {

                        size =
                            Math.max(
                                14,
                                size - 2
                            );

                        target.style.fontSize =
                            size + "px";

                    };

            }

            if (reset) {

                reset.onclick =
                    function () {

                        size = 20;

                        target.style.fontSize =
                            size + "px";

                    };

            }

            if (inButton) {

                inButton.onclick =
                    function () {

                        size =
                            Math.min(
                                40,
                                size + 2
                            );

                        target.style.fontSize =
                            size + "px";

                    };

            }

            target.style.fontSize =
                size + "px";
        }


        /* =================================================
           RENDER VERSE
        ================================================= */

        function renderVerse(
            book,
            chapter,
            verse,
            text,
            language
        ) {

            if (!result) return;

            stopAudio();

            const displayText =
                text ||
                "اس آیت کا متن ابھی منتخب زبان کے Bible Database میں موجود نہیں ہے۔";

            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${getDirection(language)}"
                >

                    <h2>
                        📖
                        ${escapeHTML(book)}
                        ${chapter}:${verse}
                    </h2>

                    <div class="bible-verse-text">

                        <p>
                            ${escapeHTML(displayText)}
                        </p>

                    </div>

                    <div class="bible-control-bar">

                        <button
                            type="button"
                            id="verseAudioButton"
                        >
                            🔊 Listen
                        </button>

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

                    </div>

                </div>

            `;

            setupAudio(
                displayText
            );

            setupZoom();

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }


        /* =================================================
           READ SELECTED VERSE
        ================================================= */

        function readVerse() {

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

            const language =
                getLanguage();

            if (
                !testament ||
                !book ||
                !chapter ||
                !verse
            ) {

                return;

            }

            const text =
                getVerseText(
                    language,
                    testament,
                    book,
                    chapter,
                    verse
                );

            renderVerse(
                book,
                chapter,
                verse,
                text,
                language
            );
        }


        /* =================================================
           GET COMPLETE CHAPTER TEXT
        ================================================= */

        function getChapterTexts(
            language,
            testament,
            book,
            chapter
        ) {

            const verses =
                getReferenceVerses(
                    testament,
                    book,
                    chapter
                );

            const chapterData = [];

            verses.forEach(
                function (verse) {

                    const text =
                        getVerseText(
                            language,
                            testament,
                            book,
                            chapter,
                            verse
                        );

                    chapterData.push({

                        verse: verse,

                        text:
                            text ||
                            "اس آیت کا متن ابھی منتخب زبان کے Bible Database میں موجود نہیں ہے۔"

                    });

                }
            );

            return chapterData;
        }


        /* =================================================
           RENDER FULL CHAPTER
        ================================================= */

        function renderChapter(
            book,
            chapter,
            chapterData,
            language
        ) {

            if (!result) return;

            stopAudio();

            const chapterSpeechText =
                chapterData
                    .map(
                        function (item) {

                            return (
                                "Verse " +
                                item.verse +
                                ". " +
                                item.text
                            );

                        }
                    )
                    .join(" ");

            let versesHTML = "";

            chapterData.forEach(
                function (item) {

                    versesHTML += `

                        <div class="bible-chapter-verse">

                            <h3>
                                ${escapeHTML(book)}
                                ${chapter}:${item.verse}
                            </h3>

                            <p>
                                <strong>
                                    ${item.verse}.
                                </strong>

                                ${escapeHTML(item.text)}
                            </p>

                        </div>

                    `;

                }
            );


            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${getDirection(language)}"
                >

                    <h2>
                        📖
                        ${escapeHTML(book)}
                        — Chapter ${chapter}
                    </h2>


                    <div class="bible-reading-text">

                        ${versesHTML}

                    </div>


                    <div class="bible-control-bar">

                        <button
                            type="button"
                            id="chapterAudioButton"
                        >
                            🔊 Listen Chapter
                        </button>


                        <button
                            type="button"
                            id="chapterZoomOutButton"
                        >
                            A−
                        </button>


                        <button
                            type="button"
                            id="chapterZoomResetButton"
                        >
                            A
                        </button>


                        <button
                            type="button"
                            id="chapterZoomInButton"
                        >
                            A+
                        </button>

                    </div>

                </div>

            `;


            setupChapterAudio(
                chapterSpeechText
            );

            setupChapterZoom();


            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }


        /* =================================================
           SETUP CHAPTER AUDIO
        ================================================= */

        function setupChapterAudio(text) {

            const button =
                document.getElementById(
                    "chapterAudioButton"
                );

            if (!button) return;

            button.onclick =
                function () {

                    if (
                        !(
                            "speechSynthesis" in
                            window
                        ) ||
                        !(
                            "SpeechSynthesisUtterance" in
                            window
                        )
                    ) {

                        alert(
                            "Audio is not supported by this browser."
                        );

                        return;

                    }


                    if (
                        window.speechSynthesis.speaking ||
                        window.speechSynthesis.pending
                    ) {

                        window.speechSynthesis.cancel();

                        button.textContent =
                            "🔊 Listen Chapter";

                        return;

                    }


                    const language =
                        getLanguage();


                    const voices =
                        window.speechSynthesis
                            .getVoices();


                    if (
                        voices &&
                        voices.length
                    ) {

                        playBibleAudio(
                            voices,
                            language,
                            text,
                            button
                        );

                        return;

                    }


                    const loadAndPlay =
                        function () {

                            const loaded =
                                window.speechSynthesis
                                    .getVoices();

                            if (
                                loaded &&
                                loaded.length
                            ) {

                                playBibleAudio(
                                    loaded,
                                    language,
                                    text,
                                    button
                                );

                            }

                        };


                    window.speechSynthesis
                        .onvoiceschanged =
                        loadAndPlay;


                    setTimeout(
                        loadAndPlay,
                        700
                    );

                };
        }


        /* =================================================
           SETUP CHAPTER ZOOM
        ================================================= */

        function setupChapterZoom() {

            const target =
                document.querySelector(
                    ".bible-reading-text"
                );

            if (!target) return;

            let size = 20;


            const out =
                document.getElementById(
                    "chapterZoomOutButton"
                );

            const reset =
                document.getElementById(
                    "chapterZoomResetButton"
                );

            const inButton =
                document.getElementById(
                    "chapterZoomInButton"
                );


            if (out) {

                out.onclick =
                    function () {

                        size =
                            Math.max(
                                14,
                                size - 2
                            );

                        target.style.fontSize =
                            size + "px";

                    };

            }


            if (reset) {

                reset.onclick =
                    function () {

                        size = 20;

                        target.style.fontSize =
                            size + "px";

                    };

            }


            if (inButton) {

                inButton.onclick =
                    function () {

                        size =
                            Math.min(
                                40,
                                size + 2
                            );

                        target.style.fontSize =
                            size + "px";

                    };

            }


            target.style.fontSize =
                size + "px";
        }


        /* =================================================
           ADD FULL CHAPTER BUTTON
           
           IMPORTANT:
           We create this button through JavaScript.
           Therefore bible.html does NOT need to change.
        ================================================= */

        function addFullChapterButton() {

            const actionArea =
                document.querySelector(
                    ".bible-action-buttons"
                );

            if (!actionArea) return;

            if (
                document.getElementById(
                    "readChapterButton"
                )
            ) {

                return;

            }


            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.id =
                "readChapterButton";

            button.textContent =
                "📖 Read Full Chapter";

            actionArea.appendChild(
                button
            );


            button.addEventListener(
                "click",
                readChapter
            );


            console.log(
                "Full Chapter button added."
            );
        }


        /* =================================================
           READ FULL CHAPTER
        ================================================= */

        function readChapter() {

            const testament =
                testamentSelect.value;

            const book =
                bookSelect.value;

            const chapter =
                Number(
                    chapterSelect.value
                );

            const language =
                getLanguage();


            if (
                !testament ||
                !book ||
                !chapter
            ) {

                alert(
                    "Please select Testament, Book and Chapter first."
                );

                return;
            }


            const chapterData =
                getChapterTexts(
                    language,
                    testament,
                    book,
                    chapter
                );


            if (!chapterData.length) {

                if (result) {

                    result.innerHTML = `

                        <div
                            class="bible-reading-content"
                            dir="${getDirection(language)}"
                        >

                            <h2>
                                📖
                                ${escapeHTML(book)}
                                — Chapter ${chapter}
                            </h2>

                            <p>
                                اس باب کا Bible verse data ابھی Database میں موجود نہیں ہے۔
                            </p>

                        </div>

                    `;

                }

                return;
            }


            renderChapter(
                book,
                chapter,
                chapterData,
                language
            );
        }


        /* =================================================
           RESEARCH VERSE
        ================================================= */

        function researchVerse() {

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

            const language =
                getLanguage();


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


            if (!result) return;

            stopAudio();


            const text =
                getVerseText(
                    language,
                    testament,
                    book,
                    chapter,
                    verse
                );


            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${getDirection(language)}"
                >

                    <h2>
                        🔎 Bible Research
                    </h2>


                    <h3>
                        ${escapeHTML(book)}
                        ${chapter}:${verse}
                    </h3>


                    <div class="bible-verse-text">

                        <p>
                            ${escapeHTML(
                                text ||
                                "اس آیت کا متن ابھی منتخب زبان کے Bible Database میں موجود نہیں ہے۔"
                            )}
                        </p>

                    </div>


                    <p>
                        Reading Language:
                        ${escapeHTML(language)}
                    </p>

                </div>

            `;


            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }


        /* =================================================
           EVENT LISTENERS
        ================================================= */

        testamentSelect.addEventListener(
            "change",
            loadBooks
        );


        bookSelect.addEventListener(
            "change",
            loadChapters
        );


        chapterSelect.addEventListener(
            "change",
            loadVerses
        );


        verseSelect.addEventListener(
            "change",
            readVerse
        );


        if (readBibleButton) {

            readBibleButton.addEventListener(
                "click",
                readVerse
            );

        }


        if (researchBibleButton) {

            researchBibleButton.addEventListener(
                "click",
                researchVerse
            );

        }


        /* =================================================
           TRANSLATION LANGUAGE CHANGE
        ================================================= */

        if (translationLanguage) {

            translationLanguage.addEventListener(
                "change",
                function () {

                    stopAudio();

                    if (
                        testamentSelect.value &&
                        bookSelect.value &&
                        chapterSelect.value
                    ) {

                        loadVerses();

                    }

                }
            );

        }


        /* =================================================
           ADD FULL CHAPTER BUTTON
        ================================================= */

        addFullChapterButton();


        /* =================================================
           INITIAL STATE
        ================================================= */

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


        console.log(
            "Kingdom Light Network Bible Selector READY."
        );

    }


    /* =====================================================
       DOM READY
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startBibleSystem
        );

    } else {

        startBibleSystem();

    }


})();
