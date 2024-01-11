import "./App.css";
import { useEffect, useState } from "react";
import { Home } from "./pages/home";
import { Board } from "./components/board";

function App() {
  const [dataHora, setDataHora] = useState("");

  function atualizarDataEHora() {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString();
    const horaFormatada = dataAtual.toLocaleTimeString();
    const dataHoraFormatada = `${dataFormatada} ${horaFormatada}`;
    setDataHora(dataHoraFormatada);
  }

  useEffect(() => {
    const setIntervalId = setInterval(atualizarDataEHora, 1000);

    return () => clearInterval(setIntervalId);
  }, []);

  return (
    <div className="App">
      <h1>Just do it.</h1>

      <input type="text" placeholder="Add a task" />

      <div id="data-hora">
        <span>{dataHora}</span>
      </div>

      <div id="lista">
       <Home />
       <Board />
      </div>
    </div>
  );
}

export default App;
