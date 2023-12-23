import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login'
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
