import { useEffect, useState } from "react";
import { getTraffic } from "../functions/apiCalls";

function useTrafficInfo(chosenType, chosenLineCode) {
    const [trafficInfo, setTrafficInfo] = useState("");

    const availableTypes = ["metros", "rers", "tramways"];

    async function gatherTraffic() {
        setTrafficInfo(await getTraffic(chosenType, chosenLineCode))
    }

    useEffect(
        () => {
            setTrafficInfo("");
            if(availableTypes.includes(chosenType)) {
                gatherTraffic();
            }
        }, [chosenType, chosenLineCode]
    )

    return trafficInfo;
}

export default useTrafficInfo;