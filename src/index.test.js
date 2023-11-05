const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');

const { JSDOM } = require('jsdom');

describe('CSS Layout Basics', () => {
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

    it('should set box-sizing properly', async() => {
        await waitBrowserLoadEvent(document);
        const styleDeclaration = getStyleDeclarationForSelector('body', document.styleSheets);
        expect(styleDeclaration["box-sizing"]).toBe('border-box');
    });

    describe('Page skeleton', () => {
        it('should make sidebar float', async() => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('aside', document.styleSheets);
            expect(styleDeclaration["float"]).toBe('right');
        });

        it('should make main float', async() => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('main', document.styleSheets);
            expect(styleDeclaration["float"]).toBe('left');
        });

        it('should make containers sizes according to schema', async() => {
            await waitBrowserLoadEvent(document);
            const mainWidth = getStyleDeclarationForSelector('main', document.styleSheets)["width"];
            const headerWidth = getStyleDeclarationForSelector('header', document.styleSheets)["width"];
            const footerWidth = getStyleDeclarationForSelector('footer', document.styleSheets)["width"];
            const sideBarWidth = getStyleDeclarationForSelector('aside', document.styleSheets)["width"];

            expect(mainWidth).toBe("70%");
            expect(sideBarWidth).toBe("30%");
            expect(headerWidth).toBe("100%");
            expect(footerWidth).toBe("100%");
        });
    });

    describe('Header', () => {
       it('should set proper position for .header_line', async() => {
            await waitBrowserLoadEvent(document);
            const headerPosition = getStyleDeclarationForSelector('.header_line', document.styleSheets)["position"];
            
            expect(headerPosition).toBe('fixed');
       });

       it('should set .header_line at the top of viewport', async() => {
            await waitBrowserLoadEvent(document);
            const headerPosition = getStyleDeclarationForSelector('.header_line', document.styleSheets)["top"];
            
            expect(headerPosition).toBe('0');
        });
    });

    describe('Main content', () => {
        it('should split .client_stories into 3 columns', async() => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.client_stories', document.styleSheets);
            
            expect(styleDeclaration["column-count"]).toBe('3');
        });

        it('should add gab between .client_stories columns', async() => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.client_stories', document.styleSheets);
            
            expect(styleDeclaration["column-gap"]).toBe('20px');
        });

        it('should make section heading to be proper width', async() => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('h2', document.styleSheets);
            
            expect(styleDeclaration["column-span"]).toBe('all');
        });

        it('should split .features into 2 columns', async() => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.features', document.styleSheets);
            
            expect(styleDeclaration["column-count"]).toBe('2');
        });

        it('should remove gab between .features columns', async() => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.features', document.styleSheets);
            
            expect(styleDeclaration["column-gap"]).toBe('0');
        });
    });

    describe("Sidebar", () => {
        it('should add overflow property for .info container', async() => {
            await waitBrowserLoadEvent(document);
            const styleDeclaration = getStyleDeclarationForSelector('.info', document.styleSheets);
            
            expect(styleDeclaration["overflow"]).toBe('auto');
        });

        it('should make `form` to apper at the bottom of `aside`', async() => {
            await waitBrowserLoadEvent(document);
            const formPosition = getStyleDeclarationForSelector('form', document.styleSheets)["position"];
            const formPlacement = getStyleDeclarationForSelector('form', document.styleSheets);
            const sideBarPosition = getStyleDeclarationForSelector('aside', document.styleSheets)["position"];
            
            expect(formPosition).toBe('absolute');
            expect(sideBarPosition).toBe('relative');
            expect(formPlacement["bottom"]).toBe('0');
        });

        it('should make overlapping `.header_line` cover `aside` when scroll occures', async() => {
            await waitBrowserLoadEvent(document);
            const headerStyleDeclaration = getStyleDeclarationForSelector('.header_line', document.styleSheets);
            const sideBarStyleDeclaration = getStyleDeclarationForSelector('aside', document.styleSheets);
            
            expect(headerStyleDeclaration["z-index"]).not.toBe(undefined);
            expect(sideBarStyleDeclaration["z-index"]).toBe(undefined);
        });
    });
});
