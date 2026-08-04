function changeLanguage(lang) {

    localStorage.setItem("language", lang);

    alert("Language changed to: " + lang);

}

window.onload = function () {

    let savedLanguage = localStorage.getItem("language");

    if (!savedLanguage) {

        localStorage.setItem("language", "en");

    }

};
