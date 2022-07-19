import { useEffect, useState } from "react";
import { getSchedules } from "../functions/apiCalls";
import sortSchedules from "../functions/sortSchedules";


function useSchedules(type, code, station, way, forceUpdate) {
    const [schedules, setSchedules] = useState({});

    useEffect(
        () => {
            async function gatherSchedules() {
                let directionsQueryString = way;
                if(Array.isArray(way)) {
                    directionsQueryString = way[0];
                    for(var i = 1; i < way.length; i++) {
                        directionsQueryString += "+" + way[i];
                    }
                }
                
                try {
                    const newSchedules = await getSchedules(type, code, station, directionsQueryString);
                    setSchedules(newSchedules.sort(sortSchedules));
                } catch(err) {
                    setSchedules([err.response.data.result.code]);
                }
            }
            gatherSchedules();
        }, [type, code, station, way, forceUpdate]
    )

    return schedules;
}

export default useSchedules;