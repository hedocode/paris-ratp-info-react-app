import React from "react";
import { useSearchParams } from "react-router-dom";
import Select from "../Select/Select";

function LineSelector({
    lines
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const chosenType = searchParams.get("type");
    const chosenLineCode = searchParams.get("line");
    
    return (
        chosenType && (
            <Select
                defaultOptionText="Choissisez une ligne"
                items={lines}
                selectProps={{
                    onChange: (e) => {
                        searchParams.set("line", e.target.value);
                        setSearchParams(searchParams)
                    },
                    value: chosenLineCode ?? ""
                }}
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
    )
}

export default LineSelector;