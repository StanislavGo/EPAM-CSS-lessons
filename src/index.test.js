const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { cipheredTestData } = require('../test-utils/cipheredTestData');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector')

const { JSDOM } = require('jsdom');
const cipher = require('base-64');

describe('CSS selectors', () => {
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

        // Replace CSS href with absolute paths
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

    describe('Basic selectors', () => {
        describe('<body>', () => {
            let expectedStyle;

            beforeEach(() => {
                expectedStyle = {
                    'font-family': 'Arial, Helvetica, sans-serif'
                };
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const selector = cipher.decode(cipheredTestData['<body>']);
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
                
                const computedStyle =  dom.window.getComputedStyle(document.body);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('Main Header', () => {
            let expectedStyle;

            beforeEach(() => {
                expectedStyle = {
                    'padding': '10px',
                    'border': '3px solid darkblue',
                };
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const selector = cipher.decode(cipheredTestData['main-header']);
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
                
                const element = document.querySelector('header')
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('Main Heading', () => {
            let expectedStyle;

            beforeEach(() => {
                expectedStyle = {
                    'font-style': 'italic',
                    'text-decoration': 'underline dotted',
                };
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const selector = cipher.decode(cipheredTestData['main-heading']);
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
                
                const element = document.querySelector('h1')
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('All Sections', () => {
            let expectedStyle;

            beforeEach(() => {
                expectedStyle = {
                    'padding': '10px',
                    'margin-top': '10px',
                };
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const selector = cipher.decode(cipheredTestData['all-sections']);
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
                
                const main = document.querySelector('main')
                const element = main.firstElementChild;
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });
    });

    describe('Combinators selectors', () => {
        describe('<section> element with class name tech', () => {
            let expectedStyle;

            beforeEach(() => {
                expectedStyle = {
                    'border': '3px solid darkolivegreen',
                };
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const selector = cipher.decode(cipheredTestData['section-tech']);
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
                
                const main = document.querySelector('main');
                const element = main.children[0];
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('<section> element with class name spaceflight', () => {
            let expectedStyle;

            beforeEach(() => {
                expectedStyle = {
                    'border': '3px solid darkmagenta',
                };
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const selector = cipher.decode(cipheredTestData['section-spaceflight']);
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
                
                const main = document.querySelector('main');
                const element = main.children[1];
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('<section> element with class name science-astronomy', () => {
            let expectedStyle;

            beforeEach(() => {
                expectedStyle = {
                    'border': '3px solid darkcyan',
                };
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const selector = cipher.decode(cipheredTestData['section-science-astronomy']);
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
                
                const main = document.querySelector('main');
                const element = main.children[2];
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });
        
        describe('<h2> descendant of element with class tech', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'color': 'darkgrey',
                };

                selector = cipher.decode(cipheredTestData['h2-tech']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector(selector);
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('<h2> element which is a direct child of a <header> element', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'padding-left': '10px',
                    'border-left': '3px solid darksalmon',
                };

                selector = cipher.decode(cipheredTestData['h2-header']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector(selector);
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('<nav> element which immediately follows <h1> element', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'border-left': '4px solid',
                };

                selector = cipher.decode(cipheredTestData['nav-h1']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector(selector);
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('main-footer which follows on any level an element with id main-header', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'padding': '10px',
                    'margin-top': '10px',
                    'border': '3px solid darkkhaki',
                };

                selector = cipher.decode(cipheredTestData['main-footer-main-header']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector(selector);
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('main-footer which follows on any level an element with id main-header', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'list-style': 'none',
                    'padding-left': '15px',
                };

                selector = cipher.decode(cipheredTestData['ul-main-navigation']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });

            it('styles should apply', async () => {
                await waitBrowserLoadEvent(document);
    
                const element = document.querySelector(selector);
                const computedStyle =  dom.window.getComputedStyle(element);
    
                expect(computedStyle)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });
    });

    describe('Pseudo-classes and Pseudo-elements', () => {
        describe('direct first child <li> element inside <ol> element', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'border-bottom': '3px solid darkmagenta',
                };

                selector = cipher.decode(cipheredTestData['li-first-child-ol']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('direct last child <li> element inside <ol> element', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'border-top': '3px solid darkturquoise',
                };

                selector = cipher.decode(cipheredTestData['li-last-child-ol']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('<a> element inside the element with class name main-footer when user hovers over it', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'color': 'yellowgreen',
                };

                selector = cipher.decode(cipheredTestData['a-main-footer']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('all focused <a> elements', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'background-color': 'yellow',
                };

                selector = cipher.decode(cipheredTestData['a-focused']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });
       
        describe('<h2> "before" pseudo-element inside the element with class name tech', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'content': '\'🤖\'',
                };

                selector = cipher.decode(cipheredTestData['h2-tech-before']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });

        describe('<h2> "after" pseudo-element inside the element with class name tech', () => {
            let expectedStyle;
            let selector;

            beforeEach(() => {
                expectedStyle = {
                    'content': '\'🚀\'',
                };

                selector = cipher.decode(cipheredTestData['h2-spaceflight-after']);
            });

            it('should add selector', async () => {
                await waitBrowserLoadEvent(document);
                
                const styleDeclaration = getStyleDeclarationForSelector(selector, document.styleSheets);

                expect(styleDeclaration)
                    .toEqual(expect.objectContaining(expectedStyle));
            });
        });
    });
});
