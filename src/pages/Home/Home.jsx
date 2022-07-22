
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDestinations from '../../hooks/useDestinations';
import useLines from '../../hooks/useLines';
import useSchedules from '../../hooks/useSchedules';
import useStations from '../../hooks/useStations';
import useTrafficInfo from '../../hooks/useTrafficInfo';
import DirectionSelector from '../../components/DirectionSelector/DirectionSelector';
import LineSelector from '../../components/LineSelector/LineSelector';
import LineTypes from '../../components/LineTypes/LineTypes';
import SchedulesResults from '../../components/ScheduleResult/ScheduleResult';
import StationSelector from '../../components/StationSelector/StationSelector';
import './Home.scss';
import { InfoTrafficSection, ResultsSection, StickyHeader, UserForm, UserFormWrapper } from './StyledComponents/Home.sc';


function Home() {
  const wayDefaultValue = "all";

  // Routing Infos (User choices)
  const [searchParams, setSearchParams] = useSearchParams();
  const chosenType = searchParams.get("type");
  const chosenLineCode = searchParams.get("line");
  const chosenStation = searchParams.get("station");
  const chosenWay = searchParams.get("way");

  // Forcing update for API calls retry
  const [stateToForceUpdate, setStateToForceUpdate] = useState(false);
  function forceApiRecall() {
    setStateToForceUpdate(!stateToForceUpdate);
  }

  // Data from API
  const linesObject = useLines();
  const stations = useStations(chosenType, chosenLineCode, stateToForceUpdate);
  const destinations = useDestinations(chosenType, chosenLineCode, stateToForceUpdate);
  const ways = useMemo(
    () => (
      chosenWay === wayDefaultValue ?
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

  
  // Removing lines duplicates (both directions case)
  const linesSet = new Set();
  const lines = linesObject[chosenType] && linesObject[chosenType].filter(
    line => {
      const isDuplicate = linesSet.has(line.code);

      linesSet.add(line.code);

      return !isDuplicate;
    }
  );

  const error = useMemo(
    () => (
      (
        Array.isArray(schedules) && (
          schedules.includes(500)
          || schedules.filter(x => x.code !== undefined).length > 0
        )
      )
      || !Array.isArray(destinations)
      || !Array.isArray(stations)
    ), [schedules, destinations, stations]
  );

  useEffect(
    () => {
      searchParams.delete("line");
      searchParams.delete("station");
      setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenType]
  );
  
  return (
    <main>
      <StickyHeader>
        <h1>Paris RATP Informations</h1>
          
        <LineTypes/>
      </StickyHeader>
      
      <UserFormWrapper>
        <UserForm>
          {!chosenType && (
            <div>Choissisez un type de transport ci-dessus</div>
          )}

          <LineSelector
            lines={lines}
          />
          
          <StationSelector
            stations={stations}
          />

          <DirectionSelector
            destinations={destinations}
          />
        </UserForm>
      </UserFormWrapper>

      <ResultsSection>
        <SchedulesResults
          error={error}
          onRetry={forceApiRecall}
          schedules={schedules}
        />
      </ResultsSection>

      <InfoTrafficSection>
        <span>
          {trafficInfo}
        </span>
      </InfoTrafficSection>
    </main>
  );
}

export default Home;
