import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Recovery from './pages/Recovery';
import ConfirmRecovery from './pages/ConfirmRecovery';
import CheckYourEmail from './pages/CheckYourEmail';

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
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/confirmrecovery" element={<ConfirmRecovery />} />
          <Route path="/checkyouremail" element={<CheckYourEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
