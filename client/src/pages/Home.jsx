import { React, useState } from 'react'
import { useSocket } from '../providers/Sockets'
const Homepage = () => {
    const { socket } = useSocket()
    const [email, setEmail] = useState('')
    const [room, setroom] = useState('')

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
                        <input type="text" placeholder='Enter Room ID' onChange={e => setEmail(e.target.value)} />
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
