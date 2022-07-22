import React from "react";
import { useSearchParams } from "react-router-dom";
import Select from "../Select/Select";


function DirectionSelector({
    destinations
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const chosenStation = searchParams.get("station");
    const chosenLineCode = searchParams.get("line");
    const chosenWay = searchParams.get("way");

    return (
        (chosenLineCode && chosenStation) && (
            <Select
                defaultOptionText="Toutes directions"
                defaultValue="all"
                items={destinations}
                selectProps={{
                    onChange: (e) => {
                        searchParams.set("way", e.target.value);
                        setSearchParams(searchParams);
                    },
                    value: chosenWay ?? ""
                }}
                itemsOptionMapper={
                    (destination) => (
                        <option
                            value={destination.way}
                            key={destination.way}
                        >
                            {destination.name}
                        </option>
                    )
                }
            />
        )
    );
}

export default DirectionSelector;