import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { easeCubicInOut } from 'd3-ease';

import animate from '../animate'
import './barchart.css';

// import dataTsv from './data';

const data = [
    { time: 18, frequency: 0 },
    { time: 19, frequency: 0 },
    { time: 20, frequency: 5 },
    { time: 21, frequency: 0 },
    { time: 22, frequency: 3 },
    { time: 23, frequency: 23 },
    { time: 24, frequency: 5 },
    { time: 1, frequency: 2 },
    { time: 2, frequency: 0 },
    { time: 3, frequency: 1 },
    { time: 4, frequency: 0 },
    { time: 5, frequency: 0 },
    { time: 6, frequency: 0  },
]

const svgWidth = 960,
    svgHeight = 500;

const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

const x = scaleBand()
    .rangeRound([0, width])
    .padding(0.1),
    y = scaleLinear()
        .range([height, 0])

// The original data to be animated to
// const originalData = data.map(d => {
//     d.frequency = +d.frequency
//     return d
// })

x.domain(data.map(d => d.time));
y.domain([0, max(data, d => d.frequency)]);

const Bar = ({ data }) => (
    <svg width={svgWidth} height={svgHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g
                className="axis axis--x"
                transform={`translate(0, ${height})`}
                ref={node => select(node).call(axisBottom(x))}
            />
            <g className="axis axis--y">
                <g ref={node => select(node).call(axisLeft(y))} />
                <text transform="rotate(-90)" y="6" dy="0.71em" textAnchor="end">
                    Frequency
        </text>
            </g>
            {data.map(d => (
                <rect
                    key={d.time}
                    className="bar"
                    x={x(d.time)}
                    y={y(d.frequency)}
                    width={x.bandwidth()}
                    height={height - y(d.frequency)}
                />
            ))}
        </g>
    </svg>
);

const easeData = (data, t) => {
    return data.map(x => ({
        time: x.time,
        frequency: x.frequency * easeCubicInOut(t),
    }));
};

export default animate(Bar, {
    easeData,
    duration: 500,
    delay: 500,
    interval: 10,
    data: data,
});