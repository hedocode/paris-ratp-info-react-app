import React from "react";
import Select from "../Select/Select";


function DirectionSelector({
    chosenLineCode,
    chosenStation,
    chosenWay,
    setChosenWay,
    destinations
}) {
    return (
        <Select
            defaultOptionText="Toutes directions"
            defaultValue="all"
            items={destinations}
            selectProps={{
                onChange: (e) => setChosenWay(e.target.value),
                value: chosenWay
            }}
            displayCondition={(chosenLineCode && chosenStation)}
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
    );
}

export default DirectionSelector;