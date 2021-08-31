import React from 'react';

export default class Visor extends React.Component{


    resultList = (function() {
        let html = this.props.historico.map(operacao => {
            switch(operacao){
                case "U":
                    operacao = "+";
                    break;
                case "S":
                    operacao = "-";
                    break;
                case "T":
                    operacao = "x";
                    break;
                case "V":
                    operacao = "/";
                    break;
            }
            return(
                operacao
            )
        });
        return <>{html}</>;
    });

    render(){
        return (
            <div className="visor">
                <div className="historico">
                    {this.resultList()}{this.props.operacao}
                </div>
                <div className="operacao-visor">
                    {this.props.operacao}
                </div>
            </div>
        );
    }
}