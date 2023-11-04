# Introduction to CSS basics

## Add styles to the BIO page

For this task, you should add styles to the bio page for Neil Armstrong, an American astronaut and aeronautical engineer and the first person to walk on the Moon. This task requires you to both add an existing style and write your own.

## Before we start

1.	This practical task is verified automatically with tests.
2.	Please put all your `HTML` code in the `src/index.html` and `src/gallery.html` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

Neil Armstrong - was an American astronaut and aeronautical engineer, and the first person to walk on the Moon. Add styling to his BIO page according to the requirements below.

### Task Requirements

1. **Add existing styles:**
    - In the `<head>` add a `<link>` with styles from the file: `style.css`. Don't forget to add the required attribute to the `link` tag, and don't add redundant ones.
    - As a first child in the body, please add `<style>` tag with the following content:
    ```css
    nav {
      padding: 15px;
      border: 3px solid mediumseagreen;
      border-radius: 3px;
    }
    ```
    Don't worry if you don't know all the CSS rules from this code; you will learn them soon.
    - Add `inline style` to the `<h2>` tag inside of the `<nav>` with the following content: `text-transform: uppercase; text-decoration: underline;`.
2. **Basic styling:**
    - Please note that you need to add all the required styles to the `style.css` file or inside the `<style>` tag added previously. You must add them there; don't use inline styles.
    - To the `<body>` tag: add the font family `Arial, Helvetica, sans-serif`, and apply a font size of `16px`;
    - To all the `<h2>` tags, apply a text size of `1.5rem` and text color of `#303030`;
    - To all the paragraphs `<p>`, apply a text size of `18px`.
    - To all the elements with CSS class `quote`, apply text color `darkslategrey` and make the text italic and bold.
    - To the element with the `id` attribute value `main-image` add the following border: `border: 5px solid slateblue`.
    - To the `<ol>` tags, add a list style type of `upper-roman`.
3. **Links styling:**
    - For all the links, make the text color `dodgerblue`;
    - For all the `visited` links, make the text color `violet`;
    - For all the links that are hovered over by the user's mouse pointer, make the text color  `mediumseagreen`
    
