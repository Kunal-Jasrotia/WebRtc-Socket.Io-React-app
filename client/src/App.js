import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Home';
import { SocketsProvider } from './providers/Sockets';
import { PeerProvider } from './providers/Peer';
import RoomPage from './pages/Room';

function App() {
  return (
    <>
      <SocketsProvider>
        <PeerProvider>
          <Routes>
            <Route path='/home' element={<Homepage />} />
            <Route path='/room/:roomId' element={<RoomPage />} />
          </Routes>
        </PeerProvider>
      </SocketsProvider>
    </>
  );
}

export default App;
