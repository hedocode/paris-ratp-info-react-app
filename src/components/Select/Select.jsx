import React, { Fragment } from "react";
import "./Select.scss";

function Select({
    displayCondition,
    state,
    setState,
    defaultOptionText,
    defaultValue = "",
    items,
    itemsOptionMapper
}) {
    return (
        <Fragment>
            { displayCondition && (
                <select
                    value={state}
                    onChange={
                        (e) => setState(e.target.value)
                    }
                >
                    <option value={defaultValue}>
                        {defaultOptionText}
                    </option>

                    {(items && Array.isArray(items)) &&
                        items.map(itemsOptionMapper)
                    }
                </select>
            )}
        </Fragment> 
    );
}

export default Select;