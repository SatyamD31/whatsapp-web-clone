import React, { useState, useEffect } from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        if(id) {
            // collecting messages in descending order so the latest message in at index 0 (refer line 43)
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => 
                    doc.data()
                ))
            );
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 1000));
    }, [])

    const createChat = () => {
        const roomName = prompt("Please enter a name for the chat room");

        if(roomName){
            db.collection('rooms').add({
                name: roomName,
            })
        }

    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebar-chat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebar-chat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ): (
        <div onClick={createChat} className="sidebar-chat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
