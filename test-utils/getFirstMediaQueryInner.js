function getFirstMediaQueryInner(cssString) {
    const mediaQueryWithInnerRegExp = /@media[^{]+\{([\s\S]+?})\s*}/i;

    let mediaQueryResults = cssString.match(mediaQueryWithInnerRegExp);

    return mediaQueryResults ? mediaQueryResults[1] : '';
};

module.exports = { getFirstMediaQueryInner };
