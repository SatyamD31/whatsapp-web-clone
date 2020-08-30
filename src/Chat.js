import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic }  from '@material-ui/icons/';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import ScrollableFeed from 'react-scrollable-feed';

function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();                 // roomId is from app.js
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId) {
            // go to the rooms collection and find the room with the roomId from the url
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => 
                    doc.data()))
            ))
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
        });

        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                
                <div className="chat__header-info">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{' '}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}    
                    </p>
                </div>

                <div className="chat__header-right">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <ScrollableFeed>
                <div className="chat__body">
                    
                        {messages.map(message => (
                            <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                                <span className="chat__name">
                                    {message.name}
                                </span>
                                {message.message}
                                <br />
                                <span className="chat__timestamp">
                                    {new Date(message.timestamp?.toDate()).toUTCString()}
                                </span>
                            </p>    
                        ))}
                    
                </div>
            </ScrollableFeed>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" autoFocus />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
