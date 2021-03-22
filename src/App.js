import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container-lg">
        <header>
          <Weather/>
        </header>
        <footer>
          <p>
            <a href="https://github.com/lucero-cardenas/weather-react-final-project" target="_blank" rel="noreferrer">Open source code</a>
            {" "}by{" "}
            <a href="mailto:lucero.cardenas@gmail.com" target="_blank" rel="noreferrer">Lucero Cardenas</a>
          </p>
        </footer>
      </div>
    </div>
  );
}