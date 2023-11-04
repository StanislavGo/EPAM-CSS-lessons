const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { trimSpaces } = require('../test-utils/trimSpaces');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector')
const hexRgb = require('../test-utils/hex-rgb');

const { JSDOM } = require('jsdom');

describe('Introduction to CSS basics', () => {
    let htmlString;

    let dom;
    let document;

    beforeEach(async () => {
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);

        // Create fake DOM
        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;

        // Replace CSS href with absolute paths, required for correct test running
        const linksCSS = document.querySelectorAll('link[rel="stylesheet"]');
        for (let linkCSS of linksCSS) {
            const initialHref = linkCSS.getAttribute('href');
            const linkAbsolutePath = path.join(__dirname, initialHref);
            linkCSS.setAttribute('href', `file:///${linkAbsolutePath}`);
        }
    });

    // This test is mandatory for all the HTML related tasks
    it('html page should be valid', () => {
        const htmlvalidate = new HtmlValidate();
        const report = htmlvalidate.validateString(htmlString, htmlValidateConfig);
        
        expect(report).toEqual(expect.objectContaining({ valid: true }));
    });

    describe('Add existing styles', () => {
        it('should add styles file', () => {
            const rawDom =  new JSDOM(htmlString);
            const link = rawDom.window.document
                .querySelector('head > link[rel="stylesheet"]');

            expect(link.href).toBe('style.css');
        });

        it('should have <style> tag as the first child of the <body>', async () => {
            await waitBrowserLoadEvent(document);

            const style = document.body.children[0];

            expect(style.tagName).toBe('STYLE');
        });

        it('<style> tag should have styles for <nav>', async () => {
            await waitBrowserLoadEvent(document);

            const nav = document.querySelector('body > nav');
            const navComputedStyle = dom.window.getComputedStyle(nav);

            expect(navComputedStyle).toEqual(expect.objectContaining({
                'padding': '15px',
                'border': '3px solid mediumseagreen',
                'border-radius': '3px',
            }));
        });

        it('should have inline style for the <h2> inside <nav>', async () => {
            await waitBrowserLoadEvent(document);

            const h2 = document.querySelector('body > nav > h2');
            const h2ComputedStyle = dom.window.getComputedStyle(h2);

            expect(h2ComputedStyle).toEqual(expect.objectContaining({
                'text-transform': 'uppercase',
                'text-decoration': 'underline',
            }));
        });
    });

    describe('Basic styling', () => {
        describe('<body>', () => {
            it('should have correct font family', async () => {
                await waitBrowserLoadEvent(document);
    
                const body = document.body;
                const bodyComputedStyle = dom.window.getComputedStyle(body);
    
                expect(trimSpaces(bodyComputedStyle['font-family']))
                    .toEqual('Arial,Helvetica,sans-serif');
            });

            it('should have correct font size', async () => {
                await waitBrowserLoadEvent(document);
    
                const body = document.body;
                const bodyComputedStyle = dom.window.getComputedStyle(body);
    
                expect(bodyComputedStyle['font-size'])
                    .toEqual('16px');
            });
        });

        describe('<h2>' ,() => {
            it.each([[0], [1], [2], [3]])('should have correct styles for the #%i <h2>', async (index) => {
                await waitBrowserLoadEvent(document);
                const h2s = [...document.querySelectorAll('main h2')];
                const h2 = h2s[index];
                const h2ComputedStyle = dom.window.getComputedStyle(h2);

                expect(h2ComputedStyle).toEqual(expect.objectContaining({
                    'font-size': '1.5rem',
                    'color': hexRgb('#303030', { format: 'css' })
                }));
            });
        });
        
        it('should have correct styles for elements with class "quote"', async () => {
            await waitBrowserLoadEvent(document);

            const elem = document.querySelector('.quote');
            const elemComputedStyle = dom.window.getComputedStyle(elem);

            expect(elemComputedStyle).toEqual(expect.objectContaining({
                'color': 'darkslategrey',
                'font-weight': 'bold',
                'font-style': 'italic',
            }));
        });

        it('should have correct styles for element with id "main-image"', async () => {
            await waitBrowserLoadEvent(document);

            const elem = document.querySelector('#main-image');
            const elemComputedStyle = dom.window.getComputedStyle(elem);

            expect(elemComputedStyle).toEqual(expect.objectContaining({
                'border': '5px solid slateblue',
            }));
        });

        it('should have correct styles for all <ol>', async () => {
            await waitBrowserLoadEvent(document);

            const elem = document.querySelector('ol');
            const elemComputedStyle = dom.window.getComputedStyle(elem);

            expect(elemComputedStyle).toEqual(expect.objectContaining({
                'list-style-type': 'upper-roman',
            }));
        });
    });

    describe('Links styling', () => {
        let aIndexes = [[0], [1], [2], [3], [4]];

        it.each(aIndexes)('should have correct styles for a link #%i', async (index) => {
            await waitBrowserLoadEvent(document);

            const link = document.querySelectorAll('a')[index];
            const linkComputedStyle = dom.window.getComputedStyle(link);
            expect(linkComputedStyle).toEqual(expect.objectContaining({
                'color': 'dodgerblue',
            }));
        });

        it('should have correct styles for a visited links', async () => {
            await waitBrowserLoadEvent(document);

            const styleDeclaration = getStyleDeclarationForSelector('a:visited', document.styleSheets);

            expect(styleDeclaration).toEqual(expect.objectContaining({
                'color': 'violet',
            }));
        });

        it('should have correct styles for a hovered links', async () => {
            await waitBrowserLoadEvent(document);

            const styleDeclaration = getStyleDeclarationForSelector('a:hover', document.styleSheets);

            expect(styleDeclaration).toEqual(expect.objectContaining({
                'color': 'mediumseagreen',
            }));
        });
    });
});
