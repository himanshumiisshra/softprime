import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import _ from "lodash";

function LineComponents({ data }) {
  const [sort, setSort] = useState(false);

  const relevanceData = _(data)
    .filter((item) => item.end_year !== null) // Filter out items with end_year not equal to null
    .groupBy("end_year")
    .value();
  const labels = Object.keys(relevanceData);
  const dataPoints = Object.values(relevanceData).map((group) => group.length);

  const sortedData = Object.keys(relevanceData).sort((year1, year2) => {
    const length1 = relevanceData[year1].length;
    const length2 = relevanceData[year2].length;

    return length1 - length2;
  });

  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 556)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
  };

  const backgroundColors = labels.map(() => generateRandomColor());

  const chartData = {
    labels: sort ? sortedData : labels,
    datasets: [
      {
        label: "End Year",
        data: sort ? _.sortBy(dataPoints) : dataPoints,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const chartOptions = {
    scale: {
      angleLines: {
        display: true,
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: Math.max(...dataPoints) + 1,
      },
    },
  };

  return (
    <div className="line2">
      <h2>End Year Line Chart</h2>
      <button onClick={() => setSort(!sort)}>{sort ? "Unsort" : "Sort"}</button>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default LineComponents;