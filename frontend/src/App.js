import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import Layout from "./components/basic/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import BarComponents from "./components/BarComponents";
import PieComponent from "./components/PieComponent";
import LineComponents from "./components/LineComponents";
import DoughnutComponent from "./components/DoughnutComponent";
import RadarComponent from "./components/RadarComponent";
import PolarComponent from "./components/PolarComponent";


function App() {
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
  return (
    <div>
     
    <div className="App">
    <Layout/> 
   <BarComponents data={data} />
        <PieComponent data={data} />
        <LineComponents data={data} />
        <DoughnutComponent data={data} />
        <RadarComponent data={data} />
        <BarComponents data={data} />
        <PolarComponent data={data} />
        <LineComponents data={data} />
    </div>
    </div>
  );
}

export default App;
