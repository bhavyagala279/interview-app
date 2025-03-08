import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CandidateDashboard from './components/CandidateDashboard';
import InterviewerDashboard from './components/InterviewerDashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';

function App() {
  const [sharedZoomLink, setSharedZoomLink] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleZoomLinkGenerated = (link) => {
    setSharedZoomLink(link);
  };

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setSharedZoomLink('');
  };

  return (
      <div className="app">
        {/* Navigation */}
        <nav style={{ textAlign: 'center', padding: '20px' }}>
          {!isAuthenticated ? (
            <>
              <Link to="/signup" style={{ marginRight: '20px' }}>Signup</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              {userRole === 'Candidate' && (
                <Link to="/candidate" style={{ marginRight: '20px' }}>Candidate Dashboard</Link>
              )}
              {userRole === 'Interviewer' && (
                <Link to="/interviewer" style={{ marginRight: '20px' }}>Interviewer Dashboard</Link>
              )}
              <button onClick={handleLogout} style={{ marginLeft: '20px', padding: '5px 10px' }}>
                Logout
              </button>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Landing />} /> {/* New landing page */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/candidate"
            element={
              isAuthenticated && userRole === 'Candidate' ? (
                <CandidateDashboard onZoomLinkGenerated={handleZoomLinkGenerated} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/interviewer"
            element={
              isAuthenticated && userRole === 'Interviewer' ? (
                <InterviewerDashboard zoomLink={sharedZoomLink} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
  );
}

export default App;