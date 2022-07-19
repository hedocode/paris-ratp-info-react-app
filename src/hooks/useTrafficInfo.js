import { useEffect, useState } from "react";
import { getTraffic } from "../functions/apiCalls";

function useTrafficInfo(chosenType, chosenLineCode) {
    const [trafficInfo, setTrafficInfo] = useState("");

    useEffect(
        () => {
            const availableTypes = ["metros", "rers", "tramways"];
            async function gatherTraffic() {
                setTrafficInfo(await getTraffic(chosenType, chosenLineCode))
            }
            setTrafficInfo("");
            if(availableTypes.includes(chosenType)) {
                gatherTraffic();
            }
        }, [chosenType, chosenLineCode]
    )

    return trafficInfo;
}

export default useTrafficInfo;