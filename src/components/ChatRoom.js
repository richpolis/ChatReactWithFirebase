import React, { Component } from 'react';

class ChatRoom extends Component{
    constructor(){
        super();
        this.state = {
            message: '',
            messages: [
                /*{id: 1, text: 'text 1'},
                {id: 2, text: 'text 2'},
                {id: 3, text: 'text 3'},*/
            ]
        };
    }

    componentDidMount(){
        window.firebase.database().ref('messages/').on('value', snapchat =>{
            const currentMesssages = snapchat.val();
            if(currentMesssages !== null){
                this.setState({
                    messages: currentMesssages
                })
            }
        });
    }

    updateMessage(e){
        this.setState({
            message: e.target.value
        });
    }

    handlerSubmit(e){
        e.preventDefault();
        //const list = this.state.messages;
        const newMessage = {
            id: this.state.messages.length + 1,
            text: this.state.message
        };
        //list.push(newMessage);
        //this.setState({messages: list, message: ''});
        window.firebase.database().ref(`messages/${newMessage.id}`)
        .set(newMessage);
        this.setState({message:''});

    }


    render(){
        const { messages } = this.state;
        const messagesList = messages.map(message => {
            return (
                <li key={message.id}>{message.text}</li>
            );
        });
        return (
            <div className="chat-room">
                <ol>
                    { messagesList }
                </ol>
                <form onSubmit={this.handlerSubmit.bind(this)}>
                    <input 
                    type="text" 
                    value={this.state.message} 
                    onChange={this.updateMessage.bind(this)} 
                    />
                    <button>Send</button>
                </form>
            </div>
        );    
    }
}

export default ChatRoom;