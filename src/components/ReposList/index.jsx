import { useEffect, useState } from "react";

import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => { //atributo nomeUsuario para exibiçao de titulo e foto 
    //Desestruturação do useState
    //useState instanciado como uma lista vazia
    const [repos, setRepos] = useState([]);

    //Condicionando com useState() para simulação um feedback de carregamento
    const [estaCarregando, setEstaCarregando] = useState(true);

    //Executando o useEffect apenas quando o componente for inicializado
    //Argumento será uma arrow funtion que chama o fetch API
    //a resposta do fetch é então convertida em um arquivo json
    //logo após a alocação desse arquivo json é realizada também através de uma arrow function
    //utilizando o setRepos de useState para armazená-lo na lista repos que foi instanciada vazia.
    //Verificar atributos da API convertida em Json para uso. (id, name, language, html_url e outros caso seja necessário)
    useEffect(() => {
        //atribuindo o valor true na montagem para que lista e "Carregando..." 
        //não sejam renderizados concomitantemente ao mudar nome do usuário pelo input em App.jsx
        setEstaCarregando(true) 
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resJson => {
            //Simulando um feedback de carregamento através do condicionamento 'estaCarregando'
            setTimeout(() => {
                setEstaCarregando(false);
                setRepos(resJson);
            }, 3000)
        })
    },[nomeUsuario]) //useEffect só será executado após definição de nomeUsuario 
    //lista vazia como segundo argumento (assim que o componente for montado, 
    //pegar listagem repositórios na api do usuário github e preenche a lista com o conteúdo requerido no return)

    
    return (
        <div className="container">
            {/* h1 só srá renderizado caso está carregando seja true */}
            {estaCarregando ? (
                <h1>Carregando...</h1>
            ) : (
                <ul className={styles.list}>
                    {/* {repos.map(repositorio => ( */}
                    {/* Desestruturação dos itens da lista */}
                    {repos.map(({id, name, language, html_url}) => (
                        <li className={styles.listItem} key={id}>
                            {/* A propriedade id é usada como identificador único para cada repositório da api do github retornada pelo fetch */}
                            <div className={styles.itemName}>
                                <b>Nome: </b> 
                                {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Linguagem: </b> 
                                {language}
                            </div>
                            <a className={styles.itemLink} target="_blank" href={html_url}>Visitar no Github</a>
                            {/* Atributo target="_blank" para abrir link em outra janela */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ReposList;