import React, { useImperativeHandle } from "react";
import Select from "../Select/Select";

function StationSelector({
    stations,
    chosenStation,
    setChosenStation
}) {
    return (
        <Select
            defaultOptionText="Choissisez une station"
            items={stations}
            selectProps={{
                onChange: (e) => setChosenStation(e.target.value),
                value: chosenStation
            }}
            displayCondition={!!stations.length}
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
}

export default StationSelector;