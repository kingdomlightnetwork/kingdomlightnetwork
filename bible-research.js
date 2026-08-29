/* =====================================================
   KINGDOM LIGHT NETWORK
   BIBLE RESEARCH / SELECTOR ENGINE
   AUDIO + FULL CHAPTER + READING + RESEARCH
   FINAL STABLE VERSION
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

        if (!testamentSelect) {
            console.error("Bible Error: testamentSelect not found.");
            return;
        }

        if (!bookSelect) {
            console.error("Bible Error: bookSelect not found.");
            return;
        }

        if (!chapterSelect) {
            console.error("Bible Error: chapterSelect not found.");
            return;
        }

        if (!verseSelect) {
            console.error("Bible Error: verseSelect not found.");
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

            return books.find(function (book) {

                return book[0] === bookName;

            }) || null;

        }


        /* =============================================
           LOAD CHAPTERS
        ============================================= */

        function loadChapters() {

            resetSelect(chapterSelect, "Select Chapter");
            resetSelect(verseSelect, "Select Verse");

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
                console.error(
                    "Bible Error: Book not found:",
                    currentBook
                );
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
           GET DATABASE
        ============================================= */

        function getDatabase(language) {

            if (
                typeof window.getBibleDatabase ===
                "function"
            ) {

                try {

                    return window.getBibleDatabase(
                        language
                    );

                } catch (error) {

                    console.error(
                        "Bible database error:",
                        error
                    );

                }

            }

            if (
                typeof BIBLE_DATABASE !==
                "undefined"
            ) {

                return (
                    BIBLE_DATABASE[language] ||
                    null
                );

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

                return translationLanguage.value;

            }

            return "en";

        }


        /* =============================================
           AVAILABLE VERSES
        ============================================= */

        function getAvailableVerses(
            language,
            testament,
            book,
            chapter
        ) {

            const database =
                getDatabase(language);

            if (!database) {
                return [];
            }

            if (
                !database[testament] ||
                !database[testament][book] ||
                !database[testament][book][chapter]
            ) {
                return [];
            }

            return Object.keys(
                database[testament][book][chapter]
            )
            .map(function (value) {

                return Number(value);

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
                    currentBook,
                    chapter,
                    verses
                );

                return;

            }

            const option =
                document.createElement("option");

            option.value = "";

            option.textContent =
                "No verse text in local database";

            verseSelect.appendChild(option);

            console.log(
                "No verse data:",
                currentBook,
                chapter,
                language
            );

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

                    return window.getBibleVerse(
                        language,
                        testament,
                        book,
                        chapter,
                        verse
                    );

                } catch (error) {

                    console.error(
                        "Bible verse error:",
                        error
                    );

                }

            }

            const database =
                getDatabase(language);

            if (
                !database ||
                !database[testament] ||
                !database[testament][book] ||
                !database[testament][book][chapter]
            ) {
                return null;
            }

            return (
                database[testament]
                    [book]
                    [chapter]
                    [verse] || null
            );

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

            const database =
                getDatabase(language);

            if (
                !database ||
                !database[testament] ||
                !database[testament][book] ||
                !database[testament][book][chapter]
            ) {
                return [];
            }

            const chapterData =
                database[testament][book][chapter];

            return Object.keys(chapterData)
                .map(function (verseNumber) {

                    return {
                        verse: Number(verseNumber),
                        text: chapterData[verseNumber]
                    };

                })
                .filter(function (item) {

                    return (
                        Number.isFinite(item.verse) &&
                        item.text
                    );

                })
                .sort(function (a, b) {

                    return a.verse - b.verse;

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

            return rtlLanguages.includes(language)
                ? "rtl"
                : "ltr";

        }


        /* =============================================
           HTML ESCAPE
        ============================================= */

        function escapeHTML(value) {

            return String(value)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        }


        /* =============================================
           STOP AUDIO
        ============================================= */

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
                ],

                es: [
                    "es-ES",
                    "es-MX",
                    "es"
                ],

                pt: [
                    "pt-PT",
                    "pt-BR",
                    "pt"
                ],

                fr: [
                    "fr-FR",
                    "fr-CA",
                    "fr"
                ],

                de: [
                    "de-DE",
                    "de"
                ],

                it: [
                    "it-IT",
                    "it"
                ],

                ru: [
                    "ru-RU",
                    "ru"
                ],

                nl: [
                    "nl-NL",
                    "nl"
                ],

                tr: [
                    "tr-TR",
                    "tr"
                ],

                bn: [
                    "bn-BD",
                    "bn-IN",
                    "bn"
                ],

                ta: [
                    "ta-IN",
                    "ta"
                ],

                te: [
                    "te-IN",
                    "te"
                ],

                mr: [
                    "mr-IN",
                    "mr"
                ],

                "zh-CN": [
                    "zh-CN",
                    "zh"
                ],

                "zh-TW": [
                    "zh-TW",
                    "zh"
                ],

                ja: [
                    "ja-JP",
                    "ja"
                ],

                ko: [
                    "ko-KR",
                    "ko"
                ],

                vi: [
                    "vi-VN",
                    "vi"
                ],

                th: [
                    "th-TH",
                    "th"
                ],

                id: [
                    "id-ID",
                    "id"
                ],

                ms: [
                    "ms-MY",
                    "ms"
                ],

                fil: [
                    "fil-PH",
                    "fil"
                ],

                sw: [
                    "sw-KE",
                    "sw"
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
                    "ਪੰਜਾਬੀ"
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
                ],

                es: [
                    "spanish",
                    "español"
                ],

                pt: [
                    "portuguese",
                    "português"
                ],

                fr: [
                    "french",
                    "français"
                ],

                de: [
                    "german",
                    "deutsch"
                ],

                it: [
                    "italian",
                    "italiano"
                ],

                ru: [
                    "russian",
                    "русский"
                ],

                nl: [
                    "dutch",
                    "nederlands"
                ],

                tr: [
                    "turkish",
                    "türkçe"
                ],

                bn: [
                    "bengali",
                    "bangla"
                ],

                ta: [
                    "tamil"
                ],

                te: [
                    "telugu"
                ],

                mr: [
                    "marathi"
                ],

                ja: [
                    "japanese"
                ],

                ko: [
                    "korean"
                ],

                vi: [
                    "vietnamese"
                ],

                th: [
                    "thai"
                ],

                id: [
                    "indonesian"
                ],

                ms: [
                    "malay"
                ],

                fil: [
                    "filipino",
                    "tagalog"
                ],

                sw: [
                    "swahili"
                ]

            };

            return (
                languageNames[language] ||
                []
            );

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


            /* -----------------------------------------
               EXACT LANGUAGE MATCH
            ----------------------------------------- */

            for (
                let i = 0;
                i < requestedLanguages.length;
                i++
            ) {

                const requested =
                    normalizeLanguage(
                        requestedLanguages[i]
                    );

                const exact =
                    voices.find(function (voice) {

                        return (
                            normalizeLanguage(
                                voice.lang
                            ) === requested
                        );

                    });

                if (exact) {
                    return exact;
                }

            }


            /* -----------------------------------------
               BASE LANGUAGE MATCH
            ----------------------------------------- */

            const baseLanguages =
                requestedLanguages.map(function (value) {

                    return normalizeLanguage(value)
                        .split("-")[0];

                });


            const baseVoice =
                voices.find(function (voice) {

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

                });


            if (baseVoice) {
                return baseVoice;
            }


            /* -----------------------------------------
               VOICE NAME MATCH
            ----------------------------------------- */

            const names =
                getLanguageNames(language);


            if (names.length > 0) {

                const nameVoice =
                    voices.find(function (voice) {

                        const voiceName =
                            String(
                                voice.name || ""
                            ).toLowerCase();

                        const voiceLang =
                            String(
                                voice.lang || ""
                            ).toLowerCase();

                        return names.some(function (name) {

                            const searchName =
                                String(name)
                                    .toLowerCase();

                            return (
                                voiceName.includes(searchName) ||
                                voiceLang.includes(searchName)
                            );

                        });

                    });

                if (nameVoice) {
                    return nameVoice;
                }

            }


            /* -----------------------------------------
               WINDOWS MICROSOFT VOICE FALLBACK
            ----------------------------------------- */

            if (language === "ur") {

                const urduVoice =
                    voices.find(function (voice) {

                        const name =
                            String(
                                voice.name || ""
                            ).toLowerCase();

                        return (
                            name.includes("urdu") ||
                            name.includes("pakistan")
                        );

                    });

                if (urduVoice) {
                    return urduVoice;
                }

            }


            if (language === "pa") {

                const punjabiVoice =
                    voices.find(function (voice) {

                        const name =
                            String(
                                voice.name || ""
                            ).toLowerCase();

                        return (
                            name.includes("punjabi") ||
                            name.includes("pakistan")
                        );

                    });

                if (punjabiVoice) {
                    return punjabiVoice;
                }

            }


            return null;

        }


        /* =============================================
           SHOW AVAILABLE VOICES
        ============================================= */

        function logAvailableVoices(voices) {

            console.log(
                "Available Browser Voices:",
                voices.map(function (voice) {

                    return (
                        voice.name +
                        " [" +
                        voice.lang +
                        "]"
                    );

                })
            );

        }


        /* =============================================
           PLAY BIBLE AUDIO
        ============================================= */

        function playBibleAudio(
            voices,
            requestedLanguages,
            language,
            text,
            button
        ) {

            if (
                !voices ||
                voices.length === 0
            ) {

                alert(
                    "No speech voice is available in this browser."
                );

                return;

            }


            console.log(
                "Bible Audio Language:",
                language
            );

            console.log(
                "Requested Speech Languages:",
                requestedLanguages
            );


            logAvailableVoices(voices);


            const voice =
                findBestVoice(
                    voices,
                    requestedLanguages,
                    language
                );


            if (!voice) {

                console.warn(
                    "No matching voice found for:",
                    requestedLanguages
                );

                alert(
                    "اس زبان کی آواز Windows میں دستیاب نہیں ملی۔ براہِ کرم Windows کی Language Settings میں اس زبان کی Speech Voice انسٹال کریں۔"
                );

                return;

            }


            console.log(
                "Bible Audio Voice Selected:",
                voice.name,
                voice.lang
            );


            const speech =
                new SpeechSynthesisUtterance(
                    String(text || "")
                );


            speech.voice =
                voice;

            speech.lang =
                voice.lang;


            speech.rate =
                0.85;

            speech.pitch =
                1;

            speech.volume =
                1;


            speech.onstart =
                function () {

                    button.textContent =
                        "⏹ Stop";

                };


            speech.onend =
                function () {

                    button.textContent =
                        "🔊 Listen";

                };


            speech.onerror =
                function (event) {

                    console.error(
                        "Bible Audio Error:",
                        event
                    );

                    console.error(
                        "Bible Audio Language:",
                        language
                    );

                    console.error(
                        "Selected Voice:",
                        voice.name,
                        voice.lang
                    );

                    button.textContent =
                        "🔊 Listen";

                };


            window.speechSynthesis.cancel();


            setTimeout(function () {

                try {

                    window.speechSynthesis.speak(
                        speech
                    );

                } catch (error) {

                    console.error(
                        "Bible Speech Error:",
                        error
                    );

                    button.textContent =
                        "🔊 Listen";

                }

            }, 100);

        }


        /* =============================================
           GET VOICES
        ============================================= */

        function getBrowserVoices(callback) {

            if (
                !("speechSynthesis" in window)
            ) {

                callback([]);

                return;

            }


            let voices =
                window.speechSynthesis.getVoices();


            if (
                voices &&
                voices.length > 0
            ) {

                callback(voices);

                return;

            }


            let finished =
                false;


            function finish() {

                if (finished) {
                    return;
                }

                finished = true;

                window.speechSynthesis
                    .removeEventListener(
                        "voiceschanged",
                        finish
                    );

                const loadedVoices =
                    window.speechSynthesis
                        .getVoices();

                callback(
                    loadedVoices || []
                );

            }


            window.speechSynthesis
                .addEventListener(
                    "voiceschanged",
                    finish
                );


            setTimeout(
                finish,
                1500
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

                console.error(
                    "Bible Audio Error: verseAudioButton not found."
                );

                return;

            }


            button.onclick = null;


            button.onclick =
                function () {

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


                    const requestedLanguages =
                        getSpeechLanguages(
                            language
                        );


                    getBrowserVoices(
                        function (voices) {

                            if (
                                !voices ||
                                voices.length === 0
                            ) {

                                alert(
                                    "No speech voice is available in this browser."
                                );

                                return;

                            }


                            playBibleAudio(
                                voices,
                                requestedLanguages,
                                language,
                                text,
                                button
                            );

                        }
                    );

                };

        }


        /* =============================================
           PLAY CHAPTER AUDIO
        ============================================= */

        function playChapterAudio(
            voices,
            requestedLanguages,
            language,
            text,
            button
        ) {

            if (
                !voices ||
                voices.length === 0
            ) {

                alert(
                    "No speech voice is available in this browser."
                );

                return;

            }


            const voice =
                findBestVoice(
                    voices,
                    requestedLanguages,
                    language
                );


            if (!voice) {

                console.warn(
                    "No matching chapter voice found for:",
                    requestedLanguages
                );

                alert(
                    "اس زبان کی Chapter Audio آواز Windows میں دستیاب نہیں ملی۔"
                );

                return;

            }


            console.log(
                "Chapter Audio Voice Selected:",
                voice.name,
                voice.lang
            );


            const speech =
                new SpeechSynthesisUtterance(
                    String(text || "")
                );


            speech.voice =
                voice;

            speech.lang =
                voice.lang;


            speech.rate =
                0.85;

            speech.pitch =
                1;

            speech.volume =
                1;


            speech.onstart =
                function () {

                    button.textContent =
                        "⏹ Stop Chapter";

                };


            speech.onend =
                function () {

                    button.textContent =
                        "🔊 Listen Chapter";

                };


            speech.onerror =
                function (event) {

                    console.error(
                        "Bible Chapter Audio Error:",
                        event
                    );

                    console.error(
                        "Chapter Audio Voice:",
                        voice.name,
                        voice.lang
                    );

                    button.textContent =
                        "🔊 Listen Chapter";

                };


            window.speechSynthesis.cancel();


            setTimeout(function () {

                try {

                    window.speechSynthesis.speak(
                        speech
                    );

                } catch (error) {

                    console.error(
                        "Bible Chapter Speech Error:",
                        error
                    );

                    button.textContent =
                        "🔊 Listen Chapter";

                }

            }, 100);

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


            button.onclick = null;


            button.onclick =
                function () {

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


                    const requestedLanguages =
                        getSpeechLanguages(
                            language
                        );


                    getBrowserVoices(
                        function (voices) {

                            if (
                                !voices ||
                                voices.length === 0
                            ) {

                                alert(
                                    "No speech voice is available in this browser."
                                );

                                return;

                            }


                            playChapterAudio(
                                voices,
                                requestedLanguages,
                                language,
                                text,
                                button
                            );

                        }
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
                "اس آیت کا متن ابھی مقامی Bible Database میں موجود نہیں ہے۔";


            result.innerHTML = `

                <div
                    class="bible-reading-content"
                    dir="${getDirection(language)}"
                >

                    <h2>
                        📖 ${escapeHTML(book)}
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


            console.log(
                "Full Chapter Selection:",
                {
                    testament: testament,
                    book: book,
                    chapter: chapter,
                    language: language
                }
            );


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
                    "اس چیپٹر کا مکمل متن موجودہ Bible Database میں موجود نہیں ہے۔"
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
                        — Chapter ${chapter}
                    </h2>

                    <div class="bible-verse-text">

                        <p>
                            ${chapterVerses.map(
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
                            ).join("<br><br>")}
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
                                "اس آیت کا متن مقامی Bible Database میں موجود نہیں ہے۔"
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


        /* =============================================
           EVENTS
        ============================================= */

        testamentSelect.addEventListener(
            "change",
            function () {

                currentTestament =
                    testamentSelect.value || "";

                currentBook = "";
                currentChapter = "";

                loadBooks();

            }
        );


        bookSelect.addEventListener(
            "change",
            function () {

                currentBook =
                    bookSelect.value || "";

                currentChapter = "";

                loadChapters();

            }
        );


        chapterSelect.addEventListener(
            "change",
            function () {

                currentChapter =
                    chapterSelect.value || "";

                loadVerses();

            }
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
                document.createElement("button");


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

        if (
            "speechSynthesis" in window
        ) {

            window.speechSynthesis.getVoices();

        }


        console.log(
            "Kingdom Light Network Bible Selector READY."
        );

    }


    /* =================================================
       START AFTER DOM
    ================================================= */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startBibleSystem
        );

    } else {

        startBibleSystem();

    }

})();
