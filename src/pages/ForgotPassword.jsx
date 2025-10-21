import { useState } from 'react';
import styles from './Login.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    setMessage(
      `If an account exists for ${email}, a reset link has been sent.`
    );
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleReset} className={styles.loginForm}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <button type="submit" className={styles.loginButton}>
          Reset Password
        </button>
        {message && <p className={styles.successMessage}>{message}</p>}
      </form>
    </div>
  );
}
