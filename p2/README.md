## P2: Working with Florence Nightingale's visualization and its data

In this project you will:

- Part A: Recreate [Florence Nightingale](https://en.wikipedia.org/wiki/Florence_Nightingale)'s [famous visualization of causes of death in the British army](https://en.wikipedia.org/wiki/Florence_Nightingale#Statistics_and_sanitary_reform) during the [Crimean War](https://en.wikipedia.org/wiki/Crimean_War)
- Part B: Create your own visualization of the same data, which should work to support the same judgements and conclusions that Nightingale seemed to have in mind with her visualization, but in your own createive way.

Both parts are should be viewable with a web browser serving index.html (part A on top, part B below), and both parts use D3 to visualize the data in nightingale.csv (thanks to https://understandinguncertainty.org/node/214 for organizing this data in an electronic form). Grading will involve modifying the data to ensure that your visualization changes. These data modifications will not change the number of rows, the names of the columns, or the contents of the first two columns (month and year). Only the remaining numbers could change, but they would only change within the numeric ranges already present, and only in a self-consistent way (considering that half the columns are found by arithmetic on other columns).

**The code you write should have comments** to document that **you** wrote this code, and that you wrote it with thoughtful intent. Comments should answer: what is the code doing, and how? Imagine that the reader is another person in the class but who hasn't worked on p2, and help them follow along with what you are doing. Also, you will not be the first to use D3 to visualize this data; the graders can find and compare your code to previous implementations.

Besides filling in partA.js and partB.js as described below, there are also student code blocks that you may want to add to in common.js (for things common to both parts) and index.html. You should not need to modify any files other than index.html, common.js, and partA.js, and partB.js. Respect the ES6 module structure that is already in the distributed files, working within the student code blocks. **No other imports of other JS modules besides D3 are allowed.**

### Part A (partA.js)

In partA.js you flex your D3 skills by recreating Nightingale's visualization. Here are some images and descriptions of the visualization for reference:

- [From wikimedia](https://commons.wikimedia.org/wiki/File:Nightingale-mortality.jpg)
- [This tweet from the Royal College of Nursing Libraries](https://twitter.com/RCNLibraries/status/1096079180561874944) shows the visualization (and the underlying data) as a fold-out in something Nightingale [wrote about sanitation](https://books.google.com/books?id=XxraAgAAQBAJ).
- Wikipedia's short but useful description of the [polar area diagram](https://en.wikipedia.org/wiki/Pie_chart#Polar_area_diagram).

Your recreation should copy (within reason) the layout, encoding, content, and over-all appearance of [the original](https://commons.wikimedia.org/wiki/File:Nightingale-mortality.jpg):

- The two charts should roughly match the scale and spacing of the two in Nightingale's original diagram (April 1855 to March 1856 on left, April 1854 to March 1855 on right).
- The two plots should have circular wedges as in her design, sized according to the data, and filled with colors matching her design (see fnColor in common.js). Note that the wedges in her design can occlude each other (they are overlapping).
- The two plots should have black, red, and blue outlines around the wedges, that are at least as visible as in her design. These outlines permit seeing the shape of occluded wedges.
- The rule for how she chose which wedges should be on top (or in modern speak, their drawing order) is not apparent to GLK, but generally she has smaller wedges on top of larger wedges (with the explicitly noted exception of November 1854). Copying her exact pattern of overlap for the smallest wedges on the left is not required, but the visual impression of the plot should be basically the same (and copy what she did for November 1854)
- The wedges should be labeled by the month (full name) and year as in her design, but you don't have to rotate or wrap the text circularly around the wedges. The month label position should change if the data values change, while avoiding having the labels overlap when the values for a month are very small (perhaps set a minimum radius).

The two plots, and the over-all diagram, should be labeled and annotated as in her design (including the paragraph of text about how to interpret the diagram), but you can use the same font throughout. Scale the font sizes so that the text fills about the same space. You can skip the "BULGARIA" and "CRIMEA" labels. Btw: "[Zymotic disease](https://en.wikipedia.org/wiki/Zymotic_disease)" is what we'd today call infectious disease.

In the whole-class svn repo, view the datavis23/work/p2/p2-example.html of how GLK's code does partA. **Your goal is to match [Nightingale's orginal visualization](https://commons.wikimedia.org/wiki/File:Nightingale-mortality.jpg)**, not to copy this particular implementation.

### Part B (partB.js)

With partB.js you make a new visualization that investigates the same questions and motivation as Nightingale had in mind when she created hers, and then write up (in a **new file partB.pdf**) an explanation and justification of your design.

Nightingale's visualization is a famous but (GLK believes) often misunderstood visualization. Here are good sources of information about it and its political and social context:

- (required) [An episode of Tim Harford's Cautionary Tales Podcast](https://timharford.com/2021/03/cautionary-tales-florence-nightingale-and-her-geeks-declare-war-on-death/) I trust Harford's account of the purpose that Nightingale had in making the visualization, the conditions she was working in, and (at the end) how a new visualization may not be as effective for Nightingale's purpose now as her visualization was then. This is required listening.
- [This Guardian article](https://www.theguardian.com/news/datablog/2010/aug/13/florence-nightingale-graphics) contains a summary and good links for further (optional) reading.

The constraints on your new visualization are few:

- The layout or encoding should support visually estimating the numbers in the data. The visualization should have a title, axes should be labeled, and encodings should be documented with a legend or key.
- There must be continuity of layout (and consistency of encoding) between March and April 1855 (unlike in the original).
- However you are showing time, you should annotate the important event(s) that likely had an effect on sanitation (according to the podcast).
- Your vis must be within the given partB svg, and its particular aspect ratio.

To accompany part B, write a short (three or four paragraphs, no more than a page) explanation and justification for your design, in a file called partB.pdf, covering:

- How did you choose to use layout and encoding to show the data? Did you consider any design alternatives?
- How does your design compare in effectiveness to Nightingale's for showing patterns in the data (such as: the ordinal relationships between the different causes of death, or the ratio relationships between them, or how these changed over time)?
- How effective is your vis as a tool of advocacy for Nightingale's cause, or, does it undermine her cause?
- Document any other resources or people that you used to get this done.

To get you started, look in the whole-class svn repo datavis23/work/p2/partB-example.js as one way of starting to read in and visualize the data (this may be useful for your partA work). However, this is not an acceptable visualization, given the partB constraints above.
