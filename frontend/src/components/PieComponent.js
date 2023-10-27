import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import _ from "lodash";

const PieComponent = ({ data }) => {
  const [sort, setSort] = useState(false);

  // Filter out data with null start_year
  const filteredData = data.filter((item) => item.start_year !== null);

  const start_year = _.uniqBy(filteredData, "start_year");
  let titles = [];
  let filteredDataCount = [];
  start_year.forEach((e) => {
    const count = filteredData.filter(
      (item) => item.start_year === e.start_year
    ).length;
    filteredDataCount.push(count);
    if (e.start_year) {
      titles.push(e.start_year);
    }
  });

  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
  };

  const backgroundColors = filteredDataCount.map(() => generateRandomColor());

  const sortedData = (filter) => {
    const arr = filter.slice().sort((year1, year2) => {
      return parseInt(year1, 10) - parseInt(year2, 10);
    });
    return arr;
  };

  // Define the chart data
  const chartData = {
    labels: sort ? sortedData(titles) : titles, // Titles as labels
    datasets: [
      {
        data: sort ? sortedData(filteredDataCount) : filteredDataCount, // Count of start_year
        backgroundColor: backgroundColors, // Pie slice colors
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    responsive: true,
  };

  return (
    <div className="pie">
      <h2>Start Year Pie Chart</h2>
      <button onClick={() => setSort(!sort)}>{sort ? "Unsort" : "Sort"}</button>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieComponent;