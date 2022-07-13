import React, { Fragment } from "react";
import "../../style/select.scss";

function LineSelector({
    chosenType,
    chosenLineCode, 
    setChosenLineCode,
    lines
}) {
    return (
        <Fragment>
            {chosenType && (
                <select
                value={chosenLineCode}
                onChange={
                    (e) => setChosenLineCode(e.target.value)
                }
                >
                <option value="">
                    Choissisez une ligne
                </option>

                {lines && lines.map(
                    (item) => (
                    <option
                        value={item.code}
                        key={"line-" + item.code}
                    >
                        {item.name}
                    </option>
                    )
                )}
                </select>
            )}
        </Fragment>
    )
}

export default LineSelector;