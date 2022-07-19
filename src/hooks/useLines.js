import {
    useEffect,
    useState
} from "react";
import {
    getLines
} from "../functions/apiCalls";


function useLines() {
    const [lines, setLines] = useState({});
    
    useEffect(
        () => {
            async function gatherLines() {
                setLines(await getLines());
            }
            gatherLines();
        }, []
    );

    return lines;
}

export default useLines;