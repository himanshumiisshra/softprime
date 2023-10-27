import React, { useState } from "react";
import { Pie, Line, Bubble, Radar } from "react-chartjs-2";
import _ from "lodash";

function LineComponent1({ data }) {
  const [sort, setSort] = useState(false);

  const topic = _.uniqBy(data, "topic");
  let titles = [];
  let filteredData = [];
  topic.map((e) => {
    const fData = _.filter(data, (item) => item.topic);
    const count = _.filter(fData, { topic: e.topic }).length;
    filteredData.push(count);
    if (e.topic) {
      titles.push(e.topic);
    }
  });

  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 556)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
  };

  const backgroundColors = filteredData.map(() => generateRandomColor());

  const sortedData = (filter, s) => {
    if (s === "string") {
      const arr = filter.slice().sort((item1, item2) => {
        return item1.localeCompare(item2); // Use localeCompare for alphabetical sorting
      });
      return arr;
    }
    const arr = filter.slice().sort((year1, year2) => {
      return parseInt(year1, 10) - parseInt(year2, 10);
    });
    console.log(arr);
    return arr;
  };

  // Define the chart data
  console.log(filteredData);
  const chartData = {
    labels: sort ? sortedData(titles, "string") : titles,
    datasets: [
      {
        label: "Topic",
        data: sort ? sortedData(filteredData) : filteredData, // Intensity values
        backgroundColor: backgroundColors, // Pie slice colors
        borderWidth: 2, // Line width
        fill: false, // Do not fill the area under the line
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // You can adjust the max value if needed (Likelihood scale typically goes from 0 to 5)
      },
    },
  };

  return (
    <div className="line-1">
      <h2>Topic Line Chart</h2>
      <button onClick={() => setSort(!sort)}>{sort ? "Unsort" : "Sort"}</button>

      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default LineComponent1;