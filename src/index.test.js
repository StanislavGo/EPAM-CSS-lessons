const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');

const { JSDOM } = require('jsdom');

describe('CSS Flexbox', () => {
    let htmlString;

    let dom;
    let document;

    beforeEach(async () => {
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);

        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;

        const linksCSS = document.querySelectorAll('link[rel="stylesheet"]');
        for (let linkCSS of linksCSS) {
            const initialHref = linkCSS.getAttribute('href');
            const linkAbsolutePath = path.join(__dirname, initialHref);
            linkCSS.setAttribute('href', `file:///${linkAbsolutePath}`);
        }
    });

    it('html page should be valid', () => {
        const htmlvalidate = new HtmlValidate();
        const report = htmlvalidate.validateString(htmlString, htmlValidateConfig);
        
        expect(report).toEqual(expect.objectContaining({ valid: true }));
    });

    describe('Fix invalid Flexbox properties', () => {
        it('should fix flex-grow property in .card-fifth selector', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.card-fifth', document.styleSheets);
            expect(JSON.parse(styleDeclaration["flex-grow"])).toBe(4);
        });

        it('should fix flex-grow property in .card-six selector', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.card-six', document.styleSheets);
            expect(JSON.parse(styleDeclaration["flex-grow"])).toBe(4);
        });

        it('should fix display property in .header_line selector', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.header_line', document.styleSheets);
            expect(styleDeclaration["display"]).toBe("flex");
        });

        it('should fix align-items property in .header_line selector', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.header_line', document.styleSheets);
            expect(styleDeclaration["align-items"]).toBe("center");
        });

        it('should fix justify-content property in .title_section selector', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.title_section', document.styleSheets);
            expect(styleDeclaration["justify-content"]).toBe("center");
        });
    });

    describe('Add proper CSS rules to required html elements', () => {
        it('should add "display" property to nav ul', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('nav ul', document.styleSheets);
            expect(["flex", "inline-flex"].includes(styleDeclaration["display"])).toBe(true);
        });

        it('should add "flex-direction" property to .title_section', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.title_section', document.styleSheets);
            expect(styleDeclaration["flex-direction"]).toBe("row-reverse");
        });

        it('should make divs in Clientd section flexible', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('main section div', document.styleSheets);
            expect(styleDeclaration["display"]).toBe("flex");
        });

        it('should apply flex-grow to .column', async () => {
            await waitBrowserLoadEvent(document);
            const commonStyleDeclaration = getStyleDeclarationForSelector('.column', document.styleSheets);
            const specialStyleDeclaration = getStyleDeclarationForSelector('section:first-of-type div:first-of-type .column:first-of-type', document.styleSheets);
            expect(commonStyleDeclaration["flex-grow"]).toBe("1");
            expect(specialStyleDeclaration["flex-grow"]).toBe("2");
        });

        it('should fix order for .card selectors', async () => {
            await waitBrowserLoadEvent(document);
            const firstColStyleDeclaration = getStyleDeclarationForSelector('.card-first', document.styleSheets);
            const secondColStyleDeclaration = getStyleDeclarationForSelector('.card-second', document.styleSheets);
            const thirdColStyleDeclaration = getStyleDeclarationForSelector('.card-third', document.styleSheets);
            const fourthColStyleDeclaration = getStyleDeclarationForSelector('.card-fouth', document.styleSheets);
            const fifthColStyleDeclaration = getStyleDeclarationForSelector('.card-fifth', document.styleSheets);
            const sixColStyleDeclaration = getStyleDeclarationForSelector('.card-six', document.styleSheets);

            expect(firstColStyleDeclaration["order"]).toBe("1");
            expect(secondColStyleDeclaration["order"]).toBe("2");
            expect(thirdColStyleDeclaration["order"]).toBe("3");
            expect(fourthColStyleDeclaration["order"]).toBe("4");
            expect(fifthColStyleDeclaration["order"]).toBe("5");
            expect(sixColStyleDeclaration["order"]).toBe("6");
        });

        it('should fix size of .card selectors', async () => {
            await waitBrowserLoadEvent(document);
            const firstColStyleDeclaration = getStyleDeclarationForSelector('.card-first', document.styleSheets);
            const secondColStyleDeclaration = getStyleDeclarationForSelector('.card-second', document.styleSheets);
            const thirdColStyleDeclaration = getStyleDeclarationForSelector('.card-third', document.styleSheets);
            const fourthColStyleDeclaration = getStyleDeclarationForSelector('.card-fouth', document.styleSheets);

            expect(firstColStyleDeclaration["flex-grow"]).toBe("1");
            expect(secondColStyleDeclaration["flex-grow"]).toBe("1");
            expect(thirdColStyleDeclaration["flex-grow"]).toBe("1");
            expect(fourthColStyleDeclaration["flex-grow"]).toBe("1");
        });

        it('should implement styles for footer', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('footer', document.styleSheets);
            expect(styleDeclaration["display"]).toBe("flex");
            expect(styleDeclaration["justify-content"]).toBe("space-between");
            expect(["end", "flex-end"].includes(styleDeclaration["align-items"])).toBe(true);
        });
    });

    describe('Make it responsive', () => {
        it("should make the flex items in menu always stay on one line", async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('nav ul', document.styleSheets);
            expect(styleDeclaration["flex-wrap"]).toBe("nowrap");
        });

        it("should make .title_section to wrap in 2 rows for small screens", async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.title_section', document.styleSheets);
            expect(styleDeclaration["flex-wrap"]).toBe("wrap");
        });
    });
});
