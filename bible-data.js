/* =====================================================
   KINGDOM LIGHT NETWORK
   LOCAL BIBLE DATA
   MULTILINGUAL BIBLE DATABASE
===================================================== */


/* =====================================================
   1. ENGLISH — INTERNATIONAL ENGLISH / KJV
===================================================== */

const KJV_BIBLE = {

    old: {

        /* Old Testament will be added here */

    },

    new: {

        Mark: {

            3: {

                6:
                    "And the Pharisees went forth, and straightway took counsel with the Herodians against him, how they might destroy him.",

                16:
                    "And Simon he surnamed Peter."

            }

        },

        Luke: {

            3: {

                6:
                    "And all flesh shall see the salvation of God.",

                16:
                    "John answered, saying unto them all, I indeed baptize you with water; but one mightier than I cometh, the latchet of whose shoes I am not worthy to unloose: he shall baptize you with the Holy Ghost and with fire."

            }

        }

    }

};


/* =====================================================
   2. URDU BIBLE
===================================================== */

const URDU_BIBLE = {

    old: {

        /* Old Testament will be added here */

    },

    new: {

        Mark: {

            3: {

                6:
                    "اور فریسی فوراً باہر جا کر ہیرودیوں کے ساتھ اُس کے خلاف مشورہ کرنے لگے کہ اُسے کس طرح ہلاک کریں۔",

                16:
                    "اور اُس نے شمعون کا نام پطرس رکھا۔"

            }

        },

        Luke: {

            3: {

                6:
                    "اور ہر بشر خدا کی نجات دیکھے گا۔",

                16:
                    "یُوحنّا نے سب سے کہا کہ میں تو تمہیں پانی سے بپتسمہ دیتا ہوں، لیکن وہ جو مجھ سے زورآور ہے آنے والا ہے؛ میں اُس کی جوتی کا تسمہ کھولنے کے لائق نہیں۔ وہ تمہیں روح القدس اور آگ سے بپتسمہ دے گا۔"

            }

        }

    }

};


/* =====================================================
   3. PAKISTANI PUNJABI BIBLE
===================================================== */

const PUNJABI_BIBLE = {

    old: {

        /* Old Testament will be added here */

    },

    new: {

        Mark: {

            3: {

                6:
                    "تے فریسی باہر جا کے فوراً ہیرودییاں نال اوہدے خلاف صلاح کرنے لگ پئے کہ اوہنوں کس طرح ہلاک کرن۔",

                16:
                    "تے اوہنے شمعون دا ناں پطرس رکھیا۔"

            }

        },

        Luke: {

            3: {

                6:
                    "تے ہر بشر خدا دی نجات ویکھے گا۔",

                16:
                    "یوحنا نے سبھناں نوں آکھیا، میں تاں تہانوں پانی نال بپتسمہ دیندا ہاں، پر میرے توں زیادہ زورآور آون والا اے؛ میں اوہدے جوتے دا تسمہ کھولن دے لائق نہیں۔ اوہ تہانوں روح القدس تے اگ نال بپتسمہ دےوے گا۔"

            }

        }

    }

};


/* =====================================================
   4. ARABIC BIBLE
===================================================== */

const ARABIC_BIBLE = {

    old: {

        /* Old Testament will be added here */

    },

    new: {

        Mark: {

            3: {

                6:
                    "فخرج الفريسيون للوقت مع الهيرودسيين وتشاوروا عليه لكي يهلكوه.",

                16:
                    "وجعل لسمعان اسم بطرس."

            }

        },

        Luke: {

            3: {

                6:
                    "ويرى كل بشر خلاص الله.",

                16:
                    "أجاب يوحنا وقال للجميع: أنا أعمدكم بماء، ولكن يأتي من هو أقوى مني، الذي لست مستحقاً أن أحل سيور حذائه. هو سيعمدكم بالروح القدس وبالنار."

            }

        }

    }

};


/* =====================================================
   5. HEBREW — ORIGINAL OLD TESTAMENT
===================================================== */

const HEBREW_BIBLE = {

    old: {

        /* Hebrew Old Testament will be added here */

    },

    new: {

        /* New Testament is not originally Hebrew */

    }

};


/* =====================================================
   6. ARAMAIC — ORIGINAL ARAMAIC PORTIONS
===================================================== */

const ARAMAIC_BIBLE = {

    old: {

        /* Aramaic portions of the Old Testament */

    },

    new: {

        /* Original Aramaic data will be added where applicable */

    }

};


/* =====================================================
   7. KOINE GREEK — ORIGINAL NEW TESTAMENT
===================================================== */

const GREEK_BIBLE = {

    old: {

        /* Old Testament source structure */

    },

    new: {

        /* Koine Greek New Testament will be added here */

    }

};


/* =====================================================
   LANGUAGE INFORMATION
===================================================== */

const BIBLE_LANGUAGES = {

    en: {

        name: "International English",

        nativeName: "English",

        type: "translation",

        direction: "ltr"

    },

    ur: {

        name: "Urdu",

        nativeName: "اردو",

        type: "translation",

        direction: "rtl"

    },

    pa: {

        name: "Pakistani Punjabi",

        nativeName: "پنجابی",

        type: "translation",

        direction: "rtl"

    },

    ar: {

        name: "Arabic",

        nativeName: "العربية",

        type: "translation",

        direction: "rtl"

    },

    he: {

        name: "Biblical Hebrew",

        nativeName: "עברית",

        type: "original",

        direction: "rtl"

    },

    arc: {

        name: "Biblical Aramaic",

        nativeName: "ארמית",

        type: "original",

        direction: "rtl"

    },

    grc: {

        name: "Koine Greek",

        nativeName: "Ἑλληνική",

        type: "original",

        direction: "ltr"

    }

};


/* =====================================================
   MULTILINGUAL BIBLE DATABASE
===================================================== */

const BIBLE_DATABASE = {

    en: KJV_BIBLE,

    ur: URDU_BIBLE,

    pa: PUNJABI_BIBLE,

    ar: ARABIC_BIBLE,

    he: HEBREW_BIBLE,

    arc: ARAMAIC_BIBLE,

    grc: GREEK_BIBLE

};


/* =====================================================
   DEFAULT BIBLE LANGUAGE
===================================================== */

const DEFAULT_BIBLE_LANGUAGE = "en";


/* =====================================================
   GET BIBLE DATABASE BY LANGUAGE
===================================================== */

function getBibleDatabase(language) {

    if (
        BIBLE_DATABASE[language]
    ) {

        return BIBLE_DATABASE[language];

    }

    return BIBLE_DATABASE[
        DEFAULT_BIBLE_LANGUAGE
    ];

}


/* =====================================================
   GET BIBLE VERSE
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

    if (
        !database ||
        !database[testament] ||
        !database[testament][book] ||
        !database[testament][book][chapter] ||
        !database[testament][book][chapter][verse]
    ) {

        return null;

    }

    return database[
        testament
    ][
        book
    ][
        chapter
    ][
        verse
    ];

}


/* =====================================================
   GET LANGUAGE INFORMATION
===================================================== */

function getBibleLanguageInfo(language) {

    if (
        BIBLE_LANGUAGES[language]
    ) {

        return BIBLE_LANGUAGES[language];

    }

    return BIBLE_LANGUAGES[
        DEFAULT_BIBLE_LANGUAGE
    ];

}


/* =====================================================
   BIBLE DATA SYSTEM READY
===================================================== */

console.log(
    "Kingdom Light Network Multilingual Bible Database loaded successfully."
);

console.log(
    "Available Bible languages:",
    Object.keys(BIBLE_LANGUAGES)
);
