
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAutoParamsFor from '../../hooks/useAutoParamsFor';
import useDestinations from '../../hooks/useDestinations';
import useLines from '../../hooks/useLines';
import useSchedules from '../../hooks/useSchedules';
import useStations from '../../hooks/useStations';
import useTrafficInfo from '../../hooks/useTrafficInfo';
import DirectionSelector from '../DirectionSelector/DirectionSelector';
import LineSelector from '../LineSelector/LineSelector';
import LineTypes from '../LineTypes/LineTypes';
import SchedulesResults from '../ScheduleResult/ScheduleResult';
import StationSelector from '../StationSelector/StationSelector';
import './App.scss';

function App() {
  const wayDefaultValue = "all";

  // Routing Infos
  const [searchParams, ] = useSearchParams();
  const type = searchParams.get("type");
  const line = searchParams.get("line")
  const station = searchParams.get("station")
  const way = searchParams.get("way");

  // User choices
  const [chosenType, setChosenType] = useState(type ?? "");
  const [chosenLineCode, setChosenLineCode] = useState(line ?? "");
  const [chosenStation, setChosenStation] = useState(station ?? "");
  const [chosenWay, setChosenWay] = useState(way ?? wayDefaultValue);

  const [stateToForceUpdate, setStateToForceUpdate] = useState(false);
  function forceApiRecall() {
    setStateToForceUpdate(!stateToForceUpdate);
  }


  // Routing init / changes
  useEffect(
    () => {
      if(type) {
        setChosenType(type);
        if(line) {
          setChosenLineCode(line);
          if(station) {
            setChosenStation(station);
            if(way) {
              setChosenWay(way);
            }
          }
        }
      }
    }, []
  )
  useAutoParamsFor("type", chosenType, setChosenLineCode);
  useAutoParamsFor("line", chosenLineCode, setChosenStation);
  useAutoParamsFor("station", chosenStation, setChosenWay, wayDefaultValue);
  useAutoParamsFor("way", chosenWay);


  // Data from API
  const linesObject = useLines();
  const linesTypes = Object.keys(linesObject);
  const stations = useStations(chosenType, chosenLineCode, stateToForceUpdate);
  const destinations = useDestinations(chosenType, chosenLineCode, stateToForceUpdate);
  const ways = useMemo(
    () => (chosenWay === wayDefaultValue ?
        (destinations && destinations.length) ?
          destinations.map(d => d.way)
        :
          ""
      :
        chosenWay
    ), [chosenWay, destinations]
  );
  const schedules = useSchedules(
    chosenType,
    chosenLineCode,
    chosenStation,
    ways,
    stateToForceUpdate
  );
  const trafficInfo = useTrafficInfo(chosenType, chosenLineCode);

  

  
  // Removing lines duplicates (both directions)
  const linesSet = new Set();
  const lines = linesObject[chosenType] && linesObject[chosenType].filter(
    line => {
      const isDuplicate = linesSet.has(line.code);

      linesSet.add(line.code);

      return !isDuplicate;
    }
  )

  const error = (
    Array.isArray(schedules) && (
      schedules.includes(500)
      || schedules.filter(x => x.code !== undefined).length > 0
    )
  )
  || !Array.isArray(destinations)
  || !Array.isArray(stations)
  ;
  
  return (
    <main>
      <header>
        <h1>Paris RATP Informations</h1>
          
        <LineTypes
          linesTypes={linesTypes}
          chosenType={chosenType}
          setChosenType={setChosenType}
        />
      </header>
      
      <section className='user-form__wrapper'>
        <fieldset className='user-form'>
          {!chosenType && (
            <div>Choissisez un type de transport ci-dessus</div>
          )}

          <LineSelector
            chosenLineCode={chosenLineCode}
            setChosenLineCode={setChosenLineCode}
            chosenType={chosenType}
            lines={lines}
          />
          
          <StationSelector
            chosenStation={chosenStation}
            setChosenStation={setChosenStation}
            stations={stations}
          />

          <DirectionSelector
            chosenLineCode={chosenLineCode}
            chosenStation={chosenStation}
            chosenWay={chosenWay}
            setChosenWay={setChosenWay}
            destinations={destinations}
          />
        </fieldset>
      </section>

      <section className='results'>
        <SchedulesResults
          error={error}
          onRetry={forceApiRecall}
          schedules={schedules}
        />
      </section>

      <section className='infoTraffic'>
        <span>
          {trafficInfo}
        </span>
      </section>
    </main>
  );
}

export default App;
