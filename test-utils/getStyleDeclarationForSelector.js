function getStyleDeclarationForSelector(selector, styleSheets) {
    if (!selector || !styleSheets || styleSheets.length === 0) {
        throw new Error('[getStyleDeclarationForSelector]: you should provide selector and styleSheets')
    }

    let cssRules = [];

    for (let styleSheet of styleSheets) {
        cssRules = [...cssRules, ...styleSheet.cssRules];
    }

    const cssStyleRule = cssRules.reduce((resultStyleRule, styleRule) => {
        if (styleRule.selectorText === selector) {
            return styleRule;
        }

        return resultStyleRule;
    }, null);

    return cssStyleRule ? cssStyleRule.style : null;
}

module.exports = { getStyleDeclarationForSelector };
