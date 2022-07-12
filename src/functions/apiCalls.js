const { default: axios } = require("axios");

const apiURL = "https://api-ratp.pierre-grimaud.fr/v4/";

async function getLines() {
    const res = await axios.get(
        apiURL + "lines"
    )
    
    return res.data.result;
}

export default getLines;