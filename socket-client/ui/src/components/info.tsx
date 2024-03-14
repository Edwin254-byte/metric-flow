import moment from "moment";
import { PerfLoadData } from "../utils";

export function Info(props: { perfLoadData: PerfLoadData }) {
  const { osType, upTime, cpuType, numCores, cpuSpeed } = props.perfLoadData;
  return (
    <div className="col-sm-3 col-sm-offset-1 cpu-info">
      <h3>Operating System</h3>
      <div className="widget-text">{osType}</div>
      <h3>Time Online</h3>
      <div className="widget-text">{moment.duration(upTime).humanize()}</div>
      <h3>Processor information</h3>
      <div className="widget-text">
        <strong>Type:</strong> {cpuType}
      </div>
      <div className="widget-text">
        <strong>Number of Cores:</strong> {numCores}
      </div>
      <div className="widget-text">
        <strong>Clock Speed:</strong> {cpuSpeed}
      </div>
    </div>
  );
}
