import os from "os";

//Because the times property on cpus is time since boot, we will get
//now times, and 100ms from "now" times. Compare them, that will give
//us the current load
export function getCpuLoad() {
  return new Promise<number>((resolve, reject) => {
    //call cpuAverage for "now"
    const start = cpuAverage(); //"now" value of load
    setTimeout(() => {
      //call cpuAverage for "end" 100ms after "now"
      const end = cpuAverage(); //"end" value of load
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      // console.log(idleDiff,totalDiff)
      // calculate the % of the used cpu
      const percentOfCpu = 100 - Math.floor((100 * idleDiff) / totalDiff); //%
      resolve(percentOfCpu);
    }, 100);
  });
}

export function cpuAverage() {
  const cpus = os.cpus();

  //cpus is an array of all cores. We need the average of all the cores which
  //will give us the cpu average.
  let totalMs = 0; //total milliseconds
  let idleMs = 0; //idle milliseconds
  os.cpus().forEach(cpu => {
    //we need all modes for this core added to totalMs
    totalMs = Object.values(cpu.times).reduce((prev, cur) => prev + cur, totalMs);
    //we need idle mode for this core added to idleMs
    idleMs += cpu.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}
