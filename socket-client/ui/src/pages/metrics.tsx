import { useEffect, useState } from "react";

import { Widget } from "../components";
import { PerfLoadData, socket } from "../utils";

interface UIPerfLoad {
  [macA: string]: PerfLoadData;
}
export function MetricsPage() {
  const [perfLoadData, setPerfLoadData] = useState<UIPerfLoad>({});

  useEffect(() => {
    // Listen for perfData
    socket.on("perfLoad", data => {
      // Update the state with the new data
      setPerfLoadData(prevData => ({
        ...prevData,
        [data.macA]: data,
      }));
    });

    return () => {
      // Clean up the socket listener
      socket.off("perfLoad");
    };
  }, []); // Run this once the component has rendered

  const widgets = Object.values(perfLoadData).map(d => <Widget perfLoadData={d} key={d.macA} />);

  return <>{widgets && widgets.length > 0 ? <div className="container">{widgets}</div> : <h2>No widgets</h2>}</>;
}
