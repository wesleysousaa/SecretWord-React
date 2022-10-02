import {useState} from 'react'
import "./Game.css"
function Game({dicionario}) {

    const [stateScreen, setStateScreen] = useState("inicio")
    const [pontos, setPontos] = useState(0)
    const [tentativas, setTentativas] = useState(3)
    const [dica, setDica] = useState("")
    const [palavraSorteada, setPalavraSorteada] = useState("")
    const [letraDigitada, setLetraDigitada] = useState("")
    const [letrasCertas, setLetrasCertas] = useState("")
    const [letrasUsadas, setLetrasUsadas] = useState("")

    const enter = (e) => {
        if(e.key === "Enter"){
            handleTestLetra()
        }
    }
    const handleGanhou = () => {

        for (let i = 0; i < palavraSorteada.length; i++) {
            if(!letrasCertas.includes(palavraSorteada.charAt(i))){
                return false
            }
        }
        return true
    }

    const handleStateComecar = () => {
        setStateScreen("in-game")
        sortearPalavra()
    }

    const sortearPalavra = () => {
        const posicaoSorteada = Math.floor(Math.random() * dicionario.length)
        setPalavraSorteada(dicionario[posicaoSorteada].nome)
        setDica(dicionario[posicaoSorteada].dica)
    }

    const nextStep = () => {
        sortearPalavra()
        setPontos(pontos+100)
        setLetrasCertas("")
        setLetraDigitada("")
        setLetrasUsadas("")
        setTentativas(3)
    }  

    const reset = () => {
        setStateScreen("inicio")
        setPontos(0)
        setLetrasCertas("")
        setLetraDigitada("")
        setLetrasUsadas("")
        setTentativas(3)
    }

    const handleTestLetra = () => {
        if(palavraSorteada.includes(letraDigitada)){
            if(!letrasCertas.includes(letraDigitada)){
                setLetrasCertas(letrasCertas.concat(letraDigitada))
            }
            setLetraDigitada("")
        }else{
            setTentativas(tentativas-1)
        }

        if(!letrasUsadas.includes(letraDigitada)){
            setLetrasUsadas(letrasUsadas.concat(letraDigitada))
        }

    }

    const gerarLetra = (letra, i) =>{
        return (letrasCertas.includes(letra)) ? letra : " "
    }

    return (
        <div>
            { stateScreen === "inicio" ? (
                <>
                    <h1>Bem vindo ao Secret Word!</h1>
                    <button onClick={handleStateComecar}>Começar Jogo</button>
                </>
            ) : ( tentativas > 0 ? 
                ( handleGanhou() ? nextStep() : (
                    <>
                        <h3>Pontuação: {pontos}</h3>
                        <h1>Advinhe a Palavra</h1>
                        <h2>Dica: {dica}</h2>
                        <h3>Você ainda tem {tentativas} tentativa(s)</h3>
                        <div className="container_palavra">
                            {palavraSorteada.split("").map((letra, i) => (
                                <div className="letra" key={i}>{gerarLetra(letra, i)}</div>
                            ))}
                        </div>
                        <input type="text" 
                                className='letraInput' 
                                name='letraInput' 
                                maxLength={1} 
                                onChange={(e) => setLetraDigitada(e.target.value)} 
                                onKeyDown={(e) => enter(e)}/>
                        <input type="submit" value="Testar" className='submit' onClick={handleTestLetra} />
                        <h3>Letras Usadas: {letrasUsadas}</h3>      
                    </>
                )
            ) : (
                <>
                    <h1>Fim de Jogo</h1>
                    <h2>Pontuação: {pontos}</h2>
                    <button onClick={reset}>Recomeçar</button>
                </>
            ) 
            )}
        </div>
    )
}

export default Game