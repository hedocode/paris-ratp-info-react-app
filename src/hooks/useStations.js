import { useEffect, useState } from "react";
import { getStations } from "../functions/apiCalls";

function useStations(chosenType, chosenLineCode) {
    const [stations, setStations] = useState({});

    async function gatherStations() {
        setStations(await getStations(chosenType, chosenLineCode))
    }

    useEffect(
        () => {
            setStations({});
            gatherStations();
        }, [chosenLineCode]
    )

    return stations;
}

export default useStations;