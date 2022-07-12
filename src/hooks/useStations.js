import { useEffect, useState } from "react";
import { getStations } from "../functions/apiCalls";

function useStations(currentType, currentLineCode) {
    const [stations, setStations] = useState({});

    async function gatherStations() {
        setStations(await getStations(currentType, currentLineCode))
    }

    useEffect(
        () => {
            gatherStations();
        }, [currentLineCode]
    )

    return stations;
}

export default useStations;