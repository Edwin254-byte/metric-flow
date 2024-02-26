import { useEffect, useState } from "react";
import "./App.css";
import { Widget } from "./components";
import { PerfLoadData, socket } from "./utils";

interface UIPerfLoad {
  [macA: string]: PerfLoadData;
}

function App() {
  const [perfLoadData, setPerfLoadData] = useState<PerfLoadData>();
  const perfMachineData: UIPerfLoad = {};

  useEffect(() => {
    //listen for perfData
    socket.on("perfLoad", data => {
      // console.log("----incoming perf load data: ", data);
      //one line of data came through for one machine
      //update our LOCAL (non-state) variable, to include that new data
      perfMachineData[data.macA] = data; //this will not cause a re-render
    });
  }, []); //run this once the component has rendered

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("--interval running");
      setPerfLoadData(perfLoadData);
    }, 1000);

    return () => clearInterval(interval);
  }, [perfLoadData]);

  const widgets = perfLoadData && Object.values(perfLoadData).map(d => <Widget perfLoadData={d} key={d.macA} />);

  return <div className="container">{widgets}</div>;
}

export default App;
