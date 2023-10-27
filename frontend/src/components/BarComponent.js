import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Import this to ensure Chart.js recognizes scale types.
import _ from "lodash";

function BarComponent({ data }) {
  const [sort, setSort] = useState(false);

  const intensityData = _.groupBy(data, "intensity");
  const titles = Object.keys(intensityData);
  const filteredData = Object.values(intensityData).map(
    (group) => group.length
  );

  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 556)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
  };

  const backgroundColors = filteredData.map(() => generateRandomColor());

  const chartData = {
    labels: sort ? _.sortBy(titles) : titles,
    datasets: [
      {
        label: "Intensity",
        data: sort ? _.sortBy(filteredData) : filteredData,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...filteredData) + 1, // Adjust the max value dynamically
      },
    },
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="bar1">
      <h2>Intensity Bar Chart</h2>
      <button onClick={handleSort}>{sort ? "Unsort" : "Sort"}</button>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default BarComponent;