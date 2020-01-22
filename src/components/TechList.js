import React, { Component } from 'react';

import TechItem from './TechItem'

class TechList extends Component {
    state = {
        newTech: '',
        techs: []
    };

    // Executado assim que o componente entra em tela.
    // Busca de dados de APIs externas, por exemplo
    componentDidMount() {
        const techs = localStorage.getItem('techs')

        if (techs) {
            this.setState({ techs: JSON.parse(techs) })
        }
    }

    // Executado sempre que houver alterações nas props ou estado dos componentes
    // Recebe as propriedades e estado antigos em prevProps, prevState como parametro
    componentDidUpdate(_, prevState) {
        //this.props, this.state

        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    // Executado quando o componente deixa de existir
    componentWillUnmount() {
            // Usado para "limpar" qualquer "sujeira" deixada pelo componente, eventListener, por exemplo
    }

    handleInputChange = e => {
        this.setState({ newTech: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({ 
            techs: [...this.state.techs, this.state.newTech],
            newTech: '',
        })
    }

    handleDelete = (tech) => {
      

        this.setState({ techs: this.state.techs.filter(t => t !== tech)})
    }

    render() {
        
        return (
            <>  
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        {this.state.techs.map(tech => (
                            // Qualquer coisa pode ser passada como propriedade do elemento, inclusive JSX
                           <TechItem 
                                tech={tech}
                                key={tech}
                                onDelete={() => this.handleDelete(tech)}
                            />

                            
                        ))}
                    </ul>
                    <input 
                        type='text' 
                        onChange={this.handleInputChange} 
                        value={this.state.newTech}
                    />
                    <button type='submit'>Enviar</button>
                </form>
            </>
        );
    }
}

export default TechList;