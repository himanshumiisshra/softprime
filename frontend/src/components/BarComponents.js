import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Import this to ensure Chart.js recognizes scale types.
import _ from "lodash";

function BarComponents({ data }) {
  // Define the chart data
  const [sort, setSort] = useState(false);

  const region = _.uniqBy(data, "region");
  let titles = [];
  let filteredData = [];
  region.map((e) => {
    const fData = _.filter(data, (item) => item.region);
    const count = _.filter(fData, { region: e.region }).length;
    filteredData.push(count);
    if (e.region) {
      titles.push(e.region);
    }
  });

  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 556)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
  };

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

  const backgroundColors = filteredData.map(() => generateRandomColor());

  useEffect(() => {}, [data]);

  const chartData = {
    labels: sort ? sortedData(titles, "string") : titles,
    datasets: [
      {
        label: "Region",
        data: sort ? sortedData(filteredData) : filteredData,
        backgroundColor: backgroundColors, // Bar color
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 150, // You can adjust the max value if needed
      },
    },
  };
  return (
    <div className="bar2">
      <h2>Region Bar Chart</h2>
      <button onClick={() => setSort(!sort)}>{sort ? "Unsort" : "Sort"}</button>

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default BarComponents;