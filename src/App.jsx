import { Route, Routes } from 'react-router';
import './App.css';
import Header from './shared/Header';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';

function App() {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const email = localStorage.getItem('userEmail');

  //     if (!email) return;

  //     const user = await findUserByEmail(email);
  //     if (user) {
  //       setUserName(user.username);
  //     }
  //   };

  //   fetchUser();
  // }, []);
  // localStorage.setItem('loggedIn', 'true');
  // localStorage.setItem('userName', user.fields.username);
  return (
    <div className="grid-container">
      <Header></Header>
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={loggedIn ? <Home /> : <Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/*" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
