import React, { useEffect, useCallback, useState } from 'react'
import { useSocket } from '../providers/Sockets'
import { usePeer } from '../providers/Peer';
import ReactPlayer from 'react-player'
const RoomPage = () => {
    const { socket } = useSocket();
    const { peer, createOffer, createAnswer, setRemoteAns, sendStream } = usePeer();
    const [myStream, setMyStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState(null)
    const handleNewUserJoined = useCallback(async (data) => {
        const { emailId } = data
        console.log('new user Id', emailId);
        const offer = await createOffer();
        socket.emit('call-user', { emailId, offer })
    }, [createOffer, socket])

    const handleIncommingCall = useCallback(async (data) => {
        const { from, offer } = data
        console.log(from, offer);
        const ans = await createAnswer(offer);
        socket.emit('call-accepted', { emailId: from, ans })
    }, [createAnswer, socket])

    const handleCallAccepted = useCallback(async (data) => {
        const { ans } = data
        await setRemoteAns(ans)
    }, [setRemoteAns])

    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined)
        socket.on('incomming-call', handleIncommingCall)
        socket.on('call-accepted', handleCallAccepted)

        return () => {
            socket.off('user-joined', handleNewUserJoined)
            socket.off('incomming-call', handleIncommingCall)
            socket.off('call-accepted', handleCallAccepted)

        }

    }, [handleCallAccepted, handleIncommingCall, handleNewUserJoined, socket])

    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        sendStream(stream)
        setMyStream(stream)
    }, [sendStream])

    useEffect(() => {
        getUserMediaStream()
    }, [getUserMediaStream])

    return (
        <>
            <ReactPlayer url={myStream} playing muted />
        </>
    )
}

export default RoomPage
