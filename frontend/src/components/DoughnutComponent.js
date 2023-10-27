import React, { useState } from "react";
import _ from "lodash";

import { Doughnut } from "react-chartjs-2";

function DoughnutComponent({ data }) {
  const [sort, setSort] = useState(false);

  const country = _.uniqBy(data, "country");
  let titles = [];
  let filteredData = [];
  country.map((e) => {
    const fData = _.filter(data, (item) => item.country);
    const count = _.filter(fData, { country: e.country }).length;
    filteredData.push(count);
    if (e.country) {
      titles.push(e.country);
    } else {
      // titles.push("Null");
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
  // Define the chart data
  const chartData = {
    labels: sort ? sortedData(titles, "string") : titles, // Titles as labels
    datasets: [
      {
        data: sort ? sortedData(filteredData) : filteredData, // Impact values
        backgroundColor: backgroundColors,
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    responsive: true,
    legend: {
      position: "right",
    },
    // max: 0.1,
  };

  return (
    <div className="doughnut">
      <div>
        <h2>Country Chart</h2>
        <button onClick={() => setSort(!sort)}>
          {sort ? "Unsort" : "Sort"}
        </button>

        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default DoughnutComponent;