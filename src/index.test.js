const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const { getStyleDeclarationForSelector } = require('../test-utils/getStyleDeclarationForSelector');
const { getKeyFrameDeclarationByName } = require('../test-utils/getKeyFrameDeclarationByName');

const { JSDOM } = require('jsdom');

describe('CSS Animations', () => {
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

    describe('.block1 animation', () => {
        it('block1 should have animation "bgcolor" and animation duration for 5s', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block1', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-name': 'bgcolor',
                'animation-duration': '5s'
            }));
        });

        it('animation keyframe should exist and start from "#ff5733"', async () => {
            await waitBrowserLoadEvent(document);
           
            const keyFrameDeclaration = getKeyFrameDeclarationByName('bgcolor', 'from', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'background-color': '#ff5733'
            }));
        });    
  
        it('animation keyframe should exist and end to "#3393ff"', async () => {
            await waitBrowserLoadEvent(document);           
          
           const keyFrameDeclaration = getKeyFrameDeclarationByName('bgcolor', 'to', document.styleSheets);
           expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'background-color': '#3393ff'
            }));
        });        
    });

    describe('.block2 animation', () => {
        it('block should have animation "bgcolor2" and animation duration for 5s', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block2', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-name': 'bgcolor2',
                'animation-duration': '4s'
            }));
        });

        it('animation keyframe should exist and start from "#3393ff"', async () => {
            await waitBrowserLoadEvent(document);
           
            const keyFrameDeclaration = getKeyFrameDeclarationByName('bgcolor2', '0%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'background-color': '#3393ff'
            }));
        });
        
        it('animation keyframe should have middle color "#33ff42"', async () => {
            await waitBrowserLoadEvent(document);
           
            const keyFrameDeclaration = getKeyFrameDeclarationByName('bgcolor2', '50%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'background-color': '#33ff42'
            }));
        });
  
        it('animation keyframe should exist and end to "#30b851"', async () => {
            await waitBrowserLoadEvent(document);           
          
           const keyFrameDeclaration = getKeyFrameDeclarationByName('bgcolor2', '100%', document.styleSheets);
           expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'background-color': '#30b851'
            }));
        });        
    });

    describe('.block3 animation', () => {
        it('block should have animation "blockmove" and animation duration for 6s', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block3', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-name': 'blockmove',
                'animation-duration': '6s'
            }));
        });

        it('animation keyframe should exist and start from position top=0, left=0', async () => {
            await waitBrowserLoadEvent(document);
           
            const keyFrameDeclaration = getKeyFrameDeclarationByName('blockmove', '0%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left':'0px',
                'top':'0px'
            }));
        });
        
        it('animation keyframe should exist and have 25% position top=0px, left=320px', async () => {
            await waitBrowserLoadEvent(document);
           
            const keyFrameDeclaration = getKeyFrameDeclarationByName('blockmove', '25%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left':'320px',
                'top':'0px'
            }));
        });
        
        it('animation keyframe should exist and have 50% position top=320px, left=320px', async () => {
            await waitBrowserLoadEvent(document);
           
            const keyFrameDeclaration = getKeyFrameDeclarationByName('blockmove', '50%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left':'320px',
                'top':'320px'
            }));
        });

        it('animation keyframe should exist and  have 75% position top=320px, left=0px', async () => {
            await waitBrowserLoadEvent(document);
           
            const keyFrameDeclaration = getKeyFrameDeclarationByName('blockmove', '75%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left':'0px',
                'top':'320px'
            }));
        });

        it('animation keyframe should exist and ends with position top=0px, left=0px', async () => {
            await waitBrowserLoadEvent(document);
           
            const keyFrameDeclaration = getKeyFrameDeclarationByName('blockmove', '100%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left':'0px',
                'top':'0px'
            }));
        });
    });

    describe('.block4 animation', () => {
        it('block should have animation "blockcolormove" and animation duration for 5s, animation delay of 300ms and repeat animation 5 times', async () => {
            await waitBrowserLoadEvent(document);
            
            const styleDeclaration = getStyleDeclarationForSelector('.block4', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-name': 'blockcolormove',
                'animation-duration': '5s',
                'animation-iteration-count': '5',
                'animation-delay': '300ms'
            }));
        });

        it('animation keyframe should exist and start from position top=0, left=0 and background color "#33fffc"', async () => {
            await waitBrowserLoadEvent(document);
            
            const keyFrameDeclaration = getKeyFrameDeclarationByName('blockcolormove', '0%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left':'0px',
                'top':'0px',
                'background-color': '#33fffc'
            }));
        });

        it('animation keyframe should exist and have 50% position top=300px, left=300px and background color "#30b851"', async () => {
            await waitBrowserLoadEvent(document);
            
            const keyFrameDeclaration = getKeyFrameDeclarationByName('blockcolormove', '50%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left':'300px',
                'top':'300px',
                'background-color': '#30b851'
            }));
        });

        it('animation keyframe should exist and ends with position top=0, left=0 and background color "#33fffc"', async () => {
            await waitBrowserLoadEvent(document);
            
            const keyFrameDeclaration = getKeyFrameDeclarationByName('blockcolormove', '100%', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left':'0px',
                'top':'0px',
                'background-color': '#33fffc'
            }));
        });
    })   
    
    describe('.block5 animation', () => {
        it('block should have animation "showhide" and animation duration for 1s, and repeat infinite amount of times', async () => {
            await waitBrowserLoadEvent(document);
            
            const styleDeclaration = getStyleDeclarationForSelector('.block5', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-duration': '1s',
                'animation-iteration-count': 'infinite',
            }));
        });

        it('animation keyframe should exist and start from opacity 1', async () => {
            await waitBrowserLoadEvent(document);
            
            const keyFrameDeclaration = getKeyFrameDeclarationByName('showhide', 'from', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({                   
                'opacity': '1'
            }));
        });

        it('animation keyframe should exist and and with opacity 0', async () => {
            await waitBrowserLoadEvent(document);
            
            const keyFrameDeclaration = getKeyFrameDeclarationByName('showhide', 'to', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({                   
                'opacity': '0'
            }));
        });
    });        
    describe('.block6 animation', () => {
        it('block should have animation "blockmove" and animation duration for 5s, and animation direction - reversed', async () => {
            await waitBrowserLoadEvent(document);
            
            const styleDeclaration = getStyleDeclarationForSelector('.block6', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-name': 'blockmove',
                'animation-duration': '5s',
                'animation-direction': 'reverse'
            }));
        });
    });
    describe('.block7 animation', () => {
        it('block should have animation "blockcolormove" and animation duration for 2s, and animation direction - alternate-reversed, and played infinite amount of times', async () => {
            await waitBrowserLoadEvent(document);
            
            const styleDeclaration = getStyleDeclarationForSelector('.block7', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-name': 'blockcolormove',
                'animation-duration': '2s',
                'animation-direction': 'alternate-reverse',
                'animation-iteration-count': 'infinite'
            }));
        });
    });      
    
    describe('.block8 animation', () => {
        it('block should have animation "moveleft" and animation duration for 5s', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block8', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-name': 'moveleft',
                'animation-duration': '5s',
            }));
        });

        it('animation keyframe should exist and start from left 0 position', async () => {
            await waitBrowserLoadEvent(document);
           
            const keyFrameDeclaration = getKeyFrameDeclarationByName('moveleft', 'from', document.styleSheets);
            expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left': '0'
            }));
        });    
  
        it('animation keyframe should exist and end on left 300px position', async () => {
            await waitBrowserLoadEvent(document);           
          
           const keyFrameDeclaration = getKeyFrameDeclarationByName('moveleft', 'to', document.styleSheets);
           expect(keyFrameDeclaration).toEqual(expect.objectContaining({
                'left': '300px'
            }));
        });        
    });
    describe('.block9 animation', () => {
        it('block should have animation "moveleft" and animation duration for 5s, animation is with the same speed from start to end', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block9', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-name': 'moveleft',
                'animation-duration': '5s',
                'animation-timing-function': 'linear'
            }));
        });
       
    });
    describe('.block10 animation', () => {
        it('block should have animation "moveleft" and animation duration for 5s, animation is with a slow end and the block will retain the style values that is set by the last keyframe', async () => {
            await waitBrowserLoadEvent(document);
           
            const styleDeclaration = getStyleDeclarationForSelector('.block10', document.styleSheets);
            expect(styleDeclaration).toEqual(expect.objectContaining({
                'animation-name': 'moveleft',
                'animation-duration': '5s',
                'animation-timing-function': 'ease-out',
                'animation-fill-mode': 'forwards'
            }));
        });
       
    });
});
