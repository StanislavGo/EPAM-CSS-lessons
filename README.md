# CSS Selectors

## Add styles to the Space News website.

## Before we start

1.	This practical task is verified automatically with tests.
2.	Please put all your `HTML` code in the `src/index.html` and `src/style.css` files. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

Please, add the required CSS selectors and styles.

Add all `CSS` code to the `src/style.css` file. If you add it somewhere else or significantly change `src/index.html`the tests might fail.

To complete this task successfully, you must write **the selectors exactly as described in the requirements**. If you use different ones, the tests might fail.

### CSS Selectors requirements: 

1. **Basic selectors:**
    - Add the font family - `Arial, Helvetica, sans-serif` to the `<body>` tag. 
    - To the element with `id` value of `main-header` add the following CSS rules: 
    ```css
    padding: 10px;
    border: 3px solid darkblue;
    ```
    - To the element with the `CSS` class `main-heading`, add the italic font style and text decoration `underline dotted`.
    - To all `<section>` elements add the following CSS rules:
    ```css
    padding: 10px;
    margin-top: 10px;
    ```
2. **Combinators selectors:**
    - To the `<section>` element with the class name `tech`, add the following CSS rule: `border: 3px solid darkolivegreen;`.
    - To the `<section>` element with the class name `spaceflight`, add the following CSS rule: `border: 3px solid darkmagenta;`.
    - To the `<section>` element with the class name `science-astronomy`, add the following CSS rule: `border: 3px solid darkcyan;`.
    - To the `<h2>` descendant of an element with the class name `tech`, add the text color `darkgrey`. Your selector should match any `<h2>` inside elements with the class name `tech`; it can be nested on any level.
    - To the `<h2>` element that is a **direct** child of the `<header>` element, add the following CSS rules: 
    ```css
    padding-left: 10px;
    border-left: 3px solid darksalmon;
    ```
    This applies only when `<h2>` is a direct child of `<header>`.
    - To the `<nav>` element that **immediately** follows the `<h1>` element, add the following CSS rule: `border-left: 4px solid;`.
    - To the element with the class name `main-footer` that follows an element with the id `main-header` on any level,  add the following CSS rules:
    ```css
    padding: 10px;
    margin-top: 10px;
    border: 3px solid darkkhaki;
    ```
    This means that the `.main-footer` element follows the `#main-header` (though not necessarily immediately) and both share the same parent.
    - To the `<ul>` element that is a **direct** child of an element with the class name `main-navigation` add the following CSS rules:
    ```css
    list-style: none;
    padding-left: 15px;
    ```
3. **Pseudo-classes and Pseudo-elements:**
    - To the direct `first child` `<li>` element inside the `<ol>` element, add the following CSS rule: `border-bottom: 3px solid darkmagenta;`.
    - To the direct `last child` `<li>` element inside the `<ol>` element, add the following CSS rule: `border-top: 3px solid darkturquoise;`.
    - To the `<a>` element inside the element with the class name `main-footer`, add the text color `yellowgreen` when the user hovers over it. Please note that `<a>` can be nested to the `.main-footer` on any level and is not necesserally a direct child.
    - To all focused `<a>` elements, add the following CSS rule: `background-color: yellow;`.
    - To the `<h2> "before"` pseudo-element inside an element with the class name `tech` add the following CSS rule: `content: '🤖';`. 
    Please, note that `<h2>` can be nested to the `.tech` on any level and is not necesserally a direct child. Also, don't forget to use `::` when writing a selector.
    - To the `<h2> "after"` pseudo-element inside the element with the class name `spaceflight` add CSS rule: `content: '🚀';`. 
    Please, note that `<h2>` can be nested to the `.spaceflight` on any level and is necesserally a direct child. Also, don't forget to use `::` when writing a selector.
    
