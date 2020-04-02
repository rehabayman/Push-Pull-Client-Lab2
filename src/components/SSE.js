import React, { useState, useEffect } from 'react';
import axios from 'axios';


function SSE () {

    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {

        const eventSource = new EventSource('http://localhost:5000/subscribe');
        eventSource.onmessage = (e) => {
            console.log(e.data);
            const msg = JSON.parse(e.data);
            setMessages(messages => messages.concat(msg));
        }

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
        axios.post('http://localhost:5000/messages/subscribers', {content: input, username})
            .then(() => {
                setInput('');
                setUsername('');
            });
    }

    return (
        <div style={{marginTop: "2rem", marginLeft: "2rem"}}>
            <h1>SSE</h1>
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

export default SSE;