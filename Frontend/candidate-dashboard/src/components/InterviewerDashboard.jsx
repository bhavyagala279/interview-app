import '../styles/InterviewerDashboard.css';

const InterviewerDashboard = ({ zoomLink }) => {
  // Dummy job opening data (replace with backend data later)
  const jobOpening = {
    title: 'Senior Software Engineer',
    description:
      'We are looking for an experienced software engineer proficient in React, Node.js, and AI-driven applications to join our innovative team.',
    requirements: [
      '5+ years of experience in software development',
      'Expertise in JavaScript and modern frameworks',
      'Strong problem-solving skills',
    ],
  };

  return (
    <div className="interviewer-dashboard-container">
      <header className="interviewer-dashboard-header">
        <h1>Interviewer Dashboard</h1>
        <p>Prepare for your next candidate interview.</p>
      </header>

      <main className="interviewer-dashboard-main">
        <section className="job-opening-card">
          <h2>Job Opening</h2>
          <h3>{jobOpening.title}</h3>
          <p className="job-description">{jobOpening.description}</p>
          <h4>Requirements:</h4>
          <ul>
            {jobOpening.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </section>

        <section className="zoom-link-card">
          <h2>Candidate Zoom Link</h2>
          {zoomLink ? (
            <>
              <a href={zoomLink} target="_blank" rel="noopener noreferrer" className="zoom-link">
                {zoomLink}
              </a>
              <p className="zoom-instruction">Click the link to join the candidate’s interview.</p>
            </>
          ) : (
            <p className="no-link">Waiting for candidate to submit resume...</p>
          )}
        </section>
      </main>

      <footer className="interviewer-dashboard-footer">
        <p>Powered by xAI | © 2025</p>
      </footer>
    </div>
  );
};

export default InterviewerDashboard;