# Layout Basics

## Before we start

1.	This practical task is verified automatically with tests.
2.	Please put all your `CSS` code to the `src/style.css` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the `src/index.html`  page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

In this task, you will create a page structure based on CSS Float and change the existing styles of web page elements to follow the mock-up. 

Please note that you MUST add all CSS rules to the `src/style.css` file without changing the `src/index.html` file. Your solution cannot be verified if you use a different file. You don't need to add additional selectors with rulesets to `src/style.css`. Please add the required properties to the existing rulesets.   

### Add the correct CSS rules to the necessary HTML elements to match the mock-ups
   #### Change the rule for calculating element size
   - Make the browse include borders and paddings in final height and width for all elements. Use the `body` selector. Use the correct value for the `box-sizing` property. `box-sizing: inherit` has been applied to all other elements, so they will be sized accordingly.

   #### Create a page skeleton based on CSS Float
   - Make `aside` float right.
   - Make `main` float left.
   - Make `header`, `footer`, `main`, and `aside` the same size   as in the schema below (applying the proper `width` property):

   ![page skeleton](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/Layout%20Basics/skeleton.PNG)

   #### Style header
   - Make the `.header_line` section appear at the top of the browser window even when scrolling occurs. Use the proper `position` and `top` properties.
    
   #### Style main content
   - Make the `.client_stories` container split its content into three columns with a `20px` gap between columns. Use the CSS multi-column layout features `column-count` and `column-gap`.

   - Make the section heading the width `all-columns`  . Add the `column-span` rule to the `h2` selector.

   ![mockup for "Client stories" section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/Layout%20Basics/client-stories.PNG)

   - Make the `.features` section split its content into two columns with no   gap between columns. Use the CSS multi-column layout features `column-count` and `column-gap`. Your layout should match the template below:

   ![mockup for "Features" section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/Layout%20Basics/features.PNG)

   
   #### Style sidebar
   - Make the `.info` container cut off content outside the box and display a scrollbar IF NECESSARY. Use the proper value for the `overflow` property so that a horizontal scrollbar is NOT displayed (since the width of the content fits the padding box).  

   - Make `form` appear at the bottom of `aside` using the proper `position` for both `form` and `aside`. You don't need to change other CSS rules for these selectors. After the CSS styles are applied, your sidebar should match the mock-up below:

   ![mockup for sidebar](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/Layout%20Basics/sidebar-mockup.PNG)

   - Use `z-index` to make the overlapping `.header_line` cover `aside` when scrolling occurs. Correctly choose which two element styles should contain the `z-index` property

   Check your solution:

   ![mockup for correct/incorrect sidebar styling](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/Layout%20Basics/z-index.PNG)
