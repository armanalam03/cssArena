import './App.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CodeArena from './components/CodeArena';
import BattleArena from './components/BattleArena';


function App() {
  /* axios
  .get('http://localhost:8000/api/')
  .then(res => {
    console.log(res.data);
  }) */
  

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arena/:id/" element={<CodeArena />} />
        <Route path="/battleArena/:id/:roomId" element={<BattleArena />} />
      </Routes>

    </div>
  );
}

export default App;
