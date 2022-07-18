import React from "react";
import Select from "../Select/Select";

function LineSelector({
    chosenType,
    chosenLineCode, 
    setChosenLineCode,
    lines
}) {

    return (
        <Select
            defaultOptionText="Choissisez une ligne"
            items={lines}
            selectProps={{
                onChange: (e) => setChosenLineCode(e.target.value),
                value: chosenLineCode
            }}
            displayCondition={chosenType}
            itemsOptionMapper={
                (item) => (
                    <option
                        value={item.code}
                        key={"line-" + item.code}
                    >
                        {item.name}
                    </option>
                )
            }
        />
    )
}

export default LineSelector;