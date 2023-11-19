const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');
const { cipheredTestData } = require('../test-utils/cipheredTestData');

const { JSDOM } = require('jsdom');
const cipher = require('base-64');

describe('CSS Transitions and Transform', () => {
    let htmlString;   
    let cssString;

    let dom;
    let document;

    beforeEach(async () => {
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);
        
        const cssPath = path.join(__dirname, 'style.css');
        cssString = await readTextFile(cssPath);

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

    it('on first block apply skew transformation along the Y-axis on 30 degrees', async () => {
        await waitBrowserLoadEvent(document);
                
        const element = document.querySelector('.block1'); 
        const computedStyle =  dom.window.getComputedStyle(element);

        expect(computedStyle)
            .toEqual(expect.objectContaining({
                'transform': 'skewY(30deg)'
            }));
    });

    it('on second block apply 2D rotation clockwise with the angle 45 degrees', async () => {
        await waitBrowserLoadEvent(document);
                
        const element = document.querySelector('.block2'); 
        const computedStyle =  dom.window.getComputedStyle(element);

        expect(computedStyle)
            .toEqual(expect.objectContaining({
                'transform': 'rotate(45deg)'
            }));
    });

    it('on third block apply 1.5 scale transformation by giving a value for the X-axis', async () => {
        await waitBrowserLoadEvent(document);
                
        const element = document.querySelector('.block3'); 
        const computedStyle =  dom.window.getComputedStyle(element);

        expect(computedStyle)
            .toEqual(expect.objectContaining({
                'transform': 'scaleX(1.5)'
            }));
    });

    describe('.block4', () => {
        it('By default has transition of 2s', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block4', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transition': 'all 2s',
            }));
        });

        it('Make the fourth block 2n size on hover with transition of 2s', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block4:hover', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transform': 'scale(2)',
            }));
        });        
    });

    describe('.block5', () => {
        it('By default has transition of 300ms', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block5', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transition': 'all 300ms',
            }));
        });

        it('Make the fifth block move 40px to the right on hover with transition of 300ms', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block5:hover', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transform': 'translateX(40px)',
            }));
        });        
    });

    describe('.block6', () => {
        it('By default has transition of 3s and transition delay of 200ms', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block6', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transition': 'all 3s',
                'transition-delay': '200ms'
            }));
        });

        it('Make the sixth block 2D rotate counterclockwise with the angle of 90 degrees and change background to be equal #ff0000 on hover with transition of 3s and animation delay of 200ms', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block6:hover', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transform': 'rotate(-90deg)',
            }));
        });        
    });

    describe('.block7', () => {
        it('By default has transition of 3s and timing slow at start and end points', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block7', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transition': 'all 3s ease-in-out',
            }));
        });

        it('Make the seventh block move on 100px to the right on hover with transition of 3s and timing, which starts out slow, quickly speeds up, and then slows down at the end (here use proper transition-timing-function)', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block7:hover', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transform': 'translateX(100px)',
            }));
        });        
    });

    describe('.block8', () => {
        it('By default has transition of 5s and timing effect with a slow end', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block8', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transition': 'all 5s ease-out',
            }));
        });

        it('Make the eight block 2D rotate on hover counterclockwise with the angle of 1090 degrees with the transition of 5s and timing effect with a slow end (here use proper transition-timing-function)', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block8:hover', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transform': 'rotate(-1090deg)',
            }));
        });   
    });

    describe('.block9', () => {
        it('By default has transition of 2s and ransform origint point on left top', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block9', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transition': 'all 2s',
                'transform-origin': 'left top'
            }));
        });

        it('Make the ninth block 2D rotate from the top left corner on hover counterclockwise with the angle of 500 degrees with transition of 2s', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block9:hover', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transform': 'rotate(-500deg)',
            }));
        });        
    });

    describe('.block10', () => {
        it('By default has transition of 5s, transform origint point on right bottom, and transition delay of 300ms', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block10', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transition': 'all 5s',
                'transform-origin': 'right bottom',
                'transition-delay': '300ms'
            }));
        });

        it('Make the tenth block 2D rotate from the bottom right corner on hover clockwise with the angle of 460 degrees with transition of 5s and animation delay of 300ms.', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block10:hover', document.styleSheets);
    
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'transform': 'rotate(460deg)',
            }));
        });        
    });
});
