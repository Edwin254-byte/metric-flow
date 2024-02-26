import { useEffect, useState } from "react";
import { PerfLoadData, socket } from "../utils";
import { Cpu } from "./cpu";
import { Info } from "./info";
import { Mem } from "./mem";
import "./widget.css";

export function Widget(props: { perfLoadData: PerfLoadData }) {
  const [isAlive, setIsAlive] = useState(true);
  const { perfLoadData } = props;

  const notAliveDiv = !isAlive ? <div className="not-active">Offline</div> : <></>;

  useEffect(() => {
    socket.on("connectedOrNot", ({ isAlive, machineMacA }) => {
      //connectedOrNot does NOT mean THIS client has disconnected (or reconnected)
      //it is for one of the nodeClients that is ticking
      //we need a new event for that, because that nodeClient has stopped ticking
      if (machineMacA === perfLoadData.macA) {
        setIsAlive(isAlive); //true or false, update isAlive
      }
    });
  }, [perfLoadData.macA]);

  return (
    <div className="widget row justify-content-evenly">
      {notAliveDiv}
      <Cpu cpuLoad={perfLoadData.cpuLoad} />
      <Mem perfLoadData={perfLoadData} />
      <Info perfLoadData={perfLoadData} />
    </div>
  );
}
