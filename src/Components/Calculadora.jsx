import React from 'react';
import TecladoNumerico from './TecladoNumerico';
import Visor from './Visor';

export default class Calculadora extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            historico: [],
            operacao: "0",
            inputReset: false
        }

        this.decifrarOperacao = this.decifrarOperacao.bind(this);
        this.adicionarNumeroOperacao = this.adicionarNumeroOperacao.bind(this);
        this.removerZeroEsquerda = this.removerZeroEsquerda.bind(this);
        this.isNumeric = this.isNumeric.bind(this);
        this.identificarOperacao = this.identificarOperacao.bind(this);
        this.fazerOperacao = this.fazerOperacao.bind(this);
    }

    decifrarOperacao(){
        let operacao = this.state.operacao;
        operacao = this.removerZeroEsquerda(operacao);

        this.setState({operacao: operacao});
    }

    removerZeroEsquerda(operacao){
        if(operacao.length == 1){
            return operacao;
        }else if(operacao.charAt(0) == 0 && operacao.charAt(1) != "."){
            operacao = operacao.slice(1, operacao.length);

            operacao = this.removerZeroEsquerda(operacao);
        }else{
            return operacao;
        }
        return operacao;
    }

    adicionarNumeroOperacao(numero){
        if(this.isNumeric(numero)){
            let operacaoAtualizada = "";
            if(this.state.inputReset){
                operacaoAtualizada = numero;
                this.setState({inputReset: false});
            }else{
                operacaoAtualizada = this.state.operacao + numero;
            }
            this.setState({operacao: operacaoAtualizada}, () =>{
                this.decifrarOperacao();
            });
        }else{
            this.identificarOperacao(numero)
        }
    }

    identificarOperacao(operacao){

        let newNumber = false;
        switch(operacao){
            case "R":
                this.state.teclaVisivel = "√";
                let operacao = this.state.operacao;

                operacao = parseFloat(operacao);
                operacao = Math.sqrt(operacao);
                operacao += "";
                
                this.setState({operacao: operacao});
                break;
            case "A":
                if(this.state.operacao.length > 1){
                    this.setState({operacao: this.state.operacao.slice(0, -1)});
                }else{
                    this.setState({operacao: "0"});
                }
                break;
            case "I":
                console.log(typeof this.state.operacao)
                if(this.state.operacao.charAt(0) == "-"){
                    this.setState({operacao: this.state.operacao.slice(1, this.state.operacao.length)});
                }else{
                    this.setState({operacao: "-" + this.state.operacao});
                }
                break;
            case "E":
                let historicoAtualizado = this.state.historico;
                historicoAtualizado.push(this.state.operacao);
                this.setState({ 
                    historico: historicoAtualizado
                });

                this.fazerOperacao();
                break;
            case "C":
                this.setState({
                    operacao: "0",
                    historico: []
                });
                break;
            case "D":
                if(!this.state.operacao.includes(".")){
                    this.setState({operacao: this.state.operacao + "."});
                }
                break;
            default:
                newNumber = true;
        }

        if(newNumber){
            let historicoAtualizado = this.state.historico;
            historicoAtualizado.push(this.state.operacao);
            historicoAtualizado.push(operacao);
            this.setState({ 
                historico: historicoAtualizado,
                inputReset: true
            });
        }
    }

    fazerOperacao(){

        let operacoes = this.state.historico;
        console.log("Operação a ser executada: ",operacoes)

        for (let i = 0; i < 4; i++) {
            
            let operacao = ["T", "V", "U", "S"];
            for (let j = 0; j < operacoes.length; j++) {
                if(operacoes[j] == operacao[i]){

                    let primeiroNumero = parseFloat(operacoes[j-1]);
                    let segundoNumero = parseFloat(operacoes[j+1]);
                    let resultado = 0;

                    switch(operacao[i]){
                        case "T":
                            resultado = primeiroNumero * segundoNumero;
                            break;
                        case "V":
                            resultado = primeiroNumero / segundoNumero;
                            break;
                        case "U":
                            resultado = primeiroNumero + segundoNumero;
                            break;
                        case "S":
                            resultado = primeiroNumero - segundoNumero;
                            break;
                    }
                    console.log("Operação Realizada: ", primeiroNumero, operacoes[j], segundoNumero, "=", resultado);

                    //operacoes[index+1] = resultado + "";
                    operacoes.splice(j-1, 3, resultado+"");
                    console.log("Restante: ", operacoes);
                    j = 0;
                }
            }
        }

        this.setState(
            {
                historico: [],
                operacao: operacoes[0]
            },()=>{
                console.log(this.state.operacao, typeof this.state.operacao);
            }
        );
    }

    isNumeric(str) {
        if (typeof str != "string") return false
        return !isNaN(str) && !isNaN(parseFloat(str))
    }

    render(){
        return(
            <div className="calculadora">
                <Visor operacao={this.state.operacao} historico={this.state.historico}></Visor>
                <TecladoNumerico adicionarNumeroOperacao={this.adicionarNumeroOperacao}></TecladoNumerico>
            </div>
        );
    }
}