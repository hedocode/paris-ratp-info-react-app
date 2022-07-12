const { default: axios } = require("axios");

const apiURL = "https://api-ratp.pierre-grimaud.fr/v4/";

function getLines() {
    axios.get(
        apiURL + "lines"
    ).then(
        (res) => {
            console.log("res");
        }
    )
}