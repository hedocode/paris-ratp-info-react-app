import styled, { css } from "styled-components";
import { black, error_light } from "../../../style/lib/colors";

const CommonSection = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    text-align: center;

    > * {
        max-width: 500px;
        width: 100%;

        padding: 12px;
        margin-bottom: 12px;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
`;

const InfoTrafficSection = styled.section`
    ${CommonSection}
`;

const ResultsSection = styled.section`
    ${CommonSection}

    .error {
        background-color: ${error_light};
    }
`;

const StickyHeader = styled.header`
    position: sticky;
    top: 0px;
    padding: 12px 12px 0px 12px;
    background-color: white;
    box-shadow: 1px 1px 5px rgba(${black}, 0.5);
    margin-bottom: 12px;
    h1 {
        margin: 0px;
        font-size: 22px;
    }
`;

const UserForm = styled.fieldset`
    margin: 0px;
    padding: 0px;
    border: 0;

    display: flex;
    flex-wrap: wrap;
    width: 100%;
    @media screen and (min-width: 1200px) {
        max-width: 80%;
    }

    > * {
        margin: 6px;
        flex-grow: 1;
    }
`

const UserFormWrapper = styled.section`
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
`;

export {
    StickyHeader,
    UserForm,
    UserFormWrapper,
    InfoTrafficSection,
    ResultsSection
};