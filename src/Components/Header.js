/**
 @author Ivan Nizhnikovskiy, ivannizhnikovskiy@gmail.com
 **/
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './styles/header.css';


export default class Header extends Component {

    render() {
        return(
            <header className="header">
                <Container>
                    <h1>Glorious chat</h1>
                </Container>
            </header>
        )
    }

}