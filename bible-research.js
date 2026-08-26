// =================================================
// RENDER VERSE
// VERSE + AUDIO + ZOOM
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


    // =================================================
    // VERSE RESULT
    // =================================================

    result.innerHTML = `

        <div
            class="bible-reading-content"
            dir="${direction}"
        >

            <h2>
                ${title}
            </h2>

            <h3>
                ${data.book}
                ${data.chapter}:${data.verse}
            </h3>


            <!-- =================================
                 VERSE CONTROL BAR
            ================================== -->

            <div
                class="bible-control-bar"
            >

                <!-- AUDIO -->

                <button
                    type="button"
                    id="verseAudioButton"
                >
                    🔊 Listen
                </button>


                <!-- ZOOM -->

                <div
                    class="bible-zoom-controls"
                >

                    <span>
                        Text:
                    </span>

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

                    <button
                        type="button"
                        id="verseZoomLargeButton"
                    >
                        A++
                    </button>

                </div>

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


    // =================================================
    // VERSE AUDIO
    // =================================================

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


    // =================================================
    // VERSE ZOOM
    // =================================================

    const verseText =
        document.getElementById(
            "verseText"
        );


    const zoomOut =
        document.getElementById(
            "verseZoomOutButton"
        );


    const zoomReset =
        document.getElementById(
            "verseZoomResetButton"
        );


    const zoomIn =
        document.getElementById(
            "verseZoomInButton"
        );


    const zoomLarge =
        document.getElementById(
            "verseZoomLargeButton"
        );


    // Default font size

    let fontSize = 20;


    // =================================================
    // APPLY VERSE ZOOM
    // =================================================

    function applyVerseZoom() {

        if (verseText) {

            verseText.style.fontSize =
                fontSize + "px";

        }

    }


    // =================================================
    // ZOOM OUT
    // =================================================

    if (zoomOut) {

        zoomOut.addEventListener(
            "click",
            function () {

                fontSize =
                    Math.max(
                        14,
                        fontSize - 2
                    );

                applyVerseZoom();

            }
        );

    }


    // =================================================
    // ZOOM RESET
    // =================================================

    if (zoomReset) {

        zoomReset.addEventListener(
            "click",
            function () {

                fontSize = 20;

                applyVerseZoom();

            }
        );

    }


    // =================================================
    // ZOOM IN
    // =================================================

    if (zoomIn) {

        zoomIn.addEventListener(
            "click",
            function () {

                fontSize =
                    Math.min(
                        34,
                        fontSize + 2
                    );

                applyVerseZoom();

            }
        );

    }


    // =================================================
    // LARGE ZOOM
    // =================================================

    if (zoomLarge) {

        zoomLarge.addEventListener(
            "click",
            function () {

                fontSize = 38;

                applyVerseZoom();

            }
        );

    }


    // =================================================
    // INITIAL ZOOM
    // =================================================

    applyVerseZoom();


    // =================================================
    // SCROLL TO RESULT
    // =================================================

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}
