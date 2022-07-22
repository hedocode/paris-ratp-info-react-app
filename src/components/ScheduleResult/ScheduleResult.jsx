import React, { Fragment } from "react";
import styled from "styled-components";
import { green_ratp } from "../../style/lib/colors";

const ResultItem = styled.div`
    background-color: white;
    border-left: 3px solid transparent;
    &:hover {
        border-left-color: ${green_ratp};
    }

    .info {
        margin-left: auto;
    }
`;

function SchedulesResults({
    error,
    onRetry,
    schedules
}) {
    const now = new Date();
    
    return (
        <Fragment>
            {error && (
                <div className='error'>
                    Désolé, une erreur est survenue
                    <button
                        onClick={onRetry}
                    >
                        Réessayer
                    </button>
                </div>
            )}
            {Array.isArray(schedules) ? (
                schedules.map(
                    (schedule, index) => {
                        if(!isNaN(parseInt(schedule))) {
                            return null;
                        }
                        const parsedTime = parseInt(schedule.message.split(" ")[0]);
                        const messageIsTime = !isNaN(parsedTime);
                        const newDate = messageIsTime ? new Date(now.getTime() + parsedTime*60000) : undefined;
                        return (
                            <ResultItem
                                className='results__item'
                                key={"schedule-" + index}
                            >
                                <span>
                                    {schedule.destination}
                                </span>
                                <span className='info'>
                                    {newDate ? (
                                        <Fragment>
                                            {("0" + newDate.getHours()).slice(-2)}h{("0" + newDate.getMinutes()).slice(-2)} ({schedule.message})
                                        </Fragment>
                                    ) : (
                                        schedule.message
                                    )}
                                </span>
                            </ResultItem>
                        )
                    }
                )
            ) : (
                <div>Chargement en cours...</div>
            )}
        </Fragment>
    )
}

export default SchedulesResults;