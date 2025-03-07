import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeUpload from "./pages/ResumeUpload";
import GoogleMeetPage from "./pages/GoogleMeetPage";
import AIInterviewPage from "./pages/AIInterviewPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResumeUpload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google-meet" element={<GoogleMeetPage />} />
        <Route path="/ai-interview" element={<AIInterviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
