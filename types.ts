export type DeviceFields = { name: unknown, type: unknown };


export interface Device {
    name: string;
    type: string;
}

export interface Switch extends Device {
    state: string;
}

export interface Dimmer extends Device {
    level: number;
}

export interface Thermo extends Device {
    mode: string;
    temp: number;
}

export interface Lock extends Device {
    locked: boolean;
    codes: string[];
}

export interface DeviceList {
    switches: Switch[];
    dimmers: Dimmer[];
    locks: Lock[];
    thermostats: Thermo[];
}


export interface DeviceArray {
   deviceArray: (Thermo | Switch | Dimmer | Lock)[]
}

export interface IColumn {
    id: string;
    title: string;
    task: [];
}

export enum Devices {
    Switch = 'SWITCH',
    Lock = 'LOCK',
    Dimmer = 'DIMMER',
    Thermo = 'THERMO',
}

export interface DeviceColumn {
    id: string
    title: string,
    devices: Device[]
}