
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useEffect, useState, useCallback } from 'react'
import { useSocket } from '../providers/Sockets'
import { useNavigate } from 'react-router-dom'
const Homepage = () => {
    const { socket } = useSocket()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [room, setroom] = useState('')

    const handleRoomJoined = useCallback(({ roomId }) => {
        console.log("Joined room", roomId);
        navigate(`/room/${roomId}`)
    }, [navigate])

    useEffect(() => {
        socket.on('joined-room', handleRoomJoined)

        return () => {
            socket.off('joined-room', handleRoomJoined)

        }
    }, [handleRoomJoined, socket])

    const handleJoinRoom = () => {
        socket.emit('join-room', { emailId: email, roomId: room })
    }

    return (
        <>
            <div className="login-box">
                <h2>Enter Room</h2>
                <form>
                    <div className="user-box">
                        <input type="email" placeholder='Enter Email ID' onChange={e => setEmail(e.target.value)} />
                        <label>Email Id</label>
                    </div>
                    <div className="user-box">
                        <input type="text" placeholder='Enter Room ID' onChange={e => setroom(e.target.value)} />
                        <label>Enter Room Id</label>
                    </div>
                    <a onClick={handleJoinRoom}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Join Room
                    </a>
                </form>
            </div>
        </>
    )
}

export default Homepage
