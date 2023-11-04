const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { hexRgbCSS } = require('../test-utils/hexRgbCSS');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector')

const { JSDOM } = require('jsdom');

describe('HTML media:', () => {
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

    describe('Header styles:', () => {
        it('the quote element with class name `main-quote` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.main-quote');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'margin-left': '0px',
                'margin-right': '0px',
                'margin-top': '0px',
                'margin-bottom': '20px',
                'font-style': 'italic',
                'font-size': '1.5rem',
                'color': hexRgbCSS('#8C92AC'),
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('the `<header>` with class name `main-header` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.main-header');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'background-color': 'purple',
                'color': hexRgbCSS('#fff'),
                'padding-right': '2rem',
                'padding-left': '2rem',
                'padding-top': '2rem',
                'padding-bottom': '2rem',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('the element with `avatar-figure` class name should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.avatar-figure');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'background-image': 'url(images/stars.jpg)',
                'background-color': 'rgb(47, 47, 91)',
                'background-size': 'cover',
                'margin-right': '0px',
                'margin-left': '0px',
                'margin-top': '0px',
                'margin-bottom': '0px',
                'padding-right': '1rem',
                'padding-left': '1rem',
                'padding-top': '1rem',
                'padding-bottom': '1rem',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('the element with `avatar-figure` class name should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.avatar-figure img');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'border': `3px solid #fff`,
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
        
        it('the `<ul>` tag with class name `contacts` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.contacts');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'max-width': '50%',
                'padding-right': '1rem',
                'padding-left': '1rem',
                'padding-top': '1rem',
                'padding-bottom': '1rem',
                'border': `3px solid #fff`,
                'color': hexRgbCSS('#fff'),
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('the `<li>` tag inside `<ul>` tag with class name `contacts` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.contacts li');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'list-style': 'none',
                'display': 'inline-block',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('`<a>` tags with class name `contact` with a "visited" state should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const styleDeclaration = getStyleDeclarationForSelector('a.contact:visited', document.styleSheets);

            expect(styleDeclaration).toEqual(expect.objectContaining({
                'color': 'rgb(128, 128, 128)',
            }));
        });

        it('`<a>` tags with class name `contact` with an "active" state should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const styleDeclaration = getStyleDeclarationForSelector('a.contact:active', document.styleSheets);

            expect(styleDeclaration).toEqual(expect.objectContaining({
                'color': 'rgb(151, 154, 170)',
            }));
        });

        it('`before` presudo-element of a tag with class name `contact-phone` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const styleDeclaration = getStyleDeclarationForSelector('.contact-phone::before', document.styleSheets);
            const actualBackgroundImage = remoteQuotesFromString(styleDeclaration['background-image']);

            expect(actualBackgroundImage).toEqual('url(images/phone-call.svg)');
        });

        it('`before` presudo-element of a tag with class name `contact-inst` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const styleDeclaration = getStyleDeclarationForSelector('.contact-inst::before', document.styleSheets);
            const actualBackgroundImage = remoteQuotesFromString(styleDeclaration['background-image']);

            expect(actualBackgroundImage).toEqual('url(images/instagram-logo.svg)');
        });

        it('`before` presudo-element of a tag with class name `contact-twitter` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const styleDeclaration = getStyleDeclarationForSelector('.contact-twitter::before', document.styleSheets);
            const actualBackgroundImage = remoteQuotesFromString(styleDeclaration['background-image']);

            expect(actualBackgroundImage).toEqual('url(images/twitter.svg)');
        });  

        it('`<h1>` tag should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('h1');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'padding-bottom': '30px',
                'border-bottom': '3px solid rgb(112, 128, 144)',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
    });

    describe('Sections and Section Summary styles:', () => {
        it('all `<section>` tags should have padding', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('section');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'padding-left': '2rem',
                'padding-right': '2rem',
                'padding-top': '2rem',
                'padding-bottom': '2rem',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('`<section>` with a `summary` class name should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.summary');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'text-shadow': '1px 1px 2px pink',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('a tag with `space` class name should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.space');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'float': 'left',
                'width': '8rem',
                'border-radius': '50%',
                'margin-right': '15px',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
    });

    describe('Work experience section:', () => {
        it('`<section>` with a class name `work-experience` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.work-experience');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'margin-top': '2rem',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('`<table>` element should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('table');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'table-layout': 'fixed',
                'width': '100%',
                'border-collapse': 'collapse',
                'border': '3px solid purple',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('a column with class name `work-experience-years-col` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.work-experience-years-col');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'width': '15%',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('a column with class name `work-experience-job-title-col` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.work-experience-job-title-col');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'width': '20%',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('a column with class name `work-experience-comment-col` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.work-experience-comment-col');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'width': '65%',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('all `<th>` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('table th');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'letter-spacing': '2px',
                'padding-right': '20px',
                'padding-left': '20px',
                'padding-top': '20px',
                'padding-bottom': '20px',
                'text-align': 'left',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('all `<td>` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('table td');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'letter-spacing': '1px',
                'padding-right': '20px',
                'padding-left': '20px',
                'padding-top': '20px',
                'padding-bottom': '20px',
                'text-align': 'left',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('all `<th>` inside `<tfoot>` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('tfoot th');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'text-align': 'right',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('all `<thead>` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('thead');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'background-image': 'url(images/leopardskin.jpg)',
                'color': hexRgbCSS('#fff'),
                'text-shadow': '1px 1px 1px black',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('all `<tfoot>` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('tfoot');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'background-image': 'url(images/leopardskin.jpg)',
                'color': hexRgbCSS('#fff'),
                'text-shadow': '1px 1px 1px black',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('`<caption>` should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('caption');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'padding-right': '20px',
                'padding-left': '20px',
                'padding-top': '20px',
                'padding-bottom': '20px',

                'caption-side': 'bottom',
                'color': hexRgbCSS('#666'),
                'font-style': 'italic',
                'text-align': 'right',
                'letter-spacing': '1px',
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
    });

    describe('<footer> with class name `main-footer`', () => {
        it('should have correct styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.main-footer');
            const elementStyles = dom.window.getComputedStyle(element);
            
            const expectedStyles = {
                'padding-right': '2rem',
                'padding-left': '2rem',
                'padding-top': '2rem',
                'padding-bottom': '2rem',

                'color': hexRgbCSS('#fff'),
            };
        
            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
    });

    function remoteQuotesFromString(string) {
        return string.replace(/['"]/gi, '');
    }
});
