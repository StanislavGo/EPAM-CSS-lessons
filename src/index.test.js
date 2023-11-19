const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');

const { JSDOM } = require('jsdom');

describe('CSS Grid', () => {
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

    describe('Page sceleton', () => {
        it('should add "grid-template-columns" property to body', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('body', document.styleSheets);
            expect(styleDeclaration["grid-template-columns"]).toBe('repeat(12, 1fr)');
        });

        it('should add "grid-template-rows" property to body', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('body', document.styleSheets);
            expect(styleDeclaration["grid-template-rows"]).toBe('repeat(12, auto)');
        });

        it('should add "grid-area`" property to header', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('header', document.styleSheets);
            expect(styleDeclaration["grid-area"]).toBe('header');
        });

        it('should add "grid-area`" property to footer', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('footer', document.styleSheets);
            expect(styleDeclaration["grid-area"]).toBe('footer');
        });

        it('should add "grid-area`" property to main', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('main', document.styleSheets);
            expect(styleDeclaration["grid-area"]).toBe('main');
        });

        it('should add "grid-area`" property to sidebar', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('aside', document.styleSheets);
            expect(styleDeclaration["grid-area"]).toBe('sidebar');
        });

        it('should add "grid-template-areas" property to body', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('body', document.styleSheets);
            expect(styleDeclaration["grid-template-areas"]).toMatchInlineSnapshot(`undefined`);
        });
    });

    describe('"Client Stories" section', () => {
        it('should make `div` in `.client_stories` to display as a 3-columns grid', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.client_stories > div', document.styleSheets);
            expect(styleDeclaration["display"]).toBe('grid');
            expect(styleDeclaration["grid-template-columns"]).toBe('repeat(3, 320px)');
        });

        it('should place first grid item properly', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.client_stories .column:first-of-type', document.styleSheets);
            expect(styleDeclaration["grid-column-start"]).toBe('1');
            expect(styleDeclaration["grid-column-end"]).toBe('3');
            expect(styleDeclaration["grid-row-start"]).toBe('1')
            expect(styleDeclaration["grid-row-end"]).toBe('3');
        });

        it('should add gap between grid rows', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.client_stories > div', document.styleSheets);
            const gap = styleDeclaration["grid-gap"] || styleDeclaration["gap"];
            expect(gap).toBe('calc(var(--space-size)*2) 0');
        });

        it('should align grid items to reduce extra space at the right', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.client_stories > div', document.styleSheets);
            expect(styleDeclaration["justify-content"]).toBe('space-between');
        });
    });

    describe('"Features" section', () => {
        it('should display "div" in Features section to display grid', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.features > div', document.styleSheets);
            expect(styleDeclaration["display"]).toBe('grid');
        });

        it('should create 3 columns in grid container and size them properly', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.features > div', document.styleSheets);
            expect(styleDeclaration["grid-template-columns"]).toBe('repeat(3, 1fr)');
        });

        it('should order grid items properly', async () => {
            await waitBrowserLoadEvent(document);
            const firstColStyleDeclaration = getStyleDeclarationForSelector('.card-first', document.styleSheets);
            const secondColStyleDeclaration = getStyleDeclarationForSelector('.card-second', document.styleSheets);
            const thirdColStyleDeclaration = getStyleDeclarationForSelector('.card-third', document.styleSheets);
            const fourthColStyleDeclaration = getStyleDeclarationForSelector('.card-fourth', document.styleSheets);
            const fifthColStyleDeclaration = getStyleDeclarationForSelector('.card-fifth', document.styleSheets);
            const sixColStyleDeclaration = getStyleDeclarationForSelector('.card-six', document.styleSheets);

            expect(firstColStyleDeclaration["order"]).toBe("1");
            expect(secondColStyleDeclaration["order"]).toBe("2");
            expect(thirdColStyleDeclaration["order"]).toBe("3");
            expect(fourthColStyleDeclaration["order"]).toBe("4");
            expect(fifthColStyleDeclaration["order"]).toBe("5");
            expect(sixColStyleDeclaration["order"]).toBe("6");
        });

        it('should place grid items properly', async () => {
            await waitBrowserLoadEvent(document);
            const firstColStyleDeclaration = getStyleDeclarationForSelector('.card-first', document.styleSheets);
            const secondColStyleDeclaration = getStyleDeclarationForSelector('.card-second', document.styleSheets);
            const thirdColStyleDeclaration = getStyleDeclarationForSelector('.card-third', document.styleSheets);
            const fourthColStyleDeclaration = getStyleDeclarationForSelector('.card-fourth', document.styleSheets);
            const fifthColStyleDeclaration = getStyleDeclarationForSelector('.card-fifth', document.styleSheets);
            const sixColStyleDeclaration = getStyleDeclarationForSelector('.card-six', document.styleSheets);

            expect(firstColStyleDeclaration["grid-row-start"]).toBe("1");
            expect(firstColStyleDeclaration["grid-row-end"]).toBe("3");
            expect(firstColStyleDeclaration["grid-column-start"]).toBe("1");
            expect(firstColStyleDeclaration["grid-column-end"]).toBe("2");

            expect(secondColStyleDeclaration["grid-row-start"]).toBe("1");
            expect(secondColStyleDeclaration["grid-row-end"]).toBe("2");
            expect(secondColStyleDeclaration["grid-column-start"]).toBe("2");
            expect(secondColStyleDeclaration["grid-column-end"]).toBe("3");

            expect(thirdColStyleDeclaration["grid-row-start"]).toBe("1");
            expect(thirdColStyleDeclaration["grid-row-end"]).toBe("2");
            expect(thirdColStyleDeclaration["grid-column-start"]).toBe("3");
            expect(thirdColStyleDeclaration["grid-column-end"]).toBe("4");

            expect(fourthColStyleDeclaration["grid-column-start"]).toBe("2");
            expect(fourthColStyleDeclaration["grid-column-end"]).toBe("4");
            expect(fourthColStyleDeclaration["grid-row-start"]).toBe("2");
            expect(fourthColStyleDeclaration["grid-row-end"]).toBe("3");

            expect(fifthColStyleDeclaration["grid-column-start"]).toBe("1");
            expect(fifthColStyleDeclaration["grid-column-end"]).toBe("4");
            expect(fifthColStyleDeclaration["grid-row-start"]).toBe("3");
            expect(fifthColStyleDeclaration["grid-row-end"]).toBe("4");

            expect(sixColStyleDeclaration["grid-column-start"]).toBe("1");
            expect(sixColStyleDeclaration["grid-column-end"]).toBe("4");
            expect(sixColStyleDeclaration["grid-row-start"]).toBe("4");
            expect(sixColStyleDeclaration["grid-row-end"]).toBe("5");
        });
    });

    describe("Sidebar", () => {
        it('should align items in sidebar properly', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('aside', document.styleSheets);
            expect(styleDeclaration["align-content"]).toBe('space-between');
        });
    });

    describe("Grid and Flexbox layout combination", () => {
        it('should make first grid item of Client Stories section flexible', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.client_stories .column:first-of-type', document.styleSheets);
            expect(styleDeclaration["display"]).toBe('flex');
        });

        it('should align content in created flex container', async () => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.client_stories .column:first-of-type', document.styleSheets);
            expect(styleDeclaration["flex-direction"]).toBe('column');
            expect(styleDeclaration["justify-content"]).toBe('flex-end');
        });
    });
});
