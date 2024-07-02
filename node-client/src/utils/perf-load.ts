import os from "os";
import { getCpuLoad } from "./cpu-load";
import { PerfLoadData } from "./types";

export async function perfLoadData(): Promise<PerfLoadData> {
  // What do we need to know FROM NODE about performance?
  //- host name
  const hostname = os.hostname();
  // - CPU load (current)
  const cpus = os.cpus(); //all cpus as an array
  // - Memory Usage
  // - total
  const totalMem = os.totalmem(); //in bytes
  // - free
  const freeMem = os.freemem(); //in bytes
  // - memory usage
  const usedMem = totalMem - freeMem;
  const memUsage = Math.floor((usedMem / totalMem) * 100) / 100; //2 decimal places
  // console.log(totalMem, freeMem,memUsage)
  // - OS type
  const osType = os.type() === "Darwin" ? "Mac" : os.type();
  // console.log(osType)
  // - uptime
  const upTime = os.uptime();
  // console.log(upTime)
  // - CPU info
  // -Cpu Type
  const cpuType = cpus[0].model;
  // - Number of cores
  const numCores = cpus.length;
  // - Clock Speed
  const cpuSpeed = cpus[0].speed;
  // console.log(cpus)
  // console.log(cpuType,numCores,cpuSpeed);
  const cpuLoad = await getCpuLoad();
  return {
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad,
    macA: "", //The actual value will be socket when socket connects
    hostname,
  };
}
