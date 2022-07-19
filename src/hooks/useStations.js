import { useEffect, useState } from "react";
import { getStations } from "../functions/apiCalls";

function useStations(chosenType, chosenLineCode, forceUpdate) {
    const [stations, setStations] = useState({});
    useEffect(
        () => {
            async function gatherStations() {
                setStations(await getStations(chosenType, chosenLineCode))
            }
            setStations({});
            gatherStations();
        }, [chosenType, chosenLineCode, forceUpdate]
    )

    return stations;
}

export default useStations;