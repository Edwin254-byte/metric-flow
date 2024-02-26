import os from "os";

export function getMac(networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]>) {
  const nI = networkInterfaces;
  let mac = "";
  for (const key in nI) {
    const nonInternalInterface = nI[key] && !nI[key]?.[0].internal;
    if (nonInternalInterface) {
      mac = `${nI[key]?.[0].mac}`;
      break;
    }
  }
  return mac;
}
