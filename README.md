# Usefull CSS Rules

## Add CSS styles to the astronaut CV(resume) HTML page

## Before we start

1.	This practical task is verified automatically with tests.
2.	Please put all your `CSS` code in the `src/style.css` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

For this task, you need to add CSS styles to improve the appearance of an astronaut's resume.

Please note that you should edit the `src/style.css` file. The solution cannot be verified if you use a different file.

### You can find the requirements for the CSS styles below:

1. **Header styles:**
    1. For the quote element with the class name `main-quote`:
        - Zero margin from the left;
        - Zero margin from the right;
        - Zero margin from the top;
        - `20px` margin from the bottom;
        - Italic text style;
        - Text size of `1.5rem`;
        - Text color: `#8C92AC`;
    2. For the `<header>` with the class name `main-header`:
        - A linear gradient for the background image: `linear-gradient(99.9deg, rgba(27,24,31,1) 21.2%, rgba(50,4,89,1) 84.8%)`;
        - Background color: `purple`;
        - Text color: `#fff`;
        - Padding: `2rem` on all sides;
    3. For the element with the class name `avatar-figure`:
        - Background image: `url('images/stars.jpg')`;
        - Background color: `rgb(47, 47, 91)`;
        - Background size: `cover`;
        - Zero margin on all sides;
        - Padding: `1rem` on all sides;
    4. For the `<img>` tag inside the `<figure>` with the class name `avatar-figure`:
        - A solid `3px`-wide border with the color `#fff`;
    5. For the `<ul>` tag with the class name `contacts`:
        - A maximum width of `50%`;
        - Padding: `1rem` on all sides;
        - A solid `3px` wide border with the color `#fff;
        - Text color: `#fff`;
    6. For the `<li>` tag inside the `<ul>` tag with the class name `contacts`:
        - `none` list style;
        - Display type: `inline-block`;
    7. For `<a>` tags with the class name `contact` to a `visited` state, set text color to be `rgb(128, 128, 128)`. Please, use `a.contact:visited` CSS selector.
    8. For `<a>` tags with the class name `contact` to an `active` state, set text color to be `rgb(151, 154, 170)`. Please use the CSS selector `a.contact:active`.
    9. For the `before` presudo-element of a tag with the class name `contact-phone`, set the background to `url('images/phone-call.svg')`. Please use the CSS selector `.contact-phone::before`.
    10. To the `before` presudo-element of a tag with the class name `contact-inst`, set the background to `url('images/instagram-logo.svg')`. Please use the CSS selector `.contact-inst::before`.
    11. To the `before` presudo-element of a tag with the class name `contact-twitter`, setthe  background to `url('images/twitter.svg')`. Please use the CSS selector `.contact-twitter::before`.
    12. For an `<h1>` tag on the page:
        - Botton padding: `30px`;
        - A solid `3px`-wide BOTTOM border with the color `rgb(112, 128, 144)`;
2. **Sections and Section Summary styles:**
    1. For all `<section>` tags, set the padding to `2rem`;
    2. For the `<section>` with the class name `summary`:
        - Padding: `2rem` on all sides;
        - Text shadow: `1px 1px 2px pink`;
    3. For tags with the class name `space`:
        - Background with two images:
            - `url('images/rocket_big.png') no-repeat center`;
            - `url('images/space.jpg') no-repeat bottom center`;
            - Please use the CSS rule `background`. You can use it to set multiple background images. Also, their order matters, so please put them in the order indicated.
        - Make it float left from the text. Find details here: [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float).
        - Width: `8rem`
        - Height: `8rem`
        - Border radius: `50%`
        - Right margin: `15px

3. **Work experience section:**
    1. For the `<section>` with the class name `work-experience`:
        - Top margin: `2rem`;
    2. For a `<table>` element:
        - Table and column widths are set by the widths of the table and `col` elements or by the width of the first row of cells. Cells in subsequent rows do not affect column widths.
        - Width: `100%`
        - Collapsed borders
        - A solid `3px`-wide border with the color `purple`
    3. For the column with the class name `work-experience-years-row`:
        - Width: `15%`
    4. For the column with the class name `work-experience-job-title-row`:
        - Width: `20%`
    5. For the column with the class name `work-experience-comment-row`:
        - Width of `65%`
    6. For all `<th>`:
        - Letter spacing: `2px`; [letter-spacing rule](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)
        - Padding: `20px` on all sides
        - Align text to the left
    7. For all `<td>`:
        - Letter spacing: `1px`; [letter-spacing rule](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing)
        - Padding: `20px` on all sides
        - Align text to the left.
    8. For all `<th>` inside `<tfoot>`:
        - Align text to the right.
    9. For all `<thead>` and `<tfoot>`:
        - Background image: `url('images/leopardskin.jpg')`
        - Text color: `#fff`
        - Text shadow: `1px 1px 1px black`
    10. For a `<caption>`:
        - Padding: `20px` on all sides
        - Place caption at the bottom.
        - Text color: `#666`
        - Italic text style
        - Align text to the right.
        - Letter spacing: `1px`

4. **For a <footer> with the class name `main-footer`:**
    - Background image linear gradient: `linear-gradient(99.9deg, rgba(27,24,31,1) 21.2%, rgba(50,4,89,1) 84.8%)`
    - Background color: `purple`
    - Text color: `#fff`
    - Padding: `2rem` on all sides

