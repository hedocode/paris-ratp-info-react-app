import { useEffect, useState } from "react";
import { getSchedules } from "../functions/apiCalls";
import sortSchedules from "../functions/sortSchedules";


function useSchedules(type, code, station, way, forceUpdate) {
    const [schedules, setSchedules] = useState({});

    async function gatherSchedules() {
        if(Array.isArray(way)) {
            let array = [];
            for(var i = 0; i < way.length; i++) {
                const w = way[i];
                try {
                    const res = await getSchedules(type, code, station, w)
                    array = array.concat(res);
                } catch(err) {
                    array.push(err.response.data.result.code);
                }
            }
            array = array.sort(sortSchedules);
            setSchedules(array);
        } else {
            try {
                setSchedules(await getSchedules(type, code, station, way));
            } catch(err) {
                setSchedules([err.response.data.result.code]);
            }
        }
    }

    useEffect(
        () => {
            setSchedules("Loading");
            gatherSchedules();
        }, [type, code, station, way, forceUpdate]
    )

    return schedules;
}

export default useSchedules;