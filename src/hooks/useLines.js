import {
    useEffect,
    useState
} from "react";
import {
    getLines
} from "../functions/apiCalls";


function useLines() {
    const [lines, setLines] = useState({});

    async function gatherLines() {
        setLines(await getLines());
    }

    useEffect(
        () => {
            gatherLines();
        }, []
    );

    return lines;
}

export default useLines;