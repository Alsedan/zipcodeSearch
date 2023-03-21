
import './App.css';
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import {useState} from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Please, type your ZipCode!")
      return;
    }

    try{
      const response = await api.get(input+'/json');
      console.log(response.data)
      setCep(response.data);
      setInput("");

    }catch{
      alert("Error search");
      setInput("");
  } 
 }

  return (
    <div className="container">
      <h1 className="title">Search your Zip Code</h1>

      <div className="buttonInputBox">
        <input 
        type="text"
        placeholder="Type your Zip Code"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="#FFF"/>
        </button>
</div>
        {Object.keys(cep).length > 0 && (
        
        <main className="main">
          
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - UF: {cep.uf}</span>

        </main>
        )}

      </div>
  );
}

export default App;
