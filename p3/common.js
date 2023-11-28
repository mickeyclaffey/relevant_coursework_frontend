// common.js: things possibly useful across p3
// Copyright (C)  2023 University of Chicago. All rights reserved.
/*
This is only for students and instructors in the 2023 CMSC 23900 ("DataVis") class, for use in that
class. It is not licensed for open-source or any other kind of re-distribution. Do not allow this
file to be copied or downloaded by anyone outside the 2023 DataVis class.
*/
'use strict';

// import and then export d3.
import * as d3 from './d3.js';
export { d3 };

// parameters that control geometry and appearance
export const parm = {
  transDur: 230, // duration of all transition()s
  circRad: 6, // size of circle marks in scatterplot
  scatSize: 350, // width and height of scatterplot
  scatMarg: 30, // margin around scatterplot
  scatTweak: 7, // tweak to text label positions
  colorDem: d3.rgb(40, 50, 255), // color showing pure democratic vote
  colorRep: d3.rgb(230, 30, 20), // color showing pure democratic vote
  hexWidth: 52, // size of individual hexagons in US map
  hexScale: 1,  // hexagon scaling; 1 = edges touching
  // v.v.v.v.v.v.v.v.v.v.v.v.v.v.v  begin student code (common parm)
  // ^'^'^'^'^'^'^'^'^'^'^'^'^'^'^  end student code (0L in ref)
};

/* global bag of state; could be called "state" but that could be confusing with a US "state". The
  description "global bag of state" is a hint that this is not the cleanest design :) */
export const glob = {
  csvData: {}, // the results of d3.csv() data reads
  /* how the colormap mode is described in the UI.  NOTE: these identifiers
    'RVD', 'PUR', 'LVA' will not change; feel free to use them as magic constant strings throughout
    your code */
  modeDesc: {
    RVD: 'red/blue',
    PUR: 'purple',
    LVA: 'lean-vs-amount',
  },
  currentMode: null, // colormapping mode currently displayed
  currentYear: null, // election year currently displayed
  currentAbbrHide: false, // whether to hide state abbreviations in US map (toggled by 'd')
  scatContext: null, // "context" of scatterplot image canvas
  scatImage: null,   // underlying RGBA pixel data for scatterplot image canvas
  // v.v.v.v.v.v.v.v.v.v.v.v.v.v.v  begin student code (common glob)
  // ^'^'^'^'^'^'^'^'^'^'^'^'^'^'^  end student code (1L in ref)
}

// little utility functions, use or not as you see fit
export const lerp3 = function (a, b, w) {
  return (1 - w) * a + w * b;
};
export const lerp5 = function (y0, y1, x0, x, x1) {
  const w = (x - x0) / (x1 - x0);
  return (1 - w) * y0 + w * y1;
};
export const clamp = function (a, v, b) {
  return v < a ? a : v > b ? b : v;
};

// define, and export, anything else here that you want to use in p3
// v.v.v.v.v.v.v.v.v.v.v.v.v.v.v  begin student code (new in common)
// ^'^'^'^'^'^'^'^'^'^'^'^'^'^'^  end student code (0L in ref)
