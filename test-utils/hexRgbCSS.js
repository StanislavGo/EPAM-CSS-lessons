const hexRgb = require('../test-utils/hex-rgb');

function hexRgbCSS(color) {
    return hexRgb(color, { format: 'css' });
}

module.exports = {
    hexRgbCSS,
};
