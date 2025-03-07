import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile && (uploadedFile.type === "application/pdf" || uploadedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setFile(uploadedFile);
      setError("");
    } else {
      setError("Please upload a valid PDF or DOCX file.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a resume before proceeding.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Resume uploaded successfully!");
      } else {
        alert("Upload failed. Try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading.");
    } finally {
      setUploading(false);
    }
  };

  const handleStartInterview = (path) => {
    if (!file) {
      setError("Please upload a resume before proceeding.");
      return;
    }
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Upload Your Resume</h2>
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} style={styles.fileInput} />
        {file && <p style={styles.fileName}>✔ {file.name}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.uploadButton} onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => handleStartInterview("/google-meet")}>Start Interview (Google Meet)</button>
          <button style={styles.button} onClick={() => handleStartInterview("/ai-interview")}>Start AI Interview</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  heading: {
    marginBottom: "15px",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  fileName: {
    color: "green",
    fontSize: "14px",
    marginBottom: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  uploadButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ResumeUpload;
