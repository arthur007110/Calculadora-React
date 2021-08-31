import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Calculadora from './Components/Calculadora';

function renderizar() {
    ReactDOM.render( 
        <Calculadora></Calculadora>,
        document.getElementById('root')
    );
}

export default renderizar()