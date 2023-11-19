# Responsive Design Intro

## Create a desktop version of the website

## Before we start

1.	This practical task is verified automatically with tests.
2.	Please put all your `CSS` code in the `src/style.css` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements
To complete this task, you will use responsive design techniques to make a page responsive on more devices.

Open the `src/index.html` file in your browser, and you will find a site that will work well on mobile devices. You can drag your window to make it smaller or use the responsive design view in `Firefox` or `Chrome` DevTools to see what this would look like on a phone. 
- [Simulate mobile devices with Device Mode in Firefox](https://developer.chrome.com/docs/devtools/device-mode)
- [Responsive Design Mode](https://firefox-source-docs.mozilla.org/devtools-user/responsive_design_mode)

Your task is to create a desktop version of this layout that is displayed when there is enough screen width to accommodate it. Your solution should meet the requirements below:

In `src/style.css`, use the following media query: 
```css
@media screen and (min-width: 1024px) {

}
```
Put all the styles meant for a desktop version inside it. If you use a different media query or have several of them, the tests might fail. 
  
Note that you need to edit the `src/style.css` file. Your solution cannot be verified if you use a different file. 

Please **don't delete** the import of mobile styles: 
```css
@import 'mobile.css';
```

### Requirements for a desktop version: 

1. **To the `<head>` element add a viewport meta tag with the following content:** 
    - width: `device-width`
    - initial scale: `1` 
2. **Root custom properties:** 
    You have already have defined **root** CSS custom properties(variables) for the background: `--basic-background-image` and `--basic-background-color`. You need to change this for a desktop version: 
    - Set `--basic-background-image` to a new value: `linear-gradient(to right, #2a0845, #6441A5)` 
    - Set `--basic-background-color` to a new value: `#6441A5` 
    - Values should be set for `:root`. 
3. **Page <header>:** 
    1. `<header> styles:` 
        - Use the simple selector `header` to add styles to it.
        - `<header>` should be a flex container (block, not inline). 
        - The flex direction should be the default; you do not need to specify this. 
        - Along the main flex axis, items should be evenly distributed in a line: The first item should be on the start line, and the last item on the end line (`space-between`).
        - Along the cross flex axis, items should be centered.
    2. **`<ul>` inside `<header>`:** 
        - Use the simple selector `header ul` to add styles to it.
        - It should be a flex container. 
        - The flex direction should be the default; you do not need to specify this.
    3. **`<a>` elements inside `<header>`:** 
        - It should not have a top border. 
4. **`<body>` element:** 
    - Remove `margin` on all sides.
5. **`<main>` element:** 
    - It should be a `block-level grid container`.
    - It should have two columns. The first is for `2fr`, and the second for `1fr`. Please use `grid-template-columns`. 
  
6. **All `<p>` inside `<article>`:** 
    - It should have padding on the right: `1rem`.
7. **Cards container (an element with the class name `cards`):** 
    - It should be a flex container. 
    - The flex direction should be the default; you do not need to specify this. 
    - Items should have a gap of `1rem`. Please use [`gap` CSS property](https://developer.mozilla.org/ru/docs/Web/CSS/gap). 
  
8. **Cards items (all `<li>` elements inside an element with class name `cards`):** 
    - Width: `31%` 
    - Zero margins at the bottom 
