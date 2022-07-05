function upperFirstLetterOfWords(string) {
    return string.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function convertMySQLDate(date) {
    if (date != null && date.includes("-")) {
        const parts = date.split('-');
        return parts[2] + "/" + parts[1] + "/" + parts[0];
    } else if (date != null && date.includes("/")) {
        const parts = date.split('/');
        return parts[2] + "-" + parts[1] + "-" + parts[0];
    } else {
        return null;
    }
}

module.exports = {
    upperFirstLetterOfWords,
    convertMySQLDate
}