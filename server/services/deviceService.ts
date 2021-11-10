import axios from "axios";
import { toNewDeviceArray } from "../../utils";

const getDevices = async () => {
    try {
        const response = await axios.get(`https://gist.githubusercontent.com/mikekwright/691f1eb79b506bc278c289fac0c7176f/raw/d8cf60a6ca110c01bfba596bc534187c4f64a529/data.json`);
        return toNewDeviceArray(response.data.devices);
    } catch (err) {
        console.log(err);
    }
    return;
}

export default {
    getDevices
}
