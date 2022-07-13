import { useEffect, useState } from "react";
import { getSchedules } from "../functions/apiCalls";


function useSchedules(type, code, station, way, forceUpdate) {
    const [schedules, setSchedules] = useState({});

    function sortSchedules(a, b) {
        // Handle Error case
        if(!isNaN(parseInt(a))) {
            return -1;
        }
        if(!isNaN(parseInt(b))) {
            return 1;
        }

        const parsedTimeA = parseInt(a.message.split(" ")[0]);
        const parsedTimeB = parseInt(b.message.split(" ")[0]);

        // Handler non minutes messages
        if(isNaN(parsedTimeA)) {
            return -1;
        }

        if (isNaN(parsedTimeB)) {
            return 1;
        }

        // Simple sort based on minutes
        if(parsedTimeA === parsedTimeB) {
            return 0;
        } else return parsedTimeA > parsedTimeB ? 1 : -1;
    }

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