import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button/Button';
import Display from '../components/Display/Display';


const initialState = { // Setando valores iniciais
    displayValue: '0', // DisplayValue sera exibixo na no display valor = 0
    clearDisplay: false, // Para limpar o display
    operation: null, // Verificacao de tipo de operacao
    valor: [0, 0], // array com os valores
    resultado: 0 // posicao atual do array
}

class Calculator extends Component {
    // ...initialState colna os atributos da const initialState para state    
    state = { ...initialState }
   
    clearMemory = () => { // resetar valores iniciais
        this.setState({...initialState});
    }

    setOperation = (operation) => {//Conferir se a posicao atual do array eh 0        
        if (this.state.resultado == 0) {
            // seta a operacao como parametro,
            // pula para a posicao 1 do array e seta clearDisplay para true,            
            this.setState({operation, resultado: 1, clearDisplay: true});
        } else {
            const equals = operation == "="; // se o parametro operation for '=', equals recebe true
            const resultadoOperation = this.state.operation; // atribue a resultadoOperetion o valor de state operation (essa sera a operacao atual)
            const valor = [...this.state.valor]; // array de const valor recebe os valores do array de state valor

           // condicoes para operacões
            switch(resultadoOperation) {
                case "+":
                    valor[0] += valor[1];
                    break;
                case "-":
                    valor[0] -= valor[1];
                    break;
                case "*":
                    valor[0] *= valor[1];
                    break;
                case "/":
                    valor[0] /= valor[1];
                    break;
                default:
                    valor[0] = this.state.valor[0];
            }

            valor[1] = 0; // atribui 0 a posicao 1 do array para que possamos realizar nova operacao

            // atribui os valores gerados aos atributos de state
            if (valor[0] % 1 != 0) {
                this.setState({
                    displayValue: String(valor[0].toFixed(3)) // display recebe convertido para string o valor da posicao 0 do array onde estava o resultado
                });
            } else {
                this.setState({
                    displayValue: String(valor[0])
                });
            }

            this.setState({
                operation: equals ? null : operation, // se a operacao for "=", operation recebe null, senão, recebe a operacao digitada
                valor: [...valor], // array valor de state recebe os valores do array na const valor
                resultado: equals ? 0 : 1, // se a const equals for true, a possicao do array vai para 0, senao, vai para 1
                clearDisplay: !equals // 
            });
            
        }
    }

    // adicionar digitos ao display
    addDigit = (num) => {
        // condicao para conferir se '.' ja foi digitado (apenas um permitido)
        if (num == "." && this.state.displayValue.includes(".")) {
            return // retorna false caso true
        }

        const clearDisplay = this.state.displayValue == "0" || this.state.clearDisplay; // caso displayValue do state == '0' ou clearDisplay já for true, clearDisplay recebe true
        // by Wanderson
        const resultadoValue = clearDisplay ? "" : this.state.displayValue; // caso clear display for true, resultadoValue fica vazio, senão, recebe o valor que esta no display (displayValue)
        const displayValue = resultadoValue + num; // entao displayValue recebe a concatenacao da String com o valor de resultadoValue + num (numero digitado que foi passado como parametro)
        this.setState({displayValue, clearDisplay: false}); // atribui a state o displayValue gerado e seta clearDisplay para false, permitindo continuar concatenando digitos

        // caso o valor digitado nao seja o botao '.'
        if (num !== ".") {
            const i = this.state.resultado; // posicao do array
            const newValue = parseFloat(displayValue); // converte a string em float para ser possivel realizar as operacoes
            const valor = [...this.state.valor]; // const valor recebe em seu array os valores de valor da const state
            valor[i] = newValue; // a posicao i do array recebe o valor de newValue
            this.setState({valor}); // atribui o novo array a state com o novo value incluso na posicao i
        }
        
    }
 


    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" triple click={this.clearMemory}/>
                <Button label="/" operation click={this.setOperation}/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" operation click={this.setOperation}/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" operation click={this.setOperation}/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" operation click={this.setOperation}/>
                <Button label="0" double click={this.addDigit}/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" operation click={this.setOperation}/>
            </div>
        );
    }
}

export default Calculator;

