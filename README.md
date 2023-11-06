# CSS Animations

## Before we start

1. This practical task is verified automatically with tests. 
2. Please, put all your `HTML` code in the `src/index.html` file. If you use any other file, we would not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](./docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](./docs/VerifySolutionLocally.md).

## Task Requirements

In this task you will be proposed to apply transform and transition properties to different html elements on the page. Read carefully which properties should be applied to each element, don’t add unnecessary ones

Please, note you MUST add all CSS rules in the `src/style.css` file and not change the `src/index.html` file. We can't verify your solution if you use a different file.

On index.html page you can see 10 blocks. On each of these blocks you should apply proper animation CSS properties as listed below. Please to not use animation shorthand property, write each animation property separetly:
1.	Create animation called "bgcolor" and bind it to the first block. This animation should last for 5 seconds, and gradually change the background-color of the block from "#ff5733" to "#3393ff"
2.	Create animation called "bgcolor2" and bind it to the second block. This animation should last for 4 seconds, and gradually change the background-color of the block accroding to the following rules:
        0% color "#3393ff"
        50% animation  color "#33ff42"
        100% color "#30b851"
3. Create animation called "blockmove" and bind it to the third block. This animation should last 6 seconds and gradually change the position of the block according to the following rules:
        0% position - top=0, left=0
        25% animation position - left=320px top=0px;
        50% animation position - left=320px top=320px;
        75% animation position - left=0px top=320px;
        100% animation position - left=0px top=0px;
4. Create animation called "blockcolormove" and bind it to the fourth block. This animation should last 5 seconds, start with 300ms delay, repeat animation steps 5 times and gradually change the position and background color of the block according to the following rules:
        start background color - "#33fffc"; position - top=0, left=0       
        50% background color - "#30b851"; animation position - left=300px top=300px;      
        100% background color - "#33fffc"; position - top=0, left=0  
5. Create animation called "showhide" and bind it to the fifth block. This animation should last 1 seconds, should repeat all the time, and change opacity property from 1 to 0
6. Use already created "blockmove" animation, bind it to the sixth block. Make this animation to last 5 seconds and be reversed
7. Use already created "blockcolormove" animation, bind it to the seventh block. Make this animation to last 2 seconds, to be played infinite times and make the animation run backwards first, then forwards
8. Create animation called "moveleft" and bind it to the eigth block. Make this animation to last 5 second and change position left property from 0 to 300px
9. Use already created "moveleft" animation, bind it to the ninth block. Make this animation to last 5 second and to be with the same speed from start to end
10. Use already created "moveleft" animation, bind it to the tenth block. Make this animation to last 5 second and to be with a slow end and the block will retain the style values that is set by the last keyframe

