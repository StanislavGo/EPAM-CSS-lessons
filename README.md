# CSS Flexbox

## Before we start

1.	This practical task is verified automatically with tests.
2.	Please put all your `CSS` code in the `src/style.css` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

In this challenge, you will analyze Flexbox use cases, look for mistakes, and work with the properties of flex containers and flex items. 

Please note that you MUST add all CSS rules in the `src/style.css` file and not change the `src/index.html` file. Your solution cannot be verified if you use a different file. You don't need to add additional rulesets in `style.css`. Please add the necessary properties to the existing rulesets.

### Fix invalid Flexbox properties
   - In `style.css`, find and fix the Flexbox properties that are misapplied for the `<header>` and `<main>` containers. There should be five fixes.

### Add the correct CSS rules to the HTML elements as necessary to match the mock-ups
   - Add the `display` property to `nav ul` to make it flexible. After the change is applied, the header and footer should match the design.
   
   Header menu:
   ![mockup for header menu](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Flexbox/header-nav.PNG)
   Footer menu:
   ![mockup for footer menu](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Flexbox/footer.PNG)

   - Add the necessary `flex-direction` to `<section class="title_section">` to match the mock-up. Pay attention to the order of flex-items.
   ![mockup for header](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Flexbox/header.PNG)

   - Make every `<div>` in each `<section>` in`<main>` flexible.  
   
   - Implement changes to align the "Client stories" section with the mock-up. Add the `flex-grow` property to `.column` and `section:first-of-type div:first-of-type .column:first-of-type` with the correct values.  
   ![mockup for "Client stories" section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Flexbox/client-stories.PNG)

   - Implement changes for the "Features" section to match the mock-up. Uncomment the CSS rules for the `.card-first`, `.card-second`, 
   ... and `.card-six` selectors and fill them with the necessary values. Pay attention to the order and the size of the cards.
   ![mockup for "Features" section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Flexbox/features.PNG)

   - Implement changes in the footer to match the design provided. Add the `display, justify-content, align-items` properties in the `footer` ruleset.
   ![mockup for footer](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Flexbox/footer.PNG)

### Make it responsive
   - Make the flex items in the menu always stay on one line. Make the required changes in the ruleset for the `nav ul` selector.
   - Make `<section class='title_section'>` wrap into two lines for small screens (if the elements do not fit on the screen). Make the required changes in the ruleset for `.title_section`.

   ![mockup for header in mobile view](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Flexbox/header-mobile.PNG)
