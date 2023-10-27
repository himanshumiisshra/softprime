import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const Graph = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load JSON data
    const fetchData = async () => {
      await axios
        .get("http://localhost:8080/api/data")
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);
  console.log(data);
  useEffect(() => {
    // Set up chart dimensions
    const margin = { top: 40, right: 30, bottom: 80, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.title))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)])
      .nice()
      .range([height, 0]);

    // Create bars
    const bars = svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.title))
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", "steelblue");

    // Add animations
    bars
      .transition()
      .duration(1000) // Animation duration in milliseconds
      .attr("y", (d) => yScale(d.intensity))
      .attr("height", (d) => height - yScale(d.intensity));

    // Add x-axis
    // svg
    //   .append("g")
    //   .attr("class", "x-axis")
    //   .attr("transform", `translate(0,${height})`)
    //   .call(d3.axisBottom(xScale).tickSize(0));

    // Add y-axis
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale).ticks(5));

    // Add chart title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .text("Intensity of Economic Impact");

    // Add chart description
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom / 2)
      .attr("text-anchor", "middle")
      .text("Title of Events");

    // Ensure proper cleanup when component unmounts
    return () => {
      d3.selectAll("svg").remove();
    };
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default Graph;