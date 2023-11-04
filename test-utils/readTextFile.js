const { readFile } = require('fs/promises');

async function readTextFile(filePath, options = { encoding: 'utf8' }) {
    const fileString = await readFile(filePath, options);

    return fileString;
}

module.exports = { readTextFile };
