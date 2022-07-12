const { default: axios } = require("axios");

const apiURL = "https://api-ratp.pierre-grimaud.fr/v4/";

async function getLines() {
    const res = await axios.get(
        apiURL + "lines"
    )
    
    return res.data.result;
}

async function getStations(type, code) {
    if(type && code) {
        const res = await axios.get(
            `${apiURL}stations/${type}/${code}`
        );
        console.log("res : %o", res.data.result);
        return res.data.result.stations;
    }

    return [];
}

export {
    getLines,
    getStations
};