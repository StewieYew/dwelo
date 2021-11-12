import { Device, DeviceList, Devices, Dimmer, Lock, Switch, Thermo } from "./types";

 export const toNewDeviceArray = (value: unknown) => {
        let devices: Device[] = [];
        if (Array.isArray(value)) {
            value.forEach(value => {
                if (isDevice(value)) {
                    devices.push(value)
                } else throw new Error (`${value} is not a device`);
            });
        } else {
            throw new Error('invalid data or something went wrong');
        }
     const deviceList = createDeviceList(devices);
     return deviceList;
    }
    


 const createDeviceList = (arrayOfDevices: Device[]): DeviceList => {
     const deviceList: DeviceList = {
         switches: [],
         locks: [],
         dimmers: [],
         thermostats: []
     };

     arrayOfDevices.forEach(device => {
         switch (device.type.toUpperCase()) {
             case Devices.Switch: {
                 if (isSwitch(device)) {
                     deviceList.switches.push(device)
                 }
                 break;
             }
             case Devices.Lock: {
                 if (isLock(device)) {
                     deviceList.locks.push(device)
                 } break;
             }
             case Devices.Dimmer: {
                 if (isDimmer(device)) {
                     deviceList.dimmers.push(device)
                 } break;
             }
             case Devices.Thermo: {
                 if (isThermo(device)) {
                     deviceList.thermostats.push(device)
                 } break;
             }
             default: {
                 console.log(`something went wrong with device ${device}`)
                 break;
             }
         }
     });

     return deviceList;
}


const isDevice = (object: any): object is Device => {
    if (!object || !isString(object.name) || !isString(object.type)) {
        throw new Error('Invalid Device');
    }
    return isString((object as Device).name) && isString((object as Device).type);
};

const isSwitch = (device: Device): device is Switch => {
    return isString((device as Switch).state);
};
const isLock = (device: Device): device is Lock => {
    return isBoolean((device as Lock).locked) && isArrayOfStrings((device as Lock).codes);
};
const isThermo = (device: Device): device is Thermo => {
    return isNumber((device as Thermo).temp) && isString((device as Thermo).mode);
};

const isDimmer = (device: Device): device is Dimmer => {
    return isNumber((device as Dimmer).level);
};


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isBoolean = (value: unknown): value is boolean => {
    return typeof value === 'boolean' || value instanceof Boolean;
};

const isNumber = (id: unknown): id is number => {
    return typeof id === 'number' || id instanceof Number;
};

const isArrayOfStrings = (value: unknown): value is string[] => {
    return Array.isArray(value) ? value.every(String) : false;
};

