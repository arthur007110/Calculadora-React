import React from 'react';
import Tecla from './Tecla';

export default class TecladoNumerico extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            teclas: ["R", "I", "A", "U", "1", "2", "3", "S", "4", "5", "6", "T", "7", "8", "9", "V", "C", "0", "D", "E"]
        }
    }
    render(){
        //Teclas: 0-9[10] raiz, %, +-, +, -, x, /, ., =
        return (
            <div className="teclado-numerico">
                {this.state.teclas.map(tecla => (
                    <Tecla className="tecla" adicionarNumeroOperacao={this.props.adicionarNumeroOperacao} tecla={tecla} key={tecla}></Tecla>
                ))}
            </div>
        );
    }
}