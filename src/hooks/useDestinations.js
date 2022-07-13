import { useEffect, useState } from "react";
import { getDestinations } from "../functions/apiCalls";


function useDestinations(type, code) {
    const [destinations, setDestinations] = useState([]);

    async function gatherDestination() {
        setDestinations(await getDestinations(type, code));
    }

    useEffect(
        () => {
            setDestinations([]);
            gatherDestination();
        }, [type, code]
    )

    return destinations;
}

export default useDestinations;