const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { trimSpaces } = require('../test-utils/trimSpaces');

const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');
const { getFirstMediaQueryInner } = require('../test-utils/getFirstMediaQueryInner')

const { JSDOM } = require('jsdom');

describe('Responsive Design Intro:', () => {
    let htmlString;
    let styleCssString;

    let mediaQueryBasicRegExp;

    let dom;
    let document;

    beforeEach(async () => {
        mediaQueryBasicRegExp = /@media +screen +and +\( *min-width: *1024px *\)/gi;

        const htmlFilePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(htmlFilePath);

        const styleCssPath = path.join(__dirname, 'style.css');
        const mobileCssPath = path.join(__dirname, 'mobile.css');
        
        styleCssString = await readTextFile(styleCssPath);
        mobileCssString = await readTextFile(mobileCssPath);

        let styleMediaQueryString = getFirstMediaQueryInner(styleCssString);

        // Create fake DOM
        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;

        document.body.insertAdjacentHTML('beforeend', `<style>${mobileCssString}</style>`);
        document.body.insertAdjacentHTML('beforeend', `<style>${styleMediaQueryString}</style>`);
    });

    // This test is mandatory for all the HTML related tasks
    it('html page should be valid', () => {
        const htmlvalidate = new HtmlValidate();
        const report = htmlvalidate.validateString(htmlString, htmlValidateConfig);
        
        expect(report).toEqual(expect.objectContaining({ valid: true }));
    });

    it('should have correct media query', () => {
        const isMediaQueryExist = mediaQueryBasicRegExp.test(styleCssString);

        expect(isMediaQueryExist).toBe(true);
    });

    describe('Viewport meta tag with content:', () => {
        let viewportSelector;
        
        beforeEach(() => {
            viewportSelector = 'head meta[name="viewport"]';
        });

        it('should be placed to the <head>', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector(viewportSelector);

            expect(element).not.toBeNull();
        });

        it('should have two content values', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector(viewportSelector);
            const contentAttributeValue = element.getAttribute('content').trim();

            const contentValuesSplitted = getContentValueSplitted(contentAttributeValue);

            expect(contentValuesSplitted.length).toBe(2);
        });

        it('should have width set to device width', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector(viewportSelector);
            const contentAttributeValue = element.getAttribute('content').trim();

            const contentValuesSplitted = getContentValueSplitted(contentAttributeValue);
            const hasValue = contentValuesSplitted
                .some((value) => trimSpaces(value) === 'width=device-width');

            expect(hasValue).toBe(true);
        });

        it('should have initial scale set to 1', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector(viewportSelector);
            const contentAttributeValue = element.getAttribute('content').trim();

            const contentValuesSplitted = getContentValueSplitted(contentAttributeValue);
            const hasValue = contentValuesSplitted
                .some((value) => trimSpaces(value) === 'initial-scale=1');

            expect(hasValue).toBe(true);
        });

        function getContentValueSplitted(contentAttributeValue) {
            return contentAttributeValue
                .split(',')
                .map((value) => !!value && value.trim ? value.trim() : null)
                .filter((value) => !!value);
        }
    });

    describe('Root custom properties:', () => {
        let selectorData;

        beforeEach(() => {
            selectorData = getStyleDeclarationForSelector(':root', document.styleSheets);
        });

        it('should have :root definition', () => {
            expect(selectorData).not.toBeNull();
        });

        it('should have --basic-background-image set', () => {
            const backgroundImageString = selectorData['--basic-background-image'];

            const isValidString = /linear-gradient\( *to +right, *#2a0845, *#6441A5 *\)/gi.test(backgroundImageString);

            expect(isValidString).toBe(true);
        });

        it('should have --basic-background-image set', () => {
            expect(selectorData['--basic-background-color']).toBe('#6441A5');
        });

    });

    describe('Page <header>:', () => {
        it('<header> should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('header');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'display': 'flex',
                'justify-content': 'space-between',
                'align-items': 'center',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('<ul> should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('header ul');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'display': 'flex',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('<a> should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('header a');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'border-top': '',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
    });

    it('<body> should have expected styles', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelector('body');
        const elementStyles = dom.window.getComputedStyle(element);
        const expectedStyles = {
            'margin-top': '0px',
            'margin-bottom': '0px',
            'margin-left': '0px',
            'margin-right': '0px',
        };

        expect(elementStyles)
            .toEqual(expect.objectContaining(expectedStyles));
    });

    it('<main> should have expected styles', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelector('main');
        const elementStyles = dom.window.getComputedStyle(element);
        const expectedStyles = {
            'display': 'grid',
            'grid-template-columns': '2fr 1fr'
        };

        expect(elementStyles)
            .toEqual(expect.objectContaining(expectedStyles));
    });

    it('All `<p>` inside `<article>` should have expected styles', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelectorAll('article p')[1];
        const elementStyles = dom.window.getComputedStyle(element);
        const expectedStyles = {
            'padding-right': '1rem',
        };

        expect(elementStyles)
            .toEqual(expect.objectContaining(expectedStyles));
    });

    it('Cards container (an element with class name `cards`)', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelector('.cards');
        const elementStyles = dom.window.getComputedStyle(element);
        const expectedStyles = {
            'display': 'flex',
            'gap': '1rem',
        };

        expect(elementStyles)
            .toEqual(expect.objectContaining(expectedStyles));
    });

    it('Cards items (all `<li>` elements inside an element with class name `cards`)', async () => {
        await waitBrowserLoadEvent(document);

        const element = document.querySelectorAll('.cards li')[1];
        const elementStyles = dom.window.getComputedStyle(element);
        const expectedStyles = {
            'width': '31%',
            'margin-bottom': '0px',
        };

        expect(elementStyles)
            .toEqual(expect.objectContaining(expectedStyles));
    });
});
