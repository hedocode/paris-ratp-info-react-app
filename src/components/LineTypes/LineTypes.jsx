import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import typesIcons from '../../data/typesIcons';
import "./LineTypes.scss";

function LineTypes({
    linesTypes,
    chosenType,
    setChosenType
}) {
    return (
        <div className="types__wrapper">
            <div className='types__wrapper__content'>
                <ul className="types">
                    {linesTypes.map(
                    (type) => (
                        <li
                        className={chosenType === type ? "active" : ""}
                        onClick={() => setChosenType(type)}
                        key={type}
                        >
                        <FontAwesomeIcon icon={typesIcons()[type]}/>
                        <span>{type}</span>
                        </li>
                    )
                    )}
                </ul>
            </div>
        </div>
    );
}

export default LineTypes;