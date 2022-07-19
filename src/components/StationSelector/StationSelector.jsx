import React from "react";
import { useSearchParams } from "react-router-dom";
import Select from "../Select/Select";

function StationSelector({
    stations,
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const chosenStation = searchParams.get("station");
    
    return (
        !!stations.length && (
            <Select
                defaultOptionText="Choissisez une station"
                items={stations}
                selectProps={{
                    onChange: (e) => {
                        searchParams.set("station", e.target.value);   
                        setSearchParams(searchParams);
                    },
                    value: chosenStation
                }}
                itemsOptionMapper={
                    (item) => (
                        <option
                            value={item.slug}
                            key={"station-" + item.slug}
                        >
                            {item.name}
                        </option>
                    )
                }
            />
        )
    )
}

export default StationSelector;