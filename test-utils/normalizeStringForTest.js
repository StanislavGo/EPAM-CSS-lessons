// Trims and and converts to lower case the string

function normalizeStringForTest(str) {
    if (!str || !str.trim || !str.toLowerCase) {
        return '';
    }

    const trimmedStr = str.trim();
    const lowerCased = trimmedStr.toLowerCase();

    return lowerCased;
}

module.exports = { normalizeStringForTest };
