import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getStations } from "../functions/apiCalls";

function useStations(forceUpdate) {
    const [searchParams, setSearchParams] = useSearchParams();
    const chosenType = searchParams.get("type");
    const chosenLineCode = searchParams.get("line");

    const [stations, setStations] = useState(null);
    useEffect(
        () => {
            async function gatherStations() {
                setStations(await getStations(chosenType, chosenLineCode))
            }
            setStations(null);
            gatherStations();
            // searchParams.delete("station");   
            // setSearchParams(searchParams);
        }, [chosenType, chosenLineCode, forceUpdate, searchParams, setSearchParams]
    )

    return stations;
}

export default useStations;