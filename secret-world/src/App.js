import './App.css';
import Game from './components/Game';

function App() {

  return (
    <div className="App">
      <Game dicionario={[
        {nome: "moto", dica: "automóvel"},
        {nome: "processador", dica: "peça de computador"},
        {nome: "alice", dica: "nome de pessoa"},
        {nome: "sapo", dica: "nome de animal"},
        {nome: "cadeira", dica: "tem em casa"},
        {nome: "médico", dica: "profissão"},
        {nome: "java", dica: "linguagem de programação"},
        {nome: "monitor", dica: "tem em um setup"},
        {nome: "honda", dica: "marca de moto"},
        {nome: "ferrari", dica: "marca de carro"}
      ]}/>
    </div>
  );
}

export default App;
