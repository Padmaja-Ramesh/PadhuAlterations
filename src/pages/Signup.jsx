import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../utils/db';
import styles from './Login.module.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const result = await signupUser(name, email, password);
    if (result.error) {
      setError(result.error);
    } else {
      localStorage.setItem('userEmail', result.email);
      localStorage.setItem('loggedIn', 'true');
      window.dispatchEvent(new Event('login'));
      navigate('/');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSignup} className={styles.loginForm}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" className={styles.loginButton}>
          Signup
        </button>
      </form>
    </div>
  );
}
