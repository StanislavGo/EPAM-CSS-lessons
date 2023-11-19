function getMediaQueryInnerStylesForMinWidth(cssString, minWidth) {
    const allMediaQueriesStrings = getAllMediaQueriesStrings(cssString);
    
    const regExpQueryForScreenMinWidth = new RegExp(`@media +screen +and +\\( *min-width: *${minWidth}px *\\)`, 'gi');
    const regExpQueryForMinWidthScreen = new RegExp(`@media +\\( *min-width: *${minWidth}px +and +screen *\\)`, 'gi');
    
    const mediaQueryForThisMinWidth = allMediaQueriesStrings.find((itemString) => {
        return regExpQueryForScreenMinWidth.test(itemString) || regExpQueryForMinWidthScreen.test(itemString);
    });
    
    return getMediaQueryInner(mediaQueryForThisMinWidth);
};

function getAllMediaQueriesStrings(cssString) {
    const allMediaQueriesRegExp = /@media[^{]+\{[\s\S]+?}\s*}/gi;
    
    return cssString.match(allMediaQueriesRegExp);
}

function getMediaQueryInner(mediaQueryCssString) {
    if (typeof mediaQueryCssString !== 'string') {
        return null;
    }

    const mediaQueryWithInnerRegExp = /@media[^{]+\{([\s\S]+?})\s*}/i;
    const mediaQueryInner = mediaQueryCssString.match(mediaQueryWithInnerRegExp);

    return mediaQueryInner ? mediaQueryInner[1] : '';
}

module.exports = {
    getMediaQueryInnerStylesForMinWidth,
    getAllMediaQueriesStrings,
    getMediaQueryInner,
};
