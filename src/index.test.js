const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');
const { 
    getMediaQueryInnerStylesForMinWidth,
    getAllMediaQueriesStrings,
    getMediaQueryInner, 
} = require('../test-utils/getMediaQueryInnerStylesForMinWidth') 

const { JSDOM } = require('jsdom');

describe('Media queries and advanced responsive design', () => {
    let htmlString;

    let styleCssString;
    let mediaQueryCssString;

    let dom;
    let document;

    beforeEach(async () => {
        const htmlFilePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(htmlFilePath);

        const styleCssPath = path.join(__dirname, 'style.css');
        const mobileCssPath = path.join(__dirname, 'mobile.css');
        
        styleCssString = await readTextFile(styleCssPath);
        const mobileCssString = await readTextFile(mobileCssPath);
        
        // Create fake DOM
        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;

        document.body.insertAdjacentHTML('beforeend', `<style>${mobileCssString}</style>`);
    });

    // This test is mandatory for all the HTML related tasks
    it('html page should be valid', () => {
        const htmlvalidate = new HtmlValidate();
        const report = htmlvalidate.validateString(htmlString, htmlValidateConfig);
        
        expect(report).toEqual(expect.objectContaining({ valid: true }));
    });

    describe('For min width of 535px:', () => {
        beforeEach(() => {
            const testsAddedStyles = document.getElementById('tests-added');
            testsAddedStyles && testsAddedStyles.remove();

            mediaQueryCssString = getMediaQueryInnerStylesForMinWidth(styleCssString, 535);

            document.body.insertAdjacentHTML('beforeend', `<style id="tests-added">${mediaQueryCssString}</style>`);
        });

        it('styles should be added for 535px width screens', async () => {
            await waitBrowserLoadEvent(document);

            expect(mediaQueryCssString).not.toBeFalsy();
        });

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

        it('.sidebar should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.sidebar');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                'margin-top': '0px',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
    });

    describe('For min width 730px:', () => {
        beforeEach(() => {
            const testsAddedStyles = document.getElementById('tests-added');
            testsAddedStyles && testsAddedStyles.remove();

            mediaQueryCssString = getMediaQueryInnerStylesForMinWidth(styleCssString, 730);

            document.body.insertAdjacentHTML('beforeend', `<style id="tests-added">${mediaQueryCssString}</style>`);
        });

        it('.cards should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.cards');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'flex-start',
                marginBottom: '1rem',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('.cards <li> should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.cards li');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                marginBottom: '0px',
                width: 'calc(50% - 0.5rem)'
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
    });

    describe('For min width 1010px:', () => {
        beforeEach(() => {
            const testsAddedStyles = document.getElementById('tests-added');
            testsAddedStyles && testsAddedStyles.remove();

            mediaQueryCssString = getMediaQueryInnerStylesForMinWidth(styleCssString, 1010);

            document.body.insertAdjacentHTML('beforeend', `<style id="tests-added">${mediaQueryCssString}</style>`);
        });

        it('.cards <li> should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.cards li');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                width: 'calc(33% - 0.5rem)',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
    });

    describe('For min width 1295px:', () => {
        beforeEach(() => {
            const testsAddedStyles = document.getElementById('tests-added');
            testsAddedStyles && testsAddedStyles.remove();

            mediaQueryCssString = getMediaQueryInnerStylesForMinWidth(styleCssString, 1295);

            document.body.insertAdjacentHTML('beforeend', `<style id="tests-added">${mediaQueryCssString}</style>`);
        });

        it('<main> should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('main');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                padding: '1rem',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('.cards <li> should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('.cards li');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                width: 'calc(32% - 0.5rem)',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });

        it('<p> inside <article> should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const element = document.querySelector('article p');
            const elementStyles = dom.window.getComputedStyle(element);
            const expectedStyles = {
                paddingRight: '1rem',
            };

            expect(elementStyles)
                .toEqual(expect.objectContaining(expectedStyles));
        });
    });

    describe('For desktop computers with a touchpad or mouse (not touch screen):', () => {
        beforeEach(() => {
            const testsAddedStyles = document.getElementById('tests-added');
            testsAddedStyles && testsAddedStyles.remove();

            const allMediaQueries = getAllMediaQueriesStrings(styleCssString);
            const hoverPointerRegExp =  /@media +\( *hover: *hover *\) +and +\( *pointer: *fine *\)/gi;
            const pointerHoverRegExp =  /@media +\( *pointer: *fine *\) +and +\( *hover: *hover *\)/gi;
            
            const desktopComputerMediaQueryString = allMediaQueries.find((itemString) => {
                return hoverPointerRegExp.test(itemString) || 
                    pointerHoverRegExp.test(itemString);
            });

            mediaQueryCssString = getMediaQueryInner(desktopComputerMediaQueryString);

            document.body.insertAdjacentHTML('beforeend', `<style id="tests-added">${mediaQueryCssString}</style>`);
        });

        it('.cards <li> on hover should have expected styles', async () => {
            await waitBrowserLoadEvent(document);

            const styleDeclaration = getStyleDeclarationForSelector('.cards li:hover', document.styleSheets);

            expect(styleDeclaration).toEqual(expect.objectContaining({
                'color': '#6441A5'
            }));
        })
    });

    describe('<img> resolution optimizations:', () => {
        let img;
        let srcsetAttribute;
        let srcsetImages;

        beforeEach(() => {
            img = document.querySelector('.cool-space-rocket img');
            srcsetAttribute = img.getAttribute('srcset');
            sizeAttribute = img.getAttribute('sizes');

            srcsetImages = srcsetAttribute.split(',')
                .map(item => item.trim());

            sizes = sizeAttribute.split(',')
                .map(item => item.trim());
        });

        it('should have expected image for 320w', () => {
            const isExist = isImageForWidthExist(srcsetImages, 320, 'images/rocket320.jpg');

            expect(isExist).toBe(true);
        });

        it('should have expected image for 640w', () => {
            const isExist = isImageForWidthExist(srcsetImages, 640, 'images/rocket640.jpg');

            expect(isExist).toBe(true);
        });

        it('should have expected image for 1024w', () => {
            const isExist = isImageForWidthExist(srcsetImages, 1024, 'images/rocket1024.jpg');

            expect(isExist).toBe(true);
        });

        it('should have expected image for 1280w', () => {
            const isExist = isImageForWidthExist(srcsetImages, 1280, 'images/rocket1280.jpg');

            expect(isExist).toBe(true);
        });

        it('for a max width of 530px image width should be 80vw', () => {
            const isExist = isSizeExistForMaxWidth(sizes, 80, 530);

            expect(isExist).toBe(true);
        });

        it('for a max width of 730px image width should be 70vw', () => {
            const isExist = isSizeExistForMaxWidth(sizes, 70, 730);

            expect(isExist).toBe(true);
        });

        it('for a max width of 1500px image width should be 50vw', () => {
            const isExist = isSizeExistForMaxWidth(sizes, 50, 1500);

            expect(isExist).toBe(true);
        });

        it('for the rest image width should be 1000px', () => {
            const isExist = sizes.some((item) => {
                return / *1000px */gi;
            });

            expect(isExist).toBe(true);
        });

        function isImageForWidthExist(srcsetImages, width, imageUrl) {
            const regExp = new RegExp(` *${imageUrl} +${width}w *`, 'gi');
            
            return srcsetImages.some((item) => {
                return regExp.test(item);
            });
        }

        function isSizeExistForMaxWidth(sizes, width, maxWidth) {
            const regExp = new RegExp(` *\\( *max-width: *${maxWidth}px *\\) +${width}vw *`, 'gi');
            
            return sizes.some((item) => {
                return regExp.test(item);
            });
        }
    });

    describe('Image Art Direction optimizations:', () => {
        describe('<img> inside section with "space-building" class', () => {
            let picture;
            let img;
            let source;

            beforeEach(() => {
                picture = document.querySelector('.space-building picture');
                img = picture.querySelector('img');
                source = picture.querySelector('source');
            });

            it('<img> should be wrapped with <picture>', () => {
                expect(img).toBeTruthy();
            });

            it('<source> should have webp type', () => {
                const sourceType = source.getAttribute('type') || '';
                const sourceTypeNormalized = sourceType.trim().toLowerCase();

                expect(sourceTypeNormalized).toBe('image/webp');
            });

            it('<source> should have correct srcset', () => {
                const sourceSrcSet = source.getAttribute('srcset') || '';
                const sourceSrcSetNormalized = sourceSrcSet.trim().toLowerCase();

                expect(sourceSrcSetNormalized)
                    .toBe('images/space-building.webp');
            });
        });
        
        describe('<img> inside section with "nasa-astronaut" class', () => {
            let picture;
            let img;
            let source900;
            let source1400;

            beforeEach(() => {
                picture = document.querySelector('.nasa-astronaut picture');
                img = picture.querySelector('img');
                sources = Array.from(picture.querySelectorAll('source'));

                source900 = getSourceForMaxWidth(sources, 900);
                source1400 = getSourceForMaxWidth(sources, 1400);
            });

            function getSourceForMaxWidth(sources, maxWidth) {
                return sources.find((item) => {
                    const mediaAttribute = item.getAttribute('media');
                    const regExp = new RegExp(` *\\( *max-width: *${maxWidth}px *\\) *`, 'gi');

                    return regExp.test(mediaAttribute);
                });
            }

            it('<img> should be wrapped with <picture>', () => {
                expect(img).toBeTruthy();
            });

            it('should be <source> for max-width 900px', () => {
                expect(source900).toBeTruthy();
            });

            it('should be <source> for max-width 1400px', () => {
                expect(source1400).toBeTruthy();
            });

            it('<source> for max-width 900px should have correct srcset', () => {
                const sourceSrcSet = source900.getAttribute('srcset') || '';
                const sourceSrcSetNormalized = sourceSrcSet.trim().toLowerCase();

                expect(sourceSrcSetNormalized)
                    .toBe('images/astronaut-crop2.jpg');
            });

            it('<source> for max-width 1400px should have correct srcset', () => {
                const sourceSrcSet = source1400.getAttribute('srcset') || '';
                const sourceSrcSetNormalized = sourceSrcSet.trim().toLowerCase();

                expect(sourceSrcSetNormalized)
                    .toBe('images/astronaut-crop1.jpg');
            });
        });
    });
});
