import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid';
import "../styles/ArenaCreateForm.css"
import closeBtn from '../assets/close.svg'

import toast, { Toaster } from 'react-hot-toast';
import io from 'socket.io-client';

export default function ArenaForm({setShowForm, arenaId}) {

  const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
    };

    const handleInputEnter = (e) => {
      if (e.code === 'Enter') {
          joinRoom();
      }
    };

    const joinRoom = () => {
      if (!roomId && !username) {
          toast.error('ROOM ID & USERNAME is required');
          return;
      }
      if (!roomId && username) {
          toast.error('ROOM ID is required');
          return;
      }
      if (roomId && !username) {
          toast.error('USERNAME is required');
          return;
      }
      /* if(roomId && username){
        const socket = io.connect('http://localhost:5000');
        socket.emit('join_room', {roomId})
      } */

      // Redirect
      /* navigate(`/editor/${roomId}`, {
          state: {
              username,
          },
      }); */
  };

  return (
    <div className='arena_form_container'>
      <div className="arena_form_nav">
        <span className="arena_form_nav_heading">
          <span className="arena_form_nav_heading_before">.cssArena_</span>
          <span className="arena_form_nav_heading_after">/create_arena</span>
        </span>
        <div className="close_btn_container" onClick={()=>setShowForm(false)}>
          <img src={closeBtn} className="close_btn" />
        </div>
      </div>
      <div className="arena_form">
      <input
        type="text"
        className="inputBox"
        placeholder="Enter custom ROOM ID"
        onChange={(e) => setRoomId(e.target.value)}
        value={roomId}
        onKeyUp={handleInputEnter}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="USERNAME"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        onKeyUp={handleInputEnter}
      />
      <Link to={"/battleArena/" + arenaId + "/" + roomId} className="btn joinBtn" onClick={joinRoom} state={{roomId: roomId, username: username, authority: 'host'}} >
        Join
      </Link>
      <span className="createInfo">
        If you don't have an invite then create&nbsp;
        <a
            onClick={createNewRoom}
            href=""
            className="createNewBtn"
        >
            new room
        </a>
      </span>
      </div>
    </div>
  )
}
