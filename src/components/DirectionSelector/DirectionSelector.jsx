import React, { Fragment } from "react";


function DirectionSelector({
    chosenLineCode,
    chosenStation,
    chosenWay,
    setChosenWay,
    destinations
}) {
    return (
        <Fragment>
            {(chosenLineCode && chosenStation) && (
                <select
                    value={chosenWay}
                    onChange={
                    (e) => setChosenWay(e.target.value)
                    }
                >
                    <option value="all">Toutes directions</option>
                    {(destinations && !!destinations.length) && destinations.map(
                    (destination) => (
                        <option
                        value={destination.way}
                        key={destination.way}
                        >
                        {destination.name}
                        </option>
                    )
                    )
                    }
                </select>
            )}
        </Fragment>
    );
}

export default DirectionSelector;