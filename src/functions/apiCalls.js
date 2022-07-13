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
        try {
            const res = await axios.get(
                `${apiURL}stations/${type}/${code}`
            );
            return res.data.result.stations;
        } catch(err) {
            return err.response.data.result.code
        }
    }

    return [];
}

async function getDestinations(type, code) {
    if(type && code) {
        try {
            const res = await axios.get(
                `${apiURL}destinations/${type}/${code}`
            );
            return res.data.result.destinations;
        } catch(err) {
            return err.response.data.result.code
        }
    }
    return [];
}

async function getSchedules(type, code, station, way) {
    if(type && code && station && way) {
        const res = await axios.get(
            `${apiURL}schedules/${type}/${code}/${station}/${way}`
        );
        return res.data.result.schedules || res.data.result.code;
    }

    return [];
}

async function getTraffic(type, code) {
    if(type && code) {
        const res = await axios.get(
            `${apiURL}traffic/${type}/${code}`
        );
        return res.data.result.message;
    } else {
        return "";
    }
}

export {
    getLines,
    getStations,
    getDestinations,
    getSchedules,
    getTraffic
};