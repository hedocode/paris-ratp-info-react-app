import { useEffect, useState } from "react";
import { getDestinations } from "../functions/apiCalls";


function useDestinations(type, code, forceUpdate) {
    const [destinations, setDestinations] = useState([]);

    async function gatherDestination() {
        setDestinations(await getDestinations(type, code));
    }

    useEffect(
        () => {
            setDestinations([]);
            gatherDestination();
        }, [type, code, forceUpdate]
    )

    return destinations;
}

export default useDestinations;