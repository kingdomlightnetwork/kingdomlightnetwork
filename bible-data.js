/* =========================================================
   KINGDOM LIGHT NETWORK
   BIBLE DATA
   English + Urdu Bible
   ========================================================= */


/* =========================================================
   BIBLE LANGUAGES
   ========================================================= */

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
        nativeName: "עִבְרִית",
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
        nativeName: "Κοινὴ Ἑλληνική",
        direction: "ltr",
        available: false
    }

};


/* =========================================================
   ENGLISH BIBLE
   ========================================================= */

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

                16: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night.",

                17: "And God set them in the firmament of the heaven to give light upon the earth.",

                18: "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.",

                19: "And the evening and the morning were the fourth day.",

                20: "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth.",

                21: "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly after their kind.",

                22: "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas.",

                23: "And the evening and the morning were the fifth day.",

                24: "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind.",

                25: "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind.",

                26: "And God said, Let us make man in our image, after our likeness.",

                27: "So God created man in his own image, in the image of God created he him; male and female created he them.",

                28: "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it.",

                29: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth.",

                30: "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth.",

                31: "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day."
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

                11: "The name of the first is Pison.",

                12: "And the gold of that land is good.",

                13: "And the name of the second river is Gihon.",

                14: "And the name of the third river is Hiddekel.",

                15: "And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.",

                16: "And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat.",

                17: "But of the tree of the knowledge of good and evil, thou shalt not eat of it.",

                18: "And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him.",

                19: "And out of the ground the LORD God formed every beast of the field, and every fowl of the air.",

                20: "And Adam gave names to all cattle, and to the fowl of the air, and to every beast of the field.",

                21: "And the LORD God caused a deep sleep to fall upon Adam, and he slept.",

                22: "And the rib, which the LORD God had taken from man, made he a woman, and brought her unto the man.",

                23: "And Adam said, This is now bone of my bones, and flesh of my flesh.",

                24: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife.",

                25: "And they were both naked, the man and his wife, and were not ashamed."
            }

        }

    },


    new: {

        Mark: {

            3: {

                6: "And the Pharisees went forth, and straightway took counsel with the Herodians against him, how they might destroy him.",

                16: "And Simon he surnamed Peter."
            }

        },

        Luke: {

            3: {

                6: "And all flesh shall see the salvation of God.",

                16: "John answered, saying unto them all, I indeed baptize you with water; but one mightier than I cometh."
            }

        }

    }

};


/* =========================================================
   URDU BIBLE
   ========================================================= */

const URDU_BIBLE = {

    old: {

        Genesis: {

            /*
             * اردو بائبل کا ڈیٹا یہاں رکھا جائے گا۔
             * فی الحال ہم باب بہ باب ڈیٹا شامل کریں گے۔
             */

        }

    },


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


/* =========================================================
   BIBLE DATA HELPERS
   ========================================================= */

function getBibleDatabase(languageCode) {

    if (languageCode === "ur") {
        return URDU_BIBLE;
    }

    return KJV_BIBLE;
}


/* =========================================================
   GET VERSE
   ========================================================= */

function getBibleVerse(testament, book, chapter, verse, languageCode = "en") {

    const database = getBibleDatabase(languageCode);

    if (
        database &&
        database[testament] &&
        database[testament][book] &&
        database[testament][book][chapter] &&
        database[testament][book][chapter][verse]
    ) {

        return database[testament][book][chapter][verse];

    }

    return null;
}


/* =========================================================
   GET CHAPTER
   ========================================================= */

function getBibleChapter(testament, book, chapter, languageCode = "en") {

    const database = getBibleDatabase(languageCode);

    if (
        database &&
        database[testament] &&
        database[testament][book] &&
        database[testament][book][chapter]
    ) {

        return database[testament][book][chapter];

    }

    return null;
}


/* =========================================================
   CHECK LANGUAGE AVAILABILITY
   ========================================================= */

function isBibleLanguageAvailable(languageCode) {

    return (
        BIBLE_LANGUAGES[languageCode] &&
        BIBLE_LANGUAGES[languageCode].available === true
    );

}


/* =========================================================
   GET LANGUAGE DIRECTION
   ========================================================= */

function getBibleLanguageDirection(languageCode) {

    if (
        BIBLE_LANGUAGES[languageCode] &&
        BIBLE_LANGUAGES[languageCode].direction
    ) {

        return BIBLE_LANGUAGES[languageCode].direction;

    }

    return "ltr";
}


/* =========================================================
   EXPORT GLOBAL DATA
   ========================================================= */

window.BIBLE_LANGUAGES = BIBLE_LANGUAGES;
window.KJV_BIBLE = KJV_BIBLE;
window.URDU_BIBLE = URDU_BIBLE;

window.getBibleDatabase = getBibleDatabase;
window.getBibleVerse = getBibleVerse;
window.getBibleChapter = getBibleChapter;
window.isBibleLanguageAvailable = isBibleLanguageAvailable;
window.getBibleLanguageDirection = getBibleLanguageDirection;
