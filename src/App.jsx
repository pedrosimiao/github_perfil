// *Estrutura*
// 1º importação
// 2º código do componente
import { useState } from "react";

import Perfil from "./components/Perfil";
import Formulario from "./components/Formulario";
import ReposList from "./components/ReposList";

function App() {
  const [formularioEstaVisivel, setFormularioEstaVisivel] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState('');

  return ( 
    <> 
      <input type="text" onBlur={(e) => setNomeUsuario(e.target.value)}/>
      
      {/* Condicionando renderização dos componentes Perfil e ReposList após preenchimento do nome no input */}
      {nomeUsuario.length >= 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario}/>
        </>
      )}


      
      {/* {formularioEstaVisivel && (
        <Formulario />
      )} */}

      {/* <button onClick={() => setFormularioEstaVisivel(!formularioEstaVisivel)} type="button">toggle form</button> */}
    </>
  )
}

export default App
