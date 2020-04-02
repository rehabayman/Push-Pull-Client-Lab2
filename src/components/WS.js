import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function WS () {

    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('new-message', (newMessage) => {
            setMessages(messages  => messages.concat(newMessage));
        });
    }, []);

    const handleChange = (e) => {
        const {target: {value}} = e;
        setInput(value);
    }

    const handleUsernameChange = (e) => {
        const {target: {value}} = e;
        setUsername(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('message', {content: input, username});
        setInput('');
        setUsername('');
    }

    return (
        <div style={{marginTop: "2rem", marginLeft: "2rem"}}>
            <h1>Web Sockets</h1>
            <form id="form" onSubmit={handleSubmit}>
                Username: <input id="username" type="text" name="username" onChange={handleUsernameChange} value={username} style={{marginBottom: "1rem"}}></input> <br></br>
                Message: <input id="content" type="text" name="content" onChange={handleChange} value={input} style={{marginBottom: "1rem"}}></input> <br></br>
                <button type="submit">Send</button>
            </form>
            <div>
                {
                    messages.map(m => <h1 key={m.content} > {m.username} : {m.content} </h1>)
                }
            </div>
        </div>
    );
}

export default WS;