/**
 @author Ivan Nizhnikovskiy, ivannizhnikovskiy@gmail.com
 **/

import React, { Component } from 'react';
import { Container, Segment, Sidebar } from 'semantic-ui-react';
import './styles/chat-space.css';

import io from 'socket.io-client';
const socket = io();

export default class ChatSpace extends Component {

    constructor() {
        super();
        this.state = {
            messages : [],
            isLoggedIn : false,
            nickName : null,
            inputPlaceholder : "Choose your nickname and press 'Enter'"
        }
    }

    handleEnter(event) {
        if (event.key === "Enter") {
            if (event.target.value === "") {
                return
            } else {
                if (this.state.isLoggedIn === false) {
                    this.setState({
                        inputPlaceholder: "Write message and press 'Enter'",
                        nickName: event.target.value,
                        isLoggedIn: true,
                        messages : [...this.state.messages, {text: "NICKNAME WAS SUCCESSFULLY CREATED"}]
                    });
                    event.target.value = "";
                } else {
                    let entity = {
                        text: event.target.value,
                        time: new Date().toUTCString(),
                        user: this.state.nickName
                    };
                    event.target.value = "";
                    this.setState({
                        messages : [...this.state.messages, entity]
                    }, () => document.querySelector("div.ui.container.chat").scrollTop = document.querySelector("div.ui.container.chat").scrollHeight);
                    socket.emit('chat message', JSON.stringify(entity));
                }

            }

        }
    }

    componentDidMount() {
        socket.on('chat message', (msg) => {
            let entity = JSON.parse(msg);
            this.setState({
                messages : [...this.state.messages, entity]
            }, () => document.querySelector("div.ui.container.chat").scrollTop = document.querySelector("div.ui.container.chat").scrollHeight);
        })
    }

    checkUser(user) {
        if (user === this.state.nickName) {
            return "yours-messages";
        } else {
            return "another-messages";
        }
    }

    render() {

        const Chat = () => {

            return (
                <Sidebar.Pushable as={Segment}>
                    <Sidebar.Pusher>
                        <Segment basic>
                            {
                                (this.state.messages).map((message) => {
                                    return(
                                        <Message text={message.text}
                                                 time={message.time}
                                                 user={message.user}/>
                                    )
                                })
                            }
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            )};

        const Message = props => {
            return(
                <div className="message">
                    <div className={`${this.checkUser(props.user)} message-wrapper`} >
                        <div className="message-text-wrapper">{props.text}</div>
                        <div className="message-time">{props.time}</div>
                        <span className="nickname-wrapper">{props.user}</span>
                    </div>
                </div>
            );
        };

        return(
            <Container className="chat">
                <Chat />
                <input className="message-input"
                       placeholder={this.state.inputPlaceholder}
                       onKeyDown={(e)=>this.handleEnter(e)} />
            </Container>
        )
    }

}