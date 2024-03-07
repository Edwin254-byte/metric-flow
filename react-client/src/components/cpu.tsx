import { useRef } from "react";
import { drawCircle } from "../utils";

export function Cpu(props: { cpuLoad: number }) {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  drawCircle(canvasEl.current, props.cpuLoad);

  return (
    <div className="cpu col-3">
      <h3>CPU Load</h3>
      <div className="canvas-wrapper">
        <canvas ref={canvasEl} className="" width="200" height="200"></canvas>
        <div className="cpu-text">{props.cpuLoad}</div>
      </div>
    </div>
  );
}
