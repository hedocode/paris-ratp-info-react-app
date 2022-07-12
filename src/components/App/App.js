import { useEffect, useState } from 'react';
import { getStations } from '../../functions/apiCalls';
import useLines from '../../hooks/useLines';
import useStations from '../../hooks/useStations';
import './App.scss';

function App() {

  const linesObject = useLines();
  const linesTypes = Object.keys(linesObject);
  
  const [currentType, setCurrentType] = useState(null);
  const [currentLineCode, setCurrentLineCode] = useState(null);
  
  const stations = useStations(currentType, currentLineCode);
  
  const linesSet = new Set();
  const lines = linesObject[currentType] && linesObject[currentType].filter(
    line => {
      const isDuplicate = linesSet.has(line.code);

      linesSet.add(line.code);

      return !isDuplicate;
    }
  )
  
  return (
    <main>
      <h1>Paris RAPT Subway Info</h1>
      <ul className="types">
        {linesTypes.map(
          (type) => (
            <li
              className={currentType === type ? "active" : ""}
              onClick={() => setCurrentType(type)}
              key={type}
            >
              {type}
            </li>
          )
        )}
      </ul>

      {currentType && (
        <select
          defaultValue=""
          onChange={
            (e) => setCurrentLineCode(e.target.value)
          }
        >
          <option value="" disabled>
            Choissisez une ligne
          </option>

          {lines.map(
            (item) => (
              <option
                value={item.code}
                key={"line-" + item.code}
              >
                {item.name}
              </option>
            )
          )}
        </select>
      )}
      
      {!!stations.length && (
        <select
          defaultValue=""
          // onChange={
          //   (e) => setCurrentLineCode(e.target.value)
          // }
        >
          <option value="" disabled> Choissisez une station</option>
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

      <select
        defaultValue=""
      >
        <option value="" disabled>Choissisez une direction</option>
      </select>
    </main>
  );
}

export default App;
