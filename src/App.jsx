import { Route, Routes } from 'react-router';
import './App.css';
import Header from './shared/Header';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div class="grid-container">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
