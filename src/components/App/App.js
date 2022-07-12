import useLines from '../../hooks/useLines';
import './App.scss';

function App() {

  const lines = useLines();
  
  return (
    <main>
      <h1>Paris RAPT Subway Info</h1>
      <ul className="types">
        {Object.keys(lines).map(
          (type) => (
            <li key={type}>
              {type}
            </li>
          )
        )}
      </ul>
    </main>
  );
}

export default App;
