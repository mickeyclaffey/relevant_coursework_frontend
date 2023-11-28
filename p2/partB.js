// partB.js: p2 partB: make your own visualization of Nightingale data
// Copyright (C)  2023 University of Chicago. All rights reserved.
/*
This is only for students and instructors in the 2023 CMSC 23900 ("DataVis") class, for use in that
class. It is not licensed for open-source or any other kind of re-distribution. Do not allow this
file to be copied or downloaded by anyone outside the 2023 DataVis class.
*/
'use strict';
import {
  // what else do you want to import from common.js?
  // v.v.v.v.v.v.v.v.v.v.v.v.v.v.v  begin student code (partB imports)
  fnColor, dataProc, outColor, capsMonth,
  // ^'^'^'^'^'^'^'^'^'^'^'^'^'^'^  end student code (1L in ref)
  d3,
} from './common.js';

// new things you might want to use for partB()
// v.v.v.v.v.v.v.v.v.v.v.v.v.v.v  begin student code (partB new)
// ^'^'^'^'^'^'^'^'^'^'^'^'^'^'^  end student code (0L in ref)

export const partB = (id, csvData) => {
  const svg = d3.select(`#${id}`);
  // v.v.v.v.v.v.v.v.v.v.v.v.v.v.v  begin student code (partB code)
  // plan for part B: one bar chart
  // the bar chart has months on the x axis and death rates on the y axis
  // the bars show different types of deaths in a stacked manner
  // the death from disease will be counted from the y axis, but the other deaths will just be stacked on top of those
  const data = dataProc(csvData);

  // using the same background and colors because why not
  svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 1100)
    .attr("height", 601)
    .attr("fill", fnColor.bkgd);
  // defining
  const marg = 100;
  const width = parseFloat(svg.style('width'));
  const height = parseFloat(svg.style('height'));
  const sums = data.map((d) => d.zNum + d.wNum + d.oNum);
  const maxNum = d3.max(data.map((d) => Math.max(...sums)));
  const months = data.map((d) => `${d.month} ${d.year}`);
  const xScale = d3
    .scaleLinear()
    .domain([0, maxNum])
    .range([0, width - 2 * marg]);
  const yScale = d3
    .scaleBand()
    .domain(months)
    .range([0, height / 2])
    .padding(0.1);
  const rgb = [
    //using the outline colors because they pop more
    outColor.blue, // diseases
    outColor.pink, // wounds
    outColor.gray, // other
  ];
  
  const stackGen = d3.stack().keys(['zNum', 'wNum', 'oNum']);
  const stackSeries = stackGen(data);
  console.log(stackSeries);
  console.log(months);
  
  const chart = svg // the graph!
    .append('g')
    .attr('transform', `translate(${marg},${(0 * height) / 3 + marg})`);
  chart
    .append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height / 2})`)
    .call(d3.axisBottom(xScale));
  chart
    .append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickPadding(8))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'translate(10, 0)');
  
  chart
    .append('g')
    .selectAll('g')
    .data(stackSeries)
    .enter()
    .append('g')
    .attr('fill', (d, i) => rgb[i])
    .selectAll('rect')
    .data((d) => d)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(d[0]))
    .attr('y', (d, i) => yScale(months[i]))
    .attr('height', yScale.bandwidth())
    .attr('width', (d) => xScale(d[1]) - xScale(d[0]));
  
  chart
    .append('text')
    .attr('transform', `translate(${width / 2},${-50})`)
    .attr('text-anchor', 'middle')
    .text('DIAGRAM of the CAUSES of MORTALITY in the ARMY in the EAST');
  // x axis label
  chart
    .append('text')
    .attr('transform', `translate(${width / 2},${height / 2 + 50})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '18px')
    .text('Number of Deaths (Quantity Beginning from End of Previous Bar)');
  // y axis label
  chart
    .append('text')
    .attr('transform', `translate(${-80},${(height / 4)+20}) rotate(-90)`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '18px')
    .text('Month');
  // legend
  const legend = svg
    .append('g')
    .attr('transform', `translate(${marg},${(2 * height) / 3 + marg})`);
  legend
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', outColor.blue);
  legend
    .append('text')
    .attr('x', 30)
    .attr('y', 15)
    .attr('text-anchor', 'start')
    .attr('font-size', '14px')
    .text('Zymotic Diseases');
  legend
    .append('rect')
    .attr('x', 0)
    .attr('y', 30)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', outColor.pink);
  legend
    .append('text')
    .attr('x', 30)
    .attr('y', 45)
    .attr('text-anchor', 'start')
    .attr('font-size', '14px')
    .text('Wounds and Injuries');
  legend
    .append('rect')
    .attr('x', 0)
    .attr('y', 60)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', outColor.gray);
  legend
    .append('text')
    .attr('x', 30)
    .attr('y', 75)
    .attr('text-anchor', 'start')
    .attr('font-size', '14px')
    .text('Other Causes');
  // add annotation just to the right of the the may 1854 bar
  chart
    .append('text')
    .attr('x', xScale(d3.sum(data.filter(d => d.month === 'MAY' && d.year === 1854), d => d.zNum + d.wNum + d.oNum))+5)
    .attr('y', yScale('MAY 1854') + yScale.bandwidth()*(4/5))
    .attr('font-size', '12px')
    .attr('font-style', 'italic')
    .text('Batle of Alma');
  // add annotation just to the right of the november 1854 bar
  chart
    .append('text')
    .attr('x', xScale(d3.sum(data.filter(d => d.month === 'NOVEMBER' && d.year === 1854), d => d.zNum + d.wNum + d.oNum))+5)
    .attr('y', yScale('NOVEMBER 1854') + yScale.bandwidth()*(4/5))
    .attr('font-size', '12px')
    .attr('font-style', 'italic')
    .text('Florence Nightingale arrives in Scutari');
  chart
    .append('text')
    .attr('x', xScale(d3.sum(data.filter(d => d.month === 'JANUARY' && d.year === 1855), d => d.zNum + d.wNum + d.oNum))+5)
    .attr('y', yScale('JANUARY 1855') + yScale.bandwidth()*(4/5))
    .attr('font-size', '12px')
    .attr('font-style', 'italic')
    .text('Siege of Sevastopol');
  chart
    .append('text')
    .attr('x', xScale(d3.sum(data.filter(d => d.month === 'AUGUST' && d.year === 1855), d => d.zNum + d.wNum + d.oNum))+5)
    .attr('y', yScale('AUGUST 1855') + yScale.bandwidth()*(4/5))
    .attr('font-size', '12px')
    .attr('font-style', 'italic')
    .text('Battle of Chernaya River');
  chart
    .append('text')
    .attr('x', xScale(d3.sum(data.filter(d => d.month === 'MARCH' && d.year === 1856), d => d.zNum + d.wNum + d.oNum))+5)
    .attr('y', yScale('MARCH 1856') + yScale.bandwidth()*(4/5))
    .attr('font-size', '12px')
    .attr('font-style', 'italic')
    .text('Treaty of Paris');

   /* const may1854X = xScale(data.filter(d => d.month === 'May' && d.year === 1854)[0].zNum); // get the x position of the May 1854 bar
    const annotationText = 'First month of the war'; // the text you want to add as the annotation
    const annotationY = yScale('May 1854') + yScale.bandwidth() / 2; // the y position of the annotation
    const annotationX = may1854X + 10; // the x position of the annotation, offset by 10 pixels to the right of the May 1854 bar
    
    chart
      .append('text')
      .attr('x', annotationX)
      .attr('y', annotationY)
      .attr('dy', '0.35em')
      .attr('font-size', '12px')
      .text(annotationText);*/

// select all the existing labels
/*const labels = chart.selectAll(".label");

// add annotations to the labels
labels.append("tspan")
  .attr("x", function(d) { return x(d.deaths) + width/2; })
  .attr("y", function(d) { return y(d.month) + y.bandwidth() + 15; })
  .text(function(d) { return d.month; });

// add specific annotations to the labels
labels.filter(function(d) { return d.month === "November"; })
  .append("text")
  .attr("x", function(d) { return x(d.deaths) + width + 10; })
  .attr("y", function(d) { return y(d.month) + y.bandwidth()/2; })
  .text("Florence Nightingale arrives in Scutari")
  .attr("font-size", "12px")
  .attr("font-style", "italic");

labels.filter(function(d) { return d.month === "March"; })
  .append("text")
  .attr("x", function(d) { return x(d.deaths) + width + 10; })
  .attr("y", function(d) { return y(d.month) + y.bandwidth()/2; })
  .text("Treaty of Paris signed")
  .attr("font-size", "12px")
  .attr("font-style", "italic");*/

  // ^'^'^'^'^'^'^'^'^'^'^'^'^'^'^  end student code (70L in ref)
};
