import React, { Fragment } from "react";
import "./Select.scss";



function Select({
    displayCondition,
    selectProps,
    defaultOptionText,
    defaultValue = "",
    items,
    itemsOptionMapper
}) {
    return (
        <Fragment>
            { displayCondition && (
                <select
                    {...selectProps}
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