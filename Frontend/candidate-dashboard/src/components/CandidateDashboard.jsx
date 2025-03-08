import { useState } from 'react';
import '../styles/CandidateDashboard.css';

const CandidateDashboard = ({ onZoomLinkGenerated }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [zoomLink, setZoomLink] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setUploadStatus('Resume uploaded successfully!');
      setZoomLink('');
    } else {
      setUploadStatus('Please upload a valid PDF file.');
    }
  };

  const handleUpload = () => {
    if (file) {
      setTimeout(() => {
        setUploadStatus('Processing complete! Ready for your interview.');
        const dummyLink = `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}?pwd=dummyPass123`;
        setZoomLink(dummyLink);
        onZoomLinkGenerated(dummyLink); // Pass the link to parent (App)
      }, 1000);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, Candidate!</h1>
        <p>Let’s get you started with your interview journey.</p>
      </header>

      <main className="dashboard-main">
        <div className="upload-card">
          <h2>Upload Your Resume</h2>
          <p>Submit your resume in PDF format to proceed.</p>
          <div className="upload-area">
            <input
              type="file"
              accept=".pdf"
              id="resume-upload"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="resume-upload" className="upload-label">
              {file ? file.name : 'Drag & Drop or Click to Upload'}
            </label>
          </div>
          <button
            className="upload-button"
            onClick={handleUpload}
            disabled={!file}
          >
            Submit Resume
          </button>
          {uploadStatus && (
            <p
              className={`status-message ${
                uploadStatus.includes('successfully') || uploadStatus.includes('complete')
                  ? 'success'
                  : 'error'
              }`}
            >
              {uploadStatus}
            </p>
          )}
          {zoomLink && (
            <div className="zoom-link-section">
              <h3>Your Interview Link</h3>
              <a href={zoomLink} target="_blank" rel="noopener noreferrer" className="zoom-link">
                {zoomLink}
              </a>
              <p className="zoom-instruction">Click the link above to join your interview when ready!</p>
            </div>
          )}
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>Powered by xAI | © 2025</p>
      </footer>
    </div>
  );
};

export default CandidateDashboard;