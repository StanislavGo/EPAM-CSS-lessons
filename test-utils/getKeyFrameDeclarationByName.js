function getKeyFrameDeclarationByName(name, point, styleSheets) {
    if (!name || !styleSheets || styleSheets.length === 0) {
        throw new Error('[getKeyFrameDeclarationByName]: you should provide selector and styleSheets')
    }

    let cssRules = [];

    for (let styleSheet of styleSheets) {
        cssRules = [...cssRules, ...styleSheet.cssRules];
    }

    const keyFrame = cssRules.find(styleRule => styleRule.name === name).cssRules;

    const keyFrameValues = keyFrame.reduce((resultStyleRule, styleRule) => {
        if (styleRule.keyText === point) {
            return styleRule.style;        
        }

        return resultStyleRule;
    }, null);
    
    delete keyFrameValues.parentRule;
    return keyFrameValues ? keyFrameValues : null;
}

module.exports = { getKeyFrameDeclarationByName };
