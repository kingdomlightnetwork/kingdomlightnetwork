/*
===========================================================
KINGDOM LIGHT NETWORK
BIBLE DATA SYSTEM
File: bible-data.js

Purpose:
- Central Bible database
- Bible language management
- Verse lookup
- Chapter lookup
- Language availability
- Compatible with bible-research.js
- Ready for future complete Bible text expansion

IMPORTANT:
This file does NOT invent missing Bible text.
Only text actually present in the database is returned.
More Bible text can be added later without changing
the Bible Research engine.
===========================================================
*/

(function () {

    "use strict";


    /* =====================================================
       DEFAULT BIBLE LANGUAGE
    ===================================================== */

    const DEFAULT_BIBLE_LANGUAGE = "en";


    /* =====================================================
       BIBLE LANGUAGE INFORMATION
    ===================================================== */

    const BIBLE_LANGUAGES = {

        en: {
            code: "en",
            name: "English",
            nativeName: "English",
            direction: "ltr",
            available: true
        },

        ur: {
            code: "ur",
            name: "Urdu",
            nativeName: "اردو",
            direction: "rtl",
            available: true
        },

        pa: {
            code: "pa",
            name: "Punjabi",
            nativeName: "پنجابی",
            direction: "rtl",
            available: false
        },

        ar: {
            code: "ar",
            name: "Arabic",
            nativeName: "العربية",
            direction: "rtl",
            available: false
        },

        he: {
            code: "he",
            name: "Hebrew",
            nativeName: "עברית",
            direction: "rtl",
            available: false
        },

        arc: {
            code: "arc",
            name: "Aramaic",
            nativeName: "ܐܪܡܝܐ",
            direction: "rtl",
            available: false
        },

        grc: {
            code: "grc",
            name: "Koine Greek",
            nativeName: "Ἑλληνική",
            direction: "ltr",
            available: false
        }

    };


    /* =====================================================
       ENGLISH KJV BIBLE DATA
       ===================================================== */

    const KJV_BIBLE = {

        old: {

            Genesis: {

                1: {

                    1: "In the beginning God created the heaven and the earth.",

                    2: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",

                    3: "And God said, Let there be light: and there was light.",

                    4: "And God saw the light, that it was good: and God divided the light from the darkness.",

                    5: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",

                    6: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.",

                    7: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.",

                    8: "And God called the firmament Heaven. And the evening and the morning were the second day.",

                    9: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.",

                    10: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.",

                    11: "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind.",

                    12: "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself.",

                    13: "And the evening and the morning were the third day.",

                    14: "And God said, Let there be lights in the firmament of the heaven to divide the day from the night.",

                    15: "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so.",

                    16: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.",

                    17: "And God set them in the firmament of the heaven to give light upon the earth.",

                    18: "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.",

                    19: "And the evening and the morning were the fourth day.",

                    20: "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven.",

                    21: "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly.",

                    22: "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas.",

                    23: "And the evening and the morning were the fifth day.",

                    24: "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth.",

                    25: "And God made the beast of the earth after his kind, and cattle after their kind.",

                    26: "And God said, Let us make man in our image, after our likeness.",

                    27: "So God created man in his own image, in the image of God created he him; male and female created he them.",

                    28: "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth.",

                    29: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth.",

                    30: "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth.",

                    31: "And God saw every thing that he had made, and, behold, it was very good."

                },


                2: {

                    1: "Thus the heavens and the earth were finished, and all the host of them.",

                    2: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.",

                    3: "And God blessed the seventh day, and sanctified it.",

                    4: "These are the generations of the heavens and of the earth when they were created.",

                    5: "And every plant of the field before it was in the earth, and every herb of the field before it grew.",

                    6: "But there went up a mist from the earth, and watered the whole face of the ground.",

                    7: "And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life.",

                    8: "And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.",

                    9: "And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food.",

                    10: "And a river went out of Eden to water the garden; and from thence it was parted, and became into four heads.",

                    11: "The name of the first is Pison: that is it which compasseth the whole land of Havilah.",

                    12: "And the gold of that land is good: there is bdellium and the onyx stone.",

                    13: "And the name of the second river is Gihon: the same is it that compasseth the whole land of Ethiopia.",

                    14: "And the name of the third river is Hiddekel: that is it which goeth toward the east of Assyria.",

                    15: "And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.",

                    16: "And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat.",

                    17: "But of the tree of the knowledge of good and evil, thou shalt not eat of it.",

                    18: "And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him.",

                    19: "And out of the ground the LORD God formed every beast of the field, and every fowl of the air.",

                    20: "And Adam gave names to all cattle, and to the fowl of the air, and to every beast of the field.",

                    21: "And the LORD God caused a deep sleep to fall upon Adam, and he slept.",

                    22: "And the rib, which the LORD God had taken from man, made he a woman, and brought her unto the man.",

                    23: "And Adam said, This is now bone of my bones, and flesh of my flesh.",

                    24: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",

                    25: "And they were both naked, the man and his wife, and were not ashamed."

                },


                3: {

                    1: "Now the serpent was more subtil than any beast of the field which the LORD God had made.",

                    2: "And the woman said unto the serpent, We may eat of the fruit of the trees of the garden.",

                    3: "But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it.",

                    4: "And the serpent said unto the woman, Ye shall not surely die.",

                    5: "For God doth know that in the day ye eat thereof, then your eyes shall be opened.",

                    6: "And when the woman saw that the tree was good for food, and that it was pleasant to the eyes.",

                    7: "And the eyes of them both were opened, and they knew that they were naked.",

                    8: "And they heard the voice of the LORD God walking in the garden in the cool of the day.",

                    9: "And the LORD God called unto Adam, and said unto him, Where art thou?",

                    10: "And he said, I heard thy voice in the garden, and I was afraid, because I was naked.",

                    11: "And he said, Who told thee that thou wast naked? Hast thou eaten of the tree?",

                    12: "And the man said, The woman whom thou gavest to be with me, she gave me of the tree, and I did eat.",

                    13: "And the LORD God said unto the woman, What is this that thou hast done?",

                    14: "And the LORD God said unto the serpent, Because thou hast done this, thou art cursed above all cattle.",

                    15: "And I will put enmity between thee and the woman, and between thy seed and her seed.",

                    16: "Unto the woman he said, I will greatly multiply thy sorrow and thy conception.",

                    17: "And unto Adam he said, Because thou hast hearkened unto the voice of thy wife.",

                    18: "Thorns also and thistles shall it bring forth to thee.",

                    19: "In the sweat of thy face shalt thou eat bread, till thou return unto the ground.",

                    20: "And Adam called his wife's name Eve; because she was the mother of all living.",

                    21: "Unto Adam also and to his wife did the LORD God make coats of skins, and clothed them.",

                    22: "And the LORD God said, Behold, the man is become as one of us, to know good and evil.",

                    23: "Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken.",

                    24: "So he drove out the man; and he placed at the east of the garden of Eden Cherubims."

                },


                4: {

                    1: "And Adam knew Eve his wife; and she conceived, and bare Cain.",

                    2: "And she again bare his brother Abel. And Abel was a keeper of sheep, but Cain was a tiller of the ground.",

                    3: "And in process of time it came to pass, that Cain brought of the fruit of the ground an offering unto the LORD.",

                    4: "And Abel, he also brought of the firstlings of his flock and of the fat thereof.",

                    5: "But unto Cain and to his offering he had not respect.",

                    6: "And the LORD said unto Cain, Why art thou wroth? and why is thy countenance fallen?",

                    7: "If thou doest well, shalt thou not be accepted?",

                    8: "And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.",

                    9: "And the LORD said unto Cain, Where is Abel thy brother?",

                    10: "And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground.",

                    11: "And now art thou cursed from the earth, which hath opened her mouth to receive thy brother's blood from thy hand.",

                    12: "When thou tillest the ground, it shall not henceforth yield unto thee her strength.",

                    13: "And Cain said unto the LORD, My punishment is greater than I can bear.",

                    14: "Behold, thou hast driven me out this day from the face of the earth.",

                    15: "And the LORD said unto him, Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold.",

                    16: "And Cain went out from the presence of the LORD, and dwelt in the land of Nod.",

                    17: "And Cain knew his wife; and she conceived, and bare Enoch.",

                    18: "And unto Enoch was born Irad: and Irad begat Mehujael.",

                    19: "And Lamech took unto him two wives.",

                    20: "And Adah bare Jabal: he was the father of such as dwell in tents.",

                    21: "And his brother's name was Jubal: he was the father of all such as handle the harp and organ.",

                    22: "And Zillah, she also bare Tubalcain, an instructor of every artificer in brass and iron.",

                    23: "And Lamech said unto his wives, Adah and Zillah, Hear my voice.",

                    24: "If Cain shall be avenged sevenfold, truly Lamech seventy and sevenfold.",

                    25: "And Adam knew his wife again; and she bare a son, and called his name Seth.",

                    26: "And to Seth, to him also there was born a son; and he called his name Enos."

                }

            }

        },


        /* =================================================
           NEW TESTAMENT
           ================================================= */

        new: {

            Mark: {

                3: {

                    6: "And the Pharisees went forth, and straightway took counsel with the Herodians against him, how they might destroy him.",

                    16: "And Simon he surnamed Peter;"

                }

            },


            Luke: {

                3: {

                    6: "And all flesh shall see the salvation of God.",

                    16: "John answered, saying unto them all, I indeed baptize you with water; but one mightier than I cometh, the latchet of whose shoes I am not worthy to unloose: he shall baptize you with the Holy Ghost and with fire:"

                }

            }

        }

    };


    /* =====================================================
       URDU BIBLE DATA
       ===================================================== */

    const URDU_BIBLE = {

        old: {},

        new: {

            Mark: {

                3: {

                    6: "اور فریسی فوراً باہر جا کر ہیرودیوں کے ساتھ اُس کے خلاف مشورہ کرنے لگے کہ اُسے کس طرح ہلاک کریں۔",

                    16: "اور اُس نے شمعون کا نام پطرس رکھا۔"

                }

            },


            Luke: {

                3: {

                    6: "اور ہر بشر خدا کی نجات دیکھے گا۔",

                    16: "یُوحنّا نے سب سے کہا کہ میں تو تمہیں پانی سے بپتسمہ دیتا ہوں، لیکن وہ جو مجھ سے زورآور ہے آنے والا ہے؛ میں اُس کی جوتی کا تسمہ کھولنے کے لائق نہیں۔ وہ تمہیں روح القدس اور آگ سے بپتسمہ دے گا۔"

                }

            }

        }

    };


    /* =====================================================
       EMPTY LANGUAGE DATABASES
       ===================================================== */

    const EMPTY_BIBLE = {

        old: {},

        new: {}

    };


    /* =====================================================
       CENTRAL MULTI-LANGUAGE DATABASE
       ===================================================== */

    const BIBLE_DATABASE = {

        en: KJV_BIBLE,

        ur: URDU_BIBLE,

        pa: {
            old: {},
            new: {}
        },

        ar: {
            old: {},
            new: {}
        },

        he: {
            old: {},
            new: {}
        },

        arc: {
            old: {},
            new: {}
        },

        grc: {
            old: {},
            new: {}
        }

    };


    /* =====================================================
       NORMALIZE LANGUAGE
       ===================================================== */

    function normalizeBibleLanguage(language) {

        if (!language) {

            return DEFAULT_BIBLE_LANGUAGE;

        }

        const value = String(language)
            .trim()
            .toLowerCase();

        if (BIBLE_LANGUAGES[value]) {

            return value;

        }

        return DEFAULT_BIBLE_LANGUAGE;

    }


    /* =====================================================
       GET BIBLE DATABASE
       ===================================================== */

    function getBibleDatabase(language) {

        const lang = normalizeBibleLanguage(language);

        if (
            BIBLE_DATABASE[lang] &&
            typeof BIBLE_DATABASE[lang] === "object"
        ) {

            return BIBLE_DATABASE[lang];

        }

        return EMPTY_BIBLE;

    }


    /* =====================================================
       GET LANGUAGE INFORMATION
       ===================================================== */

    function getBibleLanguageInfo(language) {

        const lang = normalizeBibleLanguage(language);

        if (BIBLE_LANGUAGES[lang]) {

            return BIBLE_LANGUAGES[lang];

        }

        return BIBLE_LANGUAGES[DEFAULT_BIBLE_LANGUAGE];

    }


    /* =====================================================
       CHECK LANGUAGE AVAILABILITY
       ===================================================== */

    function isBibleLanguageAvailable(language) {

        const lang = normalizeBibleLanguage(language);

        if (!BIBLE_LANGUAGES[lang]) {

            return false;

        }

        const database = BIBLE_DATABASE[lang];

        if (!database) {

            return false;

        }

        return Boolean(
            BIBLE_LANGUAGES[lang].available
        );

    }


    /* =====================================================
       CHECK WHETHER ACTUAL TEXT EXISTS
       ===================================================== */

    function hasBibleText(
        language,
        testament,
        book,
        chapter
    ) {

        const database = getBibleDatabase(language);

        if (!database) {

            return false;

        }

        if (!database[testament]) {

            return false;

        }

        if (!database[testament][book]) {

            return false;

        }

        if (!database[testament][book][chapter]) {

            return false;

        }

        const chapterData =
            database[testament][book][chapter];

        return (
            typeof chapterData === "object" &&
            Object.keys(chapterData).length > 0
        );

    }


    /* =====================================================
       GET ALL BIBLE LANGUAGES
       ===================================================== */

    function getAllBibleLanguages() {

        return Object.keys(BIBLE_LANGUAGES).map(
            function (code) {

                return {

                    code: code,

                    name:
                        BIBLE_LANGUAGES[code].name,

                    nativeName:
                        BIBLE_LANGUAGES[code].nativeName,

                    direction:
                        BIBLE_LANGUAGES[code].direction,

                    available:
                        BIBLE_LANGUAGES[code].available

                };

            }
        );

    }


    /* =====================================================
       GET SINGLE VERSE
       ===================================================== */

    function getBibleVerse(
        language,
        testament,
        book,
        chapter,
        verse
    ) {

        const database =
            getBibleDatabase(language);

        if (!database) {

            return null;

        }

        if (!database[testament]) {

            return null;

        }

        if (!database[testament][book]) {

            return null;

        }

        if (!database[testament][book][chapter]) {

            return null;

        }

        const chapterData =
            database[testament][book][chapter];

        const verseText =
            chapterData[verse];

        if (
            verseText === undefined ||
            verseText === null ||
            String(verseText).trim() === ""
        ) {

            return null;

        }

        return String(verseText);

    }


    /* =====================================================
       GET COMPLETE CHAPTER
       ===================================================== */

    function getBibleChapter(
        language,
        testament,
        book,
        chapter
    ) {

        const database =
            getBibleDatabase(language);

        if (!database) {

            return {};

        }

        if (!database[testament]) {

            return {};

        }

        if (!database[testament][book]) {

            return {};

        }

        if (!database[testament][book][chapter]) {

            return {};

        }

        return database[testament][book][chapter];

    }


    /* =====================================================
       GET AVAILABLE VERSES
       ===================================================== */

    function getBibleAvailableVerses(
        language,
        testament,
        book,
        chapter
    ) {

        const chapterData =
            getBibleChapter(
                language,
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

        return Object.keys(chapterData)

            .filter(
                function (verse) {

                    return (
                        chapterData[verse] !== null &&
                        chapterData[verse] !== undefined &&
                        String(
                            chapterData[verse]
                        ).trim() !== ""
                    );

                }
            )

            .sort(
                function (a, b) {

                    return Number(a) - Number(b);

                }
            );

    }


    /* =====================================================
       GET LANGUAGE DIRECTION
       ===================================================== */

    function getBibleLanguageDirection(language) {

        const info =
            getBibleLanguageInfo(language);

        return info.direction || "ltr";

    }


    /* =====================================================
       GET LANGUAGE NAME
       ===================================================== */

    function getBibleLanguageName(language) {

        const info =
            getBibleLanguageInfo(language);

        return (
            info.nativeName ||
            info.name ||
            language
        );

    }


    /* =====================================================
       GLOBAL EXPORTS
       ===================================================== */

    window.DEFAULT_BIBLE_LANGUAGE =
        DEFAULT_BIBLE_LANGUAGE;

    window.BIBLE_LANGUAGES =
        BIBLE_LANGUAGES;

    window.KJV_BIBLE =
        KJV_BIBLE;

    window.BIBLE_DATABASE =
        BIBLE_DATABASE;

    window.getBibleDatabase =
        getBibleDatabase;

    window.getBibleLanguageInfo =
        getBibleLanguageInfo;

    window.isBibleLanguageAvailable =
        isBibleLanguageAvailable;

    window.getAllBibleLanguages =
        getAllBibleLanguages;

    window.getBibleVerse =
        getBibleVerse;

    window.getBibleChapter =
        getBibleChapter;

    window.getBibleAvailableVerses =
        getBibleAvailableVerses;

    window.normalizeBibleLanguage =
        normalizeBibleLanguage;

    window.hasBibleText =
        hasBibleText;

    window.getBibleLanguageDirection =
        getBibleLanguageDirection;

    window.getBibleLanguageName =
        getBibleLanguageName;


    /* =====================================================
       SYSTEM READY FLAG
       ===================================================== */

    window.bibleDataSystemReady = true;


    /* =====================================================
       READY EVENT
       ===================================================== */

    if (
        typeof document !== "undefined" &&
        typeof CustomEvent !== "undefined"
    ) {

        document.dispatchEvent(
            new CustomEvent(
                "bibleDataSystemReady"
            )
        );

    }


})();
