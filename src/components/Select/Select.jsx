import React from "react";
import styled from "styled-components";
import { white } from "../../style/lib/colors";

const StyledSelect = styled.select`
    -webkit-appearance: none;
    appearance: none;
    background-color: ${white};
    min-height: 32px;
    border: 2px solid black;
    border-radius: 4px;
    padding: 6px;
`;

function Select({
    selectProps,
    defaultOptionText,
    defaultValue = "",
    items,
    itemsOptionMapper = (item, idx) => (
        <option key={"select-" + idx + "-" + item}>
            {item}
        </option>
    )
}) {
    return (
        <StyledSelect
            {...selectProps}
        >
            {(defaultOptionText) && (
                <option value={defaultValue}>
                    {defaultOptionText}
                </option>
            )}

            {(items && Array.isArray(items)) &&
                items.map(itemsOptionMapper)
            }
        </StyledSelect>
    );
}

export default Select;