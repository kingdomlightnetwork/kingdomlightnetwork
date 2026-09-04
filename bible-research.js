/* =====================================================
   KINGDOM LIGHT NETWORK
   BIBLE RESEARCH / SELECTOR ENGINE
   STABLE VERSION
   Connected with:
   - bible-data.js
   - bible-research.html
   - style.css
   - language.js
   - script.js

   Features:
   SELECTOR + VERSE + FULL CHAPTER
   + AUDIO + ZOOM + RESEARCH
===================================================== */

(function () {

    "use strict";

    /* =================================================
       START BIBLE SYSTEM
    ================================================= */

    function startBibleSystem() {

        console.log("Bible Selector: starting...");

        /* =============================================
           DOM ELEMENTS
        ============================================= */

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

        /* =============================================
           REQUIRED HTML CHECK
        ============================================= */

        if (
            !testamentSelect ||
            !bookSelect ||
            !chapterSelect ||
            !verseSelect
        ) {

            console.error(
                "Bible Error: Required selector elements were not found."
            );

            return;
        }

        console.log("Bible Selector HTML detected.");

        /* =============================================
           CURRENT SELECTION
        ============================================= */

        let currentTestament = "";
        let currentBook = "";
        let currentChapter = "";

        /* =============================================
           BIBLE BOOKS
        ============================================= */

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

        /* =============================================
           RESET SELECT
        ============================================= */

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

        /* =============================================
           NORMALIZE KEY
        ============================================= */

        function normalizeKey(value) {

            return String(value || "")
                .trim()
                .toLowerCase()
                .replace(/[_-]+/g, " ")
                .replace(/\s+/g, " ");

        }

        /* =============================================
           FIND OBJECT KEY
        ============================================= */

        function findObjectKey(object, requestedKey) {

            if (
                !object ||
                typeof object !== "object"
            ) {
                return null;
            }

            const requested =
                normalizeKey(requestedKey);

            const keys =
                Object.keys(object);

            if (
                Object.prototype.hasOwnProperty.call(
                    object,
                    requestedKey
                )
            ) {
                return requestedKey;
            }

            for (let i = 0; i < keys.length; i++) {

                if (
                    normalizeKey(keys[i]) ===
                    requested
                ) {
                    return keys[i];
                }

            }

            return null;
        }

        /* =============================================
           FIND TESTAMENT
        ============================================= */

        function findTestamentObject(database, testament) {

            if (!database) {
                return null;
            }

            const possibleKeys =
                testament === "old"
                    ? [
                        "old",
                        "oldTestament",
                        "old testament",
                        "ot"
                    ]
                    : [
                        "new",
                        "newTestament",
                        "new testament",
                        "nt"
                    ];

            for (
                let i = 0;
                i < possibleKeys.length;
                i++
            ) {

                const key =
                    findObjectKey(
                        database,
                        possibleKeys[i]
                    );

                if (key) {
                    return database[key];
                }

            }

            return null;
        }

        /* =============================================
           FIND BOOK DATA
        ============================================= */

        function findBookData(
            database,
            testament,
            book
        ) {

            const testamentData =
                findTestamentObject(
                    database,
                    testament
                );

            if (!testamentData) {
                return null;
            }

            const bookKey =
                findObjectKey(
                    testamentData,
                    book
                );

            if (!bookKey) {
                return null;
            }

            return testamentData[bookKey];
        }

        /* =============================================
           FIND CHAPTER DATA
        ============================================= */

        function findChapterData(
            database,
            testament,
            book,
            chapter
        ) {

            const bookData =
                findBookData(
                    database,
                    testament,
                    book
                );

            if (!bookData) {
                return null;
            }

            const chapterString =
                String(chapter);

            const possibleKeys = [
                chapterString,
                "chapter " + chapterString,
                "ch" + chapterString,
                "ch-" + chapterString,
                "ch_" + chapterString
            ];

            for (
                let i = 0;
                i < possibleKeys.length;
                i++
            ) {

                const key =
                    findObjectKey(
                        bookData,
                        possibleKeys[i]
                    );

                if (key) {
                    return bookData[key];
                }

            }

            return null;
        }

        /* =============================================
           GET DATABASE
        ============================================= */

        function getDatabase(language) {

            const requestedLanguage =
                String(language || "en")
                    .trim()
                    .toLowerCase();

            if (
                typeof window.getBibleDatabase ===
                "function"
            ) {

                try {

                    const database =
                        window.getBibleDatabase(
                            requestedLanguage
                        );

                    if (database) {
                        return database;
                    }

                } catch (error) {

                    console.error(
                        "Bible database function error:",
                        error
                    );

                }

            }

            if (
                window.BIBLE_DATABASE &&
                typeof window.BIBLE_DATABASE === "object"
            ) {

                const languageDatabase =
                    window.BIBLE_DATABASE[
                        requestedLanguage
                    ];

                if (languageDatabase) {
                    return languageDatabase;
                }

                if (
                    window.BIBLE_DATABASE.old ||
                    window.BIBLE_DATABASE.new ||
                    window.BIBLE_DATABASE.oldTestament ||
                    window.BIBLE_DATABASE.newTestament
                ) {

                    return window.BIBLE_DATABASE;
                }

            }

            return null;
        }

        /* =============================================
           GET LANGUAGE
        ============================================= */

        function getLanguage() {

            if (
                translationLanguage &&
                translationLanguage.value
            ) {

                return String(
                    translationLanguage.value
                )
                    .trim()
                    .toLowerCase();

            }

            if (
                typeof window.DEFAULT_BIBLE_LANGUAGE ===
                "string"
            ) {

                return window.DEFAULT_BIBLE_LANGUAGE
                    .trim()
                    .toLowerCase();

            }

            return "en";
        }

        /* =============================================
           LANGUAGE AVAILABILITY
        ============================================= */

        function isLanguageAvailable(language) {

            if (
                typeof window.isBibleLanguageAvailable ===
                "function"
            ) {

                try {

                    return Boolean(
                        window.isBibleLanguageAvailable(
                            language
                        )
                    );

                } catch (error) {

                    console.error(
                        "Bible language availability error:",
                        error
                    );

                }

            }

            return Boolean(
                getDatabase(language)
            );
        }

        /* =============================================
           LOAD BOOKS
        ============================================= */

        function loadBooks() {

            resetSelect(bookSelect, "Select Book");
            resetSelect(chapterSelect, "Select Chapter");
            resetSelect(verseSelect, "Select Verse");

            currentTestament =
                testamentSelect.value || "";

            currentBook = "";
            currentChapter = "";

            if (!currentTestament) {
                return;
            }

            const books =
                BIBLE_BOOKS[currentTestament];

            if (!books) {

                console.error(
                    "Bible Error: Testament not found:",
                    currentTestament
                );

                return;
            }

            books.forEach(function (book) {

                const option =
                    document.createElement("option");

                option.value = book[0];
                option.textContent = book[0];

                bookSelect.appendChild(option);

            });

            console.log(
                "Books loaded:",
                books.length
            );
        }

        /* =============================================
           FIND BOOK
        ============================================= */

        function findBook(testament, bookName) {

            const books =
                BIBLE_BOOKS[testament];

            if (!books) {
                return null;
            }

            return (
                books.find(function (book) {

                    return (
                        normalizeKey(book[0]) ===
                        normalizeKey(bookName)
                    );

                }) || null
            );
        }

        /* =============================================
           LOAD CHAPTERS
        ============================================= */

        function loadChapters() {

            resetSelect(
                chapterSelect,
                "Select Chapter"
            );

            resetSelect(
                verseSelect,
                "Select Verse"
            );

            currentTestament =
                testamentSelect.value || "";

            currentBook =
                bookSelect.value || "";

            currentChapter = "";

            if (
                !currentTestament ||
                !currentBook
            ) {
                return;
            }

            const book =
                findBook(
                    currentTestament,
                    currentBook
                );

            if (!book) {
                return;
            }

            const chapterCount =
                Number(book[1]);

            for (
                let chapter = 1;
                chapter <= chapterCount;
                chapter++
            ) {

                const option =
                    document.createElement("option");

                option.value =
                    String(chapter);

                option.textContent =
                    "Chapter " + chapter;

                chapterSelect.appendChild(option);
            }

            console.log(
                "Chapters loaded:",
                currentBook,
                chapterCount
            );
        }

        /* =============================================
           GET AVAILABLE VERSES
        ============================================= */

        function getAvailableVerses(
            language,
            testament,
            book,
            chapter
        ) {

            if (
                typeof window.getBibleAvailableVerses ===
                "function"
            ) {

                try {

                    const verses =
                        window.getBibleAvailableVerses(
                            language,
                            testament,
                            book,
                            chapter
                        );

                    if (Array.isArray(verses)) {

                        return verses
                            .map(function (verse) {
                                return Number(verse);
                            })
                            .filter(function (verse) {
                                return Number.isFinite(verse);
                            })
                            .sort(function (a, b) {
                                return a - b;
                            });

                    }

                } catch (error) {

                    console.error(
                        "Bible verse helper error:",
                        error
                    );

                }

            }

            const database =
                getDatabase(language);

            if (!database) {
                return [];
            }

            const chapterData =
                findChapterData(
                    database,
                    testament,
                    book,
                    chapter
                );

            if (
                !chapterData ||
                typeof chapterData !== "object"
            ) {
                return [];
            }

            if (Array.isArray(chapterData)) {

                return chapterData
                    .map(function (item, index) {

                        if (
                            item &&
                            typeof item === "object" &&
                            item.verse !== undefined
                        ) {

                            return Number(item.verse);

                        }

                        return index + 1;

                    })
                    .filter(function (verse) {

                        return Number.isFinite(verse);

                    })
                    .sort(function (a, b) {

                        return a - b;

                    });
            }

            return Object.keys(chapterData)
                .map(function (value) {

                    const cleaned =
                        String(value)
                            .replace(
                                /^verse[\s_-]*/i,
                                ""
                            )
                            .trim();

                    return Number(cleaned);

                })
                .filter(function (value) {

                    return Number.isFinite(value);

                })
                .sort(function (a, b) {

                    return a - b;

                });
        }

        /* =============================================
           LOAD VERSES
        ============================================= */

        function loadVerses() {

            resetSelect(
                verseSelect,
                "Select Verse"
            );

            currentTestament =
                testamentSelect.value || "";

            currentBook =
                bookSelect.value || "";

            currentChapter =
                chapterSelect.value || "";

            const chapter =
                Number(currentChapter);

            if (
                !currentTestament ||
                !currentBook ||
                !chapter
            ) {
                return;
            }

            const language =
                getLanguage();

            console.log(
                "Loading verses:",
                {
                    language,
                    testament: currentTestament,
                    book: currentBook,
                    chapter
                }
            );

            if (!isLanguageAvailable(language)) {

                const option =
                    document.createElement("option");

                option.value = "";
                option.textContent =
                    "Selected language data is not available";

                verseSelect.appendChild(option);

                console.warn(
                    "Bible language data is not available:",
                    language
                );

                return;
            }

            const verses =
                getAvailableVerses(
                    language,
                    currentTestament,
                    currentBook,
                    chapter
                );

            if (verses.length > 0) {

                verses.forEach(function (verse) {

                    const option =
                        document.createElement("option");

                    option.value =
                        String(verse);

                    option.textContent =
                        "Verse " + verse;

                    verseSelect.appendChild(option);

                });

                console.log(
                    "Verses loaded:",
                    verses.length
                );

                return;
            }

            const option =
                document.createElement("option");

            option.value = "";
            option.textContent =
                "Verse data not available for this chapter";

            verseSelect.appendChild(option);

            console.warn(
                "Bible verse data not available:",
                {
                    language,
                    testament: currentTestament,
                    book: currentBook,
                    chapter
                }
            );
        }

        /* =============================================
           EXTRACT VERSE TEXT
        ============================================= */

        function extractVerseText(value) {

            if (
                value === null ||
                value === undefined
            ) {
                return null;
            }

            if (
                typeof value === "string" ||
                typeof value === "number"
            ) {

                return String(value);

            }

            if (typeof value === "object") {

                const possibleFields = [
                    "text",
                    "verse",
                    "content",
                    "value",
                    "body"
                ];

                for (
                    let i = 0;
                    i < possibleFields.length;
                    i++
                ) {

                    const field =
                        possibleFields[i];

                    if (
                        value[field] !== undefined &&
                        value[field] !== null
                    ) {

                        return String(
                            value[field]
                        );
                    }

                }

            }

            return null;
        }

        /* =============================================
           GET VERSE TEXT
        ============================================= */

        function getVerseText(
            language,
            testament,
            book,
            chapter,
            verse
        ) {

            if (
                typeof window.getBibleVerse ===
                "function"
            ) {

                try {

                    const text =
                        window.getBibleVerse(
                            language,
                            testament,
                            book,
                            chapter,
                            verse
                        );

                    if (
                        text !== null &&
                        text !== undefined &&
                        String(text).trim() !== ""
                    ) {

                        return String(text);
                    }

                } catch (error) {

                    console.error(
                        "Bible verse function error:",
                        error
                    );

                }

            }

            const database =
                getDatabase(language);

            if (!database) {
                return null;
            }

            const chapterData =
                findChapterData(
                    database,
                    testament,
                    book,
                    chapter
                );

            if (!chapterData) {
                return null;
            }

            const requestedVerse =
                String(verse);

            if (
                Object.prototype.hasOwnProperty.call(
                    chapterData,
                    requestedVerse
                )
            ) {

                return extractVerseText(
                    chapterData[requestedVerse]
                );
            }

            const verseKey =
                findObjectKey(
                    chapterData,
                    "verse " + requestedVerse
                );

            if (verseKey) {

                return extractVerseText(
                    chapterData[verseKey]
                );
            }

            const keys =
                Object.keys(chapterData);

            for (
                let i = 0;
                i < keys.length;
                i++
            ) {

                const cleaned =
                    String(keys[i])
                        .replace(
                            /^verse[\s_-]*/i,
                            ""
                        )
                        .trim();

                if (
                    Number(cleaned) ===
                    Number(verse)
                ) {

                    return extractVerseText(
                        chapterData[keys[i]]
                    );
                }

            }

            return null;
        }

        /* =============================================
           GET COMPLETE CHAPTER
        ============================================= */

        function getChapterVerses(
            language,
            testament,
            book,
            chapter
        ) {

            if (
                typeof window.getBibleChapter ===
                "function"
            ) {

                try {

                    const officialChapter =
                        window.getBibleChapter(
                            language,
                            testament,
                            book,
                            chapter
                        );

                    if (
                        officialChapter &&
                        typeof officialChapter === "object"
                    ) {

                        const keys =
                            Object.keys(
                                officialChapter
                            );

                        if (keys.length > 0) {

                            return keys
                                .map(function (verseKey) {

                                    const cleaned =
                                        String(verseKey)
                                            .replace(
                                                /^verse[\s_-]*/i,
                                                ""
                                            )
                                            .trim();

                                    return {
                                        verse:
                                            Number(cleaned),

                                        text:
                                            extractVerseText(
                                                officialChapter[
                                                    verseKey
                                                ]
                                            )
                                    };

                                })
                                .filter(function (item) {

                                    return (
                                        Number.isFinite(
                                            item.verse
                                        ) &&
                                        item.text
                                    );

                                })
                                .sort(function (a, b) {

                                    return (
                                        a.verse -
                                        b.verse
                                    );

                                });
                        }

                    }

                } catch (error) {

                    console.error(
                        "Bible chapter function error:",
                        error
                    );

                }

            }

            const database =
                getDatabase(language);

            if (!database) {
                return [];
            }

            const chapterData =
                findChapterData(
                    database,
                    testament,
                    book,
                    chapter
                );

            if (
                !chapterData ||
                typeof chapterData !== "object"
            ) {
                return [];
            }

            if (Array.isArray(chapterData)) {

                return chapterData
                    .map(function (item, index) {

                        if (
                            item &&
                            typeof item === "object" &&
                            item.verse !== undefined
                        ) {

                            return {
                                verse:
                                    Number(item.verse),

                                text:
                                    extractVerseText(item)
                            };

                        }

                        return {
                            verse:
                                index + 1,

                            text:
                                extractVerseText(item)
                        };

                    })
                    .filter(function (item) {

                        return (
                            Number.isFinite(item.verse) &&
                            item.text
                        );

                    })
                    .sort(function (a, b) {

                        return (
                            a.verse -
                            b.verse
                        );

                    });
            }

            return Object.keys(chapterData)
                .map(function (verseKey) {

                    const cleaned =
                        String(verseKey)
                            .replace(
                                /^verse[\s_-]*/i,
                                ""
                            )
                            .trim();

                    return {
                        verse:
                            Number(cleaned),

                        text:
                            extractVerseText(
                                chapterData[verseKey]
                            )
                    };

                })
                .filter(function (item) {

                    return (
                        Number.isFinite(item.verse) &&
                        item.text
                    );

                })
                .sort(function (a, b) {

                    return (
                        a.verse -
                        b.verse
                    );

                });
        }

        /* =============================================
           TEXT DIRECTION
        ============================================= */

        function getDirection(language) {

            const rtlLanguages = [
                "ur",
                "pa",
                "ar",
                "fa",
                "he",
                "arc"
            ];

            return rtlLanguages.includes(
                normalizeLanguage(language)
            )
                ? "rtl"
                : "ltr";
        }

        /* =============================================
           HTML ESCAPE
        ============================================= */

        function escapeHTML(value) {

            return String(
                value === null ||
                value === undefined
                    ? ""
                    : value
            )
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        /* =============================================
           NORMALIZE LANGUAGE
        ============================================= */

        function normalizeLanguage(value) {

            return String(value || "")
                .trim()
                .toLowerCase()
                .replace(/_/g, "-");
        }

        /* =============================================
           STOP AUDIO
        ============================================= */

        function stopAudio() {

            if ("speechSynthesis" in window) {

                try {

                    window.speechSynthesis.cancel();

                } catch (error) {

                    console.error(
                        "Speech stop error:",
                        error
                    );
                }
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

        /* =============================================
           SPEECH LANGUAGE MAP
        ============================================= */

        function getSpeechLanguages(language) {

            const speechLanguages = {

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

                fa: [
                    "fa-IR",
                    "fa"
                ],

                he: [
                    "he-IL",
                    "he"
                ],

                arc: [
                    "ar",
                    "he"
                ],

                grc: [
                    "el-GR",
                    "el"
                ]
            };

            return (
                speechLanguages[language] ||
                ["en-US", "en"]
            );
        }

        /* =============================================
           LANGUAGE NAME MAP
        ============================================= */

        function getLanguageNames(language) {

            const languageNames = {

                ur: [
                    "urdu",
                    "pakistan",
                    "pakistani",
                    "اردو"
                ],

                pa: [
                    "punjabi",
                    "pakistan",
                    "punjabi pakistan",
                    "پنجابی"
                ],

                ar: [
                    "arabic",
                    "العربية"
                ],

                fa: [
                    "persian",
                    "farsi",
                    "فارسی"
                ],

                he: [
                    "hebrew",
                    "עברית"
                ],

                grc: [
                    "greek",
                    "ελληνικά"
                ],

                en: [
                    "english"
                ]
            };

            return (
                languageNames[language] ||
                []
            );
        }

        /* =============================================
           FIND BEST VOICE
        ============================================= */

        function findBestVoice(
            voices,
            requestedLanguages,
            language
        ) {

            if (
                !voices ||
                voices.length === 0
            ) {
                return null;
            }

            const normalizedRequested =
                requestedLanguages.map(
                    function (value) {
                        return normalizeLanguage(value);
                    }
                );

            for (
                let i = 0;
                i < normalizedRequested.length;
                i++
            ) {

                const requested =
                    normalizedRequested[i];

                const exact =
                    voices.find(
                        function (voice) {

                            return (
                                normalizeLanguage(
                                    voice.lang
                                ) === requested
                            );

                        }
                    );

                if (exact) {
                    return exact;
                }
            }

            const baseLanguages =
                normalizedRequested.map(
                    function (value) {
                        return value.split("-")[0];
                    }
                );

            const baseVoice =
                voices.find(
                    function (voice) {

                        const voiceLang =
                            normalizeLanguage(
                                voice.lang
                            );

                        if (!voiceLang) {
                            return false;
                        }

                        const voiceBase =
                            voiceLang.split("-")[0];

                        return baseLanguages.includes(
                            voiceBase
                        );
                    }
                );

            if (baseVoice) {
                return baseVoice;
            }

            const names =
                getLanguageNames(language);

            if (names.length > 0) {

                const nameVoice =
                    voices.find(
                        function (voice) {

                            const voiceName =
                                String(
                                    voice.name || ""
                                ).toLowerCase();

                            const voiceLang =
                                String(
                                    voice.lang || ""
                                ).toLowerCase();

                            return names.some(
                                function (name) {

                                    const searchName =
                                        String(
                                            name
                                        ).toLowerCase();

                                    return (
                                        voiceName.includes(
                                            searchName
                                        ) ||
                                        voiceLang.includes(
                                            searchName
                                        )
                                    );
                                }
                            );
                        }
                    );

                if (nameVoice) {
                    return nameVoice;
                }
            }

            return null;
        }

        /* =============================================
           GET BROWSER VOICES
        ============================================= */

        function getBrowserVoices(callback) {

            if (!("speechSynthesis" in window)) {

                callback([]);
                return;
            }

            const voices =
                window.speechSynthesis.getVoices();

            if (
                voices &&
                voices.length > 0
            ) {

                callback(voices);
                return;
            }

            let finished = false;

            function finish() {

                if (finished) {
                    return;
                }

                finished = true;

                try {

                    window.speechSynthesis
                        .removeEventListener(
                            "voiceschanged",
                            finish
                        );

                } catch (error) {
                    console.error(error);
                }

                callback(
                    window.speechSynthesis
                        .getVoices() || []
                );
            }

            window.speechSynthesis
                .addEventListener(
                    "voiceschanged",
                    finish
                );

            setTimeout(
                finish,
                2000
            );
        }

        /* =============================================
           PLAY AUDIO
        ============================================= */

        function playSpeech(
            text,
            button,
            stopLabel,
            normalLabel
        ) {

            if (
                !("speechSynthesis" in window) ||
                !("SpeechSynthesisUtterance" in window)
            ) {

                alert(
                    "Audio is not supported by this browser."
                );

                return;
            }

            if (
                !text ||
                !String(text).trim()
            ) {

                alert(
                    "اس متن کا آڈیو دستیاب نہیں ہے۔"
                );

                return;
            }

            const language =
                getLanguage();

            const requestedLanguages =
                getSpeechLanguages(language);

            getBrowserVoices(
                function (voices) {

                    const voice =
                        findBestVoice(
                            voices,
                            requestedLanguages,
                            language
                        );

                    try {

                        window.speechSynthesis.cancel();

                    } catch (error) {

                        console.error(
                            "Speech cancel error:",
                            error
                        );
                    }

                    const speech =
                        new SpeechSynthesisUtterance(
                            String(text)
                        );

                    if (voice) {

                        speech.voice =
                            voice;

                        speech.lang =
                            voice.lang;

                    } else {

                        speech.lang =
                            requestedLanguages[0] ||
                            language ||
                            "en-US";
                    }

                    speech.rate = 0.85;
                    speech.pitch = 1;
                    speech.volume = 1;

                    speech.onstart =
                        function () {

                            if (button) {
                                button.textContent =
                                    stopLabel;
                            }
                        };

                    speech.onend =
                        function () {

                            if (button) {
                                button.textContent =
                                    normalLabel;
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
                                    normalLabel;
                            }
                        };

                    setTimeout(
                        function () {

                            try {

                                window.speechSynthesis
                                    .speak(
                                        speech
                                    );

                            } catch (error) {

                                console.error(
                                    "Bible Speech Error:",
                                    error
                                );
                            }

                        },
                        150
                    );
                }
            );
        }

        /* =============================================
           SETUP VERSE AUDIO
        ============================================= */

        function setupAudio(text) {

            const button =
                document.getElementById(
                    "verseAudioButton"
                );

            if (!button) {
                return;
            }

            button.onclick =
                function () {

                    if (
                        "speechSynthesis" in window &&
                        (
                            window.speechSynthesis.speaking ||
                            window.speechSynthesis.pending
                        )
                    ) {

                        stopAudio();
                        return;
                    }

                    playSpeech(
                        text,
                        button,
                        "⏹ Stop",
                        "🔊 Listen"
                    );
                };
        }

        /* =============================================
           SETUP CHAPTER AUDIO
        ============================================= */

        function setupChapterAudio(
            text,
            button
        ) {

            if (!button) {
                return;
            }

            button.onclick =
                function () {

                    if (
                        "speechSynthesis" in window &&
                        (
                            window.speechSynthesis.speaking ||
                            window.speechSynthesis.pending
                        )
                    ) {

                        stopAudio();
                        return;
                    }

                    playSpeech(
                        text,
                        button,
                        "⏹ Stop Chapter",
                        "🔊 Listen Chapter"
                    );
                };
        }

        /* =============================================
           VERSE ZOOM
        ============================================= */

        function setupZoom() {

            const target =
                document.querySelector(
                    ".bible-verse-text p"
                );

            if (!target) {
                return;
            }

            let size = 20;

            const out =
                document.getElementById(
                    "verseZoomOutButton"
                );

            const reset =
                document.getElementById(
                    "verseZoomResetButton"
                );

            const inButton =
                document.getElementById(
                    "verseZoomInButton"
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

        /* =============================================
           CHAPTER ZOOM
        ============================================= */

        function setupChapterZoom() {

            const target =
                document.querySelector(
                    ".bible-verse-text p"
                );

            if (!target) {
                return;
            }

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

        /* =============================================
           RENDER VERSE
        ============================================= */

        function renderVerse(
            book,
            chapter,
            verse,
            text,
            language
        ) {

            if (!result) {
                return;
            }

            stopAudio();

            const displayText =
                text ||
                "اس آیت کا متن Bible Database میں موجود نہیں ہے۔";

            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${getDirection(language)}"
                >

                    <h2>
                        📖 ${escapeHTML(book)}
                        ${escapeHTML(chapter)}:${escapeHTML(verse)}
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

            setupAudio(displayText);
            setupZoom();

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        /* =============================================
           READ VERSE
        ============================================= */

        function readVerse() {

            const testament =
                testamentSelect.value ||
                currentTestament;

            const book =
                bookSelect.value ||
                currentBook;

            const chapter =
                Number(
                    chapterSelect.value ||
                    currentChapter
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

            currentTestament =
                testament;

            currentBook =
                book;

            currentChapter =
                String(chapter);

            const text =
                getVerseText(
                    language,
                    testament,
                    book,
                    chapter,
                    verse
                );

            console.log(
                "Reading Verse:",
                {
                    language,
                    testament,
                    book,
                    chapter,
                    verse,
                    textFound: Boolean(text)
                }
            );

            renderVerse(
                book,
                chapter,
                verse,
                text,
                language
            );
        }

        /* =============================================
           READ FULL CHAPTER
        ============================================= */

        function readFullChapter() {

            const testament =
                testamentSelect.value ||
                currentTestament;

            const book =
                bookSelect.value ||
                currentBook;

            const chapter =
                Number(
                    chapterSelect.value ||
                    currentChapter
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

            currentTestament =
                testament;

            currentBook =
                book;

            currentChapter =
                String(chapter);

            const chapterVerses =
                getChapterVerses(
                    language,
                    testament,
                    book,
                    chapter
                );

            if (
                !chapterVerses ||
                chapterVerses.length === 0
            ) {

                alert(
                    "اس چیپٹر کا مکمل متن Bible Database میں موجود نہیں ہے۔"
                );

                return;
            }

            stopAudio();

            let chapterText = "";

            chapterVerses.forEach(
                function (item) {

                    chapterText +=
                        item.verse +
                        ". " +
                        item.text +
                        " ";

                }
            );

            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${getDirection(language)}"
                >

                    <h2>
                        📖 ${escapeHTML(book)}
                        — Chapter ${escapeHTML(chapter)}
                    </h2>

                    <div class="bible-verse-text">

                        <p>
                            ${chapterVerses
                                .map(
                                    function (item) {

                                        return (
                                            "<strong>" +
                                            escapeHTML(
                                                item.verse
                                            ) +
                                            ".</strong> " +
                                            escapeHTML(
                                                item.text
                                            )
                                        );

                                    }
                                )
                                .join("<br><br>")
                            }
                        </p>

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
                chapterText,
                document.getElementById(
                    "chapterAudioButton"
                )
            );

            setupChapterZoom();

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        /* =============================================
           RESEARCH
        ============================================= */

        function researchVerse() {

            const testament =
                testamentSelect.value ||
                currentTestament;

            const book =
                bookSelect.value ||
                currentBook;

            const chapter =
                Number(
                    chapterSelect.value ||
                    currentChapter
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

            const text =
                getVerseText(
                    language,
                    testament,
                    book,
                    chapter,
                    verse
                );

            if (!result) {
                return;
            }

            stopAudio();

            const source =
                sourceLanguage &&
                sourceLanguage.value
                    ? sourceLanguage.value
                    : "Not selected";

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
                        ${escapeHTML(chapter)}:${escapeHTML(verse)}
                    </h3>

                    <div class="bible-verse-text">

                        <p>
                            ${escapeHTML(
                                text ||
                                "اس آیت کا متن Bible Database میں موجود نہیں ہے۔"
                            )}
                        </p>

                    </div>

                    <p>
                        Reading Language:
                        ${escapeHTML(language)}
                    </p>

                    <p>
                        Source Language:
                        ${escapeHTML(source)}
                    </p>

                </div>
            `;

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        /* =============================================
           TESTAMENT CHANGE
        ============================================= */

        testamentSelect.addEventListener(
            "change",
            function () {

                currentTestament =
                    testamentSelect.value || "";

                currentBook = "";
                currentChapter = "";

                stopAudio();
                loadBooks();
            }
        );

        /* =============================================
           BOOK CHANGE
        ============================================= */

        bookSelect.addEventListener(
            "change",
            function () {

                currentBook =
                    bookSelect.value || "";

                currentChapter = "";

                stopAudio();
                loadChapters();
            }
        );

        /* =============================================
           CHAPTER CHANGE
        ============================================= */

        chapterSelect.addEventListener(
            "change",
            function () {

                currentChapter =
                    chapterSelect.value || "";

                stopAudio();
                loadVerses();
            }
        );

        /* =============================================
           VERSE CHANGE
        ============================================= */

        verseSelect.addEventListener(
            "change",
            function () {

                if (verseSelect.value) {
                    readVerse();
                }
            }
        );

        /* =============================================
           READ BUTTON
        ============================================= */

        if (readBibleButton) {

            readBibleButton.addEventListener(
                "click",
                readVerse
            );
        }

        /* =============================================
           RESEARCH BUTTON
        ============================================= */

        if (researchBibleButton) {

            researchBibleButton.addEventListener(
                "click",
                researchVerse
            );
        }

        /* =============================================
           TRANSLATION LANGUAGE CHANGE
        ============================================= */

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

                        currentTestament =
                            testamentSelect.value;

                        currentBook =
                            bookSelect.value;

                        currentChapter =
                            chapterSelect.value;

                        loadVerses();
                    }
                }
            );
        }

        /* =============================================
           FULL CHAPTER BUTTON
        ============================================= */

        const actionButtons =
            document.querySelector(
                ".bible-action-buttons"
            );

        if (
            actionButtons &&
            !document.getElementById(
                "readFullChapterButton"
            )
        ) {

            const fullChapterButton =
                document.createElement(
                    "button"
                );

            fullChapterButton.type =
                "button";

            fullChapterButton.id =
                "readFullChapterButton";

            fullChapterButton.textContent =
                "📖 Read Full Chapter";

            actionButtons.appendChild(
                fullChapterButton
            );

            fullChapterButton.addEventListener(
                "click",
                readFullChapter
            );
        }

        /* =============================================
           INITIAL RESET
        ============================================= */

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

        /* =============================================
           PRELOAD SPEECH VOICES
        ============================================= */

        if ("speechSynthesis" in window) {

            try {

                window.speechSynthesis.getVoices();

            } catch (error) {

                console.error(
                    "Speech voice preload error:",
                    error
                );
            }
        }

        /* =============================================
           BIBLE DATA READY CHECK
        ============================================= */

        if (window.bibleDataSystemReady) {

            console.log(
                "Bible Data System detected."
            );

        } else {

            console.warn(
                "Bible Data System flag not detected. Check script loading order."
            );
        }

        console.log(
            "Kingdom Light Network Bible Selector READY."
        );
    }

    /* =================================================
       START AFTER DOM
    ================================================= */

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
