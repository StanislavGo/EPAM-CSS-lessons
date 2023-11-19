# CSS Grid

## Before we start

1. This practical task is verified automatically with tests.
2. Please put all your `CSS` code in the `src/style.css` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

This task consists of several parts. First, you should create a skeleton page with the Grid layout. Second, change the existing styles using the features of CSS Grid according to the mock-up. Third, combine the Grid and Flexbox layouts.

Please, note you MUST add all CSS rules in the `src/style.css` file and not change the `src/index.html` file. We can't verify your solution if you use a different file. You don't need to add additional selectors with rulesets in `src/style.css`. Please, add required properties in existing rulesets.

### Please follow the instructions below:

   #### Create a skeleton page with a grid.
   - Add the `grid-template-columns` property to `body` to make a 12-column grid, where each column is 1 fraction width. Use the `repeat` function.
   - Add the `grid-template-rows` property to `body` to divide the layout into three rows. Row height should be `auto.` Use the `repeat` function.
   - Add `grid-area` names to: `header`, `footer`, `main`, and `aside`. The grid area names should be `header, footer, main, sidebar.`
   - Add the `grid-template-areas` property to `body` to place the grid items according to the schema. Make sure to use the given grid area names.

   ![page skeleton](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Grid/page-sceletont.PNG)

   #### Style the "Client Stories" section
   - Make `div` in `.client_stories` to display as a 3-column grid. Each column should have a width of 320 px. Use the `repeat` function.
   - Place the first grid item in the Client Stories section to match the mock-up below. Apply the `grid-column-start`, `grid-column-end`, `grid-row-start`, and `grid-row-end` properties.
    
   ![mockup for grid items placement](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Grid/client-stories-items-placement.PNG)

   - In the `.client_stories > div` selector, use the `gap` or `grid-gap` property to add spaces between rows ONLY. Space size should be `calc(var(--space-size)*2)`.
   - Align the grid items in the `.client_stories > div` selector to reduce the extra space on the right.

   What you see now:

   ![mockup for grid items alignment in "Client stories" section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Grid/client-stories-alignment-before.PNG)

   What you should see after properly aligning the grid items:

   ![mockup for grid items alignment in "Client stories" section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Grid/client-stories-alignment-after.PNG)

   #### Style the "Features" section
   - Make `div` in the `.features` section display as a 3-column grid without any spaces between columns and rows. Use the proper units to define column width: Columns should grow and shrink according to the space available. All columns should have the same width. Use the `repeat` function.
   - Order the grid items in the Features section properly.
   - Position the grid items in the Features section according to the mock-up. Apply the `grid-column-start`, `grid-column-end`, `grid-row-start`, and `grid-row-end` properties to the appropriate selectors.


   ![mockup for grid items placement in "Features" section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Grid/features-grid-items-placement.PNG)

   #### Style sidebar
   - Align the items in the sidebar according to the schema below:

   ![mockup for grid items placement in "Features" section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Grid/sidebar_schema.PNG)

  #### Combine the CSS Grid and CSS Flexbox layouts
   - Make the first grid item of the Client Stories section flexible.
   - Align the content in the flex container to match the design provided

  ![mockup for flex container in "Client stories" section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Positioning%20and%20layouts/CSS%20Grid/flexbox_in_client_stories.PNG)

