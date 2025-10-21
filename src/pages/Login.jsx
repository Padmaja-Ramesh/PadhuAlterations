import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecords } from '../utils/users';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const records = await getRecords();
      const user = records.find(
        (r) =>
          r.fields.email?.toLowerCase() === email.toLowerCase() &&
          r.fields.password === password
      );

      if (user) {
        localStorage.setItem('userEmail', user.fields.email);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userName', user.fields.username || 'User');
        window.dispatchEvent(new Event('login'));
        navigate('/home');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
        <p className={styles.links}>
          <a href="/signup">Create Account</a> |{' '}
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
}
