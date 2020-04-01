import React, { useState, useEffect } from 'react';
import axios from 'axios';

const id = Math.ceil(Math.random() * 1000);

function LongPolling () {

    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {

        const subscribe = (messages) => axios.post('http://localhost:5000/subscribe', {id}).then((res) => {
            setMessages(messages.concat(res.data));
            subscribe(messages.concat(res.data));
        });

        subscribe(messages);

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
        axios.post('http://localhost:5000/messages/subscribers', {content: input, username});
    }

    return (
        <div style={{marginTop: "2rem", marginLeft: "2rem"}}>
            <h1>Long Polling</h1>
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

export default LongPolling;