import React from 'react';

export default class Tecla extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tecla: this.props.tecla,
            teclaVisivel: ""
        }
        
        switch(this.state.tecla){
            case "R":
                this.state.teclaVisivel = "√";
                break;
            case "A":
                this.state.teclaVisivel = "⌫";
                break;
            case "I":
                this.state.teclaVisivel = "+/-";
                break;
            case "E":
                this.state.teclaVisivel = "=";
                break;
            case "D":
                this.state.teclaVisivel = ".";
                break;
            case "U":
                this.state.teclaVisivel = "+";
                break;
            case "S":
                this.state.teclaVisivel = "-";
                break;
            case "T":
                this.state.teclaVisivel = "x";
                break;
            case "V":
                this.state.teclaVisivel = "/";
                break;
            default:
                this.state.teclaVisivel = this.state.tecla;
        }
    }

    handleClick(){
        //alert(this.state.tecla);
        this.props.adicionarNumeroOperacao(this.state.tecla);
    }

    render(){
        return (
            <div className="tecla" onClick={() => this.handleClick()}>
                {this.state.teclaVisivel}
            </div>
        );
    }
}