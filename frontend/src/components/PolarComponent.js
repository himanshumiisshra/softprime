import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import "chart.js/auto";
import _ from "lodash";

function PolarComponent({ data }) {
  const [chartData, setChartData] = useState(null);
  const [sort, setSort] = useState(false);

  let dataPoints; // Define dataPoints variable

  useEffect(() => {
    if (data && data.length > 0) {
      const relevanceData = _.groupBy(data, "pestle");
      const labels = Object.keys(relevanceData);
      dataPoints = Object.values(relevanceData).map((group) => group.length);
      const backgroundColors = labels.map(
        () =>
          `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 0.6)`
      );
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

      const chartData = {
        labels: sort ? sortedData(labels, "string") : labels,
        datasets: [
          {
            data: sort ? sortedData(dataPoints) : dataPoints,
            backgroundColor: backgroundColors,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [data, sort]);

  const chartOptions = {
    scale: {
      angleLines: {
        display: true,
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 1,
      },
    },
  };

  return (
    <div className="polar">
      <h2>Pestle Polar Chart</h2>
      <button onClick={() => setSort(!sort)}>{sort ? "Unsort" : "Sort"}</button>

      {chartData && <PolarArea data={chartData} options={chartOptions} />}
    </div>
  );
}

export default PolarComponent;