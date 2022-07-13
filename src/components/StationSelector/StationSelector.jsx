import React, { Fragment } from "react";
import "../../style/select.scss";

function StationSelector({
    stations,
    chosenStation,
    setChosenStation
}) {
    return (
        <Fragment>
            {!!stations.length && (
                <select
                    value={chosenStation}
                    onChange={
                        (e) => setChosenStation(e.target.value)
                    }
                >
                <option value=""> Choissisez une station</option>
                {stations.map(
                    (item) => (
                    <option
                        value={item.slug}
                        key={"station-" + item.slug}
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

export default StationSelector;