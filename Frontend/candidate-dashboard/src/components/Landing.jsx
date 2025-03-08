import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to InterviewPro</h1>
        <p>Your journey to seamless interviews starts here.</p>
        <div className="button-group">
          <Link to="/signup" className="landing-button signup">Sign Up</Link>
          <Link to="/login" className="landing-button login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing; 