function upperFirstLetterOfWords(string) {
    return string.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function convertToMySQLDate(date) {
    if (date != null && date.includes("/")) {
        const parts = date.split('/');
        return parts[2] + "-" + parts[1] + "-" + parts[0];
    } else {
        return null;
    }
}

function convertFromMySQLDate(date) {
    if (date != null)
        return date.toLocaleDateString();
    else
        return null;
}

module.exports = {
    upperFirstLetterOfWords,
    convertToMySQLDate,
    convertFromMySQLDate
}