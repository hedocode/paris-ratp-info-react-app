import { useEffect, useState } from "react";
import { getDestinations } from "../functions/apiCalls";


function useDestinations(type, code, forceUpdate) {
    const [destinations, setDestinations] = useState([]);

    useEffect(
        () => {
            async function gatherDestination() {
                setDestinations(await getDestinations(type, code));
            }
            setDestinations([]);
            gatherDestination();
        }, [type, code, forceUpdate]
    )

    return destinations;
}

export default useDestinations;