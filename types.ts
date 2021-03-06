export interface Device {
    name: string;
    type: string;
    // status: DeviceStatus;
}

export interface DeviceStatus {
    state: string
    timeStateChanged: Date
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

export enum Devices {
    Switch = 'SWITCH',
    Lock = 'LOCK',
    Dimmer = 'DIMMER',
    Thermo = 'THERMO',
}
