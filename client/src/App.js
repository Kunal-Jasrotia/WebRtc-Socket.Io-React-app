import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Home';
import { SocketsProvider } from './providers/Sockets';

function App() {
  return (
    <>
      <SocketsProvider>
        <Routes>
          <Route path='/home' element={<Homepage />} />
        </Routes>
      </SocketsProvider>
    </>
  );
}

export default App;
