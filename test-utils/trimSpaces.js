function trimSpaces(string) {
    if (!string || !string.trim) {
        return '';
    }

    return string.trim().replace(/ /g, '');
}

module.exports = { trimSpaces }; 
