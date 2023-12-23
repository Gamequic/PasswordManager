import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login'
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrer" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
