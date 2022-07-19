import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import typesIcons from '../../data/typesIcons';
import useLines from '../../hooks/useLines';
import "./LineTypes.scss";

function LineTypes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chosenType = searchParams.get("type");

  const linesObject = useLines();
  const linesTypes = Object.keys(linesObject);

    return (
        <div className="types__wrapper">
            <div className='types__wrapper__content'>
                <ul className="types">
                    {linesTypes.map(
                    (type) => (
                        <li
                        className={chosenType === type ? "active" : ""}
                        onClick={
                            () => {
                                searchParams.set("type", type);
                                setSearchParams(searchParams);
                            }
                        }
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