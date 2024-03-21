// Create the socket server types
import { Server, Socket } from "socket.io";
import { Socket as UISocket } from "socket.io-client";

//= ================================types===================================
export type IO = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type ServerSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type ClientSocket = UISocket<ServerToClientEvents, ClientToServerEvents>;

//= ================================interfaces===================================
// sending or broadcasting events from server side
export interface ServerToClientEvents {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  welcome: (msg: string) => void;
  connectedOrNot: (data: { machineMacA: string; isAlive: boolean }) => void;
  perfLoad: (perfLoadData: PerfLoadData) => void;
}

// receiving events on server side
export interface ClientToServerEvents {
  join: (installationId: string, cb: () => void) => void;
  perfLoad: (perfLoadData: PerfLoadData) => void;
  welcomeButton: (msg: string) => void;
  testConnection: (msg: string) => void;
}

// inter server communication
export interface InterServerEvents {
  ping: () => void;
}

// socket.data object on the server side
export interface SocketData {
  email: string;
}

// ----------------------- general interfaces and types------------
export interface PerfLoadData {
  freeMem: number;
  totalMem: number;
  usedMem: number;
  memUsage: number;
  osType: string;
  upTime: number;
  cpuType: string;
  numCores: number;
  cpuSpeed: number;
  cpuLoad: number;
  macA: string;
}

export interface User {
  email: string;
  password: string;
}
