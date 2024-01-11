import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App" style={{
        width: '100%',
        height: '100%',
        placeItems: 'center',
        display: 'grid'
      }}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
