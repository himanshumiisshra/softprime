import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import _ from "lodash";

function RadarComponent({ data }) {
  const [sort, setSort] = useState(false);

  const relevanceData = _.groupBy(data, "relevance");
  const labels = Object.keys(relevanceData);
  const dataPoints = Object.values(relevanceData).map((group) => group.length);

  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 556)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
  };

  const backgroundColors = labels.map(() => generateRandomColor());

  const sortedData = Object.keys(relevanceData).sort((year1, year2) => {
    const length1 = relevanceData[year1].length;
    const length2 = relevanceData[year2].length;

    return length1 - length2;
  });

  const chartData = {
    labels: sort ? sortedData : labels,
    datasets: [
      {
        label: "Relevance",
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
    <div className="radar">
      <h2>Relevance Radar Chart</h2>
      <button onClick={() => setSort(!sort)}>{sort ? "Unsort" : "Sort"}</button>

      <Radar data={chartData} options={chartOptions} />
    </div>
  );
}

export default RadarComponent;