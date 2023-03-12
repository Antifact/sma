import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Reset } from './components/auth/Reset';
import Profile from './pages/Profile';


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/reset" element={<Reset/>} />
          <Route exact path=":id" element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
