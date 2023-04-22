import React, { useMemo } from 'react'

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext)

export const PeerProvider = (props) => {
    const peer = useMemo(() => {
        var ICE_config = {
            'iceServers': [
                {
                    'url': 'stun:stun.l.google.com:19302'
                }
            ]
        }
        new RTCPeerConnection(ICE_config)
    }, [])

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDesription(offer)
        return offer
    }

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDesription(answer)
        return answer
    }
    const setRemoteAns = async (ans) => {
        await peer.setRemoteDescription(ans)
    }

    const sendStream = async (stream) => {
        const tracks = stream.tracks()
        for (const track of tracks) {
            peer.addTrack(track, stream)
        }
    }

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAns, sendStream }}>
            {props.children}
        </PeerContext.Provider >
    )
}
