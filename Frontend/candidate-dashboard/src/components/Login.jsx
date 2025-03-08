import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login (replace with backend API call later)
    if (username && password) {
      // Dummy role assignment for demo (in reality, fetch from backend)
      const role = username.includes('interviewer') ? 'Interviewer' : 'Candidate';
      onLogin(role);
      setMessage('Login successful!');
      setTimeout(() => {
        navigate(role === 'Candidate' ? '/candidate' : '/interviewer');
      }, 1000);
    } else {
      setMessage('Please enter username and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p>Sign in to access your dashboard.</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && (
          <p className={message.includes('successful') ? 'success' : 'error'}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;