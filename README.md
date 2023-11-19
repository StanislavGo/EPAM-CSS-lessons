# Media queries and advanced responsive design

## Add required media queries and provide image optimizations.


## Before we start

1. This practical task is verified automatically with tests.
2. Please put all your `CSS` code in the `src/style.css` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).


## Task Requirements

Open the `src/index.html` file in your browser and find a site that works well on mobile devices. You can drag your window smaller or use the responsive design view in `Firefox` or `Chrome` DevTools to see what it will look like on a phone.
- [Simulate mobile devices with Device Mode in Firefox](https://developer.chrome.com/docs/devtools/device-mode)
- [Responsive Design Mode](https://firefox-source-docs.mozilla.org/devtools-user/responsive_design_mode)

Your task is to add the required media queries and image optimizations. Your solution should meet the requirements below.

Please note that you should edit the `src/style.css` file. Your solution cannot be verified if you use a different file.

Please **don't delete** the import of mobile styles:
```css
@import 'mobile.css';
```

### Requirements:

1. **Media queries**
    
    You will find the styles for all media queries below. Your task is to create a correct media query and wrap all the styles inside it.
    1. Create a media query for devices with screens and a min width of `535px`, and put the following styles inside it:
    ```css
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }


    header ul { 
        display: flex;
    }


    header a {
        border-top: none;
    }


    .sidebar {
        margin-top: 0;
    }
    ```
    2. Create a media query for devices with screens and a min width of `730px`, and put the following styles inside it:
    ```css
    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: flex-start;
        margin-bottom: 1rem;
    }


    .cards li {
        width: calc(50% - 0.5rem);
        margin-bottom: 0;
    }
    ```
    3. Create a media query for devices with screens and a min width of `1010px`, and put the following styles inside it:
    ```css
    .cards li {
        width: calc(33% - 0.5rem);
    }
    ```
    4. Create a media query for devices with screens and a min width of `1295px`, and put the following styles inside it:
    ```css
    main {
        display: grid;
        grid-template-columns: 2fr 1fr;
        padding: 1rem;
    }


    .cards li {
        width: calc(32% - 0.5rem);
    }


    article p {
        padding-right: 1rem;
    }
    ```
    5. Create a media query for desktop computers with a touchpad or mouse (not touch screen), and put the following styles inside it:
    ```css
    .cards li:hover {
       color: #6441A5;
    }
    ```
2. **`<img>` resolution optimizations.**
    
    Find the `<img>` element inside the section with the CSS class name `cool-space-rocket` and update it as follows:
    1. It should have a batch of images for different widths:
        - For `320w`, there should be an image with the URL `images/rocket320.jpg`.
        - For `640w`, there should be an image with the URL `images/rocket640.jpg`.
        - For `1024w`, there should be an image with the URL `images/rocket1024.jpg`.
        - For `1280w`, there should be an image with the URL `images/rocket1280.jpg`.
    2. Sizes. Add the `size` attribute with the following configuration:
        - For a max width of `530px`, the image width should be `80vw`.
        - For a max width of `730px`, the image width should be `70vw`.
        - For a max width of `1500px`, the image width should be `50vw`.
        - For the rest, the image width should be `1000px`.
3. **Image Art Direction optimizations**
    1. Find the `<img>` element inside the section with the CSS class name `space-building`. 
        - Wrap it with a `<picture>` tag and add an additional file source for browsers that support the `WEBP` format (Use `image/webp` for a `type` attribute). WEBP-image URL: `images/space-building.webp`
    2. Find the `<img>` element inside the section with the CSS class name `nasa-astronaut`.
        - Wrap it with a `<picture>` tag.
        - For a maximum width of `900px`, the browser should use an image with the URL `images/astronaut-crop2.jpg`.
        - For a maximum width of `1400px`, the browser should use an image with the URL `images/astronaut-crop1.jpg`. 

